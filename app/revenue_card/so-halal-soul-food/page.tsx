import type { Metadata } from "next";
import Image from "next/image";
import { reportData } from "@/lib/report-data";
import SiteNav from "@/app/SiteNav";
import { ReportHero } from "@/components/ReportHero";
import { BigPictureCard } from "@/components/BigPictureCard";
import { ReportWizard } from "@/components/ReportWizard";

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

const PAGE_URL = "https://www.elliyeen.com/revenue_card/so-halal-soul-food";
const PAGE_IMAGE = "https://www.elliyeen.com/1000191521.jpg";

export const metadata: Metadata = {
  title: {
    absolute: "So Halal Soul Food — Revenue & CX Audit · Elliyeen Research",
  },
  description:
    "Mobile site broken on every phone. Order flow losing conversions at peak intent. Three ranked fixes worth $1.2K–$3K/mo verified upside for So Halal Soul Food, Stone Mountain, GA.",
  keywords: [
    "So Halal Soul Food",
    "Stone Mountain GA restaurant",
    "halal soul food restaurant audit",
    "restaurant website audit",
    "restaurant revenue optimization",
    "restaurant mobile experience",
    "Elliyeen Research",
    "QSR conversion rate",
  ],
  authors: [{ name: "Elliyeen Research", url: "https://www.elliyeen.com" }],
  alternates: { canonical: PAGE_URL },
  openGraph: {
    title: "So Halal Soul Food — Revenue & CX Audit Report",
    description:
      "Site renders 1336px wide on a 390px screen. Three ranked fixes. $1.2K–$3K/mo verified web channel upside for So Halal Soul Food.",
    url: PAGE_URL,
    siteName: "Elliyeen Research",
    type: "article",
    publishedTime: "2026-06-25T00:00:00.000Z",
    modifiedTime: "2026-06-25T00:00:00.000Z",
    authors: ["https://www.elliyeen.com"],
    images: [
      {
        url: PAGE_IMAGE,
        width: 1200,
        height: 630,
        alt: "So Halal Soul Food — Revenue & CX Audit by Elliyeen Research",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "So Halal Soul Food — Revenue & CX Audit Report",
    description:
      "Three ranked fixes worth $1.2K–$3K/mo for So Halal Soul Food, Stone Mountain, GA.",
    images: [PAGE_IMAGE],
  },
};

const breadcrumbSchema = {
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  "@id": `${PAGE_URL}#breadcrumb`,
  itemListElement: [
    { "@type": "ListItem", position: 1, name: "Home", item: "https://www.elliyeen.com" },
    { "@type": "ListItem", position: 2, name: "Reports", item: "https://www.elliyeen.com/reports" },
    { "@type": "ListItem", position: 3, name: "So Halal Soul Food — Revenue Audit", item: PAGE_URL },
  ],
};

const articleSchema = {
  "@context": "https://schema.org",
  "@type": "Article",
  "@id": `${PAGE_URL}#article`,
  headline: "So Halal Soul Food — Revenue & CX Audit Report",
  description:
    "Mobile rendering broken on every phone. Order flow losing conversions at peak intent. Three ranked fixes worth $1.2K–$3K/mo verified upside.",
  datePublished: "2026-06-25",
  dateModified: "2026-06-25",
  author: { "@id": "https://www.elliyeen.com/#person" },
  publisher: { "@id": "https://www.elliyeen.com/#organization" },
  url: PAGE_URL,
  mainEntityOfPage: { "@type": "WebPage", "@id": PAGE_URL },
  image: { "@type": "ImageObject", url: PAGE_IMAGE, width: 1200, height: 630 },
  about: {
    "@type": "LocalBusiness",
    name: "So Halal Soul Food",
    url: "https://www.sohalalsoulfood.com",
    servesCuisine: ["Soul Food", "Halal", "Caribbean"],
    address: {
      "@type": "PostalAddress",
      addressLocality: "Stone Mountain",
      addressRegion: "GA",
      addressCountry: "US",
    },
  },
  keywords:
    "So Halal Soul Food, restaurant revenue audit, mobile experience, Stone Mountain GA, halal restaurant, conversion optimization",
};

const webPageSchema = {
  "@context": "https://schema.org",
  "@type": "WebPage",
  "@id": PAGE_URL,
  url: PAGE_URL,
  name: "So Halal Soul Food — Revenue & CX Audit Report",
  description:
    "Mobile rendering broken on every phone. Three ranked fixes worth $1.2K–$3K/mo for So Halal Soul Food, Stone Mountain, GA.",
  inLanguage: "en-US",
  isPartOf: {
    "@type": "WebSite",
    "@id": "https://www.elliyeen.com/#website",
    url: "https://www.elliyeen.com",
    name: "Elliyeen Research",
  },
  breadcrumb: { "@id": `${PAGE_URL}#breadcrumb` },
  potentialAction: { "@type": "ReadAction", target: PAGE_URL },
};

export default function SoHalalReportPage() {
  return (
    <main
      className="min-h-screen text-[#111111]"
      style={{ backgroundColor: "#FBFAF7" }}
    >
      {/* ── Structured data ──────────────────────────────────────── */}
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageSchema) }} />

      {/* ── Navigation ──────────────────────────────────────────── */}
      <SiteNav />

      {/* ── Hero ────────────────────────────────────────────────── */}
      <ReportHero
        eyebrow="Revenue & CX Audit · June 2026"
        businessName={reportData.business.name}
        location={reportData.business.location}
        website={reportData.business.website}
        description={reportData.business.description}
        imageSrc={reportData.business.imageSrc}
        metrics={reportData.heroMetrics}
        confidenceNote={reportData.business.confidence}
      />

      {/* ── Your Agentic Revenue Team ────────────────────────────── */}
      <section id="revenue-team" className="mx-auto max-w-[1280px] px-4 py-12 text-center sm:px-8 sm:py-20">
        <h2 className="font-serif t-heading font-bold text-[#111111]">
          Your Agentic Revenue Team
        </h2>
        <p className="mx-auto mt-4 text-[#111111]" style={{ fontSize: 16, lineHeight: 1.7, maxWidth: 520 }}>
          Find money that is left on the table. Improve customer experience and increase your revenue.
        </p>

        <div className="mt-10 grid gap-5 text-left md:grid-cols-2 lg:grid-cols-4">
          {reportData.bigPicture.map((item) => (
            <div key={item.title} className="rounded-2xl border border-[#E7E2DA] bg-white" style={{ boxShadow: "0 2px 16px rgba(0,0,0,0.05)" }}>
              <BigPictureCard {...item} />
            </div>
          ))}
        </div>
      </section>

      {/* ── Key Findings ────────────────────────────────────────── */}
      <section id="key-findings" className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-20">
        <div className="grid items-center gap-8 lg:grid-cols-[1.1fr_0.9fr] lg:gap-16">

          {/* ── Left: numbered findings ───────────────────────────── */}
          <div className="rounded-2xl border border-[#E7E2DA] bg-white p-5 sm:p-8" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
            <p className="mb-6 text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">
              Finding · Annual Impact
            </p>
            <div className="space-y-0">
              {reportData.findings.map((f) => (
                <div key={f.rank} className="flex items-start gap-5 border-b border-[#F7EEE7] py-5 last:border-0">
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-[#111111]">{f.title}</p>
                    <p className="mt-0.5 text-xs text-[#111111]">{f.description}</p>
                  </div>
                  <span className="shrink-0 font-mono text-sm font-bold text-[#B91C1C]">{f.value}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── Right: label + headline + opportunity size ─────────── */}
          <div>
            {/* Label */}
            <span className="text-xs font-bold uppercase tracking-[0.2em]" style={{ color: "#B91C1C" }}>
              Key Findings
            </span>

            {/* Headline */}
            <h2 className="mt-4 font-serif t-title font-bold text-[#111111]">
              What&apos;s costing you customers and revenue.
            </h2>

            <p className="mt-4 text-sm leading-6 text-[#111111]">
              These aren&apos;t hypothetical gaps. Every finding below was verified against the live site, menu pricing, and QSR industry benchmarks.
            </p>

            {/* Opportunity size */}
            <div className="mt-8 space-y-4">
              <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#111111]">Opportunity Size · 10-Month Impact</p>
              {reportData.opportunitySize.map((item) => (
                <div key={item.label} className="flex items-center justify-between border-b border-[#F7EEE7] pb-4">
                  <span className="text-sm text-[#111111]">{item.label}</span>
                  <span className="font-mono text-sm font-bold text-[#111111]">{item.value}</span>
                </div>
              ))}
              {/* Total */}
              <div className="border-t border-[#E7E2DA] pt-4 text-right">
                <p className="text-xs font-semibold text-[#111111]">Total Impact</p>
                <p className="mt-1 font-mono text-2xl font-bold text-[#111111]">$1.2K–$3K <span className="text-base font-normal text-[#8A837A]">/mo</span></p>
                <p className="mt-1 text-[10px] text-[#8A837A]">Web channel only — validate with POS data for total impact</p>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Roadmap ─────────────────────────────────────────────── */}
      <section id="roadmap" className="mx-auto max-w-[1280px] px-4 py-14 sm:px-8 lg:py-24">

        {/* Header */}
        <div className="mb-8 lg:mb-14">
          {/* Chip */}
          <span
            className="mb-5 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
            style={{ backgroundColor: "#EDE8E0" }}
          >
            The Roadmap
          </span>
          {/* Headline */}
          <h2 className="font-serif t-title font-bold text-[#111111]">
            Three moves.<br />Maximum impact.
          </h2>
          {/* Description — left-aligned, under headline */}
          <p className="mt-4 max-w-[480px] text-sm leading-7 text-[#555552]">
            Ranked by confidence and speed to implement. Fix mobile first — it unblocks the other two and stops the bleeding immediately.
          </p>
        </div>

        {/* Step cards */}
        <div className="grid gap-4 lg:grid-cols-3">

          {/* ── Move 01 ── */}
          <div className="relative rounded-2xl border border-[#E7E2DA] bg-white p-5 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
            {/* Arrow */}
            <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#E7E2DA] text-[#BBBAB4] text-xs" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
              →
            </div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]">Move 1</span>
            <h3 className="mb-3 font-serif text-[19px] font-bold leading-snug text-[#111111]">Fix Mobile Experience</h3>
            <p className="mb-6 text-[13px] leading-[1.7] text-[#555552]">
              Eliminate horizontal scroll, optimize for every phone, and remove conversion friction at peak ordering intent.
            </p>
            <div className="space-y-3 border-t border-[#F0EBE3] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Impact</span>
                <span className="font-mono text-[13px] font-bold text-[#111111]">+$2K–$4K/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Time</span>
                <span className="text-[12px] font-semibold text-[#111111]">2–4 hours</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-24 rounded-full bg-[#EDE8E0]">
                    <div className="h-1 rounded-full bg-[#111111]" style={{ width: "85%" }} />
                  </div>
                  <span className="text-[11px] font-bold tabular-nums text-[#111111]">0.85</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Move 02 ── */}
          <div className="relative rounded-2xl border border-[#E7E2DA] bg-white p-5 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
            <div className="absolute -right-3 top-1/2 z-10 hidden -translate-y-1/2 lg:flex h-6 w-6 items-center justify-center rounded-full bg-white border border-[#E7E2DA] text-[#BBBAB4] text-xs" style={{ boxShadow: "0 1px 6px rgba(0,0,0,0.07)" }}>
              →
            </div>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]">Move 2</span>
            <h3 className="mb-3 font-serif text-[19px] font-bold leading-snug text-[#111111]">Optimizing Menu</h3>
            <p className="mb-6 text-[13px] leading-[1.7] text-[#555552]">
              Add direct ordering with Otter or similar to eliminate 20–30% third-party commission fees on every order.
            </p>
            <div className="space-y-3 border-t border-[#F0EBE3] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Impact</span>
                <span className="font-mono text-[13px] font-bold text-[#111111]">+$1.8K–$4K/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Time</span>
                <span className="text-[12px] font-semibold text-[#111111]">1–2 weeks</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-24 rounded-full bg-[#EDE8E0]">
                    <div className="h-1 rounded-full bg-[#111111]" style={{ width: "40%" }} />
                  </div>
                  <span className="text-[11px] font-bold tabular-nums text-[#111111]">0.40</span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Move 03 ── */}
          <div className="relative rounded-2xl border border-[#E7E2DA] bg-white p-5 sm:p-7 transition-all duration-200 hover:-translate-y-1 hover:shadow-[0_8px_32px_rgba(0,0,0,0.10)]" style={{ boxShadow: "0 2px 20px rgba(0,0,0,0.04)" }}>
            <span className="mb-4 block text-[10px] font-bold uppercase tracking-[0.2em] text-[#111111]">Move 3</span>
            <h3 className="mb-3 font-serif text-[19px] font-bold leading-snug text-[#111111]">Build Higher-Value Offers</h3>
            <p className="mb-6 text-[13px] leading-[1.7] text-[#555552]">
              Introduce bundles and family meals to increase average order value without adding seats or staff.
            </p>
            <div className="space-y-3 border-t border-[#F0EBE3] pt-5">
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Impact</span>
                <span className="font-mono text-[13px] font-bold text-[#111111]">+$800–$2K/mo</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Time</span>
                <span className="text-[12px] font-semibold text-[#111111]">1 week</span>
              </div>
              <div className="flex items-center justify-between gap-4">
                <span className="text-[11px] uppercase tracking-[0.12em] text-[#9E9994]">Confidence</span>
                <div className="flex items-center gap-2">
                  <div className="h-1 w-24 rounded-full bg-[#EDE8E0]">
                    <div className="h-1 rounded-full bg-[#111111]" style={{ width: "45%" }} />
                  </div>
                  <span className="text-[11px] font-bold tabular-nums text-[#111111]">0.45</span>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

      {/* ── Revenue Model Assumptions ────────────────────────────── */}
      <section id="assumptions" className="mx-auto max-w-[1280px] px-4 py-12 sm:px-8 sm:py-20">

        {/* Header */}
        <div className="mb-6 sm:mb-10">
          <span
            className="mb-5 inline-block rounded-full px-3 py-1 text-[11px] font-bold uppercase tracking-[0.18em] text-[#111111]"
            style={{ backgroundColor: "#EDE8E0" }}
          >
            Financial Analysis
          </span>
          <h2 className="font-serif t-title font-bold text-[#111111]">
            Revenue model assumptions.
          </h2>
          <p className="mt-3 max-w-[520px] text-sm leading-7 text-[#555552]">
            All projections use conservative estimates. No POS or revenue data was available — figures derived from menu analysis, site audit, and QSR industry benchmarks.
          </p>
        </div>

        {/* Assumptions table card */}
        <div className="rounded-2xl border border-[#E7E2DA] bg-white overflow-hidden" style={{ boxShadow: "0 4px 24px rgba(0,0,0,0.05)" }}>
          {/* Table header */}
          <div className="grid grid-cols-[1fr_auto] border-b border-[#F0EBE3] px-5 py-4 sm:grid-cols-[2fr_1.2fr_2fr] sm:px-7">
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E9994]">Assumption</span>
            <span className="text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E9994]">Value</span>
            <span className="hidden text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E9994] sm:block">Source / Note</span>
          </div>
          {/* Rows */}
          {[
            {
              assumption: "Monthly website visits",
              value: "~6,000",
              note: "Estimated — Google search + Instagram/TikTok referrals",
            },
            {
              assumption: "Mobile traffic share",
              value: "72%",
              note: "Primary acquisition via Instagram/TikTok — all mobile",
            },
            {
              assumption: "Average order value (blended)",
              value: "$18",
              note: "60+ item menu, soul food QSR — typical 2–3 item order",
            },
            {
              assumption: "Current conversion rate",
              value: "7.08%",
              note: "Below QSR benchmark of 9–12% — broken mobile is primary cause",
            },
            {
              assumption: "Target conversion rate (post-fix)",
              value: "10–12%",
              note: "QSR industry benchmark with functional mobile experience",
            },
            {
              assumption: "Estimated monthly web orders",
              value: "~425",
              note: "6,000 visits × 7.08% conversion",
            },
            {
              assumption: "Estimated baseline monthly revenue (web)",
              value: "~$7,650",
              note: "425 orders × $18 AOV — web channel only",
            },
            {
              assumption: "Third-party commission rate",
              value: "20–30%",
              note: "Otter platform fee on each order",
            },
            {
              assumption: "Gross margin",
              value: "55–65%",
              note: "QSR industry benchmark — not verified against actuals",
            },
            {
              assumption: "Analysis confidence",
              value: "0.42",
              note: "Menu and site verified. No POS or revenue data available.",
            },
          ].map((row, i) => (
            <div
              key={row.assumption}
              className="grid grid-cols-[1fr_auto] px-5 py-4 transition-colors duration-150 hover:bg-[#FBFAF7] sm:grid-cols-[2fr_1.2fr_2fr] sm:px-7"
              style={{ borderBottom: i < 9 ? "1px solid #F0EBE3" : undefined }}
            >
              <span className="text-[13px] font-semibold text-[#111111]">{row.assumption}</span>
              <span className="font-mono text-[13px] font-bold text-[#111111]">{row.value}</span>
              <span className="hidden text-[13px] text-[#555552] sm:block">{row.note}</span>
            </div>
          ))}
        </div>

        {/* Footnote */}
        <p className="mt-4 text-[11px] text-[#9E9994]">
          * Web channel only. Validate all figures against POS data before using for business decisions. See confidence scores in roadmap above.
        </p>
      </section>

      {/* ── Pre-footer CTA ──────────────────────────────────────── */}
      <section className="relative overflow-hidden" style={{ backgroundColor: "#0A0A0A" }}>

        {/* Background food image */}
        <div className="absolute inset-0">
          <Image
            src="/1000191511.jpg"
            alt=""
            fill
            className="object-cover object-center"
            priority={false}
            sizes="100vw"
          />
          <div
            className="absolute inset-0"
            style={{
              background:
                "linear-gradient(to bottom, rgba(10,10,10,0.45) 0%, rgba(10,10,10,0.30) 40%, rgba(10,10,10,0.55) 100%)",
            }}
          />
        </div>

        <div className="relative mx-auto max-w-5xl px-6 py-16 text-center sm:py-24 sm:px-10 lg:py-32">

          {/* Headline */}
          <h2
            className="font-serif t-hero text-white"
            style={{ lineHeight: 0.95 }}
          >
            Let&apos;s fix what&apos;s<br />
            costing you.
          </h2>

          {/* Bullets — width fits content, centered, narrower than headline */}
          <div className="mx-auto mt-8 w-fit sm:mt-10">
            <div className="flex flex-col gap-3 text-left">
              {[
                "Enhance mobile experience",
                "Capture more customers",
                "Increase revenue and profit",
              ].map((b) => (
                <div key={b} className="flex items-center gap-3 text-sm font-semibold text-white">
                  <svg
                    className="h-4 w-4 shrink-0 text-emerald-400"
                    viewBox="0 0 16 16"
                    fill="currentColor"
                    aria-hidden="true"
                  >
                    <path d="M6.5 12L2 7.5l1.4-1.4L6.5 9.2l6.1-6.1L14 4.5 6.5 12z" />
                  </svg>
                  {b}
                </div>
              ))}
            </div>
          </div>

          {/* CTA button */}
          <div className="mt-8 text-center">
            <a
              href={CONTACT_MAILTO}
              className="inline-flex items-center gap-2 rounded-xl bg-[#1B5EA8] px-8 py-4 text-sm font-bold text-white shadow-xl shadow-[#1B5EA8]/30 transition hover:-translate-y-px hover:bg-[#164d8e] hover:shadow-2xl hover:shadow-[#1B5EA8]/40"
            >
              Fix it →
            </a>
          </div>

          {/* Social proof */}
          <div className="mt-8 flex items-center justify-center gap-3">
            <div className="flex -space-x-2">
              {[
                { i: "MJ", c: "#D97706" },
                { i: "AS", c: "#059669" },
                { i: "TR", c: "#7C3AED" },
              ].map(({ i, c }) => (
                <div
                  key={i}
                  className="flex h-8 w-8 items-center justify-center rounded-full border-2 border-[#0A0A0A] text-[10px] font-bold text-white"
                  style={{ backgroundColor: c }}
                  aria-hidden="true"
                >
                  {i}
                </div>
              ))}
            </div>
            <p className="text-sm text-white/60">Trusted by restaurant owners like you.</p>
          </div>

        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────── */}
      <footer className="border-t border-zinc-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-bold tracking-[0.22em] text-zinc-900">ELLIYEEN</div>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Product</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/how-it-works" className="hover:text-black">How It Works</a></li>
                  <li><a href="/#advisor"    className="hover:text-black">See the Work</a></li>
                  <li><a href="/#pricing"    className="hover:text-black">Pricing</a></li>
                  <li><a href="/faq"         className="hover:text-black">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Services</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/#cases"        className="hover:text-black">Industries</a></li>
                  <li><a href="/#pricing"      className="hover:text-black">Full Audit</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Company</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/#founder"      className="hover:text-black">About</a></li>
                  <li><a href="/#cases"         className="hover:text-black">Industries</a></li>
                  <li><a href={CONTACT_MAILTO}  className="hover:text-black">Contact</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Reports</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/reports"                              className="hover:text-black">All Reports</a></li>
                  <li><a href="/reports/milano-audit.html"            className="hover:text-black">Milano Family Pizza</a></li>
                  <li><a href="/reports/wealth-management-audit.html" className="hover:text-black">Wealth Management</a></li>
                  <li><a href="/spcs-report"                          className="hover:text-black">Savannah Personal Care</a></li>
                </ul>
              </div>
            </div>
          </div>

          <div className="mt-10 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Elliyeen Research. All rights reserved.</p>
            <div className="flex flex-wrap gap-x-6 gap-y-2">
              <a href="/privacy"       className="text-sm text-zinc-400 hover:text-black">Privacy Policy</a>
              <a href="/terms"         className="text-sm text-zinc-400 hover:text-black">Terms</a>
              <a href="/accessibility" className="text-sm text-zinc-400 hover:text-black">Accessibility</a>
              <a href="/do-not-sell"   className="text-sm text-zinc-400 hover:text-black">Do Not Sell My Data</a>
              <a href="/sitemap-page"  className="text-sm text-zinc-400 hover:text-black">Sitemap</a>
            </div>
            <a
              href="https://www.linkedin.com/in/abbasabdullah/"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Abbas Abdullah on LinkedIn (opens in new tab)"
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                <rect x="2" y="9" width="4" height="12" />
                <circle cx="4" cy="4" r="2" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
      {/* ── Guided Wizard ───────────────────────────────────────── */}
      <ReportWizard />
    </main>
  );
}
