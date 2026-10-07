# SMM Autonomous Development Checklist
## Master To-Do List (AI-Readable, Task-by-Task)

> **Version:** 2.0 | **Updated:** 2026-10-07
> **Purpose:** The single task-level to-do list for building SMM. An AI coding assistant or the founder works through it top to bottom.
> **Phase goals and exit gates:** `Plan/02_Execution/SMM_Implementation_Phases.md`
> **Locked decisions (stack, naming, scope):** `Plan/02_Execution/SMM_Decisions_Log.md` — if anything here conflicts, the Decisions Log wins.
> **Ref column:** old IDs in `Plan/03_Backlogs/` that hold detailed acceptance criteria.

---

## 0) How To Use This File

### AI Agent Instructions
1. Read this file, the Decisions Log and the current phase in Implementation Phases before writing code.
2. Work on the **first unchecked task of the current phase only**. Do not jump ahead to later phases.
3. Before coding: state the plan and the files you will change. For any task marked 👤 (human), stop and ask the founder.
4. After each task: run lint, typecheck and tests; commit with message `<TaskID>: <summary>`; tick the box; add a progress-log line (Section 9).
5. **Stop and hand back to the founder** at every phase exit gate, when a decision is not covered by the Decisions Log, or when a task needs credentials, payments or external approvals.
6. If blocked for >30 minutes: apply the Blocker Protocol (Section 10) and move to the next independent task in the same phase.
7. Never skip validation, RBAC, audit logging or secret handling on workflow-critical features.

### Human Operator Instructions
- Prompt: *"Execute the next unchecked task in the current phase of `Plan/02_Execution/SMM_Autonomous_Development_Checklist.md`."*
- Review every commit before merging to `main`. Sign off each phase gate yourself.

### Legend
- `[ ]` To do · `[x]` Done · `[~]` In progress · `[!]` Blocked
- 👤 = needs founder action (accounts, payments, legal, customer calls)
- **Pts** = story-point estimate (capacity: 15–25 pts per 2 weeks)

---

## 1) Global Guardrails

### Stack (locked — see Decisions Log §3)
- Web: React 19 + TypeScript + Vite + **Tailwind + shadcn/ui** + **Redux Toolkit / RTK Query** + Axios
- API: Node.js + **NestJS** · Worker: NestJS/BullMQ standalone
- Data: **PostgreSQL (Supabase) + Prisma** + pgvector · Queue: **Redis + BullMQ**
- Auth: **Supabase Auth** (no custom password code) · Storage: Supabase Storage
- Billing: **Razorpay** · Monitoring: **Sentry + PostHog**
- Roles: `Admin`, `Editor`, `Approver` (+ `Viewer` in Phase 3)

### Quality Rules
- [ ] All APIs validate input (class-validator) and return `{ code, message, details?, requestId }` on error.
- [ ] RBAC + workspace isolation enforced on every protected route.
- [ ] Audit events written for every sensitive state change.
- [ ] Unit tests for services; E2E tests for workflow-critical paths.
- [ ] New modules behind feature flags.

### Security Rules
- [ ] No secrets in code; `.env.example` only holds placeholders.
- [ ] Social/CRM tokens encrypted at rest; never sent to web or mobile clients.
- [ ] Rate limiting on public endpoints; webhook signatures verified.
- [ ] No device fingerprinting; no scraping.

---

## 2) Definition of Done (Every Task)
- [ ] Code implemented; lint, typecheck and build pass.
- [ ] Tests added and passing.
- [ ] Loading / empty / error states handled (UI tasks).
- [ ] Errors logged with `requestId`, `workspaceId`; Sentry captures failures.
- [ ] Behavior verified manually (staging or local).
- [ ] Committed as `<TaskID>: <summary>`; box ticked; progress log updated.

---

## 3) Phase 0 — Setup & Long-Lead Items (Weeks 1–2)

| ✓ | ID | Task | Pts | Ref |
|---|---|---|---|---|
| [ ] | P0-01 👤 | Review Decisions Log; answer or accept defaults for O1–O4 | 1 | Decisions Log §6 |
| [ ] | P0-02 👤 | 10 customer discovery calls (agencies / D2C brands); record pains and willingness to pay | 3 | — |
| [ ] | P0-03 👤 | Sign up 3–5 pilot design partners (free pilot agreement) | 2 | Master Plan §9 |
| [ ] | P0-04 👤 | Register LinkedIn developer app; request posting scopes | 1 | D7 |
| [ ] | P0-05 👤 | Register Meta developer app; submit App Review (Pages + Instagram publishing) | 2 | D7 |
| [ ] | P0-06 👤 | Create HubSpot developer account + test portal | 1 | — |
| [ ] | P0-07 👤 | Create accounts: Supabase, Redis, Vercel, Render/Railway, Sentry, PostHog, Razorpay (test) | 1 | D15–D22 |
| [ ] | P0-08 👤 | Register product domain + short-link domain | 1 | D33 |
| [ ] | P0-09 👤 | Draft Privacy Policy + Terms of Service (DPDP-aware) | 2 | D32 |
| [ ] | P0-10 | Create `CLAUDE.md` at repo root (stack, conventions, DoD, error format) from Decisions Log | 1 | — |
| [ ] | P0-11 👤 | `git init`, GitHub remote, protect `main`, `.gitignore` for env files | 1 | — |
| [ ] | P0-12 👤 | Set monthly AI spend cap + alert | 1 | Solo Founder Plan §7 |

---

## 4) Phase 1 — Foundation (Weeks 3–6)

### Already completed (existing code in `SMM_Source/src`)
- [x] Vite + React 19 + TypeScript app created
- [x] Router with placeholder pages: Home, Drafts list, Draft editor, Approval inbox, Scheduling, Publish job status
- [x] Feature-based folder structure (`src/features/*`, `src/shared/*`)
- [x] Axios API client (`src/shared/api/client.ts`) with `/api/v1` base URL
- [x] Standard error type (`src/shared/types/api-types.ts`) matching D29
- [x] Env-based feature flag helper (`src/shared/utils/featureFlags.ts`)
- [x] Redux Toolkit + React Router installed

### To do
| ✓ | ID | Task | Pts | Ref |
|---|---|---|---|---|
| [ ] | P1-01 | Restructure to npm-workspaces monorepo: move app to `apps/web`; add `apps/api`, `apps/worker`, `packages/shared-types` | 3 | SMM-101, F1 |
| [ ] | P1-02 | Install Tailwind + shadcn/ui; rebuild `AppShell` (responsive sidebar + top bar, workspace switcher slot) | 3 | Frontend Arch §2, §9 |
| [ ] | P1-03 | Configure Redux store + RTK Query base API using the Axios client | 2 | D12 |
| [ ] | P1-04 | Add MSW mock API so all pages work without a backend | 2 | — |
| [ ] | P1-05 | GitHub Actions CI: lint, typecheck, test, build (web, api, worker) | 2 | F2 |
| [ ] | P1-06 | NestJS API skeleton: config validation, `/healthz`, `/readyz`, global error filter, requestId logging | 3 | Backend Arch §3 |
| [ ] | P1-07 | Prisma + Supabase Postgres schema v1 (Workspace, User, RoleMembership, SocialAccount, AuditEvent), migrations, seed | 3 | SMM-103, F3 |
| [ ] | P1-08 | Supabase Auth in web (login, logout, protected routes) + NestJS JWT guard | 3 | D16, F4 |
| [ ] | P1-09 | Workspace context resolution + RBAC guard with permission map (`content:create`, `approval:approve`, …) | 3 | SMM-102, F20 |
| [ ] | P1-10 | Append-only audit event service | 2 | SMM-112, F23 |
| [ ] | P1-11 | Sentry in web, api, worker | 1 | D20 |
| [ ] | P1-12 | `.env.example` for every app + rewrite `README.md` setup instructions; deploy web + api to staging | 2 | F32 |

**Phase 1 exit:** see Implementation Phases §3. 🛑 Stop for founder sign-off.

---

## 5) Phase 2 — Core Workflow MVP (Weeks 7–12)

| ✓ | ID | Task | Pts | Ref |
|---|---|---|---|---|
| [ ] | P2-01 | Content schema: ContentItem, ContentVersion, MediaAsset, ApprovalRequest, ApprovalDecision, PublishJob, PublishAttempt | 3 | SMM-103 |
| [ ] | P2-02 | Draft API: create / edit (new version) / list (pagination, status filter) / detail | 3 | SMM-104, F8 |
| [ ] | P2-03 | Draft list + editor UI with LinkedIn preview and character limit | 3 | SMM-105 |
| [ ] | P2-04 | Image upload to Supabase Storage, attach to draft | 2 | F14 (storage part) |
| [ ] | P2-05 | Approval API: submit / approve / reject with reason; state machine; optimistic locking | 3 | SMM-106, F21 |
| [ ] | P2-06 | Approval inbox UI (list, detail drawer, approve/reject confirm, reject reason required) | 2 | SMM-107 |
| [ ] | P2-07 | Scheduling API: approved only, future time, workspace timezone, reschedule, unschedule | 3 | SMM-108, F9 |
| [ ] | P2-08 | Worker: BullMQ publish queue, idempotency key, retry/backoff, dead-letter | 3 | SMM-109 |
| [ ] | P2-09 | Social connector interface + mock provider (used in CI) | 2 | Backend Arch §4.8 |
| [ ] | P2-10 | LinkedIn connector: OAuth connect/disconnect, encrypted tokens, refresh, publish, error mapping | 5 | SMM-110, F7, F10 |
| [ ] | P2-11 | Connected accounts settings page | 2 | F7 |
| [ ] | P2-12 | Publish status UI: Scheduled / Publishing / Published / Failed, reason, retry (authorized roles) | 2 | SMM-111 |
| [ ] | P2-13 | Calendar view (week/month) of scheduled and published posts | 3 | F11 |
| [ ] | P2-14 | Audit coverage for all workflow transitions + admin audit log page | 2 | SMM-112, F23 |
| [ ] | P2-15 | Playwright E2E: happy path, reject flow, publish failure + retry, RBAC negatives | 3 | SMM-114 |
| [ ] | P2-16 | Queue depth / publish failure metrics + alert on repeated failures | 2 | SMM-113 |

**Gate 1 — MVP Ready:** see Implementation Phases §4. 🛑 Stop for founder sign-off.

---

## 6) Phase 3 — Pilot & Launch Readiness (Weeks 13–16)

| ✓ | ID | Task | Pts | Ref |
|---|---|---|---|---|
| [ ] | P3-01 | Self sign-up, workspace creation, team invites by email | 3 | — |
| [ ] | P3-02 | Onboarding flow (connect account → first draft → schedule) + empty states | 2 | F30 |
| [ ] | P3-03 | Email notifications: approval requested, approved/rejected, publish failed | 2 | F21 |
| [ ] | P3-04 | Razorpay subscriptions: plans, trial, webhooks, plan-limit enforcement | 5 | D22 |
| [ ] | P3-05 | Meta connector (Facebook Pages + Instagram) — only if App Review approved | 5 | F7, F10 |
| [ ] | P3-06 | Daily metric ingestion for published posts + basic dashboard (reach, clicks, engagement, top posts) | 5 | F17–F19 |
| [ ] | P3-07 | Responsive layouts + PWA manifest (installable on Android/iOS) | 2 | D9 |
| [ ] | P3-08 | Viewer role (read-only) | 1 | D26 |
| [ ] | P3-09 | Privacy: consent records, data export, account deletion; publish Privacy Policy / ToS pages | 3 | D32 |
| [ ] | P3-10 | PostHog product analytics + per-workspace feature flags | 2 | D20, D21 |
| [ ] | P3-11 | In-app feedback widget | 1 | Dev Guide Step 9 |
| [ ] | P3-12 👤 | Onboard pilots; weekly feedback review and re-prioritization | 2 | Master Plan §9 |
| [ ] | P3-13 | Public landing page with pricing and sign-up | 2 | — |

**Gate 2 — First Paying Customer:** see Implementation Phases §5. 🛑 Stop for founder sign-off.

---

## 7) Phase 4 — Revenue Intelligence (Weeks 17–24)

| ✓ | ID | Task | Pts | Ref |
|---|---|---|---|---|
| [ ] | P4-01 | Campaign entity + UTM auto-tagging (merge rules, workspace toggle) | 3 | SMM-202, F29 |
| [ ] | P4-02 | Tracked short-link redirect service recording click events | 3 | D33 |
| [ ] | P4-03 | Optional consented site script for session capture | 3 | SMM-203 |
| [ ] | P4-04 | Deterministic identity stitching (email / CRM ID) with confidence score | 3 | SMM-203 |
| [ ] | P4-05 | HubSpot connector: OAuth, incremental sync with checkpoint, contacts + deals | 5 | SMM-204, F27 |
| [ ] | P4-06 | Linear attribution engine (scheduled + backfill; credits sum to 100%) | 5 | SMM-205 |
| [ ] | P4-07 | Revenue dashboard: by campaign / platform / post, drill-down trace, CSV export, freshness indicator | 5 | SMM-206 |
| [ ] | P4-08 | Brand Kit (logo, colors, tone of voice) | 2 | F15 |
| [ ] | P4-09 | AI caption + hashtag writer using Brand Kit tone (via `LlmService`) | 3 | F13, D23 |
| [ ] | P4-10 | AI usage metering + per-plan credit limits | 3 | — |
| [ ] | P4-11 | Integration tests: click → session → conversion → dashboard | 3 | SMM-214 |
| [ ] | P4-12 | Data freshness + sync failure alerts | 1 | SMM-213 |

**Gate 3 — Attribution Proven:** see Implementation Phases §6. 🛑 Stop for founder sign-off.

---

## 8) Phase 5 — AI Differentiation (Weeks 25–32)

| ✓ | ID | Task | Pts | Ref |
|---|---|---|---|---|
| [ ] | P5-01 | NOVA memory store (pgvector, workspace-scoped, retention + token-size guard) | 3 | SMM-207 |
| [ ] | P5-02 | NOVA planner API: goal → 30-day plan, strict JSON schema, validation + fallback, prompt/model version logged | 5 | SMM-208 |
| [ ] | P5-03 | NOVA planner UI: generate / edit / save; convert plan items into drafts | 3 | SMM-209 |
| [ ] | P5-04 | Content Score v1: rules + LLM rubric, confidence, warn-only | 5 | SMM-302, SMM-304 |
| [ ] | P5-05 | Score recommendations panel in editor (before/after score) | 3 | SMM-303, SMM-305 |
| [ ] | P5-06 | Brand voice profile from samples + deviation check | 3 | SMM-306, SMM-307 |
| [ ] | P5-07 | Rewrite suggestions applied as editable text | 3 | SMM-308, SMM-309 |
| [ ] | P5-08 | Unified inbox (comments first) for connected platforms + reply | 5 | F24–F26 |
| [ ] | P5-09 | Shared explainability component (factors, confidence, model/prompt version) | 2 | SMM-211, SMM-313 |
| [ ] | P5-10 | AI quality metrics: acceptance rate, parse failures, latency, cost per workspace | 2 | SMM-213, SMM-315 |

**Gate 4 — AI Adoption:** see Implementation Phases §7. 🛑 Stop for founder sign-off.

### Phase 6 — Scale (after PMF)
Tasks `P6-01` … `P6-12` are listed and prioritized in Implementation Phases §8. Expand them into rows here only when Phase 5 is complete.

---

## 9) Progress Log (Append One Line Per Task)

Format: `[DATE] [TASK_ID] [STATUS] [OWNER] [NOTES: summary + test result]`

```text
[pre-2026-10-07] [P1-pre] [DONE] [AI] [Vite React scaffold, router, placeholder pages, API client, feature flags]
[2026-10-07] [PLAN] [DONE] [AI] [Plan v2.0: folders reorganized, Decisions Log + Implementation Phases created, checklist rewritten]
```

---

## 10) Blocker Protocol
1. Mark the task `[!]` and add a progress-log line with the cause.
2. Suggest 2 fallback options (e.g., mock provider, defer to next phase).
3. Move to the next **independent** task in the same phase.
4. If the blocker affects a phase gate, stop and notify the founder.

---

## 11) Start Prompt (Copy-Paste)

```text
Read Plan/02_Execution/SMM_Decisions_Log.md, Plan/02_Execution/SMM_Implementation_Phases.md
and Plan/02_Execution/SMM_Autonomous_Development_Checklist.md.
Find the current phase and its first unchecked task. Skip tasks marked 👤 and tell me about them.
For the task:
1) state your plan and the files you will change,
2) implement it following the Decisions Log,
3) run lint, typecheck and tests,
4) tick the box and add a progress-log line,
5) stop and summarize before starting the next task.
```

---

## 12) Related Documents
- `Plan/README.md` — documentation map
- `Plan/02_Execution/SMM_Master_Execution_Plan.md` — program governance and KPIs
- `Plan/03_Backlogs/` — detailed acceptance criteria (reference)
- `Plan/04_Architecture/` — backend and frontend architecture
- `Plan/05_AI_Prompts/` — prompt templates
