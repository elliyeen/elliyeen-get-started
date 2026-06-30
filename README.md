# Elliyeen Research — Marketing Site

A production marketing site for **Elliyeen Research**, a revenue engineering and website audit consultancy. Built with Next.js 15, Tailwind CSS v4, and TypeScript. Deployed as a static export on Cloudflare Pages.

---

## Live Site

**[www.elliyeen.com](https://www.elliyeen.com)**

---

## Tech Stack

| Layer       | Technology                                      |
|-------------|-------------------------------------------------|
| Framework   | Next.js 16 (App Router, static export)          |
| Styling     | Tailwind CSS v4                                 |
| Language    | TypeScript                                      |
| Icons       | lucide-react                                    |
| Deployment  | Cloudflare Pages (`elliyeen-get-started` project) |
| Source      | GitHub — `elliyeen/elliyeen-get-started`        |

---

## Pages

| Route | Description |
|-------|-------------|
| `/` | Main landing page — hero, case studies carousel, before/after showcase, pricing, pre-footer CTA |
| `/how-it-works` | Four-step process methodology page |
| `/reports` | Audit reports index — four sections, report cards |
| `/reports/sohalal` | So Halal Soul Food full report (interactive wizard) |
| `/spcs-report` | Savannah Personal Care Services case study + before/after |
| `/case-studies/savannah` | Savannah PCS case study detail |
| `/about` | About Elliyeen Research |
| `/faq` | Frequently asked questions |
| `/good-profits` | Good Profits resource page |
| `/vendors` | Vendor directory |
| `/vendors/[id]` | Individual vendor profile pages |
| `/vendors/[id]/qr` | QR code landing pages for vendors |
| `/revenue_card/so-halal-soul-food` | Revenue projection card |
| `/sitemap-page` | HTML sitemap |
| `/accessibility` | Accessibility statement |
| `/privacy` | Privacy policy |
| `/terms` | Terms of service |
| `/do-not-sell` | CCPA do-not-sell |

---

## Project Structure

```
elliyeen-get-started/
├── app/
│   ├── layout.tsx              # Root layout — metadata, JSON-LD schemas
│   ├── page.tsx                # Main landing page
│   ├── globals.css             # Tailwind base + custom animations
│   ├── SiteNav.tsx             # Sticky nav with Resources dropdown
│   ├── MobileNav.tsx           # Mobile menu drawer
│   ├── CyclingWord.tsx         # Cycling hero headline words
│   ├── ScrollReveal.tsx        # Scroll-triggered reveal animations
│   ├── BookingForm.tsx         # Email capture / booking form
│   ├── opengraph-image.tsx     # Dynamic OG image
│   ├── robots.ts               # robots.txt
│   ├── sitemap.ts              # Dynamic XML sitemap
│   ├── how-it-works/           # Process methodology page
│   ├── reports/
│   │   ├── page.tsx            # Reports index
│   │   └── sohalal/            # So Halal full report
│   ├── spcs-report/            # SPCS case study
│   ├── case-studies/savannah/  # Savannah case study
│   ├── about/
│   ├── faq/
│   ├── good-profits/
│   ├── vendors/[id]/           # Dynamic vendor profiles + QR pages
│   ├── revenue_card/           # Revenue projection cards
│   └── [legal pages]/          # accessibility, privacy, terms, do-not-sell
│
├── components/
│   ├── SPCSBeforeAfter.tsx     # Before/after showcase with tab toggle
│   ├── CasesCarousel.tsx       # Three case study carousel
│   ├── CaseStudyCard.tsx       # Individual case study card
│   ├── ReportHero.tsx          # Report page header
│   ├── ReportWizard.tsx        # Interactive report wizard
│   ├── CTASection.tsx          # Call-to-action block
│   ├── EmailCapture.tsx        # Email capture form
│   ├── MetricCard.tsx          # Metric display card
│   ├── MiniBarChart.tsx        # Inline bar chart
│   ├── MiniLineChart.tsx       # Inline line chart
│   ├── OpportunityMap.tsx      # SVG opportunity heatmap
│   ├── OpportunitySizeCard.tsx # Opportunity sizing card
│   ├── BigPictureCard.tsx      # Summary card
│   ├── FindingList.tsx         # Audit finding list
│   ├── RoadmapStep.tsx         # Timeline roadmap step
│   ├── ImpactProjectionCard.tsx# Revenue impact card
│   ├── SectionShell.tsx        # Section wrapper
│   ├── Navigation.tsx          # Shared navigation
│   ├── VendorDirectory.tsx     # Vendor listing
│   ├── VendorProfile.tsx       # Individual vendor page
│   ├── QRLanding.tsx           # QR code landing template
│   ├── SPCSFlipbook.tsx        # PDF flipbook viewer
│   └── vendorData.ts           # Vendor data
│
├── lib/
│   ├── types.ts                # TypeScript type definitions
│   └── report-data.ts          # Report data structures
│
├── public/
│   ├── spcs-before.png         # SPCS original site screenshot
│   ├── spcs-before-lower.png   # SPCS original site — lower section
│   ├── spcs-after.png          # SPCS rebuilt site screenshot
│   ├── spcs-after-care.png     # SPCS rebuilt — care section
│   ├── spcs-after-cta.png      # SPCS rebuilt — CTA + footer
│   ├── spcs-after-footer.png   # SPCS rebuilt — footer detail
│   ├── spcs-report/            # PDF page images (page_01–page_19.jpg)
│   └── logos/                  # Client and partner logos
│
├── next.config.js              # Static export config
├── tailwind.config.ts          # Tailwind theme
├── tsconfig.json               # TypeScript config
└── package.json
```

---

## Design System

### Colors

| Token         | Hex       | Usage                           |
|---------------|-----------|---------------------------------|
| Currency Blue | `#1B5EA8` | Primary — CTAs, accents, links  |
| Dollar Green  | `#85BB65` | "Profit." cycling word          |
| Background    | `#f7f4ee` | Warm off-white page background  |
| Ink           | `#111111` | Body text                       |
| Zinc scale    | Tailwind  | Borders, secondary text, cards  |

### Typography

- **Serif** (headlines): Georgia, via Tailwind `font-serif`
- **Sans** (body): System UI stack
- **Nav / labels**: `tracking-[0.22em]` uppercase small caps

### Navigation

- Desktop: sticky frosted glass bar — logo · How It Works · Industries · Resources (dropdown: Reports, Good Profits) · Pricing · Fix it CTA
- Mobile: hamburger drawer with same links, Resources rendered as a labelled group

---

## Local Development

```bash
npm install
npm run dev
# http://localhost:3000
```

---

## Build & Deploy

```bash
# 1. Build static export
npm run build
# Output: out/

# 2. Deploy to Cloudflare Pages (www.elliyeen.com)
wrangler pages deploy out --project-name=elliyeen-get-started --branch=master

# 3. Commit and push source
git add <files>
git commit -m "your message"
git push origin master
```

### Deployment Architecture

```
Local dev (npm run dev)
    ↓
Edit source files
    ↓
npm run build → out/  (33+ static pages)
    ↓
wrangler pages deploy out
    ↓
Cloudflare CDN → www.elliyeen.com
```

---

## SEO & Schema

`app/layout.tsx` includes:
- Full Open Graph and Twitter card metadata
- `WebSite` + `Organization` + `Person` JSON-LD schemas
- Canonical URLs on all pages
- Dynamic `sitemap.xml` and `robots.txt`
- `FAQPage` and `HowTo` schemas on relevant pages

---

## LinkedIn

[linkedin.com/in/abbasabdullah](https://www.linkedin.com/in/abbasabdullah/)
