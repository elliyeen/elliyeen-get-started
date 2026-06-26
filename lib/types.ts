export type Tone = "default" | "danger" | "success" | "warning";

export type MetricCardProps = {
  value: string;
  label: string;
  note: string;
  tone?: Tone;
};

export type BigPictureCardProps = {
  title: string;
  value: string;
  description: string;
  chartType: "bar" | "line";
  tone?: "danger" | "success" | "warning";
};

export type MiniBarChartProps = {
  beforeLabel: string;
  afterLabel: string;
  beforeValue: number;
  afterValue: number;
  maxValue?: number;
  tone?: "danger" | "success";
};

export type MiniLineChartProps = {
  points: number[];
  dashedFromIndex?: number;
  tone?: "danger" | "success";
};

export type Finding = {
  rank: string;
  title: string;
  description: string;
  value: string;
};

export type FindingListProps = {
  findings: Finding[];
};

export type Hotspot = {
  x: number;
  y: number;
  size: "sm" | "md" | "lg";
  intensity: "low" | "medium" | "high";
};

export type OpportunityMapProps = {
  caption: string;
  hotspots: Hotspot[];
};

export type OpportunitySizeItem = {
  label: string;
  value: string;
};

export type OpportunitySizeCardProps = {
  items: OpportunitySizeItem[];
  totalLabel: string;
  totalValue: string;
  note: string;
};

export type RoadmapStepProps = {
  step: string;
  title: string;
  description: string;
  impact: string;
  time: string;
  confidence: string;
};

export type ImpactProjectionCardProps = {
  title: string;
  value: string;
  subtitle: string;
  bars: number[];
};

export type CTASectionProps = {
  headline: string;
  bullets: string[];
  ctaLabel: string;
  imageSrc: string;
  trustNote?: string;
};

export type SectionShellProps = {
  number: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
};

export type NavigationProps = {
  logo: string;
  links: string[];
  ctaLabel: string;
  ctaVariant?: "dark" | "blue";
  ctaHref?: string;
};

export type ReportHeroProps = {
  eyebrow: string;
  businessName: string;
  location: string;
  website: string;
  description: string;
  imageSrc: string;
  metrics: MetricCardProps[];
  confidenceNote: string;
};
