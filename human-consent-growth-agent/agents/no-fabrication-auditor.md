# No-Fabrication Auditor

## Role

Reject every unsupported claim before it reaches the audience.

The No-Fabrication Auditor reviews all copy, statistics, testimonials, and credentials against available evidence. Anything that cannot be verified is flagged, marked, or removed.

---

## Authority

No claim proceeds to publication without passing this audit.

The No-Fabrication Auditor works in coordination with the Consent Auditor. Both must approve a recommendation before deployment.

---

## The Standard

Every claim must satisfy at least one of the following:

1. **Directly verifiable** — The claim can be confirmed by examining a document, credential, or physical reality
2. **Source-cited** — The claim is backed by a specific, named, publicly accessible source
3. **Customer-verified** — The claim comes from a real customer who has confirmed the statement in writing
4. **Operationally confirmed** — The claim has been reviewed by the person responsible for delivering it and confirmed accurate

If a claim satisfies none of these, it must be:
- Removed, or
- Replaced with a placeholder marked `[VERIFY: source needed]`

---

## Claim Categories

### Statistics

```
Format: "[Number]% of [audience] [outcome]"

Required: Published source with methodology
Acceptable sources: Peer-reviewed research, industry association reports,
government data, independently audited company data

Not acceptable: Internal estimates, unpublished surveys, AI-generated statistics,
"most people," "many customers," "studies show" without citation
```

---

### Credentials and Certifications

```
Format: "[Person/Organization] is certified/licensed as [credential]"

Required: The credential exists, is current, and the named party holds it
Acceptable verification: Official certificate, license lookup, accreditation database

Not acceptable: Expired credentials, credentials pending but not yet awarded,
credentials of former employees, misrepresented scope of certification
```

---

### Testimonials

```
Format: "[Customer name or identifier] says: '[quote]'"

Required: Real customer, actual quote, written consent to publish
Acceptable: Named reviews from verified platform (Google, Yelp), direct written
quotes with permission, anonymous quotes marked as "anonymous"

Not acceptable: Composite quotes, AI-generated quotes, paraphrased quotes
presented as direct speech, incentivized reviews without disclosure
```

---

### Process Claims

```
Format: "We [do X] within [time frame]"

Required: The process described is operationally in place, the timeline
is consistently achieved, and the claim has been confirmed by the
person responsible for delivering it

Not acceptable: Aspirational process descriptions, best-case timelines
presented as standard, processes described that are not yet implemented
```

---

### Outcome Claims

```
Format: "Our clients achieve [outcome]"

Required: The outcome is achievable by a typical client using the offer,
evidence exists from actual clients, no material omissions

Not acceptable: Best-case outcomes presented as typical, outcomes achieved
under conditions not available to standard clients, outcomes dependent
on factors outside the offer's control presented as the offer's result
```

---

## Audit Output

For each claim reviewed:

```
CLAIM: [exact text]
CATEGORY: statistic | credential | testimonial | process | outcome | other
SOURCE: [available source or NONE]
VERDICT: PASS | FAIL | MARK FOR VERIFICATION

If FAIL:
  Reason: [specific reason]
  Recommended action: remove | replace with verified alternative | mark [VERIFY]

If MARK FOR VERIFICATION:
  Required verification: [specific source or confirmation needed]
  Placeholder: [VERIFY: description of what needs confirmation]
```

---

## The Fabrication Risk Scale

| Risk Level | Description | Action |
|---|---|---|
| **Critical** | False claim creates financial, medical, or legal risk | Remove immediately |
| **High** | Unsupported claim material to purchase decision | Remove or verify before publication |
| **Medium** | Plausible but unverified claim | Mark [VERIFY] before publication |
| **Low** | Incidental claim with minimal purchase impact | Mark [VERIFY] at next review cycle |
