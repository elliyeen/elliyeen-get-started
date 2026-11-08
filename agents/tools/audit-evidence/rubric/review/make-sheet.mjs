// Usage: node make-sheet.mjs <results.json> <out-dir> [key-out.json]
// Writes <out-dir>/sheet.csv (blind) and <out-dir>/pages/*.html (the synthetic fixtures). The optional key file says which items
// the detector flagged; keep it away from the reviewer until all labels are in.
import { readFileSync, writeFileSync, mkdirSync } from "node:fs";
import path from "node:path";
import { FIXTURES } from "../fixtures.mjs";
import { DETECTORS } from "../../analyze.mjs";
import { buildSheet, toCsv } from "./lib.mjs";

const [resultsPath, outDir, keyOut] = process.argv.slice(2);
if (!resultsPath || !outDir) { console.error("usage: make-sheet.mjs <results.json> <out-dir> [key-out.json]"); process.exit(2); }
const gold = JSON.parse(readFileSync(new URL("../gold.json", import.meta.url), "utf8"));
const results = JSON.parse(readFileSync(resultsPath, "utf8"));
const detectors = Object.fromEntries(Object.entries(DETECTORS).filter(([, v]) => v.agent === "09"));
const flaggedKeys = new Set();
for (const [fxvp, list] of Object.entries(results)) for (const r of list) if (r.flagged && detectors[r.detector]) flaggedKeys.add(`${fxvp}:${r.detector}`);
const labelled = new Set(gold.cases.map((c) => `${c.fixture}@${c.viewport}:${c.detector}`));
for (const k of [...flaggedKeys]) if (labelled.has(k)) flaggedKeys.delete(k);
const { rows, key } = buildSheet({ fixtures: Object.keys(FIXTURES), detectors, gold, flaggedKeys });
mkdirSync(path.join(outDir, "pages"), { recursive: true });
for (const [name, f] of Object.entries(FIXTURES)) writeFileSync(path.join(outDir, "pages", `${name}.html`), f.html);
writeFileSync(path.join(outDir, "sheet.csv"), toCsv(rows));
if (keyOut) writeFileSync(keyOut, JSON.stringify({ note: "Do not give to the reviewer", flaggedCount: flaggedKeys.size, key }, null, 1));
console.log(`${rows.length} items (${flaggedKeys.size} flagged + ${rows.length - flaggedKeys.size} decoys), ${Object.keys(FIXTURES).length} pages`);
