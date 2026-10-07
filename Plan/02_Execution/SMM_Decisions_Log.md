# SMM Decisions Log
## Single Source of Truth for Locked Decisions

> **Version:** 2.0 | **Updated:** 2026-10-07 | **Owner:** Founder
> If any other document conflicts with this file, **this file wins**.
> To change a decision: edit the row, bump the version, and add a line to the Change History.

---

## 1) Operating Model

| # | Topic | Decision | Replaces / Resolves |
|---|---|---|---|
| D1 | Team model | **Solo founder + AI coding assistants.** Hire only after first paying customers. | 10-person team in Master Plan and Development Guide |
| D2 | Capacity | **15–25 story points per 2-week cycle.** Plan to that number, not team-sized estimates. | 40–55 pts/sprint assumptions |
| D3 | Sequencing authority | `02_Execution/SMM_Implementation_Phases.md` defines **what and when**. `02_Execution/SMM_Autonomous_Development_Checklist.md` is the **task-level to-do list**. Sprint backlogs and SMMPlan2 are **reference specs** (acceptance criteria) only. | Competing "source of truth" claims |
| D4 | Timeline | MVP pilot-ready ≈ **Week 12**; first paying customer ≈ **Week 16**; revenue intelligence ≈ **Week 24**; AI differentiation ≈ **Week 32**. | "8 weeks for Sprints 1–4" vs 12 vs 18 months |

## 2) Market and Scope

| # | Topic | Decision | Notes |
|---|---|---|---|
| D5 | Initial customer (ICP) | **Small marketing agencies and D2C brands (India first)**, 2–15 person marketing teams. | Confirm after 10 discovery calls in Phase 0 |
| D6 | Core differentiator | **Proving social → revenue** (attribution) on top of a reliable approve-and-publish workflow. | NOVA, score and brand voice are secondary differentiators |
| D7 | First platform | **LinkedIn** (self-serve member posting). Second: **Meta (Facebook Pages + Instagram)** once app review is approved. | X deferred (paid API tiers); TikTok deferred (audit) |
| D8 | Deferred until after product-market fit | NOVA autonomous execution, influencer module, localization, community hub, in-app video editor, Salesforce, multi-touch model variants, native mobile app. | Kept in Blueprint as long-term vision |
| D9 | Mobile | **Responsive web + PWA** in Phase 3. **Capacitor** wrapper for Play Store / App Store in Phase 6. No separate native rewrite. | "Mobile App" in Blueprint Phase 3 |

## 3) Technology Stack (Locked)

| # | Layer | Decision | Replaces / Resolves |
|---|---|---|---|
| D10 | Frontend | React 19 + TypeScript + Vite (existing app in `SMM_Source/`) | — |
| D11 | UI library | **Tailwind CSS + shadcn/ui** only. | MUI / Shadcn / Tailwind mix |
| D12 | State | **Redux Toolkit** (already installed). **RTK Query** for server state, Redux slices for UI state. | React Query + Zustand vs Redux conflict |
| D13 | HTTP | Axios client (existing `src/shared/api/client.ts`) used as RTK Query base query. | — |
| D14 | Backend | **Node.js + NestJS** API + separate **worker** service. | — |
| D15 | Database | **PostgreSQL only** (managed: Supabase). JSONB for flexible metadata, **pgvector** for NOVA memory/embeddings, Postgres full-text search. ORM: **Prisma**. | Postgres + MongoDB + Elasticsearch |
| D16 | Auth | **Supabase Auth** (email + Google). NestJS verifies the Supabase JWT. **No custom login/password code.** | Custom auth (SMM-102) vs Auth0 vs Clerk |
| D17 | File storage | **Supabase Storage** (S3-compatible). | AWS S3 + CloudFront |
| D18 | Queue | **Redis (managed) + BullMQ**. | — |
| D19 | Hosting | Web: Vercel. API + worker: Render or Railway. Move to AWS only when scale requires. | AWS + Kubernetes |
| D20 | Monitoring | **Sentry** (errors) + **PostHog** (product analytics + feature flags). | Datadog |
| D21 | Feature flags | Phase 1–2: env-based (existing `featureFlags.ts`). Phase 3+: PostHog per-workspace flags. | — |
| D22 | Billing | **Razorpay** (India, INR). Add Stripe when selling internationally. | Billing was missing from all plans |
| D23 | LLM provider | One provider behind an internal `LlmService` interface; model names in config, never hard-coded. Every call logs prompt version + model. | Outdated model names in Blueprint |
| D24 | Monorepo layout | Move current app to `apps/web` when the API is added: `apps/web`, `apps/api`, `apps/worker`, `packages/shared-types`. Use npm workspaces (no Turborepo/Nx until needed). | `services/worker` vs `apps/worker` |

## 4) Domain Conventions (Locked)

| # | Topic | Decision |
|---|---|---|
| D25 | Tenant name | **Workspace** (not Organization). |
| D26 | Roles (MVP) | `Admin`, `Editor`, `Approver`. Add `Viewer` in Phase 3, `Client` in Phase 6 (white-label). |
| D27 | Content status | `Draft` → `InApproval` → `Approved` / `Rejected` → `Scheduled` → `Publishing` → `Published` / `Failed`. |
| D28 | API prefix | `/api/v1/...`; health: `/healthz`, readiness: `/readyz`. |
| D29 | Error format | `{ code, message, details?, requestId }` (matches existing `src/shared/types/api-types.ts`). |
| D30 | Endpoints (MVP) | Follow `04_Architecture/SMM_Backend_Architecture_Nodejs.md` §6.2. |
| D31 | Task IDs | New IDs `P<phase>-<nn>` (e.g., `P2-04`). Old `SMM-xxx` / `Fxx` IDs are kept as references only. |

## 5) Compliance and Data

| # | Topic | Decision |
|---|---|---|
| D32 | Privacy law | Design for **India DPDP Act 2023** first, GDPR-compatible: consent, data retention limits, deletion requests, data export. |
| D33 | Attribution tracking | **Tracked redirect links** (own short-link domain) + optional lightweight site script with consent. **No device fingerprinting.** |
| D34 | Secrets | Social/CRM tokens encrypted at rest (AES-256-GCM, key from env/secret manager); never sent to the client or mobile app. |
| D35 | Competitor / influencer data | Only official APIs or licensed data providers. **No scraping.** |

## 6) Open Decisions (Need Founder Input)

| # | Question | Default if not decided | Decide by |
|---|---|---|---|
| O1 | Bootstrap or raise funding? | Bootstrap; build finance scenario for both | End of Phase 0 |
| O2 | Final INR pricing (localized, not USD × 83) | Starter ₹999, Growth ₹2,999, Agency ₹7,999 (to validate with pilots) | Phase 3 |
| O3 | Confirm ICP after discovery calls | D5 above | End of Phase 0 |
| O4 | Product/brand name (currently "SMM") | Keep "SMM" internally | Before Phase 3 launch |

---

## Change History
- **2026-10-07 — v2.0:** First consolidated decisions log. Resolved team model, timeline, stack, auth, database, naming and scope conflicts across all plan documents.
