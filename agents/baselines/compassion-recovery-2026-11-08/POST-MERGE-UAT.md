# Post-merge UAT report: agents 07, 09, 24 (PR #10, merge `5e3dc27`)

**Prepared by:** Claude Code (implementation side, **not independent**). **Date:** 2026-11-08. **Issue:** #11.
**Independent reviewer:** **BLOCKED. None named.** Gate preserved. **Release status: NOT APPROVED.**

PR #10 was merged at `5e3dc2772ed0f7513bebd0710313e6f5f9a4004a` with no submitted review. That is a governance exception, not an approval. The "open, unmerged" and "Not approved" text in `UAT-PACKET.md` was true when written and is stale. This report supersedes its status lines; the technical sections of that packet remain the reference.

## 1. Merge-gate investigation (issue step 2)

See `docs/governance/MERGE-GATE-PROPOSAL.md` for the table. Summary: no branch protection, no ruleset, no CODEOWNERS, one collaborator, no pre-merge checks existed, 0 reviews. The merge is recorded under the owner account. The record cannot tell a person from a tool using that account, so no actor is accused. Proposal and ruleset JSON are in that file; nothing was changed in repository settings.

## 2. Verification on the exact merge SHA (issue step 3)

Isolated detached worktree at `5e3dc2772ed0f7513bebd0710313e6f5f9a4004a`, `node_modules` copied from the working checkout, Node v24.12.0. Run 2026-11-08 03:52Z to 03:54Z.

| Command | Result |
|---|---|
| `npx vitest run agents` | 7 files, **233 tests passed**, 0 failed |
| `npx tsc --noEmit` | exit 0 |
| `bash agents/tools/audit-evidence/verify-rollback.sh d5ebcd8 5e3dc27` | **13 passed, 0 failed**: only expected paths changed; 21 other agent files byte-identical (blob ids) and still v1.0; `git revert -m 1` restores the exact base tree; manual rollback matches; collector writes only through `safeWrite` |
| `AUDIT_ARTIFACTS_ROOT=<tmp> node .../rubric/evaluate.mjs rubric-run` | same counts as the packet (below) |

Covered by those 233 tests: allowlist/DNS/redirect guard (102 guard tests, 24 proxy tests), output confinement and CLI refusals (15), analyzer, scorer, rubric. **Not run:** a live collector run (no new third-party load), the full site test suite (`npm test`, 348 on a different branch), Playwright. Rollback is a local simulation in a temporary worktree. **No production rollback was performed and none is proposed.**

Production state: the deploy workflow ran successfully on this commit. Whether the live site changed visibly is **not verified** (the merged content is agent specs, tooling and baselines, not site pages; this was not checked against the deployed output).

## 3. Evaluation (issue step 4)

Counts reproduce exactly: agent 07 TP 21 / FP 0 / FN 0 / TN 27 (Not Measured 8 of 8 correct); 09 TP 25 / FP 0 / FN 0 / TN 37; 24 TP 24 / FP 0 / FN 0 / TN 28. Gold file status is still `candidate_unreviewed`, reviewer none, so **these are not field accuracy and not a valid release gate.** The author wrote both the fixtures and the detectors.

**The 238 unlabelled agent 09 flags.** A flag is unlabelled when the detector fires for a rule on a fixture and viewport where the gold file has no case for that rule. Breakdown (all 238 distinct, read from `score.json`):

- By rule: `D09-no-process` **128**, `D09-hero-fold` **110**. No other agent 09 rule produces any.
- By fixture: 69 fixtures; 50 produce 4 flags (both rules, both viewports) and 19 produce 2.

Each fixture's gold entry lists only the rules its author targeted, so a fixture built to test contrast or overlays, which contains no process steps and no hero CTA, is flagged for those two rules without any label saying whether that is the right answer. The likely reading is that the flags are factually true statements about minimal pages (no steps present, no CTA in the first viewport), not detector errors. **That reading is an inference and is not adjudicated.** Each flag needs a human label: expected-positive, expected-negative, or excluded. They are excluded from precision and recall by design, so those figures say nothing about them. Until labelled, agent 09's perfect score covers its 62 labelled cases only.

**Human gold standard (issue step 4):** BLOCKED. No named reviewer wrote real-site expected findings, and none may be written by an agent.

## 4. Quality checks (issue step 5)

- **Yellow-label contrast: VERIFIED FAIL on the one page measured.** Live homepage of the baseline site ("Site A"; the URL is in the already-merged baseline files and is deliberately not repeated here, see issue #54), one desktop load at 2026-11-08T03:54Z. The "DUAL DIAGNOSIS CARE" label: computed colour `rgb(29,124,203)`, background `rgb(255,210,56)` (own element, opacity 1, no text-shadow), 14px, weight 700. Contrast **3.028:1**. 14px bold is below the 18.66px bold large-text threshold, so WCAG 1.4.3 AA needs **4.5:1: fails**. A cropped screenshot shows solid blue text on a solid yellow pill. This does not give a site-wide verdict; other elements and breakpoints were not re-measured in this run.
- **Duplicate JSON-LD:** reported as an observation needing schema validation, not an SEO error. Unchanged since merge; covered by `jsonld-*` fixtures.
- **Confidence calibration:** evidence-derived; `high` only when two loads agree. Covered by tests; not calibrated against real outcomes.
- **Core Web Vitals:** LCP and CLS are labelled single-run, unthrottled lab values; INP and field data are Not Measured.
- **Run time and cost:** collector wall time is recorded per run; token and API cost for agent runs is **Not Measured** (no model calls were made by the collector).

## 5. Residual risks

1. No independent review of any kind has occurred. 2. Gold labels unreviewed. 3. 238 unlabelled flags unadjudicated. 4. No branch protection exists (this PR proposes it, a human must apply it). 5. No staging path: every merge to `master` deploys production. 6. The public repository contains baselines naming a third-party business (issue #54 awaits a decision). 7. Browsing a third-party site is not side-effect free (documented in the README).

## 6. Sign-off

| Role | Name | Decision | SHA reviewed | Date |
|---|---|---|---|---|
| Independent security reviewer | **BLOCKED: not named** | not decided | | |
| Independent quality reviewer / gold-standard author | **BLOCKED: not named** | not decided | | |
| Adjudicator for disputed matches | **BLOCKED: not named** | not decided | | |
| Referral owner (crisis wording) | **BLOCKED: not named** | not decided | | |
| Human approver for any further rollout | | not decided | | |

No agent may fill this table. The other 21 agents are not upgraded and will not be before this table is signed by humans.
