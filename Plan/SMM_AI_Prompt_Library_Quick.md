# SMM AI Prompt Library (Quick)
## Top 15 Prompts for Daily Development

Use this as your fast copy-paste prompt sheet.

---

## 1) Daily Session Starter
```text
Today I am working on: [FEATURE]
Stack: React + TypeScript + NestJS + PostgreSQL + Redis/BullMQ
Sprint: [SPRINT]

Give me:
1) short implementation plan
2) exact file changes
3) production-ready code
4) tests
5) verification commands
```

## 2) Feature Breakdown
```text
Break this feature into P0/P1 tasks with dependencies and time estimate:
[FEATURE]
Return a 1-week execution plan.
```

## 3) API Contract Prompt
```text
Design REST API contracts for [FEATURE].
Include endpoints, request/response, validation, errors, RBAC access.
```

## 4) Database Schema Prompt
```text
Design PostgreSQL schema for [FEATURE] with keys, indexes, and migration order.
Include query patterns and performance notes.
```

## 5) NestJS Module Prompt
```text
Implement NestJS module for [FEATURE]:
Controller + Service + DTO + Entity + Validation + Error handling + Tests.
```

## 6) React Page Prompt
```text
Build React + TypeScript page for [PAGE_NAME] using these APIs: [ENDPOINTS].
Include loading/empty/error states and form validation.
```

## 7) Queue Worker Prompt
```text
Implement BullMQ producer + worker for [JOB_NAME].
Add retry, backoff, dead-letter handling, idempotency, and tests.
```

## 8) Integration Adapter Prompt
```text
Create adapter for [PLATFORM_NAME] with OAuth refresh, rate-limit handling,
retry logic, and normalized response mapping.
```

## 9) Debug Root Cause Prompt
```text
Bug: [BUG_DESCRIPTION]
Logs: [LOGS]
Code: [PATHS/SNIPPET]

Give top 3 root causes, validation steps, minimal fix, and regression tests.
```

## 10) Performance Fix Prompt
```text
Endpoint [ENDPOINT] is slow.
p95: [VALUE], DB query time: [VALUE].

Find bottlenecks and propose query/index/code optimizations with expected impact.
```

## 11) Unit Test Prompt
```text
Generate unit tests for [FILE_PATH_OR_FUNCTION].
Cover happy path, validation errors, edge cases, and exception handling.
```

## 12) E2E Flow Prompt
```text
Create E2E test plan for:
create -> approve -> schedule -> publish
Include positive, negative, and flaky-test prevention steps.
```

## 13) NOVA Planner Prompt
```text
Design NOVA planner flow.
Inputs: goal, audience, platform mix, cadence, memory context.
Output strict JSON: weekly_plan, content_ideas, CTA, risks, KPI targets.
```

## 14) Content Score Prompt
```text
Design Content Score v1 (0-100) for social posts.
Provide scoring logic, confidence logic, recommendation rules, API schema.
```

## 15) Brand Voice Guard Prompt
```text
Design brand voice detection and rewrite suggestion system.
Output: brand_match_score, deviation reasons, rewrite suggestions, compliance flags.
Include false-positive reduction strategy.
```

---

## Bonus: Investor Q&A Practice Prompt
```text
Act as a tough investor and ask 20 hard questions on market, GTM, execution, and unit economics.
After each answer, score me /10 and give a stronger response.
```

---

## Usage Rule
Use one prompt per task. Keep prompts focused. Always ask for tests and verification commands.
