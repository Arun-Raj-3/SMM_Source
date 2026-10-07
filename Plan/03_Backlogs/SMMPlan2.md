# Social Media Marketing Application — Foundation Plan & Tasks

> **Reference spec (v2.0, 2026-10-07):** Use this file for detailed acceptance criteria only. Sequencing and scope come from `Plan/02_Execution/SMM_Implementation_Phases.md`; stack, naming and scope decisions from `Plan/02_Execution/SMM_Decisions_Log.md` (wins on any conflict). Task status lives in `Plan/02_Execution/SMM_Autonomous_Development_Checklist.md`.


> **Version:** 1.0  
> **Date:** March 10, 2026  
> **Scope:** Phase 1 — Foundation (Months 1–4)  
> **Reference:** [Product Blueprint](../01_Strategy/SocialMediaMarketing.md)

---

## Table of Contents

1. [Overview](#1-overview)
2. [Timeline & Phasing](#2-timeline--phasing)
3. [Project & Infrastructure](#3-project--infrastructure)
4. [Publishing Engine](#4-publishing-engine)
5. [Content Studio (Foundation)](#5-content-studio-foundation)
6. [Analytics Dashboard](#6-analytics-dashboard)
7. [Team & Workflow](#7-team--workflow)
8. [Unified Social Inbox](#8-unified-social-inbox)
9. [CRM Integration (Beta)](#9-crm-integration-beta)
10. [Polish & Launch Readiness](#10-polish--launch-readiness)
11. [Dependency Map](#11-dependency-map)
12. [Definition of Done](#12-definition-of-done)

---

## 1. Overview

### 1.1 Purpose

This document breaks down the **Foundation phase** of the Social Media Marketing Application into actionable tasks with:

- **Detailed descriptions** and scope
- **Acceptance criteria** for each task
- **Deliverables** and artifacts
- **Dependencies** and suggested order
- **Rough effort** (story points or days) where useful

### 1.2 Success Criteria for Foundation Phase

- Users can **connect** at least 5 social platforms and **schedule** posts from a single calendar.
- **AI Writer** and **AI Image Generator** support content creation; **Brand Kit** stores basic brand identity.
- **Basic analytics** show reach, engagement, and post-level performance in one dashboard.
- **Approval workflows** and **RBAC** control who can create, approve, and publish.
- **Unified inbox** shows DMs/comments and allows replies from the app.
- **HubSpot** and **Salesforce** integrations (beta) sync social touchpoints and UTM-tagged links.

### 1.3 Technology Stack (from Blueprint)

| Layer        | Choice                          |
|-------------|----------------------------------|
| Frontend    | React 19, TypeScript, Tailwind, Shadcn/UI, Zustand, React Query |
| Backend     | Node.js, NestJS (TypeScript)     |
| Database    | PostgreSQL (primary), MongoDB (optional for content metadata) |
| Cache/Queue | Redis, BullMQ                    |
| Storage     | AWS S3 + CloudFront              |
| Auth        | Auth0 (OAuth 2.0)                |
| CI/CD       | GitHub Actions, Docker           |

---

## 2. Timeline & Phasing

| Phase              | Weeks   | Focus                                      |
|--------------------|---------|--------------------------------------------|
| **A. Project & Infra** | 1–2     | Repo, DB, Auth, API shell, Frontend shell  |
| **B. Publishing**      | 3–6     | OAuth, content model, scheduler, calendar  |
| **C. Content Studio**  | 5–8     | AI Writer, Image Gen, Brand Kit, bulk upload |
| **D. Analytics**       | 6–8     | Ingestion, dashboard, post performance     |
| **E. Team & Workflow** | 7–9     | RBAC, approval, comments, audit log       |
| **F. Social Inbox**    | 8–10    | Inbox model, UI, reply                     |
| **G. CRM Beta**        | 9–12    | HubSpot, Salesforce, UTM                  |
| **H. Polish**          | 11–12   | Onboarding, errors, docs                   |

*Some tracks run in parallel once dependencies are met.*

---

## 3. Project & Infrastructure

### Task F1 — Monorepo & Workspace Setup

**Objective:** Single repository with clear separation of apps and shared code.

**Scope:**

- Create monorepo (e.g. **Turborepo** or **Nx**) with:
  - `apps/web` — React 19 + TypeScript + Vite (or Next.js)
  - `apps/api` — NestJS API
  - `packages/types` — shared TypeScript types and enums
  - `packages/config` — shared ESLint, TypeScript, env schema (e.g. Zod)
- Configure path aliases (`@shared/types`, etc.).
- Root `package.json` scripts: `build`, `lint`, `test`, `dev` (run web + api in parallel).

**Acceptance Criteria:**

- [ ] Single `git clone` builds and runs both apps.
- [ ] Shared types are imported in both web and api without duplication.
- [ ] README documents how to install dependencies and run locally.

**Deliverables:**

- Monorepo structure.
- `README.md` with setup instructions.

**Effort:** 2–3 days

---

### Task F2 — CI/CD Pipeline

**Objective:** Automated quality checks and deployable artifacts.

**Scope:**

- **GitHub Actions** workflows:
  - On PR: lint (ESLint), typecheck, unit tests for api and web.
  - On merge to `main`: full build, build Docker images for `api` and `web`.
- **Docker:** Dockerfiles for API (Node) and Web (Node for build, nginx or static serve).
- Optional: deploy to staging (e.g. AWS ECS, Render, or similar) on merge to `main`.

**Acceptance Criteria:**

- [ ] Every PR runs lint, typecheck, and tests; failing pipeline blocks merge.
- [ ] Merge to `main` produces Docker images (or build artifacts).
- [ ] Staging deployment (if implemented) is documented.

**Deliverables:**

- `.github/workflows/ci.yml` (and optional `deploy.yml`).
- `Dockerfile` for api and web.
- Short CI/CD section in README.

**Effort:** 2–3 days  
**Depends on:** F1

---

### Task F3 — Database & Schema (v1)

**Objective:** PostgreSQL schema that supports users, orgs, content, and publishing.

**Scope:**

- Design and implement schema (via **TypeORM**, **Prisma**, or **Knex** migrations) for:
  - **Users:** id, email, name, auth0_id, avatar_url, created_at, updated_at.
  - **Organizations:** id, name, slug, settings (JSONB), created_at, updated_at.
  - **OrganizationMembers:** user_id, organization_id, role (enum: admin, editor, approver, viewer), joined_at.
  - **SocialAccounts:** id, organization_id, platform (enum), platform_user_id, access_token_encrypted, refresh_token_encrypted, username, profile_picture_url, connected_at, last_sync_at.
  - **Content/Drafts:** id, organization_id, created_by_user_id, title, body_text, status (draft, pending_approval, approved, scheduled, published, failed), scheduled_at, published_at, metadata (JSONB for platform-specific fields).
  - **ContentMedia:** id, content_id, type (image, video), url (S3), platform_specs (JSONB).
  - **ContentVersions:** id, content_id, snapshot (JSONB or ref), created_at, created_by_user_id (for history).
  - **ScheduledJobs:** id, content_id, platform, scheduled_at, status, published_at, error_message (for BullMQ job id and result).
  - **AuditLog:** id, organization_id, user_id, action, entity_type, entity_id, payload (JSONB), created_at.
- Indexes for common queries (org_id, user_id, status, scheduled_at, platform).

**Acceptance Criteria:**

- [ ] All tables created via migrations; migrations are reversible.
- [ ] Seed script (optional) creates one org, one user, one social account for local dev.
- [ ] Schema diagram or ER description in docs.

**Deliverables:**

- Migration files.
- Schema documentation (e.g. `docs/database-schema.md`).

**Effort:** 3–4 days  
**Depends on:** F1

---

### Task F4 — Auth & Tenant Model

**Objective:** Users authenticate via Auth0 and are scoped to organizations (tenants).

**Scope:**

- Integrate **Auth0**:
  - Login/signup (email + social if desired).
  - API protection: validate JWT in NestJS (e.g. `passport-jwt`), attach user to request.
- **Tenant resolution:** from JWT or header (e.g. `X-Organization-Id`), load organization and membership; enforce that user belongs to org.
- **RBAC:** map role (admin, editor, approver, viewer) to permissions (e.g. admin: all; editor: create/edit content, schedule; approver: approve content; viewer: read-only). Implement guard that checks permission for current endpoint.

**Acceptance Criteria:**

- [ ] Unauthenticated requests to protected routes return 401.
- [ ] Requests with invalid or expired JWT return 401.
- [ ] User can only access data for organizations they belong to; wrong org returns 403.
- [ ] Role is enforced on at least one sample endpoint (e.g. “publish” requires editor or admin).

**Deliverables:**

- Auth0 application config and env vars.
- Auth module, JWT strategy, tenant middleware/guard, RBAC guard.
- Short doc: “Auth and multi-tenancy.”

**Effort:** 3–4 days  
**Depends on:** F3

---

### Task F5 — Core API Structure

**Objective:** REST API with clear modules and conventions.

**Scope:**

- NestJS modules:
  - `AuthModule` — login callback, JWT validation, tenant.
  - `UsersModule` — current user profile, update profile.
  - `OrganizationsModule` — CRUD for org (admin), list members, invite (optional in v1).
  - `ContentModule` — CRUD for drafts, list with filters (status, platform, date range).
  - `PublishingModule` — schedule, unschedule, list scheduled jobs, trigger publish (or internal only).
  - `AnalyticsModule` — placeholder or stub for dashboard metrics.
  - `InboxModule` — placeholder or stub for conversations.
- Global: validation (class-validator), exception filters (consistent error shape), logging.
- **OpenAPI/Swagger** at `/api/docs` with auth (Bearer).

**Acceptance Criteria:**

- [ ] Each module has a controller with at least one endpoint; Swagger documents them.
- [ ] All DTOs use class-validator; invalid body returns 400 with clear message.
- [ ] Errors return consistent format: `{ statusCode, message, error }`.

**Deliverables:**

- NestJS app with modules above.
- `GET /api/docs` serving Swagger UI.

**Effort:** 3–4 days  
**Depends on:** F4

---

### Task F6 — Frontend Shell & Routing

**Objective:** SPA shell with layout, auth, and base UI system.

**Scope:**

- **React 19** + **TypeScript** + **Vite** (or Next.js).
- **Tailwind CSS** + **Shadcn/UI** — install and configure; use one layout (sidebar + top bar).
- **Routing:** routes for Login, Dashboard (home), Calendar, Content (list/detail), Inbox, Settings, Team (optional). Protected route wrapper that redirects to login if not authenticated.
- **Auth context:** get user from Auth0 (e.g. `@auth0/auth0-react`), provide user and logout to tree.
- **API client:** axios or fetch wrapper with base URL and attach Bearer token from Auth0; handle 401 (logout or refresh).
- **State:** Zustand for UI state (e.g. sidebar open); React Query for server state (optional from F6).

**Acceptance Criteria:**

- [ ] User can log in and see a dashboard shell with navigation.
- [ ] Logout clears session and redirects to login.
- [ ] Unauthenticated access to any protected route redirects to login.
- [ ] All existing routes render without error (placeholder content OK).

**Deliverables:**

- Frontend app with layout, routes, auth context, API client.
- Design tokens / theme aligned with Shadcn (optional: dark mode).

**Effort:** 3–4 days  
**Depends on:** F1

---

## 4. Publishing Engine

### Task F7 — Social Platform OAuth & Connection

**Objective:** Users can connect social accounts; app stores tokens and displays connection status.

**Scope:**

- For each platform (start with **Instagram**, **Facebook**, **LinkedIn**, **X/Twitter**, **TikTok**):
  - Implement OAuth (or official SDK) flow: redirect to platform → callback → exchange code for access_token (and refresh_token if available).
  - Store tokens encrypted (e.g. AES with env key); store platform_user_id, username, profile_picture_url.
  - Implement token refresh where supported (cron or on-use).
- **API:** `GET /social-accounts` (list for org), `POST /social-accounts/connect/:platform` (return auth URL), `GET /social-accounts/callback/:platform` (handle callback, save account, redirect to app).
- **UI:** “Connect account” per platform; list connected accounts with disconnect option.

**Acceptance Criteria:**

- [ ] User can connect at least 3 platforms (e.g. Instagram, Facebook, LinkedIn) and see them in the list.
- [ ] Tokens are not stored in plain text; refresh works where platform supports it.
- [ ] Disconnect removes the account and invalidates usage in app.

**Deliverables:**

- OAuth flows and token storage per platform.
- Connect/disconnect API and UI.

**Effort:** 5–7 days (depends on platform quirks)  
**Depends on:** F5, F6

---

### Task F8 — Content Model & Draft CRUD

**Objective:** Full create/read/update/delete for content drafts with copy, media, and platform targeting.

**Scope:**

- **API:**
  - `POST /content` — create draft (body_text, title, platform_ids[], media[], scheduled_at optional).
  - `GET /content` — list with filters: status, platform, date range, created_by; pagination.
  - `GET /content/:id` — single draft with media and version summary.
  - `PATCH /content/:id` — update draft (only if status = draft or rejected).
  - `DELETE /content/:id` — soft delete or hard delete draft.
- **Model:** Support platform-specific options (e.g. first_comment for Instagram/LinkedIn) in metadata.
- **UI:** List view (table or cards), create/edit form (rich text or textarea, media upload placeholder), platform selector (checkboxes from connected accounts).

**Acceptance Criteria:**

- [ ] User can create a draft with text and selected platforms.
- [ ] User can edit and delete drafts; list and detail reflect changes.
- [ ] Only draft/rejected content is editable; appropriate error if editing approved/scheduled content.

**Deliverables:**

- Content CRUD API and DTOs.
- Content list and create/edit pages.

**Effort:** 4–5 days  
**Depends on:** F5, F6, F7 (for platform list)

---

### Task F9 — Scheduler Service & Queue

**Objective:** Schedule posts for future publish; worker processes queue at scheduled time.

**Scope:**

- **BullMQ** (Redis):
  - Queue: `publish`.
  - Job payload: `contentId`, `platform`, `scheduledAt`, `organizationId`.
  - Schedule job when user clicks “Schedule” (one job per platform per content).
- **Worker:** Process job at scheduled time (or after): load content, get social account token, call publish service (F10); update ScheduledJobs and Content status; on failure, retry with backoff, then mark failed and write error_message.
- **API:** `POST /content/:id/schedule` (create BullMQ delayed jobs), `POST /content/:id/unschedule` (remove jobs), `GET /content/:id/scheduled-jobs` (optional, for debugging).

**Acceptance Criteria:**

- [ ] Scheduling a post creates delayed jobs that run at the right time (use Redis and worker).
- [ ] Worker publishes via F10 when time comes; status updates to published or failed.
- [ ] Unschedule removes pending jobs and reverts status to draft/approved as appropriate.

**Deliverables:**

- BullMQ queue and worker process.
- Schedule/unschedule API and integration in content flow.

**Effort:** 3–4 days  
**Depends on:** F8, F10 (can be stubbed initially)

---

### Task F10 — Publish Execution Layer

**Objective:** For each platform, call official API to publish the post and store result.

**Scope:**

- **Per platform** (Instagram, Facebook, LinkedIn, X, TikTok, etc.):
  - Map our content model to platform API (e.g. Meta Graph API for FB/IG, LinkedIn UGC API, X API v2, TikTok Content Post API).
  - Handle media: upload if required, then attach to post.
  - Call publish endpoint; capture post_id and permalink if returned.
- **Persistence:** Update Content (status = published, published_at), ScheduledJobs (status, platform_post_id, error_message).
- **Idempotency:** If job is retried, check if already published for that content+platform before re-posting.

**Acceptance Criteria:**

- [ ] For each connected platform, a scheduled job results in a real post (or clear error).
- [ ] Post ID and link are stored for later analytics.
- [ ] Retrying a job does not create duplicate posts.

**Deliverables:**

- Publishing service and platform-specific adapters.
- Integration with F9 worker.

**Effort:** 5–8 days (platform-dependent)  
**Depends on:** F7, F8

---

### Task F11 — Calendar UI

**Objective:** Visual calendar of scheduled and published posts; edit/reschedule from calendar.

**Scope:**

- **Data:** API to return events for a date range: scheduled and published posts (one event per content per platform, or one event per content with multiple platforms).
- **UI:** Month/week view (e.g. FullCalendar, or custom grid) showing:
  - Post title or preview, platforms (icons), time, status (scheduled / published).
  - Click opens detail or sidebar to edit.
  - Drag-to-reschedule (optional): update `scheduled_at` via API and reschedule BullMQ jobs.
- **Filters:** By platform, by status.

**Acceptance Criteria:**

- [ ] User sees all scheduled and published posts in calendar for selected range.
- [ ] Clicking a post opens edit/detail; user can change time and save (reschedule).
- [ ] Filters work correctly.

**Deliverables:**

- Calendar API (events in range).
- Calendar page with view and filters.

**Effort:** 4–5 days  
**Depends on:** F8, F9

---

### Task F12 — Cross-Platform Adapter (v1)

**Objective:** Recommend or enforce platform-specific media specs; avoid failed publishes due to format.

**Scope:**

- **Specs table:** For each platform, define preferred aspect ratios, min/max dimensions, file size, formats (e.g. image: 1:1, 4:5, 9:16; video: max 60s, etc.).
- **Validation:** On upload or on schedule, validate media against specs; return warnings or errors.
- **Optional:** “Adapt” flow — e.g. suggest crop or generate multiple assets (can be v2); for v1, at least show “Recommended: 1080x1080 for Instagram feed.”

**Acceptance Criteria:**

- [ ] Specs are defined for at least Instagram, Facebook, LinkedIn, X, TikTok.
- [ ] UI or API indicates when media does not match recommended specs.
- [ ] No silent publish failures due to format when validation is used.

**Deliverables:**

- Specs config and validation helper.
- Integration in content create/schedule flow and optional UI hints.

**Effort:** 2–3 days  
**Depends on:** F8, F10

---

## 5. Content Studio (Foundation)

### Task F13 — AI Content Writer (Captions)

**Objective:** Generate caption and hashtag suggestions from topic/brief using an LLM.

**Scope:**

- **Backend:** Service that calls OpenAI or Claude API with prompt: “Write a [tone] caption for [topic/brief]. Platform: [platform]. Max length: [n]. Include 5–10 hashtags.”
- **Brand Kit:** If F15 exists, include “Write in this tone: [brand_tone]” in prompt.
- **API:** `POST /content/ai/generate-caption` — body: `topic`, `tone`, `platform`, `maxLength`; response: `caption`, `hashtags[]`.
- **UI:** In content create/edit, “Generate with AI” button; show result and allow insert/edit.

**Acceptance Criteria:**

- [ ] User can generate a caption from a short topic; result is inserted into draft.
- [ ] Tone and platform can be selected; output is appropriate length.
- [ ] Hashtags are returned and can be added to caption or first comment.

**Deliverables:**

- AI Writer service and API.
- Generate button and result handling in content form.

**Effort:** 2–3 days  
**Depends on:** F8, F15 (optional)

---

### Task F14 — AI Image Generator

**Objective:** Generate an image from a text prompt and attach it to a draft.

**Scope:**

- **Backend:** Call DALL·E 3 or Stable Diffusion API; upload result to S3; return URL.
- **API:** `POST /content/ai/generate-image` — body: `prompt`, `size` (optional); response: `url`.
- **UI:** In content form, “Generate image” → enter prompt → generate → preview and attach to draft (add to ContentMedia).

**Acceptance Criteria:**

- [ ] User can generate an image from a prompt and attach it to a draft.
- [ ] Image is stored in S3 and referenced in DB; no broken URLs in publish.

**Deliverables:**

- Image generation service and S3 upload.
- Generate-image API and UI flow.

**Effort:** 2–3 days  
**Depends on:** F8 (and S3 configured)

---

### Task F15 — Brand Kit (Minimal)

**Objective:** Store and use basic brand identity (colors, logo, tone) across the app.

**Scope:**

- **DB:** Table or JSONB in Organization: `brand_kit` — logo_url, primary_color, secondary_color, tone_of_voice (text), optional font_family.
- **API:** `GET /organizations/current/brand-kit`, `PATCH /organizations/current/brand-kit`.
- **UI:** Brand Kit page (settings or dedicated): upload logo (to S3), color pickers, tone textarea. Show preview (e.g. sample card with logo and colors).
- **Usage:** F13 (AI Writer) can read tone; calendar or content cards can show brand colors (optional).

**Acceptance Criteria:**

- [ ] User can set and save logo, colors, and tone.
- [ ] AI Writer uses tone in prompt when generating captions.
- [ ] Saved values persist and load correctly.

**Deliverables:**

- Brand Kit schema, API, and settings UI.

**Effort:** 2–3 days  
**Depends on:** F5, F6

---

### Task F16 — Bulk Content Upload (CSV)

**Objective:** Create multiple drafts from a CSV/Excel file.

**Scope:**

- **Format:** CSV with columns: title, body_text, image_url (or media_url), scheduled_at, platforms (comma-separated).
- **API:** `POST /content/bulk-upload` — multipart file upload; parse CSV; validate each row (platforms exist, dates valid); create drafts (status draft); return summary: created, failed, errors per row.
- **UI:** Upload page: choose file, preview table (first 10 rows), “Import” → show result summary and link to content list.

**Acceptance Criteria:**

- [ ] Valid CSV creates multiple drafts; invalid rows are skipped with clear error messages.
- [ ] User sees count of created vs failed and can fix and re-upload if needed.

**Deliverables:**

- CSV parser and validation.
- Bulk upload API and UI.

**Effort:** 3–4 days  
**Depends on:** F8

---

## 6. Analytics Dashboard

### Task F17 — Analytics Ingestion (v1)

**Objective:** Periodically fetch post-level metrics from each platform and store them.

**Scope:**

- **Per platform:** Use official APIs (e.g. Meta Insights, LinkedIn Analytics, X metrics, TikTok) to fetch for each published post: impressions, reach, likes, comments, shares, clicks, saves (where available).
- **Job:** Cron (e.g. daily) or BullMQ recurring job: for each SocialAccount, fetch new metrics for posts published in last N days; upsert into `PostMetrics` table (post_id, platform, metrics JSONB, date).
- **Schema:** `PostMetrics`: content_id, platform, date, impressions, likes, comments, shares, clicks, etc.

**Acceptance Criteria:**

- [ ] After publishing, within 24 hours, metrics are stored for that post.
- [ ] Historical backfill possible for existing published posts (one-time script or admin endpoint).

**Deliverables:**

- Metrics fetch services per platform.
- Ingestion job and PostMetrics storage.

**Effort:** 4–5 days  
**Depends on:** F10

---

### Task F18 — Unified Dashboard UI

**Objective:** Single dashboard with high-level metrics and simple trends.

**Scope:**

- **API:** `GET /analytics/dashboard` — aggregates for org: total impressions, total engagement (likes + comments + shares), total clicks, period (e.g. last 7/30 days); optional daily breakdown for charts.
- **UI:** Dashboard page: KPI cards (impressions, engagement, clicks); line or bar chart of trend over time; filter by date range and platform.

**Acceptance Criteria:**

- [ ] User sees correct totals for selected period and platforms.
- [ ] Chart reflects daily (or weekly) breakdown; data matches stored metrics.

**Deliverables:**

- Dashboard API and aggregation logic.
- Dashboard page with KPIs and chart (e.g. Recharts).

**Effort:** 3–4 days  
**Depends on:** F17

---

### Task F19 — Post-Level Performance

**Objective:** List and detail view of post performance (“Post Performance DNA”).

**Scope:**

- **API:** `GET /analytics/posts` — list published posts with metrics (impressions, engagement, clicks, etc.), sort by metric or date; `GET /analytics/posts/:id` — single post with full metrics and platform link.
- **UI:** Table of posts with columns: preview, platforms, date, impressions, likes, comments, shares, clicks; sortable/filterable. Click row → detail or drawer with full breakdown and link to native post.

**Acceptance Criteria:**

- [ ] User can see all published posts with key metrics and sort by any metric.
- [ ] Detail view shows full “DNA” (all available metrics) and link to view on platform.

**Deliverables:**

- Post analytics API.
- Posts performance table and detail view.

**Effort:** 2–3 days  
**Depends on:** F17, F18

---

## 7. Team & Workflow

### Task F20 — RBAC Enforcement

**Objective:** Every content and publishing API respects organization role.

**Scope:**

- Define permission matrix: e.g. Viewer (read only), Editor (create/edit content, schedule), Approver (approve/reject), Admin (all + org settings).
- **Guard:** For each endpoint, require one of a set of permissions; load user role from membership and deny if insufficient.
- Apply to: Content CRUD, schedule/unschedule, analytics, inbox, team list. Viewer can only GET; Editor can create/edit/schedule; Approver can approve; Admin can delete, manage members, etc.

**Acceptance Criteria:**

- [ ] Viewer cannot create or edit content; receives 403 with clear message.
- [ ] Editor can create and schedule but cannot approve (if approval is required).
- [ ] Approver can approve; Admin can do everything. All enforced in API.

**Deliverables:**

- Permission matrix doc and RBAC guard applied to all relevant endpoints.

**Effort:** 2–3 days  
**Depends on:** F4, F5

---

### Task F21 — Approval Workflow (v1)

**Objective:** Drafts can be submitted for approval; only approved (or bypass) content can be scheduled.

**Scope:**

- **States:** draft → pending_approval → approved | rejected. Transition: “Submit for approval” (draft → pending_approval), “Approve” / “Reject” (pending_approval → approved / rejected). Rejected can be edited and resubmitted.
- **API:** `POST /content/:id/submit-for-approval`, `POST /content/:id/approve`, `POST /content/:id/reject` (with optional comment). Schedule only allowed when status = approved or when org setting “approval_required” is false.
- **Approver:** User with approver or admin role; optional “default approver” per org.
- **UI:** Buttons in content detail: “Submit for approval”, “Approve”, “Reject”; status badge; optional notification (email or in-app) when submitted.

**Acceptance Criteria:**

- [ ] Editor can submit; Approver can approve/reject; schedule is blocked until approved (when approval is required).
- [ ] Rejected content can be edited and resubmitted; history is clear.

**Deliverables:**

- State machine and API for approval.
- UI actions and status display.

**Effort:** 3–4 days  
**Depends on:** F8, F20

---

### Task F22 — Inline Comments on Drafts

**Objective:** Team can comment on drafts for feedback before approval/publish.

**Scope:**

- **Schema:** `ContentComments`: id, content_id, user_id, body, created_at, resolved_at (optional).
- **API:** `GET /content/:id/comments`, `POST /content/:id/comments`, `PATCH /comments/:id/resolve`.
- **UI:** In content detail, comments section; add comment; show author and time; mark as resolved (optional).

**Acceptance Criteria:**

- [ ] User can add a comment to a draft and see it in the thread.
- [ ] Comments load with the content; resolve toggle works if implemented.

**Deliverables:**

- Comments table and API.
- Comments UI in content detail.

**Effort:** 2–3 days  
**Depends on:** F8, F20

---

### Task F23 — Activity Audit Log

**Objective:** Log important actions for compliance and debugging.

**Scope:**

- **Events:** content_created, content_updated, content_submitted, content_approved, content_rejected, content_scheduled, content_published, content_failed, user_invited, role_changed, etc.
- **Storage:** Append-only AuditLog table (or equivalent); include user_id, org_id, action, entity_type, entity_id, payload (e.g. diff or summary), ip (optional), created_at.
- **API:** `GET /audit-log` — filter by user, date range, action, entity_type; paginated (admin/approver only or per-org admin).
- **UI:** Optional “Activity” or “Audit log” page for org admins.

**Acceptance Criteria:**

- [ ] Every content state change and publish is logged with user and timestamp.
- [ ] Audit log API returns correct filtered results; no sensitive data (e.g. tokens) in payload.

**Deliverables:**

- Audit logging middleware/service and AuditLog persistence.
- Audit log API and optional UI.

**Effort:** 2–3 days  
**Depends on:** F5, F20

---

## 8. Unified Social Inbox

### Task F24 — Inbox Data Model & Ingestion

**Objective:** Ingest DMs and comments from connected platforms into a single model.

**Scope:**

- **Schema:** `Conversations` (id, organization_id, platform, platform_conversation_id, participant_username, participant_id, last_message_at, created_at), `InboxMessages` (id, conversation_id, direction in/out, platform_message_id, body, created_at, read_at, sentiment optional).
- **Ingestion:** Per platform, use APIs (e.g. Meta Graph API for IG/FB DMs and comments, LinkedIn, X, TikTok) to fetch:
  - DMs (and optionally comments on your posts).
  - Normalize into Conversation + InboxMessages; deduplicate by platform_message_id.
- **Job:** Recurring (e.g. every 5–15 min) fetch new messages and append; update last_message_at.

**Acceptance Criteria:**

- [ ] New DMs (and optionally comments) appear in DB within polling interval.
- [ ] No duplicate messages; conversation thread order is correct.

**Deliverables:**

- Inbox schema and platform-specific fetchers.
- Recurring ingestion job.

**Effort:** 5–6 days  
**Depends on:** F7

---

### Task F25 — Inbox UI

**Objective:** List conversations and view thread in the app.

**Scope:**

- **API:** `GET /inbox/conversations` — list with last message preview, unread count, platform; `GET /inbox/conversations/:id/messages` — paginated messages.
- **UI:** Inbox page: sidebar list of conversations (avatar, name, preview, time, unread badge); main area shows selected thread; mark as read when viewed.

**Acceptance Criteria:**

- [ ] User sees all conversations from connected platforms in one list.
- [ ] Selecting a conversation shows full thread in chronological order.
- [ ] Unread state updates when user views the thread.

**Deliverables:**

- Inbox API and UI (list + thread).

**Effort:** 3–4 days  
**Depends on:** F24, F6

---

### Task F26 — Reply from Inbox (v1)

**Objective:** Send a reply from the app; show in thread and in platform.

**Scope:**

- **API:** `POST /inbox/conversations/:id/messages` — body: message text; backend calls platform send API (DM or comment reply); store outgoing message in InboxMessages.
- **UI:** Reply input at bottom of thread; send → optimistic update and then confirm from server; show sent messages in thread.
- **Optional:** “Suggested replies” — 2–3 canned options or one AI-generated suggestion (simple prompt); user can edit and send.

**Acceptance Criteria:**

- [ ] User can send a reply; it appears in the thread and on the platform.
- [ ] Sent messages are stored and visible on refresh.

**Deliverables:**

- Send message API and platform adapters.
- Reply input and suggested replies (if implemented).

**Effort:** 3–4 days  
**Depends on:** F24, F25

---

## 9. CRM Integration (Beta)

### Task F27 — HubSpot Integration (Beta)

**Objective:** Sync social touchpoints (e.g. link clicks from posts) to HubSpot as activities/events.

**Scope:**

- **OAuth:** HubSpot app; connect org to HubSpot (store access/refresh tokens per org).
- **Events:** When a user clicks a UTM-tagged link from our post, we may receive this via redirect or tracking pixel; for beta, focus on “content published” and “link in post” events that we can send to HubSpot (e.g. contact identified by email or cookie).
- **Sync:** For each published post with trackable links, create HubSpot “Social post” or “Marketing event” and associate with campaign; optional: create/update contact if we have identifier.
- **API:** `GET/POST /integrations/hubspot` — connect, disconnect, status; optional sync-now for testing.

**Acceptance Criteria:**

- [ ] Org can connect HubSpot; tokens stored and refreshed.
- [ ] At least one event type (e.g. “Social post published” or “Link clicked”) appears in HubSpot for a test contact/campaign.
- [ ] Disconnect stops syncing and hides HubSpot options.

**Deliverables:**

- HubSpot OAuth and client.
- Event mapping and sync logic; settings UI for connect/disconnect.

**Effort:** 4–5 days  
**Depends on:** F10, F29 (UTM)

---

### Task F28 — Salesforce Integration (Beta)

**Objective:** Same as F27 but for Salesforce: sync social events to Salesforce (Tasks, Campaign members, or custom objects).

**Scope:**

- **OAuth:** Salesforce connected app; store tokens per org.
- **Events:** Map “post published” or “link clicked” to Salesforce Task or custom “Social_Activity”; link to Lead/Contact by email or external ID if available.
- **API:** Connect/disconnect, status; optional manual sync for testing.

**Acceptance Criteria:**

- [ ] Org can connect Salesforce; events appear in Salesforce for a test Lead/Contact.
- [ ] Documentation or in-app help for required Salesforce config (custom object or Task).

**Deliverables:**

- Salesforce OAuth and client.
- Event sync and settings UI.

**Effort:** 4–5 days  
**Depends on:** F10, F29

---

### Task F29 — UTM and Link Tagging

**Objective:** All links in scheduled posts get UTM parameters for attribution.

**Scope:**

- **Defaults:** source = platform name, medium = “social”, campaign = content title or campaign name (user input or auto).
- **Storage:** Store campaign name (and optional campaign_id) on Content; when generating post copy, append UTM to any URL in body (regex or markdown link parser).
- **UI:** In content form, optional “Campaign name” field used for utm_campaign; show preview of sample link with UTM.
- **Docs:** Short note for users: “Links in your posts are tagged for CRM attribution.”

**Acceptance Criteria:**

- [ ] Scheduled post that contains a URL is published with UTM params on that URL (where platform allows).
- [ ] Campaign name is configurable and stored; F27/F28 can use it for campaign mapping.

**Deliverables:**

- UTM appending logic and campaign field.
- Content form update and docs.

**Effort:** 1–2 days  
**Depends on:** F8

---

## 10. Polish & Launch Readiness

### Task F30 — Onboarding & Empty States

**Objective:** New users see clear first steps; empty states guide actions.

**Scope:**

- **Onboarding:** After first login, optional short flow: “Connect your first social account” → “Create your first post” → “Schedule it” (with skip). Store “onboarding_completed” so we don’t show again.
- **Empty states:** Calendar (no posts), Inbox (no conversations), Dashboard (no data), Content list (no drafts) — each with illustration or icon, short copy, and CTA (e.g. “Connect account”, “Create post”).

**Acceptance Criteria:**

- [ ] First-time user can complete onboarding in under 2 minutes (connect + one draft).
- [ ] Every main view has an empty state with clear next action.

**Deliverables:**

- Onboarding flow and empty state components.

**Effort:** 2–3 days  
**Depends on:** F6, F7, F8, F11, F18, F25

---

### Task F31 — Error Handling & Resilience

**Objective:** User-friendly errors and robust API/worker behavior.

**Scope:**

- **API:** Map exceptions to HTTP status and message; avoid leaking stack traces; log full error server-side. Retry for transient failures (e.g. platform API 5xx) with backoff.
- **Worker:** Publish job retries (e.g. 3 times with delay); then mark failed and store error_message; optional alert (Slack/email) for repeated failures.
- **UI:** Toasts or inline messages for network errors, 403, 429 (rate limit); “Something went wrong” with support link or “Retry”.
- **Health:** `GET /health` (and optional /ready) for API and worker; used by load balancer or orchestrator.

**Acceptance Criteria:**

- [ ] User never sees raw stack trace; every error has a clear message or fallback.
- [ ] Publish failures are retried; final failure is visible in UI (e.g. in calendar or content status).
- [ ] Health endpoint returns 200 when DB and Redis are reachable.

**Deliverables:**

- Global exception filter and retry logic; health endpoint.
- UI error handling and optional alerting.

**Effort:** 2–3 days  
**Depends on:** F5, F9, F10, F6

---

### Task F32 — Documentation & Runbook

**Objective:** Team and ops can set up and operate the app from docs.

**Scope:**

- **README:** Prerequisites (Node, Docker, Redis, PostgreSQL), env vars (list with description), `npm install`, `docker-compose up` (if applicable), run api + web + worker.
- **Env template:** `.env.example` with all keys and placeholder values.
- **Runbook:** One-page “Operations”: how to deploy, how to run migrations, how to add a new social platform (checklist), where to find logs, how to revoke a social account or HubSpot/Salesforce.

**Acceptance Criteria:**

- [ ] New developer can run the app locally using only README and .env.example.
- [ ] Runbook is sufficient to perform one deploy and one “add platform” flow.

**Deliverables:**

- Updated README, .env.example, and docs/runbook.md.

**Effort:** 1–2 days  
**Depends on:** All prior tasks (can be updated incrementally)

---

## 11. Dependency Map

```
F1 (Monorepo)
├── F2 (CI/CD)
├── F3 (DB)
│   └── F4 (Auth)
│       └── F5 (API)
│           ├── F7 (OAuth)
│           │   ├── F8 (Content CRUD)
│           │   │   ├── F9 (Scheduler) ← F10 (Publish)
│           │   │   │   ├── F11 (Calendar)
│           │   │   │   ├── F17 (Analytics ingestion)
│           │   │   │   │   ├── F18 (Dashboard)
│           │   │   │   │   └── F19 (Post performance)
│           │   │   │   └── F27, F28 (CRM) ← F29 (UTM)
│           │   │   ├── F12 (Cross-platform adapter)
│           │   │   ├── F13 (AI Writer) ← F15 (Brand Kit)
│           │   │   ├── F14 (AI Image)
│           │   │   └── F16 (Bulk upload)
│           │   └── F24 (Inbox ingestion)
│           │       ├── F25 (Inbox UI)
│           │       └── F26 (Reply)
│           ├── F20 (RBAC) → F21 (Approval), F22 (Comments), F23 (Audit)
│           └── F6 (Frontend shell)
└── F30 (Onboarding), F31 (Errors), F32 (Docs) — after core flows
```

**Suggested sprint grouping:**

- **Sprint 1:** F1, F2, F3, F4
- **Sprint 2:** F5, F6, F7
- **Sprint 3:** F8, F9, F10, F12
- **Sprint 4:** F11, F15, F13, F14, F16
- **Sprint 5:** F17, F18, F19, F20, F21
- **Sprint 6:** F22, F23, F24, F25, F26
- **Sprint 7:** F29, F27, F28
- **Sprint 8:** F30, F31, F32

---

## 12. Definition of Done

For each task to be considered **done**:

1. **Code:** Implemented and merged to main (or feature branch with PR approved).
2. **Tests:** At least critical paths covered (e.g. API tests for new endpoints, or unit tests for services).
3. **Docs:** README or inline comments updated if behavior or setup changes.
4. **Acceptance criteria:** All checkboxes in this document for that task are met.
5. **No regressions:** Existing flows (login, create draft, schedule, publish) still work after the change.

---

*This foundation plan aligns with Phase 1 of the [Social Media Marketing Application Blueprint](../01_Strategy/SocialMediaMarketing.md). Adjust timelines and scope to match team size and priorities.*
