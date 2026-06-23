# Test Case: Milano's Pizza

## Objective

Increase profit without guessing. Identify the highest-leverage action the business can take in the next 30 days, backed by evidence or clearly stated assumptions.

---

## Business Profile

```json
{
  "business_name": "Milano's Pizza",
  "industry": "Food & Beverage / Quick Service Restaurant",
  "business_model": "B2C",
  "target_customer": {
    "description": "Local families, young adults, and working professionals within a 5-mile delivery radius seeking convenient, quality pizza for dinner",
    "primary_pain": "Need dinner quickly without cooking — especially on weeknights and weekends"
  },
  "primary_offer": "Pizza delivery and pickup — specialty and traditional pies, sides, drinks",
  "revenue_streams": [
    { "name": "Delivery orders", "revenue_share_percent": null },
    { "name": "Pickup orders", "revenue_share_percent": null },
    { "name": "Catering (if offered)", "revenue_share_percent": null }
  ],
  "cost_drivers": [
    { "category": "Food/ingredients (COGS)" },
    { "category": "Labor (kitchen + delivery)" },
    { "category": "Delivery platform fees (if using third-party)" },
    { "category": "Rent/utilities" },
    { "category": "Packaging" }
  ],
  "current_goal": "Increase net profit without adding locations or significant overhead",
  "current_challenges": [
    "Unknown which menu items produce the highest margin",
    "No formal upsell or bundle strategy",
    "Average order value not tracked or optimized",
    "No loyalty mechanism beyond informal repeat purchase",
    "Delivery timing inconsistency during peak hours"
  ],
  "constraints_known": [
    "Kitchen throughput during Friday/Saturday peak (assumed)",
    "Delivery radius limited by driver availability",
    "No formal POS reporting by item margin"
  ],
  "available_data_sources": [
    {
      "source": "POS system",
      "data_available": "Order volume by item (assumed available — must verify format)",
      "date_range": "Last 90 days assumed"
    },
    {
      "source": "Google Reviews",
      "data_available": "Customer feedback and common praise/complaint patterns",
      "date_range": "All-time"
    },
    {
      "source": "Delivery platform (if using)",
      "data_available": "Delivery time, order accuracy, customer ratings",
      "date_range": "Varies"
    }
  ],
  "missing_critical_data": [
    "Item-level COGS (ingredient cost per pizza)",
    "Gross margin by SKU",
    "Average order value (current)",
    "Repeat purchase rate by customer",
    "Peak hour throughput data (orders/hour)",
    "Refund and complaint rate by category",
    "Food waste / spoilage percentage",
    "Labor cost per order"
  ]
}
```

---

## Questions the System Must Answer

1. What menu item should Milano's promote first to maximize profit per order?
2. Which items create waste (low margin, low volume, high complexity)?
3. Which bundle should be tested first to increase average order value?
4. Where is the primary operational bottleneck?
5. What experiment should run first, and what does success look like?

---

## Required Output

- Top 3 profit opportunities (ranked by Opportunity Score)
- Top 3 waste reduction targets
- Primary constraint identification
- First structured experiment with hypothesis, control, variant, metric, and decision rule
- Expected margin impact
- All missing data clearly labeled
- 30-day roadmap
- 90-day roadmap

---

## Data Status Key

All agent analysis for this test case must use the following labels:

| Label | Meaning |
|---|---|
| `[VERIFIED]` | Confirmed from provided data |
| `[BENCHMARK]` | Industry average — not specific to Milano's |
| `[ASSUMPTION]` | Structural reasoning — not from data |
| `[MISSING]` | Data required but not available |

---

## Known Assumptions for This Analysis

Since no actual POS data has been provided, the following industry benchmarks apply:

- Pizza restaurant gross margin: 60–75% on food (varies significantly by item and COGS)
- Average order value for pizza delivery: $22–$38 depending on market
- Repeat customer rate for local pizza: 35–50% within 90 days (highly variable)
- Food waste in QSR: 4–10% of food COGS
- Delivery complaint rate industry average: 3–7% of orders
- Third-party delivery platform fee: 15–30% of order value (if applicable)
- Kitchen labor: 28–35% of revenue in typical pizza operation

All recommendations must be validated against actual Milano's data before implementation.
