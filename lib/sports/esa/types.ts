// ESA (Elliyeen Sports Analytics) Game Card data contract.
// Mirrors the typed API model in ESA_CLAUDE_CODE_HANDOFF.md exactly — do not
// diverge without updating both this file and lib/sports/esa/schema.ts.

export type TeamId = "DEN" | "KC";
export type Unit = "offense" | "defense";
export type RecordStatus = "preliminary" | "verified" | "blocked";
export type ValidationStatus = "passed" | "failed" | "unresolved" | "unavailable";

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
// contract and no verified play-by-play exists for this fixture yet (see
// sample-game-card.ts). This shape is defined so the possession map
// component has a real, testable data contract ready for when a future ESA
// pipeline stage (see the ESA architecture proposal) supplies it — it is
// deliberately never populated with invented per-drive data today.
export interface PossessionEntry {
  possessionNumber: number;
  teamId: TeamId;
  startFieldPosition: number; // yards from the possessing team's own goal line, 0-100
  endFieldPosition: number;
  result: "TD" | "FG" | "PUNT" | "TURNOVER" | "DOWNS" | "END_OF_HALF";
  points: number;
  isScoring: boolean;
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
    away: { teamId: TeamId; name: string; score: number; colorToken: "denver-blue" };
    home: { teamId: TeamId; name: string; score: number; colorToken: "chiefs-red" };
  };
  analyses: UnitAnalysis[];
}
