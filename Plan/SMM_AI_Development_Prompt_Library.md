# SMM AI Development Prompt Library
## Reusable Prompts to Build the Application Faster

Use these prompts directly in your AI model.  
Replace placeholders like `[PROJECT_PATH]`, `[STACK]`, `[FEATURE]`, and `[FILE_PATH]`.

---

## 1) Master System Prompt (Use Once Per Session)

```text
You are a senior full-stack SaaS engineer helping me build a Social Media Marketing platform.

Project goal:
- Build an AI-native SMM platform with workflow + attribution + intelligence modules.

Tech stack:
- Frontend: React + TypeScript + Tailwind
- Backend: Node.js + NestJS
- DB: PostgreSQL
- Queue: Redis + BullMQ
- Auth: RBAC roles (Admin, Editor, Approver)

Execution rules:
1) Keep scope tight to the requested feature.
2) Propose file-level changes before coding.
3) Generate production-quality code with error handling.
4) Include tests for critical paths.
5) Keep code style consistent.
6) Explain assumptions briefly.
7) If blocked, offer 2 fallback options.

Output format:
- Step 1: Approach summary (5-8 bullets)
- Step 2: File changes (path + purpose)
- Step 3: Code
- Step 4: Tests
- Step 5: Run commands and verification checklist
```

---

## 2) Architecture and Planning Prompts

### 2.1 Break Feature into Tasks
```text
Break this feature into implementation tasks with dependencies and effort estimate:
[FEATURE]

Context:
- Current sprint: [SPRINT_NUMBER]
- Existing modules: [MODULES]

Return format:
1) Task list (P0/P1)
2) Dependencies
3) Estimated hours per task
4) Risks and mitigations
5) Done criteria
```

### 2.2 Data Model Design
```text
Design a PostgreSQL schema for:
[FEATURE]

Constraints:
- Must support multi-tenant workspace
- Must support audit logs
- Must support future scaling

Return:
1) Tables and columns
2) Keys and indexes
3) Migration sequence
4) Sample SQL migrations
5) Query patterns and performance notes
```

### 2.3 API Contract First
```text
Design REST API contracts for:
[FEATURE]

Include:
- Endpoints
- Request/response JSON
- Validation rules
- Error formats
- RBAC access map

Also provide OpenAPI-style definitions.
```

---

## 3) Backend Development Prompts

### 3.1 Build NestJS Module
```text
Implement a NestJS module for:
[FEATURE]

Requirements:
- Controller + Service + DTO + Entity
- Validation using class-validator
- Proper error handling
- Repository layer and tests

Output:
1) File tree
2) Full code per file
3) Unit test cases
4) Integration test outline
```

### 3.2 Queue and Worker (BullMQ)
```text
Implement BullMQ jobs for:
[JOB_NAME]

Need:
- Producer API
- Worker processor
- Retry policy with backoff
- Dead-letter handling
- Idempotency key support
- Structured logs

Also include test strategy for retry + failure scenarios.
```

### 3.3 Social/CRM Connector
```text
Create an integration adapter for:
[PLATFORM_NAME]

Requirements:
- OAuth token lifecycle (store + refresh)
- Rate limit handling
- Retry for transient errors
- Unified response mapping to internal status model

Return:
1) Adapter interface
2) Concrete implementation
3) Error mapping table
4) Minimal integration tests with mocks
```

---

## 4) Frontend Development Prompts

### 4.1 Build React Page from API
```text
Build a React + TypeScript page for:
[PAGE_NAME]

API endpoints:
[ENDPOINTS]

Requirements:
- Loading, empty, error states
- Form validation
- Pagination/filtering
- Accessible components
- Clean separation: hooks, services, UI

Return file structure and code.
```

### 4.2 Dashboard Widgets
```text
Create dashboard widgets for:
[KPI_LIST]

Requirements:
- Responsive layout
- Recharts integration
- Date range filtering
- Tooltip and legend clarity
- Skeleton loaders

Also provide mock data and edge-case handling.
```

---

## 5) AI Feature Prompts (NOVA / Score / Brand Voice)

### 5.1 NOVA Campaign Planner
```text
Design a prompt orchestration flow for NOVA campaign planning.

Inputs:
- Business goal
- Audience
- Platform mix
- Content cadence
- Memory context

Output must be strict JSON:
- weekly_plan
- content_ideas
- CTA suggestions
- risks
- KPI targets

Also provide:
- JSON schema
- validation logic
- fallback behavior if model output is invalid
```

### 5.2 Predictive Content Score
```text
Design Content Score v1 (0-100) for social posts.

Need:
- Feature list
- Scoring logic
- Confidence logic
- Recommendation generation rules

Return:
1) Model-agnostic scoring pseudocode
2) API response schema
3) Explainability block format
```

### 5.3 Brand Voice Guardian
```text
Design brand voice deviation detection and rewrite suggestions.

Inputs:
- Brand samples
- Draft content
- Policy profile

Output:
- brand_match_score
- deviation_categories
- rewrite_suggestions
- compliance_flags

Also include false-positive mitigation strategy.
```

---

## 6) Debugging and Bug Fix Prompts

### 6.1 Root Cause Analysis
```text
I have this bug:
[BUG_DESCRIPTION]

Logs:
[LOGS]

Relevant code:
[CODE_SNIPPET_OR_PATHS]

Please provide:
1) Top 3 likely root causes
2) Fastest verification steps
3) Minimal patch fix
4) Regression tests to add
```

### 6.2 Performance Bottleneck
```text
This API is slow:
[ENDPOINT]

Observed:
- p95 latency: [VALUE]
- DB query time: [VALUE]

Help me:
1) identify bottlenecks
2) optimize queries/indexes
3) reduce response time
4) add performance tests
```

---

## 7) Testing Prompts

### 7.1 Unit Test Generator
```text
Generate unit tests for:
[FILE_PATH_OR_FUNCTION]

Cover:
- happy path
- validation errors
- edge cases
- exceptions

Use [TEST_FRAMEWORK].
```

### 7.2 E2E Test Plan
```text
Create an E2E test plan for this flow:
create -> approve -> schedule -> publish

Include:
- preconditions
- step-by-step tests
- expected outcomes
- negative scenarios
- flaky test prevention tips
```

---

## 8) Deployment and DevOps Prompts

### 8.1 CI/CD Pipeline
```text
Design CI/CD for this stack:
[STACK]

Need:
- lint/test/build stages
- environment promotion (dev -> staging -> prod)
- rollback strategy
- secrets handling
- release tagging
```

### 8.2 Production Readiness Checklist
```text
Create production readiness checklist for:
[FEATURE_OR_RELEASE]

Cover:
- security
- observability
- scalability
- data migration safety
- rollback preparedness
```

---

## 9) Product and GTM Prompts

### 9.1 Pricing Experiment Prompt
```text
Given this pricing:
[PRICING_TABLE]

Design 3 pricing experiments to improve ARPA and conversion.

Return:
- hypothesis
- test setup
- KPI
- expected impact
- decision rule
```

### 9.2 Investor Q&A Simulator
```text
Act as a tough investor.
Ask me 20 critical questions on:
- market
- differentiation
- execution risk
- GTM
- unit economics

After each answer, give me:
- score /10
- what to improve
- a stronger sample answer
```

---

## 10) Prompt Templates by Sprint

### Sprint 1 Prompt
```text
Implement Sprint 1 core workflow:
create draft -> approval -> scheduling -> publishing for one platform.

Deliverables:
- DB schema
- APIs
- UI pages
- queue workers
- basic audit logs
- tests

Keep scope tight to MVP only.
```

### Sprint 2 Prompt
```text
Implement Sprint 2:
- NOVA v1 planner
- UTM and session tracking
- HubSpot sync
- linear attribution dashboard

Output:
- architecture diagram in text
- API contracts
- implementation tasks with file-level changes
- test strategy
```

### Sprint 3 Prompt
```text
Implement Sprint 3 intelligence features:
- content score
- brand voice checks
- competitor benchmarking

Need:
- data model
- scoring services
- UI integration
- feature flags
- observability
```

### Sprint 4 Prompt
```text
Implement Sprint 4 scale features:
- localization variants
- influencer discovery workflow
- compliance checks
- white-label reporting

Provide:
- phased implementation
- risks
- fallback options if integrations delay
```

---

## 11) Prompt Quality Rules (Very Important)
1. Keep each prompt focused on one deliverable.
2. Always include constraints and acceptance criteria.
3. Ask AI to show assumptions before coding.
4. Ask for tests every time.
5. Use short follow-up prompts instead of one giant prompt.
6. Reuse proven prompt templates for consistency.

---

## 12) Copy-Paste Prompt for Daily Work Session

```text
Today I am working on: [FEATURE]

Context:
- Stack: React + TypeScript + NestJS + PostgreSQL + Redis/BullMQ
- Sprint: [SPRINT]
- Existing files: [FILES]

I want:
1) implementation plan
2) exact file changes
3) production-ready code
4) tests
5) verification commands

Constraints:
- Keep changes minimal and scoped
- Maintain backward compatibility
- Include robust error handling
- Follow RBAC and audit requirements
```

---

## Linked Docs
- `Plan/SMM_Solo_Founder_AI_Stack_Plan.md`
- `Plan/SMM_Master_Execution_Plan.md`
- `Plan/SMM_Sprint1_Backlog.md`
- `Plan/SMM_Sprint2_Backlog.md`
- `Plan/SMM_Sprint3_Backlog.md`
- `Plan/SMM_Sprint4_Backlog.md`
