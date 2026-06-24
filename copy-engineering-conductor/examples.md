# Examples

Two full evaluations showing the conductor in use.

---

## Example 1: Strong Attention, Broken Belief

### Input

```json
{
  "asset_type": "landing_page",
  "copy": "Your ads aren't broken. Your copy is.\n\nMost founders spend $10K/month on ads and wonder why they're not converting. The problem is never the audience. It's always the message.\n\nWe fix the message.\n\nBook a free 30-minute copy audit. No pitch. No obligation.\n\n[Book My Free Audit]",
  "target_audience": "B2B SaaS founders, 10–50 employees, currently running paid ads that are not converting.",
  "desired_behavior": "Click 'Book My Free Audit' and schedule the call.",
  "offer": "Free 30-minute copy audit. No pitch.",
  "stage_of_awareness": "solution_aware",
  "traffic_source": "Cold LinkedIn ad",
  "context": "Ad headline was: 'Your copy is why your ads don't convert.' Prospect clicked and landed here.",
  "constraints": ["Must keep free offer above the fold"]
}
```

### Conductor Report

---

# Copy Engineering Conductor Report

## Verdict

Neutral

## Score

52 / 100

## Primary Reason

The copy opens with a strong, pattern-interrupting reframe that works well for solution-aware founders who are already frustrated with ad performance. Attention and understanding are functional. But the claim — "we fix the message" — is made without any evidence, named client, result, or credential. A solution-aware prospect evaluating this offer has likely already tried agency help or DIY fixes. They are not going to book a call based on a confident assertion. The belief gap is fatal.

## Force Scores

| Force | Score | Reason |
|---|---:|---|
| Attention | 8/10 | Opening line creates immediate identification for frustrated SaaS founders running non-converting ads |
| Curiosity | 6/10 | "The problem is never the audience. It's always the message." creates mild curiosity about the mechanism |
| Understanding | 8/10 | Offer is crystal clear: free 30-minute audit, no pitch, no obligation |
| Desire | 6/10 | Names the pain correctly but doesn't paint what life looks like after conversion improves |
| Belief | 2/10 | "We fix the message" is an unsubstantiated assertion — no proof, no named results, no credential |
| Trust | 2/10 | No founder name, no company name, no credential, no social proof of any kind |
| Friction Reduction | 7/10 | "Free" and "no pitch, no obligation" reduce the cost of the action meaningfully |
| Action | 7/10 | CTA is clear, action-oriented, and sells the call rather than describing it |
| Loyalty | 1/10 | No signal of ongoing value; relationship disappears after the click |
| Advocacy | 2/10 | Reframe is memorable but copy as a whole is not shareable |

## Critical Bottleneck

Belief — the copy makes a bold claim about fixing the prospect's problem with zero evidence, which stops a skeptical, experienced founder from booking.

## Highest-Leverage Fix

The highest-leverage fix is to strengthen Belief by adding one specific, named result above the fold — a real outcome for a client type this prospect can identify with.

## Rewrite Direction

The next version must give the prospect one reason to believe before asking them to act. The offer and attention are working. What is missing is evidence that this specific source can deliver on the claim. One sentence — "We rewrote the homepage for [client type] and trial signups increased [X]% in [Y] days" — would do more behavioral work than any additional copy. The mechanism claim ("always the message") also needs support: why is it always the message? A single counterintuitive insight here would strengthen both Curiosity and Belief simultaneously.

## Risk Flags

- [RISK] "The problem is never the audience. It's always the message." — Absolute claim that is demonstrably false in some cases; prospect may have had a message problem and an audience problem simultaneously. Consider softening to "almost always" or adding qualifier.
- [RISK] "We fix the message." — No credential, name, or evidence attached. Claim is unsupported.

## Final Recommendation

Revise

Add one specific named result and one named credential before the CTA. The structure is working; the proof layer is missing.

---

---

## Example 2: Wrong Stage of Awareness

### Input

```json
{
  "asset_type": "email",
  "copy": "Subject: A new way to manage caregiver scheduling\n\nHi [Name],\n\nI wanted to reach out about CareSync, the scheduling platform built for home care agencies.\n\nCareSync helps you:\n- Reduce no-shows by 40%\n- Automate shift reminders\n- Track certifications in one place\n\nWe work with agencies across 12 states.\n\nWould you be open to a quick 15-minute call this week?\n\nBest,\nAlex",
  "target_audience": "Home care agency owners, 5–20 caregivers, currently using spreadsheets or manual phone calls for scheduling.",
  "desired_behavior": "Reply to the email and book a 15-minute call.",
  "offer": "15-minute product demo call.",
  "stage_of_awareness": "problem_aware",
  "traffic_source": "Cold outbound email",
  "context": "Prospect has never heard of CareSync. They are managing scheduling manually and experiencing pain but have not yet searched for a solution.",
  "constraints": []
}
```

### Conductor Report

---

# Copy Engineering Conductor Report

## Verdict

Moves away

## Score

34 / 100

## Primary Reason

This email is written for a product-aware prospect — someone who already knows scheduling software exists and is evaluating options. The target audience is problem-aware: they feel the pain of manual scheduling but have not begun actively looking for a solution. The email leads with the solution name and feature list before the prospect has been moved to believe a solution is worth pursuing. This is a fundamental stage mismatch. The copy talks past the prospect's current mental state, which produces skepticism rather than curiosity.

## Force Scores

| Force | Score | Reason |
|---|---:|---|
| Attention | 3/10 | Subject line "A new way to manage caregiver scheduling" is generic and signals a pitch immediately |
| Curiosity | 2/10 | Prospect does not yet want a new scheduling tool — they want relief from a specific pain |
| Understanding | 6/10 | Offer is clear: 15-minute call |
| Desire | 2/10 | Feature bullets do not connect to the emotional pain of managing 15 caregivers by phone every Sunday night |
| Belief | 4/10 | "12 states" provides mild scale signal but is not relevant to the prospect's specific situation |
| Trust | 3/10 | "Alex" with no last name, no company context, cold email from unknown sender |
| Friction Reduction | 5/10 | 15 minutes is low commitment but the prospect hasn't been given a reason to give even 15 minutes |
| Action | 4/10 | CTA is clear but not compelling — "Would you be open to" is weak framing |
| Loyalty | 1/10 | No signal of ongoing value |
| Advocacy | 1/10 | Nothing shareable or remarkable |

## Critical Bottleneck

Desire — the copy has not moved the prospect from problem-aware to solution-aware before asking them to evaluate a specific product, so no amount of feature clarity or trust-building can create action.

## Highest-Leverage Fix

The highest-leverage fix is to strengthen Desire by opening with the specific pain of manual scheduling before mentioning CareSync or any feature.

## Rewrite Direction

The next version must first acknowledge the problem in language the owner recognizes — the specific friction of managing caregiver schedules by phone or spreadsheet — and create desire for a better state before introducing any product name or feature. A subject line like "The Sunday night problem" and an opening that names the experience ("It's 9pm Sunday and three caregivers haven't confirmed tomorrow's shifts") will move this prospect from problem-aware to solution-curious. Only after that transition should the product be introduced.

## Risk Flags

- [RISK] "Reduce no-shows by 40%" — specific statistical claim with no source or context; remove or verify before use.
- [RISK] "We work with agencies across 12 states" — vague scale claim; consider naming specific agency types or outcomes instead.

## Final Recommendation

Rebuild

The stage mismatch is structural — fixing the subject line or CTA will not resolve the fundamental problem of leading with the solution before the prospect wants one.
