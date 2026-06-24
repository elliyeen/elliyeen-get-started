import Anthropic from "@anthropic-ai/sdk";
import type { CopyBrief, AuditResult } from "../types.js";
import { NO_FABRICATION_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";

export async function runNoFabricationAudit(
  brief: CopyBrief,
  currentCopy: string,
  client: Anthropic
): Promise<AuditResult> {
  const userMessage = `
COPY BRIEF:
Business: ${brief.businessName}
Industry: ${brief.industry}
Offer: ${brief.offer}
Claims Allowed: ${brief.claimsAllowed?.join(", ") ?? "not specified — treat all unsourced claims with scrutiny"}
Claims Forbidden: ${brief.claimsForbidden?.join(", ") ?? "none listed"}
Proof Assets Available: ${brief.proofAssets?.join(", ") ?? "none listed"}

COPY TO AUDIT:
${currentCopy}

Audit this copy for fabricated claims, unsupported statistics, and legal risks. Return your JSON assessment.
  `.trim();

  try {
    const response = await client.messages.create({
      model: "claude-sonnet-4-6",
      max_tokens: 1024,
      temperature: 0.2,
      system: NO_FABRICATION_PROMPT,
      messages: [{ role: "user", content: userMessage }],
    });

    const text =
      response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = parseJsonFromResponse<AuditResult>(text);

    return {
      passed: parsed.passed ?? true,
      violations: parsed.violations ?? [],
      safeRewrite: parsed.safeRewrite,
      notes: parsed.notes ?? [],
    };
  } catch (error) {
    console.error("[no_fabrication] Audit failed:", error);
    return {
      passed: false,
      violations: ["Audit could not be completed due to an API error"],
      notes: ["Manual review required"],
    };
  }
}
