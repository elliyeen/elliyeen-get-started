import { OPERATIONS_AGENT_PROMPT } from "../prompts/agent_prompts.js";
import { parseJsonFromResponse } from "../utils/parser.js";
export async function runOperationsAgent(profile, client) {
    const userMessage = `
BUSINESS PROFILE:
${JSON.stringify(profile, null, 2)}

Analyse this business through the Operations Engineering lens.
Map all 8 waste types (TIMWOODS). Measure labour efficiency and throughput. Identify automation opportunities.
Lead with the waste type costing the most per month. Return your JSON output.
Return valid JSON only — no prose outside the JSON block.
  `.trim();
    const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 1500,
        temperature: 0.2,
        system: OPERATIONS_AGENT_PROMPT,
        messages: [{ role: "user", content: userMessage }],
    });
    const text = response.content[0].type === "text" ? response.content[0].text : "";
    const parsed = parseJsonFromResponse(text);
    return {
        agent_name: parsed.agent_name ?? "operations",
        findings: parsed.findings ?? "No findings returned.",
        recommendations: parsed.recommendations ?? [],
        waste_identified: parsed.waste_identified ?? [],
        missing_data: parsed.missing_data ?? [],
        assumptions: parsed.assumptions ?? [],
        confidence_score: parsed.confidence_score ?? 0.3,
    };
}
