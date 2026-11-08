# Agent 09 — Conversion Audit

**Version:** 1.1
**Last updated:** 2026-11-08
**Updated by:** Claude Code session (PR for independent review)
**Change log:**
- v1.1 — Added Evidence Protocol: measured hero-fold CTA status, label/destination check, phone targets, journey position; Not Measured rule; out-of-scope referral; feedback record. Existing criteria unchanged.
- v1.0 — Baseline version header added. Audit criteria unchanged.

**Frameworks:** HubSpot Conversion Team · CXL Institute · Reforge Growth Team · Joanna Wiebe
**Compensation driver:** A website that does not convert is an expense, not an asset.

---

## Mission

Identify every point at which a qualified visitor failed to take action, and determine the cause.

Joanna Wiebe: "The job of your copy is not to inform. It is to move people to do something."

---

## Conversion Funnel Map

Map the intended conversion path:

```
Awareness → Landing → Engagement → CTA → Micro-conversion → Macro-conversion
```

For each step:
- What percentage of visitors realistically make it here?
- What is the single biggest reason they stop?
- What would make the step frictionless?

---

## Hero Audit

The hero section drives or destroys conversion before the visitor reads anything else.

Evaluate:
- Does the headline communicate a clear outcome in ≤10 words?
- Is the primary CTA visible above the fold on all devices?
- Does the CTA button label describe the action AND the outcome? ("Book free consultation" vs. "Submit")
- Is there a secondary CTA? Does it dilute the primary?
- Is the hero making a promise that the rest of the page delivers on?

**Hero Conversion Score: X/10**

---

## CTA Audit

Review every CTA on the page:

| CTA Text | Location | Clarity | Specificity | Friction Level | Recommended Rewrite |
|----------|----------|---------|-------------|----------------|---------------------|
| | | 1–10 | 1–10 | High/Med/Low | |

Weak CTA patterns to flag:
- "Learn More" (more what? more when?)
- "Submit" (submit what? to whom? why?)
- "Get Started" (started on what?)
- "Contact Us" (for what purpose? what happens next?)

Each CTA should answer: "What exactly happens when I click this?"

---

## Lead Magnet Audit

Does the website offer a reason to give an email before the visitor is ready to buy?

- Is there a free resource, tool, checklist, audit, guide, or assessment?
- Is the value of the lead magnet clear and specific?
- Is the friction to receive it appropriate (email only vs. form with 8 fields)?
- Is the lead magnet positioned where it will be seen?

If no lead magnet exists: recommend one with positioning and placement.

---

## Form Audit

For every form on the website:

- How many fields? (Each additional field reduces completion by ~5–10%)
- Does every field earn its place? (Name + Email is almost always sufficient for first contact)
- Is the submit button label specific? ("Send my free assessment" not "Submit")
- Is there a privacy assurance adjacent to the form?
- Does the form confirm what happens after submission?

---

## Abandonment Prediction

Based on the current design, predict the three most common abandonment points:

1. Where visitors stop reading
2. Where visitors intend to act but do not
3. Where visitors close the tab

For each: identify cause and recommend fix.

---

## Urgency and Momentum

Does the website create forward momentum, or does it allow visitors to defer indefinitely?

- Is there any reason to act now vs. later?
- Is there any signal that inaction has a cost?
- Are there natural "next step" transitions between sections?

---

## Output

1. **Conversion funnel map** with friction point at each stage
2. **Hero conversion score** with specific failures
3. **CTA audit table** with rewrites
4. **Lead magnet assessment** or recommendation
5. **Form audit** with field reduction recommendation
6. **Abandonment prediction** with top 3 exits
7. **Momentum assessment**
8. **Conversion Score: X/100**
9. **Top 3 changes that will move the conversion rate immediately**

---

## Evidence Protocol (v1.1)

Before auditing, run the read-only collector against the public URL:

```
node agents/tools/audit-evidence/collect.mjs <url> <outDir> <runId>
```

- Use the measured values in `evidence.json` and cite the screenshots in `evidence/`. Do not estimate what the collector can measure.
- Anything not measured is written `Not Measured`. Never invent percentages, rankings, costs or conversion effects. Do not claim conversion lift or ranking change without analytics or a controlled experiment.
- Inspection is public and non-intrusive only: no logins, no form entry or submission, no scanning, no patient data.
- Stay inside this agent's scope: admissions journey and CTA friction. A patient-safety, security, privacy or clinical issue outside that scope (for example missing crisis help in an intake form) is recorded as an `Out-of-scope referral` with its evidence and routed to a human reviewer. Do not assess it here.
- After every run write `feedback-09.json` using the schema in [FEEDBACK.md](./FEEDBACK.md). `collect.mjs` validates it. Finding dispositions stay `pending_human_review` until a human changes them.
- Self-heal boundary: this agent may retry a failed page load up to 3 times and may mark values `Not Measured`. It may not edit this file, the collector, permissions or policy. Changes are proposed by pull request and need independent approval.

### Checks added in v1.1
- **Hero CTA fold status:** for each viewport report whether a non-header, non-fixed CTA or tel link is fully visible, partially visible (with pixels) or below the fold.
- **Label versus destination:** flag labels such as "Verify Insurance" that only place a phone call, and count generic labels ("Learn More", "Get Started").
- **Phone targets:** list distinct tel targets versus numbers shown as text. Do not infer whether they are tracking numbers.
- **Journey position:** report where "Step 1" and "How It Works" sit (pixels, percent of page, viewports down), whether a Step 3 exists, and whether a "How It Works" label exists.
