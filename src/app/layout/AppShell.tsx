import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

export default function AppShell({ children }: { children: ReactNode }) {
  return (
    <div>
      <header style={{ padding: '16px 0', borderBottom: '1px solid var(--border)' }}>
        <nav style={{ display: 'flex', gap: 12, justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link to="/" style={{ textDecoration: 'none' }}>
            Home
          </Link>
          <Link to="/content/drafts" style={{ textDecoration: 'none' }}>
            Drafts
          </Link>
          <Link to="/approvals/inbox" style={{ textDecoration: 'none' }}>
            Approvals
          </Link>
          <Link to="/scheduling" style={{ textDecoration: 'none' }}>
            Scheduling
          </Link>
        </nav>
      </header>

      <main style={{ padding: 24 }}>{children}</main>
    </div>
  );
}

