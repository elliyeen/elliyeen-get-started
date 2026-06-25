import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import SiteNav from "@/app/SiteNav";

export const metadata: Metadata = {
  title: "Audit Reports — Elliyeen Research",
  description:
    "Published website audit reports by Elliyeen Research. Full 22-framework diagnoses with copy rewrites, financial projections, and prioritized roadmaps.",
  alternates: { canonical: "https://www.elliyeen.com/reports" },
};

type Report = {
  client: string;
  location: string;
  auditType: string;
  summary: string;
  score: string | null;
  href: string;
  date: string;
  badge: string | null;
  finding: string | null;
};

type Section = {
  label: string;
  title: string;
  description: string;
  reports: Report[];
};

const sections: Section[] = [
  {
    label: "Full Business Audits",
    title: "Website · Customer Experience · Financial Model",
    description:
      "Three-part audits covering the full business — website friction, buyer journey gaps, and a revenue model with a path-to-scale.",
    reports: [
      {
        client: "OPEN HOUSE Creative Fest",
        location: "Torrance, CA",
        auditType: "Website Audit · CX Audit · Financial Model",
        summary:
          "Creative market passport selling on faith. No activity directory, conflicting vendor counts, flat CTA hierarchy. $6.9K in additional passport revenue available from one afternoon of content work.",
        score: null,
        href: "/reports/openhouse-audit.html",
        date: "June 2026",
        badge: "New",
        finding: "$6.9K passport revenue gap",
      },
      {
        client: "Savannah Personal Care Services",
        location: "Savannah, GA",
        auditType: "Website Audit · CX Audit · Financial Model",
        summary:
          "CNA-founded home care agency with 4 critical website failures and a $2M+ revenue opportunity. Website audit, customer experience journey, and financial model with path-to-scale.",
        score: null,
        href: "/reports/spcs-audit.html",
        date: "June 2026",
        badge: "New",
        finding: "$2M+ revenue opportunity",
      },
      {
        client: "Wealth Management Firm",
        location: "Confidential",
        auditType: "Conversion Audit · CX Audit · Financial Model",
        summary:
          "Three objections stopping conversion. Zero pages that answered them. CX journey rebuilt, founder vision documented, and AUM growth pathway modeled.",
        score: null,
        href: "/reports/wealth-management-audit.html",
        date: "June 2026",
        badge: "Updated",
        finding: "3 objections, 0 answers on site",
      },
    ],
  },
  {
    label: "Revenue & CX Audits",
    title: "Customer Experience · Financial Model",
    description:
      "Deep dives into the customer journey and unit economics — buyer occasions, ordering friction, platform risk, and direct revenue pathways.",
    reports: [
      {
        client: "Milano Family Pizza",
        location: "Richardson, TX",
        auditType: "CX Audit · Financial Model",
        summary:
          "Platform dependence eroding margin, no loyalty mechanism, and an ordering journey that resets every customer. Revenue pathway and experience fixes documented.",
        score: null,
        href: "/reports/milano-cx-audit.html",
        date: "June 2026",
        badge: "New",
        finding: "15¢ on the dollar via delivery platforms",
      },
    ],
  },
  {
    label: "Digital Presence Audits",
    title: "Website · SEO · Conversion Architecture",
    description:
      "Full-site scoring against 22 frameworks — copy, trust signals, conversion architecture, SEO authority, and AI search readiness.",
    reports: [
      {
        client: "Milano Family Pizza",
        location: "Richardson, TX",
        auditType: "Dual-Site Revenue Audit",
        summary:
          "Two competing websites, split SEO authority, zero conversion architecture. 22-agent analysis with $439K revenue opportunity identified.",
        score: "19 / 100",
        href: "/reports/milano-audit.html",
        date: "June 2026",
        badge: null,
        finding: "$439K revenue opportunity",
      },
      {
        client: "SAX Wealth Advisors",
        location: "Multiple locations",
        auditType: "Four-Site Digital Audit",
        summary:
          "Fragmented web presence across four domains with inconsistent messaging, trust signal gaps, and conversion architecture failures.",
        score: null,
        href: "/reports/sax-audit.html",
        date: "June 2026",
        badge: null,
        finding: "4 domains, split authority",
      },
    ],
  },
  {
    label: "Case Studies",
    title: "Audit + Site Rebuild",
    description:
      "Full documentation of the audit process, site rebuild, and before/after comparison — with the live site as the proof.",
    reports: [
      {
        client: "Savannah Personal Care Services",
        location: "Savannah, GA",
        auditType: "22-Agent Audit + Site Rebuild",
        summary:
          "Home care agency with strong founder credentials underrepresented online. Full site rebuild documented with before/after and live site.",
        score: null,
        href: "/spcs-report",
        date: "June 2026",
        badge: null,
        finding: "Full before/after documented",
      },
    ],
  },
];

export default function ReportsPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <SiteNav />

      <div className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        {/* Header */}
        <div className="mb-14">
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

          {/* Quick-jump nav */}
          <div className="mt-8 flex flex-wrap gap-2">
            {sections.map((s) => (
              <a
                key={s.label}
                href={`#${s.label.toLowerCase().replace(/\s+/g, "-")}`}
                className="rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
              >
                {s.label}
              </a>
            ))}
          </div>
        </div>

        {/* Sections */}
        <div className="space-y-16">
          {sections.map((section) => (
            <div key={section.label} id={section.label.toLowerCase().replace(/\s+/g, "-")}>
              {/* Section header */}
              <div className="mb-6 border-b border-zinc-200 pb-5">
                <div className="flex items-baseline justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">
                      {section.label}
                    </p>
                    <h2 className="mt-1 font-serif text-2xl tracking-[-0.02em] md:text-3xl">
                      {section.title}
                    </h2>
                  </div>
                  <span className="shrink-0 rounded-full bg-zinc-100 px-3 py-1 text-xs font-semibold text-zinc-500">
                    {section.reports.length} {section.reports.length === 1 ? "report" : "reports"}
                  </span>
                </div>
                <p className="mt-2 max-w-2xl text-sm leading-6 text-zinc-500">
                  {section.description}
                </p>
              </div>

              {/* Report cards */}
              <div className="grid gap-3 sm:gap-4">
                {section.reports.map((r) => (
                  <a
                    key={r.href}
                    href={r.href}
                    className="group block rounded-2xl border border-zinc-200 bg-white p-6 transition hover:border-zinc-400 hover:shadow-sm sm:p-7"
                  >
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex-1">
                        {/* Badges row */}
                        <div className="flex flex-wrap items-center gap-2">
                          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                            {r.auditType}
                          </p>
                          {r.badge && (
                            <span
                              className={`rounded-full px-2 py-0.5 text-xs font-semibold ${
                                r.badge === "New"
                                  ? "bg-[#1B5EA8]/10 text-[#1B5EA8]"
                                  : "bg-amber-100 text-amber-700"
                              }`}
                            >
                              {r.badge}
                            </span>
                          )}
                          {r.score && (
                            <span className="rounded-full bg-red-50 px-2 py-0.5 text-xs font-semibold text-red-500">
                              Score {r.score}
                            </span>
                          )}
                        </div>

                        {/* Client + location */}
                        <h3 className="mt-2 font-serif text-xl tracking-[-0.02em] md:text-2xl">
                          {r.client}
                        </h3>
                        <p className="mt-0.5 text-sm text-zinc-400">
                          {r.location} · {r.date}
                        </p>

                        {/* Summary */}
                        <p className="mt-3 text-sm leading-6 text-zinc-600 md:max-w-2xl">
                          {r.summary}
                        </p>

                        {/* Key finding pill */}
                        {r.finding && (
                          <div className="mt-4">
                            <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-500">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#1B5EA8]" />
                              {r.finding}
                            </span>
                          </div>
                        )}
                      </div>

                      <ArrowUpRight
                        size={18}
                        className="mt-1 shrink-0 text-zinc-300 transition group-hover:text-zinc-700"
                      />
                    </div>
                  </a>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="mt-20 rounded-2xl border border-zinc-200 bg-white p-8 text-center sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
            Your site
          </p>
          <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em]">
            Want a report like this on your site?
          </h2>
          <p className="mx-auto mt-3 max-w-md text-sm leading-6 text-zinc-600">
            Start with a free 20-minute diagnostic. Three specific findings, no pitch.
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
