"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

const tabs = [
  {
    id: "before",
    label: "Before",
    badge: "Before",
    url: "operator-school.com",
    images: [
      { src: "/ops-before-hero.png", alt: "Original ATS homepage — company name, six competing CTAs", eager: true  },
      { src: "/ops-before-full.png", alt: "Original ATS full page — 22 navigation items, wage proof buried", eager: false },
    ],
    note: "22 navigation items. No career-outcome headline — just the company name. The best proof on the site ($26/hr starting wages) buried in the footer. Six CTAs compete at equal weight. Students can't find the path.",
  },
  {
    id: "after",
    label: "After",
    badge: "After",
    url: "elliyeen.github.io/associatedtrainingservices",
    images: [
      { src: "/ops-after-hero.png", alt: "Rebuilt ATS homepage — career outcome headline, wage proof above fold", eager: true  },
      { src: "/ops-after-full.png", alt: "Rebuilt ATS full page — single CTA, certification ladder, Free Starter Kit", eager: false },
    ],
    note: "Career outcome headline leads. Wages above the fold where decisions happen. One CTA. The three-level crane certification ladder reframed as The ATS Career Path. Free Starter Kit captures the lead.",
  },
];

export default function ATSBeforeAfter() {
  const [active, setActive] = useState("after");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-[2rem] border border-zinc-200 bg-white overflow-hidden shadow-xl shadow-zinc-900/5">

        {/* ── Header ──────────────────────────────────────────────────── */}
        <div className="border-b border-zinc-100 px-6 py-8 sm:px-10 sm:py-10">

          {/* Label */}
          <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400">
            Case Study · Associated Training Services
          </p>

          {/* Headline + toggle row */}
          <div className="flex flex-col gap-6 sm:flex-row sm:items-start sm:justify-between">
            <div className="max-w-xl">
              <h2 className="font-serif text-3xl tracking-[-0.03em] text-[#111111] sm:text-4xl md:text-[2.75rem] leading-[1.06]">
                A disconnected system loses students before they apply.
              </h2>
              <p className="mt-4 text-base leading-[1.8] text-zinc-500">
                ATS had 65 years of proof, four accreditations, and a graduate earning $26/hr.
                None of it reached the student making the decision.
                <br className="hidden sm:block" />
                <span className="font-semibold text-zinc-700"> We connected the system. This is what changed.</span>
              </p>
            </div>

            {/* Toggle */}
            <div className="flex shrink-0 self-start items-center rounded-full bg-zinc-100 p-1 gap-1">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActive(tab.id)}
                  aria-pressed={active === tab.id}
                  className={`rounded-full px-6 py-2.5 text-sm font-bold transition-all duration-200 ${
                    active === tab.id
                      ? tab.id === "before"
                        ? "bg-red-500 text-white shadow-sm"
                        : "bg-[#123A5A] text-[#F5F1E7] shadow-sm"
                      : "text-zinc-500 hover:text-zinc-800"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* ── Browser mockup ───────────────────────────────────────────── */}
        <div className="bg-[#f7f4ee] px-4 pt-6 pb-0 sm:px-8 sm:pt-8">
          <div className="rounded-t-2xl border border-zinc-200 border-b-0 bg-white overflow-hidden shadow-lg">

            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-zinc-100 px-4 py-3 bg-zinc-50">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="flex-1 rounded-md border border-zinc-200 bg-white px-3 py-1 text-center text-[11px] text-zinc-400 font-mono truncate">
                {current.url}
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  current.id === "before"
                    ? "bg-red-50 text-red-500"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {current.badge}
              </span>
            </div>

            {/* Screenshots */}
            <div key={current.id}>
              {current.images.map((image, i) => (
                <div key={image.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={`${image.alt} — Associated Training Services`}
                    loading={image.eager ? "eager" : "lazy"}
                    className="w-full block"
                  />
                  {i < current.images.length - 1 && (
                    <div className="h-px bg-zinc-100" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Bottom bar ───────────────────────────────────────────────── */}
        <div className="bg-[#f7f4ee] px-4 pb-4 sm:px-8 sm:pb-8 pt-0">
          <div className="rounded-b-2xl border border-zinc-200 border-t-0 bg-white px-5 py-5 sm:px-8 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-[1.75] text-zinc-500">
              <span
                className={`mr-2 font-bold ${
                  current.id === "before" ? "text-red-500" : "text-emerald-600"
                }`}
              >
                {current.badge}:
              </span>
              {current.note}
            </p>
            <div className="flex flex-wrap items-center gap-3">
              <a
                href={CONTACT_MAILTO}
                className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#123A5A] px-9 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors duration-200 hover:bg-[#D87A24] active:bg-[#b8620e] sm:w-auto sm:min-w-[180px]"
              >
                Get Started <ArrowRight size={15} />
              </a>
              <a
                href="/reports/operator-school-audit.html"
                className="inline-flex h-[52px] items-center gap-2 rounded-xl border border-zinc-200 px-6 text-sm font-semibold text-zinc-700 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                Read the report <ArrowRight size={14} />
              </a>
              <a
                href="https://elliyeen.github.io/associatedtrainingservices/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex h-[52px] items-center gap-2 rounded-xl border border-zinc-200 px-6 text-sm font-semibold text-zinc-500 transition-colors hover:border-zinc-400 hover:bg-zinc-50"
              >
                See the rebuilt site <ArrowRight size={14} />
              </a>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
