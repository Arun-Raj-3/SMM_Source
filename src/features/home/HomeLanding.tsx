import { Link } from 'react-router-dom';

export default function HomeLanding() {
  return (
    <div style={{ textAlign: 'center' }}>
      <h1 style={{ marginTop: 8 }}>Social Media Marketing Platform</h1>
      <p style={{ margin: '12px auto 0', maxWidth: 860 }}>
        This is the MVP UI scaffold. Use the navigation to access drafts, approvals, and scheduling pages.
      </p>
      <div style={{ marginTop: 18, display: 'flex', justifyContent: 'center', gap: 12, flexWrap: 'wrap' }}>
        <Link to="/content/drafts">Go to Drafts</Link>
        <Link to="/approvals/inbox">Go to Approvals</Link>
        <Link to="/scheduling">Go to Scheduling</Link>
      </div>
    </div>
  );
}

