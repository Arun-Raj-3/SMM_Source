# SMM Platform - Sprint 2 Backlog

> **Reference spec (v2.0, 2026-10-07):** Use this file for detailed acceptance criteria only. Sequencing and scope come from `Plan/02_Execution/SMM_Implementation_Phases.md`; stack, naming and scope decisions from `Plan/02_Execution/SMM_Decisions_Log.md` (wins on any conflict). Task status lives in `Plan/02_Execution/SMM_Autonomous_Development_Checklist.md`.

## Focus: NOVA v1 + Revenue Attribution MVP

---

## Sprint Goal
Deliver intelligence capabilities on top of Sprint 1 by launching:
1. NOVA v1 (memory-enabled AI campaign assistant)
2. Revenue Attribution MVP (UTM + session + CRM event linkage)

## Sprint Duration
- 2 weeks (10 working days)

## Definition of Done (Sprint Level)
- Features are deployable in staging and demo-ready.
- All P0 stories pass functional and integration testing.
- Attribution data is visible in a dashboard with traceable event lineage.
- NOVA assistant can generate and persist campaign plans with memory context.
- Monitoring and alerting are active for AI and attribution pipelines.

---

## Scope Boundaries

### In Scope
- NOVA campaign planner (30-day plan generation)
- Memory layer for workspace and campaign context
- Natural language command parser (limited command set)
- UTM auto-tagging for outbound links
- Session capture and identity stitching (MVP rules)
- CRM event sync (HubSpot first, Salesforce optional if capacity)
- Basic revenue attribution dashboard (linear model only)

### Out of Scope
- Fully autonomous publish/respond actions
- Multi-touch model variants (time-decay, data-driven)
- Advanced forecasting and budget allocation
- Multi-CRM deep two-way sync complexity beyond MVP

---

## Priority Order
1. Attribution data reliability
2. NOVA memory and planner core
3. Dashboard and explainability
4. Hardening, QA, and rollout controls

---

## Backlog Items

### SMM-201 - Attribution schema and event contracts
- **Type:** Engineering
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Define and implement data model for attribution event flow.
- **Scope Entities:**
  - `utm_click_event`
  - `session_identity`
  - `crm_conversion_event`
  - `attribution_credit`
  - `campaign_revenue_snapshot`
- **Acceptance Criteria:**
  - Migration scripts apply cleanly in new and existing environments.
  - Event contract docs published for ingestion producers.
  - Indexes support high-volume read/write for event timelines.
- **Dependencies:** Sprint 1 schema baseline

### SMM-202 - UTM auto-tagging service
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 3 points
- **Owner:** Backend
- **Description:** Auto-append standardized UTM parameters to outbound URLs during scheduling/publish.
- **Acceptance Criteria:**
  - Tags include source, medium, campaign, content fields.
  - Existing UTM params are preserved or merged by rule.
  - Toggle to disable tagging at workspace level.
  - Unit tests cover merge and collision cases.
- **Dependencies:** SMM-201

### SMM-203 - Session tracking and identity stitching (MVP)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** Backend + Data
- **Description:** Capture click sessions and stitch known identities using deterministic fallback rules.
- **Acceptance Criteria:**
  - Session created for tagged link click events.
  - Identity stitching uses known email/CRM ID when available.
  - Fallback deterministic fingerprint rule documented and implemented.
  - Confidence score stored for stitched identities.
- **Dependencies:** SMM-201, SMM-202

### SMM-204 - HubSpot conversion sync connector (MVP)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** Backend Integrations
- **Description:** Ingest conversion and deal-stage events from HubSpot for attributed revenue mapping.
- **Acceptance Criteria:**
  - OAuth and token refresh are stable.
  - Incremental sync with checkpoint cursor works.
  - Failed sync retries with backoff and dead-letter logging.
  - Event lineage maps CRM event -> session -> campaign.
- **Dependencies:** SMM-201, SMM-203

### SMM-205 - Linear attribution engine (MVP)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** Data + Backend
- **Description:** Compute campaign and post-level revenue credit using linear attribution only.
- **Acceptance Criteria:**
  - Attribution job runs on schedule and on-demand.
  - Credit distribution sums correctly to 100% per conversion.
  - Recompute job supports date-range backfill.
  - Engine outputs are persisted and queryable by campaign/post/platform.
- **Dependencies:** SMM-203, SMM-204

### SMM-206 - Revenue Attribution dashboard (MVP)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Frontend
- **Description:** Build UI dashboard for attributed pipeline and revenue.
- **Widgets:**
  - Attributed revenue by campaign
  - Attributed pipeline by platform
  - Top converting posts
  - Conversion journey sample trace
- **Acceptance Criteria:**
  - Filters: date range, platform, campaign.
  - Drill-down view shows traceable touchpoints.
  - Empty/error states are user-friendly.
  - Export CSV for table views.
- **Dependencies:** SMM-205

### SMM-207 - NOVA memory store and context API
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** AI + Backend
- **Description:** Implement workspace-aware memory store for campaign history, goals, and outcomes.
- **Acceptance Criteria:**
  - Memory write on campaign plan creation and updates.
  - Memory read scoped by workspace and role permissions.
  - Retention policy and token-size guardrail implemented.
  - Prompt context assembly is deterministic and logged.
- **Dependencies:** Auth/RBAC from Sprint 1

### SMM-208 - NOVA prompt orchestration and guardrails
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** AI Engineer
- **Description:** Build prompt chain for campaign planning with safety and brand constraints.
- **Acceptance Criteria:**
  - Input includes goals, audience, platform mix, prior campaign memory.
  - Output schema is strict JSON with parse validation.
  - Safety filters block disallowed responses.
  - Prompt and model version are logged for every generation.
- **Dependencies:** SMM-207

### SMM-209 - NOVA campaign planner UI (30-day planner)
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 5 points
- **Owner:** Frontend
- **Description:** UI for generating, reviewing, and saving NOVA campaign plans.
- **Acceptance Criteria:**
  - User enters objective, audience, channels, cadence.
  - Generated plan shows weekly themes + post suggestions.
  - User can edit and save plan to workspace.
  - Plan save triggers memory write event.
- **Dependencies:** SMM-208

### SMM-210 - Natural language command parser (limited commands)
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** AI + Backend
- **Description:** Parse commands like "increase LinkedIn engagement this month" into structured planner intents.
- **Acceptance Criteria:**
  - Supported command intents documented (max 8 intents).
  - Parser confidence score is returned.
  - Low-confidence parse requires user confirmation.
  - Parsed intent payload feeds planner API successfully.
- **Dependencies:** SMM-208

### SMM-211 - Explainability panel for NOVA outputs
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** Frontend
- **Description:** Display why NOVA made recommendations using key input signals.
- **Acceptance Criteria:**
  - Shows top factors (past campaign signal, audience pattern, channel fit).
  - Includes model/prompt version reference for audit.
  - Displays confidence level with plain-language guidance.
- **Dependencies:** SMM-208, SMM-209

### SMM-212 - Feature flags and controlled rollout
- **Type:** Engineering
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** Backend + DevOps
- **Description:** Add per-workspace feature gating for NOVA and attribution modules.
- **Acceptance Criteria:**
  - Flags can be toggled without redeploy.
  - Flags support allowlist beta customers.
  - Disabled features fail gracefully in UI/API.
- **Dependencies:** SMM-206, SMM-209

### SMM-213 - Observability and quality metrics for AI/attribution
- **Type:** Engineering
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** DevOps + Data
- **Description:** Add monitoring for pipeline reliability and AI generation quality.
- **Acceptance Criteria:**
  - Metrics: attribution lag, sync failure rate, parse failure rate, generation latency.
  - Alerts for data freshness SLA breach.
  - Dashboard for AI and attribution health in staging/prod.
- **Dependencies:** SMM-204, SMM-205, SMM-208

### SMM-214 - E2E and integration test pack (Sprint 2)
- **Type:** QA
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** QA + Eng
- **Description:** Validate end-to-end flows for NOVA and attribution.
- **Test Scenarios:**
  - Tagged post click -> session -> CRM conversion -> revenue shown in dashboard.
  - Recompute attribution with backfill date range.
  - Generate campaign plan with memory context.
  - Low-confidence command parse requires confirmation.
- **Acceptance Criteria:**
  - Automated integration tests in CI for core attribution APIs.
  - Manual UAT checklist signed off by product.
- **Dependencies:** SMM-205, SMM-206, SMM-209, SMM-210

---

## Capacity and Story Point Summary
- **Total Planned Points:** 69
- **Recommended Target Capacity:** 45-50 points
- **Plan Guidance:** Lock all P0 items first. Move selected P1 items (`SMM-210`, `SMM-211`, `SMM-213`) to Sprint 2.5 if needed.

---

## Suggested Sprint Plan (Day-by-Day)
- **Day 1-2:** SMM-201, SMM-202, SMM-207
- **Day 2-4:** SMM-203, SMM-208
- **Day 4-6:** SMM-204, SMM-205
- **Day 6-8:** SMM-206, SMM-209
- **Day 8-9:** SMM-210, SMM-211, SMM-212, SMM-213
- **Day 9-10:** SMM-214, bug fixes, demo preparation

---

## Risks and Mitigations

- **Risk:** CRM sync inconsistency causes attribution gaps.  
  **Mitigation:** Cursor checkpoints, replayable sync jobs, and freshness alerts.

- **Risk:** Identity stitching introduces false matches.  
  **Mitigation:** Confidence scoring, deterministic-first strategy, and low-confidence exclusion from KPI totals.

- **Risk:** NOVA outputs vary and reduce trust.  
  **Mitigation:** Strict output schema, prompt versioning, explainability panel, and user edit control.

- **Risk:** Sprint overload due to data + AI complexity.  
  **Mitigation:** Protect P0 delivery, pre-flag P1 deferrals, and run parallel backend/frontend tracks.

---

## Sprint 2 Exit Criteria
- Linear attribution is visible in dashboard with traceable conversion lineage.
- HubSpot sync is stable for pilot workspaces.
- NOVA generates and stores editable 30-day campaign plans using workspace memory.
- Feature flags allow controlled beta rollout.
- Demo script shows both intelligence paths in less than 7 minutes.

---

## Demo Script (Sprint Review)
1. Create campaign objective in NOVA and generate 30-day plan.
2. Save plan and show memory recall on second generation.
3. Publish tagged content and simulate click + conversion event.
4. Open attribution dashboard and trace revenue back to campaign/post.
5. Toggle feature flags for a non-beta workspace to show gated access behavior.
