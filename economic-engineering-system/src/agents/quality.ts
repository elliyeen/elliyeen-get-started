import Anthropic from "@anthropic-ai/sdk";
import type { BusinessProfile, AgentOutput, QualityRisk } from "../types.js";
import { QUALITY_AGENT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";

interface QualityRaw extends AgentOutput {
  quality_scores?: Array<{ dimension: string; score: number; evidence: string }>;
  quality_risks?: QualityRisk[];
}

export async function runQualityAgent(
  profile: BusinessProfile,
  client: Anthropic
): Promise<AgentOutput & { quality_risks: QualityRisk[] }> {
  const userMessage = `
BUSINESS PROFILE:
${JSON.stringify(profile, null, 2)}

Analyse this business through the Quality Engineering lens.
Categorise defect types. Run 5-Whys on the top defect. Estimate the financial impact of each quality failure.
Design a prevention system with standard, measurement, and accountability. Return your JSON output.
Return valid JSON only — no prose outside the JSON block.
  `.trim();

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1500,
    temperature: 0.2,
    system: QUALITY_AGENT_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = parseJsonFromResponse<QualityRaw>(text);

  return {
    agent_name: parsed.agent_name ?? "quality",
    findings: parsed.findings ?? "No findings returned.",
    recommendations: parsed.recommendations ?? [],
    quality_risks: parsed.quality_risks ?? [],
    missing_data: parsed.missing_data ?? [],
    assumptions: parsed.assumptions ?? [],
    confidence_score: parsed.confidence_score ?? 0.3,
  };
}
