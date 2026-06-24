import Anthropic from "@anthropic-ai/sdk";
import type { BusinessProfile, AgentOutput } from "../types.js";
import { DEMAND_AGENT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";

export async function runDemandAgent(
  profile: BusinessProfile,
  client: Anthropic
): Promise<AgentOutput> {
  const userMessage = `
BUSINESS PROFILE:
${JSON.stringify(profile, null, 2)}

Analyse this business through the Demand Engineering lens.
Identify where money is already flowing, find the demand-margin intersection, and return your JSON output.
Return valid JSON only — no prose outside the JSON block.
  `.trim();

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    temperature: 0.2,
    system: DEMAND_AGENT_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = parseJsonFromResponse<AgentOutput>(text);

  return {
    agent_name: parsed.agent_name ?? "demand",
    findings: parsed.findings ?? "No findings returned.",
    recommendations: parsed.recommendations ?? [],
    missing_data: parsed.missing_data ?? [],
    assumptions: parsed.assumptions ?? [],
    confidence_score: parsed.confidence_score ?? 0.3,
  };
}
