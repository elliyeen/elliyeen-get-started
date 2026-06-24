/**
 * Unit tests for the scoring module.
 * Run with: npm test
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import { buildScorecard, passesThreshold, getWeakestStage, getStrongestStage, formatScorecardTable, getFailingStages, PASS_THRESHOLD_OVERALL, PASS_THRESHOLD_STAGE, } from "../scoring/scorecard.js";
// ---------------------------------------------------------------------------
// Helpers
// ---------------------------------------------------------------------------
function makeAgentResult(name, score) {
    const raw = {
        score,
        reason: `Mock reason for ${name}`,
        recommendations: [`Fix ${name} issue 1`, `Fix ${name} issue 2`],
        output: `Mock output for ${name}`,
    };
    return {
        agentName: name,
        score,
        notes: [raw.reason],
        recommendations: raw.recommendations,
        output: raw.output,
        raw,
    };
}
function makeAllAgentResults(scores) {
    return Object.entries(scores).map(([name, score]) => makeAgentResult(name, score));
}
const ALL_STAGES = [
    "attention",
    "curiosity",
    "understanding",
    "desire",
    "belief",
    "trust",
    "friction",
    "action",
    "loyalty",
    "advocacy",
];
// ---------------------------------------------------------------------------
// buildScorecard
// ---------------------------------------------------------------------------
describe("buildScorecard", () => {
    it("calculates overall score as average of 10 stages", () => {
        const results = makeAllAgentResults({
            attention: 8,
            curiosity: 7,
            understanding: 9,
            desire: 6,
            belief: 7,
            trust: 8,
            friction: 7,
            action: 6,
            loyalty: 5,
            advocacy: 7,
        });
        const scorecard = buildScorecard(results);
        const expected = (8 + 7 + 9 + 6 + 7 + 8 + 7 + 6 + 5 + 7) / 10;
        assert.equal(scorecard.overall, Math.round(expected * 10) / 10);
    });
    it("includes all 10 stage scores in output", () => {
        const results = makeAllAgentResults(Object.fromEntries(ALL_STAGES.map((s) => [s, 7])));
        const scorecard = buildScorecard(results);
        for (const stage of ALL_STAGES) {
            assert.ok(typeof scorecard[stage] === "number", `Missing stage: ${stage}`);
        }
    });
    it("defaults missing agents to 5", () => {
        const results = [makeAgentResult("attention", 8)]; // only 1 of 10
        const scorecard = buildScorecard(results);
        assert.equal(scorecard.attention, 8);
        assert.equal(scorecard.curiosity, 5); // default
    });
    it("handles all zeros gracefully", () => {
        const results = makeAllAgentResults(Object.fromEntries(ALL_STAGES.map((s) => [s, 0])));
        const scorecard = buildScorecard(results);
        assert.equal(scorecard.overall, 0);
    });
    it("handles perfect scores", () => {
        const results = makeAllAgentResults(Object.fromEntries(ALL_STAGES.map((s) => [s, 10])));
        const scorecard = buildScorecard(results);
        assert.equal(scorecard.overall, 10);
    });
});
// ---------------------------------------------------------------------------
// passesThreshold
// ---------------------------------------------------------------------------
describe("passesThreshold", () => {
    it("returns true when overall >= 6.5 and no stage < 4", () => {
        const scorecard = {
            attention: 7,
            curiosity: 7,
            understanding: 7,
            desire: 7,
            belief: 7,
            trust: 7,
            friction: 7,
            action: 7,
            loyalty: 7,
            advocacy: 7,
            overall: 7,
        };
        assert.equal(passesThreshold(scorecard), true);
    });
    it("returns false when overall < 6.5", () => {
        const scorecard = {
            attention: 6,
            curiosity: 6,
            understanding: 6,
            desire: 6,
            belief: 6,
            trust: 6,
            friction: 6,
            action: 6,
            loyalty: 6,
            advocacy: 6,
            overall: 6.0,
        };
        assert.equal(passesThreshold(scorecard), false);
    });
    it("returns false when any single stage < 4 even if overall is high", () => {
        const scorecard = {
            attention: 9,
            curiosity: 9,
            understanding: 9,
            desire: 9,
            belief: 9,
            trust: 9,
            friction: 9,
            action: 9,
            loyalty: 9,
            advocacy: 3, // below threshold
            overall: 8.4,
        };
        assert.equal(passesThreshold(scorecard), false);
    });
    it("passes exactly at the threshold boundary (6.5)", () => {
        const scorecard = {
            attention: 7,
            curiosity: 7,
            understanding: 7,
            desire: 7,
            belief: 6,
            trust: 6,
            friction: 7,
            action: 6,
            loyalty: 6,
            advocacy: 6,
            overall: 6.5,
        };
        assert.equal(passesThreshold(scorecard), true);
    });
    it(`stage threshold is ${PASS_THRESHOLD_STAGE}`, () => {
        assert.equal(PASS_THRESHOLD_STAGE, 4);
    });
    it(`overall threshold is ${PASS_THRESHOLD_OVERALL}`, () => {
        assert.equal(PASS_THRESHOLD_OVERALL, 6.5);
    });
});
// ---------------------------------------------------------------------------
// getWeakestStage
// ---------------------------------------------------------------------------
describe("getWeakestStage", () => {
    it("correctly identifies the lowest-scoring stage", () => {
        const scorecard = {
            attention: 8,
            curiosity: 7,
            understanding: 9,
            desire: 6,
            belief: 7,
            trust: 8,
            friction: 7,
            action: 6,
            loyalty: 3, // weakest
            advocacy: 7,
            overall: 6.8,
        };
        assert.equal(getWeakestStage(scorecard), "loyalty");
    });
    it("returns attention when all stages tie", () => {
        const scorecard = {
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
            overall: 5,
        };
        // First stage encountered with the min score
        const result = getWeakestStage(scorecard);
        assert.ok(ALL_STAGES.includes(result));
    });
    it("handles advocacy as weakest", () => {
        const scores = Object.fromEntries(ALL_STAGES.map((s) => [s, 8]));
        scores["advocacy"] = 2;
        const scorecard = { ...scores, overall: 7.4 };
        assert.equal(getWeakestStage(scorecard), "advocacy");
    });
});
// ---------------------------------------------------------------------------
// getStrongestStage
// ---------------------------------------------------------------------------
describe("getStrongestStage", () => {
    it("correctly identifies the highest-scoring stage", () => {
        const scorecard = {
            attention: 8,
            curiosity: 7,
            understanding: 10, // strongest
            desire: 6,
            belief: 7,
            trust: 8,
            friction: 7,
            action: 6,
            loyalty: 5,
            advocacy: 7,
            overall: 7.1,
        };
        assert.equal(getStrongestStage(scorecard), "understanding");
    });
    it("handles action as strongest", () => {
        const scores = Object.fromEntries(ALL_STAGES.map((s) => [s, 5]));
        scores["action"] = 10;
        const scorecard = { ...scores, overall: 5.5 };
        assert.equal(getStrongestStage(scorecard), "action");
    });
});
// ---------------------------------------------------------------------------
// formatScorecardTable
// ---------------------------------------------------------------------------
describe("formatScorecardTable", () => {
    it("returns a non-empty string", () => {
        const results = makeAllAgentResults(Object.fromEntries(ALL_STAGES.map((s) => [s, 7])));
        const scorecard = buildScorecard(results);
        const table = formatScorecardTable(scorecard, results);
        assert.ok(typeof table === "string" && table.length > 0);
    });
    it("includes all 10 stage names in the table", () => {
        const results = makeAllAgentResults(Object.fromEntries(ALL_STAGES.map((s) => [s, 7])));
        const scorecard = buildScorecard(results);
        const table = formatScorecardTable(scorecard, results);
        for (const stage of ALL_STAGES) {
            const label = stage.charAt(0).toUpperCase() + stage.slice(1);
            assert.ok(table.includes(label), `Table should include stage label: ${label}`);
        }
    });
    it("includes PASS when overall >= 6.5", () => {
        const results = makeAllAgentResults(Object.fromEntries(ALL_STAGES.map((s) => [s, 7])));
        const scorecard = buildScorecard(results);
        const table = formatScorecardTable(scorecard, results);
        assert.ok(table.includes("PASS"), "Table should show PASS");
    });
    it("includes FAIL when overall < 6.5", () => {
        const results = makeAllAgentResults(Object.fromEntries(ALL_STAGES.map((s) => [s, 5])));
        const scorecard = buildScorecard(results);
        const table = formatScorecardTable(scorecard, results);
        assert.ok(table.includes("FAIL"), "Table should show FAIL");
    });
    it("marks failing stages with an asterisk", () => {
        const scores = Object.fromEntries(ALL_STAGES.map((s) => [s, 7]));
        scores["loyalty"] = 3; // below threshold
        const results = makeAllAgentResults(scores);
        const scorecard = buildScorecard(results);
        const table = formatScorecardTable(scorecard, results);
        assert.ok(table.includes("Loyalty *"), "Failing stage should have asterisk");
    });
});
// ---------------------------------------------------------------------------
// getFailingStages
// ---------------------------------------------------------------------------
describe("getFailingStages", () => {
    it("returns empty array when all stages pass", () => {
        const scorecard = {
            attention: 7,
            curiosity: 7,
            understanding: 7,
            desire: 7,
            belief: 7,
            trust: 7,
            friction: 7,
            action: 7,
            loyalty: 7,
            advocacy: 7,
            overall: 7,
        };
        assert.deepEqual(getFailingStages(scorecard), []);
    });
    it("returns the correct failing stages", () => {
        const scorecard = {
            attention: 7,
            curiosity: 3, // fail
            understanding: 7,
            desire: 7,
            belief: 7,
            trust: 2, // fail
            friction: 7,
            action: 7,
            loyalty: 7,
            advocacy: 1, // fail
            overall: 5.5,
        };
        const failing = getFailingStages(scorecard);
        assert.ok(failing.includes("curiosity"), "curiosity should fail");
        assert.ok(failing.includes("trust"), "trust should fail");
        assert.ok(failing.includes("advocacy"), "advocacy should fail");
        assert.equal(failing.length, 3);
    });
    it("returns all stages when all scores are 0", () => {
        const scorecard = Object.fromEntries([...ALL_STAGES.map((s) => [s, 0]), ["overall", 0]]);
        const failing = getFailingStages(scorecard);
        assert.equal(failing.length, ALL_STAGES.length);
    });
});
