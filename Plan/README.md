# SMM Plan — Documentation Map

> **Version:** 2.0 | **Updated:** 2026-10-07
> Replaces the old `SMM_Documentation_Index.md` (kept in `_archive/`).
> Original files before reorganization: `_archive/Plan_original_2026-10-07.zip`.

---

## Start Here (Read in This Order)
1. **`02_Execution/SMM_Decisions_Log.md`** — locked decisions (team, stack, scope, naming). **Wins over every other document.**
2. **`02_Execution/SMM_Implementation_Phases.md`** — the phase list: what gets built, when, and each exit gate.
3. **`02_Execution/SMM_Autonomous_Development_Checklist.md`** — the task-by-task to-do list with progress log.

---

## Folder Structure

| Folder | Purpose | Status |
|---|---|---|
| `01_Strategy/` | Product vision, blueprint and executive summaries | Long-term vision; scope is narrowed by the Decisions Log |
| `02_Execution/` | **Active plan**: decisions, phases, to-do list, governance | ✅ Current (v2.0) |
| `03_Backlogs/` | Detailed stories and acceptance criteria (Sprints 1–4, Foundation tasks F1–F32) | Reference only — sequencing comes from Implementation Phases |
| `04_Architecture/` | Backend, frontend and system architecture | Reference — stack overridden by Decisions Log §3 |
| `05_AI_Prompts/` | Prompt templates for AI-assisted development | Reference |
| `06_Investor/` | Memo, pitch, deck content/design, Q&A checklist | Needs refresh before any pitch (see below) |
| `07_Finance/` | 12-month INR projections (base and optimistic) | Needs rebuild as a spreadsheet (see below) |
| `_archive/` | Superseded files and original backup | Do not use |

---

## All Documents

### 01_Strategy
- `SocialMediaMarketing.md` — full product blueprint (market, features, stack, pricing, 18-month vision)
- `SMM_Executive_OnePager.md` — one-page leadership summary
- `SMM_Overview_PDF_Friendly.md` — printable overview

### 02_Execution (active)
- `SMM_Decisions_Log.md` — locked decisions and open questions
- `SMM_Implementation_Phases.md` — Phases 0–6, deliverables, gates, KPIs
- `SMM_Autonomous_Development_Checklist.md` — master to-do list (P0-01 … P5-10)
- `SMM_Master_Execution_Plan.md` — governance, KPIs, risks, release strategy
- `SMM_Solo_Founder_AI_Stack_Plan.md` — AI tooling, weekly routine, AI budget

### 03_Backlogs (reference specs)
- `SMM_Sprint1_Backlog.md` — SMM-101…114 (workflow MVP) → Phases 1–2
- `SMM_Sprint2_Backlog.md` — SMM-201…214 (attribution, NOVA) → Phases 4–5
- `SMM_Sprint3_Backlog.md` — SMM-301…316 (score, brand voice, competitors) → Phases 5–6
- `SMM_Sprint4_Backlog.md` — SMM-401…416 (localization, influencer, compliance, white-label) → Phase 6
- `SMMPlan2.md` — Foundation tasks F1…F32 → Phases 1–5

### 04_Architecture
- `SMM_Backend_Architecture_Nodejs.md` — NestJS modules, queues, API conventions
- `SMM_Frontend_Architecture_React.md` — page map, state, UI contracts
- `SMM_Development_Guide.md` — system diagrams and original step-by-step guide

### 05_AI_Prompts
- `SMM_AI_Development_Prompt_Library.md` — full prompt library
- `SMM_AI_Prompt_Library_Quick.md` — top 15 daily prompts

### 06_Investor
- `SMM_Investor_Memo_1Page.md`, `SMM_Investor_Execution_Brief.md`, `SMM_Investor_Pitch_2Min.md`
- `SMM_Investor_Deck_Structure.md`, `SMM_Investor_Deck_Content.md`, `SMM_Investor_Deck_Design_Guide.md`
- `SMM_Investor_QA_Checklist.md`

### 07_Finance
- `SMM_Monthly_Profit_Gain_Overview.md` — base case
- `SMM_Monthly_Profit_Gain_Optimistic_INR.md` — optimistic case

---

## Reading Paths by Audience

| Audience | Read |
|---|---|
| **Founder / developer (daily)** | Decisions Log → Implementation Phases → Checklist → relevant Backlog/Architecture ref |
| **AI coding assistant** | Decisions Log → current phase in Implementation Phases → Checklist (see its Start Prompt) |
| **Advisors / leadership** | Executive One-Pager → Implementation Phases §1 → Master Execution Plan §6–7 |
| **Investors** | Investor Memo → Deck Content → Finance (after the refresh below) |

---

## Known Follow-Ups (Not Yet Done)
- [ ] **Finance:** rebuild as an editable spreadsheet linked to the launch date (Week 16); add churn, CAC, LTV, cumulative burn, runway and a bootstrapped (solo) scenario. Current OpEx (₹37–56 lakh/month) assumes a funded team.
- [ ] **Investor docs:** add the funding ask amount; replace unsourced market statistics with cited ones; soften "no competitor has this" claims (HubSpot, Sprout Social and Hootsuite cover parts of it).
- [ ] **Pricing:** localize INR pricing (Decisions Log O2) and update Blueprint §9 and finance docs.
- [ ] **CLAUDE.md:** create at repo root (checklist task P0-10).

---

## Versioning Rules
- Every active document carries `Version | Updated | Owner` at the top.
- Changing a locked decision → update `SMM_Decisions_Log.md` first, then dependent documents.
- New documents go into the matching folder and get a line in this README.
- Superseded documents move to `_archive/`, never deleted.
