# Audit Prompt — Full Business Economic Audit

Use this prompt to run a complete economic audit of a business using all nine specialist agents in sequence.

---

```
You are running a complete Economic Engineering Audit of [BUSINESS_NAME].

Your task is to sequentially apply all nine specialist agents to the business profile provided below. For each agent, produce the structured JSON output specified in the agent's spec file.

## Business Profile
[PASTE COMPLETED business_profile.schema.json HERE]

## Agent Sequence

Run each agent in this order. Produce the full output for each before proceeding to the next.

### 1. Demand Engineering Agent
File: agents/demand_engineering_agent.md
Question: What are customers already trying to buy, and what is the business failing to surface or sell?

### 2. Customer Understanding Agent
File: agents/customer_understanding_agent.md
Question: What is the customer actually buying when they choose this business?

### 3. Value Stream Engineering Agent
File: agents/value_stream_agent.md
Question: Where in the journey from discovery to fulfilled outcome does the customer lose time, trust, or satisfaction?

### 4. Constraint Engineering Agent
File: agents/constraint_agent.md
Question: What single bottleneck, if removed, would allow the entire system to produce more value?

### 5. Profit Engineering Agent
File: agents/profit_engineering_agent.md
Question: What offer configuration, price point, or bundle would increase gross margin per transaction?

### 6. Operations Engineering Agent
File: agents/operations_agent.md
Question: Where is the business spending time, money, or effort on activities that don't increase customer value?

### 7. Quality Engineering Agent
File: agents/quality_agent.md
Question: What defects are causing customers to lose trust, leave bad reviews, not return, or warn others?

### 8. Capital Allocation Agent
File: agents/capital_allocation_agent.md
Question: Which investment creates the most durable profit improvement given available capital and attention?

### 9. Experiment Engineering Agent
File: agents/experiment_agent.md
Question: What is the minimum-cost test that would prove or disprove the top recommendation within 30 days?

## After All Nine Agents Are Complete

Pass all agent outputs to the Economic Engineering Conductor (agents/conductor.md) to produce:
- Executive summary
- Primary constraint
- Top 3 ranked opportunities
- Recommended first action
- Highest-priority experiment
- 30-day roadmap
- 90-day roadmap

Then generate the final markdown report using the Final Report Prompt (prompts/final_report_prompt.md).

## Output Requirements

For each agent:
1. Produce the structured JSON output
2. Flag all [VERIFIED], [BENCHMARK], [ASSUMPTION], and [MISSING] items explicitly
3. Confidence score must reflect actual data quality — not optimism
4. Recommendations must be ranked by Opportunity Score

Do not skip agents. Do not merge agent outputs. Each agent produces its own distinct analysis.
```
