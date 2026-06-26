import type { MetricCardProps, Finding, OpportunitySizeItem } from "./types";

export const reportData = {
  business: {
    name: "So Halal Soul Food",
    location: "Stone Mountain, GA",
    website: "sohalalsoulfood.com",
    description:
      "Halal-certified soul food and Caribbean restaurant. Compelling founder story. 60+ menu items. Active social channels. The product is differentiated. The demand is real. The website is broken on every phone — and every customer from Instagram or TikTok is on their phone.",
    imageSrc: "/1000191521.jpg",
    confidence:
      "Analysis confidence: 0.42 — Menu and site verified. No POS or revenue data.",
  },

  heroMetrics: [
    { value: "5 / 5", label: "Pages crawled", note: "All HTTP 200", tone: "default" },
    { value: "0", label: "Broken links", note: "Internal + external", tone: "default" },
    { value: "1336px", label: "Body on mobile", note: "vs 390px screen", tone: "danger" },
    { value: "60+", label: "Menu items", note: "All prices verified", tone: "default" },
  ] satisfies MetricCardProps[],

  bigPicture: [
    {
      title: "Money left on the table",
      value: "$4.6K–$10K",
      valueSuffix: "/mo",
      description: "Estimated monthly revenue impact if top 3 fixes are implemented.",
      chartType: "bar" as const,
      tone: "danger" as const,
    },
    {
      title: "Clients you're missing",
      value: "20–35%",
      description: "Mobile visitors leave due to a broken experience before ordering.",
      chartType: "bar" as const,
      tone: "danger" as const,
    },
    {
      title: "Conversion loss",
      value: "7.08%",
      description: "Current conversion rate — below QSR benchmark of 9–12%.",
      chartType: "line" as const,
      tone: "danger" as const,
    },
    {
      title: "Profit impact",
      value: "+32%",
      description: "Profit growth potential in the next 12 months.",
      chartType: "line" as const,
      tone: "success" as const,
    },
  ],

  findings: [
    {
      rank: "1",
      title: "Mobile Rendering Failure",
      description: "Digital / Demand",
      value: "$36K–$48K",
    },
    {
      rank: "2",
      title: "Ordering Friction (Otter)",
      description: "Profit engineering",
      value: "$21.6K–$48K",
    },
    {
      rank: "3",
      title: "Navigation & SEO Gaps",
      description: "Organic / Trust",
      value: "$8.4K–$14.4K",
    },
    {
      rank: "4",
      title: "No Email Capture",
      description: "Retention",
      value: "$6K–$12K",
    },
    {
      rank: "5",
      title: "Bundle & AOV Uplift",
      description: "Profit / AOV",
      value: "$9.6K–$24K",
    },
  ] satisfies Finding[],

  opportunitySize: [
    { label: "Revenue Increase", value: "+ $2.14M" },
    { label: "Margin Improvement", value: "+ 8.6%" },
    { label: "Conversion Lift", value: "+ 31%" },
    { label: "Enterprise Value", value: "+ $3.47M" },
  ] satisfies OpportunitySizeItem[],

  roadmap: [
    {
      step: "01",
      title: "Fix Mobile Experience",
      badge: "$0 · 2–4 hours",
      problem: "Site renders 1336px wide on a 390px screen.",
      description:
        "Every Instagram and TikTok visitor hits a broken page before they can read the menu or order.",
      actions: [
        "Open Wix Mobile Editor",
        "Adjust container widths on all 5 pages",
        "Verify on a real iPhone before closing",
        "Fix 11 touch targets below 44px",
      ],
      impact: "+$2K–$4K/mo",
      time: "2–4 hours",
      confidence: "0.85 confidence",
      beforeValue: 18,
      afterValue: 72,
    },
    {
      step: "02",
      title: "Smarter Online Ordering",
      badge: "1–2 weeks",
      problem: "Menu redirects customers to tryotter.com to place an order.",
      description:
        "Each redirect step loses 10–20% of visitors at peak buying intent.",
      actions: [
        "Pull Otter contract — flat fee vs. commission",
        "If commission: evaluate Wix Restaurants or Square",
        "Add UTM tracking to all order links",
        "Test direct checkout on a high-traffic day",
      ],
      impact: "+$1.8K–$4K/mo",
      time: "1–2 weeks",
      confidence: "0.55 confidence",
      beforeValue: 18,
      afterValue: 58,
    },
    {
      step: "03",
      title: "High-Margin Value Offers",
      badge: "1 week",
      problem: "60+ items with no featured bundle above the fold.",
      description:
        "Sweets, drinks, and family specials are the highest-margin items — none are packaged.",
      actions: [
        "Design: 2 specials + 2 desserts + 2 drinks",
        "A la carte ~$72 → bundle at $58–64",
        "Feature above the menu, not below it",
        "Track AOV for 3 weeks in Otter",
      ],
      impact: "+$800–$2K/mo",
      time: "1 week",
      confidence: "0.45 confidence",
      beforeValue: 18,
      afterValue: 42,
    },
  ],
};
