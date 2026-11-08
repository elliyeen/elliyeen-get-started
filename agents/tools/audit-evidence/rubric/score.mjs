// Scoring against the human gold standard. One-to-one matching: each gold case is matched to exactly one result.
// TP expected positive and flagged | FP flagged where expected negative | FN expected positive, not flagged | TN expected negative, not flagged.
// Cases expected "not_measured" are scored separately (correct only if the output says Not Measured and does not flag or pass).
import { NOT_MEASURED, DETECTORS } from "../analyze.mjs";

const WEIGHT = { critical: 8, high: 4, medium: 2, low: 1 };
const ratio = (num, den) => (den === 0 ? NOT_MEASURED : Math.round((num / den) * 1000) / 1000);
const f1 = (p, r) => (p === NOT_MEASURED || r === NOT_MEASURED || p + r === 0 ? NOT_MEASURED : Math.round(((2 * p * r) / (p + r)) * 1000) / 1000);
const blank = () => ({ cases: 0, TP: 0, FP: 0, FN: 0, TN: 0, nmCorrect: 0, nmWrong: 0, missingResults: 0, duplicates: 0, falseConfidence: 0, unsupportedClaims: 0, missedBySeverity: { critical: 0, high: 0, medium: 0, low: 0 }, unlabelledFlags: [], failures: [] });

/** The expected label after adjudication. An adjudication only counts when an adjudicator is named in the gold file. */
export function finalExpectation(gold, c) {
  if (c.adjudication && gold.adjudicator?.name) return c.adjudication.final;
  return c.expected;
}

/**
 * gold: gold.json. results: { "<fixture>@<viewport>": [ { detector, flagged, notMeasured, confidence, evidence } ] }
 * Returns per-agent and overall metrics plus gate status.
 */
export function score(gold, results) {
  const per = { "07": blank(), "09": blank(), "24": blank() };
  const labelled = new Set();
  for (const c of gold.cases) {
    const m = per[c.agent]; m.cases++;
    labelled.add(`${c.fixture}@${c.viewport}:${c.detector}`);
    const list = (results[`${c.fixture}@${c.viewport}`] || []).filter((x) => x.detector === c.detector);
    if (list.length === 0) { m.missingResults++; m.failures.push({ case: c.id, why: "no result produced" }); continue; }
    if (list.length > 1) m.duplicates += list.length - 1;
    const r = list[0];
    const exp = finalExpectation(gold, c);
    if (r.flagged && !(r.evidence && Object.keys(r.evidence).length + (Array.isArray(r.evidence) ? r.evidence.length : 0) > 0)) m.unsupportedClaims++;
    if (exp === "positive") {
      if (r.flagged) m.TP++; else { m.FN++; m.missedBySeverity[c.severity]++; m.failures.push({ case: c.id, why: r.notMeasured ? "reported Not Measured; expected a flag" : "missed" }); }
    } else if (exp === "negative") {
      if (r.flagged) { m.FP++; m.failures.push({ case: c.id, why: "flagged an expected-negative case" }); if (r.confidence === "high") m.falseConfidence++; } else m.TN++;
    } else if (exp === "not_measured") {
      if (r.notMeasured && !r.flagged) m.nmCorrect++;
      else { m.nmWrong++; m.failures.push({ case: c.id, why: r.flagged ? "flagged where the method cannot decide" : "confident pass where the method cannot decide" }); if (r.confidence === "high") m.falseConfidence++; }
    }
  }
  for (const [key, list] of Object.entries(results)) for (const r of list) {
    if (!r.flagged) continue;
    const [fx, vp] = key.split("@");
    if (!labelled.has(`${fx}@${vp}:${r.detector}`)) { const a = DETECTORS[r.detector]?.agent; if (a && per[a]) per[a].unlabelledFlags.push(`${key}:${r.detector}`); }
  }
  const out = {};
  for (const [agent, m] of Object.entries(per)) {
    const precision = ratio(m.TP, m.TP + m.FP), recall = ratio(m.TP, m.TP + m.FN);
    const pos = m.TP + m.FN, neg = m.TN + m.FP;
    out[agent] = { ...m, positives: pos, negatives: neg, notMeasuredCases: m.nmCorrect + m.nmWrong,
      precision, recall, f1: f1(precision, recall),
      denominators: { precision: m.TP + m.FP, recall: m.TP + m.FN },
      severityWeightedMisses: Object.entries(m.missedBySeverity).reduce((a, [s, n]) => a + WEIGHT[s] * n, 0),
      meetsDatasetMinimum: pos >= 10 && neg >= 10 };
  }
  const criticalPositives = gold.cases.filter((c) => c.severity === "critical" && finalExpectation(gold, c) === "positive").length;
  const criticalMisses = Object.values(per).reduce((a, m) => a + m.missedBySeverity.critical, 0);
  const reviewed = gold.status === "human_reviewed" && !!gold.reviewer?.name;
  const hardGate = criticalPositives === 0 ? "Not Measured (no critical positive cases)" : criticalMisses === 0 ? "pass" : "FAIL";
  return {
    gold: { status: gold.status, reviewer: gold.reviewer?.name ?? null, cases: gold.cases.length },
    perAgent: out,
    hardGate: { criticalPositives, criticalMisses, result: hardGate },
    validAsReleaseGate: reviewed && hardGate === "pass" && Object.values(out).every((m) => m.meetsDatasetMinimum),
    caveat: reviewed ? null : "Gold labels are candidate_unreviewed: results show detector behaviour on constructed fixtures, not a valid gate. A human reviewer must sign off the gold file first.",
  };
}
