#!/usr/bin/env node
// Runs every fixture through the real measurement code with NO network (all requests aborted), then scores against gold.json.
// Usage: node agents/tools/audit-evidence/rubric/evaluate.mjs <outName>   (written under the artifacts root)
import { chromium } from "playwright-core";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import path from "node:path";
import { FIXTURES } from "./fixtures.mjs";
import { score } from "./score.mjs";
import * as A from "../analyze.mjs";
import * as G from "../guard.mjs";
import { VIEWPORTS, measurePage } from "../core.mjs";

const here = path.dirname(fileURLToPath(import.meta.url));

export async function runFixtures({ passes = 2 } = {}) {
  const browser = await chromium.launch();
  const results = {}; const timing = { fixtures: 0, wallMs: 0 }; const t0 = Date.now();
  for (const [id, f] of Object.entries(FIXTURES)) for (const [vpName, vp] of Object.entries(VIEWPORTS)) {
    const runs = [];
    for (let p = 0; p < passes; p++) {
      const ctx = await browser.newContext({ viewport: vp, isMobile: vpName === "mobile" });
      await ctx.route("**/*", (r) => (/^(data|about|blob):/.test(r.request().url()) ? r.continue() : r.abort("blockedbyclient"))); // fixtures never touch the network
      const page = await ctx.newPage();
      await page.setContent(f.html, { waitUntil: "load" });
      runs.push(await measurePage(page, vp, "fixture.test"));
      await ctx.close();
    }
    const sig = (m) => JSON.stringify(A.deriveViewport(m).map((x) => [x.detector, x.flagged, x.notMeasured]));
    const agree = runs.every((r) => sig(r) === sig(runs[0])) ? passes : 1;
    results[`${id}@${vpName}`] = A.deriveViewport(runs[0], { runsAgreeing: agree });
    timing.fixtures++;
  }
  await browser.close();
  timing.wallMs = Date.now() - t0;
  return { results, timing };
}

if (process.argv[1] === fileURLToPath(import.meta.url)) {
  const outName = process.argv[2];
  if (!outName) { console.error("usage: evaluate.mjs <outName>"); process.exit(2); }
  const root = path.resolve(process.env.AUDIT_ARTIFACTS_ROOT || path.join(process.cwd(), "agents", "artifacts"));
  const outDir = G.resolveOutputDir(root, outName);
  const gold = JSON.parse(readFileSync(path.join(here, "gold.json"), "utf8"));
  const { results, timing } = await runFixtures();
  const report = { ...score(gold, results), run: { fixtureViewportRuns: timing.fixtures, passesPerRun: 2, wallMs: timing.wallMs, tokenOrApiCost: A.NOT_MEASURED, note: "Evaluation uses constructed fixtures only; no model tokens are spent by the scorer." } };
  G.safeWrite(outDir, "results.json", JSON.stringify(results, null, 1));
  G.safeWrite(outDir, "score.json", JSON.stringify(report, null, 2));
  const row = (a, m) => `${a}: cases ${m.cases} | TP ${m.TP} FP ${m.FP} FN ${m.FN} TN ${m.TN} | NM ${m.nmCorrect}/${m.notMeasuredCases} | P ${m.precision} (${m.denominators.precision}) R ${m.recall} (${m.denominators.recall}) F1 ${m.f1}`;
  for (const [a, m] of Object.entries(report.perAgent)) console.log(row(a, m));
  console.log(`hard gate (critical misses): ${report.hardGate.result} | valid as release gate: ${report.validAsReleaseGate}`);
  if (report.caveat) console.log("CAVEAT:", report.caveat);
}
