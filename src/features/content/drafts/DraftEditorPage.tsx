import { useParams } from 'react-router-dom';

export default function DraftEditorPage() {
  const { draftId } = useParams<{ draftId: string }>();

  return (
    <div>
      <h2>Draft Editor</h2>
      <p style={{ marginTop: 8 }}>
        Placeholder editor for draft ID: <code>{draftId ?? 'unknown'}</code>
      </p>
    </div>
  );
}

