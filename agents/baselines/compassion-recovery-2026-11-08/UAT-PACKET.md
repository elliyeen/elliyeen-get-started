# UAT packet: independent security and quality review of PR #10

**Status:** Prepared by Claude Code for an independent reviewer. **Not approved.** No agent self-approval. Do not merge or deploy until a named independent reviewer signs off and a human approves.
**PR:** https://github.com/elliyeen/elliyeen-get-started/pull/10 (open, unmerged)
**Pre-merge commit (rollback target):** `d5ebcd80630539aff3ba3be7b933584c08497cf5`
**Scope:** agents 07, 09, 24 (kept together in one PR; independently testable, see section 5), the read-only collector in `agents/tools/audit-evidence/`, the gold-standard rubric, baselines. The other 21 agents are unchanged and must stay unchanged.
**Reviewer must not rely on this packet alone.** Re-run the commands in section 2 on your own machine.

## 1. What changed since the first PR #10 revision (review findings addressed)

| # | Review finding | Change | Evidence |
|---|---|---|---|
| 1 | Arbitrary URL / SSRF / private and metadata addresses / redirect pivots | `allowed-hosts.json` allowlist (https, 443, no IP literals, no userinfo, no local names). **Local filtering proxy** forces every browser connection (including loopback) through DNS-resolve-and-vet at connect time; connects to the vetted address only. Redirect hops to internal addresses are refused; redirects to other public hosts fail the run (`navigationViolations`). | `guard.test.ts` 102, `proxy.test.ts` 24, `cli.test.ts` 15 |
| 2 | Output path confinement | Relative name under an artifacts root; no `..`, absolute, or symlink anywhere in the path; new empty directory only; exclusive file creation (`wx`); run id pattern. | `guard.test.ts`, `cli.test.ts` |
| 3 | Browser navigation is not side-effect free | Documented in `README.md` (residual risk). Third-party hosts limited to public https/443, capped, logged in `evidence.json`; service workers blocked, QUIC and non-proxied WebRTC UDP disabled. | `README.md`, evidence `network` |
| 4 | Contrast sampled 4 elements and approximated backgrounds | Every visible text-bearing element in the first viewport (cap 150) with coverage reported. Translucent layers composited. Image, gradient, opacity, filter, blend, text-shadow, pseudo-element and covered text are Not Measured. Failures are labelled candidate failures. Yellow label independently re-computed. | `rubric/fixtures.mjs` (16 contrast fixtures), section 4 |
| 5 | Confidence from truthy objects | `evidenceConfidence`: Not Measured / low (ambiguous) / medium (one load) / high (two loads agree). Validator rejects `high` without `runs_agreeing >= 2`. | `analyze.test.ts` |
| 6 | Duplicate `@type` is not automatically invalid | Reported as an observation with `schemaValidation: Not Measured` and low confidence. Agent 24 text updated. | `analyze.test.ts`, `agent-structure.test.ts` |
| 7 | Rubric and TP/FP/FN evaluation | `rubric/` fixtures, `gold.json` (170 cases), `score.mjs`, `evaluate.mjs`. | section 3 |
| 8 | Verify rollback and 21-agent non-regression | `verify-rollback.sh` (13 checks incl. mutation check). | section 6 |

**Finding discovered while fixing #1:** the first fix (Playwright request interception) did not see real server-issued redirect hops. A live redirect chain reached its final page with the handler never called. That design was replaced by the proxy. See `proxy.test.ts` ("blocks a real server redirect to the cloud metadata IP").

## 2. How to reproduce

```
git fetch origin && git checkout feat/agent-evidence-protocol
npm ci && npx playwright install chromium
npx vitest run                                  # full suite
npx tsc --noEmit
bash agents/tools/audit-evidence/verify-rollback.sh d5ebcd80630539aff3ba3be7b933584c08497cf5 HEAD
AUDIT_ARTIFACTS_ROOT=/tmp/uat node agents/tools/audit-evidence/rubric/evaluate.mjs rubric-run
AUDIT_ARTIFACTS_ROOT=/tmp/uat node agents/tools/audit-evidence/collect.mjs https://compassionrecoverycenters.com/ live-run
```

## 3. Rubric and scoring (constructed fixtures, offline)

Gold file status: **`candidate_unreviewed`**, reviewer: **None**. Labels were set by fixture construction, not by a human and not from agent output. 170 cases, desktop and mobile.

| Agent | Cases | TP | FP | FN | TN | Not Measured correct | Precision (denominator) | Recall (denominator) | F1 | Severity-weighted misses | Unlabelled flags |
|---|---|---|---|---|---|---|---|---|---|---|---|
| 07 | 56 | 21 | 0 | 0 | 27 | 8/8 | 1 (21) | 1 (21) | 1 | 0 | 0 |
| 09 | 62 | 25 | 0 | 0 | 37 | 0/0 | 1 (25) | 1 (25) | 1 | 0 | 238 |
| 24 | 52 | 24 | 0 | 0 | 28 | 0/0 | 1 (24) | 1 (24) | 1 | 0 | 0 |

- Hard gate (zero critical misses): **pass** (6 critical positive cases, 0 missed).
- Valid as release gate: **False**. Reason: Gold labels are candidate_unreviewed: results show detector behaviour on constructed fixtures, not a valid gate. A human reviewer must sign off the gold file first.
- Duplicates 0, unsupported claims 0, false-confidence flags 0 on these fixtures.
- **Read these numbers carefully.** Perfect scores on fixtures written by the same author as the detectors show the detectors do what the author intended on easy constructed cases. They are not audit quality on real sites. One fixture defect (no viewport meta tag, so mobile emulation used a 980px layout) first showed up as a recall miss, which is the scorer working. The scorer is tested for sensitivity (`score.test.ts`: removing detections lowers recall, adding extras lowers precision, undefined ratios are Not Measured).
- Unlabelled flags (detector fired where the gold file has no case) are reported separately and do not enter precision or recall. They need human labels.
- Not measured: agent run time per agent, token and API cost (the scorer spends none; model cost of the agents is not available to Claude Code), accuracy on real pages.

### What the human reviewer must do before these numbers count
1. Author expected-finding records for real pages **before** reading agent output (finding id, exact claim, URL, viewport, severity, source evidence, objective acceptance rule, exclusions, positive/negative). At least 10 positive and 10 negative per agent, desktop and mobile, normal, edge and negative fixtures. Record sampling limits and identity.
2. Review or replace the constructed labels in `gold.json`; set `status` to `human_reviewed` and fill `reviewer`.
3. A separate adjudicator resolves disputed matches (`adjudicator` and per-case `adjudication.final`; ignored while no adjudicator is named).

## 4. Live baseline vs v1.2 (compassionrecoverycenters.com homepage, public, read-only)

| | Desktop 1440x900 | Mobile 390x844 |
|---|---|---|
| Runs agreeing (2 independent loads) | 2 | 2 |
| Contrast candidates / sampled / measured | 15 / 15 / 7 | 9 / 9 / 4 |
| Contrast candidate failures | 5 | 3 |
| Contrast Not Measured (ambiguous) | 8 | 5 |

Desktop candidate failures: VERIFY BENEFITS 4.38:1 (need 4.5) fg[255, 255, 255] bg[29, 124, 203]; 23141 Moulton Pkwy Suite 2 4.38:1 (need 4.5) fg[255, 255, 255] bg[29, 124, 203]; 100 Percent In Network Pro 4.38:1 (need 4.5) fg[255, 255, 255] bg[29, 124, 203]; Check Benefits 4.38:1 (need 4.5) fg[255, 255, 255] bg[29, 124, 203]; DUAL DIAGNOSIS CARE 3.03:1 (need 4.5) fg[29, 124, 203] bg[255, 210, 56].
Mobile candidate failures: VERIFY BENEFITS 4.38:1 (need 4.5) fg[255, 255, 255] bg[29, 124, 203]; DUAL DIAGNOSIS CARE 3.03:1 (need 4.5) fg[29, 124, 203] bg[255, 210, 56]; Call Now 4.38:1 (need 4.5) fg[255, 255, 255] bg[29, 124, 203].

- **Yellow "DUAL DIAGNOSIS CARE" label:** computed color rgb(29,124,203) on opaque rgb(255,210,56), 14px, weight 700, opacity 1, no text-shadow. Normal-text threshold applies (below 18.66px bold), so 4.5:1 is required. An independent Python calculation gives **3.028:1**, matching the collector's 3.03. Rendered pixels are in `after-v1.2/evidence/dual-diagnosis-label.png`. Still a **candidate failure** until a human confirms the label is in scope and checks it by eye.
- **New candidate failures not seen at baseline** (sampling was 4 elements): white text on rgb(29,124,203) measures 4.38:1 against 4.5:1 for "VERIFY BENEFITS", the address bar, "100 Percent In Network Provider", "Check Benefits" and mobile "Call Now". These are candidate failures by computed values only, not verified by eye or against rendered pixels.
- Hero text over the photo is **Not Measured** (image background). No site-wide contrast verdict is made.
- Network: 146 third-party connections to 26 hosts, 0 blocked, proxy connects 150. The page is allowed to run its own third-party scripts; this is the residual risk in `README.md`.
- Two full runs gave identical detector results.
- Lab LCP/CLS: desktop 500ms / 0.001, mobile 292ms / 0 (single run, unthrottled). Field Core Web Vitals, INP, conversion: Not Measured.

## 5. Why agents 07, 09 and 24 stay in one PR

Each agent has independently testable acceptance criteria (detectors `D07-*`, `D09-*`, `D24-*` in `analyze.mjs`, 16 detectors, per-agent rubric cases, per-agent `agent-structure` tests, per-agent feedback record). They share one collector, one guard, one proxy and one rubric, so splitting would duplicate the security-sensitive code and its tests. Rollback restores all three exactly (section 6). If the reviewer wants a split, the shared tooling would go first in its own PR.

## 6. Rollback verification (exact pre-merge commit)

```
base (pre-merge) : d5ebcd80630539aff3ba3be7b933584c08497cf5
head (PR)        : 4aa42a50927586177ff80e1c55be19ba6cc09c14
PASS  PR touches only the pilot agents, AUDIT.md, tests, tooling, baselines, .gitignore
PASS  found exactly 21 non-pilot numbered agent files
PASS  all 21 non-pilot agent files are byte-identical (git blob ids)
PASS  all 21 non-pilot agents still declare Version 1.0 at head
PASS  base agents/07-apple-design.md is v1.0
PASS  head agents/07-apple-design.md is upgraded
PASS  base agents/09-conversion.md is v1.0
PASS  head agents/09-conversion.md is upgraded
PASS  base agents/24-seo-growth-engineering.md is v1.0
PASS  head agents/24-seo-growth-engineering.md is upgraded
PASS  git revert -m 1 of the merge restores the exact base tree (54d2d39)
PASS  manual rollback (restore files from base, git rm the new directories) matches base
PASS  collector writes only through safeWrite (no direct fs writes)
RESULT: 13 passed, 0 failed
```
Includes a mutation check run during development: a branch that also touched `05-schwartz.md` made the script report 3 failures, so the script detects drift in a non-pilot agent.

## 7. Security test inventory

| Control | Negative tests (all must fail closed) |
|---|---|
| URL | http, file, data, javascript, ftp, userinfo, port 8443, IPv4/IPv6/decimal literals, localhost, .local, .internal, off-allowlist host, suffix trick (`allowed.test.evil.test`, `evilallowed.test`), punycode lookalike, malformed URL |
| IP classes | 0/8, 10/8, 100.64/10, 127/8, 169.254/16 (metadata), 172.16/12, 192.168/16, 198.18/15, multicast, reserved, `::`, `::1`, fe80::/10, fc00::/7, ff00::/8, ::ffff:v4-mapped, NAT64, 6to4, Teredo, documentation range, unparseable (fail closed) |
| DNS | name resolving to private/loopback/metadata, mixed public+private answers, NXDOMAIN, empty answer, rebinding (second answer never used), numeric host spellings |
| Proxy | CONNECT to IP literals, localhost, metadata, ports 22/80/8443, garbage target, plain http, connection cap; live Chromium cannot reach a loopback server at `127.0.0.1` or `localhost` (hits = 0) |
| Redirects | real HTTPS 302 to the metadata IP blocked; 302 to a name resolving to 10.x blocked; 302 to another public host detected and fails the run; same-host redirect passes |
| Output | `..`, absolute path, empty, NUL, `.`, symlink out of root (and nothing written outside), non-empty existing directory, file where a directory is expected, planted symlink at a file name, bad run ids |

Total tests in the full suite: 282 passed, 0 failed (14 files). `tsc --noEmit` clean. Test counts per file are in `after-v1.2/vitest-full-suite.json`.

## 8. Known limitations (do not treat as fixed)

- Gold labels are unreviewed. Precision and recall are not a release gate.
- One site, one page, lab data, one day. No analytics, so no conversion or ranking claims.
- Browsing runs the target's own scripts and third-party calls (README residual risk). Run in a disposable environment.
- A redirect to another public site is detected after the connection, then the run is invalidated.
- Contrast: first viewport only; ambiguous cases are Not Measured by design. Candidate failures have not been visually confirmed.
- `D09-referral` only detects wording; whether crisis help is shown is deliberately not assessed. Referral owner is not named (open question for the human).
- Agent run time, token cost, human-rubric false positives and omissions remain Not Measured.
- The other 21 agents were verified unchanged by git blob id and version header; they were not run.

## 9. Reviewer checklist

- [ ] Reproduced section 2 commands on an independent machine; results match.
- [ ] Reviewed `guard.mjs`, `proxy.mjs`, `collect.mjs` for bypasses (esp. IPv6 forms, Unicode hostnames, numeric hosts, proxy request parsing, backpressure/timeouts).
- [ ] Confirmed `allowed-hosts.json` contains only hosts the owner approves.
- [ ] Confirmed the agent text changes do not widen scope or permissions.
- [ ] Reviewed `fixtures.mjs` truth labels and replaced or signed off `gold.json`.
- [ ] Verified at least the yellow-label and white-on-blue candidate failures by eye.
- [ ] Ran `verify-rollback.sh` and agree the revert is sufficient.
- [ ] Confirmed the 21 other agents are unchanged.

## 10. Sign-off (blank; to be completed by a named human, not by Claude)

| Role | Name | Decision (approve / changes required) | Date |
|---|---|---|---|
| Independent security reviewer | | | |
| Independent quality reviewer | | | |
| Gold-standard reviewer | | | |
| Adjudicator | | | |
| Human approver | | | |

## 11. Artifacts and hashes (SHA-256, first 16)

| File | Hash |
|---|---|
| `after-v1.2/evidence.json` | `280e57e8bfd965e2` |
| `after-v1.2/evidence-run2.json` | `bd2b3e79c2475916` |
| `after-v1.2/rubric/score.json` | `953520c739e003ea` |
| `after-v1.2/rollback-verification.txt` | `1e9b1184fc170995` |
| `after-v1.2/evidence/desktop-fold.png` | `7223b6e09816766d` |
| `after-v1.2/evidence/mobile-fold.png` | `c0be0daf2e2e65ee` |
| `after-v1.2/evidence/dual-diagnosis-label.png` | `b86592cf407d2375` |
| `rubric/gold.json` | `0f2e139aed01aba5` |
