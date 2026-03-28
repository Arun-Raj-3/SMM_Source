# SMM Frontend Architecture (React + TypeScript + Tailwind)
## Page Map + State/Data Flow + MVP UI Contracts

---

## 1) Frontend Goals
- Deliver MVP vertical slice UX: `create -> approve -> schedule -> publish`.
- Provide clear status progression and failure reasons.
- Keep AI modules (NOVA, content score, brand voice guardrails) behind feature flags.
- Ensure multi-tenant safety visually (workspace switching) and operationally (server enforces).
- Enable dashboards: unified analytics, publish performance, and attribution views.

---

## 2) Recommended Frontend Structure

```text
apps/web/
  src/
    app/
      router/
      routes.tsx
      layout/
        AppShell.tsx
    features/
      auth/
        login/
        hooks/
      workspace/
        switcher/
        contexts/
      content/
        drafts/
          DraftListPage.tsx
          DraftEditorPage.tsx
        versions/
      approval/
        ApprovalInboxPage.tsx
      scheduling/
        SchedulerPage.tsx
        PublishStatusPage.tsx
      publishing/
        PublishJobStatusPanel.tsx
      inbox/
        UnifiedInboxPage.tsx
      analytics/
        DashboardPage.tsx
        widgets/
      attribution/
        AttributionDashboardPage.tsx
      intelligence/
        nova/
          NovaPlannerPage.tsx
        score/
          ContentScorePanel.tsx
        brand/
          BrandVoicePanel.tsx
      compliance/
        CompliancePanel.tsx
      reports/
        WhiteLabelReportExportPage.tsx
    shared/
      api/
        client.ts
        endpoints.ts
      components/
        Button/
        Card/
        Table/
        Modal/
      state/
        queryClient.ts
        zustandStores.ts
      types/
        api-types.ts
      utils/
        formatters.ts
        featureFlags.ts
```

Keep modules aligned to backend modules: `content`, `approval`, `scheduling`, `publishing`, `attribution`, `intelligence`, `compliance`, `reports`.

---

## 3) State Management Approach (Simple + Scalable)

### 3.1 Use React Query for server state
- Fetch and cache:
  - drafts
  - approvals
  - publish jobs and statuses
  - attribution dashboard data
- This prevents manual refresh complexity.

### 3.2 Use Zustand for local UI state
- Store:
  - current workspace selection
  - UI filters (date range)
  - selected draft ids in dialogs
- Keep global business state on the server.

### 3.3 Feature Flags (Front-end gating)
Create a simple helper:
- `isFeatureEnabled('nova')`
- `isFeatureEnabled('attribution')`
- `isFeatureEnabled('brandVoiceGuardian')`

UI should:
- hide buttons/routes if disabled
- show “available in beta” placeholders if needed

---

## 4) Routing and Navigation (MVP)

Use an app shell with top nav + sidebar:
- Workspace switcher
- Primary sections:
  - Content Studio
  - Approvals
  - Scheduling & Publishing
  - Intelligence (NOVA / Score / Brand)
  - Analytics / Attribution (later in MVP2)
  - Settings (roles, integrations, compliance profiles)

Suggested MVP routes:
- `/content/drafts`
- `/content/drafts/:draftId/edit`
- `/approvals/inbox`
- `/scheduling/calendar` (optional MVP)
- `/publishing/jobs/:jobId`

---

## 5) MVP UI Page Map (End-to-End Flow)

## 5.1 Content Drafts
1. `DraftListPage`
   - table columns:
     - title
     - platform
     - status
     - updatedAt
   - filters:
     - status
     - platform
     - date range
2. `DraftEditorPage`
   - form fields:
     - caption/text
     - media attachment references
     - hashtags (optional)
     - target platform(s)
   - actions:
     - Save draft
     - Submit for approval (Editor role)
     - Evaluate (Score panel, if enabled)

## 5.2 Approvals Inbox
`ApprovalInboxPage`
- pending items list grouped by:
  - platform
  - draft type
  - region (future)
- item detail drawer:
  - content preview
  - AI panels (score/brand) if enabled
  - compliance violations (if enabled)
- actions:
  - Approve (Approver role)
  - Reject with reason

## 5.3 Scheduling and Publishing
`PublishStatusPage` or `PublishJobStatusPanel`
- show status progression:
  - Scheduled -> Publishing -> Published/Failed
- for failed jobs:
  - show reason category
  - allow retry based on RBAC
- show remote post id when published

---

## 6) Dashboard Widgets (Attribution / Analytics)

### 6.1 Widget Types (Recommended)
- KPI cards:
  - Attributed pipeline
  - Attributed revenue
  - Publish success rate
- Charts:
  - platform growth trend
  - post performance (reach/clicks)
  - funnel progression (awareness -> decision)
- Tables:
  - Top converting posts
  - Most attributed campaigns

### 6.2 Widget Data Contract
Every widget must receive:
- `dateRange`
- `workspaceId`
- `platform filter`
- `loading state`
- `data freshness indicator` if it comes from ingestion/async jobs

---

## 7) AI Integration UI Contracts

### 7.1 NOVA Planner UI
`NovaPlannerPage`
- inputs:
  - goal/objective
  - audience
  - platform mix
  - cadence
  - memory context summary (read-only)
- actions:
  - Generate plan
  - Save plan to workspace
  - Edit plan weeks
- outputs:
  - weekly themes
  - post suggestions
  - risks and KPI targets

Guardrails:
- always log prompt version on server
- validate strict JSON output before showing to user

### 7.2 Content Score UI Panel
`ContentScorePanel`
- displays:
  - score (0-100)
  - confidence
  - top factor breakdown
  - recommendations list
- behavior:
  - warn-only mode in early phases
  - never block user from editing in v1 (block only when compliance requires it)

### 7.3 Brand Voice Panel
`BrandVoicePanel`
- displays:
  - brand match score
  - deviation categories
  - rewrite suggestions
  - compliance flags
- provides:
  - “Apply suggestion” editing action (safe patch)

---

## 8) API Integration Patterns (Frontend)

### 8.1 API Client
- Wrap `fetch/axios` with:
  - auth token injection
  - requestId propagation if present
  - standardized error parsing

### 8.2 Request Lifecycle UX
- For every async action:
  - show loading spinner
  - disable relevant buttons
  - show success toast
  - show error banner with guidance (not raw error stacks)

### 8.3 Optimistic UI (Use carefully)
- For draft save/edit:
  - optimistic update is okay
- For approval/scheduling/publishing:
  - prefer server-confirmed updates to avoid state divergence

---

## 9) Design System Minimum (Tailwind)
- Cards with consistent padding and shadows
- Tables with consistent row heights
- Modals for:
  - approve/reject confirmation
  - retry publish confirmation
  - apply AI suggestions
- Toast notifications for success/failure
- Skeleton loaders for dashboard widgets

---

## 10) Practical Frontend Implementation Order (Aligned to Backend)
1. Content Draft Editor + Draft List
2. Approval Inbox
3. Publish Status and Retry
4. Basic analytics landing page (MVP2)
5. Attribution dashboard (MVP2)
6. NOVA planner (MVP3)
7. Content Score + Brand Voice panels (MVP3)
8. Localization/influencer/compliance panels (MVP4)

---

## 11) Output Expectations for the AI Coding Model (Frontend)
When AI implements frontend tasks:
- Require it to:
  - create UI with loading/empty/error states
  - use React Query for server data
  - add feature-flag gating
  - implement accessible components
  - include at least basic component-level tests if your setup supports it
- Ask it to show:
  - which endpoints are called
  - expected response shapes

