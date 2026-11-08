import { describe, expect, it } from "vitest";
import { COST_CONTINGENCY, computeRoi, scenario, validate } from "./roi";
import type { RoiInputs } from "./roi";
import { QUESTIONS, summarize } from "./opportunity";
import type { Answers } from "./opportunity";
import { HEALTH_Q, ITEMS, assess } from "./security";
import { PATTERNS, explore } from "./explorer";

const ROI: RoiInputs = { tasksPerMonth: 200, minutesPerTask: 15, hourlyCostUsd: 30, reviewMinutesPerAutomatedTask: 3, shareConservativePct: 20, shareBasePct: 40, shareOptimisticPct: 60, oneTimeCostUsd: 5000, monthlyRunCostUsd: 300, horizonMonths: 12 };

describe("ROI calculator", () => {
  it("accepts valid input", () => expect(validate(ROI)).toEqual([]));
  it("computes the three cases from the stated formula", () => {
    // base: 200*0.4 = 80 automated; saved = 80*(15-3)*30/60 = 480; cost 300; net 180; horizon 12*180-5000 = -2840; payback 5000/180
    const b = scenario(ROI, "base"); expect(b).toMatchObject({ automatedTasks: 80, monthlyBenefitUsd: 480, monthlyCostUsd: 300, monthlyNetUsd: 180, netOverHorizonUsd: -2840 }); expect(b.paybackMonths).toBeCloseTo(27.78, 2);
    // conservative: 40 automated; saved 240; run 375; net -135 -> never
    expect(scenario(ROI, "conservative")).toMatchObject({ automatedTasks: 40, monthlyBenefitUsd: 240, monthlyCostUsd: 375, monthlyNetUsd: -135, paybackMonths: "never" });
    // optimistic: 120 automated; saved 720; run 270; net 450; 12*450-5000=400; payback 11.11
    expect(scenario(ROI, "optimistic")).toMatchObject({ automatedTasks: 120, monthlyBenefitUsd: 720, monthlyCostUsd: 270, monthlyNetUsd: 450, netOverHorizonUsd: 400 });
  });
  it("orders the cases and says only the conservative case is quotable", () => {
    const o = computeRoi(ROI); expect(o.quotable).toBe("conservative");
    expect(o.scenarios.conservative.netOverHorizonUsd).toBeLessThanOrEqual(o.scenarios.base.netOverHorizonUsd); expect(o.scenarios.base.netOverHorizonUsd).toBeLessThanOrEqual(o.scenarios.optimistic.netOverHorizonUsd);
    expect(o.assumptions.join(" ")).toMatch(/not a prediction or a promise/); expect(o.assumptions.join(" ")).toContain("25%");
  });
  it("is deterministic and ranks sensitivity", () => { const a = computeRoi(ROI), b = computeRoi({ ...ROI }); expect(a).toEqual(b); expect(a.sensitivity.length).toBe(5); expect(a.sensitivity[0].swingUsd).toBeGreaterThanOrEqual(a.sensitivity[4].swingUsd); });
  it("review time larger than task time gives zero benefit, not negative", () => expect(scenario({ ...ROI, reviewMinutesPerAutomatedTask: 99 }, "base").monthlyBenefitUsd).toBe(0));
  it("zero tasks gives zero benefit and payback never", () => expect(scenario({ ...ROI, tasksPerMonth: 0 }, "base")).toMatchObject({ monthlyBenefitUsd: 0, paybackMonths: "never" }));
  it.each([["tasksPerMonth", -1], ["tasksPerMonth", NaN], ["tasksPerMonth", Infinity], ["minutesPerTask", 2000], ["hourlyCostUsd", 99999], ["shareBasePct", 101], ["horizonMonths", 0], ["horizonMonths", 61], ["oneTimeCostUsd", -5], ["monthlyRunCostUsd", 1e12]] as const)("rejects %s = %s", (f, v) => {
    expect(validate({ ...ROI, [f]: v }).some((e) => e.field === f)).toBe(true);
  });
  it("rejects shares that do not rise and non-integer months", () => {
    expect(validate({ ...ROI, shareConservativePct: 50, shareBasePct: 40 }).length).toBe(1); expect(validate({ ...ROI, horizonMonths: 2.5 }).some((e) => e.field === "horizonMonths")).toBe(true);
  });
  it("the contingency constants are what the page says", () => expect(COST_CONTINGENCY).toEqual({ conservative: 0.25, base: 0, optimistic: -0.1 }));
});

const all = (v: 0 | 1 | 2 | 3): Answers => Object.fromEntries(QUESTIONS.map((q) => [q.id, v]));
describe("AI opportunity assessment", () => {
  it("is incomplete until every question is answered", () => { const s = summarize({ volume: 3 }); expect(s.complete).toBe(false); expect(s.missing.length).toBe(QUESTIONS.length - 1); expect(s.signal).toBeNull(); });
  it("strong signal needs high fit answers and still warns when mistakes are costly", () => {
    const s = summarize({ ...all(3), error: 2, sensitivity: 0 }); expect(s.signal).toBe("strong"); expect(s.cautions.join(" ")).toMatch(/person approving every result/);
  });
  it("weak and mixed boundaries", () => {
    const fit = (n: number): Answers => ({ ...all(0), volume: n as 0, rules: 0, digital: 0, review: 0, systems: 0, owner: 0, error: 0, sensitivity: 0 });
    expect(summarize({ ...all(0) }).signal).toBe("weak"); expect(summarize({ ...fit(0), volume: 3, rules: 3, digital: 2 }).fitScore).toBe(8); expect(summarize({ ...fit(0), volume: 3, rules: 3, digital: 2 }).signal).toBe("mixed");
    expect(summarize({ ...fit(0), volume: 3, rules: 3, digital: 1 }).signal).toBe("weak");
    expect(summarize({ ...all(3), error: 0, sensitivity: 0 }).fitScore).toBe(18); expect(summarize({ ...all(2), error: 0, sensitivity: 0 }).signal).toBe("mixed"); // 12
    expect(summarize({ ...fit(0), volume: 3, rules: 3, digital: 3, review: 3, systems: 1 }).signal).toBe("strong"); // 13
  });
  it("regulated data never produces an unqualified green light and never says compliant", () => {
    const s = summarize({ ...all(3), error: 0, sensitivity: 3 }); expect(s.cautions.join(" ")).toMatch(/Do not use real records/); expect(s.cautions.join(" ")).toMatch(/qualified reviewer/);
    expect(JSON.stringify(s)).not.toMatch(/compliant|certified|guarantee/i);
  });
  it("no human review adds a caution; unknowns always state the limits", () => { expect(summarize({ ...all(2), review: 0, error: 0, sensitivity: 0 }).cautions.join(" ")).toMatch(/no human review/); expect(summarize(all(2)).unknowns.length).toBeGreaterThanOrEqual(2); });
  it("has no promise language anywhere in the question text", () => expect(JSON.stringify(QUESTIONS)).not.toMatch(/guarantee|will save|risk-free/i));
});

describe("Security readiness self-check", () => {
  const yes = Object.fromEntries(ITEMS.map((i) => [i.id, "yes" as const]));
  it("incomplete until all items and the health question are answered", () => { expect(assess({}, undefined).complete).toBe(false); expect(assess(yes, undefined).missing).toEqual(["health"]); });
  it("all yes shows no gaps and still states it is not an assessment", () => { const r = assess(yes, "no"); expect(r.gaps).toEqual([]); expect(r.inPlace).toBe(ITEMS.length); expect(r.disclaimer).toMatch(/not a security assessment or audit/); expect(r.disclaimer).toMatch(/cannot tell you that you are secure or compliant/); });
  it("gaps are ordered by weight, with no before unsure", () => {
    const r = assess({ ...yes, mfa: "no", secrets: "unsure", backup: "no", training: "no" }, "no"); expect(r.gaps.map((g) => g.id)).toEqual(["mfa", "backup", "secrets", "training"]);
    expect(r.gaps.map((g) => g.weight)).toEqual([3, 3, 3, 1]); expect(r.gaps[2]).toMatchObject({ id: "secrets", status: "unconfirmed" });
  });
  it("unsure counts as a gap to confirm, never as in place", () => expect(assess({ ...yes, logs: "unsure" }, "no").inPlace).toBe(ITEMS.length - 1));
  it("health information triggers a note that does not decide anything", () => { const n = assess(yes, "yes").healthNote!; expect(n).toMatch(/may apply/); expect(n).toMatch(/qualified adviser/); expect(n).not.toMatch(/you are covered|you are compliant/); expect(assess(yes, "unsure").healthNote).toMatch(/worth settling/); expect(assess(yes, "no").healthNote).toBeNull(); });
  it("area counts add up", () => { const r = assess({ ...yes, mfa: "no" }, "no"); expect(r.byArea.reduce((s, a) => s + a.gap + a.ok, 0)).toBe(ITEMS.length); expect(HEALTH_Q).toMatch(/health/); });
});

describe("Automation solution explorer", () => {
  it("every pattern lists human checkpoints and risks, and none promises results", () => { for (const p of PATTERNS) { expect(p.humanCheckpoints.length).toBeGreaterThan(0); expect(p.risks.length).toBeGreaterThan(0); } expect(JSON.stringify(PATTERNS)).not.toMatch(/guarantee|will save|risk-free|\bROI of\b/i); });
  it("filters by workflow and systems and always carries the illustrative note", () => {
    const r = explore("verification", [], false); expect(r.matches.map((m) => m.id)).toEqual(["p-verify-assist"]); expect(r.notes[0]).toMatch(/not recommendations, prices or promises/);
    expect(explore("any", ["paper"], false).matches.every((m) => m.systems.includes("paper"))).toBe(true); expect(explore("reporting", ["paper"], false).matches).toEqual([]);
  });
  it("health systems or the health toggle add the HIPAA caution; sensitive patterns add the security note", () => {
    expect(explore("any", ["ehr"], false).notes.join(" ")).toMatch(/HIPAA may apply/); expect(explore("reporting", [], true).notes.join(" ")).toMatch(/qualified review/);
    expect(explore("verification", [], false).notes.join(" ")).toMatch(/security review before any build/); expect(explore("reporting", [], false).notes.join(" ")).not.toMatch(/HIPAA/);
  });
});
