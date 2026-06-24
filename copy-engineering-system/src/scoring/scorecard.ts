import type { Scorecard, AgentResult } from "../types.js";

export const PASS_THRESHOLD_OVERALL = 6.5;
export const PASS_THRESHOLD_STAGE = 4;

/**
 * Build a Scorecard from an array of AgentResult objects.
 */
export function buildScorecard(agentResults: AgentResult[]): Scorecard {
  const get = (name: string): number => {
    const result = agentResults.find(
      (r) => r.agentName.toLowerCase() === name.toLowerCase()
    );
    return result?.score ?? 5;
  };

  const stages: Omit<Scorecard, "overall"> = {
    attention: get("attention"),
    curiosity: get("curiosity"),
    understanding: get("understanding"),
    desire: get("desire"),
    belief: get("belief"),
    trust: get("trust"),
    friction: get("friction"),
    action: get("action"),
    loyalty: get("loyalty"),
    advocacy: get("advocacy"),
  };

  const values = Object.values(stages);
  const overall =
    Math.round((values.reduce((a, b) => a + b, 0) / values.length) * 10) / 10;

  return { ...stages, overall };
}

/**
 * Determine if copy passes quality thresholds.
 * Passing requires:
 *   - overall >= 6.5
 *   - no single stage < 4
 *   - no fabrication violations (checked separately)
 */
export function passesThreshold(scorecard: Scorecard): boolean {
  if (scorecard.overall < PASS_THRESHOLD_OVERALL) return false;

  const stages: (keyof Omit<Scorecard, "overall">)[] = [
    "attention",
    "curiosity",
    "understanding",
    "desire",
    "belief",
    "trust",
    "friction",
    "action",
    "loyalty",
    "advocacy",
  ];

  for (const stage of stages) {
    if (scorecard[stage] < PASS_THRESHOLD_STAGE) return false;
  }

  return true;
}

/**
 * Return the name of the weakest stage (lowest score).
 */
export function getWeakestStage(scorecard: Scorecard): string {
  const stages: (keyof Omit<Scorecard, "overall">)[] = [
    "attention",
    "curiosity",
    "understanding",
    "desire",
    "belief",
    "trust",
    "friction",
    "action",
    "loyalty",
    "advocacy",
  ];

  let weakest = stages[0];
  let lowestScore = scorecard[stages[0]];

  for (const stage of stages) {
    if (scorecard[stage] < lowestScore) {
      lowestScore = scorecard[stage];
      weakest = stage;
    }
  }

  return weakest;
}

/**
 * Return the name of the strongest stage (highest score).
 */
export function getStrongestStage(scorecard: Scorecard): string {
  const stages: (keyof Omit<Scorecard, "overall">)[] = [
    "attention",
    "curiosity",
    "understanding",
    "desire",
    "belief",
    "trust",
    "friction",
    "action",
    "loyalty",
    "advocacy",
  ];

  let strongest = stages[0];
  let highestScore = scorecard[stages[0]];

  for (const stage of stages) {
    if (scorecard[stage] > highestScore) {
      highestScore = scorecard[stage];
      strongest = stage;
    }
  }

  return strongest;
}

/**
 * Format a Scorecard as a markdown table string.
 */
export function formatScorecardTable(
  scorecard: Scorecard,
  agentResults: AgentResult[]
): string {
  const stages: (keyof Omit<Scorecard, "overall">)[] = [
    "attention",
    "curiosity",
    "understanding",
    "desire",
    "belief",
    "trust",
    "friction",
    "action",
    "loyalty",
    "advocacy",
  ];

  const getNote = (stage: string): string => {
    const result = agentResults.find(
      (r) => r.agentName.toLowerCase() === stage.toLowerCase()
    );
    if (!result) return "";
    const score = result.score;
    if (score >= 8) return "Strong";
    if (score >= 6) return "Adequate";
    if (score >= 4) return "Needs work";
    return "Critical — fix first";
  };

  const rows = stages.map((stage) => {
    const score = scorecard[stage];
    const bar = buildScoreBar(score);
    const note = getNote(stage);
    const label = stage.charAt(0).toUpperCase() + stage.slice(1);
    const flag = score < PASS_THRESHOLD_STAGE ? " *" : "";
    return `| ${label}${flag} | ${score}/10 | ${bar} | ${note} |`;
  });

  const divider = `|---|---:|:---|---|`;
  const header = `| Stage | Score | Bar | Notes |`;
  const footer = `| **Overall** | **${scorecard.overall}/10** | | ${scorecard.overall >= PASS_THRESHOLD_OVERALL ? "PASS" : "FAIL"} |`;

  return [header, divider, ...rows, footer].join("\n");
}

/**
 * Build a simple ASCII score bar.
 */
function buildScoreBar(score: number): string {
  const filled = Math.round(score);
  const empty = 10 - filled;
  return "█".repeat(filled) + "░".repeat(empty);
}

/**
 * Collect all failing stages (score < threshold).
 */
export function getFailingStages(scorecard: Scorecard): string[] {
  const stages: (keyof Omit<Scorecard, "overall">)[] = [
    "attention",
    "curiosity",
    "understanding",
    "desire",
    "belief",
    "trust",
    "friction",
    "action",
    "loyalty",
    "advocacy",
  ];

  return stages.filter((s) => scorecard[s] < PASS_THRESHOLD_STAGE);
}
