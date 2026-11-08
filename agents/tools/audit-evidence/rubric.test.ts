// @vitest-environment node
import { describe, it, expect } from "vitest";
import fs from "node:fs";
import path from "node:path";
// @ts-ignore plain ESM helpers
import { FIXTURES } from "./rubric/fixtures.mjs";
// @ts-ignore
import { DETECTORS } from "./analyze.mjs";
// @ts-ignore
import { score } from "./rubric/score.mjs";

const gold = JSON.parse(fs.readFileSync(path.join(__dirname, "rubric", "gold.json"), "utf8"));

describe("gold dataset", () => {
  it("is honest about its status and has empty reviewer fields", () => {
    expect(gold.status).toBe("candidate_unreviewed");
    expect(gold.reviewer.name).toBeNull();
    expect(gold.note).toMatch(/NOT a valid gate/);
    expect(gold.sampling_limitations.length).toBeGreaterThan(40);
  });
  it.each(["07", "09", "24"])("agent %s has at least 10 positive and 10 negative cases across both viewports", (agent) => {
    const cs = gold.cases.filter((c: any) => c.agent === agent);
    expect(cs.filter((c: any) => c.expected === "positive").length).toBeGreaterThanOrEqual(10);
    expect(cs.filter((c: any) => c.expected === "negative").length).toBeGreaterThanOrEqual(10);
    expect(new Set(cs.map((c: any) => c.viewport))).toEqual(new Set(["desktop", "mobile"]));
  });
  it("every case has the fields the work order requires", () => {
    for (const c of gold.cases) for (const k of ["id", "claim", "location", "viewport", "severity", "source_evidence", "acceptance_rule", "exclusions", "expected"]) expect(c[k], `${c.id}.${k}`).not.toBeUndefined();
  });
  it("has unique ids, known detectors and fixtures, and matches the fixture truth table", () => {
    const ids = gold.cases.map((c: any) => c.id); expect(new Set(ids).size).toBe(ids.length);
    for (const c of gold.cases) { expect(DETECTORS[c.detector]).toBeTruthy(); expect(FIXTURES[c.fixture]).toBeTruthy(); }
    const fromFixtures = Object.values(FIXTURES).reduce((n: number, f: any) => n + Object.values(f.truth).reduce((m: number, t: any) => m + t.length, 0), 0);
    expect(gold.cases.length).toBe(fromFixtures);
  });
  it("includes critical referral cases so the hard gate is measurable", () => {
    expect(gold.cases.filter((c: any) => c.severity === "critical" && c.expected === "positive").length).toBeGreaterThanOrEqual(2);
  });
  it("fixtures load nothing from the network (no remote script, image, frame, stylesheet or font)", () => {
    for (const [id, f] of Object.entries<any>(FIXTURES)) {
      expect(/<(script|img|iframe|source|video|audio)\b[^>]*\bsrc=["']?(https?:)?\/\//i.test(f.html), id).toBe(false);
      expect(/<link\b[^>]*rel=["']?(stylesheet|preload|icon)/i.test(f.html), id).toBe(false);
      expect(/@import|url\((["']?)https?:/i.test(f.html), id).toBe(false);
    }
  });
});

// End to end: the real measurement code on every fixture, no network. Skipped if Chromium is unavailable.
let chromiumOk = true;
try { const { chromium } = await import("playwright-core"); const b = await chromium.launch(); await b.close(); } catch { chromiumOk = false; }
describe.skipIf(!chromiumOk)("fixture evaluation (Chromium, offline)", () => {
  it("scores every gold case, with zero critical misses, and states the caveat", async () => {
    // @ts-ignore
    const { runFixtures } = await import("./rubric/evaluate.mjs");
    const { results } = await runFixtures({ passes: 2 });
    const r = score(gold, results);
    for (const a of ["07", "09", "24"]) { expect(r.perAgent[a].missingResults, `agent ${a}`).toBe(0); expect(r.perAgent[a].duplicates).toBe(0); expect(r.perAgent[a].unsupportedClaims).toBe(0); }
    expect(r.hardGate.result).toBe("pass");
    expect(r.validAsReleaseGate).toBe(false);
    expect(r.caveat).toMatch(/human reviewer/);
    // Regression floor on constructed fixtures. These are detector-correctness numbers, not agent quality.
    for (const a of ["07", "09", "24"]) { expect(r.perAgent[a].precision).toBeGreaterThanOrEqual(0.95); expect(r.perAgent[a].recall).toBeGreaterThanOrEqual(0.95); }
    expect(r.perAgent["07"].nmWrong).toBe(0);
  }, 300000);
});
