# Tests

Eight test cases for the Copy Engineering Conductor.

Each test defines the input, the expected behavioral verdict, the expected critical bottleneck, and the pass criteria the conductor must meet.

---

## Test 1: Weak Headline

**Purpose:** Verify the conductor identifies attention failure when the headline is generic.

### Input Summary

- Asset type: Landing page
- Copy: "Welcome to [Company Name]. We help businesses grow. Book a free call today."
- Target audience: Small business owners looking for marketing help
- Desired behavior: Book a free call
- Stage of awareness: Problem-aware
- Traffic source: Google search ad

### Expected Verdicts

- Behavioral verdict: `moves_away`
- Score: 0–35
- Critical bottleneck: Attention
- Final recommendation: Rebuild

### Pass Criteria

The conductor must:
- Score Attention at 3 or below
- Name Attention as the critical bottleneck
- Not recommend grammar improvements as the primary fix
- Identify that the headline selects no specific prospect
- Recommend Rebuild, not Revise

---

## Test 2: Strong Headline, Weak Proof

**Purpose:** Verify the conductor distinguishes between attention and belief, and does not conflate a strong opening with a complete copy system.

### Input Summary

- Asset type: Landing page
- Copy: "The #1 reason your Facebook ads don't convert isn't the targeting. It's the copy. We fix that. [Book a Free Audit]"
- Target audience: E-commerce founders spending $5K+/month on paid ads
- Desired behavior: Book a free audit call
- Stage of awareness: Solution-aware
- Traffic source: Cold Facebook ad

### Expected Verdicts

- Behavioral verdict: `neutral`
- Score: 45–65
- Critical bottleneck: Belief
- Final recommendation: Revise

### Pass Criteria

The conductor must:
- Score Attention at 7 or above
- Score Belief at 3 or below
- Name Belief — not Attention or Trust — as the critical bottleneck
- Recommend adding specific proof as the highest-leverage fix
- Not recommend rewriting the headline

---

## Test 3: High Desire, Unclear CTA

**Purpose:** Verify the conductor catches a broken action step even when desire is high.

### Input Summary

- Asset type: Sales letter
- Copy: Long-form copy (500+ words) that correctly names the pain of solo agency owners, paints a compelling future state, includes two testimonials, and ends with "Contact us to learn more."
- Target audience: Solo marketing agency owners who want to scale
- Desired behavior: Fill out an application form to join a group coaching program
- Stage of awareness: Solution-aware
- Traffic source: Warm email list

### Expected Verdicts

- Behavioral verdict: `neutral`
- Score: 50–70
- Critical bottleneck: Action
- Final recommendation: Revise

### Pass Criteria

The conductor must:
- Score Desire at 7 or above
- Score Action at 3 or below
- Flag that "Contact us to learn more" does not tell the prospect what to do or why
- Name Action as the critical bottleneck despite strong desire scores
- Not recommend rewriting the emotional copy

---

## Test 4: Clear Offer, No Urgency

**Purpose:** Verify the conductor identifies friction caused by absence of urgency — even when the offer is clear and the copy is well-written.

### Input Summary

- Asset type: Email
- Copy: Clear offer for a $97 copywriting course. Well-explained benefits. Specific outcomes. Genuine testimonials. Ends with "Click here to enroll whenever you're ready."
- Target audience: Freelance writers who want to specialize in direct-response copywriting
- Desired behavior: Click and purchase the course today
- Stage of awareness: Product-aware
- Traffic source: Warm email list, fourth email in a launch sequence

### Expected Verdicts

- Behavioral verdict: `neutral`
- Score: 55–70
- Critical bottleneck: Friction Reduction (specifically: no reason to act now versus later)
- Final recommendation: Revise

### Pass Criteria

The conductor must:
- Score Friction Reduction at 4 or below
- Identify "whenever you're ready" as the specific language creating the no-urgency problem
- Not flag fabrication or trust concerns — this copy has real testimonials
- Recommend adding a legitimate, specific reason to act now
- Not recommend adding a false countdown timer

---

## Test 5: Strong Claim, No Evidence

**Purpose:** Verify the conductor flags unsupported claims and routes them through the risk flag system.

### Input Summary

- Asset type: LinkedIn post
- Copy: "Most CEOs waste 40% of their marketing budget. After working with 200+ companies, I've found the one thing they all have in common: they're optimizing for clicks, not conversions. Here's the fix: [long thread about conversion principles]"
- Target audience: Marketing directors at mid-market B2B companies
- Desired behavior: Follow the author and DM for a free audit
- Stage of awareness: Problem-aware
- Traffic source: LinkedIn organic

### Expected Verdicts

- Behavioral verdict: `neutral`
- Score: 45–65
- Critical bottleneck: Belief (strong claim without evidence)
- Risk flags must include the "40% waste" statistic and "200+ companies" claim

### Pass Criteria

The conductor must:
- Flag "[RISK] '40% of their marketing budget' — specific statistical claim with no source"
- Flag "[RISK] '200+ companies' — vague social proof; no named clients or verifiable results"
- Score Belief at 4 or below
- Not dismiss the copy entirely — the insight is real; the evidence layer is missing
- Recommend adding one specific named result as the highest-leverage fix

---

## Test 6: Good Copy That Doesn't Match Desired Behavior

**Purpose:** Verify the conductor evaluates copy against the specific desired behavior — not against generic quality standards.

### Input Summary

- Asset type: Landing page
- Copy: Excellent, well-structured page for a SaaS product. Strong attention. Specific proof. Clear feature explanation. Low friction. CTA: "Start your free trial."
- Target audience: Operations managers at logistics companies
- Desired behavior: Book a live demo call (not start a free trial — the sales team requires a demo before access)
- Stage of awareness: Product-aware
- Traffic source: Google search

### Expected Verdicts

- Behavioral verdict: `moves_away`
- Score: 35–55
- Critical bottleneck: Action (CTA drives the wrong behavior)
- Final recommendation: Revise

### Pass Criteria

The conductor must:
- Identify that the copy quality is high but the desired behavior is not supported
- Score the individual forces accurately (Attention, Belief, Trust may score well)
- Score Action at 2 or below based on misalignment with the stated desired behavior
- Not recommend rewriting the copy — only realigning the CTA and offer to the correct next step
- State that this is a mismatch problem, not a copy quality problem

---

## Test 7: Polished Copy That Doesn't Move Action

**Purpose:** Verify the conductor is not fooled by professional-sounding writing that fails to create behavioral movement.

### Input Summary

- Asset type: Landing page
- Copy: Beautifully written, agency-quality landing page for a financial advisory firm. Elegant typography references. Sophisticated language. Phrases like "comprehensive wealth stewardship," "tailored financial architecture," "legacy-focused planning." CTA: "Explore our philosophy."
- Target audience: High-net-worth individuals (>$2M investable assets) seeking a new wealth manager
- Desired behavior: Request an introductory meeting
- Stage of awareness: Solution-aware
- Traffic source: Referral from existing client

### Expected Verdicts

- Behavioral verdict: `neutral` or `moves_away`
- Score: 30–50
- Critical bottleneck: Understanding or Action
- Final recommendation: Revise or Rebuild

### Pass Criteria

The conductor must:
- Not score the copy highly because it sounds professional
- Identify that "Explore our philosophy" is not an action that leads to a meeting
- Flag that abstract language ("tailored financial architecture") does not connect to the prospect's specific fear or desired state
- Identify Understanding or Action as the bottleneck — not Attention or Trust
- Avoid language like "this is beautifully written" — evaluate behavioral function only

---

## Test 8: Copy That Creates Trust and Action

**Purpose:** Verify the conductor correctly identifies strong, conversion-ready copy and recommends shipping it.

### Input Summary

- Asset type: Email
- Copy:

Subject: How [Name of Named Client], a solo attorney, went from $180K to $340K in 14 months

---

In January of last year, [Named Client] was working 60-hour weeks, billing by the hour, and had no idea which of her clients were profitable.

She came to us because she wanted to implement value-based pricing. She was skeptical it would work for her practice area (family law).

14 months later: $340K in revenue, 42-hour weeks, and a waiting list.

She didn't work harder. She changed the model.

If you're billing by the hour and wondering why the revenue ceiling feels fixed, this might be the most useful 30 minutes you spend this month.

[Book a free pricing strategy call]

There's no pitch. We'll review your current pricing model and tell you honestly whether value-based pricing would work for your practice — and if so, how to position it.

---

- Target audience: Solo attorneys billing by the hour, $150K–$250K revenue, feeling stuck
- Desired behavior: Click and book the free pricing strategy call
- Stage of awareness: Problem-aware to solution-aware
- Traffic source: Warm email list (subscriber downloaded a guide on attorney pricing)

### Expected Verdicts

- Behavioral verdict: `moves_closer`
- Score: 75–95
- Final recommendation: Ship

### Pass Criteria

The conductor must:
- Score Attention at 8 or above (specific named client, specific dollar figures)
- Score Belief at 8 or above (named client, specific outcome, specific time frame)
- Score Trust at 7 or above (transparent process described after CTA)
- Score Desire at 8 or above (current state and desired state are both painted clearly)
- Score Action at 7 or above (CTA is specific, low-commitment, and connected to the promise)
- Recommend Ship
- Not manufacture weaknesses to seem thorough — if the copy is strong, say so

---

## Running the Tests

Evaluate each test case using the agent defined in `agent.md`.

A passing result meets all listed pass criteria for that test.

The system fails a test if it:
- Issues the wrong behavioral verdict
- Identifies the wrong bottleneck
- Recommends grammar fixes as primary improvements
- Scores strong copy low or weak copy high due to surface-level writing quality
- Fabricates risk flags not present in the copy
- Misses fabrication risks that are present
- Recommends more than one highest-leverage fix
- Recommends Rebuild when Revise is correct, or Revise when Ship is correct

The system passes when it reliably separates behavioral movement from writing quality, finds the real constraint, and recommends exactly one fix.
