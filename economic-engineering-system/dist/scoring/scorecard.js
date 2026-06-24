// ---------------------------------------------------------------------------
// Score computation
// ---------------------------------------------------------------------------
export function computeOpportunityScore(components) {
    const raw = components.profit_impact +
        components.customer_value +
        components.speed_to_implement +
        components.confidence +
        components.strategic_value +
        components.risk_penalty +
        components.complexity_penalty;
    return Math.max(0, Math.min(100, Math.round(raw)));
}
// ---------------------------------------------------------------------------
// Rank all recommendations across all agents
// ---------------------------------------------------------------------------
export function rankOpportunities(agentOutputs) {
    const allRecommendations = agentOutputs.flatMap((output) => output.recommendations);
    const scored = allRecommendations.map((rec) => {
        const components = rec.score_components ?? {
            profit_impact: 0,
            customer_value: 0,
            speed_to_implement: 0,
            confidence: 0,
            strategic_value: 0,
            risk_penalty: 0,
            complexity_penalty: 0,
        };
        return {
            recommendation: rec,
            opportunity_score: computeOpportunityScore(components),
            rank: 0,
        };
    });
    // Sort descending by opportunity score
    scored.sort((a, b) => b.opportunity_score - a.opportunity_score);
    // Assign ranks
    scored.forEach((item, index) => {
        item.rank = index + 1;
    });
    return scored;
}
// ---------------------------------------------------------------------------
// Format opportunity table for report
// ---------------------------------------------------------------------------
export function formatOpportunityTable(opportunities) {
    if (opportunities.length === 0) {
        return "No opportunities ranked.";
    }
    const header = "| Rank | Score | Agent | Recommendation | Confidence |";
    const divider = "|---|---|---|---|---|";
    const rows = opportunities.slice(0, 10).map((opp) => {
        const agent = opp.recommendation.agent_name;
        const rec = opp.recommendation.recommendation.slice(0, 80) +
            (opp.recommendation.recommendation.length > 80 ? "…" : "");
        const conf = opp.recommendation.confidence_score.toFixed(2);
        return `| ${opp.rank} | ${opp.opportunity_score}/100 | ${agent} | ${rec} | ${conf} |`;
    });
    return [header, divider, ...rows].join("\n");
}
// ---------------------------------------------------------------------------
// Compute overall analysis confidence from all agent outputs
// ---------------------------------------------------------------------------
export function computeOverallConfidence(agentOutputs) {
    if (agentOutputs.length === 0)
        return 0;
    const sum = agentOutputs.reduce((acc, o) => acc + o.confidence_score, 0);
    return Math.round((sum / agentOutputs.length) * 100) / 100;
}
