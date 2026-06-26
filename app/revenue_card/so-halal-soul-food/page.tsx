import type { Metadata } from "next";
import Image from "next/image";
import { reportData } from "@/lib/report-data";
import { Navigation } from "@/components/Navigation";
import { ReportHero } from "@/components/ReportHero";
import { SectionShell } from "@/components/SectionShell";
import { BigPictureCard } from "@/components/BigPictureCard";
import { FindingList } from "@/components/FindingList";
import { OpportunityMap } from "@/components/OpportunityMap";
import { OpportunitySizeCard } from "@/components/OpportunitySizeCard";
import { RoadmapStep } from "@/components/RoadmapStep";
import { ImpactProjectionCard } from "@/components/ImpactProjectionCard";

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

export const metadata: Metadata = {
  title: "So Halal Soul Food Website Audit — Revenue & CX Report · Elliyeen",
  description:
    "Mobile rendering broken on every phone. Order flow losing conversions at peak intent. Three ranked fixes worth $4.6K–$10K/mo for So Halal Soul Food, Stone Mountain, GA.",
  alternates: { canonical: "https://www.elliyeen.com/revenue_card/so-halal-soul-food" },
  openGraph: {
    title: "So Halal Soul Food — Website Audit & Revenue Report",
    description:
      "Site renders 1336px wide on a 390px screen. Three ranked fixes. $4.6K–$10K/mo estimated upside.",
    url: "https://www.elliyeen.com/revenue_card/so-halal-soul-food",
    siteName: "Elliyeen",
    type: "article",
  },
};

export default function SoHalalReportPage() {
  return (
    <main
      className="min-h-screen text-[#111111]"
      style={{ backgroundColor: "#FBFAF7", fontFamily: "system-ui, sans-serif" }}
    >
      {/* ── Navigation ──────────────────────────────────────────── */}
      <Navigation
        logo="ELLIYEEN"
        links={["How It Works", "Solutions", "Revenue Cards", "Resources", "About"]}
        ctaLabel="Fix it"
        ctaVariant="blue"
        ctaHref={CONTACT_MAILTO}
      />

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

      {/* ── The Big Picture ─────────────────────────────────────── */}
      <SectionShell number="1" title="The Big Picture">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {reportData.bigPicture.map((item) => (
            <BigPictureCard key={item.title} {...item} />
          ))}
        </div>
      </SectionShell>

      {/* ── Key Findings ────────────────────────────────────────── */}
      <SectionShell number="2" title="Key Findings" subtitle="Where value is leaking.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1.2fr_1fr]">
          <FindingList findings={reportData.findings} />
          <OpportunityMap
            caption="All social visitors today land on a broken mobile experience."
            hotspots={[
              { x: 52, y: 38, size: "lg", intensity: "high" },
              { x: 38, y: 28, size: "md", intensity: "medium" },
              { x: 34, y: 20, size: "sm", intensity: "medium" },
              { x: 44, y: 18, size: "sm", intensity: "low" },
              { x: 62, y: 42, size: "sm", intensity: "low" },
              { x: 29, y: 38, size: "sm", intensity: "low" },
            ]}
          />
          <OpportunitySizeCard
            items={reportData.opportunitySize}
            totalLabel="Combined monthly impact"
            totalValue="$4.6K–$10K /mo"
            note="[ASSUMPTION] — validate with POS data"
          />
        </div>
      </SectionShell>

      {/* ── Roadmap ─────────────────────────────────────────────── */}
      <SectionShell number="3" title="Three Moves. Maximum Impact.">
        <div className="grid gap-6 lg:grid-cols-[1fr_1fr_1fr_260px]">
          {reportData.roadmap.map((step) => (
            <RoadmapStep key={step.step} {...step} />
          ))}
          <ImpactProjectionCard
            title="Cumulative Monthly Impact"
            value="+$4.6K–$10K"
            subtitle="in additional revenue"
            bars={[18, 36, 58, 86]}
          />
        </div>
      </SectionShell>

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
            className="font-serif text-white"
            style={{
              fontSize: "clamp(42px, 8vw, 100px)",
              lineHeight: 0.95,
              letterSpacing: "-0.03em",
            }}
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
                  <li><a href="/#assessment" className="hover:text-black">How It Works</a></li>
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
    </main>
  );
}
