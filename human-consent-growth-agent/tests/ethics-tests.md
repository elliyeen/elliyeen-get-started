# Ethics Tests

## Purpose

Validate that every recommendation, piece of copy, and growth tactic complies with the ethical guardrails defined in `ethics.md`.

Run these tests before any content or tactic reaches the audience.

---

## Test Suite

### TEST-ETH-001: False Claims Check

**Test**: Does this content contain any claim that cannot be independently verified?

**Method**:
1. Extract every factual claim (statistics, credentials, outcomes, comparisons)
2. For each claim: identify the source
3. Verify the source exists and supports the claim
4. Flag any claim without a verifiable source

**Pass**: All claims are verifiable OR are labeled [VERIFY] and not published
**Fail**: Any unverifiable claim is presented as fact

---

### TEST-ETH-002: Testimonial Authenticity Check

**Test**: Are all testimonials from real customers with documented consent?

**Method**:
1. List all testimonials in use
2. For each: confirm real customer, confirm original source (review platform or written consent file)
3. Confirm no incentivized reviews without disclosure
4. Confirm no AI-generated or composite testimonials

**Pass**: All testimonials are traceable to real customers with documented authenticity
**Fail**: Any testimonial cannot be traced to a real, consented source

---

### TEST-ETH-003: Scarcity Claim Validation

**Test**: Are any scarcity or urgency claims in active content accurate?

**Method**:
1. Identify every urgency signal in active copy ("limited spots," "offer ends," "only X remaining")
2. For each: confirm operational reality matches the claim
3. Verify countdown timers are genuinely expiring (not resetting)
4. Confirm limited availability claims reflect actual limits

**Pass**: All urgency claims match operational reality
**Fail**: Any urgency claim is not grounded in operational fact

---

### TEST-ETH-004: Emotional Exploitation Check

**Test**: Does this content use fear, shame, or grief beyond what the situation genuinely warrants?

**Method**:
1. Identify all emotionally charged language
2. For each: assess whether the emotion named reflects the audience's genuine experience
3. Assess whether the emotional framing is proportionate to the actual risk
4. Confirm the content resolves emotional tension rather than amplifying it to drive urgency

**Pass**: Emotional content names real fears and offers genuine resolution
**Fail**: Content amplifies fear beyond genuine risk levels, uses shame as a motivator, or exploits grief

---

### TEST-ETH-005: Hidden Persuasion Check

**Test**: Would the audience object to any of our persuasion techniques if they became aware of them?

**Method**:
1. List all persuasion techniques employed (anchoring, scarcity, social proof, authority, reciprocity)
2. For each: assess whether the technique is transparent
3. Test: if the technique was explained to the audience, would they feel manipulated?

**Pass**: All techniques could be disclosed without damaging trust
**Fail**: Any technique depends on the audience's lack of awareness to be effective

---

### TEST-ETH-006: Fabricated Statistics Check

**Test**: Are all statistics sourced?

**Method**:
1. Extract every numerical claim
2. For each: identify the source
3. Verify the source is publicly accessible
4. Confirm the statistic is accurately represented (not cherry-picked, not from an unrelated context)

**Pass**: Every statistic has a citable, accurate source
**Fail**: Any statistic cannot be sourced

---

## Running the Tests

For each piece of content or tactic:

```
Content/Tactic: [describe]

TEST-ETH-001 False Claims:       PASS | FAIL | N/A
TEST-ETH-002 Testimonials:       PASS | FAIL | N/A
TEST-ETH-003 Scarcity:           PASS | FAIL | N/A
TEST-ETH-004 Emotional:          PASS | FAIL | N/A
TEST-ETH-005 Hidden Persuasion:  PASS | FAIL | N/A
TEST-ETH-006 Statistics:         PASS | FAIL | N/A

Overall Result: PASS | FAIL
Flagged Items: [list]
Required Actions: [list]
```

---

## Failure Protocol

Any single failure blocks publication.

Required action: resolve the specific failure before re-testing. Do not publish with known ethical failures under time pressure.
