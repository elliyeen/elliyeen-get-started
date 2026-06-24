import Anthropic from "@anthropic-ai/sdk";
import type { BusinessProfile, AgentOutput } from "../types.js";
import { CAPITAL_AGENT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";

interface CapitalRaw extends AgentOutput {
  investment_ranking?: Array<{
    investment: string;
    estimated_roi: string;
    payback_period: string;
    risk_level: string;
    effort_level: string;
    expected_value_score: number;
    depends_on: string | null;
  }>;
}

export async function runCapitalAgent(
  profile: BusinessProfile,
  client: Anthropic
): Promise<AgentOutput> {
  const userMessage = `
BUSINESS PROFILE:
${JSON.stringify(profile, null, 2)}

Analyse this business through the Capital Allocation lens.
Identify all investment candidates. Rank by Expected Value (probability × upside − probability × downside).
Identify sequential dependencies. Sequence recommendations in dependency order. Return your JSON output.
Return valid JSON only — no prose outside the JSON block.
  `.trim();

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    temperature: 0.2,
    system: CAPITAL_AGENT_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = parseJsonFromResponse<CapitalRaw>(text);

  return {
    agent_name: parsed.agent_name ?? "capital",
    findings: parsed.findings ?? "No findings returned.",
    recommendations: parsed.recommendations ?? [],
    missing_data: parsed.missing_data ?? [],
    assumptions: parsed.assumptions ?? [],
    confidence_score: parsed.confidence_score ?? 0.3,
  };
}
