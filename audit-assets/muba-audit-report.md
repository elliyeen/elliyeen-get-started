# Elliyeen Website Audit
## Miss Universe Bahamas — mubahamas.com

**Client:** Miss Universe Bahamas Organization
**URL:** https://www.mubahamas.com/
**Industry:** National pageant / youth empowerment program
**Primary conversion goal:** Increase applicants and sign-ups
**Audit date:** July 1, 2026
**Viewports tested:** 1440px (desktop), 390px (mobile)
**Auditor:** Elliyeen

---

## Executive Summary

Miss Universe Bahamas has a visually impressive single-page site — clean typography, a confident hero section, and a seven-step application form backed by a live Supabase database. The front-end design is doing real work. A first-time visitor on desktop gets a strong first impression.

But four layers underneath the design, there are critical failures that are silently costing applicants every day:

**No data is being collected from anyone who isn't filling out the full application form.** The email subscription button looks like it works — it plays a success animation — but sends nothing to any server. The contact form does the same. There is no analytics tracking. Every social media link on the site goes to a dead `#` URL. And when someone shares the site link anywhere — Instagram bio, WhatsApp, Facebook — the preview is blank because no Open Graph tags exist.

In practical terms: the site looks polished and converts zero auxiliary interest into a database. The only thing working is the 7-step application form (which connects to Supabase), but even that has a JavaScript bug that breaks the visible progress indicator for every applicant.

The fixes are not structural. Most are one-line or one-hour changes. The one that matters most — wiring the email capture and contact form to real endpoints — is an afternoon of work.

---

## Scorecard

| Lane | Grade | Summary |
|---|---|---|
| **Design** | B+ | Strong aesthetic and visual hierarchy. One copy-as-instruction smell. |
| **UX / UI** | C | Solid structure, broken progress indicator, zoom locked on mobile, fake forms. |
| **Copy** | B | Smart conversion copy in the CTA. Hero headline doesn't orient a cold visitor. |
| **Conversion / Shareability** | D | All email capture is fake. All social links dead. No OG tags. No analytics. |

---

## Screenshots

All screenshots referenced below were captured on July 1, 2026.

| File | Description |
|---|---|
| `homepage-1440-hero.png` | Desktop hero, above fold |
| `homepage-1440-pillars.png` | Desktop "What We Stand For" section |
| `homepage-1440-gallery.png` | Desktop contestant gallery |
| `homepage-1440-footer.png` | Desktop footer with contact and subscribe |
| `homepage-1440-full.png` | Full desktop page |
| `homepage-390-fold.png` | Mobile hero, above fold |
| `homepage-390-full.png` | Full mobile page |
| `apply-step1-390.png` | Application HUD — Eligibility step (mobile) |
| `apply-step2-390.png` | Application HUD — How to Apply step (mobile) |
| `apply-step3-bug.png` | Application HUD — Personal Info step showing header stuck on "Step 1" |
| `privacy-390.png` | Privacy Policy page |

---

## Section 1 — Design

### What's Working

The visual identity is strong. The gold-and-navy palette reads as prestigious without being stiff. Cormorant Garamond for display headings and Montserrat for body text is a good pairing — editorial warmth with clean readability. The hero section (ref: `homepage-1440-hero.png`) does what a hero should: it stops a person scrolling.

The contestant gallery (ref: `homepage-1440-gallery.png`) presents 9 portrait cards cleanly. The culture section's 4-card grid is visually consistent.

The stat strip — **10 Week Program · 700+ Alumni · 30+ Islands** — is a good decision. Specificity carries weight. These numbers appear both in the hero and in the About section, which reinforces them.

### Issues

**[Judgment call, not a standard violation]** The hero headline — *"Beautifully Confident."* — is evocative but uninformative to a cold visitor. Someone arriving from a social share or search with no context doesn't know if they've landed on a beauty brand, a wellness app, or a national pageant organization. The small sub-label above the logo — "Official National Pageant · The Bahamas · 2026" — carries this weight, but it's 10px rendered text sitting above a logo. It does not reliably orient a first-time visitor before they form an impression.

This is a judgment call: ambiguous hero copy is sometimes a deliberate creative choice that works when the audience already has context (e.g., people arriving from Instagram who already know the brand). It becomes a liability when the primary acquisition strategy is referral links, social shares, or search — where context doesn't travel with the click.

**[Standard violation — interaction design]** The "What We Stand For" pillar section (ref: `homepage-1440-pillars.png`) includes a paragraph that reads: *"Hover to reveal · Click to expand."* This is instruction-as-design. When users need to be told how to interact with an element, the interaction affordance has failed — Nielsen heuristic #6 (Recognition over Recall) and #4 (Consistency with conventions). The copy label is a symptom, not the problem. The problem is the cards don't signal their own interactivity through visual cues — no border highlight, no cursor change hint, no partial-reveal teaser.

Additionally, "Hover to reveal" is a desktop-only affordance. Touch devices have no hover state. On mobile, a user who reads this instruction has no way to hover. (The "Click to expand" fallback does exist on touch, but the instruction presents hover as the primary action.)

---

## Section 2 — UX / UI

### What's Working

The 7-step application HUD is architecturally sound. It uses a full-screen overlay with left-side step navigation, a scrollable right content panel, and clear Back / Continue controls. Field validation highlights required fields in red. Required document uploads are gated at step 6. The form data connects to a real Supabase backend on submission.

The mobile navigation collapses correctly. The "Apply Now" button is persistent in the nav bar across all scroll positions.

### Issues

**[Bug — measurable]** The application HUD progress header is broken on every step past step 1.

*Evidence:* `apply-step3-bug.png` — the header reads "STEP 1 OF 7 — ELIGIBILITY" while the footer nav correctly reads "Step 3 of 7."

*Root cause:* In the page's JavaScript (line ~1405), two lines of code that should be inside the `hudGo(n)` function were placed at the top level of the script block:

```js
// TOP LEVEL — BROKEN. `n` is undefined here.
if(fill) fill.style.width=`${Math.round((n/TOTAL)*100)}%`;
if(label) label.innerHTML=`Step ${n} of ${TOTAL} — <span>${stepNames[n-1]}</span>`;
```

These lines reference `n`, which only exists as a parameter inside `hudGo(n, reset)`. At the top level, `n` is undefined, throwing `ReferenceError: n is not defined` (confirmed in browser console). The browser console logs 1 error on every page load. The two elements that display the step label in the header (`hcp-fill` and `hcp-label`) are never updated by the `hudGo` calls — only the footer counter (`hud-ind`) updates correctly.

*Fix:* Move both lines inside the `hudGo(n)` function body, after `hudStep = n` is set.

**[Bug — UX friction]** The 7-step form includes step 2 ("How to Apply") as a pure informational screen with no form fields. It's a numbered step in the progress bar but asks the user to do nothing. This makes the form feel longer than it is and the "7 steps" count feel inflated. An applicant reads "Step 2 of 7" and thinks they're a third of the way through — but they haven't entered a single character. Consider combining "How to Apply" with the Eligibility screen (step 1), or displaying this information as a pre-HUD explainer rather than a step inside the form.

**[Accessibility violation — WCAG 1.4.4 Resize Text, Level AA]** The viewport meta tag reads:

```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
```

`maximum-scale=1.0` disables user-initiated zoom on mobile browsers. This is a WCAG 1.4.4 violation (Resize Text, AA), which requires text to be resizable up to 200% without loss of content or functionality. It also violates WCAG 1.4.10 (Reflow). Remove `maximum-scale=1.0` entirely. No legitimate mobile layout reason requires locking zoom.

**[UX friction]** Form validation highlights invalid fields with a red border but does not scroll to the first invalid field. On mobile at 390px, required fields that aren't visible in the current scroll position will appear to do nothing when the user taps "Continue." The error is invisible until the user scrolls up to find it. Add `firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' })` after the validation loop.

---

## Section 3 — Copy

### What's Working

**"✨ Apply Now — It's Free"** is smart. Appending "It's Free" directly to the CTA removes a common hesitation point before it can form. The emoji is a mild risk (it reads casual), but within the brand voice it works.

The "Competition Timeline" section does good work — it shows the complete journey (Applications → Interviews → Training → Finals → Miss Universe) with specific dates. This builds credibility and tells an applicant exactly what they're committing to.

The four pillar names — Personal Development, Professional Development, Community Engagement, Global Representation — are specific and meaningful. They tell a prospective applicant what the 10 weeks actually delivers.

### Issues

**[Judgment call]** The hero headline *"Beautifully Confident."* is the primary impression-forming copy on the site. It's brand-right and evocative. But it orients an existing fan, not a prospective applicant who has never heard of MUB. The person most likely to become an applicant is a young Bahamian woman who finds this site through a social share or a friend's recommendation. She arrives at the page not knowing what she's looking at. The first copy she reads should answer "Is this for me?" before it says anything else.

This isn't a call to replace the headline — it's a call to make the sub-label more readable. The "Official National Pageant · The Bahamas · 2026" label above the logo is the right information but is rendered too small and in a style that reads as a metadata tag rather than an invitation.

**[Factual concern]** The footer lists a phone number: `+1 (242) 123-4567`. This is a sequential placeholder number (1, 2, 3, 4, 5, 6, 7). It is not a real working number. If a family member, journalist, or recruiter tries to call this number, it either fails or reaches an unaffiliated party. This damages credibility in exact proportion to how professional the rest of the site looks.

**[Judgment call]** The phrase "More Than a Pageant. A Platform." is a common positioning claim in the pageant industry. It communicates the intent clearly, but it doesn't distinguish MUB specifically. The specifics elsewhere on the page (Business Symposium, caregiver mentorship, 15+ years, 700+ alumni) do distinguish MUB — the headline could lean into one of those.

---

## Section 4 — Conversion / Shareability

This section contains the most significant findings in the audit. The design lane is a B+. The conversion lane is a D. These two grades describe a site that looks like it's converting and isn't.

### Finding 1 — Email Subscribe Does Not Work (Critical)

The footer contains an email subscription field with a "Subscribe" button. When a user enters an email and clicks Subscribe, the following JavaScript runs:

```js
function handleSub(btn){
  const inp = document.getElementById('sub-in');
  if(!inp.value || !inp.value.includes('@')){ ... return }
  btn.textContent = '✓';
  inp.value = '';
  document.getElementById('sub-msg').style.display = 'block';
  setTimeout(() => { btn.textContent = 'Subscribe'; ... }, 4000);
}
```

This function validates the format of the email, then clears the field and shows a success confirmation. **It does not send the email address anywhere.** No network request is made. No third-party integration exists. No server-side handler receives the submission. The "✓" confirmation is purely cosmetic.

Every person who has entered their email on this site and seen a success confirmation has not been added to any list.

*Evidence:* Network request log shows zero outbound requests when Subscribe is clicked. `hasFormspree: false`, `hasNetlifyForms: false`. `handleSub` source code confirmed above.

*Fix:* Wire the email field to any real list provider — Mailchimp (free tier), ConvertKit, or a Supabase `subscribers` table with a confirmation email via the existing Edge Function infrastructure. This is a one-afternoon change.

### Finding 2 — Contact Form Does Not Work (Critical)

The footer's "Contact Our Team" button opens a contact form. On submission, this fires:

```js
function handleContact(btn){
  const o = btn.textContent;
  btn.textContent = 'Sending...';
  btn.style.opacity = '.7';
  setTimeout(() => {
    btn.textContent = '✓ Message Sent';
    btn.style.background = 'var(--teal)';
    ...
  }, 1000);
}
```

A 1-second setTimeout changes the button to "✓ Message Sent." **No message is sent.** No network request. No email delivery. No Supabase insert. A sponsor, journalist, parent, or island coordinator who submits a contact request receives a confirmation — and their message disappears.

*Fix:* Route to Formspree (free tier, 50 submissions/month), a Supabase Edge Function, or a mailto handler. The existing Supabase infrastructure can handle this.

### Finding 3 — All Social Media Links Are Dead (High)

The footer contains links labeled IG, FB, TK, YT — Instagram, Facebook, TikTok, YouTube. All four link to `"#"` (the current page anchor). Clicking any of them does nothing.

```html
<link "IG" href="#" />
<link "FB" href="#" />
<link "TK" href="#" />
<link "YT" href="#" />
```

For a pageant organization — a category where social media is the primary recruitment channel — dead social links are a direct loss of applicant traffic. A prospective applicant who wants to see previous contestants, highlights, or the current season's content has no path from the website to find it.

*Fix:* Replace `"#"` with the actual profile URLs. If a channel doesn't exist yet, remove the icon rather than linking to a dead end.

### Finding 4 — No Open Graph or Social Sharing Meta Tags (High)

When anyone shares the URL `https://www.mubahamas.com/` — in an Instagram bio link, a Facebook post, a WhatsApp message, or an email — the preview that appears is blank. No image. No title. No description.

The page's `<head>` contains only one meta tag:
```html
<meta name="viewport" content="width=device-width,initial-scale=1.0,maximum-scale=1.0">
```

Missing entirely:
- `og:title`
- `og:description`
- `og:image`
- `og:type`
- `og:url`
- `twitter:card`
- `twitter:title`
- `twitter:image`
- `<meta name="description">`
- `<link rel="canonical">`

For a pageant that recruits primarily through social media, a blank link preview is a conversion killer. The person who posts "check out this pageant!" gets a plain URL with no image. Clicks drop significantly compared to a rich preview.

*Fix:* Add 8 lines to the `<head>`. Suggested values:
```html
<meta name="description" content="Miss Universe Bahamas — a ten-week empowerment program for Bahamian women. Apply free for the 2026 season.">
<meta property="og:type" content="website">
<meta property="og:url" content="https://www.mubahamas.com/">
<meta property="og:title" content="Miss Universe Bahamas 2026 — Apply Now">
<meta property="og:description" content="A ten-week empowerment program. 700+ alumni. 30+ islands. Applications open now.">
<meta property="og:image" content="[URL to hero image or contestant photo at 1200×630]">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:image" content="[same image URL]">
```

### Finding 5 — No Analytics of Any Kind (High)

The site has no Google Analytics, no Facebook Pixel, no Mixpanel, no Plausible, no Fathom, and no custom tracking. There is zero visibility into:

- How many people visit the site
- Where they come from (Instagram, search, referral, direct)
- How far they scroll
- How many open the application HUD
- Which step of the 7-step form they abandon
- How many complete and submit an application

This means decisions about which social post to run more, which island to target, and whether the application form is losing people on step 3 vs. step 6 are all being made blind.

*Fix:* Add Google Analytics 4 (free). Add a Facebook Pixel if any Meta advertising exists or is planned. Add custom `dataLayer.push` events on: HUD open, each step advance, form submit success.

### Finding 6 — No Structured Data

The `<head>` contains no `<script type="application/ld+json">` blocks. A pageant event is a natural candidate for `Schema.org/Event` and `Schema.org/Organization` markup, which improves how Google displays the site in search results (rich snippets, event cards, knowledge panel eligibility).

This is a lower-priority fix than 1–5 but costs 20 lines of JSON.

---

## 5 Critical Issues Ranked by Conversion Impact

| Rank | Issue | Impact | Evidence |
|---|---|---|---|
| 1 | Email subscribe is fake | Every interested visitor who doesn't apply is permanently lost | `handleSub` source; zero network requests |
| 2 | Contact form is fake | Business inquiries, sponsorship, press, parent questions — all silently dropped | `handleContact` source |
| 3 | No Open Graph tags | Every social share shows blank preview — kills referral click rate | `<head>` meta audit |
| 4 | All social links dead | No path from site to social content; destroys credibility | Link href audit |
| 5 | No analytics | Cannot measure, cannot improve, cannot attribute applications to any source | JS audit |

---

## Prioritized Action Plan

### Quick Wins — hours each, no design changes required

**1. Fix the JS progress bar bug**
*Effort: Quick win*
Move two lines out of the top-level script scope and into the `hudGo(n)` function body. Specifically, the lines at ~line 1405:
```js
if(fill) fill.style.width=`${Math.round((n/TOTAL)*100)}%`;
if(label) label.innerHTML=`Step ${n} of ${TOTAL} — <span>${stepNames[n-1]}</span>`;
```
These belong after `hudStep = n` inside `hudGo`. This fixes the "STEP 1 OF 7" header that stays frozen regardless of which step the user is on.

**2. Add Open Graph and Twitter Card meta tags**
*Effort: Quick win*
8 lines in `<head>`. Needs a 1200×630px image asset (the hero photo works; export at that ratio).

**3. Add Google Analytics 4**
*Effort: Quick win*
One script tag in `<head>`. Add conversion events on HUD open and form submit.

**4. Fix social media links**
*Effort: Quick win*
Replace 4 `href="#"` values with real profile URLs. Remove any icon where the profile doesn't exist.

**5. Fix the placeholder phone number**
*Effort: Quick win*
Replace `+1 (242) 123-4567` with a real contact number or remove it and leave email only.

**6. Remove `maximum-scale=1.0` from viewport meta**
*Effort: Quick win*
One attribute deletion. Fixes WCAG 1.4.4 violation and enables zoom for users who need it.

**7. Add meta description and canonical tag**
*Effort: Quick win*
Two lines in `<head>`. Immediately improves SEO snippet in Google.

---

### Medium — afternoon to a day each

**8. Wire the email subscribe to a real list**
*Effort: Medium*
Recommended: Mailchimp embedded form or ConvertKit API call replacing `handleSub`. Alternatively, a Supabase `subscribers` table insert using the existing `SUPABASE_URL`/`SUPABASE_KEY` already in the page — the infrastructure is there.

**9. Wire the contact form to a real endpoint**
*Effort: Medium*
Recommended: Formspree (drop-in, free tier) or a Supabase Edge Function. Replace `handleContact`'s setTimeout with a real `fetch` POST.

**10. Fix form validation scroll-to-error**
*Effort: Medium*
After the validation loop in `validateStep`, add:
```js
if (firstInvalid) firstInvalid.scrollIntoView({ behavior: 'smooth', block: 'center' });
```
Critical on mobile where invalid fields may be off-screen.

---

### Structural — multi-day, involves copy and design decisions

**11. Consolidate 7-step form to 5 meaningful steps**
*Effort: Structural*
Step 2 ("How to Apply") is informational with no inputs. Move this content to a pre-HUD overlay shown before the form opens, or merge it into step 1 as a sidebar. Result: the form says "5 of 5" and feels proportional to the effort it requires.

**12. Make the hero sub-label more readable**
*Effort: Structural*
"Official National Pageant · The Bahamas · 2026" is correct content in the wrong size and weight. This needs to read as an orienting statement for a first-time visitor, not a metadata tag. Design decision, not just a copy change.

**13. Replace hover-instruction text with visual affordance**
*Effort: Structural*
The "Hover to reveal · Click to expand" paragraph is a symptom. The fix is visual: add a bottom border reveal, a ›› icon, or a partial-text preview on the pillar cards that communicates interactivity without words.

**14. Add structured data**
*Effort: Structural*
`Schema.org/Event` for the 2026 pageant dates, `Schema.org/Organization` for MUB. 30–50 lines of JSON-LD.

---

## Appendix: Raw Technical Notes

**Performance (measured from Playwright, cached resources):**
- First Contentful Paint: 212ms
- DOM Content Loaded: 93ms
- Load Complete: 138ms
- Page weight: 767KB encoded / 1,184KB decoded
- External resources: 1 stylesheet (Google Fonts), 1 hero image (Unsplash CDN), 2 font files, 1 logo PNG
- *Note: these are Playwright-measured times with warm cache. Real-world FCP will be higher, especially on mobile on Caribbean LTE. Not alarming, but worth a Lighthouse run from a cold cache.*

**JavaScript errors on load:**
- `ReferenceError: n is not defined` at line 1405:42 — confirmed, described in UX section

**Meta audit:**
- `<meta name="viewport">`: present (contains accessibility violation)
- `<meta name="description">`: missing
- `og:*`: all missing
- `twitter:card`: missing
- `<link rel="canonical">`: missing
- `<script type="application/ld+json">`: none found

**Link audit:**
- Internal anchor links: all resolve correctly
- `privacy.html`: resolves (200) — `privacy-390.png`
- `terms.html`: resolves (200)
- Social links (IG, FB, TK, YT): all `href="#"` — dead
- Inline "Apply Now" nav link: `href="#"` — dead (triggers `onclick="openHUD()"` correctly via JS, but the href itself is a dead anchor)

**Form audit:**
- Application HUD: 7 steps, Supabase backend configured, `async function hudSubmit` correct
- Email subscribe (`handleSub`): no network requests, cosmetic only
- Contact form (`handleContact`): no network requests, cosmetic only
- `<form>` elements on page: 0 (all interaction is JavaScript-driven, no native form elements)

**Accessibility:**
- `maximum-scale=1.0`: WCAG 1.4.4 violation (zoom disabled)
- 1 image with empty `alt=""` detected
- No ARIA roles on custom interactive elements (pillar cards, contestant carousel)
- Keyboard tab order through HUD: not tested — recommend separate accessibility audit

**Image licensing note:**
- Hero background image URL pattern: `photo-1548574505-5e239809ee19` is a Unsplash photo. Unsplash free license permits commercial use. No action required unless the site moves to a paid/sponsored model requiring explicit licensing documentation.

---

*This report reflects the state of https://www.mubahamas.com/ as captured on July 1, 2026. Live site content may have changed after this date.*
*Produced by Elliyeen.*
