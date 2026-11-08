// Blind review sheet for agent 09 labels. Pure helpers; no network, no detector run, no model.
import { createHash } from "node:crypto";

export const LABELS = ["positive", "negative", "exclude"];
export const COLUMNS = ["item_id", "fixture", "viewport", "rule_id", "rule_text", "page_file", "expected", "reviewer_note"];

export const csvEscape = (v) => { const s = String(v ?? ""); return /[",\n\r]/.test(s) ? `"${s.replace(/"/g, '""')}"` : s; };
export const toCsv = (rows, cols = COLUMNS) => [cols.join(","), ...rows.map((r) => cols.map((c) => csvEscape(r[c])).join(","))].join("\n") + "\n";

export function parseCsv(text) {
  const rows = []; let row = [], cell = "", q = false;
  for (let i = 0; i < text.length; i++) {
    const ch = text[i];
    if (q) { if (ch === '"') { if (text[i + 1] === '"') { cell += '"'; i++; } else q = false; } else cell += ch; }
    else if (ch === '"') q = true;
    else if (ch === ",") { row.push(cell); cell = ""; }
    else if (ch === "\n" || ch === "\r") { if (ch === "\r" && text[i + 1] === "\n") i++; row.push(cell); cell = ""; if (row.some((x) => x !== "")) rows.push(row); row = []; }
    else cell += ch;
  }
  if (cell !== "" || row.length) { row.push(cell); if (row.some((x) => x !== "")) rows.push(row); }
  if (!rows.length) return [];
  const head = rows[0];
  return rows.slice(1).map((r) => Object.fromEntries(head.map((h, i) => [h, r[i] ?? ""])));
}

export const itemId = (fixture, viewport, rule) => createHash("sha1").update(`${fixture}|${viewport}|${rule}`).digest("hex").slice(0, 8);

/** Deterministic PRNG (mulberry32) so the same seed gives the same order. */
export function prng(seed) { let a = seed >>> 0; return () => { a = (a + 0x6d2b79f5) >>> 0; let t = a; t = Math.imul(t ^ (t >>> 15), t | 1); t ^= t + Math.imul(t ^ (t >>> 7), t | 61); return ((t ^ (t >>> 14)) >>> 0) / 4294967296; }; }
export function shuffle(arr, rnd) { const a = [...arr]; for (let i = a.length - 1; i > 0; i--) { const j = Math.floor(rnd() * (i + 1)); [a[i], a[j]] = [a[j], a[i]]; } return a; }

/**
 * Build the blind sheet. flaggedKeys: Set of "fixture@viewport:rule" that the detector flagged and gold does not label.
 * The sheet mixes those with `decoys` randomly chosen unflagged, unlabelled pairs so the reviewer cannot tell which were flagged.
 * Returns { rows, key } where key (never shown to the reviewer) records which items were flagged.
 */
export function buildSheet({ fixtures, detectors, gold, flaggedKeys, decoys = 60, seed = 20261108 }) {
  const labelled = new Set(gold.cases.map((c) => `${c.fixture}@${c.viewport}:${c.detector}`));
  const all = [];
  for (const fx of fixtures) for (const vp of ["desktop", "mobile"]) for (const [rule, d] of Object.entries(detectors)) {
    const k = `${fx}@${vp}:${rule}`; if (labelled.has(k)) continue;
    all.push({ k, fixture: fx, viewport: vp, rule, text: d.desc });
  }
  const rnd = prng(seed);
  const flagged = all.filter((x) => flaggedKeys.has(x.k));
  // Decoys come only from rules that appear among the flagged items, so the rule column does not reveal which items were flagged.
  const flaggedRules = new Set(flagged.map((x) => x.rule));
  const pool = shuffle(all.filter((x) => !flaggedKeys.has(x.k) && (flaggedRules.size === 0 || flaggedRules.has(x.rule))), rnd).slice(0, decoys);
  const chosen = shuffle([...flagged, ...pool], rnd);
  const rows = chosen.map((x) => ({ item_id: itemId(x.fixture, x.viewport, x.rule), fixture: x.fixture, viewport: x.viewport, rule_id: x.rule, rule_text: x.text, page_file: `pages/${x.fixture}.html`, expected: "", reviewer_note: "" }));
  const key = Object.fromEntries(chosen.map((x) => [itemId(x.fixture, x.viewport, x.rule), flaggedKeys.has(x.k) ? "flagged" : "decoy"]));
  return { rows, key };
}

/** Validate one completed sheet against the blank one. Returns { errors, labels }. */
export function validateSheet(blankRows, doneRows, reviewerName) {
  const errors = [];
  if (!reviewerName || !reviewerName.trim()) errors.push("reviewer name is required");
  const byId = new Map(doneRows.map((r) => [r.item_id, r]));
  if (byId.size !== doneRows.length) errors.push("duplicate item_id in completed sheet");
  const labels = [];
  for (const b of blankRows) {
    const r = byId.get(b.item_id);
    if (!r) { errors.push(`missing item ${b.item_id}`); continue; }
    for (const c of ["fixture", "viewport", "rule_id"]) if (r[c] !== b[c]) errors.push(`item ${b.item_id}: column ${c} was altered`);
    if (!LABELS.includes(r.expected)) { errors.push(`item ${b.item_id}: expected must be one of ${LABELS.join("/")}, got "${r.expected}"`); continue; }
    labels.push({ item_id: b.item_id, fixture: b.fixture, viewport: b.viewport, rule: b.rule_id, text: b.rule_text, expected: r.expected, note: r.reviewer_note });
  }
  for (const id of byId.keys()) if (!blankRows.some((b) => b.item_id === id)) errors.push(`unknown item ${id}`);
  return { errors, labels };
}

/** Compare two reviewers' labels. Returns the items they disagree on (these go to the adjudicator). */
export function disagreements(a, b) {
  const bm = new Map(b.map((x) => [x.item_id, x]));
  return a.filter((x) => bm.has(x.item_id) && bm.get(x.item_id).expected !== x.expected).map((x) => ({ item_id: x.item_id, fixture: x.fixture, viewport: x.viewport, rule: x.rule, first: x.expected, second: bm.get(x.item_id).expected }));
}

/** Turn agreed labels into gold cases. 'exclude' labels are not scored; they are listed separately. */
export function toGoldCases(labels, reviewerName, severityOf) {
  return labels.filter((l) => l.expected !== "exclude").map((l) => ({
    id: `${l.fixture}:${l.rule}:${l.viewport}`, agent: "09", detector: l.rule, fixture: l.fixture, viewport: l.viewport, expected: l.expected,
    claim: l.expected === "positive" ? l.text : `Not present: ${l.text}`, location: `pages/${l.fixture}.html (${l.viewport})`, severity: severityOf(l.rule),
    source_evidence: `Labelled by ${reviewerName} on the blind review sheet, before reading agent output (attested by the reviewer, not verified by the tooling).`,
    acceptance_rule: l.text, exclusions: [], adjudication: null,
  }));
}
