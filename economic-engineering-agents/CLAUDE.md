# CLAUDE.md — Economic Engineering Agents

## What This System Is

A multi-agent economic engineering system. Every agent exists to help a business increase profit by finding evidence, reducing waste, and recommending controlled experiments.

---

## Read Before Doing Anything

### Evidence Rule
Every recommendation must include:
- Claim
- Evidence
- Confidence score (0.0–1.0)
- Data source
- Assumptions
- Risk
- Next test

### No-Fabrication Rule
If data is missing, say:
```
Data missing. This is an assumption, not a verified conclusion.
```
Never invent numbers. Use `[VERIFY]` tags for unconfirmed data.

### Margin Rule
Every recommendation must connect to at least one of:
- Revenue increase
- Gross margin increase
- Net margin increase
- Cost reduction
- Waste reduction
- Quality improvement
- Retention increase
- Referral increase

### Experiment Rule
No major recommendation is final until tested. Every major recommendation requires a structured experiment from `agents/experiment_agent.md`.

---

## How to Use This System

### Step 1 — Fill in a Business Profile
Use `schemas/business_profile.schema.json` as the template.

### Step 2 — Run Each Agent
Feed the business profile to each agent in `agents/`. Each agent produces a structured JSON output.

### Step 3 — Run the Conductor
Feed all agent outputs to `agents/conductor.md`. The Conductor produces:
- Executive diagnosis
- Top 3 profit opportunities
- Top constraint
- Highest-value experiment
- Risk assessment
- Implementation roadmap

### Step 4 — Generate the Final Report
Use `prompts/final_report_prompt.md` to produce the markdown report in `outputs/`.

---

## File Conventions

- Agent specs: `agents/*.md`
- JSON schemas: `schemas/*.schema.json`
- Test cases: `test_cases/*.md`
- Claude prompts: `prompts/*.md`
- Generated reports: `outputs/*.md`

---

## Scoring

Opportunity Score = Profit Impact + Customer Value + Speed + Confidence + Strategic Value - Risk - Complexity

Weights: 30 / 20 / 15 / 15 / 10 / -5 / -5

---

## Definition of Done

The system is complete when it can:
- Analyze Milano's Pizza
- Analyze SAX Advisory Group
- Identify the primary constraint for each
- Recommend profit improvements backed by evidence
- Identify waste
- Recommend structured experiments
- Separate evidence from assumptions
- Produce a 30-day roadmap
- Produce a 90-day roadmap
- Explain how each action improves margin, quality, or customer value
