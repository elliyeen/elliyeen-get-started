// ---------------------------------------------------------------------------
// Input
// ---------------------------------------------------------------------------

export interface RevenueStream {
  name: string;
  revenue_share_percent?: number | null;
  estimated_margin_percent?: number | null;
}

export interface CostDriver {
  category: string;
  estimated_percent_of_revenue?: number | null;
}

export interface Financials {
  monthly_revenue?: number | null;
  annual_revenue?: number | null;
  gross_margin_percent?: number | null;
  net_margin_percent?: number | null;
  average_order_value?: number | null;
  average_client_value_annual?: number | null;
  customer_lifetime_value?: number | null;
  customer_acquisition_cost?: number | null;
  monthly_transactions_or_clients?: number | null;
}

export interface Operations {
  team_size?: number | null;
  locations?: number | null;
  hours_of_operation?: string | null;
  peak_hours_or_seasons?: string | null;
  primary_delivery_method?: string | null;
}

export interface Competitor {
  name: string;
  positioning?: string | null;
  estimated_market_share?: string | null;
}

export interface DataSource {
  source: string;
  data_available: string;
  date_range?: string | null;
}

export interface BusinessProfile {
  business_name: string;
  industry: string;
  business_model:
    | "B2C"
    | "B2B"
    | "B2B2C"
    | "Marketplace"
    | "Subscription"
    | "Project-based"
    | "Retainer"
    | "Other";
  years_in_operation?: number | null;
  target_customer?: {
    description: string;
    demographics?: string | null;
    psychographics?: string | null;
    primary_pain?: string | null;
  };
  primary_offer: string;
  revenue_streams?: RevenueStream[];
  cost_drivers?: CostDriver[];
  financials?: Financials;
  operations?: Operations;
  current_goal: string;
  current_challenges?: string[];
  constraints_known?: string[];
  competitors?: Competitor[];
  available_data_sources?: DataSource[];
  missing_critical_data?: string[];
}

// ---------------------------------------------------------------------------
// Scoring
// ---------------------------------------------------------------------------

export interface ScoreComponents {
  profit_impact: number;      // 0–30
  customer_value: number;     // 0–20
  speed_to_implement: number; // 0–15
  confidence: number;         // 0–15
  strategic_value: number;    // 0–10
  risk_penalty: number;       // -5 to 0
  complexity_penalty: number; // -5 to 0
}

// ---------------------------------------------------------------------------
// Agent outputs
// ---------------------------------------------------------------------------

export interface Evidence {
  claim: string;
  source: string;
  data_type:
    | "verified_data"
    | "industry_benchmark"
    | "customer_research"
    | "competitive_analysis"
    | "structured_assumption";
}

export interface BusinessImpact {
  revenue_impact?: string | null;
  gross_margin_impact?: string | null;
  net_margin_impact?: string | null;
  cost_reduction?: string | null;
  waste_reduction?: string | null;
  quality_improvement?: string | null;
  retention_impact?: string | null;
  referral_impact?: string | null;
}

export interface AgentRecommendation {
  agent_name: string;
  recommendation: string;
  business_impact: BusinessImpact;
  score_components: ScoreComponents;
  evidence: Evidence[];
  confidence_score: number;
  assumptions: string[];
  missing_data: string[];
  risk: string;
  experiment_required: boolean;
  next_action: string;
}

export interface AgentOutput {
  agent_name: string;
  findings: string;
  recommendations: AgentRecommendation[];
  missing_data: string[];
  assumptions: string[];
  confidence_score: number;
}

// ---------------------------------------------------------------------------
// Specialised agent outputs
// ---------------------------------------------------------------------------

export interface PrimaryConstraint {
  name: string;
  type: "demand" | "operations" | "financial" | "quality" | "capacity" | "trust";
  description: string;
  estimated_profit_impact: string;
  confidence: number;
}

export interface ConstraintOutput extends AgentOutput {
  primary_constraint: PrimaryConstraint;
  exploitation_options: string[];
  elevation_options: string[];
  throughput_ceiling: string;
}

export interface ExperimentDesign {
  experiment_name: string;
  hypothesis: string;
  control: string;
  variant: string;
  primary_metric: string;
  success_threshold: string;
  minimum_sample_size: string;
  test_duration: string;
  decision_rule: {
    if_success: string;
    if_failure: string;
  };
  risk_controls: string[];
  estimated_cost_to_run: string;
  priority_rank: number;
  assumptions: string[];
}

export interface ExperimentOutput extends AgentOutput {
  experiments: ExperimentDesign[];
  recommended_first_experiment: ExperimentDesign;
}

// ---------------------------------------------------------------------------
// Ranked output
// ---------------------------------------------------------------------------

export interface RankedOpportunity {
  recommendation: AgentRecommendation;
  opportunity_score: number;
  rank: number;
}

// ---------------------------------------------------------------------------
// Final report
// ---------------------------------------------------------------------------

export interface WasteItem {
  waste_type: string;
  description: string;
  estimated_annual_cost: string;
  confidence: number;
}

export interface QualityRisk {
  risk: string;
  customer_impact: string;
  financial_impact: string;
  prevention_action: string;
}

export interface MissingDataItem {
  data_needed: string;
  why_it_matters: string;
  how_to_get_it: string;
  priority: "High" | "Med" | "Low";
}

export interface RoadmapRow30 {
  week: string;
  action: string;
  owner: string;
  expected_output: string;
}

export interface RoadmapRow90 {
  month: string;
  action: string;
  depends_on: string;
  expected_output: string;
}

export interface EconomicReport {
  business_name: string;
  report_date: string;
  analysis_confidence: number;
  executive_summary: string;
  current_state: {
    estimated_revenue: string;
    estimated_gross_margin: string;
    primary_revenue_driver: string;
    throughput: string;
    quality_score: string;
    strengths: string[];
    weaknesses: string[];
  };
  primary_constraint: PrimaryConstraint | null;
  top_opportunities: RankedOpportunity[];
  waste_found: WasteItem[];
  quality_risks: QualityRisk[];
  recommended_first_experiment: ExperimentDesign | null;
  expected_margin_impact: string;
  missing_data: MissingDataItem[];
  roadmap_30_day: RoadmapRow30[];
  roadmap_90_day: RoadmapRow90[];
  assumptions_log: string[];
  all_agent_outputs: AgentOutput[];
}
