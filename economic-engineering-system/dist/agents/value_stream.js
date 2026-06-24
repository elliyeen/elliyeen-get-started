import { VALUE_STREAM_AGENT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";
export async function runValueStreamAgent(profile, client) {
    const userMessage = `
BUSINESS PROFILE:
${JSON.stringify(profile, null, 2)}

Analyse this business through the Value Stream Engineering lens.
Map every step from customer attention to fulfilled outcome. Classify each step as value-adding, necessary-waste, or pure-waste.
Identify the highest-waste step and biggest friction point. Return your JSON output.
Return valid JSON only — no prose outside the JSON block.
  `.trim();
    const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        temperature: 0.2,
        system: VALUE_STREAM_AGENT_PROMPT,
        messages: [{ role: "user", content: userMessage }],
    });
    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = parseJsonFromResponse(text);
    return {
        agent_name: parsed.agent_name ?? "value_stream",
        findings: parsed.findings ?? "No findings returned.",
        recommendations: parsed.recommendations ?? [],
        missing_data: parsed.missing_data ?? [],
        assumptions: parsed.assumptions ?? [],
        confidence_score: parsed.confidence_score ?? 0.3,
    };
}
