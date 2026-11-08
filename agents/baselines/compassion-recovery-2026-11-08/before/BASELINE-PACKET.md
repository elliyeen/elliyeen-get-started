# Baseline packet: agents 07, 09, 24 vs compassionrecoverycenters.com

Status: BASELINE ONLY. No agent was modified. Pending human review of the rubric and findings.
Run date: 2026-11-08 (UTC). Repo baseline: elliyeen-get-started master d5ebcd80630539aff3ba3be7b933584c08497cf5 (PR #9 merged; not redone).
Agent file SHA-256: 07 4a417b1af9b4..., 09 e8b3b29adb78..., 24 e6a4245f5df5... (all v1.0 headers).
Executor: Claude Sonnet 5.5 (claude-sonnet-5-5), single Claude Code session. Agent definitions applied as written; the agent files declare no tools or permissions (Not Verified).
Tools actually used: local Playwright chromium (read-only page loads, no clicks, no form input, no login), curl for robots.txt, sitemaps and the reference report, Chrome page-text read. robots.txt allows the pages read.
Environments: desktop 1440x900, mobile 390x844 (isMobile). Single-page scope: homepage plus sitemap index. Not tested: other pages, assessment form, analytics.

## Evidence index
E1 home-desktop-fold.png | E2 home-desktop-step1.png | E3 home-mobile-fold.png | E4 home-mobile-step1.png | E5 homepage-evidence.json (run 1) and run2/homepage-evidence.json | E6 homepage-evidence-2.json | E7 sitemaps.txt | E8 home-text-desktop.txt | E9 home-desktop-hero-ctas.png | Ref reference.txt (unverified Elliyeen preliminary review)

## Required test: Step 1 and How It Works (homepage)
| Viewport | STEP 1 top | Page height | Position | Viewports down | STEP 2 | STEP 3 | "How It Works" text |
|---|---|---|---|---|---|---|---|
| Desktop 1440x900 | y=9657 | 14611 | 66% | 10.7 | y=10008 | none | 0 matches |
| Mobile 390x844 | y=17255 | 26262 | 66% | 20.4 | y=17729 | none | 0 matches |
Observed order before Step 1: insurance, in-person/virtual, reviews, conditions, levels of care, stats, holistic therapies, about, team, location, service-area chips (E2, E8). Only two steps exist and both link "Learn More". Visual observation only. No claim about conversion effect.

## Agent 07 Apple Design: findings
| ID | Finding | Severity | Confidence | Evidence |
|---|---|---|---|---|
| 07-1 | 3 first-party typefaces (Figtree, Poppins, Inter) plus a review-widget font; benchmark is 1-2 | Medium | High (computed styles) | E5 |
| 07-2 | 16 (desktop) / 17 (mobile) distinct font sizes on visible text vs 4-level benchmark | Low | Medium (counts rounding variants) | E5 |
| 07-3 | 3 floating overlays in the first viewport (accessibility button, VERIFY BENEFITS tab, chat bubble) on desktop and mobile | Medium | High | E1, E3 |
| 07-4 | Mobile: accessibility button covers the start of the "Flexible Scheduling" line | Medium | High | E3 |
| 07-5 | Desktop hero: 8-line white paragraph over photo overlay competes with the headline; text contrast not measured | Medium | Low (visual, unmeasured contrast) | E1 |
| 07-6 | 8-9 distinct text colors; essential vs noise not classified | Low | Medium | E5 |
Not measured: contrast ratios, section padding (extractor returned unreliable values), image quality, animation behavior.
Agent-judgment scores (not measured data): Design Score 64/100.

## Agent 09 Conversion: findings
| ID | Finding | Severity | Confidence | Evidence |
|---|---|---|---|---|
| 09-1 | Desktop: no hero button in the first 900px; the only call-to-action elements are the nav phone and the side VERIFY BENEFITS tab. Hero phone link sits at y=920, 20px below the fold | High | High (measured) | E1, E6, E9 |
| 09-2 | Mobile: "Call Now" top at y=817 (27px visible in 844px), "Verify Insurance" at y=896 (below fold). Both use tel:(877) 375-4344, so "Verify Insurance" places a call rather than starting verification | High | High | E3, E6 |
| 09-3 | 4 distinct tel targets (+1 949 649-4314, (877) 375-4344, (949) 849-4362, (877) 414-3007) and 2 different visible numbers. May be tracking numbers; intent Not Verified | High | High on presence, Low on intent | E5, E8 |
| 09-4 | Step 1 / How It Works: located 66% down the page, no "How It Works" label, no Step 3, both steps use generic "Learn More" | High | High | E2, E4, E5 |
| 09-5 | 10 "Learn More" and 2 "Get Started" links with no outcome in the label | Medium | High | E5 |
| 09-6 | Insurance promises conflict: "100% In Network Provider", "Most clients pay $0 out of pocket", "others might require some out-of-pocket fee" | Medium | High | E1, E8 |
| 09-7 | Homepage lead form has 2 fields (not submitted); free assessment entry sits at y=9104 | Low | Medium | E6 |
Not measured: assessment form length (Ref F2 reports 23 steps), call-center hours, analytics, abandonment (no data). No conversion-lift claims.
Agent-judgment score (not measured data): Conversion Score 55/100.

## Agent 24 SEO Growth Engineering: findings
| ID | Finding | Severity | Confidence | Evidence |
|---|---|---|---|---|
| 24-1 | Present: title (65 chars), meta description (127), self canonical, index + max-snippet robots, OG image, twitter card, lang en-US, 1 H1 | Info | High | E5 |
| 24-2 | 4 JSON-LD blocks: WebSite appears 3 times, MedicalClinic twice; overlapping entity declarations | Medium | High on observation | E5 |
| 24-3 | Inconsistent service-page URL patterns: /depression-treatment/, /mental-health/bipolar-disorder-treatment/, /mental-health/ptsd/ | Medium | High | E6 |
| 24-4 | Local entity mismatch: Laguna Hills address vs "Laguna Beach, San Bernardino" text; "Open 24 Hours"; 2 phone numbers | High | High | E8 |
| 24-5 | Sitemaps: pages 197, posts 257, blog 599, category 14, local 1 (1,068 URLs); 856 blog/post URLs vs 197 pages | Low | High on counts | E7 |
| 24-6 | 130 images, 0 missing alt attributes, 26 empty alt (decorative vs informative not classified) | Low | Medium | E5 |
| 24-7 | Duplicate with 09-3 and 09-4/07: phone and NAP issue counted in two agents | Duplicate | n/a | n/a |
Not measured: Core Web Vitals (LCP, CLS, INP), internal link graph, keyword rankings, crawl of the other ~1,060 URLs, hidden-link check. The "implementation-ready spec" output of agent 24 was not exercised in this baseline.
Self-caught error: an H2 with empty innerText was first flagged as an empty heading. Its HTML contains text ("Virtually helping you recover..."), so it was removed as a false positive.

## Per-agent baseline metrics
| Metric | 07 | 09 | 24 |
|---|---|---|---|
| Evidence-backed findings | 6 | 7 | 6 (+1 duplicate) |
| Execution time (agent alone) | Not measured | Not measured | Not measured |
| Token / API cost | Not measured | Not measured | Not measured |
| Shared evidence collection | run 1 18.5s, run 2 16.3s wall clock (both viewports) | same | same |
| Page load (lab, no throttling) | desktop 1.65s / 1.42s, mobile 1.09s / 0.99s | same | same |
| Reproducibility | 15 of 15 deterministic fields identical across 2 runs, both viewports (evidence layer only) | same | same |
| False positives | Not measured (needs human rubric); 1 self-caught (24) | Not measured | Not measured |
| Omissions vs human rubric | Not measured (no human-reviewed rubric exists yet) | same | same |
| Output completeness vs agent's Output list | 07: partial (typography, color, scorecard partial; no white space or contrast numbers) | 09: partial (no funnel percentages, no form audit beyond field count) | 24: partial (no spec artifacts, no CWV) |

## Comparison with preliminary Elliyeen review (unverified reference, not ground truth)
Independently corroborated by this baseline: F8 insurance promises disagree (09-6), F10 places do not match (24-4), partial F9 (09-2/09-3 confirm the tel targets; the 9-to-5 line hours were not checked).
Reference findings outside what these three agents measured: F1 crisis help in assessment, F2 23-step form, F3 hidden blog links, F4 mailbox pages, F5 email records, F6 tracking tools, F7 plugins, F11 proof, F12 broken links, F13-F16. These are omissions only if the human rubric puts them in scope for 07, 09 or 24. F1 is patient-safety critical and sits outside all three agent definitions.

## Candidate upgrade list (not applied)
- 09: add a hero-fold CTA check with measured pixel positions per viewport, a CTA destination/label match check, and a numbered journey check for admissions steps.
- 07: add measured contrast and floating-overlay checks; require section padding extraction that is validated.
- 24: add a JSON-LD duplicate check, an NAP consistency check across pages, URL-pattern consistency, and CWV capture.
- All three: emit a FEEDBACK.md record per run; mark every unmeasured value Not Measured; keep scope boundaries so patient-safety items route to a security/clinical reviewer.

## Gates still required
Human-reviewed rubric, independent security and quality review, human approval. No merge or deploy by the agent.
