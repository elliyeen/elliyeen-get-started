"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const tabs = [
  {
    id: "before",
    label: "Original Site",
    badge: "Before",
    url: "savannahpersonalcareservices.com",
    images: [
      { src: "/spcs-before.png",       alt: "Original homepage hero",    eager: true  },
      { src: "/spcs-before-lower.png", alt: "Original services section", eager: false },
    ],
    note: "Generic Wix template. Placeholder FAQs visible to families in crisis. No founder identity. No clinical credential on page.",
  },
  {
    id: "after",
    label: "Rebuilt Site",
    badge: "After",
    url: "elliyeen.github.io/savannah-pcs",
    images: [
      { src: "/spcs-after.png",      alt: "Rebuilt homepage hero",                eager: true  },
      { src: "/spcs-after-care.png", alt: "Why families choose Savannah section", eager: false },
      { src: "/spcs-after-cta.png",  alt: "Get started section and footer",       eager: false },
    ],
    note: "Opens with the buyer's exact fear. Shannon's CNA credential leads. Care Standards process named and owned. Mobile-first. No stock photo carousels.",
  },
];

export default function SPCSBeforeAfter() {
  const [active, setActive] = useState("after");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-[2rem] border border-zinc-200 bg-white overflow-hidden shadow-xl shadow-zinc-900/5">

        {/* Header */}
        <div className="border-b border-zinc-100 px-6 py-6 sm:px-10 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl md:text-[2.6rem] leading-[1.05]">
              Companies and Enterprises build with Elliyeen.
            </h2>
            <p className="mt-3 max-w-lg text-sm leading-[1.75] text-zinc-500">
              Build the system that turns every visitor into a buyer — starting
              with what your site says about you today. We rebuilt Shannon&apos;s
              site to reach the right families at the exact moment of decision.
            </p>
          </div>

          {/* Pill toggle — inspired by dark-active pill style */}
          <div className="flex shrink-0 items-center rounded-full bg-zinc-100 p-1 gap-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`rounded-full px-5 py-2 text-sm font-semibold transition-all duration-200 ${
                  active === tab.id
                    ? "bg-[#0d0d0d] text-white shadow-sm"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Browser mockup */}
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

            {/* All screenshots stacked — no height cap */}
            <div key={current.id}>
              {current.images.map((image, i) => (
                <div key={image.src}>
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={image.src}
                    alt={`${image.alt} — Savannah Personal Care Services`}
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

        {/* Bottom annotation */}
        <div className="bg-[#f7f4ee] px-4 pb-4 sm:px-8 sm:pb-8 pt-0">
          <div className="rounded-b-2xl border border-zinc-200 border-t-0 bg-white px-5 py-4 sm:px-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <p className="max-w-xl text-sm leading-[1.7] text-zinc-500">
              <span
                className={`mr-2 font-bold ${
                  current.id === "before" ? "text-red-500" : "text-emerald-600"
                }`}
              >
                {current.badge}:
              </span>
              {current.note}
            </p>
            <a
              href="/spcs-report"
              className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50 transition-colors"
            >
              Read full report <ArrowRight size={14} />
            </a>
          </div>
        </div>

      </div>
    </section>
  );
}
