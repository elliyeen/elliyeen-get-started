export type DesiredBehavior =
  | "purchase"
  | "appointment"
  | "opt_in"
  | "application"
  | "donation"
  | "share"
  | "reply"
  | "referral"
  | "loyalty"
  | "advocacy";

export type AwarenessLevel =
  | "unaware"
  | "problem_aware"
  | "solution_aware"
  | "product_aware"
  | "most_aware";

export type MarketSophistication =
  | "stage_1"
  | "stage_2"
  | "stage_3"
  | "stage_4"
  | "stage_5";

export interface CopyBrief {
  businessName: string;
  industry: string;
  offer: string;
  audience: string;
  desiredBehavior: DesiredBehavior;
  assetType: string;
  trafficSource?: string;
  awarenessLevel?: AwarenessLevel;
  marketSophistication?: MarketSophistication;
  proofAssets?: string[];
  constraints?: string[];
  tone?: string;
  claimsAllowed?: string[];
  claimsForbidden?: string[];
  existingCopy?: string;
}

export interface AgentScore {
  score: number;
  reason: string;
  recommendations: string[];
  output: string;
}

export interface AttentionScore extends AgentScore {
  bestHook: string;
  headlineOptions: string[];
  patternInterruptIdeas: string[];
}

export interface CuriosityScore extends AgentScore {
  openLoops: string[];
  weakTransitions: string[];
}

export interface UnderstandingScore extends AgentScore {
  confusingPhrases: string[];
  simplifiedVersion: string;
}

export interface DesireScore extends AgentScore {
  surfaceBenefit: string;
  deepBenefit: string;
  identityBenefit: string;
  desireMap: string[];
  painMap: string[];
}

export interface BeliefScore extends AgentScore {
  supportedClaims: string[];
  unsupportedClaims: string[];
  neededProof: string[];
}

export interface TrustScore extends AgentScore {
  skepticismRisks: string[];
  trustBuilders: string[];
}

export interface FrictionScore extends AgentScore {
  frictionPoints: string[];
  recommendedFixes: string[];
}

export interface ActionScore extends AgentScore {
  primaryCta: string;
  secondaryCta: string;
  reasonToActNow: string;
}

export interface LoyaltyScore extends AgentScore {
  retentionRisks: string[];
  loyaltyAssets: string[];
}

export interface AdvocacyScore extends AgentScore {
  shareTrigger: string;
  referralPrompt: string;
}

export interface AuditResult {
  passed: boolean;
  violations: string[];
  safeRewrite?: string;
  notes: string[];
}

export interface BehaviorAuditResult {
  overallScore: number;
  weakestStage: string;
  strongestStage: string;
  mustFix: string[];
  stageBreakdown: Record<string, number>;
}

export interface AgentResult {
  agentName: string;
  score: number;
  notes: string[];
  recommendations: string[];
  output: string;
  raw: AgentScore;
}

export interface FinalCopyResult {
  targetBehavior: DesiredBehavior;
  assetType: string;
  finalCopy: string;
  behaviorScore: number;
  weakestStage: string;
  strongestStage: string;
  agentResults: AgentResult[];
  auditResults: AuditResult[];
  iterationsUsed: number;
  scorecard: Scorecard;
}

export interface Scorecard {
  attention: number;
  curiosity: number;
  understanding: number;
  desire: number;
  belief: number;
  trust: number;
  friction: number;
  action: number;
  loyalty: number;
  advocacy: number;
  overall: number;
}
