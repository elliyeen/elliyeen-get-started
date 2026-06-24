import { BEHAVIOR_AUDIT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";
export async function runBehaviorAudit(brief, currentCopy, client) {
    const userMessage = `
COPY BRIEF:
Business: ${brief.businessName}
Industry: ${brief.industry}
Offer: ${brief.offer}
Target Audience: ${brief.audience}
Desired Behavior: ${brief.desiredBehavior}
Asset Type: ${brief.assetType}
Awareness Level: ${brief.awarenessLevel ?? "unknown"}
Market Sophistication: ${brief.marketSophistication ?? "unknown"}

COPY TO AUDIT:
${currentCopy}

Run a holistic behavioral movement audit on this copy. Score every stage 1-10. Identify where momentum breaks. Return your JSON assessment.
  `.trim();
    try {
        const response = await client.messages.create({
            model: "claude-sonnet-4-6",
            max_tokens: 1024,
            temperature: 0.2,
            system: BEHAVIOR_AUDIT_PROMPT,
            messages: [{ role: "user", content: userMessage }],
        });
        const text = response.content[0].type === "text" ? response.content[0].text : "";
        const parsed = parseJsonFromResponse(text);
        const stageBreakdown = {
            attention: 5,
            curiosity: 5,
            understanding: 5,
            desire: 5,
            belief: 5,
            trust: 5,
            friction: 5,
            action: 5,
            loyalty: 5,
            advocacy: 5,
            ...(parsed.stageBreakdown ?? {}),
        };
        const scores = Object.values(stageBreakdown);
        const overallScore = parsed.overallScore ??
            Math.round((scores.reduce((a, b) => a + b, 0) / scores.length) * 10) /
                10;
        const stageEntries = Object.entries(stageBreakdown);
        const weakest = parsed.weakestStage ??
            stageEntries.reduce((a, b) => (a[1] < b[1] ? a : b))[0];
        const strongest = parsed.strongestStage ??
            stageEntries.reduce((a, b) => (a[1] > b[1] ? a : b))[0];
        return {
            overallScore,
            weakestStage: weakest,
            strongestStage: strongest,
            mustFix: parsed.mustFix ?? [],
            stageBreakdown,
        };
    }
    catch (error) {
        console.error("[behavior_auditor] Audit failed:", error);
        return {
            overallScore: 5,
            weakestStage: "unknown",
            strongestStage: "unknown",
            mustFix: ["Behavior audit could not be completed — manual review required"],
            stageBreakdown: {
                attention: 5,
                curiosity: 5,
                understanding: 5,
                desire: 5,
                belief: 5,
                trust: 5,
                friction: 5,
                action: 5,
                loyalty: 5,
                advocacy: 5,
            },
        };
    }
}
