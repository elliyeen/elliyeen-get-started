import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import { runConductor } from "./conductor.js";
import { formatScorecardTable } from "./scoring/scorecard.js";
// ---------------------------------------------------------------------------
// Default sample brief — used when no --brief argument is provided
// ---------------------------------------------------------------------------
const DEFAULT_BRIEF = {
    businessName: "Savannah Personal Care Services",
    industry: "Home care / elder care",
    offer: "In-home personal care services for seniors — founded and led by Shannon Stafford Simpson, a Certified Nursing Assistant. The Shannon Standard: free same-day assessment, in-home evaluation within 24 hours, caregiver match within 48 hours, supervised first visit, 72-hour follow-up.",
    audience: "Adult daughters aged 45-62 managing a parent's care from near or far. At the kitchen table at 10:45pm. Something happened today. They need permission to stop carrying this alone.",
    desiredBehavior: "appointment",
    assetType: "landing page",
    trafficSource: "Google search / word of mouth",
    awarenessLevel: "problem_aware",
    marketSophistication: "stage_3",
    proofAssets: [
        "Shannon is a Certified Nursing Assistant (CNA) — not a business operator",
        "The Shannon Standard 5-step process",
        "Supervised first visit — every time",
        "72-hour written follow-up — scheduled, not optional",
    ],
    tone: "Warm, direct, honest. Like a trusted friend who knows this industry. Short sentences. No platitudes.",
    claimsAllowed: [
        "CNA-founded",
        "The Shannon Standard 5-step process",
        "Supervised first visit",
        "72-hour follow-up",
    ],
    claimsForbidden: [
        "#1 in Savannah",
        "guaranteed outcomes",
        "licensed by any specific body (unverified)",
        "specific number of clients served (unverified)",
    ],
};
// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------
function parseBriefFromArgs() {
    const args = process.argv.slice(2);
    const briefArg = args.find((a) => a.startsWith("--brief="));
    if (!briefArg) {
        process.stderr.write("[main] No --brief argument provided. Using default sample brief.\n");
        return DEFAULT_BRIEF;
    }
    const briefPath = briefArg.replace("--brief=", "");
    const resolved = path.resolve(briefPath);
    if (!fs.existsSync(resolved)) {
        throw new Error(`Brief file not found: ${resolved}`);
    }
    const raw = fs.readFileSync(resolved, "utf-8");
    return JSON.parse(raw);
}
// ---------------------------------------------------------------------------
// Output formatting
// ---------------------------------------------------------------------------
function formatOutput(result) {
    const fabricationAudit = result.auditResults[0];
    const fabricationStatus = fabricationAudit?.passed
        ? "PASSED — No fabricated claims detected."
        : `FAILED — ${fabricationAudit?.violations?.length ?? 0} violation(s) found.`;
    const violations = !fabricationAudit?.passed && fabricationAudit?.violations?.length
        ? fabricationAudit.violations.map((v) => `  - ${v}`).join("\n")
        : "";
    const scorecardTable = formatScorecardTable(result.scorecard, result.agentResults);
    const mustFix = result.agentResults
        .filter((r) => r.score < 6)
        .flatMap((r) => r.recommendations.slice(0, 2))
        .slice(0, 6)
        .map((fix) => `  - ${fix}`)
        .join("\n");
    const finalRecommendation = result.scorecard.overall >= 6.5
        ? `Copy passed quality thresholds after ${result.iterationsUsed} iteration(s). Overall score: ${result.scorecard.overall}/10.`
        : `Copy did not fully pass thresholds after ${result.iterationsUsed} iteration(s). Overall score: ${result.scorecard.overall}/10. Review required fixes and re-run.`;
    return `
# Final Copy

${result.finalCopy}

---

# Behavior Scorecard

${scorecardTable}

---

# Weakest Stage
**${result.weakestStage}** — This is where the most behavioral momentum is being lost. Fix this first.

# Strongest Stage
**${result.strongestStage}** — This is the copy's primary asset. Preserve it in all future rewrites.

# Required Fixes
${mustFix || "  No critical fixes required."}

# Fabrication Check
${fabricationStatus}
${violations}

# Final Recommendation
${finalRecommendation}

---

*Behavior Score: ${result.behaviorScore}/10 | Target Behavior: ${result.targetBehavior} | Asset: ${result.assetType} | Iterations: ${result.iterationsUsed}/${5}*
`.trim();
}
// ---------------------------------------------------------------------------
// Save result JSON
// ---------------------------------------------------------------------------
function saveResultJson(result) {
    const outputDir = path.resolve(path.dirname(new URL(import.meta.url).pathname), "..", "output");
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }
    const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
    const outPath = path.join(outputDir, `result-${timestamp}.json`);
    fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf-8");
    return outPath;
}
// ---------------------------------------------------------------------------
// Main entry point
// ---------------------------------------------------------------------------
async function main() {
    const apiKey = process.env["ANTHROPIC_API_KEY"];
    if (!apiKey) {
        throw new Error("ANTHROPIC_API_KEY environment variable is not set. Copy .env.example to .env and add your key.");
    }
    const client = new Anthropic({ apiKey });
    const brief = parseBriefFromArgs();
    process.stderr.write(`[main] Starting Copy Engineering System for: ${brief.businessName}\n`);
    process.stderr.write(`[main] Asset: ${brief.assetType} | Target behavior: ${brief.desiredBehavior}\n\n`);
    const result = await runConductor(brief, client);
    const formatted = formatOutput(result);
    console.log(formatted);
    const savedPath = saveResultJson(result);
    process.stderr.write(`\n[main] Full result JSON saved to: ${savedPath}\n`);
}
main().catch((err) => {
    console.error("[main] Fatal error:", err);
    process.exit(1);
});
