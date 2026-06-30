import type { Metadata } from "next";
import SiteNav from "@/app/SiteNav";
import { articles } from "@/lib/good-profits";

const BASE_URL = "https://www.elliyeen.com";

export const metadata: Metadata = {
  title: "Good Profit — Elliyeen Research",
  description:
    "Essays on earning revenue by serving customers better — not extracting it. Issue-by-issue writing on copy, strategy, audit, retention, and AEO.",
  keywords: [
    "good profit",
    "revenue from customer trust",
    "website conversion essays",
    "ethical growth strategy",
    "answer engine optimization",
    "website audit insights",
    "compounding revenue",
    "friction removal",
    "copy strategy",
  ],
  alternates: { canonical: `${BASE_URL}/good-profits` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/good-profits`,
    title: "Good Profit — Elliyeen Research",
    description:
      "Essays on earning revenue by serving customers better — not extracting it.",
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
};

const collectionSchema = {
  "@context": "https://schema.org",
  "@type": "CollectionPage",
  "@id": `${BASE_URL}/good-profits`,
  name: "Good Profit",
  description:
    "Essays on earning revenue by serving customers better — not extracting it through manipulation, urgency, or confusion.",
  url: `${BASE_URL}/good-profits`,
  publisher: { "@id": `${BASE_URL}/#organization` },
  hasPart: articles.map((a) => ({
    "@type": "Article",
    "@id": `${BASE_URL}/good-profits/${a.slug}`,
    headline: a.title,
    url: `${BASE_URL}/good-profits/${a.slug}`,
    datePublished: a.dateISO,
    keywords: a.theme,
  })),
};

export default function GoodProfitsPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(collectionSchema) }}
      />

      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-[#f7f4ee] text-[#111111]">
        <SiteNav />

        {/* ── Header ───────────────────────────────────────────────────── */}
        <header className="mx-auto max-w-3xl px-4 pb-10 pt-16 sm:px-6 sm:pt-20 md:pt-28">
          <h1 className="font-serif t-hero text-[#111111]">
            Good Profit
          </h1>
          <p className="mt-5 max-w-lg t-body-lg text-zinc-600">
            Essays on earning revenue by serving customers better — not
            extracting it through manipulation, urgency, or confusion.
          </p>
          <p className="mt-3 text-sm text-zinc-400">
            {articles.length} issues · under 5 minutes each
          </p>
        </header>

        {/* ── Article listing ──────────────────────────────────────────── */}
        <section
          aria-label="Good Profit essays"
          className="mx-auto max-w-3xl px-4 pb-20 sm:px-6"
        >
          <div className="space-y-0">
            {articles.map((article, i) => (
              <a
                key={article.slug}
                href={`/good-profits/${article.slug}`}
                className={`group block border-t border-zinc-200 py-8 hover:bg-white/50 -mx-4 px-4 sm:-mx-6 sm:px-6 transition-colors${
                  i === articles.length - 1 ? " border-b" : ""
                }`}
              >
                {/* Theme tag */}
                <div className="mb-3 flex items-center gap-3">
                  <span className="rounded-full bg-[#1B5EA8]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1B5EA8]">
                    {article.theme}
                  </span>
                </div>

                {/* Title */}
                <h2 className="font-serif t-subheading text-[#111111] group-hover:text-[#1B5EA8] transition-colors">
                  {article.title}
                </h2>

                {/* Description */}
                <p className="mt-2 text-sm leading-[1.7] text-zinc-500 sm:text-base">
                  {article.description}
                </p>

                {/* Meta row */}
                <div className="mt-4 flex flex-wrap items-center gap-x-4 gap-y-1 text-[11px] font-medium text-zinc-400">
                  <span>Issue #{article.issue}</span>
                  <span aria-hidden="true">·</span>
                  <time dateTime={article.dateISO}>{article.date}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTime} read</span>
                </div>
              </a>
            ))}
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="border-t border-zinc-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm font-bold tracking-[0.22em] text-zinc-900">
                  ELLIYEEN
                </div>
              </div>
              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Product</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/how-it-works" className="hover:text-black">How It Works</a></li>
                    <li><a href="/#cases"        className="hover:text-black">Industries</a></li>
                    <li><a href="/#pricing"      className="hover:text-black">Pricing</a></li>
                    <li><a href="/faq"           className="hover:text-black">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Resources</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/reports"      className="hover:text-black">Reports</a></li>
                    <li><a href="/good-profits" className="hover:text-black">Good Profit</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Company</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/about"        className="hover:text-black">About</a></li>
                    <li><a href="/#cases"       className="hover:text-black">Industries</a></li>
                    <li><a href="mailto:abdullah@elliyeen.com" className="hover:text-black">Contact</a></li>
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
              <p className="text-sm text-zinc-400">
                © {new Date().getFullYear()} Elliyeen Research. All rights reserved.
              </p>
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
    </>
  );
}
