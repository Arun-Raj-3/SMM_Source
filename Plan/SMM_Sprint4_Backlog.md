# SMM Platform - Sprint 4 Backlog
## Focus: Localization Engine + Influencer Intelligence + Compliance Suite + White-Label Agency Portal

---

## Sprint Goal
Deliver scale and enterprise-readiness capabilities by launching:
1. Localization and multi-market workflow foundation.
2. Influencer discovery and campaign tracking MVP.
3. Compliance and governance controls for regulated workflows.
4. White-label agency reporting and client-facing workspace branding.

## Sprint Duration
- 2 weeks (10 working days)

## Definition of Done (Sprint Level)
- P0 stories are shipped to staging and validated by QA/UAT.
- Localized content variants can be created, reviewed, and scheduled per region.
- Influencer workflow supports discovery, shortlist, and performance tracking.
- Compliance checks block or warn based on policy configuration.
- White-label reports export with agency branding and client-safe views.

---

## Scope Boundaries

### In Scope
- Master-to-localized content variant flow
- Translation pipeline with editable output and tone preservation controls
- Regional approval zones and timezone scheduling rules
- Influencer search, vetting score, campaign briefing, and performance snapshot
- Regulatory keyword/disclaimer checks and immutable audit events
- White-label report templates and agency branding settings

### Out of Scope
- Fully automated localization across all supported platforms
- Influencer contract/payment processing automation
- Deep legal policy engine customization per country
- Complete partner marketplace for agency modules

---

## Priority Order
1. Compliance and localization governance
2. Localization creation and scheduling flow
3. Influencer intelligence MVP
4. White-label agency client outputs
5. Hardening, observability, and rollout controls

---

## Backlog Items

### SMM-401 - Regional workspace model and approval zones
- **Type:** Engineering
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Extend workspace model for regions, locales, and region-scoped approvals.
- **Acceptance Criteria:**
  - Region entity supports locale, timezone, default approvers, and policy profile.
  - Content item can map to one or more target regions.
  - Approval routing respects regional zone configuration.
  - Migration scripts apply cleanly to existing workspace data.
- **Dependencies:** Sprint 1 workflow and RBAC model

### SMM-402 - Master template and localized variant API
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** Backend
- **Description:** Build API to create master content and generate localized child variants.
- **Acceptance Criteria:**
  - Master content can spawn multiple localized variants in one action.
  - Variant tracks parent-child lineage and version history.
  - Variant lock mechanism prevents overwrite conflicts during review.
  - API supports bulk update for shared fields.
- **Dependencies:** SMM-401

### SMM-403 - Translation pipeline with tone-preservation controls
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** AI + Backend
- **Description:** Implement translation service with tone/brand constraints and human-edit handoff.
- **Acceptance Criteria:**
  - Translation request includes target locale, tone profile, and brand glossary.
  - Output returns translated draft plus confidence score.
  - Brand terminology locklist is enforced.
  - Users can edit translation and re-run only selected sections.
- **Dependencies:** SMM-402, Sprint 3 brand voice foundation

### SMM-404 - Localization editor and regional review UI
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Frontend
- **Description:** Add UI for side-by-side master and localized variants with review states.
- **Acceptance Criteria:**
  - Side-by-side compare view for master vs locale variant.
  - Regional reviewer can approve/reject with comments.
  - Variant status badges shown per region.
  - Bulk submit for regional approval is available.
- **Dependencies:** SMM-402, SMM-403

### SMM-405 - Multi-timezone scheduling validation
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** Backend
- **Description:** Add scheduling constraints per region and locale-aware publish windows.
- **Acceptance Criteria:**
  - Scheduler converts and stores canonical UTC plus regional local time.
  - Regional blackout windows are enforced.
  - Validation errors explain timezone conflicts clearly.
  - Existing scheduling flow remains backward-compatible.
- **Dependencies:** SMM-401, Sprint 1 scheduler

### SMM-406 - Influencer entity model and discovery index
- **Type:** Engineering
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Data + Backend
- **Description:** Create influencer profile schema and discovery index.
- **Captured Fields (MVP):**
  - Handle, niche tags, audience size band
  - Engagement quality score
  - Audience authenticity score
  - Region/language match attributes
- **Acceptance Criteria:**
  - Profiles can be ingested and refreshed.
  - Duplicate profile resolution is handled by source ID rules.
  - Search index supports filtering by niche, region, and quality score.
- **Dependencies:** None

### SMM-407 - Influencer discovery and shortlisting API
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Backend
- **Description:** Build API for influencer search, shortlist creation, and fit scoring.
- **Acceptance Criteria:**
  - Search supports filters for platform, niche, audience size, region.
  - Fit score combines audience match + engagement quality.
  - Team can add/remove influencers from shortlist collections.
  - API returns explainable score factors.
- **Dependencies:** SMM-406

### SMM-408 - Influencer campaign brief and approval flow
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 5 points
- **Owner:** Backend + Frontend
- **Description:** Enable campaign brief creation and content approval for influencer submissions.
- **Acceptance Criteria:**
  - Brief template supports objectives, deliverables, and deadlines.
  - Influencer content submissions can be reviewed and approved/rejected.
  - Approval actions are logged with reviewer metadata.
  - Campaign status pipeline is visible (Draft, Active, Review, Approved, Completed).
- **Dependencies:** SMM-407, Sprint 1 approval flow

### SMM-409 - Influencer performance tracking dashboard
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 5 points
- **Owner:** Frontend
- **Description:** Build dashboard for campaign-level influencer performance.
- **Acceptance Criteria:**
  - KPI cards: reach, engagement, conversions (if tracked), attributed revenue (if available).
  - Breakdown by influencer and campaign.
  - Date and campaign filters are supported.
  - Export CSV for campaign performance table.
- **Dependencies:** SMM-408, Sprint 2 attribution data

### SMM-410 - Compliance policy engine (keywords + disclaimers)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** Backend + AI
- **Description:** Implement policy checks for regulated vocabulary and required disclaimers.
- **Acceptance Criteria:**
  - Workspace can configure policy profile (for example, finance/healthcare/general).
  - Draft scan returns violations with severity (blocker/warning).
  - Disclaimer auto-append rules can be enabled per content type.
  - Scan results and actions are stored in immutable audit records.
- **Dependencies:** Sprint 1 audit baseline

### SMM-411 - Compliance checks in pre-publish workflow
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 3 points
- **Owner:** Backend
- **Description:** Enforce policy checks at final approval and scheduling steps.
- **Acceptance Criteria:**
  - Blocker violations prevent scheduling.
  - Warning violations require explicit override reason.
  - Override action is RBAC-protected and audited.
  - Error messages include resolution hints.
- **Dependencies:** SMM-410, Sprint 1 scheduling/approval

### SMM-412 - Compliance panel UI and override UX
- **Type:** Feature
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** Frontend
- **Description:** Display compliance violations and support authorized override workflow.
- **Acceptance Criteria:**
  - Violation list shows severity and affected text segments.
  - Suggested fix snippets are displayed when available.
  - Override modal requires reason and permission check.
  - Panel is visible in editor and approval views.
- **Dependencies:** SMM-410, SMM-411

### SMM-413 - White-label branding settings (agency workspace)
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** Frontend + Backend
- **Description:** Allow agencies to configure logos, colors, report footer text, and client-safe branding.
- **Acceptance Criteria:**
  - Branding settings persist per agency workspace.
  - Theme preview appears before saving.
  - Client users cannot access agency internal admin settings.
  - Brand settings apply to report exports.
- **Dependencies:** Workspace model

### SMM-414 - White-label report templates and PDF export
- **Type:** Feature
- **Priority:** P0
- **Estimate:** 8 points
- **Owner:** Backend + Frontend
- **Description:** Build branded report templates for client-facing exports.
- **Acceptance Criteria:**
  - Report templates include overview, KPI summary, top posts, and recommendations.
  - Exports include agency branding and client-safe content only.
  - PDF export job supports async processing with download status.
  - Export activity is logged for audit.
- **Dependencies:** SMM-413, existing analytics modules

### SMM-415 - Feature flags and rollout controls for Sprint 4 modules
- **Type:** Engineering
- **Priority:** P1
- **Estimate:** 3 points
- **Owner:** DevOps + Backend
- **Description:** Add module-level rollout gating for localization, influencer, compliance, and white-label.
- **Acceptance Criteria:**
  - Per-workspace toggles for each module.
  - Percentage rollout supported for pilot cohorts.
  - Rollback tested for each module path.
- **Dependencies:** SMM-404, SMM-409, SMM-412, SMM-414

### SMM-416 - Observability and QA pack for Sprint 4
- **Type:** QA/Engineering
- **Priority:** P0
- **Estimate:** 5 points
- **Owner:** QA + DevOps + Eng
- **Description:** End-to-end test and monitoring coverage across all Sprint 4 modules.
- **Test Scenarios:**
  - Master content -> localized variants -> regional approval -> schedule.
  - Influencer discovery -> shortlist -> brief -> performance view.
  - Compliance blocker prevents publish; authorized override is audited.
  - White-label report exports correctly for client workspace branding.
- **Acceptance Criteria:**
  - P0 E2E tests integrated in CI.
  - Monitoring includes translation failures, policy scan latency, export job failure rate.
  - UAT sign-off completed with known limitations documented.
- **Dependencies:** SMM-404, SMM-409, SMM-411, SMM-414

---

## Capacity and Story Point Summary
- **Total Planned Points:** 88
- **Recommended Target Capacity:** 50-55 points
- **Plan Guidance:** Prioritize P0 sequence first. Pre-approve deferral of P1 items (`SMM-405`, `SMM-408`, `SMM-409`, `SMM-412`, `SMM-415`) if needed.

---

## Suggested Sprint Plan (Day-by-Day)
- **Day 1-2:** SMM-401, SMM-406, SMM-410
- **Day 2-4:** SMM-402, SMM-403, SMM-407
- **Day 4-6:** SMM-404, SMM-411, SMM-413
- **Day 6-8:** SMM-405, SMM-408, SMM-414
- **Day 8-9:** SMM-409, SMM-412, SMM-415
- **Day 9-10:** SMM-416, bug fixes, release prep and demo

---

## Risks and Mitigations

- **Risk:** Translation quality inconsistency across niche terms.  
  **Mitigation:** Brand glossary locklists, confidence thresholding, and mandatory human review for low-confidence output.

- **Risk:** Compliance rules over-block valid content.  
  **Mitigation:** Severity model (warning vs blocker), configurable policy profiles, and audited override flow.

- **Risk:** Influencer data quality varies by source.  
  **Mitigation:** Source confidence scoring, freshness labels, and profile dedupe logic.

- **Risk:** White-label export performance bottlenecks.  
  **Mitigation:** Async export queue, retry/backoff, and caching of reusable report components.

---

## Sprint 4 Exit Criteria
- Regional localization workflow works from template to scheduling.
- Compliance checks are active and enforceable in pre-publish path.
- Influencer discovery and shortlist flow is functional for pilot users.
- White-label PDF report exports with workspace branding.
- Demo can show all four module groups in less than 10 minutes.

---

## Demo Script (Sprint Review)
1. Create master post and generate two localized variants.
2. Route each variant through regional approval and schedule by local timezone.
3. Run compliance scan, resolve warning, and demonstrate blocker override by authorized role.
4. Search and shortlist influencers for a campaign; create brief and preview performance panel.
5. Export a white-label client report and verify branding in generated PDF.
