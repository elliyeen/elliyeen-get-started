"use client";

import { useState, useEffect, useCallback } from "react";
import { ArrowRight, ArrowDown } from "lucide-react";

const STEP_DURATION = 5000;

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

type Annotation = {
  top: string;
  left: string;
  text: string;
  color: "red" | "green";
  delay: number;
};

type Step = {
  number: string;
  title: string;
  body: string;
  screenshot: string;
  screenshotAlt: string;
  url: string;
  badge: { label: string; color: "neutral" | "red" | "blue" | "green" };
  annotations: Annotation[];
};

const steps: Step[] = [
  {
    number: "01",
    title: "Map your current path",
    body: "We trace how a visitor actually moves through your site today — where they hesitate, where they lose trust, and where they leave instead of buying.",
    screenshot: "/ops-before-hero.png",
    screenshotAlt: "ATS original site — the starting point",
    url: "operator-school.com",
    badge: { label: "Starting point", color: "neutral" },
    annotations: [],
  },
  {
    number: "02",
    title: "Find the breaks",
    body: "We check every part of the site at once — the words, the design, the trust signals, the path to checkout. Every gap gets documented with proof.",
    screenshot: "/ops-before-hero.png",
    screenshotAlt: "ATS original site — 18 gaps identified",
    url: "operator-school.com",
    badge: { label: "18 gaps found", color: "red" },
    annotations: [
      { top: "6%",  left: "38%", text: "22 nav items → decision paralysis", color: "red",   delay: 0   },
      { top: "23%", left: "54%", text: "No career-outcome headline",         color: "red",   delay: 160 },
      { top: "47%", left: "48%", text: "6 CTAs, none dominant",              color: "red",   delay: 320 },
      { top: "79%", left: "32%", text: "$26/hr wages buried in footer",      color: "red",   delay: 480 },
    ],
  },
  {
    number: "03",
    title: "Write the fix",
    body: "Not a list of recommendations. The actual rewritten headline, the fixed CTA, the resolved objection — ranked by what moves revenue fastest.",
    screenshot: "/ops-report-cover.png",
    screenshotAlt: "Elliyeen audit report for Associated Training Services",
    url: "Elliyeen · Audit Report · Associated Training Services",
    badge: { label: "Report delivered", color: "blue" },
    annotations: [],
  },
  {
    number: "04",
    title: "Connect the system",
    body: "You implement the fix. We run a second-pass audit and measure every change against a baseline. Revenue impact — visible.",
    screenshot: "/ops-after-hero.png",
    screenshotAlt: "ATS rebuilt site — system connected, career outcome visible",
    url: "elliyeen.github.io/associatedtrainingservices",
    badge: { label: "System connected", color: "green" },
    annotations: [
      { top: "19%", left: "26%", text: "Career outcome headline",     color: "green", delay: 0   },
      { top: "37%", left: "52%", text: "$26/hr wages above the fold", color: "green", delay: 200 },
      { top: "55%", left: "32%", text: "One CTA — clear next step",   color: "green", delay: 400 },
    ],
  },
];

const badgeColors: Record<string, string> = {
  neutral: "bg-zinc-100 text-zinc-600",
  red:     "bg-red-50 text-red-500",
  blue:    "bg-[#e8eef6] text-[#1B5EA8]",
  green:   "bg-emerald-50 text-emerald-600",
};

export default function HowItWorksDemo() {
  const [active, setActive]           = useState(0);
  const [paused, setPaused]           = useState(false);
  const [progressKey, setProgressKey] = useState(0);
  const [imgKey, setImgKey]           = useState(0);

  const go = useCallback((i: number) => {
    setActive(i);
    setProgressKey((k) => k + 1);
    setImgKey((k) => k + 1);
  }, []);

  useEffect(() => {
    if (paused) return;
    const t = setTimeout(() => go((active + 1) % steps.length), STEP_DURATION);
    return () => clearTimeout(t);
  }, [active, paused, go]);

  const step = steps[active];

  return (
    <div>
      {/* ── Two-column layout ────────────────────────────────────────────── */}
      <div className="grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16 lg:items-start">

        {/* LEFT: Step list */}
        <div>
          <div>
            {steps.map((s, i) => (
              <button
                key={s.number}
                onClick={() => { go(i); setPaused(true); }}
                aria-current={active === i ? "step" : undefined}
                className="group w-full text-left border-t border-zinc-200 py-6 first:border-t-0 first:pt-0"
              >
                <div className="flex items-start gap-5">

                  {/* Number */}
                  <span
                    className={`shrink-0 w-8 font-serif text-[1.75rem] font-bold leading-none tabular-nums transition-colors duration-300 sm:w-10 sm:text-[2.25rem] ${
                      active === i ? "text-[#123A5A]" : "text-zinc-300 group-hover:text-zinc-400"
                    }`}
                  >
                    {s.number}
                  </span>

                  <div className="flex-1 min-w-0">
                    <p
                      className={`text-base font-bold transition-colors duration-300 ${
                        active === i ? "text-[#111111]" : "text-zinc-500 group-hover:text-zinc-700"
                      }`}
                    >
                      {s.title}
                    </p>

                    {/* Animated body */}
                    <div
                      className={`grid transition-all duration-500 ease-out ${
                        active === i
                          ? "grid-rows-[1fr] opacity-100 mt-2"
                          : "grid-rows-[0fr] opacity-0"
                      }`}
                    >
                      <p className="overflow-hidden text-sm leading-7 text-[#3f3f46]">
                        {s.body}
                      </p>
                    </div>

                    {/* Progress bar */}
                    {active === i && (
                      <div className="mt-3 h-0.5 overflow-hidden rounded-full bg-zinc-200">
                        <div
                          key={progressKey}
                          className="h-full rounded-full bg-[#123A5A] hiw-progress"
                        />
                      </div>
                    )}
                  </div>
                </div>
              </button>
            ))}
          </div>

          {/* Dot nav */}
          <div className="mt-6 flex gap-2">
            {steps.map((_, i) => (
              <button
                key={i}
                onClick={() => { go(i); setPaused(true); }}
                aria-label={`Go to step ${i + 1}`}
                className={`h-1.5 rounded-full transition-all duration-300 ${
                  active === i ? "w-6 bg-[#123A5A]" : "w-1.5 bg-zinc-300 hover:bg-zinc-400"
                }`}
              />
            ))}
          </div>

          {/* CTAs */}
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <a
              href={CONTACT_MAILTO}
              className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#123A5A] px-8 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors hover:bg-[#D87A24] active:bg-[#b8620e] sm:w-auto sm:min-w-[180px]"
            >
              Get your audit <ArrowRight size={15} />
            </a>
            <a
              href="/reports/operator-school-audit.html"
              className="inline-flex h-[52px] w-full items-center justify-center gap-2 rounded-xl border border-zinc-200 px-6 text-sm font-semibold text-[#111111] transition-colors hover:border-zinc-400 hover:bg-zinc-50 sm:w-auto"
            >
              Read the ATS report <ArrowRight size={14} />
            </a>
          </div>
        </div>

        {/* RIGHT: Desktop browser mockup — hidden on mobile */}
        <div className="hidden lg:block lg:sticky lg:top-24">
          <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-2xl shadow-zinc-900/10">

            {/* Browser chrome */}
            <div className="flex items-center gap-3 border-b border-zinc-100 bg-zinc-50 px-4 py-3">
              <div className="flex gap-1.5">
                <span className="h-3 w-3 rounded-full bg-red-400/70" />
                <span className="h-3 w-3 rounded-full bg-amber-400/70" />
                <span className="h-3 w-3 rounded-full bg-emerald-400/70" />
              </div>
              <div className="min-w-0 flex-1 truncate rounded-md border border-zinc-200 bg-white px-3 py-1 text-center font-mono text-[11px] text-zinc-500">
                {step.url}
              </div>
              <span
                className={`shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide transition-all duration-300 ${badgeColors[step.badge.color]}`}
              >
                {step.badge.label}
              </span>
            </div>

            {/* Screenshot + annotations */}
            <div
              className="relative overflow-hidden bg-zinc-100"
              style={{ aspectRatio: "1440 / 900" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={imgKey}
                src={step.screenshot}
                alt={step.screenshotAlt}
                className="h-full w-full object-cover object-top hiw-img-fade"
              />

              <div
                className="pointer-events-none absolute inset-x-0 bottom-0"
                style={{ height: "25%", background: "linear-gradient(to bottom, transparent, rgba(0,0,0,0.07))" }}
              />

              {step.annotations.map((a, j) => (
                <div
                  key={`${active}-${j}`}
                  className={`hiw-chip hiw-chip-${a.color}`}
                  style={{ position: "absolute", top: a.top, left: a.left, animationDelay: `${a.delay}ms` }}
                >
                  {a.text}
                </div>
              ))}
            </div>

            {/* Step tab strip */}
            <div className="flex border-t border-zinc-100">
              {steps.map((s, i) => (
                <button
                  key={s.number}
                  onClick={() => { go(i); setPaused(true); }}
                  aria-label={`View step ${s.number}: ${s.title}`}
                  className={`flex-1 py-2.5 text-center text-[10px] font-bold uppercase tracking-wider transition-colors ${
                    active === i
                      ? "bg-[#123A5A] text-white"
                      : "text-zinc-400 hover:bg-zinc-50 hover:text-zinc-700"
                  }`}
                >
                  {s.number}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Mobile phone comparison — visible only on mobile ─────────────── */}
      <div className="mt-12 lg:hidden">

        <div className="mb-8 text-center">
          <p className="text-[10px] font-bold uppercase tracking-[0.24em] text-zinc-400">
            The transformation · on mobile
          </p>
          <p className="mt-2 text-sm font-semibold text-[#111111]">
            This is what a student sees when they find you.
          </p>
        </div>

        {/* Two phone frames side by side */}
        <div className="flex items-start justify-center gap-5">

          {/* Before phone */}
          <div className="flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-red-500">
              Before
            </span>
            <div className="phone-old">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ops-mobile-before.png"
                alt="Original ATS site on mobile — cluttered layout"
              />
            </div>
            <p className="max-w-[150px] text-center text-[11px] leading-5 text-zinc-500">
              Grid of CTAs. No clear path for students.
            </p>
          </div>

          {/* Arrow */}
          <div className="flex flex-col items-center pt-12">
            <ArrowDown size={18} className="text-zinc-300" />
            <div className="mt-2 h-12 w-px bg-zinc-200" />
            <ArrowDown size={18} className="text-zinc-300" />
          </div>

          {/* After phone */}
          <div className="flex flex-col items-center gap-3">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-emerald-600">
              After
            </span>
            <div className="phone-new">
              <div className="phone-island" />
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/ops-mobile-after.png"
                alt="Rebuilt ATS site on mobile — clean hero, clear CTA"
              />
            </div>
            <p className="max-w-[150px] text-center text-[11px] leading-5 text-zinc-500">
              Clean hero. One number. One action.
            </p>
          </div>
        </div>

        {/* Report link below phones */}
        <div className="mt-8 text-center">
          <a
            href="/reports/operator-school-audit.html"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B5EA8] hover:underline"
          >
            Read the full ATS audit report <ArrowRight size={13} />
          </a>
        </div>
      </div>
    </div>
  );
}
