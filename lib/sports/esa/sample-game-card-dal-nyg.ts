import type { GameCardResponse } from "./types";

// Synthetic second fixture used ONLY to prove the shared ESA Game Card
// architecture is team-agnostic (see EsaGameCard.reusability.test.tsx). The
// statistics below are illustrative placeholders, not real game data, and
// this fixture is never wired into a published route or the sitemap.
export const sampleGameCardDalNyg: GameCardResponse = {
  schemaVersion: "1.0",
  gameId: "esa-synthetic-dal-at-nyg-v1",
  recordVersion: "synthetic-fixture-1.0",
  recordStatus: "preliminary",
  generatedAtUtc: "2026-09-15T00:00:00.000Z",
  dataQualityScore: 0.5,
  gamebookVerified: false,
  game: {
    date: "2026-11-01",
    week: 9,
    status: "FINAL",
    away: {
      teamId: "DAL",
      name: "Dallas",
      shortName: "Dallas",
      abbreviation: "DAL",
      slug: "dallas-cowboys",
      score: 17,
      primaryColorToken: "#003594",
      secondaryColorToken: "#eef2fb",
    },
    home: {
      teamId: "NYG",
      name: "New York Giants",
      shortName: "NY Giants",
      abbreviation: "NYG",
      slug: "new-york-giants",
      score: 24,
      primaryColorToken: "#0b2265",
      secondaryColorToken: "#eaedf6",
    },
  },
  analyses: [
    {
      teamId: "DAL",
      unit: "offense",
      thesis: "Dallas moved the ball but stalled short of the end zone.",
      primaryFinding: "Dallas turned 10 possessions into 17 points.",
      primaryMetricIds: ["dal-off-points-per-possession"],
      metrics: [
        {
          metricId: "dal-off-points-per-possession",
          label: "Points per possession",
          coachingLabel: "Possession production",
          unit: "pts/possession",
          value: 1.7,
          formattedValue: "1.7",
          validationStatus: "passed",
          lineageId: "lineage-dal-off-ppp-v1",
        },
      ],
      findings: [
        {
          findingId: "dal-off-f01",
          title: "Finish scoring opportunities",
          shortEvidence: "2 red-zone FG",
          evidence: "Dallas settled for field goals on two red-zone trips.",
          evidenceGrade: "A",
          controllability: "high",
          publicationStatus: "published",
        },
      ],
      priorities: [
        {
          priority: 1,
          title: "Finish red-zone possessions",
          practiceMeasure: "Turn trips into touchdowns.",
          gameMeasure: "Red-zone TD rate above 50%.",
          evidenceFindingIds: ["dal-off-f01"],
        },
      ],
    },
    {
      teamId: "DAL",
      unit: "defense",
      thesis: "Dallas's defense could not get off the field on third down.",
      primaryFinding: "New York converted 8 of 14 third downs.",
      primaryMetricIds: ["dal-def-third-down-allowed"],
      metrics: [
        {
          metricId: "dal-def-third-down-allowed",
          label: "Third down allowed",
          coachingLabel: "Stay on the field",
          unit: "conversions",
          value: "8/14",
          formattedValue: "8/14",
          validationStatus: "passed",
          lineageId: "lineage-dal-def-3rd-v1",
        },
      ],
      findings: [
        {
          findingId: "dal-def-f01",
          title: "Get off the field",
          shortEvidence: "8/14 third down",
          evidence: "New York converted 57% of third downs.",
          evidenceGrade: "A",
          controllability: "high",
          publicationStatus: "published",
        },
      ],
      priorities: [
        {
          priority: 1,
          title: "Keep third-down pressure",
          practiceMeasure: "Continue ending possessions.",
          gameMeasure: "Hold third-down allowed below 40%.",
          evidenceFindingIds: ["dal-def-f01"],
        },
      ],
    },
    {
      teamId: "NYG",
      unit: "offense",
      thesis: "New York's offense controlled the game with sustained drives.",
      primaryFinding: "New York turned 11 possessions into 24 points.",
      primaryMetricIds: ["nyg-off-points-per-possession"],
      metrics: [
        {
          metricId: "nyg-off-points-per-possession",
          label: "Points per possession",
          coachingLabel: "Possession production",
          unit: "pts/possession",
          value: 2.18,
          formattedValue: "2.18",
          validationStatus: "passed",
          lineageId: "lineage-nyg-off-ppp-v1",
        },
      ],
      findings: [
        {
          findingId: "nyg-off-f01",
          title: "Stay on the field",
          shortEvidence: "8/14 third down",
          evidence: "New York extended possessions at a 57% rate.",
          evidenceGrade: "A",
          controllability: "high",
          publicationStatus: "published",
        },
      ],
      priorities: [
        {
          priority: 1,
          title: "Maintain third-down answers",
          practiceMeasure: "Protect possession continuity.",
          gameMeasure: "Hold third-down conversion above 45%.",
          evidenceFindingIds: ["nyg-off-f01"],
        },
      ],
    },
    {
      teamId: "NYG",
      unit: "defense",
      thesis: "New York's defense limited Dallas to field goals in the red zone.",
      primaryFinding: "New York held Dallas to 1.7 points per possession.",
      primaryMetricIds: ["nyg-def-points-allowed"],
      metrics: [
        {
          metricId: "nyg-def-points-allowed",
          label: "Points allowed",
          coachingLabel: "Finish scoring opportunities",
          unit: "points",
          value: 17,
          formattedValue: "17",
          validationStatus: "passed",
          lineageId: "lineage-nyg-def-pts-v1",
        },
      ],
      findings: [
        {
          findingId: "nyg-def-f01",
          title: "Finish scoring opportunities",
          shortEvidence: "2 red-zone FG allowed",
          evidence: "New York forced field-goal attempts on two Dallas red-zone trips.",
          evidenceGrade: "A",
          controllability: "high",
          publicationStatus: "published",
        },
      ],
      priorities: [
        {
          priority: 1,
          title: "Keep forcing field goals",
          practiceMeasure: "Tighten red-zone leverage.",
          gameMeasure: "Hold red-zone TD rate below 50%.",
          evidenceFindingIds: ["nyg-def-f01"],
        },
      ],
    },
  ],
};
