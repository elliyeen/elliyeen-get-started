// Usage: node ingest.mjs <blank-sheet.csv> <reviewer1.csv> "<reviewer1 name>" [<reviewer2.csv> "<reviewer2 name>"] --out <proposed-gold.json>
// Never sets status to human_reviewed. A human edits reviewer/adjudicator/signed_off_at and status after sign-off.
import { readFileSync, writeFileSync } from "node:fs";
import { parseCsv, validateSheet, disagreements, toGoldCases } from "./lib.mjs";
import { DETECTORS } from "../../analyze.mjs";

const args = process.argv.slice(2); const oi = args.indexOf("--out");
if (oi < 0) { console.error("--out required"); process.exit(2); }
const out = args[oi + 1]; const pos = args.slice(0, oi);
const [blankPath, f1, n1, f2, n2] = pos;
if (!blankPath || !f1 || !n1) { console.error("usage: ingest.mjs <blank.csv> <r1.csv> <name1> [<r2.csv> <name2>] --out <file>"); process.exit(2); }
const blank = parseCsv(readFileSync(blankPath, "utf8"));
const v1 = validateSheet(blank, parseCsv(readFileSync(f1, "utf8")), n1);
const v2 = f2 ? validateSheet(blank, parseCsv(readFileSync(f2, "utf8")), n2) : null;
const errors = [...v1.errors.map((e) => `reviewer 1: ${e}`), ...(v2 ? v2.errors.map((e) => `reviewer 2: ${e}`) : [])];
if (errors.length) { console.error(errors.join("\n")); process.exit(1); }
const dis = v2 ? disagreements(v1.labels, v2.labels) : [];
const disIds = new Set(dis.map((d) => d.item_id));
const agreed = v1.labels.filter((l) => !disIds.has(l.item_id));
const sev = (r) => DETECTORS[r]?.severity ?? "medium";
const gold = JSON.parse(readFileSync(new URL("../gold.json", import.meta.url), "utf8"));
const added = toGoldCases(agreed, v2 ? `${n1} and ${n2}` : n1, sev);
const proposed = { ...gold, status: "candidate_unreviewed", note: "Proposed by ingest.mjs from human-labelled sheets. Status stays candidate_unreviewed until a named human signs off.",
  cases: [...gold.cases, ...added], pending_adjudication: dis, excluded: agreed.filter((l) => l.expected === "exclude").map((l) => l.item_id) };
writeFileSync(out, JSON.stringify(proposed, null, 1) + "\n");
console.log(`${added.length} cases added, ${dis.length} disagreements for the adjudicator, ${proposed.excluded.length} excluded`);
