# Before / after: agents 07, 09, 24 on compassionrecoverycenters.com

> **Superseded in part (2026-11-08, v1.2).** The tables below compare v1.0 with v1.1. After PR #10 review the collector, contrast method, confidence rules and tests changed; test counts and the collector description below are out of date. See the v1.2 section at the end and `UAT-PACKET.md` (authoritative).

Before = baseline run on agent v1.0 (2026-11-08). After = `collect.mjs` run with agents at v1.1 (same URL, same viewports 1440x900 and 390x844, same day). Evidence layer only: the agents' judgment scores are not re-scored because no human rubric exists.

| Test case | Before (v1.0 baseline) | After (v1.1) | Change |
|---|---|---|---|
| 09-1 desktop hero CTA | No hero button in first 900px; hero phone link at y=920 | heroStatus=below-fold; first body tel link below the fold at y=920, 0px visible | Same result, now a measured status |
| 09-2 mobile CTAs | Call Now top 817 (27px visible); Verify Insurance 896, calls tel:(877) 375-4344 | Call Now top 817, 27px visible, partially-visible; Verify Insurance top 896, 0px visible, below-fold; verify-label-calls flagged=True | Same result, plus automatic label/destination flag |
| 09-3 phone targets | 4 tel targets, 2 visible numbers (intent unknown) | 4 link targets, 2 visible, link-only 2, intent Not Measured | Same counts; intent explicitly Not Measured |
| 09-4 Step 1 position | Desktop y=9657 (66%, 10.7 vp); mobile y=17255 (66%, 20.4 vp); no Step 3; no How It Works | Desktop {'top': 9657, 'pctDown': 66, 'viewportsDown': 10.7}; mobile {'top': 17255, 'pctDown': 66, 'viewportsDown': 20.4}; Step 3 present=False; How It Works text=0 | Identical |
| 09-5 generic labels | 10 Learn More, 2 Get Started | {'get started': 2, 'learn more': 10} | Identical |
| 07-3/07-4 overlays | 3 overlays both viewports; mobile accessibility button covers 'Flexible Scheduling' | desktop 3, mobile 3; mobile covers: [['Flexible Scheduling']] | Identical after fixing shadow-DOM and size-threshold misses found during this run |
| 07-5 contrast | Not measured | DUAL DIAGNOSIS CARE: 3.03; Compassionate Care For: Not Measured; Compassion Recovery Ce: Not Measured; Verify My Insurance  F: Not Measured | New: measured on solid backgrounds, Not Measured over images (hero text over photo stays unmeasured). The 3.03 ratio on the yellow label needs a human check |
| 07-1 typefaces | Figtree, Poppins, Inter, Trustindex Poppins | Figtree, Poppins, Trustindex Poppins, Inter | Identical |
| 24-2 JSON-LD duplicates | WebSite x3, MedicalClinic x2 | WebSite x3, MedicalClinic x2 | Identical |
| 24-3 URL patterns | Mixed depth; -treatment suffix inconsistent (3 examples) | 23 pages, depths [1, 2], with suffix 7, without 16, inconsistent=True | Now measured over 23 pages |
| 24 lab CWV | Not measured | desktop LCP 432ms CLS 0.001; mobile LCP 476ms CLS 0; INP Not Measured | New, lab-only, single run |

## Metrics

| Metric | Before | After |
|---|---|---|
| Evidence collection wall clock | two ad-hoc scripts, 18.5s and about 12s per run, hand-run | one command, 8.1s; rerun 8.6s |
| Reproducibility | 15 of 15 fields identical across 2 runs | key fields identical between two v1.1 runs: True |
| Feedback records | written by hand | 3 generated per run, validation: valid |
| Token/API cost | Not measured | Not measured |
| False positives / omissions vs human rubric | Not measured | Not measured (rubric still missing) |
| Unit and regression tests | none for agents | 57 agent tests pass; full suite 9 files, 106 tests pass; tsc clean |

## Limits

- One site, one page (homepage), one day. Lab data, unthrottled, single run per viewport. No analytics, so no conversion or ranking claims.
- Two collector bugs were found and fixed during this run (accessibility widget inside shadow DOM; 30x30 button under the size threshold). Both were caught by comparing against the baseline.
- Hero text over the photo cannot be contrasted without reading pixels; it stays Not Measured by design.
- Agent run time and token cost are not available to the agent. The upgrade changes instructions plus a collector; it does not change what judgment scores mean.

## Rollback

Revert the merge commit of this PR (`git revert -m 1 <merge sha>`), or `git checkout <master sha before merge> -- agents/07-apple-design.md agents/09-conversion.md agents/24-seo-growth-engineering.md agents/AUDIT.md` and delete `agents/tools/audit-evidence/`, `agents/agent-structure.test.ts` and `agents/baselines/`. The agents return to v1.0 exactly (version headers from PR #9 remain). The collector is read-only and writes only to the directory given on the command line, so there is no data to roll back.

## Gates still required

Independent security and quality review. Human approval. No auto-merge, no deploy.

## v1.2 update (after PR #10 review)

Same URL and viewports. Evidence in `after-v1.2/`.

| Aspect | v1.0 baseline | v1.1 | v1.2 |
|---|---|---|---|
| URL scope | any URL by hand | any URL | https + `allowed-hosts.json` only; every connection through a filtering proxy |
| Output | any directory | any directory | confined under an artifacts root, new empty directory, exclusive writes |
| Contrast coverage | not measured | first 4 `h1`/`p` elements | every visible text element in the first viewport: desktop 15/15, mobile 9/9 |
| Contrast result | not measured | yellow label 3.03:1 | yellow label 3.03:1 confirmed by an independent calculation; 5 desktop and 3 mobile candidate failures; ambiguous text is Not Measured (8 / 5) |
| Confidence | hand-assigned | `high` whenever an object existed | derived from evidence: Not Measured, low, medium (1 load), high (2 agreeing loads) |
| JSON-LD duplicates | not measured | reported as a finding | observation, schema validity Not Measured, low confidence |
| Rubric / scoring | none | none | 170 gold cases, TP/FP/FN/TN, precision, recall, F1, hard gate; gold is `candidate_unreviewed` |
| Collector wall time (both viewports) | about 18s hand-run | 8s | 16.6s and 15.5s (two independent loads per viewport) |
| Two runs agree | 15 of 15 fields | key fields | all detector results identical |
| Tests | none | 57 agent tests | 14 files, 282 tests pass in the full suite; `tsc --noEmit` clean |
| Rollback | stated | stated | verified against `d5ebcd8`: 13 checks, revert restores the exact base tree, 21 other agents byte-identical |

Not measured at any version: agent run time, token or API cost, false positives and omissions against a human rubric, field Core Web Vitals, INP, conversion.
