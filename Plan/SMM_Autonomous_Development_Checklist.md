# SMM Autonomous Development Checklist
## AI-Readable Execution Playbook (End-to-End Build)

> Purpose: This file is the primary instruction checklist for an AI coding model to execute development with minimal manual prompting.

---

## 0) How To Use This File

### AI Agent Instructions
1. Read this file fully before writing code.
2. Follow phases in order unless blocked.
3. Complete all P0 items before P1/P2.
4. After each major task, run tests and update progress log.
5. If blocked for >30 minutes, create a `BLOCKER` note and continue with parallel tasks.
6. Never skip security, validation, or audit logging for workflow-critical features.

### Human Operator Instructions
- Keep this file as the source of truth for autonomous execution.
- Ask AI to "execute next unchecked item from `SMM_Autonomous_Development_Checklist.md`".

---

## 1) Global Project Guardrails

### Stack (locked)
- Frontend: React + TypeScript + Tailwind + MUI + Axios + Redux Toolkit
- Backend: Node.js + NestJS
- Database: PostgreSQL
- Queue: Redis + BullMQ
- Auth: RBAC (`Admin`, `Editor`, `Approver`)
- Observability: Sentry + PostHog

### Quality Rules
- [ ] All APIs use input validation and standardized error format.
- [ ] RBAC checks enforced on protected operations.
- [ ] Audit events logged for sensitive actions.
- [ ] Unit tests for all core services.
- [ ] Integration/E2E tests for workflow-critical paths.
- [ ] Feature flags for major modules.

### Security Rules
- [ ] No secrets in code.
- [ ] Token/credential encryption at rest.
- [ ] Rate limiting enabled for public endpoints.
- [ ] Webhook signature verification for external callbacks.

---

## 2) Definition of Done (DoD)

Task is done only if:
- [ ] Code implemented and lint/build passes.
- [ ] Tests added and passing.
- [ ] Error handling implemented.
- [ ] Logging and monitoring points added.
- [ ] API/UI behavior verified manually.
- [ ] Progress updated in Section 10.

---

## 3) Phase Plan Overview

### Phase A - Foundation
- Auth, RBAC, workspace model, core schema, CI baseline.

### Phase B - MVP Workflow
- Create -> approve -> schedule -> publish (single platform).

### Phase C - Intelligence Baseline
- NOVA planner + attribution MVP.

### Phase D - Advanced Intelligence
- Predictive content score + brand voice + competitor benchmarking.

### Phase E - Scale Modules
- Localization + influencer + compliance + white-label.

---

## 4) Detailed Execution Checklist

## A) Foundation (P0)
- [ ] A1. Initialize app structure (`web`, `api`, `worker`, shared types).
- [ ] A2. Configure environment templates (`.env.example`) for all services.
- [ ] A3. Set up CI pipeline (lint, test, build).
- [ ] A4. Implement authentication (access + refresh token flow).
- [ ] A5. Implement RBAC guards and permission mapping.
- [ ] A6. Create base DB schema:
  - [ ] Workspace
  - [ ] User
  - [ ] RoleMembership
  - [ ] SocialAccount
  - [ ] AuditEvent
- [ ] A7. Add migration and seed scripts.
- [ ] A8. Add global error middleware and request logging.
- [ ] A9. Add baseline monitoring (Sentry + health endpoints).

## B) MVP Workflow (P0)
- [ ] B1. Content draft API (create/edit/list/detail).
- [ ] B2. Draft versioning model.
- [ ] B3. Approval workflow API (submit/approve/reject).
- [ ] B4. Scheduler API with timezone support.
- [ ] B5. Queue producer/worker for publish jobs.
- [ ] B6. Retry/backoff + dead-letter queue handling.
- [ ] B7. First social platform connector (publish + status mapping).
- [ ] B8. Publish status tracking (`Scheduled`, `Publishing`, `Published`, `Failed`).
- [ ] B9. Frontend pages:
  - [ ] Draft editor
  - [ ] Approval inbox
  - [ ] Scheduler view
  - [ ] Publish status view
- [ ] B10. Audit logs for all workflow transitions.
- [ ] B11. E2E test: create -> approve -> schedule -> publish.

## C) NOVA + Attribution MVP (P0)
- [ ] C1. UTM auto-tagging service.
- [ ] C2. Session capture and identity stitching model.
- [ ] C3. CRM connector (HubSpot first).
- [ ] C4. Linear attribution engine.
- [ ] C5. Revenue dashboard APIs + UI.
- [ ] C6. NOVA memory store (workspace-scoped).
- [ ] C7. NOVA planning API (goal -> 30-day plan).
- [ ] C8. NOVA planner UI (generate/edit/save plan).
- [ ] C9. Feature flags for NOVA + attribution.
- [ ] C10. Integration tests for attribution lineage.

## D) Advanced Intelligence (P1)
- [ ] D1. Feature store schema for content scoring.
- [ ] D2. Predictive Content Score API (0-100 + confidence).
- [ ] D3. Recommendation generator for score improvement.
- [ ] D4. Pre-publish score integration in editor flow.
- [ ] D5. Brand voice fingerprint setup.
- [ ] D6. Brand deviation scoring API.
- [ ] D7. Rewrite suggestion flow with guardrails.
- [ ] D8. Competitor source onboarding + ingestion jobs.
- [ ] D9. Competitor benchmarking dashboard.
- [ ] D10. Drift/freshness monitoring for AI/data modules.

## E) Scale Modules (P1/P2)
- [ ] E1. Localization master -> variant content model.
- [ ] E2. Translation service integration (tone-preserving).
- [ ] E3. Regional approval zones and timezone publish policies.
- [ ] E4. Influencer profile model and discovery search.
- [ ] E5. Influencer shortlist and campaign workflow.
- [ ] E6. Compliance policy engine (keywords/disclaimers).
- [ ] E7. Pre-publish compliance enforcement (block/warn/override).
- [ ] E8. White-label branding settings.
- [ ] E9. White-label report templates + PDF export queue.
- [ ] E10. Module-level feature flags and rollout controls.

---

## 5) Testing Checklist (Must Pass)

### Unit Tests
- [ ] Services: auth, RBAC, content, approval, scheduler.
- [ ] Queue workers and retry logic.
- [ ] Attribution calculators.
- [ ] AI response validation and fallback handlers.

### Integration Tests
- [ ] Social connector publish success and failure mapping.
- [ ] CRM sync and attribution event joins.
- [ ] Compliance enforcement behavior.

### E2E Tests
- [ ] Core workflow end-to-end.
- [ ] Low-score warning flow before publish.
- [ ] Compliance blocker + override flow.
- [ ] White-label report generation flow.

---

## 6) DevOps and Deployment Checklist
- [ ] Dev, staging, prod environments configured.
- [ ] Config and secret management defined.
- [ ] Automated DB migration strategy.
- [ ] Rollback strategy documented.
- [ ] Alerting thresholds defined (errors, queue failures, data freshness).
- [ ] Deployment checklist documented for each release.

---

## 7) Data and Reporting Checklist
- [ ] Revenue attribution traceability (touchpoint -> conversion -> revenue).
- [ ] Dashboard metrics definitions documented.
- [ ] Data freshness timestamps surfaced in UI.
- [ ] Export APIs (CSV/PDF) for key reports.
- [ ] KPI glossary file maintained.

---

## 8) Product Readiness Checklist
- [ ] Pilot workspace onboarding flow complete.
- [ ] User roles and permissions documented.
- [ ] Known limitations list maintained.
- [ ] Help text and error UX reviewed.
- [ ] Feedback capture mechanism added.

---

## 9) Release Gates

### Gate 1 - MVP Ready
- [ ] Phase A + B complete
- [ ] Core E2E passing
- [ ] Staging demo stable

### Gate 2 - Revenue Intelligence Ready
- [ ] Phase C complete
- [ ] Attribution dashboard validated with sample CRM data

### Gate 3 - Differentiation Ready
- [ ] Phase D complete
- [ ] Predictive + brand modules stable for pilot users

### Gate 4 - Scale Ready
- [ ] Phase E complete
- [ ] Localization/compliance/white-label validated

---

## 10) Autonomous Progress Log (Update Continuously)

### Status Legend
- `TODO`
- `IN_PROGRESS`
- `DONE`
- `BLOCKED`

### Execution Log Template
Copy and append one line per completed task:

`[DATE] [TASK_ID] [STATUS] [OWNER: AI] [NOTES: short summary + test result]`

Example:
`[2026-03-27] [B5] [DONE] [OWNER: AI] [Worker and queue added, 8 unit tests passing]`

---

## 11) Blocker Handling Protocol
If blocked:
1. Mark task `BLOCKED`.
2. Record blocker cause in progress log.
3. Suggest 2 fallback options.
4. Move to next independent task.
5. Return to blocked task after dependencies are resolved.

---

## 12) AI Prompt to Start Autonomous Execution

Use this exact prompt:

```text
Read and follow `Plan/SMM_Autonomous_Development_Checklist.md` as the source of truth.
Start with the first unchecked P0 item in Phase A.
For each task:
1) implement code,
2) run tests/lint,
3) update the progress log section in the same file,
4) continue to next unchecked item.
If blocked, apply the blocker protocol and continue with independent tasks.
```

---

## 13) Related Documents
- `Plan/SMM_Master_Execution_Plan.md`
- `Plan/SMM_Sprint1_Backlog.md`
- `Plan/SMM_Sprint2_Backlog.md`
- `Plan/SMM_Sprint3_Backlog.md`
- `Plan/SMM_Sprint4_Backlog.md`
- `Plan/SMM_AI_Development_Prompt_Library.md`
- `Plan/SMM_AI_Prompt_Library_Quick.md`
