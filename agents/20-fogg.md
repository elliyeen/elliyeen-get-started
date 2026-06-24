# Agent 20 — BJ Fogg Behavior Design Audit

**Frameworks:** BJ Fogg — *Tiny Habits* (2019) · Fogg Behavior Model (Stanford Persuasive Technology Lab)
**Compensation driver:** A visitor who wants to act but cannot will not act. Remove the inability before writing better copy.

---

## Mission

Determine whether the website is designed for the behavior it wants — or whether it is designed for the behavior it describes.

Fogg's core finding: "Behavior happens when Motivation, Ability, and a Prompt converge at the same moment. Remove any one of the three and the behavior does not happen."

**B = MAP**
- **M** — Motivation: Does the visitor want to act?
- **A** — Ability: Can they act right now, easily?
- **P** — Prompt: Is there a clear, timely signal to act?

Most websites fail on Ability and Prompt while spending all their energy on Motivation. A page full of compelling copy and a broken mobile form converts no one.

---

## The Fogg Behavior Model — Applied to Conversion

### The Action Line

Fogg's action line separates behaviors that happen from behaviors that do not. A behavior above the action line occurs when Motivation × Ability exceeds the threshold. Below it, the behavior fails.

Three ways to get a behavior above the action line:
1. Increase Motivation (harder, slower, unpredictable)
2. Increase Ability — reduce friction (faster, more reliable, highest leverage)
3. Improve the Prompt — timing and clarity (often overlooked entirely)

Fogg's practical insight: "When a behavior does not happen, don't assume low motivation. Assume high friction."

Most conversion problems are Ability problems, not Motivation problems.

---

## Motivation Audit

Fogg's three core motivators:
- **Pleasure / Pain** (immediate, physical, visceral)
- **Hope / Fear** (anticipatory — the future state)
- **Social Acceptance / Rejection** (belonging, status, identity)

Audit questions:
- Which motivator does the hero copy engage first?
- Is the motivator matched to the buyer's dominant emotional state at the moment of arrival?
- Is the motivation front-loaded — present in the first 5 seconds — or buried in body copy?
- Does motivation increase as the visitor moves down the page, or does it plateau after the hero?
- Is there a motivation peak immediately before the primary CTA?

Fogg's warning: High motivation does not overcome high friction. Do not use motivation to compensate for poor Ability design.

---

## Ability Audit — The Friction Map

Ability is the inverse of friction. Reducing friction increases Ability. This is the highest-leverage intervention on most websites.

### Fogg's Six Elements of Ability (Simplicity Factors)

| Factor | Question | Present? | Friction Level |
|--------|----------|----------|---------------|
| **Time** | How long does the action take? | | |
| **Money** | Is there a financial cost to the first step? | | |
| **Physical effort** | How many clicks, scrolls, or taps? | | |
| **Brain cycles** | How much thinking does the action require? | | |
| **Social deviance** | Does the action feel unusual or risky? | | |
| **Non-routine** | Does the action require breaking a habit? | | |

For each factor, rate friction as Low / Medium / High and identify the specific cause.

### Form Friction Audit

Forms are where Ability failures are most measurable.

- How many fields does the primary form contain?
- Are any fields non-essential for the first step? (Company size, budget, how did you hear about us — all friction on a first-touch form)
- Is auto-fill enabled on all fields?
- Is the form visible without scrolling on mobile?
- Is the submit button label a verb + outcome? ("Get my free assessment" vs. "Submit")
- What happens immediately after submission? (Confirmation page, redirect, nothing — silence kills trust)

Fogg's field count rule: Every field you add reduces completion. Add only what is essential for the next step, not the eventual relationship.

### Navigation Friction Audit

- How many clicks does it take to reach the primary conversion from the homepage?
- Are there dead ends — pages with no next step?
- On mobile, are tap targets sized to 44×44px minimum?
- Does the page require horizontal scrolling on any device?
- Is the primary CTA visible on mobile without scrolling past the fold?

---

## Prompt Audit

A Prompt is the signal that triggers the behavior. Without a Prompt, motivated and able visitors do not act — they leave.

Fogg's three types of Prompt:
- **Spark** — Motivates and prompts simultaneously (used when motivation is low)
- **Facilitator** — Reduces friction and prompts simultaneously (used when ability is low)
- **Signal** — Pure prompt with no motivational or ability component (used when both are already high)

Audit questions:
- Is there a Prompt at the moment of peak motivation? (Immediately after the strongest benefit claim)
- Is the Prompt a Signal (just "click here") when the visitor needs a Spark (reason + action)?
- Is the Prompt a Spark when the visitor is already motivated and needs a Facilitator (easier path)?
- How many Prompts appear on one screen? (Too many = none of them work)
- Is the Prompt competing with other CTAs for attention?

---

## Tiny Habits Application — The Starter Step

Fogg's most actionable finding: "Make the behavior tiny. Celebrate it immediately. Build from there."

Applied to conversion: The first ask should be so small it feels unreasonable to refuse.

Starter Step Audit:
- What is the current smallest ask on this website?
- Is it smaller than it could be? (A phone call is not tiny. A quiz is tiny. Downloading a guide is tiny.)
- Is there a micro-behavior that could precede the primary conversion? (A self-assessment, a calculator, a one-question poll)
- Is success immediately celebrated? (A thank-you that makes the visitor feel good about the step they just took — not a generic "form submitted" page)

Fogg's insight: "Celebration is the skill that most determines whether a behavior becomes a habit." In conversion: the moment after the first action is where the next action is won or lost.

---

## Motivation–Ability Matrix

Map the current primary conversion on this grid:

```
HIGH MOTIVATION
        |
        |   [Hard to do]          [Easy to do]
        |   CTA fires but         CTA fires and
        |   friction blocks        behavior happens
        |
        |   [Hard to do]          [Easy to do]
        |   Nothing happens        Nothing happens
        |   (double failure)       (prompt missing)
        |
LOW MOTIVATION
        |__________________________|
        HIGH FRICTION         LOW FRICTION
```

Identify which quadrant the current primary CTA occupies. Then identify the specific intervention:
- Upper left: Reduce friction (Ability problem)
- Lower left: Increase motivation AND reduce friction
- Lower right: Add or improve the Prompt
- Upper right: No fix needed — this is where you want to be

---

## Mobile Behavior Audit

Mobile is where Ability failures are most severe and most costly.

- Does the page load in under 3 seconds on a mobile connection?
- Is the primary CTA reachable with one thumb without repositioning?
- Does the phone number trigger `tel:` link behavior on tap?
- Are form inputs typed with the correct keyboard? (Email field = email keyboard, phone field = numeric keyboard)
- Is there any interstitial, popup, or overlay that blocks content on mobile load?
- Does the page require pinch-to-zoom at any point?

Each failure is a behavior that does not happen.

---

## Output

1. **B=MAP Assessment** — Motivation level, Ability level, Prompt quality for the primary conversion
2. **Friction Map** — Every friction point by Fogg's six simplicity factors, rated High / Medium / Low
3. **Form Audit** — Field count, essential vs. non-essential, mobile behavior, post-submit experience
4. **Prompt Architecture** — Where Prompts appear, which type is used, whether they match the visitor's state
5. **Starter Step Recommendation** — The smallest viable first behavior before the primary conversion
6. **Motivation–Ability Matrix placement** — Which quadrant the primary CTA occupies and why
7. **Mobile Behavior Report** — Specific failures on mobile that are blocking conversions
8. **Top 3 Ability fixes** — The three friction reductions with the highest conversion impact
9. **Fogg Behavior Score: X/100**
