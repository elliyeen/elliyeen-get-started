# Website tools: staging MVP (draft, unreviewed)

Four small tools under `/tools`, built to run **entirely in the visitor's browser**. They are not linked from the menu, not in the sitemap, and marked `noindex, nofollow`. Nothing here is deployed by this document; the site deploys to production on every push to `master`, and there is no staging environment (see Blockers).

## What was inspected first (read-only, 2026-11-08)
- Next.js static export (`output: 'export'`), hosted on Cloudflare Pages by `.github/workflows/deploy.yml` on push to `master`. No `functions/` directory, no server runtime, no form backend (the booking form submission is commented out).
- Design tokens in `app/globals.css`; existing `.btn`, `.skip-link` (defined, unused outside three pages) and type scale; Tailwind v4; `SiteNav` shared header.
- No analytics script in the repository. The privacy page says analytics and cookies are used: **Not Verified** whether analytics is injected at the edge.
- No authentication, no consent component.

## User stories
1. **AI Opportunity Assessment** (`/tools/ai-opportunity`). As an owner-operator, I answer eight plain questions about one repetitive task so I can tell whether a conversation is worthwhile, what to fix first and what to be careful about, without being told what I will save.
2. **Security Readiness Check** (`/tools/security-readiness`). As a small-organisation lead, I answer twelve yes/no/not-sure questions and one about health information so I get a short list of basics to look at first, clearly labelled as not an audit or certification.
3. **Automation Solution Explorer** (`/tools/automation-explorer`). As a prospective client, I pick the kind of work and tools so I can see illustrative patterns, where a person stays in charge, and the risks, without prices or promises.
4. **ROI Calculator** (`/tools/roi-calculator`). As a decision-maker, I enter my own numbers so I can see a cautious, a middle and a hopeful case, the assumptions, and which inputs matter most. Nothing is pre-filled; only the cautious case is described as the one to plan around.

## Design and data decisions
- **No data leaves the page.** No fetch, storage, cookies, analytics, scripts or beacons in any tool file (enforced by a source-scan test). The "Email Elliyeen" link carries no answers.
- **No server, no model.** Logic is deterministic arithmetic and rules in `lib/tools/`. Consequence: **no inference cost, no rate limits needed, no abuse surface.** If a server or model component is added later, rate limits, cost caps, abuse controls and a privacy review are required first.
- **Honest language.** No "guarantee", "risk-free", "will save", "HIPAA compliant" or "secure" claims (enforced by tests). Health information triggers a note that legal duties may apply and a qualified adviser decides.
- **Hidden until approved.** `robots: noindex,nofollow`, absent from `sitemap.ts` and `SiteNav` (enforced by tests).

## Accessibility and responsive checks that were run
- Semantic fieldset/legend radio groups, labelled inputs with described help text, error text tied to fields, one `role="alert"` summary (not one per field), result headings take focus, `aria-live` results, 44px targets, visible focus, a skip link to the tool content.
- Playwright (Chromium) at 390, 768 and 1440 px: 28 tests pass. Each page loads, is `noindex`, makes **zero third-party requests**, has no console errors and no horizontal scroll; ROI and Opportunity can be completed with the keyboard alone starting from the skip link; **no network request occurs while using the tools**.
- The audit collector's measurement code (contrast, overlays, headings, fonts) was run on the built pages at two widths: one `h1` per page, no floating overlays, 2 font families, contrast measured on 9 to 15 of 9 to 20 sampled elements with the rest Not Measured (unparsed or image backgrounds). The one failing element is the existing nav wordmark "ELLIYEEN" (rgb(216,122,36) on white, 3.12:1, 14px bold). It appears on every page of the site, is probably exempt as a logotype under WCAG 1.4.3, and was **not changed** here.
- **Not run:** a screen reader (VoiceOver, NVDA, JAWS), Safari or Firefox, real phones, a full automated WCAG audit tool (axe), print styles, high-contrast or forced-colours mode, or users.

## Tests
- `lib/tools/tools.test.ts` (33): ROI arithmetic and validation, opportunity scoring boundaries, security gap ordering, explorer filtering.
- `components/tools/tools.ui.test.tsx` (33): behaviour, focus, labels, keyboard, source-scan privacy policy, noindex, sitemap and nav exclusion, no promise language.
- `e2e/tools.spec.ts` (28 Playwright tests at three widths).
- `tsc --noEmit` clean.

## Limits
Questions and scoring thresholds are drafted by Claude Code and have **not been reviewed** by Elliyeen's owner, a security professional, a lawyer or a UX researcher. The thresholds (for example a fit score of 13 of 18 being "strong") are judgement calls, not validated. The security list is a short generic set, not a framework mapping. The explorer patterns are generic illustrations. The ROI contingency (+25% / -10% on run cost) is a stated assumption, not an industry figure. Nothing was tested with real visitors.

## Blockers before any deployment
1. **No staging path.** Merging to `master` deploys production. The owner must approve a preview or staging deployment (for example a separate Pages project or branch previews) before this is visible anywhere.
2. Owner review of copy, thresholds and disclaimers; a legal read of the health-information note.
3. Decision on analytics and consent, and a privacy-policy check against what is actually collected.
4. Decide whether to link the tools from the menu and include them in the sitemap (they are deliberately excluded now).

## Rollback
Revert the merge commit of this change. The tools are additive routes with no data and no dependencies on other pages; the only touched shared files are none (routes, components and libraries are new).
