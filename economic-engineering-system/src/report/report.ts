import type { EconomicReport, RankedOpportunity } from "../types.js";

// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------

function formatTable(
  headers: string[],
  rows: string[][]
): string {
  const header = "| " + headers.join(" | ") + " |";
  const divider = "| " + headers.map(() => "---").join(" | ") + " |";
  const body = rows.map((r) => "| " + r.join(" | ") + " |").join("\n");
  return [header, divider, body].join("\n");
}

function formatOpportunitySection(opps: RankedOpportunity[]): string {
  return opps
    .slice(0, 3)
    .map((opp) => {
      const rec = opp.recommendation;
      const impact = Object.entries(rec.business_impact)
        .filter(([, v]) => v != null)
        .map(([k, v]) => `${k.replace(/_/g, " ")}: ${v as string}`)
        .join("; ");

      return `### Opportunity ${opp.rank} — ${rec.recommendation.split(".")[0]}
**Opportunity Score:** ${opp.opportunity_score}/100
**Confidence:** ${rec.confidence_score.toFixed(2)}
**Expected Impact:** ${impact || "[MISSING]"}
**Agent Source:** ${rec.agent_name}
**Evidence:** ${rec.evidence.map((e) => `${e.claim} [${e.data_type}]`).join("; ") || "None provided"}
**Experiment Required:** ${rec.experiment_required ? "Yes" : "No"}
**Next Action:** ${rec.next_action}
**Risk:** ${rec.risk}`;
    })
    .join("\n\n");
}

// ---------------------------------------------------------------------------
// Main report generator
// ---------------------------------------------------------------------------

export function generateMarkdownReport(report: EconomicReport): string {
  const constraint = report.primary_constraint;

  // Waste table
  const wasteRows = report.waste_found.map((w) => [
    w.waste_type,
    w.description,
    w.estimated_annual_cost,
    w.confidence.toFixed(2),
  ]);
  const wasteTable =
    wasteRows.length > 0
      ? formatTable(
          ["Waste Type", "Description", "Est. Annual Cost", "Confidence"],
          wasteRows
        )
      : "_No waste items identified._";

  // Quality risks table
  const qualityRows = report.quality_risks.map((r) => [
    r.risk,
    r.customer_impact,
    r.financial_impact,
    r.prevention_action,
  ]);
  const qualityTable =
    qualityRows.length > 0
      ? formatTable(
          ["Risk", "Customer Impact", "Financial Impact", "Prevention Action"],
          qualityRows
        )
      : "_No quality risks identified._";

  // Missing data table
  const missingRows = report.missing_data.map((m) => [
    m.data_needed,
    m.why_it_matters,
    m.how_to_get_it,
    m.priority,
  ]);
  const missingTable =
    missingRows.length > 0
      ? formatTable(
          ["Data Needed", "Why It Matters", "How to Get It", "Priority"],
          missingRows
        )
      : "_No critical data gaps identified._";

  // 30-day roadmap table
  const roadmap30Rows = report.roadmap_30_day.map((r) => [
    r.week,
    r.action,
    r.owner,
    r.expected_output,
  ]);
  const roadmap30Table =
    roadmap30Rows.length > 0
      ? formatTable(["Week", "Action", "Owner", "Expected Output"], roadmap30Rows)
      : "_No 30-day roadmap generated._";

  // 90-day roadmap table
  const roadmap90Rows = report.roadmap_90_day.map((r) => [
    r.month,
    r.action,
    r.depends_on,
    r.expected_output,
  ]);
  const roadmap90Table =
    roadmap90Rows.length > 0
      ? formatTable(["Month", "Action", "Depends On", "Expected Output"], roadmap90Rows)
      : "_No 90-day roadmap generated._";

  // Experiment section
  const exp = report.recommended_first_experiment;
  const experimentSection = exp
    ? `**Experiment Name:** ${exp.experiment_name}
**Hypothesis:** ${exp.hypothesis}
**Control:** ${exp.control}
**Variant:** ${exp.variant}
**Primary Metric:** ${exp.primary_metric}
**Success Threshold:** ${exp.success_threshold}
**Duration:** ${exp.test_duration}
**Decision Rule:**
- If success: ${exp.decision_rule.if_success}
- If failure: ${exp.decision_rule.if_failure}
**Estimated Cost to Run:** ${exp.estimated_cost_to_run}`
    : "_No experiment designed._";

  // Assumptions log
  const assumptionsLog =
    report.assumptions_log.length > 0
      ? report.assumptions_log.map((a, i) => `${i + 1}. ${a}`).join("\n")
      : "_No assumptions logged._";

  return `# Economic Engineering Report: ${report.business_name}
**Date:** ${report.report_date}
**Analysis Confidence:** ${report.analysis_confidence.toFixed(2)} — Based on available data quality across all 9 agents. [ASSUMPTION] items should be validated before major decisions.

---

## Executive Summary

${report.executive_summary}

---

## Current State

**Estimated Revenue:** ${report.current_state.estimated_revenue}
**Estimated Gross Margin:** ${report.current_state.estimated_gross_margin}
**Primary Revenue Driver:** ${report.current_state.primary_revenue_driver}
**Throughput:** ${report.current_state.throughput}
**Quality Score:** ${report.current_state.quality_score}

**Strengths:**
${report.current_state.strengths.map((s) => `- ${s}`).join("\n") || "- None identified"}

**Weaknesses:**
${report.current_state.weaknesses.map((w) => `- ${w}`).join("\n") || "- None identified"}

---

## Primary Constraint

${
  constraint
    ? `**Constraint:** ${constraint.name}
**Type:** ${constraint.type}
**Why This Is the Constraint:** ${constraint.description}
**Estimated Profit Impact If Resolved:** ${constraint.estimated_profit_impact}
**Confidence:** ${constraint.confidence.toFixed(2)}`
    : "_No primary constraint identified._"
}

---

## Top Profit Opportunities

${formatOpportunitySection(report.top_opportunities)}

---

## Waste Found

${wasteTable}

---

## Quality Risks

${qualityTable}

---

## Recommended First Experiment

${experimentSection}

---

## Expected Margin Impact

${report.expected_margin_impact}

---

## Missing Data

${missingTable}

---

## 30-Day Roadmap

${roadmap30Table}

---

## 90-Day Roadmap

${roadmap90Table}

---

## Assumptions Log

All assumptions used in this report, ranked by potential impact on the analysis:

${assumptionsLog}

---

*This report was generated by the Economic Engineering Agent System. All [ASSUMPTION] items must be validated against actual business data before major decisions are made.*
`.trim();
}
