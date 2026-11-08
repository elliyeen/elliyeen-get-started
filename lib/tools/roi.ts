// ROI calculator logic. Deterministic arithmetic on numbers the visitor types in. It is not a forecast and promises nothing.
// Conservative, base and optimistic cases differ only in the automation share the visitor chooses and a visible cost contingency.

export interface RoiInputs {
  tasksPerMonth: number;
  minutesPerTask: number;
  hourlyCostUsd: number;
  reviewMinutesPerAutomatedTask: number; // human time still spent per automated task
  shareConservativePct: number;
  shareBasePct: number;
  shareOptimisticPct: number;
  oneTimeCostUsd: number;
  monthlyRunCostUsd: number;
  horizonMonths: number;
}
export type Scenario = "conservative" | "base" | "optimistic";
export interface ScenarioResult { automatedTasks: number; monthlyBenefitUsd: number; monthlyCostUsd: number; monthlyNetUsd: number; netOverHorizonUsd: number; paybackMonths: number | "never" }
export interface RoiOutput { scenarios: Record<Scenario, ScenarioResult>; sensitivity: { input: string; label: string; swingUsd: number }[]; assumptions: string[]; quotable: Scenario }
export type FieldError = { field: keyof RoiInputs; message: string };

/** Cost contingency applied to the monthly run cost in each case. Shown to the visitor, not hidden. */
export const COST_CONTINGENCY: Record<Scenario, number> = { conservative: 0.25, base: 0, optimistic: -0.1 };

const LIMITS: Record<keyof RoiInputs, [number, number, string]> = {
  tasksPerMonth: [0, 1_000_000, "tasks per month"],
  minutesPerTask: [0, 1440, "minutes per task"],
  hourlyCostUsd: [0, 2000, "hourly cost"],
  reviewMinutesPerAutomatedTask: [0, 1440, "review minutes"],
  shareConservativePct: [0, 100, "conservative share"],
  shareBasePct: [0, 100, "base share"],
  shareOptimisticPct: [0, 100, "optimistic share"],
  oneTimeCostUsd: [0, 50_000_000, "one-time cost"],
  monthlyRunCostUsd: [0, 5_000_000, "monthly run cost"],
  horizonMonths: [1, 60, "months"],
};

export function validate(i: RoiInputs): FieldError[] {
  const errs: FieldError[] = [];
  for (const [k, [lo, hi, label]] of Object.entries(LIMITS) as [keyof RoiInputs, [number, number, string]][]) {
    const v = i[k];
    if (typeof v !== "number" || !Number.isFinite(v)) errs.push({ field: k, message: `Enter a number for ${label}.` });
    else if (v < lo || v > hi) errs.push({ field: k, message: `${label[0].toUpperCase()}${label.slice(1)} must be between ${lo} and ${hi}.` });
  }
  if (!errs.length) {
    if (i.shareConservativePct > i.shareBasePct || i.shareBasePct > i.shareOptimisticPct) errs.push({ field: "shareBasePct", message: "Shares must rise from conservative to base to optimistic." });
    if (!Number.isInteger(i.horizonMonths)) errs.push({ field: "horizonMonths", message: "Months must be a whole number." });
  }
  return errs;
}

const r2 = (n: number) => Math.round(n * 100) / 100;
export function scenario(i: RoiInputs, s: Scenario, scale: Partial<Record<string, number>> = {}): ScenarioResult {
  const tasks = i.tasksPerMonth * (scale.tasks ?? 1), minutes = i.minutesPerTask * (scale.minutes ?? 1), hourly = i.hourlyCostUsd * (scale.hourly ?? 1);
  const share = ({ conservative: i.shareConservativePct, base: i.shareBasePct, optimistic: i.shareOptimisticPct }[s] / 100) * (scale.share ?? 1);
  const run = i.monthlyRunCostUsd * (scale.run ?? 1) * (1 + COST_CONTINGENCY[s]);
  const automated = tasks * Math.min(share, 1);
  const saved = (automated * Math.max(minutes - i.reviewMinutesPerAutomatedTask, 0) * hourly) / 60;
  const net = saved - run;
  return { automatedTasks: r2(automated), monthlyBenefitUsd: r2(saved), monthlyCostUsd: r2(run), monthlyNetUsd: r2(net), netOverHorizonUsd: r2(net * i.horizonMonths - i.oneTimeCostUsd), paybackMonths: net > 0 ? r2(i.oneTimeCostUsd / net) : "never" };
}

export function computeRoi(i: RoiInputs): RoiOutput {
  const scenarios = { conservative: scenario(i, "conservative"), base: scenario(i, "base"), optimistic: scenario(i, "optimistic") };
  const base = scenarios.base.netOverHorizonUsd;
  const knobs: [string, string][] = [["tasks", "Tasks per month"], ["minutes", "Minutes per task"], ["hourly", "Hourly cost"], ["share", "Share automated (base)"], ["run", "Monthly run cost"]];
  const sensitivity = knobs.map(([k, label]) => ({ input: k, label, swingUsd: r2(Math.max(Math.abs(scenario(i, "base", { [k]: 1.2 }).netOverHorizonUsd - base), Math.abs(scenario(i, "base", { [k]: 0.8 }).netOverHorizonUsd - base))) })).sort((a, b) => b.swingUsd - a.swingUsd);
  return {
    scenarios, sensitivity, quotable: "conservative",
    assumptions: [
      "Time saved = automated tasks x (minutes per task minus review minutes) x hourly cost / 60.",
      `Conservative adds ${COST_CONTINGENCY.conservative * 100}% to the monthly run cost; optimistic reduces it by ${Math.abs(COST_CONTINGENCY.optimistic) * 100}%.`,
      "Shares are what you chose, not measurements. One-time cost is spread over no period; it is subtracted once.",
      "Benefits are valued at the hourly cost you entered. Freed time is not money unless it is redeployed or hours are reduced.",
      "Only the conservative case is worth planning around. These numbers are not a prediction or a promise.",
    ],
  };
}
