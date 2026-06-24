import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Audit Reports — Elliyeen Research",
  description:
    "Published website audit reports by Elliyeen Research. Full 22-framework diagnoses with copy rewrites, financial projections, and prioritized roadmaps.",
  alternates: { canonical: "https://elliyeen-get-started.pages.dev/reports" },
};

const reports = [
  {
    client: "Milano Family Pizza",
    location: "Richardson, TX",
    type: "Dual-Site Revenue Audit",
    summary:
      "Two competing websites, split SEO authority, zero conversion architecture. 22-agent analysis with $439K revenue opportunity identified.",
    score: "19 / 100",
    verdict: "moves_away",
    href: "/reports/milano-audit.html",
    date: "June 2026",
  },
  {
    client: "SAX Wealth Advisors",
    location: "Multiple locations",
    type: "Four-Site Digital Audit",
    summary:
      "Fragmented web presence across four domains with inconsistent messaging, trust signal gaps, and conversion architecture failures.",
    score: null,
    verdict: null,
    href: "/reports/sax-audit.html",
    date: "June 2026",
  },
  {
    client: "Wealth Management Firm",
    location: "Confidential",
    type: "Conversion Audit",
    summary:
      "High-AUM advisory practice with positioning mismatch, weak differentiation from wirehouses, and missed AEO opportunities.",
    score: null,
    verdict: null,
    href: "/reports/wealth-management-audit.html",
    date: "June 2026",
  },
  {
    client: "Savannah Personal Care Services",
    location: "Savannah, GA",
    type: "Revenue Opportunity Report",
    summary:
      "Home care agency with strong founder credentials underrepresented online. CNA-founded positioning and $2M+ revenue opportunity documented.",
    score: null,
    verdict: null,
    href: "/spcs-report",
    date: "June 2026",
  },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      {/* Nav */}
      <nav className="sticky top-0 z-50">
        <div
          className="absolute inset-0 bg-[#f7f4ee]/85"
          style={{
            backdropFilter: "saturate(180%) blur(12px)",
            WebkitBackdropFilter: "saturate(180%) blur(12px)",
          }}
          aria-hidden="true"
        />
        <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <a href="/" className="font-serif text-lg font-semibold tracking-[-0.02em]">
            Elliyeen Research
          </a>
          <a
            href="/#book"
            className="rounded-full bg-[#1B5EA8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#164d8e]"
          >
            Free diagnosis
          </a>
        </div>
      </nav>

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {/* Header */}
        <div className="mb-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
            Published work
          </p>
          <h1 className="mt-4 font-serif text-4xl tracking-[-0.03em] md:text-5xl">
            Audit Reports
          </h1>
          <p className="mt-4 max-w-xl text-base leading-7 text-zinc-600">
            Full 22-framework diagnoses with copy rewrites, financial projections, and
            prioritized roadmaps. Each report is published with client permission.
          </p>
        </div>

        {/* Report grid */}
        <div className="grid gap-4 sm:gap-6">
          {reports.map((r) => (
            <a
              key={r.href}
              href={r.href}
              className="group block rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400 hover:shadow-sm sm:p-8"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <div className="flex flex-wrap items-center gap-2">
                    <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                      {r.type}
                    </p>
                    {r.score && (
                      <span className="rounded-full bg-zinc-100 px-2 py-0.5 text-xs font-semibold text-zinc-500">
                        Score {r.score}
                      </span>
                    )}
                  </div>
                  <h2 className="mt-2 font-serif text-xl tracking-[-0.02em] md:text-2xl">
                    {r.client}
                  </h2>
                  <p className="mt-0.5 text-sm text-zinc-400">{r.location} · {r.date}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600 md:max-w-2xl">{r.summary}</p>
                </div>
                <ArrowUpRight
                  size={18}
                  className="mt-1 shrink-0 text-zinc-300 transition group-hover:text-zinc-700"
                />
              </div>
            </a>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 text-center sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
            Your site
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em]">
            Want a report like this on your site?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600">
            Start with a free 20-minute diagnostic. Three specific findings, delivered within 48 hours.
          </p>
          <a
            href="/#book"
            className="mt-6 inline-flex items-center justify-center rounded-full bg-[#1B5EA8] px-6 py-3 text-sm font-bold text-white hover:bg-[#164d8e]"
          >
            Get your free diagnosis
          </a>
        </div>
      </div>
    </main>
  );
}
