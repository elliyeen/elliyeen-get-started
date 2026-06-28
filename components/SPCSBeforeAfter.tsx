"use client";

import { useState } from "react";
import { ArrowRight } from "lucide-react";

const tabs = [
  {
    id: "before",
    label: "Original Site",
    badge: "Before",
    url: "savannahpersonalcareservices.com",
    img: "/spcs-before.png",
    note: "Generic Wix template. Placeholder FAQs visible to families in crisis. No founder identity. No clinical credential on page.",
  },
  {
    id: "after",
    label: "Rebuilt Site",
    badge: "After",
    url: "elliyeen.github.io/savannah-pcs",
    img: "/spcs-after.png",
    note: "Opens with the buyer's exact fear. Shannon's CNA credential leads. Care Standards process named and owned. Mobile-first. No stock photo carousels.",
  },
];

export default function SPCSBeforeAfter() {
  const [active, setActive] = useState("after");
  const current = tabs.find((t) => t.id === active)!;

  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-[2rem] border border-zinc-200 bg-white overflow-hidden shadow-xl shadow-zinc-900/5">

        {/* Top label bar */}
        <div className="border-b border-zinc-100 px-6 py-5 sm:px-10 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
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

          {/* Tab switcher */}
          <div className="flex shrink-0 items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 p-1">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActive(tab.id)}
                className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold transition-all ${
                  active === tab.id
                    ? "bg-white text-zinc-900 shadow-sm border border-zinc-200"
                    : "text-zinc-500 hover:text-zinc-800"
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Browser mockup */}
        <div className="bg-[#f7f4ee] px-4 pt-5 pb-0 sm:px-8 sm:pt-8">
          <div className="rounded-t-2xl border border-zinc-200 border-b-0 bg-white overflow-hidden shadow-lg shadow-zinc-900/8">

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
                className={`shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                  current.id === "before"
                    ? "bg-red-50 text-red-500"
                    : "bg-emerald-50 text-emerald-600"
                }`}
              >
                {current.badge}
              </span>
            </div>

            {/* Screenshot */}
            <div className="relative overflow-hidden" style={{ aspectRatio: "16/9" }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={current.id}
                src={current.img}
                alt={`${current.label} — Savannah Personal Care Services`}
                className="w-full object-cover object-top transition-opacity duration-300"
                style={{ height: "100%", objectFit: "cover", objectPosition: "top" }}
              />
              {/* Fade out at bottom */}
              <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-[#f7f4ee] to-transparent" />
            </div>
          </div>
        </div>

        {/* Bottom annotation */}
        <div className="border-t border-zinc-100 bg-white px-6 py-5 sm:px-10 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
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
    </section>
  );
}
