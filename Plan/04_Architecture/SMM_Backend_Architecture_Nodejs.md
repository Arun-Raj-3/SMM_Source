# SMM Backend Architecture (Node.js + NestJS)

> **Architecture reference (v2.0, 2026-10-07):** Where this file differs from `Plan/02_Execution/SMM_Decisions_Log.md` §3–4 (stack, auth, database, naming), the Decisions Log wins. Key overrides: Supabase Auth (no custom login code), PostgreSQL only (no MongoDB/Elasticsearch), Redux Toolkit + RTK Query (no Zustand/React Query), Tailwind + shadcn/ui (no MUI), `apps/worker` path.

## Concrete Module Map + Queue/Worker + API Conventions

---

## 1) Architectural Goals
- Ship a reliable MVP vertical slice: `create -> approve -> schedule -> publish` (single platform).
- Enforce multi-tenant security (workspace isolation) and RBAC.
- Make all workflow actions auditable.
- Use queues for publishing and attribution pipelines to isolate external API volatility.
- Keep module boundaries stable so AI features can be layered later.

---

## 2) Recommended Repository Structure (Backend)

```text
apps/api/
  src/
    main.ts
    app.module.ts
    config/
    common/
      filters/
      guards/
      interceptors/
      logging/
      errors/
      decorators/
    modules/
      auth/
      rbac/
      workspace/
      content/
      approval/
      scheduling/
      publishing/
      inbox/
      analytics/
      attribution/
      intelligence/
      integrations/
        social/
        crm/
      compliance/
      reporting/
      health/
services/worker/
  src/
    main.ts
    queues/
      publish/
      attribution/
      insights/
    processors/
      publish.processor.ts
    common/
      logging/
      error-handling/
packages/shared-types/
  src/
    api/
    events/
    dto/
    enums/
```

If you already use a different monorepo layout, keep the same *logical module* boundaries.

---

## 3) Cross-Cutting Concerns (Implement Once, Reuse Everywhere)

### 3.1 Standard API Prefixing
- All REST endpoints: `/api/v1/...`
- Health endpoints: `/healthz`
- Readiness endpoints: `/readyz`

### 3.2 Standard Error Model
Use a consistent response shape:
- `code` (machine-readable)
- `message` (human readable)
- `details` (validation or context)
- `requestId` (for logs)

### 3.3 RBAC Enforcement Pattern
- Every request resolves:
  - `actor` (user identity)
  - `workspaceId` (tenant isolation)
  - `roles` for actor within workspace
- Guards check permission for action types:
  - `content:create`
  - `content:submitApproval`
  - `approval:approve`
  - `scheduling:schedule`
  - `publishing:retry`

### 3.4 Audit Events
Every sensitive transition writes:
- actorId
- workspaceId
- entityType + entityId
- actionType (enum)
- metadata (JSON)
- timestamp (immutable)

---

## 4) Module Map (NestJS)

## 4.1 `auth` Module
- Responsibilities:
  - login/logout
  - access + refresh token lifecycle
  - password reset (optional for v1)
- Outputs:
  - `actor` and `workspace permissions` context for downstream modules

## 4.2 `rbac` Module
- Responsibilities:
  - role definitions (`Admin`, `Editor`, `Approver`, etc.)
  - role membership mapping
  - permission checks
- Patterns:
  - `@UseGuards(RbacGuard('permission'))`

## 4.3 `workspace` Module (Multi-Tenant Core)
- Responsibilities:
  - workspace CRUD (admin only)
  - member management
  - workspace-scoped configuration (feature flags, timezone defaults)

## 4.4 `content` Module
- Responsibilities:
  - create/edit drafts
  - version history
  - media asset references
  - draft state machine source-of-truth (stores content version)

Key domain objects:
- `ContentItem`
- `ContentVersion`
- `MediaAssetRef`

## 4.5 `approval` Module
- Responsibilities:
  - submit draft for approval
  - approve/reject decisions
  - approval chain definition (MVP: single step)
  - audit logging for decisions

Key domain objects:
- `ApprovalRequest`
- `ApprovalDecision`

## 4.6 `scheduling` Module
- Responsibilities:
  - schedule approved content
  - validate time windows (MVP: future datetime + workspace timezone)
  - reschedule safely

Key domain objects:
- `PublishJob` (canonical schedule record)
- `PublishAttempt` (history of worker attempts)

## 4.7 `publishing` Module
- Responsibilities:
  - unify internal publish status model:
    - `Scheduled`, `Publishing`, `Published`, `Failed`
  - idempotency and dedupe for publish jobs
  - manual retry endpoint (admin/editor/approver per policy)
  - publish event mapping to audit log

Important:
- Worker does actual platform API calls.
- API layer only enqueues and tracks status.

## 4.8 `integrations.social` Module (Platform Adapters)
- Responsibilities:
  - adapter interface for each platform
  - OAuth token lifecycle (store + refresh)
  - rate limit handling
  - normalization of platform responses into internal format

Adapter interface (conceptual):
- `publishPost(payload) -> { remotePostId, status }`
- `getPublishStatus(remotePostId) -> status`

## 4.9 `integrations.crm` Module (HubSpot first)
- Responsibilities:
  - OAuth lifecycle
  - conversion event ingestion
  - incremental sync with checkpoint cursor

Key domain objects:
- `CrmIntegration`
- `CrmSyncCheckpoint`

## 4.10 `attribution` Module
- Responsibilities:
  - store attribution events:
    - UTM click event -> session -> CRM conversion event
  - compute attribution credits (MVP linear model)
  - expose dashboard queries to UI

Key domain objects:
- `AttributionEvent`
- `CampaignCredit`
- `PostCredit`

## 4.11 `analytics` Module
- Responsibilities:
  - ingestion of post metrics
  - metric snapshotting and aggregation

## 4.12 `intelligence` Module (AI Layer)
- Responsibilities:
  - NOVA planner orchestration
  - content score v1 service contract
  - brand voice scoring service contract
  - feature-flag gating for AI operations

Important design rule:
- AI services are pure compute; they should not directly mutate workflow state without the owning workflow module.

## 4.13 `compliance` Module
- Responsibilities:
  - regulated vocabulary filtering (keywords)
  - disclaimer auto-appender rules
  - policy profile per workspace/region
- Must integrate with:
  - approval scheduling path (block/warn/override)

## 4.14 `reporting` Module
- Responsibilities:
  - white-label report generation (async job)
  - export CSV/PDF with audit trail

---

## 5) Queue and Worker Architecture (BullMQ)

### 5.1 Queue Set (MVP)
1. `publishQueue`
2. `attributionQueue`
3. `metricsIngestionQueue` (if you ingest early)
4. `reportExportQueue` (later)

### 5.2 Job Idempotency Strategy
- Every job should carry:
  - `idempotencyKey`
  - `workspaceId`
  - `entity ids` (contentItemId, publishJobId)
- Worker must:
  - check if the outcome already exists before calling external API
  - avoid double publishing for retries

### 5.3 Retry Policy (MVP)
- transient failures -> retry with exponential backoff
- auth failures (token expired) -> refresh token then retry once
- rate limit -> delay and retry within cap
- repeated failures -> mark attempt as `Failed` and enqueue dead-letter handling/logging

### 5.4 Dead-Letter Handling
- store dead-letter reason with:
  - external error code/message
  - last request/response correlation id
- surface in UI as actionable failure reason

---

## 6) API Conventions (Controller/DTO Guidelines)

### 6.1 DTO Validation
- Use `class-validator` + `class-transformer`.
- For every endpoint:
  - validate workspaceId presence (from token context)
  - validate entity ids as UUID
  - enforce RBAC before touching workflow tables

### 6.2 Consistent Endpoint Naming
- Drafts:
  - `POST /api/v1/content/drafts`
  - `GET /api/v1/content/drafts`
  - `GET /api/v1/content/drafts/:id`
  - `PATCH /api/v1/content/drafts/:id`
- Approval:
  - `POST /api/v1/approval/:draftId/submit`
  - `POST /api/v1/approval/:requestId/approve`
  - `POST /api/v1/approval/:requestId/reject`
- Scheduling:
  - `POST /api/v1/scheduling/:draftId/schedule`
  - `POST /api/v1/scheduling/:publishJobId/reschedule`
- Publishing status:
  - `GET /api/v1/publishing/jobs/:publishJobId`

---

## 7) Error Handling and Logging Standards

### 7.1 Log Fields (Required)
- `requestId`
- `workspaceId`
- `userId` (actor)
- `entityType`, `entityId`
- `queueName`, `jobId` (worker)

### 7.2 Metrics Signals
- API p95 latency
- publishQueue depth
- publish failure rate by reason category
- attribution lag (time between conversion and dashboard update)
- AI generation latency and failure rate

---

## 8) Deployment Notes (Solo Founder Friendly)
- Use Docker for consistent dev environments.
- Run:
  - API server
  - Worker service
  - Redis instance (managed if possible)
  - PostgreSQL managed
- Use staging first:
  - connectors mocked for CI
  - real connectors only for manual QA runs

---

## 9) Practical MVP Implementation Order (Backend)
1. `auth` + RBAC + `workspace`
2. `content` + versioning
3. `approval` workflow
4. `scheduling` + `publishQueue` + worker skeleton
5. `integrations.social` (one platform)
6. publish status tracking
7. `audit` events coverage
8. tests + monitoring

---

## 10) Output Expectations for the AI Coding Model
When using AI to implement modules:
- Ask it to propose file changes first
- Then implement module in:
  - `apps/api/src/modules/<module>/...`
  - `services/worker/src/...` for queue processors
- Require tests:
  - unit tests for services
  - integration tests for connectors with mocks
- Require a verification checklist:
  - `lint`
  - `test`
  - `e2e smoke`

