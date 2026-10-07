# SMM Master Execution Plan
## Program Governance, KPIs and Risks (Phases 0–6)

> **Version:** 2.0 | **Updated:** 2026-10-07 | **Owner:** Founder
> **What and when:** `Plan/02_Execution/SMM_Implementation_Phases.md`
> **Task to-do list:** `Plan/02_Execution/SMM_Autonomous_Development_Checklist.md`
> **Locked decisions:** `Plan/02_Execution/SMM_Decisions_Log.md`

---

## 1) Objective
Build and launch a revenue-first, AI-assisted social media marketing platform as a **solo founder working with AI coding assistants**. Start with a reliable approve-and-publish workflow, then prove social → revenue, then add AI differentiation and scale modules once customers confirm demand.

## 2) Program Outcomes
- End-to-end content workflow: `create → approve → schedule → publish` (LinkedIn first, then Meta).
- Paying pilot customers with billing in place.
- Revenue attribution from social click to CRM deal (HubSpot first).
- AI layers: NOVA campaign planner, Content Score, Brand Voice.
- Scale modules (compliance, white-label, localization, influencer, mobile apps) after product-market fit.

---

## 3) Phase Map (At a Glance)

| Phase | Weeks | Theme | Primary Deliverable | Gate |
|---|---|---|---|---|
| 0 | 1–2 | Setup & long-lead items | Platform app reviews submitted, pilots lined up | — |
| 1 | 3–6 | Foundation | Auth, workspace, RBAC, CI, staging | — |
| 2 | 7–12 | Core workflow MVP | LinkedIn publish slice with approvals | Gate 1: MVP Ready |
| 3 | 13–16 | Pilot & launch | Billing, onboarding, Meta, basic analytics, PWA | Gate 2: First Paying Customer |
| 4 | 17–24 | Revenue intelligence | UTM, tracked links, HubSpot, attribution dashboard | Gate 3: Attribution Proven |
| 5 | 25–32 | AI differentiation | NOVA planner, Content Score, Brand Voice, Inbox | Gate 4: AI Adoption |
| 6 | 33+ | Scale (after PMF) | Compliance, white-label, mobile apps, more platforms | Demand-driven |

Full deliverables and exit criteria: `SMM_Implementation_Phases.md`.

---

## 4) Dependency Chain

### Critical Sequence
1. Phase 0 external approvals (LinkedIn, Meta) → Phase 2/3 connectors
2. Phase 1 auth + workspace + RBAC → every later feature
3. Phase 2 publish pipeline → Phase 3 analytics → Phase 4 attribution
4. Phase 3 billing → any revenue
5. Phase 4 historical data → Phase 5 scoring and NOVA memory quality

### High-Risk External Dependencies
- Platform API access and app review timelines (Meta, LinkedIn)
- HubSpot API limits and data quality for attribution
- LLM cost and output consistency

---

## 5) Delivery Governance (Solo Cadence)

### Weekly Rhythm
- **Monday:** pick 5–8 tasks from the current phase; freeze scope.
- **Tuesday–Thursday:** build in vertical slices with the AI assistant.
- **Friday:** tests, bug bash, update checklist progress log, review KPIs.

### Quality Gates (every phase)
- CI green (lint, typecheck, unit, E2E where applicable)
- RBAC and workspace-isolation tests pass
- New modules behind feature flags
- Sentry errors triaged; alerts configured
- Founder sign-off on the phase gate checklist

### Definition of Ready
- Task has a clear outcome and acceptance criteria (see Ref in checklist)
- External dependencies (credentials, approvals) are available
- Test approach is known

### Definition of Done
See `SMM_Autonomous_Development_Checklist.md` §2.

---

## 6) Program KPI Framework

### Delivery
- Tasks planned vs done per week
- Critical bugs open
- CI pass rate on `main`

### Adoption
- Weekly active workspaces
- Posts published per workspace
- Feature adoption by module (approvals, attribution, NOVA, score)

### Business
- Paying customers and MRR (₹)
- Attributed pipeline/revenue shown to customers
- Churn and expansion (add-on uptake)

### Reliability and AI
- Publish success rate (target ≥ 98%)
- Attribution data freshness
- NOVA plan acceptance ratio; Content Score usage
- AI cost per workspace (target < 20% of its revenue)

---

## 7) Risk Register

| Risk | Impact | Mitigation |
|---|---|---|
| Platform app review delayed/rejected | Connector blocked | Apply in Phase 0; LinkedIn first; mock provider; Privacy Policy ready |
| Scope creep | Missed phases, burnout | Phase gates; Phase 6 only after PMF; weekly scope freeze |
| Solo founder burnout / context switching | Delivery stalls | Fixed weekly rhythm; half-day weekly for planning/debt |
| AI-generated code quality drift | Bugs, security gaps | `CLAUDE.md` rules; review every commit; tests required per task |
| Attribution trust (wrong matches) | Customers distrust numbers | Deterministic stitching only; confidence scores; visible lineage |
| Privacy/legal non-compliance (DPDP, GDPR) | Fines, platform bans | Consent, export, deletion in Phase 3; no fingerprinting |
| LLM cost overrun | Margin loss | Usage metering, per-plan credits, spend alerts |
| External API changes | Publish failures | Connector abstraction, retries, alerts |

---

## 8) Release Strategy

### Environments
1. Local (mock connectors)
2. Staging (real sandbox connectors)
3. Pilot workspaces (feature flags)
4. General availability

### Rollout Controls
- Per-workspace feature flags (env-based → PostHog in Phase 3)
- Fast rollback by disabling the flag
- Database migrations must be backward-compatible

### Pilot Strategy
- 3–5 design partners from Phase 0 discovery
- Weekly feedback call; fixes and friction removal beat new features
- Convert pilots to paid plans at Gate 2

---

## 9) Team Plan

| Stage | Team |
|---|---|
| Phases 0–3 | Founder + AI assistants |
| After Gate 2 (paying customers) | Consider part-time QA / freelance designer |
| After Gate 3 | First engineering hire (full-stack) |
| Phase 6 | Grow based on revenue (customer success, sales) |

---

## 10) Demo Narrative (Grows by Phase)
1. **Gate 1:** Create a draft → approve → schedule → see it published on LinkedIn.
2. **Gate 2:** Sign up, invite a teammate, pay for a plan, view basic analytics.
3. **Gate 3:** Click a tracked post link → HubSpot deal → revenue traced in dashboard.
4. **Gate 4:** NOVA generates a 30-day plan → drafts → Content Score and Brand Voice improve a post.

---

## 11) Immediate Next Actions
1. Complete Phase 0 tasks in the checklist (P0-01 … P0-12).
2. Submit LinkedIn and Meta developer applications this week.
3. Book 10 discovery calls.
4. Create `CLAUDE.md` and initialize the git repository.

---

## Linked Documents
- `Plan/02_Execution/SMM_Decisions_Log.md`
- `Plan/02_Execution/SMM_Implementation_Phases.md`
- `Plan/02_Execution/SMM_Autonomous_Development_Checklist.md`
- `Plan/02_Execution/SMM_Solo_Founder_AI_Stack_Plan.md`
- `Plan/03_Backlogs/` (reference specs)
