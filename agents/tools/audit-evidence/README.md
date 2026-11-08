# audit-evidence: read-only evidence collector and scoring rubric

Used by agents 07, 09 and 24 (v1.2). It loads **one public page**, measures it, and writes JSON and screenshots. It never clicks, types, submits a form, or logs in.

```
node agents/tools/audit-evidence/collect.mjs <url> <outName> [runId]
node agents/tools/audit-evidence/rubric/evaluate.mjs <outName>      # fixtures only, no network
npx vitest run agents                                                # unit, security, rubric tests
```

## Security model

| Control | What it does | Where it is tested |
|---|---|---|
| Host allowlist | Only `https`, port 443, hosts (and subdomains) listed in `allowed-hosts.json`. No IP literals, no userinfo, no `localhost`/`.local`/`.internal`. Adding a host is a reviewed change to that file. | `guard.test.ts`, `cli.test.ts` |
| Filtering proxy | Chromium is forced through a local proxy (`proxy.mjs`), including loopback. The proxy accepts `CONNECT host:443` only, resolves DNS itself, refuses if **any** answer is private, loopback, link-local, metadata, CGNAT, multicast, reserved, or an IPv6 form embedding one, and connects to the address it vetted (a second, rebinding DNS answer is never used). Plain http through the proxy is refused. | `proxy.test.ts` (raw CONNECT and real Chromium against real local servers) |
| Redirect pivots | Server-issued redirects are not visible to browser request interception (tested: Playwright `route` never saw the hops), so redirects are handled at the connection layer: a redirect to an internal address is refused by the proxy; a redirect to another public site is detected after the fact by `navigationViolations` and fails the run (exit 3). | `proxy.test.ts` |
| Output confinement | Output goes under the artifacts root (`AUDIT_ARTIFACTS_ROOT`, default `agents/artifacts`, git-ignored). Names are relative, no `..`, no absolute paths, no symlinks anywhere in the path, the directory must be new and empty, files are created exclusively (`wx`), run ids are `[A-Za-z0-9._-]{1,64}`. | `guard.test.ts`, `cli.test.ts` |
| Third-party limits | Third-party hosts are allowed only as public https/443, capped at 400 connections, 300 concurrent, and listed in `evidence.json` (`network`). Service workers are blocked; QUIC is disabled; WebRTC non-proxied UDP is disabled. | `guard.test.ts`, `proxy.test.ts` |
| No self-modification | The collector cannot edit agent files, the allowlist, permissions or policy. Bounded retry (3 loads) is its only self-heal. | `agent-structure.test.ts` |

## Residual risk (not eliminated)

- **Browsing is not side-effect free.** Loading a page runs that site's scripts and makes requests to its analytics, chat and tag services. Those can log the visit and may trigger their own tracking. Mitigation is limitation and logging, not prevention.
- **Redirect to another public site** is detected after the connection was made. The page is fetched once before the run is invalidated.
- **Allowed hosts are trusted.** If an allowlisted host serves malicious content, the browser still renders it (headless, no profile, no credentials, but not a VM sandbox). Run in a disposable environment.
- **DNS answers for a first-party host can legitimately change.** The proxy vets each connection's address at connect time; it cannot know whether a public address is the "right" one.
- **Dedicated workers and WebSockets** go through the proxy as CONNECT, so the same rules apply, but their payloads are not inspected.
- **The proxy listens on loopback.** Other local processes can reach it during a run. Do not run on a shared multi-user machine.

## Measurement honesty

- Confidence is derived from evidence (`evidenceConfidence`): `Not Measured` if not measured, `low` if ambiguous, `medium` after one load, `high` only when two independent loads agree.
- Contrast samples every visible text-bearing element in the first viewport (cap 150) and reports coverage. Translucent background layers are composited. Image or gradient backgrounds, opacity, filters, blend modes, text-shadow, pseudo-element backgrounds and covered text are **Not Measured**. A failure is a **candidate failure**, not a site-wide verdict.
- A repeated JSON-LD `@type` is an observation. Schema validity is Not Measured.
- LCP and CLS are lab values: single run, unthrottled. Field Core Web Vitals, INP and any conversion outcome are Not Measured.

## Rubric

`rubric/gold.json` holds expected findings (positive, negative and Not Measured cases) built from constructed fixtures in `rubric/fixtures.mjs`. Labels come from the fixture HTML, not from agent output. `rubric/score.mjs` matches one-to-one and reports TP, FP, FN, TN, precision, recall, F1 with denominators, severity-weighted misses, duplicates, unsupported claims, false confidence and unlabelled flags. A missed critical case fails the hard gate. **The gold file is `candidate_unreviewed`: it is not a valid release gate until a named human reviewer signs off and a separate adjudicator resolves disputes.** Regenerate with `node rubric/build-gold.mjs`.

Perfect scores on these fixtures mean the detectors behave as their author intended on easy, constructed cases. They do not measure audit quality on real sites. Real-site cases written by a human are still needed.

## Rollback

`verify-rollback.sh <base-sha> <head-ref>` proves the revert path on temporary branches (see the UAT packet). The collector writes no state outside its output directory, so there is nothing else to undo.
