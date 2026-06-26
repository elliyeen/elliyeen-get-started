import Image from "next/image";
import type { ReportHeroProps } from "@/lib/types";
import { MetricCard } from "./MetricCard";

const toneColor: Record<string, string> = {
  default: "#111111",
  danger: "#B91C1C",
  success: "#047857",
  warning: "#9B5F21",
};

const reportCardCategories = [
  { label: "Mobile",     grade: "D",  pct: 38, color: "#B91C1C" },
  { label: "Order Flow", grade: "C",  pct: 58, color: "#9B5F21" },
  { label: "SEO",        grade: "C−", pct: 52, color: "#9B5F21" },
  { label: "Menu",       grade: "B",  pct: 78, color: "#047857" },
  { label: "CX",         grade: "C",  pct: 60, color: "#9B5F21" },
];

export function ReportHero({
  eyebrow,
  businessName,
  location,
  website,
  description,
  imageSrc,
  metrics,
  confidenceNote,
}: ReportHeroProps) {
  return (
    <div className="mx-auto max-w-[1280px] px-8 pt-10 pb-0">
      {/* 3-column hero: text | image | report card */}
      <div className="grid items-start gap-8 lg:grid-cols-[1.7fr_1.1fr_0.65fr]">

        {/* ── Left: text ───────────────────────────────────────── */}
        <div>
          <p
            className="font-sans font-bold uppercase tracking-[0.28em] text-[#9B5F21]"
            style={{ fontSize: 11 }}
          >
            {eyebrow}
          </p>

          <h1
            className="mt-3 font-serif font-medium leading-[0.98] tracking-[-0.02em] text-[#111111]"
            style={{ fontSize: "clamp(36px, 4vw, 64px)" }}
          >
            {businessName}
          </h1>

          <p className="mt-2 text-sm text-[#8A837A]">
            {location} ·{" "}
            <a
              href={`https://www.${website}`}
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              {website}
            </a>
          </p>

          <p
            className="mt-5 text-[#5F5A52]"
            style={{ fontSize: 16, lineHeight: 1.65, maxWidth: 480 }}
          >
            {description}
          </p>

          {/* Metrics */}
          <div className="mt-8 grid grid-cols-4 gap-4 border-t border-[#E7E2DA] pt-6">
            {metrics.map((m) => (
              <MetricCard key={m.label} {...m} />
            ))}
          </div>

          <p className="mt-3 text-xs text-[#8A837A]">{confidenceNote}</p>

          {/* CTAs */}
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <a
              href="mailto:abdullah@elliyeen.com?subject=Strategy%20Call%20Request"
              className="inline-block rounded-lg bg-[#B91C1C] px-6 py-3 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-[#991B1B] hover:shadow-md"
            >
              Book Your Strategy Call →
            </a>
            <a
              href="#report-card"
              className="text-sm font-medium text-[#5F5A52] transition hover:text-[#111111]"
            >
              See the report card →
            </a>
          </div>
        </div>

        {/* ── Center: image ────────────────────────────────────── */}
        <div
          className="overflow-hidden rounded-2xl"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.08)" }}
        >
          <div className="relative" style={{ paddingTop: "70%" }}>
            <Image
              src={imageSrc}
              alt={`${businessName} — food photo`}
              fill
              className="object-cover"
              priority
            />
          </div>
        </div>

        {/* ── Right: Business Report Card ──────────────────────── */}
        <div
          id="report-card"
          className="scroll-mt-24 rounded-2xl border border-[#E7E2DA] bg-white p-5"
          style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
        >
          <p
            className="font-sans font-bold uppercase tracking-[0.2em] text-[#8A837A]"
            style={{ fontSize: 9 }}
          >
            Business Report Card
          </p>

          <div className="mt-3 flex items-baseline gap-1.5">
            <span
              className="font-serif font-medium leading-none tracking-tight text-[#111111]"
              style={{ fontSize: 52 }}
            >
              63
            </span>
            <span className="mb-1 self-end text-sm text-[#8A837A]">/100</span>
          </div>

          <div className="mt-3 h-2 w-full overflow-hidden rounded-full bg-[#F7EEE7]">
            <div className="h-full rounded-full bg-[#B91C1C]" style={{ width: "63%" }} />
          </div>

          <div className="mt-4 space-y-2.5">
            {reportCardCategories.map((c) => (
              <div key={c.label} className="flex items-center gap-2">
                <span className="w-16 shrink-0 text-[11px] text-[#5F5A52]">{c.label}</span>
                <div className="flex-1 h-1.5 overflow-hidden rounded-full bg-[#F7EEE7]">
                  <div
                    className="h-full rounded-full"
                    style={{ width: `${c.pct}%`, backgroundColor: c.color }}
                  />
                </div>
                <span className="w-6 shrink-0 text-right text-[11px] font-bold text-[#111111]">
                  {c.grade}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
