import type { PossessionEntry, TeamId } from "./types";
import { possessionEntrySchema } from "./schema";

// SOURCE: externally-supplied interactive drive charts
// ("denver-possession-throughput-interactive.html" and
// "chiefs-possession-throughput-interactive.html"), not an official NFL
// gamebook. recordStatus stays "preliminary" and gamebookVerified stays
// false in sample-game-card.ts regardless of this data being present —
// publishing possession detail does not change the record's verification
// state.
//
// The source files used banned/pre-ESA vocabulary for each possession's
// constraint ("Throughput achieved", "Series survival", "Red-zone
// conversion", "Lead management", "Ball security", "Clock termination",
// and a bare "Turnover" with no mechanism). Every entry below carries both
// the original sourceLabel (kept for provenance/audit) and a coachingNote
// remapped to approved ESA language. Turnovers are never collapsed into a
// generic "Turnover" note — each carries its actual mechanism
// (interception vs. fumble) instead.
const COACHING_NOTE: Record<string, string> = {
  "Throughput achieved": "Turn possessions into points",
  "Series survival": "Stay on the field",
  "Red-zone conversion": "Finish scoring opportunities",
  "Goal-to-go conversion": "Finish scoring opportunities",
  "Lead management": "Protect and extend the lead",
  "Clock and lead management": "Protect and extend the lead",
  "Clock termination": "End-of-half possession",
};

function clampFieldPosition(value: number): number {
  return Math.max(0, Math.min(100, value));
}

interface RawPossession {
  n: number;
  q: string;
  clock: string;
  start: number;
  yards: number;
  result: PossessionEntry["result"];
  points: number;
  sourceLabel: string;
  turnoverType?: "interception" | "fumble";
}

function buildPossessions(teamId: TeamId, raw: RawPossession[]): PossessionEntry[] {
  return raw.map((r) => {
    const entry: PossessionEntry = {
      possessionNumber: r.n,
      teamId,
      quarter: r.q,
      clock: r.clock,
      startFieldPosition: clampFieldPosition(r.start),
      endFieldPosition: clampFieldPosition(r.start + r.yards),
      result: r.result,
      turnoverType: r.turnoverType,
      points: r.points,
      isScoring: r.points > 0,
      coachingNote:
        r.result === "TURNOVER"
          ? r.turnoverType === "interception"
            ? "Interception"
            : "Fumble"
          : (COACHING_NOTE[r.sourceLabel] ?? r.sourceLabel),
      sourceLabel: r.sourceLabel,
    };
    const validated = possessionEntrySchema.safeParse(entry);
    if (!validated.success) {
      throw new Error(
        `Invalid possession entry for ${teamId} #${r.n}: ${validated.error.message}`,
      );
    }
    return entry;
  });
}

const denverPossessions = buildPossessions("DEN", [
  { n: 1, q: "Q1", clock: "15:00", start: 35, yards: -1, result: "TURNOVER", points: 0, sourceLabel: "Turnover", turnoverType: "interception" },
  { n: 2, q: "Q1", clock: "8:11", start: 32, yards: 68, result: "TD", points: 7, sourceLabel: "Throughput achieved" },
  { n: 3, q: "Q1", clock: "2:43", start: 8, yards: 19, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 4, q: "Q2", clock: "11:04", start: 12, yards: 8, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 5, q: "Q2", clock: "6:22", start: 23, yards: 9, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 6, q: "Q2", clock: "1:39", start: 34, yards: 5, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 7, q: "Q3", clock: "12:43", start: 36, yards: 20, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 8, q: "Q3", clock: "9:34", start: 95, yards: -8, result: "FG", points: 3, sourceLabel: "Goal-to-go conversion" },
  { n: 9, q: "Q3", clock: "3:17", start: 30, yards: 4, result: "TURNOVER", points: 0, sourceLabel: "Ball security", turnoverType: "fumble" },
  { n: 10, q: "Q4", clock: "14:39", start: 27, yards: 5, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 11, q: "Q4", clock: "6:54", start: 16, yards: 13, result: "DOWNS", points: 0, sourceLabel: "Series survival" },
  { n: 12, q: "Q4", clock: "0:36", start: 19, yards: -1, result: "END_OF_GAME", points: 0, sourceLabel: "Clock termination" },
]);

const kansasCityPossessions = buildPossessions("KC", [
  { n: 1, q: "Q1", clock: "13:30", start: 54, yards: 46, result: "TD", points: 7, sourceLabel: "Throughput achieved" },
  { n: 2, q: "Q1", clock: "3:48", start: 34, yards: 3, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 3, q: "Q2", clock: "13:28", start: 29, yards: 18, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 4, q: "Q2", clock: "9:21", start: 25, yards: 8, result: "PUNT", points: 0, sourceLabel: "Series survival" },
  { n: 5, q: "Q2", clock: "4:41", start: 20, yards: 80, result: "TD", points: 7, sourceLabel: "Throughput achieved" },
  { n: 6, q: "Q2", clock: "0:51", start: 9, yards: 7, result: "END_OF_HALF", points: 0, sourceLabel: "Clock termination" },
  { n: 7, q: "Q3", clock: "15:00", start: 31, yards: 69, result: "TD", points: 7, sourceLabel: "Throughput achieved" },
  { n: 8, q: "Q3", clock: "9:47", start: 3, yards: 0, result: "TURNOVER", points: 0, sourceLabel: "Turnover", turnoverType: "interception" },
  { n: 9, q: "Q3", clock: "7:34", start: 33, yards: 58, result: "FG", points: 3, sourceLabel: "Red-zone conversion" },
  { n: 10, q: "Q3", clock: "0:27", start: 66, yards: 34, result: "TD", points: 7, sourceLabel: "Throughput achieved" },
  { n: 11, q: "Q4", clock: "13:25", start: 6, yards: 26, result: "PUNT", points: 0, sourceLabel: "Lead management" },
  { n: 12, q: "Q4", clock: "4:32", start: 72, yards: 10, result: "DOWNS", points: 0, sourceLabel: "Clock and lead management" },
]);

export const possessionsByTeam: Record<string, PossessionEntry[]> = {
  DEN: denverPossessions,
  KC: kansasCityPossessions,
};
