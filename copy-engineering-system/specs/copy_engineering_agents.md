# Copy Engineering Agent System — Specification

**Version:** 1.0
**Date:** 2026-06-22

---

## Overview

The Copy Engineering Agent System is a multi-agent TypeScript application that uses the Anthropic Claude API to evaluate, score, and iteratively improve marketing copy. Ten specialized behavioral agents evaluate copy from distinct psychological lenses. Two audit agents check for fabrication and holistic behavioral movement. A conductor orchestrates the loop until copy passes quality thresholds or reaches the iteration limit.

This system only supports halal and ethical businesses. It must not be used for alcohol, gambling, tobacco, predatory financial products, or any industry that causes harm.

---

## Architecture

```
CopyBrief
    │
    ▼
Conductor
    ├── Generate initial draft (if no existingCopy)
    │
    └── Improvement Loop (max 5 iterations)
            │
            ├── 10 Behavioral Agents (parallel)
            │     ├── Attention
            │     ├── Curiosity
            │     ├── Understanding
            │     ├── Desire
            │     ├── Belief
            │     ├── Trust
            │     ├── Friction
            │     ├── Action
            │     ├── Loyalty
            │     └── Advocacy
            │
            ├── 2 Audit Agents (parallel)
            │     ├── No Fabrication Auditor
            │     └── Behavior Auditor
            │
            ├── Scorecard Calculation
            │
            ├── Threshold Check
            │     ├── Pass → Return FinalCopyResult
            │     └── Fail → Rewrite with feedback → next iteration
            │
            └── (after 5 iterations) → Return best result
```

---

## Behavioral Framework

The system evaluates copy against the 10-Stage Behavioral Movement Model:

| Stage | Question | Passing Score |
|---|---|---:|
| 1. Attention | Did the prospect stop scrolling? | ≥ 4 |
| 2. Curiosity | Does the prospect want to keep reading? | ≥ 4 |
| 3. Understanding | Does the prospect understand the offer? | ≥ 4 |
| 4. Desire | Does the prospect want what is offered? | ≥ 4 |
| 5. Belief | Does the prospect believe the claims? | ≥ 4 |
| 6. Trust | Does the prospect trust the source? | ≥ 4 |
| 7. Friction | Is the path to action clear and easy? | ≥ 4 |
| 8. Action | Did the prospect take the step? | ≥ 4 |
| 9. Loyalty | Will the prospect return? | ≥ 4 |
| 10. Advocacy | Will the prospect tell others? | ≥ 4 |

**Overall passing threshold:** 6.5 / 10
**Single-stage floor:** 4 / 10 (any stage below 4 is a block, regardless of overall score)
**Fabrication:** copy must pass the No Fabrication audit

---

## Agent Specifications

### Attention Agent (`src/agents/attention.ts`)

**Lens:** Pattern interruption, headline selection, specificity
**Framework:** Claude Hopkins — Scientific Advertising
**Returns:** `AttentionScore`

Key evaluation criteria:
- Does the headline create immediate pattern interruption?
- Does the first sentence select the right reader?
- Is there specificity in the opening (numbers, names, timeframes)?
- Would a scrolling person stop here?

---

### Curiosity Agent (`src/agents/curiosity.ts`)

**Lens:** Open loops, curiosity gaps, forward momentum
**Framework:** Gary Halbert — open loop theory
**Returns:** `CuriosityScore`

Key evaluation criteria:
- Are there open loops seeded throughout?
- Do transitions pull the reader forward?
- Would a reader who starts want to reach the end?

---

### Understanding Agent (`src/agents/understanding.ts`)

**Lens:** Clarity, jargon removal, reading level
**Framework:** Flesch-Kincaid readability principles
**Returns:** `UnderstandingScore`

Key evaluation criteria:
- Can an unfamiliar person understand in one pass?
- Are there jargon terms that need decoding?
- Is the value proposition in plain language within the first 30 words?

---

### Desire Agent (`src/agents/desire.ts`)

**Lens:** Current state / desired state, transformation selling
**Framework:** Eugene Schwartz — Breakthrough Advertising
**Returns:** `DesireScore`
**Chain:** Feature → Advantage → Benefit → Emotional Benefit → Identity Benefit

Key evaluation criteria:
- Does the copy name the prospect's current painful state accurately?
- Does it paint the desired state vividly?
- Does it sell the bridge (transformation) rather than the bricks (features)?

---

### Belief Agent (`src/agents/belief.ts`)

**Lens:** Claim credibility, proof assets, specificity
**Framework:** Claude Hopkins — Schlitz principle (describe the process)
**Returns:** `BeliefScore`

Key evaluation criteria:
- Is every major claim supported by a specific mechanism?
- Are there vague superlatives that will be dismissed?
- Is there a named, ownable process that no competitor has claimed?

---

### Trust Agent (`src/agents/trust.ts`)

**Lens:** Skepticism risk, trust signals, risk reversal
**Framework:** Cialdini — social proof, authority, liking
**Returns:** `TrustScore`

Key evaluation criteria:
- What is the skepticism risk?
- Are there phrases that will trigger a "yeah right" response?
- Is social proof specific (named, located, outcome-stated)?

---

### Friction Agent (`src/agents/friction.ts`)

**Lens:** Cognitive, emotional, mechanical, and trust friction
**Framework:** BJ Fogg — Behavior Model (Motivation × Ability × Prompt)
**Returns:** `FrictionScore`

Key evaluation criteria:
- Is there a single, obvious next step?
- Does the CTA require a commitment larger than the prospect is ready for?
- What is the smallest possible action the copy could ask for?

---

### Action Agent (`src/agents/action.ts`)

**Lens:** CTA clarity, urgency, secondary offer
**Framework:** Response theory — earned urgency vs. manufactured urgency
**Returns:** `ActionScore`

Key evaluation criteria:
- Is there a single, verb-led primary CTA?
- Is there a credible reason to act now?
- Is there a secondary, lower-commitment CTA?

---

### Loyalty Agent (`src/agents/loyalty.ts`)

**Lens:** Post-action retention, buyer's remorse prevention, belonging
**Framework:** Customer lifetime value, community identity
**Returns:** `LoyaltyScore`

Key evaluation criteria:
- Does the copy acknowledge what happens after the prospect acts?
- Does it reduce post-purchase anxiety by setting expectations?
- Is there belonging or community language?

---

### Advocacy Agent (`src/agents/advocacy.ts`)

**Lens:** Organic sharing triggers, referral mechanics, social currency
**Framework:** Jonah Berger — STEPPS model (Social Currency, Triggers, Emotion, Public, Practical Value, Stories)
**Returns:** `AdvocacyScore`

Key evaluation criteria:
- Is there a phrase so resonant the reader would quote it to others?
- Does the copy make the customer feel part of a movement?
- Is there a natural referral prompt?

---

## Audit Agent Specifications

### No Fabrication Auditor (`src/auditors/no_fabrication.ts`)

Checks for:
- Statistics without cited source
- Fabricated or composite testimonials
- Medical / legal / financial claims requiring disclaimers
- Guaranteed outcomes (legally dangerous)
- Unsupported superlatives (#1, best, leading)
- Before/after claims without FTC disclosures
- Missing privacy policy references
- Income claims without proper disclosure

Returns: `AuditResult` with `passed`, `violations[]`, optional `safeRewrite`, `notes[]`

### Behavior Auditor (`src/auditors/behavior_auditor.ts`)

Holistic pass that evaluates all 10 stages together. Identifies where behavioral momentum breaks and what the single highest-leverage fix is.

Returns: `BehaviorAuditResult` with `overallScore`, `weakestStage`, `strongestStage`, `mustFix[]`, `stageBreakdown`

---

## Passing Thresholds

```
overall >= 6.5
AND all stages >= 4
AND fabrication audit passed === true
```

If passing after any iteration: return immediately.
If not passing after 5 iterations: return best available result with warning.

---

## Copy Brief Schema

```typescript
interface CopyBrief {
  businessName: string;           // Required
  industry: string;               // Required
  offer: string;                  // Required — what is being offered
  audience: string;               // Required — who is reading this
  desiredBehavior: DesiredBehavior; // Required — what action should they take
  assetType: string;              // Required — "landing page", "email", etc.
  trafficSource?: string;         // Where is this traffic coming from?
  awarenessLevel?: AwarenessLevel; // How aware is the prospect?
  marketSophistication?: MarketSophistication; // Stage 1-5
  proofAssets?: string[];         // What proof exists (credentials, testimonials, etc.)
  constraints?: string[];         // Technical or legal constraints
  tone?: string;                  // Voice direction
  claimsAllowed?: string[];       // Claims specifically approved to use
  claimsForbidden?: string[];     // Claims that must not appear
  existingCopy?: string;          // If improving existing copy, provide it here
}
```

---

## Model Configuration

| Use Case | Model | Temperature |
|---|---|---:|
| Copy generation (draft + rewrite) | claude-sonnet-4-6 | 0.7 |
| Agent scoring | claude-sonnet-4-6 | 0.2 |
| Audit agents | claude-sonnet-4-6 | 0.2 |

---

## Output

The conductor returns a `FinalCopyResult` which includes:
- `finalCopy` — the best copy produced
- `behaviorScore` — overall score out of 10
- `weakestStage` — where the most behavioral momentum is lost
- `strongestStage` — the copy's primary asset
- `agentResults[]` — all 10 agent outputs with scores and recommendations
- `auditResults[]` — fabrication and behavior audit results
- `iterationsUsed` — how many improvement loops ran
- `scorecard` — all 10 stage scores + overall

The CLI (`src/main.ts`) formats this into a markdown report and saves the full JSON to `output/result-{timestamp}.json`.

---

## Ethical Constraints

This system is designed exclusively for ethical, halal businesses. Permitted industries include but are not limited to:

- Home care and healthcare services
- Education and tutoring
- Professional services (consulting, legal, accounting)
- SaaS and technology products
- Food and halal-certified products
- Sports training and fitness
- Real estate
- Non-profit and charitable organizations

The No Fabrication Auditor actively prevents the system from generating misleading, deceptive, or legally dangerous copy.
