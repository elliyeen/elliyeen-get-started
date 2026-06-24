import Anthropic from "@anthropic-ai/sdk";
import type {
  BusinessProfile,
  AgentRecommendation,
  ExperimentOutput,
} from "../types.js";
import { EXPERIMENT_AGENT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";

export async function runExperimentAgent(
  profile: BusinessProfile,
  topOpportunity: AgentRecommendation,
  client: Anthropic
): Promise<ExperimentOutput> {
  const userMessage = `
BUSINESS PROFILE:
${JSON.stringify(profile, null, 2)}

TOP-RANKED OPPORTUNITY (design the first experiment around this):
${JSON.stringify(topOpportunity, null, 2)}

Design a minimum-cost, maximum-learning controlled experiment that validates this opportunity.
Use exactly one variable. Define a pre-determined decision rule for both success and failure.
Return your JSON output.
Return valid JSON only — no prose outside the JSON block.
  `.trim();

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    temperature: 0.2,
    system: EXPERIMENT_AGENT_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = parseJsonFromResponse<ExperimentOutput>(text);

  const fallbackExperiment = {
    experiment_name: "Validate top opportunity",
    hypothesis: "[ASSUMPTION] If we implement the top opportunity, revenue will improve within 30 days.",
    control: "Current baseline",
    variant: topOpportunity.recommendation,
    primary_metric: "Revenue or margin change",
    success_threshold: "Positive measurable change above baseline",
    minimum_sample_size: "[MISSING] — requires historical transaction data",
    test_duration: "30 days",
    decision_rule: {
      if_success: "Roll out to full operation",
      if_failure: "Return to baseline and test next opportunity",
    },
    risk_controls: ["Limit test to a subset of customers or time slots"],
    estimated_cost_to_run: "[ASSUMPTION] Minimal — primarily time cost",
    priority_rank: 1,
    assumptions: ["Top opportunity is implementable within 30 days"],
  };

  return {
    agent_name: parsed.agent_name ?? "experiment",
    findings: parsed.findings ?? "No findings returned.",
    recommended_first_experiment:
      parsed.recommended_first_experiment ?? fallbackExperiment,
    experiments: parsed.experiments ?? [fallbackExperiment],
    recommendations: parsed.recommendations ?? [],
    missing_data: parsed.missing_data ?? [],
    assumptions: parsed.assumptions ?? [],
    confidence_score: parsed.confidence_score ?? 0.3,
  };
}
