# Trust Tests

## Purpose

Measure the current state of trust with the target audience and identify where trust is being built, eroded, or left unaddressed.

Run these tests before launching any significant new campaign and quarterly during steady-state operations.

---

## Trust Architecture Scores

For each trust pillar, score current state: **1 (absent) — 5 (strong)**

| Pillar | Question | Score |
|---|---|---|
| Competence | Does the audience believe this organization can deliver? | |
| Benevolence | Does the audience believe this organization acts in their interest? | |
| Integrity | Does the audience see alignment between words and actions? | |
| Predictability | Does the audience know what to expect and when? | |
| Transparency | Does the audience feel fully informed? | |

---

## Test Suite

### TEST-TRUST-001: Credential Verification

**Test**: Are all stated credentials current, accurate, and verifiable?

**Method**:
1. List every credential claimed in marketing materials (licenses, certifications, memberships)
2. Verify each is current (not expired)
3. Verify the holder matches the claim (not a former employee, not a pending credential)
4. Confirm the credential scope is accurately described

**Pass**: All credentials are current, accurate, and correctly described
**Fail**: Any credential is expired, misattributed, or misrepresented

---

### TEST-TRUST-002: Review Authenticity Audit

**Test**: Are online reviews from genuine customers, recent, and representative?

**Method**:
1. Review all active rating profiles (Google, Yelp, industry-specific)
2. Check for suspicious patterns (sudden influx, identical language, reviewer profiles)
3. Assess recency — what percentage are from the past 12 months?
4. Assess specificity — do reviews describe real outcomes or generic praise?
5. Check response rate — are negative reviews acknowledged and addressed?

**Pass**: Reviews are genuine, recent, specific, and responded to
**Warning**: Reviews are old (2+ years) or predominantly generic
**Fail**: Evidence of fake or incentivized reviews without disclosure

---

### TEST-TRUST-003: Promise-Delivery Alignment

**Test**: Do stated process promises match operational reality?

**Method**:
1. List every explicit or implied promise (response time, assessment process, caregiver match, follow-up schedule)
2. For each: review actual delivery data from the past 90 days
3. Identify any promise being kept less than 90% of the time
4. For each gap: determine root cause

**Pass**: All promises kept 90%+ of the time
**Warning**: 75–90% compliance — requires process improvement
**Fail**: Below 75% on any material promise

---

### TEST-TRUST-004: Negative Review Response Audit

**Test**: Are negative reviews acknowledged promptly and genuinely?

**Method**:
1. List all negative (1–3 star) reviews in the past 12 months
2. For each: assess response time (target: within 72 hours)
3. Assess response quality: does it acknowledge the specific complaint, or deflect?
4. Assess follow-through: was the complaint resolved?

**Pass**: All negative reviews responded to within 72 hours with specific, non-defensive acknowledgment
**Fail**: Any unresponded review, or responses that are defensive or generic

---

### TEST-TRUST-005: Consistency Check

**Test**: Is the brand message consistent across all touchpoints?

**Method**:
1. Review: website, Google Business, Facebook, any print materials, intake conversation script
2. Identify any contradictions in: positioning, pricing description, process description, promises made

**Pass**: All touchpoints tell a coherent, consistent story
**Fail**: Material contradictions exist between channels

---

### TEST-TRUST-006: Customer Trust Survey

**Test**: What do current customers actually think?

**Method**:
Ask 5–10 current customers:
1. "How confident were you before your first experience with us?"
2. "After your first experience, did your confidence go up or down?"
3. "What is the one thing that most makes you trust us?"
4. "What would make you more likely to refer someone to us?"

**Pass**: Customers report trust increase after first experience; referral barriers are actionable
**Flag**: Trust does not increase after first experience (investigate why)

---

## Trust Score Summary

```
TRUST AUDIT — [Date]

Competence:     [1-5] — [note]
Benevolence:    [1-5] — [note]
Integrity:      [1-5] — [note]
Predictability: [1-5] — [note]
Transparency:   [1-5] — [note]

Average Trust Score: [X.X / 5]
Lowest Pillar: [name]
Priority Action: [specific recommendation]
```
