# Human gold-label review kit (agent 09 flags and real-site cases)

**Status:** materials only. **No label in this directory was written by a human, and none was written by Claude as ground truth.** Nothing here approves anything. The gold file stays `candidate_unreviewed` until a named human signs off.

## A. The 238 unlabelled agent 09 flags (synthetic fixtures)
`agent09-sheet/sheet.csv` has 252 rows: the 238 pairs where the detector fired but the gold file has no case, plus 14 decoys. `agent09-sheet/pages/*.html` are the 69 synthetic pages (open at 1440x900 for `desktop`, 390x844 for `mobile`).

**Blinding, honestly:** the sheet shows no detector output and no suggested answer. It cannot hide *which* pairs were flagged: only 14 eligible unflagged pairs exist for these two rules (`D09-hero-fold`, `D09-no-process`), so about 94 percent of rows were flagged. The reviewer is blind to what the detector said and to the right answer, which is what matters for a fair label. The key (`flagged` or `decoy` per item) is **not in this repository**; keep it from the reviewer until all labels are in.

**Reviewer steps**
1. Read the rule text. Open the page at the stated viewport.
2. Before running or reading any agent, fill `expected`: `positive` (the problem in the rule is present), `negative` (not present), or `exclude` (the page is not a fair test of this rule; say why in `reviewer_note`).
3. Do not edit any other column. Save as CSV.
4. A second reviewer does the same independently, without seeing the first reviewer's answers.

**Tooling**
- Build the sheet again: `node make-sheet.mjs <results.json> <out-dir> [key.json]` (results come from `rubric/evaluate.mjs`). Same seed gives the same order.
- Ingest: `node ingest.mjs <sheet.csv> <reviewer1.csv> "<name>" [<reviewer2.csv> "<name>"] --out proposed-gold.json`. It refuses blanks, invalid labels, altered columns and a missing reviewer name; it lists disagreements as `pending_adjudication`; it never sets `human_reviewed`.
- Score: put `proposed-gold.json` where `score.mjs` reads gold and run `evaluate.mjs`. Unlabelled flags then drop by the number labelled.

## B. Disagreement adjudication
Items where the two reviewers differ go to a third person (the adjudicator), who sees both labels and the page, decides, and records the reason in the case's `adjudication` field (`{ final, by, reason, at }`). `score.mjs` only honours an adjudication when `adjudicator.name` is filled in the gold file. Reviewers and adjudicator must be different people; the implementer (Claude) is neither.

## C. Real-site expected-finding form (blank; for the human before reading any agent output)
Use "Site A", "Site B" in this public repository. Keep the URL mapping in a private document (issue #54: do not add more third-party names to public artifacts).

| Field | Value |
|---|---|
| Finding ID | |
| Site label (A, B, ...) | |
| Page (path only) and viewport (desktop 1440x900, mobile 390x844) | |
| Exact claim | |
| Expected | positive / negative |
| Severity (critical, high, medium, low) | |
| Source evidence (what you saw; screenshot name) | |
| Objective acceptance rule | |
| Exclusions | |
| Reviewer name, role, date | |

**Coverage required by the work order:** at least 10 positive and 10 negative cases per upgraded agent (07, 09, 24), spanning desktop and mobile and normal, edge and negative pages. Record sampling limits. Do not copy findings from agent output.

**Note on the contrast case:** the 3.028:1 label was measured by Claude Code on one page and is a *candidate* until a human writes the expected finding.

## D. What this does not do
It does not label anything, approve the gold file, or establish field accuracy. Agent 09's perfect score still covers only the 62 author-labelled fixture cases.
