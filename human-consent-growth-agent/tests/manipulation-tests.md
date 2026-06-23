# Manipulation Tests

## Purpose

Detect manipulation tactics — whether introduced intentionally or accidentally — before they reach the audience.

These tests function as a red team. They look for what is wrong, not what is right.

---

## Definition

Manipulation is influence that:
- Bypasses informed understanding
- Creates pressure the prospect would not feel if fully informed
- Serves the organization's interests at the expense of the prospect's
- Would cause the prospect to object if the technique were disclosed

Persuasion is not manipulation. Honest persuasion toward a genuine offer that serves the audience is the goal. These tests specifically hunt for the line between the two.

---

## Test Suite

### TEST-MAN-001: The Daylight Test

**Test**: If the audience could see every element of this tactic, would they still participate?

**Method**:
1. Describe the tactic in plain language, including the psychological mechanism being used
2. Ask: "If we told the prospect exactly this, would they feel deceived?"

**Pass**: Prospect would feel informed, not manipulated
**Fail**: Prospect would feel their psychology was being exploited

---

### TEST-MAN-002: Fear Amplification Check

**Test**: Does any content amplify fear beyond what the situation genuinely warrants?

**Method**:
1. Identify all fear-based copy
2. For each: state the actual risk level (low, medium, high)
3. Assess whether the copy represents the risk proportionately
4. Assess whether fear is resolved or left amplified to drive urgency

**Pass**: Fear is named accurately and resolved
**Fail**: Fear is exaggerated, left unresolved, or used as a closing mechanism

---

### TEST-MAN-003: Dark Pattern Audit

**Test**: Does any UI element obscure user decision-making?

**Method**:
1. Review all digital touchpoints for dark patterns:
   - Pre-checked opt-in boxes
   - Cancellation paths requiring phone calls when signup is online
   - "Confirm shaming" exit copy ("No thanks, I don't want to help my family")
   - Hidden fees revealed late in the process
   - Countdown timers that reset
   - Subscription enrollment disguised as one-time purchase

**Pass**: No dark patterns found
**Fail**: Any dark pattern identified — require immediate revision

---

### TEST-MAN-004: False Scarcity Detection

**Test**: Are any scarcity or urgency claims not grounded in operational reality?

**Method**:
1. Identify every scarcity signal ("limited spots," "this week only," "only X left")
2. For each: confirm against actual operational data
3. If the scarcity is repeating (e.g., "limited spots" that never runs out), flag as manufactured

**Pass**: All scarcity claims reflect genuine constraints
**Fail**: Any scarcity claim is not grounded in operational reality

---

### TEST-MAN-005: Social Proof Integrity Check

**Test**: Is all social proof genuine and representative?

**Method**:
1. Trace every testimonial, review, and case study to its source
2. Confirm consent and authenticity
3. Assess whether the selection creates a false impression of typical outcomes
4. Check for cherry-picked results presented as representative

**Pass**: Social proof is genuine, consented, and representative
**Fail**: Any fabricated, incentivized-without-disclosure, or non-representative social proof

---

### TEST-MAN-006: Reciprocity Exploitation Check

**Test**: Is the "free value" genuinely free — or does it create artificial obligation?

**Method**:
1. Review all reciprocity tactics (free guides, free assessments, free consultations)
2. Assess: is the value genuine if the prospect never purchases?
3. Assess: does follow-up communication pressure the prospect based on the free gift?
4. Assess: is the free value designed primarily to deliver value, or primarily to create a debt feeling?

**Pass**: Free value is genuinely useful independent of purchase; follow-up is non-pressuring
**Fail**: Follow-up uses guilt about the free gift as a closing mechanism

---

## Manipulation Score

```
MANIPULATION AUDIT — [Date]

TEST-MAN-001 Daylight:           PASS | FAIL
TEST-MAN-002 Fear Amplification: PASS | FAIL
TEST-MAN-003 Dark Patterns:      PASS | FAIL
TEST-MAN-004 False Scarcity:     PASS | FAIL
TEST-MAN-005 Social Proof:       PASS | FAIL
TEST-MAN-006 Reciprocity:        PASS | FAIL

Result: CLEAN | FLAGS PRESENT

Flags: [list any failing tests]
Required Actions: [specific revisions needed]
Cleared for deployment: YES | NO
```

---

## Note on False Positives

Not every persuasion technique is manipulation. The presence of emotional content, scarcity messaging, authority signals, and social proof is not inherently manipulative.

The test is always: would the audience feel deceived if the mechanism were explained to them?

Strong, honest copy will pass every test. Genuine social proof will pass every test. Legitimate scarcity will pass every test. Only tactics that depend on audience ignorance will fail.
