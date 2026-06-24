import Anthropic from "@anthropic-ai/sdk";
import type { CopyBrief, FrictionScore } from "../types.js";
import { FRICTION_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";

export async function runFrictionAgent(
  brief: CopyBrief,
  currentCopy: string,
  client: Anthropic
): Promise<FrictionScore> {
  const userMessage = `
COPY BRIEF:
Business: ${brief.businessName}
Industry: ${brief.industry}
Offer: ${brief.offer}
Target Audience: ${brief.audience}
Desired Behavior: ${brief.desiredBehavior}
Asset Type: ${brief.assetType}
Constraints: ${brief.constraints?.join(", ") ?? "none specified"}

COPY TO EVALUATE:
${currentCopy}

Evaluate this copy through the Friction lens and return your JSON assessment.
  `.trim();

  const response = await client.messages.create({
    model: "claude-sonnet-4-6",
    max_tokens: 1024,
    temperature: 0.2,
    system: FRICTION_PROMPT,
    messages: [{ role: "user", content: userMessage }],
  });

  const text =
    response.content[0].type === "text" ? response.content[0].text : "";
  const parsed = parseJsonFromResponse<FrictionScore>(text);

  return {
    score: parsed.score ?? 5,
    reason: parsed.reason ?? "No reason provided",
    recommendations: parsed.recommendations ?? [],
    output: parsed.output ?? "",
    frictionPoints: parsed.frictionPoints ?? [],
    recommendedFixes: parsed.recommendedFixes ?? [],
  };
}
