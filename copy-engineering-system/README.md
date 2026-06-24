# Copy Engineering System

A multi-agent TypeScript system that uses the Anthropic Claude API to evaluate, score, and iteratively improve marketing copy — optimizing for behavioral movement at every stage of the buyer journey.

This system only works with halal and ethical businesses.

---

## What This System Does

The system runs marketing copy through 10 specialized behavioral agents in parallel, each evaluating the copy from a distinct psychological lens:

| Agent | Question |
|---|---|
| Attention | Would the prospect stop scrolling? |
| Curiosity | Do they want to keep reading? |
| Understanding | Do they get what is being offered? |
| Desire | Do they want it? |
| Belief | Do they believe the claims? |
| Trust | Do they trust the source? |
| Friction | Is the path to action clear? |
| Action | Is the CTA strong enough? |
| Loyalty | Will they come back? |
| Advocacy | Will they tell others? |

Two audit agents run in parallel:
- **No Fabrication Auditor** — checks for unsupported claims, fake stats, legal risks
- **Behavior Auditor** — holistic pass identifying where behavioral momentum breaks

The conductor loops up to 5 times, rewriting the copy with agent feedback until it passes all thresholds:
- Overall score >= 6.5 / 10
- No single stage below 4 / 10
- No fabrication violations

---

## Setup

### 1. Install dependencies

```bash
cd copy-engineering-system
npm install
```

### 2. Configure API key

```bash
cp .env.example .env
```

Edit `.env` and add your Anthropic API key:

```
ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Run with the default sample brief

```bash
npm run dev
```

This runs the system with a built-in sample brief for Savannah Personal Care Services (home care landing page).

### 4. Run with your own brief

Create a JSON file matching the brief schema (see below), then:

```bash
npm run dev -- --brief=./briefs/my-brief.json
```

### 5. Build for production

```bash
npm run build
npm start
```

---

## Running Tests

```bash
npm test
```

This runs two test suites:
- `sample_briefs.test.ts` — 8 integration tests using a mocked Anthropic API
- `scoring.test.ts` — unit tests for all scoring functions

No API key is required to run tests — the Anthropic client is mocked.

---

## Output Format

The system prints a formatted markdown report to stdout:

```markdown
# Final Copy

[complete copy here]

---

# Behavior Scorecard

| Stage | Score | Bar | Notes |
|---|---:|:---|---|
| Attention | 8/10 | ████████░░ | Strong |
| Curiosity | 7/10 | ███████░░░ | Adequate |
...
| Overall | 7.4/10 | | PASS |

---

# Weakest Stage
advocacy — This is where the most behavioral momentum is being lost.

# Strongest Stage
attention — This is the copy's primary asset.

# Required Fixes
  - Strengthen referral trigger
  - Add post-action loyalty copy

# Fabrication Check
PASSED — No fabricated claims detected.

# Final Recommendation
Copy passed quality thresholds after 2 iteration(s). Overall score: 7.4/10.
```

The full result JSON is saved to `output/result-{timestamp}.json`.

---

## Brief JSON Schema

```json
{
  "businessName": "Your Business Name",
  "industry": "Your industry",
  "offer": "What are you offering, in one to three sentences. Be specific.",
  "audience": "Who is reading this. What are they feeling right now. What do they want.",
  "desiredBehavior": "appointment",
  "assetType": "landing page",
  "trafficSource": "Google search",
  "awarenessLevel": "problem_aware",
  "marketSophistication": "stage_3",
  "proofAssets": [
    "Specific credential or proof point",
    "Named process or framework",
    "Testimonial type available"
  ],
  "constraints": [
    "Must include price",
    "Must not mention competitor names"
  ],
  "tone": "Warm, direct, short sentences.",
  "claimsAllowed": [
    "CNA-founded",
    "5-step process"
  ],
  "claimsForbidden": [
    "#1 in city",
    "guaranteed outcomes"
  ],
  "existingCopy": "Paste existing copy here if you want it improved rather than rewritten from scratch."
}
```

### `desiredBehavior` options

- `purchase` — buy a product
- `appointment` — book a call or meeting
- `opt_in` — subscribe to a list
- `application` — apply for a program
- `donation` — donate to a cause
- `share` — share content
- `reply` — respond to a message
- `referral` — refer others
- `loyalty` — return and repeat
- `advocacy` — become a brand advocate

### `awarenessLevel` options

- `unaware` — does not know they have the problem
- `problem_aware` — knows the problem, not the solution
- `solution_aware` — knows solutions exist, not yours
- `product_aware` — knows your product, not convinced
- `most_aware` — knows and wants your product, needs to act

### `marketSophistication` options

- `stage_1` — first product of its kind; lead with the claim
- `stage_2` — competitors exist; lead with the mechanism
- `stage_3` — mechanism is known; lead with a superior mechanism
- `stage_4` — all mechanisms are known; lead with the experience
- `stage_5` — market is saturated; lead with identity

---

## Project Structure

```
copy-engineering-system/
  src/
    main.ts              CLI entry point
    conductor.ts         Orchestration engine
    types.ts             All TypeScript types
    agents/
      attention.ts       Pattern interruption agent
      curiosity.ts       Open loop agent
      understanding.ts   Clarity agent
      desire.ts          Desire and transformation agent
      belief.ts          Claim credibility agent
      trust.ts           Skepticism and trust agent
      friction.ts        Friction reduction agent
      action.ts          CTA and urgency agent
      loyalty.ts         Retention and loyalty agent
      advocacy.ts        Referral and sharing agent
    auditors/
      no_fabrication.ts  Fabrication and legal risk auditor
      behavior_auditor.ts Holistic behavioral movement auditor
    scoring/
      scorecard.ts       Score calculation and formatting
    prompts/
      agent_prompts.ts   All Claude system prompts
    utils/
      parser.ts          Robust JSON parser for Claude responses
    tests/
      sample_briefs.test.ts  Integration tests (mocked API)
      scoring.test.ts        Unit tests for scoring functions
  specs/
    copy_engineering_agents.md  Full system specification
  output/               Result JSON files saved here
  .env.example          API key template
  package.json
  tsconfig.json
```

---

## Governing Frameworks

This system applies three advertising frameworks to every piece of copy:

**Claude Hopkins — Scientific Advertising (1923)**
Specificity beats vagueness. Every claim must be verifiable. Describe the process behind the claim. Own the preemptive claim. Give real value before asking for anything.

**Eugene Schwartz — Breakthrough Advertising**
People buy movement. From current state to desired state. Sell the bridge, not the bricks. Match copy to the prospect's awareness level and market sophistication.

**WSJ "Tale of Two Young Men" letter structure**
Open with the reader's situation. Name the exact fear. Dissolve it with specificity. Paint the future with possibility. Make the next step feel smaller than the cost of not taking it.

---

## Note on Ethics

This system is built exclusively for halal and ethical businesses. The No Fabrication Auditor actively checks for and flags misleading claims, unsupported statistics, and legally dangerous promises. Do not use this system to generate deceptive copy.
