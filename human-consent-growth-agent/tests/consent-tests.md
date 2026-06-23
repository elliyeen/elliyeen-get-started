# Consent Tests

## Purpose

Verify that every interaction with the audience preserves their freedom, understanding, and dignity.

These tests operationalize the Consent Framework (`consent-framework.md`) into specific, repeatable checks.

---

## The Consent Standard

Voluntary participation requires that prospects:
1. Understand what is being offered
2. See all material facts
3. Can decline without cost or penalty
4. Are served by the offer, not only the organization
5. Will trust the organization more after the transaction

---

## Test Suite

### TEST-CON-001: Clarity of Offer

**Test**: Can a first-time visitor understand the offer within 10 seconds?

**Method**:
1. Show the primary landing page to 5 people unfamiliar with the organization
2. After 10 seconds, remove the page and ask: "What was being offered? Who is it for? What is the first step?"
3. Score: how many of 5 answered all three correctly?

**Pass**: 4 of 5 answer all three questions correctly
**Fail**: Fewer than 3 can correctly describe the offer, audience, or next step

---

### TEST-CON-002: Material Facts Visibility

**Test**: Are all facts material to the purchase decision visible before commitment?

**Method**:
Audit for each material fact category:
- [ ] Price or pricing method: accessible before commitment?
- [ ] Service limitations: disclosed (geography, eligibility, capacity)?
- [ ] Cancellation policy: stated before signup?
- [ ] Material risks: disclosed where applicable?
- [ ] Sponsor or affiliate relationships: disclosed?

**Pass**: All material facts accessible before any commitment is requested
**Fail**: Any material fact discovered only after commitment

---

### TEST-CON-003: Exit Path Audit

**Test**: Can prospects and customers decline or exit without friction or penalty?

**Method**:
1. Attempt to: decline the primary CTA, unsubscribe from email, cancel service (if applicable)
2. Measure: how many steps are required?
3. Assess: is there guilt-inducing language in the exit path?
4. Confirm: does declining result in continued pressure?

**Pass**: Exit requires 1–2 steps; no guilt language; declining ends contact at the prospect's request
**Fail**: Exit requires more than 3 steps; shame language present; declining triggers follow-up pressure

---

### TEST-CON-004: Alignment Test

**Test**: Does this offer genuinely serve the prospect's stated need?

**Method**:
1. State the prospect's primary desire (from Desire Agent output)
2. Assess: does the offer directly address this desire?
3. Assess: are there cases where the offer is sold to prospects it cannot genuinely serve?
4. Confirm: does the organization have a policy for declining prospects who are not a good fit?

**Pass**: Offer serves primary audience desire; poor-fit prospects are identified and redirected
**Fail**: Offer is sold to prospects whose needs it cannot meet

---

### TEST-CON-005: Post-Transaction Trust Check

**Test**: After the first transaction, does trust increase?

**Method**:
Survey or interview 10 most recent customers (at 30-day mark):
- "Compared to your expectations when you started, how did the experience compare?" (exceeds / meets / falls short)
- "Has your confidence in this organization gone up, stayed the same, or gone down since you started?"
- "Would you describe this organization to someone else the way it was described to you?"

**Pass**: 80%+ report trust equal or improved; experience matches marketing description
**Warning**: 60–80% — identify and address specific gaps
**Fail**: Below 60%; experience materially diverges from marketing promise

---

### TEST-CON-006: Consent Record Audit

**Test**: For every commitment obtained from a prospect or customer, was informed consent documented?

**Method**:
1. List every agreement, opt-in, or commitment collected
2. For each: confirm consent was informed (material terms visible at time of consent)
3. For each: confirm consent was freely given (no penalty for declining)
4. For each: confirm a record of consent exists

**Pass**: All consents are informed, free, and documented
**Fail**: Any consent obtained without full information, under pressure, or undocumented

---

## Consent Audit Summary

```
CONSENT AUDIT — [Date]

TEST-CON-001 Offer Clarity:        PASS | FAIL
TEST-CON-002 Material Facts:       PASS | FAIL
TEST-CON-003 Exit Path:            PASS | FAIL
TEST-CON-004 Alignment:            PASS | FAIL
TEST-CON-005 Post-Transaction:     PASS | FAIL
TEST-CON-006 Consent Records:      PASS | FAIL

Overall: PASS | FAIL
Flags: [list]
Actions required: [list]
Deployment cleared: YES | NO
```

---

## The Master Test

After completing all six checks, ask the master question:

> "If the prospect understood everything we are doing, would they still willingly choose to participate?"

If the answer is yes — with confidence, not hope — the consent standard is met.

If there is any hesitation: the hesitation is the flag. Investigate it before proceeding.
