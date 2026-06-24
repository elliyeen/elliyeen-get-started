import { runAttentionAgent } from "./agents/attention.js";
import { runCuriosityAgent } from "./agents/curiosity.js";
import { runUnderstandingAgent } from "./agents/understanding.js";
import { runDesireAgent } from "./agents/desire.js";
import { runBeliefAgent } from "./agents/belief.js";
import { runTrustAgent } from "./agents/trust.js";
import { runFrictionAgent } from "./agents/friction.js";
import { runActionAgent } from "./agents/action.js";
import { runLoyaltyAgent } from "./agents/loyalty.js";
import { runAdvocacyAgent } from "./agents/advocacy.js";
import { runNoFabricationAudit } from "./auditors/no_fabrication.js";
import { runBehaviorAudit } from "./auditors/behavior_auditor.js";
import { buildScorecard, passesThreshold, getWeakestStage, getStrongestStage, } from "./scoring/scorecard.js";
import { DRAFT_COPY_PROMPT, REWRITE_PROMPT } from "./prompts/agent_prompts.js";
const MAX_ITERATIONS = 5;
/**
 * Validate that a brief has all required fields.
 */
function validateBrief(brief) {
    const required = [
        "businessName",
        "industry",
        "offer",
        "audience",
        "desiredBehavior",
        "assetType",
    ];
    const missing = required.filter((field) => !brief[field]);
    if (missing.length > 0) {
        throw new Error(`CopyBrief is missing required fields: ${missing.join(", ")}`);
    }
}
/**
 * Generate an initial copy draft from the brief using Claude.
 */
async function generateInitialDraft(brief, client) {
    const userMessage = `
COPY BRIEF:
Business Name: ${brief.businessName}
Industry: ${brief.industry}
Offer: ${brief.offer}
Target Audience: ${brief.audience}
Desired Behavior: ${brief.desiredBehavior}
Asset Type: ${brief.assetType}
Traffic Source: ${brief.trafficSource ?? "not specified"}
Awareness Level: ${brief.awarenessLevel ?? "not specified"}
Market Sophistication: ${brief.marketSophistication ?? "not specified"}
Tone: ${brief.tone ?? "not specified"}
Proof Assets: ${brief.proofAssets?.join(", ") ?? "none specified"}
Constraints: ${brief.constraints?.join(", ") ?? "none"}
Claims Allowed: ${brief.claimsAllowed?.join(", ") ?? "not specified"}
Claims Forbidden: ${brief.claimsForbidden?.join(", ") ?? "none"}
${brief.existingCopy ? `\nEXISTING COPY TO IMPROVE:\n${brief.existingCopy}` : ""}

Write complete ${brief.assetType} copy for this brief. Include headline, body, and CTA. Plain text only.
  `.trim();
    const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        temperature: 0.7,
        system: DRAFT_COPY_PROMPT,
        messages: [{ role: "user", content: userMessage }],
    });
    return response.content[0].type === "text" ? response.content[0].text : "";
}
/**
 * Run all 10 behavioral agents in parallel and return their results.
 */
async function runAllAgents(brief, copy, client) {
    const [attention, curiosity, understanding, desire, belief, trust, friction, action, loyalty, advocacy,] = await Promise.all([
        runAttentionAgent(brief, copy, client),
        runCuriosityAgent(brief, copy, client),
        runUnderstandingAgent(brief, copy, client),
        runDesireAgent(brief, copy, client),
        runBeliefAgent(brief, copy, client),
        runTrustAgent(brief, copy, client),
        runFrictionAgent(brief, copy, client),
        runActionAgent(brief, copy, client),
        runLoyaltyAgent(brief, copy, client),
        runAdvocacyAgent(brief, copy, client),
    ]);
    const toAgentResult = (name, raw) => ({
        agentName: name,
        score: raw.score,
        notes: [raw.reason],
        recommendations: raw.recommendations,
        output: raw.output,
        raw,
    });
    return [
        toAgentResult("attention", attention),
        toAgentResult("curiosity", curiosity),
        toAgentResult("understanding", understanding),
        toAgentResult("desire", desire),
        toAgentResult("belief", belief),
        toAgentResult("trust", trust),
        toAgentResult("friction", friction),
        toAgentResult("action", action),
        toAgentResult("loyalty", loyalty),
        toAgentResult("advocacy", advocacy),
    ];
}
/**
 * Rewrite copy using all agent feedback, prioritising the weakest stages.
 */
async function rewriteWithFeedback(brief, currentCopy, agentResults, iteration, client) {
    // Sort results by score ascending so weakest agents appear first
    const sorted = [...agentResults].sort((a, b) => a.score - b.score);
    const feedbackBlock = sorted
        .map((r) => {
        const recList = r.recommendations.map((rec) => `  - ${rec}`).join("\n");
        return `${r.agentName.toUpperCase()} AGENT (score: ${r.score}/10):\nReason: ${r.notes[0] ?? ""}\nRecommendations:\n${recList}\nSuggested rewrite fragment:\n${r.output}`;
    })
        .join("\n\n---\n\n");
    const userMessage = `
COPY BRIEF:
Business: ${brief.businessName}
Industry: ${brief.industry}
Offer: ${brief.offer}
Target Audience: ${brief.audience}
Desired Behavior: ${brief.desiredBehavior}
Asset Type: ${brief.assetType}
Tone: ${brief.tone ?? "not specified"}
Proof Assets: ${brief.proofAssets?.join(", ") ?? "none"}
Claims Forbidden: ${brief.claimsForbidden?.join(", ") ?? "none"}

CURRENT COPY (iteration ${iteration}):
${currentCopy}

AGENT FEEDBACK (ordered from weakest to strongest):
${feedbackBlock}

Rewrite the complete copy addressing all agent feedback. Focus hardest on the lowest-scoring agents. Return plain text only.
  `.trim();
    const response = await client.messages.create({
        model: "claude-sonnet-4-6",
        max_tokens: 2048,
        temperature: 0.7,
        system: REWRITE_PROMPT,
        messages: [{ role: "user", content: userMessage }],
    });
    return response.content[0].type === "text" ? response.content[0].text : currentCopy;
}
/**
 * Log iteration summary to stderr.
 */
function logIteration(iteration, overall, agentResults, passes) {
    const scores = agentResults
        .map((r) => `${r.agentName}:${r.score}`)
        .join("  ");
    process.stderr.write(`[conductor] Iteration ${iteration} — overall:${overall}  ${scores}  ${passes ? "PASS" : "FAIL"}\n`);
}
/**
 * Main conductor: orchestrates all agents in an improvement loop.
 */
export async function runConductor(brief, client) {
    validateBrief(brief);
    let currentCopy = brief.existingCopy ?? "";
    let iterationsUsed = 0;
    let agentResults = [];
    let auditResults = [];
    let fabricationPassed = true;
    // Generate initial draft if no existing copy provided
    if (!currentCopy) {
        process.stderr.write("[conductor] Generating initial copy draft...\n");
        currentCopy = await generateInitialDraft(brief, client);
        process.stderr.write("[conductor] Draft generated.\n");
    }
    for (let i = 1; i <= MAX_ITERATIONS; i++) {
        iterationsUsed = i;
        process.stderr.write(`\n[conductor] === Iteration ${i} ===\n`);
        // Run all 10 agents in parallel
        agentResults = await runAllAgents(brief, currentCopy, client);
        // Run audits
        const [fabricationAudit, behaviorAudit] = await Promise.all([
            runNoFabricationAudit(brief, currentCopy, client),
            runBehaviorAudit(brief, currentCopy, client),
        ]);
        fabricationPassed = fabricationAudit.passed;
        auditResults = [fabricationAudit];
        // Build scorecard
        const scorecard = buildScorecard(agentResults);
        const passes = passesThreshold(scorecard) && fabricationPassed;
        logIteration(i, scorecard.overall, agentResults, passes);
        // Log fabrication status
        if (!fabricationPassed) {
            process.stderr.write(`[conductor] Fabrication violations: ${fabricationAudit.violations.join(" | ")}\n`);
        }
        // Log behavior audit must-fixes
        if (behaviorAudit.mustFix.length > 0) {
            process.stderr.write(`[conductor] Behavior audit must-fix: ${behaviorAudit.mustFix.slice(0, 2).join(" | ")}\n`);
        }
        if (passes) {
            process.stderr.write(`[conductor] Copy passed all thresholds at iteration ${i}.\n`);
            const finalScorecard = buildScorecard(agentResults);
            return {
                targetBehavior: brief.desiredBehavior,
                assetType: brief.assetType,
                finalCopy: currentCopy,
                behaviorScore: finalScorecard.overall,
                weakestStage: getWeakestStage(finalScorecard),
                strongestStage: getStrongestStage(finalScorecard),
                agentResults,
                auditResults,
                iterationsUsed,
                scorecard: finalScorecard,
            };
        }
        if (i < MAX_ITERATIONS) {
            process.stderr.write(`[conductor] Rewriting copy with agent feedback...\n`);
            // If fabrication violations exist and a safe rewrite is available, use it
            if (!fabricationPassed && fabricationAudit.safeRewrite) {
                currentCopy = fabricationAudit.safeRewrite;
            }
            currentCopy = await rewriteWithFeedback(brief, currentCopy, agentResults, i, client);
        }
    }
    // Max iterations reached — return best result
    process.stderr.write(`[conductor] Max iterations (${MAX_ITERATIONS}) reached. Returning best result.\n`);
    const finalScorecard = buildScorecard(agentResults);
    return {
        targetBehavior: brief.desiredBehavior,
        assetType: brief.assetType,
        finalCopy: currentCopy,
        behaviorScore: finalScorecard.overall,
        weakestStage: getWeakestStage(finalScorecard),
        strongestStage: getStrongestStage(finalScorecard),
        agentResults,
        auditResults,
        iterationsUsed,
        scorecard: finalScorecard,
    };
}
