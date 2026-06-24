import Anthropic from "@anthropic-ai/sdk";
import type {
  BusinessProfile,
  AgentOutput,
  ConstraintOutput,
  ExperimentOutput,
  EconomicReport,
  WasteItem,
  QualityRisk,
  MissingDataItem,
  RoadmapRow30,
  RoadmapRow90,
} from "./types.js";
import { runDemandAgent } from "./agents/demand.js";
import { runCustomerAgent } from "./agents/customer.js";
import { runValueStreamAgent } from "./agents/value_stream.js";
import { runConstraintAgent } from "./agents/constraint.js";
import { runProfitAgent } from "./agents/profit.js";
import { runOperationsAgent } from "./agents/operations.js";
import { runQualityAgent } from "./agents/quality.js";
import { runCapitalAgent } from "./agents/capital.js";
import { runExperimentAgent } from "./agents/experiment.js";
import {
  rankOpportunities,
  computeOverallConfidence,
} from "./scoring/scorecard.js";
import { EXECUTIVE_SUMMARY_PROMPT } from "./prompts/agent_prompts.js";

// ---------------------------------------------------------------------------
// Validation
// ---------------------------------------------------------------------------

function validateProfile(profile: BusinessProfile): void {
  const required: (keyof BusinessProfile)[] = [
    "business_name",
    "industry",
    "business_model",
    "primary_offer",
    "current_goal",
  ];

  const missing = required.filter((field) => !profile[field]);
  if (missing.length > 0) {
    throw new Error(
      `BusinessProfile is missing required fields: ${missing.join(", ")}`
    );
  }
}

// ---------------------------------------------------------------------------
// Run all 8 primary agents in parallel (experiment agent runs after ranking)
// ---------------------------------------------------------------------------

async function runPrimaryAgents(
  profile: BusinessProfile,
  client: Anthropic
): Promise<{
  demand: AgentOutput;
  customer: AgentOutput;
  value_stream: AgentOutput;
  constraint: ConstraintOutput;
  profit: AgentOutput;
  operations: AgentOutput & { waste_identified: WasteItem[] };
  quality: AgentOutput & { quality_risks: QualityRisk[] };
  capital: AgentOutput;
}> {
  process.stderr.write("[conductor] Running 8 primary agents in parallel...\n");

  const [demand, customer, value_stream, constraint, profit, operations, quality, capital] =
    await Promise.all([
      runDemandAgent(profile, client),
      runCustomerAgent(profile, client),
      runValueStreamAgent(profile, client),
      runConstraintAgent(profile, client),
      runProfitAgent(profile, client),
      runOperationsAgent(profile, client),
      runQualityAgent(profile, client),
      runCapitalAgent(profile, client),
    ]);

  process.stderr.write("[conductor] All 8 primary agents complete.\n");

  return { demand, customer, value_stream, constraint, profit, operations, quality, capital };
}

// ---------------------------------------------------------------------------
// Generate executive summary
// ---------------------------------------------------------------------------

async function generateExecutiveSummary(
  report: Partial<EconomicReport>,
  client: Anthropic
): Promise<string> {
  const context = `
BUSINESS: ${report.business_name ?? "Unknown"}
ANALYSIS DATE: ${report.report_date ?? ""}
CONSTRAINT: ${report.primary_constraint?.name ?? "[MISSING]"} (${report.primary_constraint?.type ?? ""})
TOP OPPORTUNITY: ${report.top_opportunities?.[0]?.recommendation.recommendation ?? "[MISSING]"}
OVERALL CONFIDENCE: ${report.analysis_confidence?.toFixed(2) ?? "0.00"}

AGENT FINDINGS SUMMARY:
${report.all_agent_outputs
  ?.map((o) => `${o.agent_name.toUpperCase()}: ${o.findings}`)
  .join("\n\n") ?? ""}
  `.trim();

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 400,
    temperature: 0.2,
    system: EXECUTIVE_SUMMARY_PROMPT,
    messages: [{ role: "user", content: context }],
  });

  return response.content[0].type === "text"
    ? response.content[0].text
    : "[MISSING] Executive summary could not be generated.";
}

// ---------------------------------------------------------------------------
// Build roadmaps from ranked opportunities and constraint
// ---------------------------------------------------------------------------

function buildRoadmap30(
  opportunities: EconomicReport["top_opportunities"],
  constraint: ConstraintOutput
): RoadmapRow30[] {
  const rows: RoadmapRow30[] = [];

  rows.push({
    week: "Week 1",
    action: `Collect missing data identified in report. Confirm primary constraint: ${constraint.primary_constraint.name}.`,
    owner: "Owner / Manager",
    expected_output: "Data gap list closed or prioritised. Constraint confirmed.",
  });

  if (opportunities[0]) {
    rows.push({
      week: "Week 2",
      action: `Set up experiment for Opportunity #1: ${opportunities[0].recommendation.recommendation.slice(0, 100)}`,
      owner: "Owner",
      expected_output: "Experiment running. Baseline metric recorded.",
    });
  }

  rows.push({
    week: "Week 3",
    action: "Monitor experiment. Record daily results against success threshold.",
    owner: "Owner / Manager",
    expected_output: "Mid-point data collected. Early signal on direction.",
  });

  rows.push({
    week: "Week 4",
    action: "Evaluate experiment result. Apply decision rule (if_success or if_failure path).",
    owner: "Owner",
    expected_output: "Decision made. Next action defined based on experiment outcome.",
  });

  return rows;
}

function buildRoadmap90(
  opportunities: EconomicReport["top_opportunities"],
  constraint: ConstraintOutput
): RoadmapRow90[] {
  const rows: RoadmapRow90[] = [];

  rows.push({
    month: "Month 1",
    action: `Exploit constraint (${constraint.primary_constraint.name}). Run experiment on Opportunity #1.`,
    depends_on: "—",
    expected_output: "Constraint exploitation underway. First experiment result in.",
  });

  rows.push({
    month: "Month 2",
    action:
      opportunities[1]
        ? `Roll out Opportunity #1 if successful. Begin experiment on Opportunity #2: ${opportunities[1].recommendation.recommendation.slice(0, 80)}`
        : "Roll out Opportunity #1 if successful. Identify next highest-leverage action.",
    depends_on: "Month 1 experiment result",
    expected_output: "Opportunity #1 either scaled or abandoned. Opportunity #2 in test.",
  });

  rows.push({
    month: "Month 3",
    action:
      opportunities[2]
        ? `Scale proven wins. Begin experiment on Opportunity #3: ${opportunities[2].recommendation.recommendation.slice(0, 80)}`
        : "Scale proven wins. Reassess constraint — determine if a new constraint has emerged.",
    depends_on: "Month 2 result",
    expected_output:
      "2–3 validated improvements compounding. Margin impact measurable. Next constraint identified.",
  });

  return rows;
}

// ---------------------------------------------------------------------------
// Aggregate all missing data from agent outputs
// ---------------------------------------------------------------------------

function aggregateMissingData(agentOutputs: AgentOutput[]): MissingDataItem[] {
  const seen = new Set<string>();
  const items: MissingDataItem[] = [];

  agentOutputs.forEach((output) => {
    output.missing_data.forEach((item) => {
      if (!seen.has(item)) {
        seen.add(item);
        items.push({
          data_needed: item,
          why_it_matters: `Required by ${output.agent_name} agent for accurate analysis`,
          how_to_get_it: "Pull from POS, CRM, accounting software, or direct measurement",
          priority: "High",
        });
      }
    });

    output.recommendations.forEach((rec) => {
      rec.missing_data?.forEach((item) => {
        if (!seen.has(item)) {
          seen.add(item);
          items.push({
            data_needed: item,
            why_it_matters: `Needed to validate: ${rec.recommendation.slice(0, 60)}`,
            how_to_get_it: "Pull from operational records or run a measurement exercise",
            priority: "Med",
          });
        }
      });
    });
  });

  return items.slice(0, 12);
}

// ---------------------------------------------------------------------------
// Aggregate all assumptions
// ---------------------------------------------------------------------------

function aggregateAssumptions(agentOutputs: AgentOutput[]): string[] {
  const seen = new Set<string>();
  const all: string[] = [];

  agentOutputs.forEach((output) => {
    output.assumptions.forEach((a) => {
      if (!seen.has(a)) {
        seen.add(a);
        all.push(a);
      }
    });
  });

  return all.slice(0, 15);
}

// ---------------------------------------------------------------------------
// Main conductor
// ---------------------------------------------------------------------------

export async function runConductor(
  profile: BusinessProfile,
  client: Anthropic
): Promise<EconomicReport> {
  validateProfile(profile);

  process.stderr.write(
    `[conductor] Starting Economic Engineering System for: ${profile.business_name}\n`
  );

  // Step 1 — Run 8 primary agents in parallel
  const { demand, customer, value_stream, constraint, profit, operations, quality, capital } =
    await runPrimaryAgents(profile, client);

  const primaryOutputs: AgentOutput[] = [
    demand,
    customer,
    value_stream,
    constraint,
    profit,
    operations,
    quality,
    capital,
  ];

  // Step 2 — Rank all opportunities
  process.stderr.write("[conductor] Ranking opportunities...\n");
  const rankedOpportunities = rankOpportunities(primaryOutputs);

  process.stderr.write(
    `[conductor] ${rankedOpportunities.length} opportunities ranked. Top score: ${rankedOpportunities[0]?.opportunity_score ?? 0}/100\n`
  );

  // Step 3 — Run experiment agent against top-ranked opportunity
  const topOpportunity = rankedOpportunities[0]?.recommendation;
  let experimentOutput: ExperimentOutput | null = null;

  if (topOpportunity) {
    process.stderr.write("[conductor] Running experiment agent on top opportunity...\n");
    experimentOutput = await runExperimentAgent(profile, topOpportunity, client);
    process.stderr.write("[conductor] Experiment agent complete.\n");
  }

  const allOutputs: AgentOutput[] = experimentOutput
    ? [...primaryOutputs, experimentOutput]
    : primaryOutputs;

  // Step 4 — Aggregate waste and quality risks
  const wasteFound: WasteItem[] = operations.waste_identified ?? [];
  const qualityRisks: QualityRisk[] = quality.quality_risks ?? [];

  // Step 5 — Compute overall confidence
  const analysisConfidence = computeOverallConfidence(allOutputs);

  // Step 6 — Build partial report for executive summary
  const partialReport: Partial<EconomicReport> = {
    business_name: profile.business_name,
    report_date: new Date().toISOString().split("T")[0],
    primary_constraint: constraint.primary_constraint,
    top_opportunities: rankedOpportunities.slice(0, 3),
    analysis_confidence: analysisConfidence,
    all_agent_outputs: allOutputs,
  };

  // Step 7 — Generate executive summary
  process.stderr.write("[conductor] Generating executive summary...\n");
  const executiveSummary = await generateExecutiveSummary(partialReport, client);
  process.stderr.write("[conductor] Executive summary complete.\n");

  // Step 8 — Build roadmaps
  const roadmap30 = buildRoadmap30(rankedOpportunities.slice(0, 3), constraint);
  const roadmap90 = buildRoadmap90(rankedOpportunities.slice(0, 3), constraint);

  // Step 9 — Aggregate missing data and assumptions
  const missingData = aggregateMissingData(allOutputs);
  const assumptionsLog = aggregateAssumptions(allOutputs);

  // Step 10 — Assemble final report
  const report: EconomicReport = {
    business_name: profile.business_name,
    report_date: partialReport.report_date ?? new Date().toISOString().split("T")[0],
    analysis_confidence: analysisConfidence,
    executive_summary: executiveSummary,
    current_state: {
      estimated_revenue: profile.financials?.annual_revenue
        ? `$${profile.financials.annual_revenue.toLocaleString()}/year`
        : "[MISSING]",
      estimated_gross_margin: profile.financials?.gross_margin_percent
        ? `${profile.financials.gross_margin_percent}%`
        : "[MISSING]",
      primary_revenue_driver:
        profile.revenue_streams?.[0]?.name ?? profile.primary_offer,
      throughput: profile.financials?.monthly_transactions_or_clients
        ? `${profile.financials.monthly_transactions_or_clients} transactions/month`
        : "[MISSING]",
      quality_score: "[ASSUMPTION] — See Quality Agent findings",
      strengths: demand.findings ? [demand.findings.split(".")[0]] : [],
      weaknesses: profile.current_challenges ?? [],
    },
    primary_constraint: constraint.primary_constraint,
    top_opportunities: rankedOpportunities.slice(0, 3),
    waste_found: wasteFound,
    quality_risks: qualityRisks,
    recommended_first_experiment:
      experimentOutput?.recommended_first_experiment ?? null,
    expected_margin_impact: rankedOpportunities
      .slice(0, 3)
      .map((opp) => {
        const impact = opp.recommendation.business_impact;
        const impacts = [
          impact.gross_margin_impact,
          impact.net_margin_impact,
          impact.revenue_impact,
        ]
          .filter(Boolean)
          .join("; ");
        return `Opportunity ${opp.rank} (score ${opp.opportunity_score}/100): ${impacts || "[ASSUMPTION] — estimate pending experiment validation"}`;
      })
      .join("\n"),
    missing_data: missingData,
    roadmap_30_day: roadmap30,
    roadmap_90_day: roadmap90,
    assumptions_log: assumptionsLog,
    all_agent_outputs: allOutputs,
  };

  process.stderr.write(
    `[conductor] Report complete. Overall confidence: ${analysisConfidence.toFixed(2)}\n`
  );

  return report;
}
