// ESA (Elliyeen Sports Analytics) Game Card data contract.
// Mirrors the typed API model in ESA_CLAUDE_CODE_HANDOFF.md exactly — do not
// diverge without updating both this file and lib/sports/esa/schema.ts.

// TeamId is intentionally an open string, not a fixture-specific enum — the
// shared ESA Game Card must render any matchup from data. Do not narrow this
// back to a closed union of specific franchises.
export type TeamId = string;
export type Unit = "offense" | "defense";
export type RecordStatus = "preliminary" | "verified" | "blocked";
export type ValidationStatus = "passed" | "failed" | "unresolved" | "unavailable";

// A team as it appears in a game payload. colorToken values are either a CSS
// custom-property suffix (e.g. "denver-blue" → var(--esa-denver-blue)) or a
// literal color (e.g. "#003594") — see resolveTeamColor in EsaGameCard.tsx.
// No component may hard-code a specific team's identity or color.
export interface Team {
  teamId: TeamId;
  name: string;
  shortName?: string;
  abbreviation: string;
  slug: string;
  primaryColorToken?: string;
  secondaryColorToken?: string;
}

export interface MetricValue {
  metricId: string;
  label: string;
  coachingLabel: string;
  unit: string;
  value: number | string | null;
  formattedValue: string;
  validationStatus: ValidationStatus;
  lineageId: string | null;
}

export interface Finding {
  findingId: string;
  title: string;
  shortEvidence: string;
  evidence: string;
  evidenceGrade: "A" | "B" | "C" | "D";
  controllability: "high" | "partial" | "minimal" | "uncontrollable";
  publicationStatus: "published" | "withheld";
}

export interface CoachingPriority {
  priority: number;
  title: string;
  practiceMeasure: string;
  gameMeasure: string;
  evidenceFindingIds: string[];
}

export interface UnitAnalysis {
  teamId: TeamId;
  unit: Unit;
  thesis: string;
  primaryFinding: string;
  primaryMetricIds: string[];
  metrics: MetricValue[];
  findings: Finding[];
  priorities: CoachingPriority[];
}

// Possession-level detail is not part of the handoff's GameCardResponse
// contract. This fixture's possession rows come from an externally-supplied
// drive chart (not an official NFL gamebook) — see the "sourceLabel" field
// and the provenance note in sample-game-card.ts. recordStatus stays
// "preliminary" and gamebookVerified stays false regardless of whether
// possession data is present.
export interface PossessionEntry {
  possessionNumber: number;
  teamId: TeamId;
  quarter: string;
  clock: string;
  startFieldPosition: number; // yards from the possessing team's own goal line, 0-100
  endFieldPosition: number;
  result: "TD" | "FG" | "PUNT" | "TURNOVER" | "DOWNS" | "END_OF_HALF" | "END_OF_GAME";
  // For TURNOVER results, the specific mechanism (interception vs. fumble) —
  // per ESA rule: never collapse a turnover into a single generic label.
  turnoverType?: "interception" | "fumble";
  points: number;
  isScoring: boolean;
  // ESA-normalized coaching language for this possession's outcome (approved
  // vocabulary only — see COACHING_CONSTRAINT_LABELS in sample-game-card.ts).
  coachingNote: string;
  // The original, unedited source label from the externally-supplied drive
  // chart, kept for provenance/audit — never shown as the primary label.
  sourceLabel: string;
}

export interface GameCardResponse {
  schemaVersion: "1.0";
  gameId: string;
  recordVersion: string;
  recordStatus: RecordStatus;
  generatedAtUtc: string;
  dataQualityScore: number;
  gamebookVerified: boolean;
  game: {
    date: string;
    week: number;
    status: "FINAL";
    away: Team & { score: number };
    home: Team & { score: number };
  };
  analyses: UnitAnalysis[];
}
