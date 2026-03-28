import { useParams } from 'react-router-dom';

export default function PublishJobStatusPage() {
  const { jobId } = useParams<{ jobId: string }>();

  return (
    <div>
      <h2>Publish Job Status</h2>
      <p style={{ marginTop: 8 }}>
        Placeholder status page for publish job ID: <code>{jobId ?? 'unknown'}</code>
      </p>
    </div>
  );
}

