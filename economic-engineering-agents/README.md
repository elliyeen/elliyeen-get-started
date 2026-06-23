# Economic Engineering Agents

A multi-agent system that helps any business increase profits by scientifically improving demand, value streams, constraints, pricing, offers, operations, quality, capital allocation, and experiments.

---

## Core Principle

```
Profit = Value Created × Quality × Throughput × Customer Satisfaction × Learning
         -------------------------------------------------------------------------
                                        Waste
```

The system optimizes for higher margins, higher customer value, lower waste, better quality, faster throughput, better decision-making, and repeatable experiments.

---

## System Architecture

```
Economic Engineering Conductor
│
├── Demand Engineering Agent
├── Customer Understanding Agent
├── Value Stream Engineering Agent
├── Constraint Engineering Agent
├── Profit Engineering Agent
├── Operations Engineering Agent
├── Quality Engineering Agent
├── Capital Allocation Agent
└── Experiment Engineering Agent
```

The Conductor coordinates all agents and produces one executive recommendation:

> What should the business improve first to create the largest verified profit impact?

---

## Agent Files

| Agent | File | Mission |
|---|---|---|
| Conductor | `agents/conductor.md` | Coordinate all agents, determine highest-leverage improvement |
| Demand Engineering | `agents/demand_engineering_agent.md` | Find what customers already want and where money is flowing |
| Customer Understanding | `agents/customer_understanding_agent.md` | Understand the human reasons people buy |
| Value Stream Engineering | `agents/value_stream_agent.md` | Map how value flows from attention to fulfilled outcome |
| Constraint Engineering | `agents/constraint_agent.md` | Find the one bottleneck limiting profit growth |
| Profit Engineering | `agents/profit_engineering_agent.md` | Increase margins through pricing, packaging, bundling, upsells |
| Operations Engineering | `agents/operations_agent.md` | Reduce operational waste while increasing throughput |
| Quality Engineering | `agents/quality_agent.md` | Improve consistency, trust, and customer satisfaction |
| Capital Allocation | `agents/capital_allocation_agent.md` | Rank business investments by return, risk, and payback |
| Experiment Engineering | `agents/experiment_agent.md` | Turn recommendations into controlled tests |

---

## Schemas

| Schema | File |
|---|---|
| Business Profile | `schemas/business_profile.schema.json` |
| Recommendation | `schemas/recommendation.schema.json` |
| Experiment | `schemas/experiment.schema.json` |
| Final Report | `schemas/final_report.schema.json` |

---

## Test Cases

| Business | File | Objective |
|---|---|---|
| Milano's Pizza | `test_cases/milanos_pizza.md` | Increase profit without guessing |
| SAX Advisory Group | `test_cases/sax_advisory_group.md` | Attract and convert more high-net-worth professionals |

---

## Prompts

| Prompt | File | Purpose |
|---|---|---|
| System | `prompts/system_prompt.md` | Master system prompt for all agents |
| Audit | `prompts/audit_prompt.md` | Prompt for running a full business audit |
| Final Report | `prompts/final_report_prompt.md` | Prompt for generating the executive report |

---

## Outputs

Generated reports live in `outputs/`.

---

## Non-Negotiables

**Agents must never:**
- Invent financial data
- Claim certainty without evidence
- Recommend changes without testing
- Optimize revenue while destroying quality
- Increase complexity without profit justification
- Create more agents unless necessary

**Agents must always:**
- Think in systems
- Seek higher margins
- Reduce waste
- Protect customer trust
- Improve quality
- Use experiments
- Show assumptions
- Rank recommendations by impact

---

## Scoring System

Each opportunity is scored 0–100:

```
Opportunity Score =
  Profit Impact (30)
+ Customer Value (20)
+ Speed to Implement (15)
+ Confidence (15)
+ Strategic Value (10)
- Risk Penalty (5)
- Complexity Penalty (5)
```
