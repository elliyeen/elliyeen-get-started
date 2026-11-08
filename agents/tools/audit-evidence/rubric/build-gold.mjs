// Generates gold.json from the truth table in fixtures.mjs. The truth is by construction (the fixture HTML),
// not from agent output. Human reviewer fields stay empty until a person signs off.
import { writeFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { FIXTURES } from "./fixtures.mjs";
import { DETECTORS } from "../analyze.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));
const VP = ["desktop", "mobile"];
const EXPECT = { pos: "positive", neg: "negative", nm: "not_measured" };
const cases = [];
for (const [fx, f] of Object.entries(FIXTURES)) for (const [det, exp] of Object.entries(f.truth)) {
  if (!DETECTORS[det]) throw new Error(`unknown detector ${det}`);
  exp.forEach((e, i) => cases.push({
    id: `${fx}:${det}:${VP[i]}`, agent: DETECTORS[det].agent, detector: det, fixture: fx, viewport: VP[i], expected: EXPECT[e],
    claim: e === "pos" ? DETECTORS[det].desc : e === "nm" ? `${DETECTORS[det].desc}: cannot be settled by the method; must be reported Not Measured` : `Not present: ${DETECTORS[det].desc}`,
    location: `fixtures.mjs#${fx} (${VP[i]})`, severity: DETECTORS[det].severity,
    source_evidence: `Constructed fixture '${fx}': the HTML in fixtures.mjs is the evidence. No agent output was read to set this label.`,
    acceptance_rule: DETECTORS[det].desc, exclusions: [],
    adjudication: null,
  }));
}
const gold = {
  schema: "elliyeen-gold-v1",
  status: "candidate_unreviewed",
  note: "Labels are set by fixture construction by Claude Code, not by a human. Results are NOT a valid gate until a human reviewer signs off and status becomes human_reviewed.",
  reviewer: { name: null, role: null, signed_off_at: null },
  adjudicator: { name: null, role: null },
  sampling_limitations: "Synthetic single-purpose pages at 1440x900 and 390x844 only. No real-site pages, no images, no scripts, no third-party widgets, no dynamic content. Detector logic is tested, site coverage is not.",
  cases,
};
writeFileSync(path.join(here, "gold.json"), JSON.stringify(gold, null, 1) + "\n");
const by = {}; for (const c of cases) { by[c.agent] ??= { positive: 0, negative: 0, not_measured: 0 }; by[c.agent][c.expected]++; }
console.log(cases.length, "cases", JSON.stringify(by));
