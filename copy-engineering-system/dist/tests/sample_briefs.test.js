/**
 * Integration tests for 8 sample briefs using a mocked Anthropic API.
 * Run with: npm test
 */
import { describe, it } from "node:test";
import assert from "node:assert/strict";
import Anthropic from "@anthropic-ai/sdk";
import { runConductor } from "../conductor.js";
// ---------------------------------------------------------------------------
// Deterministic mock responses
// ---------------------------------------------------------------------------
function makeMockAgentScore(overrides = {}) {
    return JSON.stringify({
        score: 7,
        reason: "Mock evaluation — copy meets behavioral requirements for this stage.",
        recommendations: [
            "Strengthen the opening hook with a specific number",
            "Add a named proof asset",
            "Tighten the CTA to a single verb",
        ],
        output: "Mock rewrite fragment for this stage.",
        // Attention extras
        bestHook: "Mock best hook",
        headlineOptions: ["Mock headline A", "Mock headline B"],
        patternInterruptIdeas: ["Pattern interrupt idea"],
        // Curiosity extras
        openLoops: ["Open loop A"],
        weakTransitions: ["Weak transition found"],
        // Understanding extras
        confusingPhrases: [],
        simplifiedVersion: "This service helps families care for aging parents.",
        // Desire extras
        surfaceBenefit: "In-home care",
        deepBenefit: "Peace of mind",
        identityBenefit: "Being a good son/daughter",
        desireMap: ["Desire 1", "Desire 2"],
        painMap: ["Pain 1", "Pain 2"],
        // Belief extras
        supportedClaims: ["CNA credential"],
        unsupportedClaims: [],
        neededProof: [],
        // Trust extras
        skepticismRisks: [],
        trustBuilders: ["Credential mention"],
        // Friction extras
        frictionPoints: [],
        recommendedFixes: [],
        // Action extras
        primaryCta: "Book your free assessment",
        secondaryCta: "Read how it works",
        reasonToActNow: "Limited intake slots this month",
        // Loyalty extras
        retentionRisks: [],
        loyaltyAssets: ["Supervised first visit"],
        // Advocacy extras
        shareTrigger: "Most quotable line in the copy",
        referralPrompt: "Know a family who needs this? Share this page.",
        ...overrides,
    });
}
function makeMockFabricationAudit() {
    return JSON.stringify({
        passed: true,
        violations: [],
        notes: ["No fabricated claims detected in mock review."],
    });
}
function makeMockBehaviorAudit() {
    return JSON.stringify({
        overallScore: 7,
        weakestStage: "advocacy",
        strongestStage: "attention",
        mustFix: ["Strengthen referral trigger", "Add post-action loyalty copy"],
        stageBreakdown: {
            attention: 8,
            curiosity: 7,
            understanding: 7,
            desire: 7,
            belief: 7,
            trust: 7,
            friction: 7,
            action: 7,
            loyalty: 6,
            advocacy: 5,
        },
    });
}
const MOCK_DRAFT = "Mock Draft Headline\n\nMock body copy that addresses the target audience's pain and desire.\n\nBook your free assessment today.";
/**
 * Create a minimal Anthropic mock that returns pre-defined responses.
 * We monkey-patch the messages.create method on a real client instance.
 */
function createMockClient() {
    const client = new Anthropic({ apiKey: "mock-key-for-testing" });
    let callCount = 0;
    // Responses in call order:
    // 1st call: initial draft (plain text)
    // calls 2-11: 10 agent scores (JSON)
    // calls 12-13: fabrication audit + behavior audit (JSON)
    // If more iterations occur, cycle through agents again
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    client.messages.create = async () => {
        callCount++;
        let text;
        if (callCount === 1) {
            // Draft generation
            text = MOCK_DRAFT;
        }
        else {
            // Determine which agent we're mocking based on call number
            const agentIndex = (callCount - 2) % 13;
            if (agentIndex < 10) {
                // One of the 10 behavioral agents
                text = makeMockAgentScore();
            }
            else if (agentIndex === 10) {
                // Fabrication audit
                text = makeMockFabricationAudit();
            }
            else {
                // Behavior audit
                text = makeMockBehaviorAudit();
            }
        }
        // Return a minimal Anthropic-shaped response object
        return {
            id: `msg_mock_${callCount}`,
            type: "message",
            role: "assistant",
            content: [{ type: "text", text }],
            model: "claude-sonnet-4-6",
            stop_reason: "end_turn",
            stop_sequence: null,
            usage: { input_tokens: 100, output_tokens: 200 },
        };
    };
    return client;
}
// ---------------------------------------------------------------------------
// 8 Sample Briefs
// ---------------------------------------------------------------------------
const briefs = [
    {
        name: "Home care landing page (Savannah Personal Care Services)",
        brief: {
            businessName: "Savannah Personal Care Services",
            industry: "Home care / elder care",
            offer: "In-home personal care services for seniors, founded by Shannon Stafford Simpson (CNA). The Shannon Standard: same-day assessment, 24hr in-home evaluation, 48hr caregiver match, supervised first visit, 72hr written follow-up.",
            audience: "Adult daughters aged 45-62 managing a parent's care. Kitchen table, 10:45pm. Something happened today.",
            desiredBehavior: "appointment",
            assetType: "landing page",
            awarenessLevel: "problem_aware",
            tone: "Warm, direct, honest. Short sentences. No platitudes.",
            proofAssets: ["CNA credential", "The Shannon Standard process"],
            claimsForbidden: ["#1 in Savannah", "guaranteed outcomes"],
        },
    },
    {
        name: "AI revenue engineering homepage (Elliyeen Research)",
        brief: {
            businessName: "Elliyeen Research",
            industry: "AI / B2B revenue engineering",
            offer: "AI-driven revenue engineering system that identifies untapped growth levers in mid-market B2B companies within 30 days.",
            audience: "B2B founders and revenue leaders at $5M-$50M companies who have hit a growth plateau and suspect the answer is in their data.",
            desiredBehavior: "application",
            assetType: "homepage",
            awarenessLevel: "solution_aware",
            marketSophistication: "stage_4",
            tone: "Precise, confident, data-forward. Peer-to-peer — not a sales pitch.",
            proofAssets: [
                "Case studies available on request",
                "Proprietary 4-layer analysis framework",
            ],
        },
    },
    {
        name: "Financial legacy team for athletes",
        brief: {
            businessName: "Pinnacle Legacy Group",
            industry: "Financial planning / wealth management",
            offer: "Athlete-specific financial legacy planning. Protects career earnings, structures generational wealth, and prevents the post-career financial collapse that affects 78% of professional athletes within 5 years of retirement.",
            audience: "Professional athletes aged 22-35 with first major contract. Their financial life is being managed by someone else. They feel the clock ticking.",
            desiredBehavior: "appointment",
            assetType: "landing page",
            awarenessLevel: "problem_aware",
            proofAssets: ["Former athlete advisors", "25+ active client athletes"],
            claimsForbidden: ["guaranteed returns", "specific ROI promises"],
        },
    },
    {
        name: "Golf training offer",
        brief: {
            businessName: "Break 80 Academy",
            industry: "Sports training / golf instruction",
            offer: "12-week online golf improvement program. Guaranteed to lower your handicap by 5 strokes or full refund. Taught by PGA instructor with 20 years experience.",
            audience: "Amateur golfers aged 35-60 who have been stuck at the same handicap for 2+ years despite regular play. They have disposable income and take the sport seriously.",
            desiredBehavior: "purchase",
            assetType: "sales page",
            awarenessLevel: "solution_aware",
            proofAssets: ["PGA certification", "Hundreds of students transformed", "5-stroke guarantee"],
            tone: "Enthusiastic but credible. Peer golfer energy.",
        },
    },
    {
        name: "LinkedIn post (B2B SaaS)",
        brief: {
            businessName: "Flowdash",
            industry: "B2B SaaS / workflow automation",
            offer: "Flowdash eliminates manual handoffs between sales, ops, and CS. Most companies lose 23% of revenue to internal friction they can't see.",
            audience: "B2B SaaS operators and COOs on LinkedIn. They know they have a process problem. They don't know a product exists that solves it.",
            desiredBehavior: "reply",
            assetType: "LinkedIn post",
            awarenessLevel: "problem_aware",
            marketSophistication: "stage_2",
            tone: "Conversational, precise, earned authority. No hustle-culture language.",
        },
    },
    {
        name: "Cold email (consulting)",
        brief: {
            businessName: "Chen Strategy Group",
            industry: "Management consulting",
            offer: "90-day organizational effectiveness audit that identifies the single highest-leverage change a company can make to their operating model.",
            audience: "CEOs of 50-200 person companies who have grown fast and feel the organization starting to groan under its own weight. Too many meetings. Decisions slowing down.",
            desiredBehavior: "reply",
            assetType: "cold email",
            awarenessLevel: "problem_aware",
            trafficSource: "cold outbound",
            tone: "Precise, direct, respectful of the reader's time. No fluff. One ask.",
        },
    },
    {
        name: "Donation page (education nonprofit)",
        brief: {
            businessName: "Bright Path Foundation",
            industry: "Education nonprofit",
            offer: "Fund full scholarships for first-generation college students from underserved communities in Houston. $2,400 = one full year of tuition for one student.",
            audience: "Existing donors and warm prospects who believe in education equity. They have given before or expressed interest. They want their money to land somewhere specific.",
            desiredBehavior: "donation",
            assetType: "donation page",
            awarenessLevel: "most_aware",
            proofAssets: [
                "127 students funded last year",
                "94% graduation rate (vs. 58% national average for first-gen students)",
                "Named student stories available",
            ],
            tone: "Warm, human, specific. Not guilt-driven. Empowering.",
        },
    },
    {
        name: "Appointment booking page (dental office)",
        brief: {
            businessName: "Coastal Family Dentistry",
            industry: "Healthcare / dental",
            offer: "New patient exam and cleaning — $89 flat fee, no hidden costs. Includes digital X-rays, full exam, professional cleaning, and personalized care plan.",
            audience: "Adults 25-55 who have been putting off going to the dentist for 1-3 years. They are slightly anxious, don't have a current dentist, and want it to be easy and affordable.",
            desiredBehavior: "appointment",
            assetType: "appointment booking page",
            awarenessLevel: "solution_aware",
            proofAssets: [
                "$89 flat fee — no surprise billing",
                "Online booking in 60 seconds",
                "Same-week appointments available",
            ],
            constraints: [
                "Must include price clearly",
                "Must not overpromise pain-free outcomes",
            ],
            tone: "Calm, friendly, reassuring. Zero anxiety. Make it feel easy.",
        },
    },
];
// ---------------------------------------------------------------------------
// Test runner
// ---------------------------------------------------------------------------
describe("Sample Briefs — Copy Engineering System", () => {
    for (const { name, brief } of briefs) {
        it(`should process brief: ${name}`, async () => {
            // Each test gets a fresh mock client so callCount always starts at 0
            const mockClient = createMockClient();
            const result = await runConductor(brief, mockClient);
            // 1. Target behavior is correctly set
            assert.equal(result.targetBehavior, brief.desiredBehavior, `targetBehavior should match brief.desiredBehavior`);
            // 2. Asset type is correctly set
            assert.equal(result.assetType, brief.assetType, `assetType should match brief.assetType`);
            // 3. Final copy is non-empty and contains a CTA signal
            assert.ok(result.finalCopy.length > 50, "finalCopy should be non-empty");
            const copyLower = result.finalCopy.toLowerCase();
            const ctaSignals = ["book", "start", "get", "join", "apply", "donate", "schedule", "call", "sign", "learn", "free", "today", "now", "assessment", "appointment", "request"];
            const hasCta = ctaSignals.some((sig) => copyLower.includes(sig));
            assert.ok(hasCta, "finalCopy should contain at least one CTA signal");
            // 4. No fabricated claims (mock returns passed: true)
            const fabricationAudit = result.auditResults[0];
            assert.ok(fabricationAudit, "fabrication audit result should exist");
            assert.equal(fabricationAudit.passed, true, "fabrication audit should pass");
            assert.equal(fabricationAudit.violations.length, 0, "fabrication audit should have no violations");
            // 5. Scorecard is returned with all stages
            const scorecard = result.scorecard;
            assert.ok(scorecard, "scorecard should exist");
            const stages = [
                "attention", "curiosity", "understanding", "desire",
                "belief", "trust", "friction", "action", "loyalty", "advocacy",
            ];
            for (const stage of stages) {
                assert.ok(typeof scorecard[stage] === "number", `scorecard.${stage} should be a number`);
                assert.ok(scorecard[stage] >= 1 && scorecard[stage] <= 10, `scorecard.${stage} should be between 1 and 10`);
            }
            assert.ok(typeof scorecard.overall === "number", "scorecard.overall should be a number");
            // 6. Weakest and strongest stages are identified
            assert.ok(result.weakestStage && result.weakestStage.length > 0, "weakestStage should be identified");
            assert.ok(result.strongestStage && result.strongestStage.length > 0, "strongestStage should be identified");
            assert.ok(stages.includes(result.weakestStage), `weakestStage "${result.weakestStage}" should be a valid stage name`);
            // 7. Agent results are returned for all 10 agents
            assert.equal(result.agentResults.length, 10, "should have results for all 10 agents");
            // 8. Iterations used is within bounds
            assert.ok(result.iterationsUsed >= 1 && result.iterationsUsed <= 5, "iterationsUsed should be between 1 and 5");
        });
    }
});
