import Anthropic from "@anthropic-ai/sdk";
import fs from "node:fs";
import path from "node:path";
import { runConductor } from "./conductor.js";
import { generateMarkdownReport } from "./report/report.js";
import { formatOpportunityTable } from "./scoring/scorecard.js";
import type { BusinessProfile, EconomicReport } from "./types.js";

// ---------------------------------------------------------------------------
// Default brief — Milano's Pizza (used when no --brief argument is provided)
// ---------------------------------------------------------------------------

const DEFAULT_BRIEF_PATH = "./briefs/milanos_pizza.json";

// ---------------------------------------------------------------------------
// CLI argument parsing
// ---------------------------------------------------------------------------

function parseBriefFromArgs(): BusinessProfile {
  const args = process.argv.slice(2);
  const briefArg = args.find((a) => a.startsWith("--brief="));

  const briefPath = briefArg
    ? briefArg.replace("--brief=", "")
    : DEFAULT_BRIEF_PATH;

  const resolved = path.resolve(briefPath);

  if (!fs.existsSync(resolved)) {
    throw new Error(`Brief file not found: ${resolved}`);
  }

  if (!briefArg) {
    process.stderr.write(
      `[main] No --brief argument provided. Using default: ${resolved}\n`
    );
  }

  const raw = fs.readFileSync(resolved, "utf-8");
  return JSON.parse(raw) as BusinessProfile;
}

// ---------------------------------------------------------------------------
// Save result JSON
// ---------------------------------------------------------------------------

function saveResultJson(result: EconomicReport): string {
  const outputDir = path.resolve(
    path.dirname(new URL(import.meta.url).pathname),
    "..",
    "output"
  );

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const timestamp = new Date().toISOString().replace(/[:.]/g, "-");
  const outPath = path.join(outputDir, `result-${timestamp}.json`);
  fs.writeFileSync(outPath, JSON.stringify(result, null, 2), "utf-8");
  return outPath;
}

// ---------------------------------------------------------------------------
// Format CLI summary (printed to stderr for visibility)
// ---------------------------------------------------------------------------

function logSummary(result: EconomicReport): void {
  process.stderr.write("\n=== OPPORTUNITY RANKING ===\n");
  process.stderr.write(formatOpportunityTable(result.top_opportunities) + "\n");
  process.stderr.write(
    `\nPrimary Constraint: ${result.primary_constraint?.name ?? "[MISSING]"} (${result.primary_constraint?.type ?? ""})\n`
  );
  process.stderr.write(
    `Overall Confidence: ${result.analysis_confidence.toFixed(2)}\n`
  );
  process.stderr.write("===========================\n\n");
}

// ---------------------------------------------------------------------------
// Main
// ---------------------------------------------------------------------------

async function main(): Promise<void> {
  const apiKey = process.env["ANTHROPIC_API_KEY"];
  if (!apiKey) {
    throw new Error(
      "ANTHROPIC_API_KEY environment variable is not set. Copy .env.example to .env and add your key."
    );
  }

  const client = new Anthropic({ apiKey });
  const profile = parseBriefFromArgs();

  process.stderr.write(
    `[main] Economic Engineering System — ${profile.business_name}\n`
  );
  process.stderr.write(
    `[main] Industry: ${profile.industry} | Goal: ${profile.current_goal}\n\n`
  );

  const result = await runConductor(profile, client);

  logSummary(result);

  const markdown = generateMarkdownReport(result);
  console.log(markdown);

  const savedPath = saveResultJson(result);
  process.stderr.write(`[main] Full result JSON saved to: ${savedPath}\n`);
}

main().catch((err: unknown) => {
  console.error("[main] Fatal error:", err);
  process.exit(1);
});
