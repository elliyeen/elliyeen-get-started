import { CONSTRAINT_AGENT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";
export async function runConstraintAgent(profile, client) {
    const userMessage = `
BUSINESS PROFILE:
${JSON.stringify(profile, null, 2)}

Analyse this business through the Constraint Engineering lens.
Apply Goldratt's 5 Focusing Steps. Identify the single bottleneck limiting profit.
Provide exploitation options first, elevation options second. Return your JSON output.
Return valid JSON only — no prose outside the JSON block.
  `.trim();
    const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        temperature: 0.2,
        system: CONSTRAINT_AGENT_PROMPT,
        messages: [{ role: "user", content: userMessage }],
    });
    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = parseJsonFromResponse(text);
    return {
        agent_name: parsed.agent_name ?? "constraint",
        findings: parsed.findings ?? "No findings returned.",
        primary_constraint: parsed.primary_constraint ?? {
            name: "Unknown",
            type: "demand",
            description: "[MISSING] Constraint could not be identified from available data.",
            estimated_profit_impact: "[MISSING]",
            confidence: 0.2,
        },
        exploitation_options: parsed.exploitation_options ?? [],
        elevation_options: parsed.elevation_options ?? [],
        throughput_ceiling: parsed.throughput_ceiling ?? "[MISSING]",
        recommendations: parsed.recommendations ?? [],
        missing_data: parsed.missing_data ?? [],
        assumptions: parsed.assumptions ?? [],
        confidence_score: parsed.confidence_score ?? 0.3,
    };
}
