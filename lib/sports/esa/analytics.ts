// No analytics provider is wired into this repository yet (confirmed during
// the ESA architecture audit). This dispatcher is a typed, no-op-safe seam:
// it is called at the correct interaction points now, so wiring a real
// provider later is a one-line change here, not a hunt through components.

export type EsaAnalyticsEvent =
  | { name: "game_card_team_selected"; properties: { game_id: string; team_id: string; record_version: string } }
  | { name: "game_card_unit_selected"; properties: { game_id: string; team_id: string; unit: string } }
  | { name: "game_card_finding_opened"; properties: { game_id: string; finding_id: string; evidence_grade: string } }
  | { name: "game_card_lineage_opened"; properties: { game_id: string; metric_id: string; lineage_id: string } };

type AnalyticsProvider = (event: EsaAnalyticsEvent) => void;

let provider: AnalyticsProvider | null = null;

export function setEsaAnalyticsProvider(next: AnalyticsProvider | null) {
  provider = next;
}

export function emitAnalyticsEvent(event: EsaAnalyticsEvent) {
  try {
    provider?.(event);
  } catch {
    // Analytics must never break the product experience.
  }
}
