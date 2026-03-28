export type FeatureKey =
  | 'nova'
  | 'attribution'
  | 'contentScore'
  | 'brandVoiceGuardian'
  | 'localization'
  | 'influencerIntelligence'
  | 'complianceSuite'
  | 'whiteLabelReports';

// For now, feature flags are environment-driven.
// Later, replace with workspace-configured flags loaded from the backend.
export function isFeatureEnabled(feature: FeatureKey): boolean {
  const envKey = `VITE_FEATURE_${feature.toUpperCase()}`;
  const raw = import.meta.env[envKey as 'string'] as string | undefined;
  if (!raw) return false;
  return raw === 'true' || raw === '1';
}

