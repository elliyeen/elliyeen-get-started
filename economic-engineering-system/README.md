# Economic Engineering System

Multi-agent TypeScript runtime that runs 9 specialist economic engineering agents against a business brief and produces a ranked opportunity report.

## Setup

```bash
npm install
cp .env.example .env
# Add your ANTHROPIC_API_KEY to .env
```

## Usage

```bash
# Run with default brief (Milano's Pizza)
npm run dev

# Run with a specific brief
npm run dev -- --brief=./briefs/sax_advisory.json
npm run dev -- --brief=./briefs/milanos_pizza.json

# Build and run compiled output
npm run build
npm start -- --brief=./briefs/milanos_pizza.json
```

## Output

- Markdown report printed to stdout
- Full structured JSON saved to `output/result-{timestamp}.json`

## Architecture

9 specialist agents run in parallel, each analysing a different dimension of the business:

| Agent | Governing Question |
|---|---|
| Demand | Where is money already flowing and why? |
| Customer | What job is the customer trying to do? |
| Value Stream | Where is value lost between attention and outcome? |
| Constraint | What is the single bottleneck limiting profit? |
| Profit | How can margins be increased without adding cost? |
| Operations | Where is operational waste destroying margin? |
| Quality | Where is inconsistency costing trust and money? |
| Capital | Which investments produce the highest return? |
| Experiment | How do we test the top opportunity at minimum cost? |

The Conductor aggregates all outputs, ranks opportunities by Opportunity Score (0–100), and produces the final report.

## Brief Format

Briefs follow `schemas/business_profile.schema.json` in the `economic-engineering-agents/` directory. Required fields: `business_name`, `industry`, `business_model`, `primary_offer`, `current_goal`.
