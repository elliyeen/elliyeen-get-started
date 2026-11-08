import { describe, it, expect } from "vitest";
// @ts-ignore plain ESM helper
import { score, finalExpectation } from "./rubric/score.mjs";

// Synthetic gold and results. No model output is used as truth.
const mk = (id: string, detector: string, expected: string, extra = {}) => ({ id, agent: detector.slice(1, 3), detector, fixture: id, viewport: "desktop", expected, severity: "medium", adjudication: null, ...extra });
const res = (flagged: boolean, o: any = {}) => ({ detector: "", flagged, notMeasured: false, confidence: "medium", evidence: { x: 1 }, ...o });
const gold = (cases: any[], over: any = {}) => ({ status: "candidate_unreviewed", reviewer: { name: null }, adjudicator: { name: null }, cases, ...over });
const R = (c: any, o: any) => ({ [`${c.fixture}@${c.viewport}`]: [{ ...res(false), detector: c.detector, ...o }] });
const merge = (...r: any[]) => Object.assign({}, ...r);

describe("score: one-to-one TP/FP/FN/TN", () => {
  const cases = [mk("a", "D09-hero-fold", "positive"), mk("b", "D09-hero-fold", "positive"), mk("c", "D09-hero-fold", "negative"), mk("d", "D09-hero-fold", "negative"), mk("e", "D09-hero-fold", "negative")];
  const results = merge(R(cases[0], { flagged: true }), R(cases[1], { flagged: false }), R(cases[2], { flagged: true }), R(cases[3], { flagged: false }), R(cases[4], { flagged: false }));
  const s = score(gold(cases), results).perAgent["09"];
  it("counts the confusion matrix", () => { expect([s.TP, s.FP, s.FN, s.TN]).toEqual([1, 1, 1, 2]); });
  it("computes precision, recall and F1 with denominators", () => {
    expect(s.precision).toBe(0.5); expect(s.recall).toBe(0.5); expect(s.f1).toBe(0.5);
    expect(s.denominators).toEqual({ precision: 2, recall: 2 });
  });
  it("lists failures with a reason", () => { expect(s.failures.map((f: any) => f.case).sort()).toEqual(["b", "c"]); });
});

describe("score: undefined ratios are Not Measured", () => {
  it("has no precision when nothing was flagged and no recall when nothing was expected", () => {
    const c = [mk("a", "D09-hero-fold", "negative")];
    const s = score(gold(c), R(c[0], { flagged: false })).perAgent["09"];
    expect(s.precision).toBe("Not Measured"); expect(s.recall).toBe("Not Measured"); expect(s.f1).toBe("Not Measured");
  });
});

describe("score: Not Measured cases", () => {
  const c = [mk("a", "D07-contrast-fail", "not_measured"), mk("b", "D07-contrast-fail", "not_measured"), mk("c", "D07-contrast-fail", "not_measured")];
  const results = merge(R(c[0], { notMeasured: true }), R(c[1], { flagged: true, confidence: "high" }), R(c[2], {}));
  const s = score(gold(c), results).perAgent["07"];
  it("rewards Not Measured, penalises flags and confident passes, counts false confidence", () => {
    expect(s.nmCorrect).toBe(1); expect(s.nmWrong).toBe(2); expect(s.falseConfidence).toBe(1);
    expect(s.TP + s.FP + s.FN + s.TN).toBe(0);
  });
});

describe("score: severity weighting and the hard gate", () => {
  const c = [mk("crit", "D09-referral", "positive", { severity: "critical" }), mk("low", "D07-typefaces", "positive", { severity: "low" })];
  it("fails the hard gate on a missed critical case and weights it", () => {
    const r = score(gold(c), merge(R(c[0], { flagged: false }), R(c[1], { flagged: false })));
    expect(r.hardGate.result).toBe("FAIL"); expect(r.perAgent["09"].severityWeightedMisses).toBe(8); expect(r.perAgent["07"].severityWeightedMisses).toBe(1);
  });
  it("passes when the critical case is caught", () => {
    expect(score(gold(c), merge(R(c[0], { flagged: true }), R(c[1], { flagged: false }))).hardGate.result).toBe("pass");
  });
  it("is Not Measured when there is no critical positive case", () => {
    const x = [mk("a", "D07-typefaces", "positive")];
    expect(score(gold(x), R(x[0], { flagged: true })).hardGate.result).toMatch(/Not Measured/);
  });
});

describe("score: bookkeeping", () => {
  it("counts missing results, duplicates and unsupported claims", () => {
    const c = [mk("a", "D24-h1-count", "positive"), mk("b", "D24-h1-count", "positive"), mk("c", "D24-h1-count", "positive")];
    const results = { "a@desktop": [{ ...res(true), detector: "D24-h1-count" }, { ...res(true), detector: "D24-h1-count" }], "c@desktop": [{ ...res(true, { evidence: null }), detector: "D24-h1-count" }] };
    const s = score(gold(c), results).perAgent["24"];
    expect(s.missingResults).toBe(1); expect(s.duplicates).toBe(1); expect(s.unsupportedClaims).toBe(1); expect(s.TP).toBe(2);
  });
  it("reports flags that have no gold case separately, outside precision and recall", () => {
    const c = [mk("a", "D24-h1-count", "negative")];
    const results = { "a@desktop": [{ ...res(false), detector: "D24-h1-count" }, { ...res(true), detector: "D24-lang-missing" }] };
    const s = score(gold(c), results).perAgent["24"];
    expect(s.unlabelledFlags).toEqual(["a@desktop:D24-lang-missing"]); expect(s.FP).toBe(0);
  });
  it("flags datasets below ten positives and ten negatives", () => {
    const c = [mk("a", "D09-hero-fold", "positive"), mk("b", "D09-hero-fold", "negative")];
    expect(score(gold(c), merge(R(c[0], { flagged: true }), R(c[1], {}))).perAgent["09"].meetsDatasetMinimum).toBe(false);
  });
});

describe("score: gate validity and adjudication", () => {
  const c = [mk("a", "D09-hero-fold", "positive")];
  it("is never a valid release gate while gold is unreviewed", () => {
    const r = score(gold(c), R(c[0], { flagged: true }));
    expect(r.validAsReleaseGate).toBe(false); expect(r.caveat).toMatch(/human reviewer/);
  });
  it("ignores an adjudication that names no adjudicator", () => {
    const cc = [mk("a", "D09-hero-fold", "positive", { adjudication: { final: "negative" } })];
    expect(finalExpectation(gold(cc), cc[0])).toBe("positive");
  });
  it("applies an adjudication when an adjudicator is named", () => {
    const cc = [mk("a", "D09-hero-fold", "positive", { adjudication: { final: "negative" } })];
    const g = gold(cc, { adjudicator: { name: "Reviewer B" } });
    expect(finalExpectation(g, cc[0])).toBe("negative");
    expect(score(g, R(cc[0], { flagged: true })).perAgent["09"].FP).toBe(1);
  });
});

describe("score: sensitivity (a worse detector must score worse)", () => {
  it("drops recall when detections are removed and precision when extras are added", () => {
    const pos = Array.from({ length: 10 }, (_, i) => mk(`p${i}`, "D09-hero-fold", "positive"));
    const neg = Array.from({ length: 10 }, (_, i) => mk(`n${i}`, "D09-hero-fold", "negative"));
    const all = [...pos, ...neg];
    const perfect = merge(...pos.map((c) => R(c, { flagged: true })), ...neg.map((c) => R(c, {})));
    const missing = merge(...pos.map((c, i) => R(c, { flagged: i >= 3 })), ...neg.map((c) => R(c, {})));
    const noisy = merge(...pos.map((c) => R(c, { flagged: true })), ...neg.map((c, i) => R(c, { flagged: i < 4 })));
    expect(score(gold(all), perfect).perAgent["09"].f1).toBe(1);
    expect(score(gold(all), missing).perAgent["09"].recall).toBe(0.7);
    expect(score(gold(all), noisy).perAgent["09"].precision).toBe(0.714);
  });
});
