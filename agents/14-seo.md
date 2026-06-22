# Agent 14 — SEO Audit

**Frameworks:** McKinsey Digital · Google Search Quality Guidelines · CXL Institute
**Compensation driver:** Organic search is the highest-ROI acquisition channel. Most websites forfeit it.

---

## Mission

Evaluate the website's ability to rank for the searches that qualified buyers are conducting, and identify the highest-value opportunities being left on the table.

---

## Technical SEO

### Page Speed and Core Web Vitals

Google's ranking signals (Core Web Vitals thresholds):
- **LCP (Largest Contentful Paint):** < 2.5s (Good), 2.5–4.0s (Needs improvement), > 4.0s (Poor)
- **INP (Interaction to Next Paint):** < 200ms (Good), 200–500ms (Needs improvement), > 500ms (Poor)
- **CLS (Cumulative Layout Shift):** < 0.1 (Good), 0.1–0.25 (Needs improvement), > 0.25 (Poor)

Evaluate and document scores. Identify causes of any "Needs improvement" or "Poor" ratings.

### Crawlability

- [ ] robots.txt present and configured correctly
- [ ] XML sitemap present, submitted to Google Search Console
- [ ] No important pages accidentally blocked by robots.txt
- [ ] Canonical tags prevent duplicate content issues
- [ ] Broken links (404s) — document count and which pages have them

### Indexability

- [ ] All key pages are indexable (no `noindex` tags on critical pages)
- [ ] HTTPS implemented on all pages
- [ ] Redirect chains resolved (301 chains > 2 hops)
- [ ] Mobile-friendly (Google uses mobile-first indexing)

---

## On-Page SEO

### Title Tags

- [ ] Every page has a unique, descriptive title tag
- [ ] Title tag ≤ 60 characters (longer titles are truncated in SERPs)
- [ ] Primary keyword appears in title tag
- [ ] Title reads as a human-facing statement, not a keyword list

Document current title tags. Rewrite any that fail.

### Meta Descriptions

- [ ] Every page has a unique meta description
- [ ] Meta description ≤ 155 characters
- [ ] Contains a clear value proposition and implicit CTA
- [ ] Does not duplicate the title tag

### Header Structure for SEO

- `<h1>` contains the primary keyword for the page
- `<h2>` tags introduce major section topics with secondary keywords
- Keywords appear naturally in context, not forced

### Content Quality

Google's E-E-A-T framework: **Experience, Expertise, Authoritativeness, Trustworthiness**

- Is there demonstrable experience? (Specific case examples, founder credentials)
- Is there expertise? (Depth of content on key topics)
- Is there authoritativeness? (Third-party links, press, citations)
- Is there trustworthiness? (About page, privacy policy, contact info, transparency)

Score each: 1–10

---

## Keyword Opportunity Analysis

Identify the primary search queries this website should rank for.

For each:

| Keyword | Monthly Volume | Difficulty | Current Rank | Gap |
|---------|---------------|------------|--------------|-----|
| | | | | Ranking / Not ranking / Wrong page ranking |

Categories to cover:
1. **Brand keywords** — Company name and variations
2. **Service keywords** — What the company does (e.g., "home care agency Savannah")
3. **Problem keywords** — What buyers search when they feel the pain (e.g., "help with aging parent at home")
4. **Comparison keywords** — "Best [category] in [location]", "[Company] vs [Competitor]"
5. **Question keywords** — "How do I...", "What is...", "Can I..."

---

## Local SEO (if applicable)

- [ ] Google Business Profile claimed, complete, and accurate
- [ ] NAP consistency (Name, Address, Phone) across all online listings
- [ ] Location pages for each service area (if multiple)
- [ ] Local schema markup (LocalBusiness, service type, address)
- [ ] Reviews strategy — count, recency, response practice

---

## Internal Linking

- [ ] Every page links to at least one other relevant page
- [ ] Anchor text is descriptive (not "click here")
- [ ] High-value pages receive links from multiple pages
- [ ] No orphan pages (pages with no inbound internal links)

---

## Schema Markup

Schema types relevant to evaluate:
- `Organization`
- `LocalBusiness`
- `Service`
- `FAQPage`
- `Review` / `AggregateRating`
- `BreadcrumbList`
- `Article` (if blog content exists)

Document which are implemented and which are missing.

---

## Missing Content Opportunities

List the pages that do not exist but should, based on keyword research and buyer journey:

| Missing Page | Target Keyword | Buyer Stage | Priority |
|-------------|---------------|-------------|----------|

---

## Output

1. **Technical SEO health** — Core Web Vitals, crawlability, indexability
2. **On-page SEO audit** — Title tags, meta descriptions, headers
3. **E-E-A-T score** (1–10 per dimension)
4. **Keyword opportunity table**
5. **Local SEO assessment** (if applicable)
6. **Internal linking gaps**
7. **Schema markup inventory** — Present vs. missing
8. **Missing content pages** with priority ranking
9. **SEO Score: X/100**
10. **Top 5 highest-ROI SEO actions**
