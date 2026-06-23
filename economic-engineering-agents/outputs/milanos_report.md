# Economic Engineering Report: Milano's Pizza
**Date:** 2026-06-23
**Analysis Confidence:** 0.35 — No item-level POS data, COGS data, or margin data was provided. All financial and operational conclusions are [BENCHMARK] or [ASSUMPTION]. This report establishes the framework and identifies the highest-priority data to collect. It should not be used to make major pricing or operations changes without first collecting the missing data listed below.

---

## Executive Summary

Milano's Pizza operates in a market with strong repeat-purchase potential and known demand signals (local delivery, family meals, convenience occasions), but the business has no verified view of which menu items produce the highest margin, what its average order value is, or where kitchen throughput breaks down. The primary constraint is likely financial — the business is almost certainly promoting and fulfilling orders without knowing which products fund its growth and which destroy it. The highest-leverage first action is not a marketing campaign or menu expansion. It is building a margin map from POS data and COGS records, then running a single bundle promotion experiment on the items that emerge as margin leaders. If item-level margin data exists and is accessible, this can begin in Week 1.

---

## Current State

**Estimated Revenue:** [MISSING — no POS data provided]
**Estimated Gross Margin:** [BENCHMARK] 60–72% on food before labor and overhead (typical pizza QSR range)
**Primary Revenue Driver:** Delivery and pickup pizza orders
**Throughput:** [MISSING — orders/hour during peak not provided]
**Quality Score:** [MISSING — no defect or refund rate data provided]

**Strengths:**
- [ASSUMPTION] Established local brand with repeat customer base — any pizza business that has survived 2+ years has proven demand
- [ASSUMPTION] Physical kitchen and delivery infrastructure already in place — capacity to scale exists
- [BENCHMARK] Pizza has one of the highest gross margins in QSR when COGS is managed correctly

**Weaknesses:**
- [MISSING] No confirmed view of item-level margin — impossible to know which products fund growth
- [ASSUMPTION] No formal upsell or cross-sell mechanism — every order is a single-item decision
- [ASSUMPTION] No loyalty mechanism capturing repeat customers — repeat business is informal and untracked
- [BENCHMARK] Third-party delivery platforms (DoorDash, Uber Eats) charge 15–30% of order value, potentially converting profitable orders into loss-leaders

---

## Primary Constraint

**Constraint:** Lack of margin visibility — the business cannot allocate promotional effort or kitchen priority to high-margin items because it does not know which items they are.
**Type:** Financial
**Why This Is the Constraint:** [ASSUMPTION] A business that doesn't know its margin by product cannot systematically improve it. Every other recommendation in this report — bundles, upsells, pricing changes — requires knowing which items to promote first. Without a margin map, changes are guesses. The constraint is not demand (people are buying), not capacity (the kitchen is operating), and not quality (no verified defect data). It is financial blindness.
**Estimated Profit Impact If Resolved:** [ASSUMPTION] Reallocating promotional effort from low-margin to high-margin items could improve gross margin per order by 8–15 percentage points with zero additional revenue required.
**Confidence:** 0.4

---

## Top Profit Opportunities

### Opportunity 1 — Build the Margin Map and Promote High-Margin Items
**Opportunity Score:** 82/100
**Score Breakdown:** Profit Impact 28 + Customer Value 12 + Speed 14 + Confidence 10 + Strategic Value 10 − Risk 3 − Complexity 1 = 82 (Note: high profit potential, lower confidence due to missing COGS data)
**Confidence:** 0.45
**Expected Margin Impact:** [ASSUMPTION] Shifting 20% of order volume toward highest-margin items = estimated 4–8% gross margin improvement on total revenue
**Agent Source:** Profit Engineering Agent + Demand Engineering Agent
**Evidence:**
- [BENCHMARK] Pizza operations with known margin maps consistently outperform those without by 6–11% gross margin (industry analysis)
- [ASSUMPTION] Milano's likely has 3–5 items that are significantly higher margin than the rest — promoting these without changing the product requires only repositioning and menu layout
- [ASSUMPTION] Premium specialty pizzas typically carry 8–14 percentage points higher margin than basic pepperoni due to perceived value vs. actual ingredient cost difference
**Experiment Required:** Yes — see Recommended First Experiment
**First Action:** Pull POS data by item for last 90 days. Pull COGS per item (ingredient cost per pizza). Calculate contribution margin per unit. Rank all items.

---

### Opportunity 2 — Introduce a Family Bundle at a Featured Price Point
**Opportunity Score:** 76/100
**Score Breakdown:** Profit Impact 24 + Customer Value 18 + Speed 13 + Confidence 9 + Strategic Value 8 − Risk 3 − Complexity 5 = 76 (Note: bundle design requires margin data first)
**Confidence:** 0.5
**Expected Margin Impact:** [ASSUMPTION] Average order value increase from ~$22 to ~$34 on bundle orders = 55% AOV lift; if bundle margin ≥ individual item average margin, net margin per transaction improves
**Agent Source:** Profit Engineering Agent + Customer Understanding Agent
**Evidence:**
- [BENCHMARK] QSR bundle offers consistently increase AOV by 35–60% when placed prominently at point of decision
- [ASSUMPTION] Milano's customers buying for families or groups (Friday/Saturday dinner, game nights) are already spending $30–45 across multiple orders — a well-designed bundle consolidates this into one higher-margin transaction
- [BENCHMARK] "Family meal" framing in pizza reduces the perceived price-per-person, increasing purchase probability for the bundle vs. individual items
**Experiment Required:** Yes
**First Action:** Design one bundle (Large pizza + wings or sides + 2-liter drink) at a price point that maintains or improves margin vs. components sold separately. Test for 3 weeks.

---

### Opportunity 3 — Capture Repeat Customers with a Non-Discount Loyalty Mechanism
**Opportunity Score:** 68/100
**Score Breakdown:** Profit Impact 20 + Customer Value 16 + Speed 10 + Confidence 11 + Strategic Value 10 − Risk 4 − Complexity 5 = 68
**Confidence:** 0.5
**Expected Margin Impact:** [ASSUMPTION] Increasing repeat purchase rate from an assumed 35% to 45% within 90 days = 10 additional visits per 100 customers per quarter; at $22 AOV = $220 additional revenue per 100 customers with near-zero incremental acquisition cost
**Agent Source:** Demand Engineering Agent + Customer Understanding Agent
**Evidence:**
- [BENCHMARK] Acquiring a new pizza customer costs 5–7× more than retaining an existing one
- [BENCHMARK] Pizza loyalty programs that reward without discounting (free item after X orders rather than % off) maintain margin while increasing return frequency
- [ASSUMPTION] Milano's has no current mechanism to identify repeat customers or encourage return visits — every customer effectively resets
**Experiment Required:** Yes
**First Action:** Implement simple stamp card or digital equivalent. "Order 5 times, get free garlic bread." Track redemption rate and repeat purchase frequency over 60 days.

---

## Waste Found

| Waste Type | Description | Estimated Annual Cost | Confidence |
|---|---|---|---|
| Overproduction | Food prepped but not ordered — dough, toppings, sides spoiling at end of shift | [ASSUMPTION] 4–8% of food COGS | 0.3 |
| Defects | Wrong orders requiring remake or refund — estimated 3–5% of orders based on industry | [ASSUMPTION] $3,000–$8,000/year depending on volume | 0.3 |
| Inventory | Third-party delivery fees eating 15–30% of delivery order revenue | [MISSING — platform not confirmed] | 0.2 |
| Underutilization | Kitchen labor during off-peak hours (2pm–5pm weekdays) likely overstaffed relative to order volume | [ASSUMPTION] Potential 15–20% labor cost reduction in off-peak with scheduling adjustment | 0.3 |

---

## Quality Risks

| Risk | Customer Impact | Financial Impact | Prevention Action |
|---|---|---|---|
| Cold pizza on delivery | Negative review, no repeat order, potential refund | [ASSUMPTION] $280 lost LTV per churned customer | Packaging review + delivery time standard |
| Wrong order | Immediate trust destruction — often permanent | [ASSUMPTION] 50% of wrong-order customers do not return | Ticket verification checklist before handoff |
| Inconsistent taste | Gradual erosion of "reliability" — the core reason customers repeat | Slow churn, difficult to diagnose | Recipe card and portion standard per item |
| Missing items on bundled orders | Generates complaint, refund, and bad review | Direct refund cost + churn cost | Assembly checklist for every bundled order |

---

## Recommended First Experiment

**Experiment Name:** Specialty Bundle Featured Placement Test

**Hypothesis:** If we place a featured Family Bundle (Large specialty pizza + one side + drinks) at the top of the online menu and order flow, then average order value will increase by ≥15% within 3 weeks, because customers making a group purchase decision will consolidate into a single bundle transaction rather than building a la carte.

**Control:** Current menu layout — individual pizzas listed first, no bundle featured prominently.

**Variant:** Family Bundle box placed above individual pizzas on the online ordering page and any in-store menu board. Bundle priced at $38–42 (must verify margin before setting price). No other changes to the ordering experience.

**Primary Metric:** Average order value (AOV) across all orders during the test period.

**Secondary Metrics:** Bundle attach rate (% of orders that include the bundle), gross margin per order (if COGS data is available), total orders (to verify volume is not displaced).

**Success Threshold:** AOV increases by ≥15% with gross margin per order maintained or improved.

**Duration:** 3 weeks — must capture two full weekends (Friday/Saturday are assumed peak).

**Minimum Observations Needed:** [BENCHMARK] 150+ orders per condition for statistical confidence. At 30 orders/day assumed, 3 weeks = ~630 total orders. Sufficient.

**Decision Rule:**
- If AOV ↑ ≥15% with margin maintained: implement bundle permanently, test second bundle variant
- If AOV ↑ <15% or margin decreases: review bundle pricing and composition, run second test with different price point or components

**Risk Controls:**
- Do not run during an unusual week (holiday, local event) that would distort normal ordering behavior
- Monitor total order volume — if orders decrease significantly, pause test
- Do not change any other element of the menu or ordering flow during test period

**Estimated Cost to Run:** Design time for bundle ($0–$200 for digital menu update) + 3 weeks of measurement

---

## Expected Margin Impact

**If all three opportunities are validated by experiment:**
- Opportunity 1 (margin map + high-margin promotion): +4–8% gross margin improvement on total revenue [ASSUMPTION]
- Opportunity 2 (bundle): +15–20% AOV improvement on bundle-adopting orders [ASSUMPTION]
- Opportunity 3 (loyalty): +8–12% repeat visit rate improvement within 90 days [ASSUMPTION]

**Combined expected annual impact:** [ASSUMPTION] $15,000–$45,000 net improvement depending on current revenue base (which is [MISSING]).

**Important:** These figures are structural estimates based on industry benchmarks. Actual impact requires baseline measurement first. Do not budget for these outcomes until at least one experiment validates the direction.

---

## Missing Data

| Data Needed | Why It Matters | How to Get It | Priority |
|---|---|---|---|
| Item-level COGS | Without this, cannot identify margin leaders or design profitable bundles | Pull ingredient cost per item from supplier invoices + recipe cards | HIGH |
| Current average order value | Baseline required for any AOV improvement experiment | POS system report — 90-day average | HIGH |
| Item-level sales volume (last 90 days) | Identify demand leaders and demand-margin intersection | POS system export by SKU | HIGH |
| Refund and complaint rate by category | Quantify quality waste and prioritize defect prevention | POS/delivery platform complaint log | HIGH |
| Repeat customer rate | Baseline for loyalty experiment | POS customer records or delivery platform data | MEDIUM |
| Peak hour throughput (orders/hour) | Identify operational constraint | POS time-stamp data | MEDIUM |
| Third-party platform fee rate | Determine true margin on delivery orders | Platform fee agreement | MEDIUM |
| Food waste percentage | Quantify overproduction waste | Daily waste log (if not tracked, start now) | MEDIUM |
| Labor hours and cost by shift | Model labor efficiency | Payroll / scheduling system | LOW |

---

## 30-Day Roadmap

| Week | Action | Owner | Expected Output |
|---|---|---|---|
| Week 1 | Pull 90-day POS data by item. Pull COGS per item from supplier records. Calculate contribution margin per item. | Owner / Manager | Margin map: ranked list of all items by margin |
| Week 2 | Identify top 3 margin leaders. Design Family Bundle using highest-margin combination. Set bundle price to maintain margin. Update online menu to feature bundle. | Owner | Bundle live on ordering platform |
| Week 3 | Run bundle experiment. Track AOV daily. Do not change anything else. | Manager | Week 1 experiment data |
| Week 4 | Review experiment results against 15% AOV threshold. Make go/no-go decision. Begin designing loyalty mechanism. | Owner | Experiment decision + loyalty draft |

---

## 90-Day Roadmap

| Month | Action | Depends On | Expected Output |
|---|---|---|---|
| Month 1 | Build margin map. Run bundle experiment. Establish baseline AOV, order volume, repeat rate. | — | Validated data foundation |
| Month 2 | If bundle succeeds: implement permanently and test second bundle variant. Launch loyalty mechanism. Begin tracking repeat rate. | Month 1 experiment result | Permanent bundle + loyalty system live |
| Month 3 | Analyze loyalty data. Identify top 20% most frequent customers. Test premium tier offer or early access reward to increase their spend. Review quality defect log and implement top prevention system. | Month 2 data | Customer retention improvement + quality baseline |

---

## Assumptions Log

All assumptions used in this report, ranked by potential impact on analysis:

1. **[ASSUMPTION]** Milano's does not currently have a formal margin map or item-level profitability view. If one exists, Opportunity 1 is already partially addressed.
2. **[ASSUMPTION]** The primary constraint is financial (margin blindness), not operational (kitchen capacity). If kitchen throughput data shows a hard capacity ceiling during peak hours, the constraint classification changes and the roadmap shifts.
3. **[ASSUMPTION]** Third-party delivery platform fees (if applicable) are consuming 15–30% of delivery order revenue. If Milano's operates primarily on direct orders, this risk is lower.
4. **[ASSUMPTION]** Current average order value is approximately $22–$28. The bundle experiment target of 15% AOV improvement is calibrated to this baseline.
5. **[BENCHMARK]** All financial impact estimates use industry benchmarks, not Milano's actual data. Real impact may be higher or lower depending on current revenue base and margin structure.
6. **[ASSUMPTION]** Customer repeat rate is approximately 35–40% within 90 days. If significantly lower, retention opportunity is larger. If higher, retention is already a strength.

---

*This report was generated by the Economic Engineering Agent System. All [ASSUMPTION] and [BENCHMARK] items must be validated against actual Milano's Pizza data before major decisions are implemented. The first week's priority is data collection, not action.*
