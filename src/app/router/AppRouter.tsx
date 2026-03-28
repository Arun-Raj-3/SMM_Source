import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import AppShell from '../layout/AppShell';
import HomeLanding from '../../features/home/HomeLanding';
import DraftListPage from '../../features/content/drafts/DraftListPage';
import DraftEditorPage from '../../features/content/drafts/DraftEditorPage';
import ApprovalInboxPage from '../../features/approval/ApprovalInboxPage';
import SchedulerPage from '../../features/scheduling/SchedulerPage';
import PublishJobStatusPage from '../../features/publishing/PublishJobStatusPage';

export default function AppRouter() {
  return (
    <BrowserRouter>
      <AppShell>
        <Routes>
          <Route path="/" element={<HomeLanding />} />
          <Route path="/content/drafts" element={<DraftListPage />} />
          <Route path="/content/drafts/:draftId/edit" element={<DraftEditorPage />} />
          <Route path="/approvals/inbox" element={<ApprovalInboxPage />} />
          <Route path="/scheduling" element={<SchedulerPage />} />
          <Route path="/publishing/jobs/:jobId" element={<PublishJobStatusPage />} />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </AppShell>
    </BrowserRouter>
  );
}

