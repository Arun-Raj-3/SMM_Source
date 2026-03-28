# SMM Platform - Sprint 1 Backlog
## Focus: MVP Vertical Slice (`create -> approve -> schedule -> publish`)

---

## Sprint Goal
Deliver the first end-to-end publishing slice for one social platform with role-based access, approval workflow, scheduler queue, and publish status tracking.

## Sprint Duration
- 2 weeks (10 working days)

## Definition of Done (Sprint Level)
- Code merged to main branch with passing CI checks (lint, unit tests, build).
- Feature is testable in staging.
- Audit logs exist for key actions.
- Basic monitoring/logging is in place for APIs and worker jobs.
- Product and QA sign-off completed.

---

## Priority Order (Top to Bottom)
1. Foundation and security
2. Content creation and approvals
3. Scheduling and worker execution
4. Platform connector and publish status
5. QA, observability, and hardening

---

## Backlog Items

### SMM-101 - Project scaffold and environment baseline
- **Type:** Engineering
- **Priority:** P0
- **Estimate:** 3 points
- **Owner:** Tech Lead + DevOps
- **Description:** Set up monorepo app structure, environment config, and base scripts.
- **Acceptance Criteria:**
  - `apps/web`, `apps/api`, `services/worker`, `packages/shared-types` exist.
  - Local development starts with one command.
  - `.env.example` is provided for all services.
  - CI pipeline runs lint/test/build for API and web.
- **Dependencies:** None

### SMM-102 - Authentication and RBAC baseline
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Implement auth and role checks for MVP roles: `Admin`, `Editor`, `Approver`.
- **Acceptance Criteria:**
  - Login endpoint returns access and refresh tokens.
  - Protected routes reject unauthorized requests.
  - Role guards enforce permissions for content create, approve, schedule.
  - Unauthorized actions return standardized `403` response.
- **Dependencies:** SMM-101

### SMM-103 - Core data model and migrations
- **Type:** Engineering
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Create initial schema and migrations for MVP workflow.
- **Scope Entities:**
  - Workspace, User, RoleMembership
  - SocialAccount
  - ContentItem, ContentVersion
  - ApprovalRequest, ApprovalDecision
  - PublishJob, PublishAttempt
- **Acceptance Criteria:**
  - Migrations run successfully on clean database.
  - Seed script creates test workspace/users/roles.
  - Foreign keys and indexes are present for workflow lookups.
- **Dependencies:** SMM-101

### SMM-104 - Content draft API
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Build API to create, edit, and fetch content drafts.
- **Acceptance Criteria:**
  - Create draft endpoint supports text + media reference.
  - Update draft endpoint creates version history record.
  - List endpoint supports pagination and status filter.
  - Validation errors are returned in consistent format.
- **Dependencies:** SMM-102, SMM-103

### SMM-105 - Content editor UI (MVP)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Frontend
- **Description:** Build draft editor page to create and edit social posts.
- **Acceptance Criteria:**
  - Editor can save draft and show success/error states.
  - Draft list view shows status (`Draft`, `In Approval`, `Scheduled`, `Published`, `Failed`).
  - Basic input validation shown inline.
  - Data persists after page refresh.
- **Dependencies:** SMM-104

### SMM-106 - Approval workflow API
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Add submit-for-approval, approve, reject endpoints and state transitions.
- **Acceptance Criteria:**
  - Editor can submit a draft for approval.
  - Approver can approve or reject with comment.
  - State transitions are enforced (invalid transitions blocked).
  - Every decision writes to audit log.
- **Dependencies:** SMM-102, SMM-103, SMM-104

### SMM-107 - Approval inbox UI
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** Frontend
- **Description:** UI for approvers to review pending items and decide.
- **Acceptance Criteria:**
  - Approver sees pending list and item details.
  - Approve and reject actions are available with confirmation.
  - Reject requires reason.
  - UI refreshes state immediately after action.
- **Dependencies:** SMM-106

### SMM-108 - Scheduler API and job creation
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Schedule approved content and enqueue publish jobs.
- **Acceptance Criteria:**
  - Only approved content can be scheduled.
  - Scheduled time validation (future time and timezone support).
  - Job is persisted and pushed to queue.
  - Reschedule endpoint updates job timing safely.
- **Dependencies:** SMM-106

### SMM-109 - Worker service for publish execution
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend/Worker
- **Description:** Worker consumes queued jobs and performs publish attempts.
- **Acceptance Criteria:**
  - Worker picks due jobs and marks attempt status.
  - Retry policy for transient failures (configurable attempts).
  - Dead-letter path for repeated failures.
  - Structured logs include workspace, content, job IDs.
- **Dependencies:** SMM-101, SMM-108

### SMM-110 - First platform connector (single platform MVP)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** Backend
- **Description:** Implement one connector (LinkedIn or X) for post publish.
- **Acceptance Criteria:**
  - OAuth token storage and refresh flow works.
  - Publish API call sends content and receives remote post ID.
  - Connector handles rate-limit and auth-expired errors.
  - Connector responses map to internal status model.
- **Dependencies:** SMM-109, SMM-103

### SMM-111 - Publish status tracking UI
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** Frontend
- **Description:** Show live status progression in content list/detail views.
- **Acceptance Criteria:**
  - Status values visible: Scheduled, Publishing, Published, Failed.
  - Failed status displays actionable reason.
  - Manual retry button visible to authorized roles.
  - UI polling or refresh strategy is implemented.
- **Dependencies:** SMM-108, SMM-109, SMM-110

### SMM-112 - Audit logging (MVP actions)
- **Type:** Engineering
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** Backend
- **Description:** Capture immutable audit events for key workflow actions.
- **Tracked Events:**
  - Draft created/updated
  - Submitted for approval
  - Approved/rejected
  - Scheduled/rescheduled
  - Published/failed/retried
- **Acceptance Criteria:**
  - Event includes actor, action, entity ID, timestamp.
  - Audit API endpoint available for admin read access.
- **Dependencies:** SMM-104, SMM-106, SMM-108, SMM-109

### SMM-113 - Observability baseline
- **Type:** Engineering
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** DevOps + Backend
- **Description:** Add metrics and tracing hooks for API and worker.
- **Acceptance Criteria:**
  - Request latency and error rate metrics available.
  - Queue depth and job failure metrics available.
  - Alert for repeated publish failures configured.
- **Dependencies:** SMM-109

### SMM-114 - End-to-end test pack for MVP slice
- **Type:** QA
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** QA + Backend + Frontend
- **Description:** Automate and execute E2E happy path and failure path.
- **Test Scenarios:**
  - Create draft -> approve -> schedule -> publish success.
  - Reject flow with reason.
  - Publish failure and retry flow.
  - RBAC negative tests (forbidden actions).
- **Acceptance Criteria:**
  - E2E tests run in CI.
  - Test evidence attached to sprint review.
- **Dependencies:** SMM-105, SMM-107, SMM-111

---

## Capacity and Story Point Summary
- **Total Planned Points:** 58
- **Recommended Sprint Capacity:** 40-45 points (for 6-7 person team)
- **Execution Note:** Commit P0 items first; shift P1 items (`SMM-107`, `SMM-111`, `SMM-113`) to Sprint 1.5 if capacity is constrained.

---

## Suggested Sprint Plan (Day-by-Day)
- **Day 1-2:** SMM-101, SMM-103
- **Day 2-4:** SMM-102, SMM-104, SMM-105
- **Day 4-6:** SMM-106, SMM-107
- **Day 6-8:** SMM-108, SMM-109, SMM-110
- **Day 8-9:** SMM-111, SMM-112, SMM-113
- **Day 9-10:** SMM-114, bug fixes, sprint demo prep

---

## Risks and Mitigations (Sprint 1)
- **Risk:** Social API auth edge cases delay connector completion.  
  **Mitigation:** Build connector interface + mock provider first, then swap real provider.

- **Risk:** Queue timing or retry logic causes duplicate posts.  
  **Mitigation:** Enforce idempotency key per publish job and remote post guard.

- **Risk:** Approval states become inconsistent under concurrent edits.  
  **Mitigation:** Add optimistic locking/version check on content transitions.

---

## Sprint 1 Exit Criteria
- One platform end-to-end publish works in staging.
- Role-based approval process is enforced.
- Publish status is visible in UI.
- Basic audit log and alerting are active.
- Demo script can reliably show full workflow in less than 5 minutes.
