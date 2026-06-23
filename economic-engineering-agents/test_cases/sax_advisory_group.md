# Test Case: SAX Advisory Group

## Objective

Attract and convert more high-net-worth professionals. Identify the highest-leverage action to increase qualified consultation bookings, close rate, and lifetime client value — backed by evidence or clearly stated assumptions.

---

## Business Profile

```json
{
  "business_name": "SAX Advisory Group",
  "industry": "Financial Advisory / Wealth Management",
  "business_model": "B2B / B2C Retainer and Project-based",
  "target_customer": {
    "description": "High-net-worth professionals — business owners, executives, medical professionals, inheritors — with $500K+ in investable assets seeking comprehensive financial planning",
    "primary_pain": "Managing wealth complexity without making a catastrophic mistake — taxes, legacy, investment, and protection all at once"
  },
  "primary_offer": "Comprehensive financial advisory — wealth management, tax planning, estate planning, retirement strategy",
  "revenue_streams": [
    { "name": "AUM-based advisory fees", "revenue_share_percent": null },
    { "name": "Financial planning retainer fees", "revenue_share_percent": null },
    { "name": "Project-based engagements (estate, tax)", "revenue_share_percent": null }
  ],
  "cost_drivers": [
    { "category": "Advisor compensation" },
    { "category": "Office and technology overhead" },
    { "category": "Compliance and regulatory costs" },
    { "category": "Marketing and client acquisition" },
    { "category": "Administrative staff" }
  ],
  "current_goal": "Increase qualified consultation bookings and convert a higher percentage to long-term advisory clients",
  "current_challenges": [
    "Website does not clearly signal high-net-worth positioning",
    "Consultation booking process has friction",
    "Proposal turnaround time is slow",
    "No formal referral program despite high client satisfaction",
    "Advisors spending significant time on unqualified prospects",
    "No signature lead magnet or content asset driving qualified inbound"
  ],
  "constraints_known": [
    "Advisor capacity may be at or near ceiling for additional clients",
    "Current website CTA is generic — not differentiated for HNW audience",
    "No formal qualification framework for consultation calls"
  ],
  "available_data_sources": [
    {
      "source": "Website (assumed)",
      "data_available": "Pages, CTAs, service descriptions",
      "date_range": "Current"
    },
    {
      "source": "CRM (assumed)",
      "data_available": "Lead records, consultation bookings, close rate",
      "date_range": "Unknown"
    },
    {
      "source": "Client records",
      "data_available": "Client tenure, service mix, referral source",
      "date_range": "Historical"
    }
  ],
  "missing_critical_data": [
    "Current consultation booking rate (visitors to booking)",
    "Close rate (discovery calls to signed clients)",
    "Average client value (annual fees)",
    "Client lifetime value (average tenure × annual fees)",
    "Advisor utilization rate (% of available capacity currently filled)",
    "Proposal turnaround time (average days from discovery to proposal)",
    "Referral rate (% of clients who have referred at least one prospect)",
    "Lead source breakdown (where do current clients find SAX?)",
    "Unqualified call rate (% of consultations that don't advance)"
  ]
}
```

---

## Questions the System Must Answer

1. What service or offer should be positioned as the premium entry point for HNW clients?
2. What friction is blocking consultation bookings on the current website?
3. What trust proof is missing from the current client acquisition process?
4. What AI-assisted or templated experience should be tested for onboarding?
5. What offer or mechanism increases lifetime client value?

---

## Required Output

- Top 3 client acquisition opportunities (ranked by Opportunity Score)
- Top 3 trust and friction issues
- Primary constraint identification
- First structured experiment with hypothesis, control, variant, metric, and decision rule
- Expected revenue impact
- All missing data clearly labeled
- 30-day roadmap
- 90-day roadmap

---

## Data Status Key

All agent analysis for this test case must use the following labels:

| Label | Meaning |
|---|---|
| `[VERIFIED]` | Confirmed from provided data |
| `[BENCHMARK]` | Industry average — not specific to SAX |
| `[ASSUMPTION]` | Structural reasoning — not from data |
| `[MISSING]` | Data required but not available |

---

## Known Assumptions for This Analysis

Since no actual CRM or financial data has been provided, the following industry benchmarks apply:

- RIA (Registered Investment Advisor) average close rate on qualified consultations: 30–50%
- Financial advisory average client lifetime: 8–12 years
- AUM-based fee typical range: 0.75–1.25% annually
- HNW client minimum investable assets for efficient advisory: $500K+
- Referral-sourced clients close at 2–3× the rate of cold-sourced leads
- Website-to-consultation booking conversion (financial advisory): 1–3% typical; 5–8% with optimized page
- Time from discovery call to signed engagement: 2–6 weeks typical
- Advisor client load: 80–120 clients per advisor at full capacity (varies by service model)

All recommendations must be validated against actual SAX Advisory data before implementation.
