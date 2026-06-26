"use client";

import { useState, useEffect, useCallback } from "react";

const STEPS = [
  {
    id: "revenue-team",
    section: "The Opportunity",
    costLabel: "Monthly gap",
    cost: "$4.6K–$10K/mo",
    headline: "This is how much you're leaving on the table every month.",
    detail:
      "Three fixable problems — all verified against your live site. No new customers needed. Just fixes that stop the bleeding.",
  },
  {
    id: "key-findings",
    section: "What's Breaking",
    costLabel: "Annual impact",
    cost: "$2.2K–$14.5K/yr",
    headline: "Your mobile site loses customers before they can order.",
    detail:
      "Every visitor from Instagram or TikTok lands on a page that renders 1336px wide on a 390px phone. They scroll, they leave, they don't come back.",
  },
  {
    id: "roadmap",
    section: "The Fix",
    costLabel: "Time to implement",
    cost: "2–4 hours",
    headline: "Move 1 costs nothing. It takes an afternoon.",
    detail:
      "Open Wix Mobile Editor. Fix container widths on all 5 pages. Verify on a real iPhone. Highest confidence fix — and it unblocks everything else.",
  },
  {
    id: "assumptions",
    section: "The Numbers",
    costLabel: "Confidence level",
    cost: "0.42 / 1.0",
    headline: "These projections are conservative. Real numbers may be higher.",
    detail:
      "No POS data was available. All figures derived from menu analysis and QSR benchmarks. Validate against your actual sales before making decisions.",
  },
];

const SECTION_IDS = STEPS.map((s) => s.id);

export function ReportWizard() {
  const [started, setStarted] = useState(false);
  const [active, setActive] = useState(0);
  const [dismissed, setDismissed] = useState(false);

  // Apply highlight: dim all sections except the active one
  const applyHighlight = useCallback((activeId: string) => {
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.transition = "opacity 0.35s ease, outline 0.35s ease";
      if (id === activeId) {
        el.style.opacity = "1";
        el.style.outline = "2px solid rgba(17,17,17,0.12)";
        el.style.outlineOffset = "12px";
        el.style.borderRadius = "16px";
      } else {
        el.style.opacity = "0.15";
        el.style.outline = "none";
      }
    });
  }, []);

  // Clear all highlights
  const clearHighlight = useCallback(() => {
    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      el.style.opacity = "1";
      el.style.outline = "none";
    });
  }, []);

  const scrollTo = useCallback((id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const offset = 100;
      const top = el.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: "smooth" });
    }
  }, []);

  const go = useCallback(
    (index: number) => {
      setActive(index);
      applyHighlight(STEPS[index].id);
      scrollTo(STEPS[index].id);
    },
    [applyHighlight, scrollTo]
  );

  const handleStart = () => {
    setStarted(true);
    go(0);
  };

  const handleDismiss = () => {
    clearHighlight();
    setDismissed(true);
  };

  // Clean up on unmount
  useEffect(() => {
    return () => clearHighlight();
  }, [clearHighlight]);

  if (dismissed) return null;

  const step = STEPS[active];

  // ── Launch button (before started) ──
  if (!started) {
    return (
      <div className="fixed bottom-6 left-1/2 z-50 -translate-x-1/2">
        <button
          onClick={handleStart}
          className="flex items-center gap-2.5 rounded-full px-5 py-3 text-[13px] font-semibold text-white shadow-xl transition-transform hover:-translate-y-0.5"
          style={{ backgroundColor: "#111111", boxShadow: "0 8px 32px rgba(0,0,0,0.22)" }}
        >
          <span
            className="flex h-5 w-5 items-center justify-center rounded-full text-[10px] font-bold"
            style={{ backgroundColor: "rgba(255,255,255,0.15)" }}
          >
            ?
          </span>
          Guide me through this report
        </button>
      </div>
    );
  }

  // ── Active wizard bar ──
  return (
    <>
      {/* Dim overlay — behind sections, above page bg */}
      <div
        className="pointer-events-none fixed inset-0 z-30 transition-opacity duration-300"
        style={{ backgroundColor: "rgba(251,250,247,0.72)" }}
      />

      {/* Wizard panel */}
      <div
        className="fixed bottom-0 left-0 right-0 z-50"
        style={{
          background: "rgba(255,255,255,0.96)",
          backdropFilter: "saturate(180%) blur(20px)",
          borderTop: "1px solid #E7E2DA",
          boxShadow: "0 -4px 40px rgba(0,0,0,0.10)",
        }}
      >
        <div className="mx-auto max-w-[1280px] px-5 py-5 sm:px-8">

          {/* Top row: dots + counter + dismiss */}
          <div className="mb-3 flex items-center justify-between">
            <div className="flex items-center gap-3">
              {STEPS.map((s, i) => (
                <button
                  key={s.id}
                  onClick={() => go(i)}
                  aria-label={`Go to ${s.section}`}
                  className="rounded-full transition-all duration-200"
                  style={{
                    height: 4,
                    width: i === active ? 24 : 8,
                    backgroundColor: i === active ? "#111111" : "#D4CEC7",
                  }}
                />
              ))}
            </div>
            <div className="flex items-center gap-4">
              <span className="font-mono text-[11px] text-[#9E9994]">
                {active + 1} of {STEPS.length}
              </span>
              <button
                onClick={handleDismiss}
                className="text-[11px] text-[#9E9994] transition-colors hover:text-[#111111]"
                aria-label="Close guide"
              >
                ✕ Close
              </button>
            </div>
          </div>

          {/* Main content row */}
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <div className="min-w-0 flex-1">
              <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.18em] text-[#9E9994]">
                {step.section}
              </p>
              <p className="text-[15px] font-semibold leading-snug text-[#111111] sm:text-[16px]">
                {step.headline}
              </p>
              <p className="mt-1.5 text-[13px] leading-relaxed text-[#555552] sm:max-w-[640px]">
                {step.detail}
              </p>
            </div>

            {/* Cost callout + nav */}
            <div className="flex shrink-0 items-end gap-4">
              {/* Cost badge */}
              <div
                className="rounded-xl px-4 py-3 text-right"
                style={{ backgroundColor: "#F5F0E8" }}
              >
                <p className="text-[10px] font-bold uppercase tracking-[0.14em] text-[#9E9994]">
                  {step.costLabel}
                </p>
                <p className="font-mono text-[18px] font-bold text-[#111111]">{step.cost}</p>
              </div>

              {/* Prev */}
              <button
                onClick={() => go(Math.max(0, active - 1))}
                disabled={active === 0}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-[#E7E2DA] text-[#111111] transition-colors hover:bg-[#F5F0E8] disabled:cursor-not-allowed disabled:opacity-25"
                aria-label="Previous section"
              >
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                  <path d="M7.5 2L3.5 6L7.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {/* Next / Done */}
              <button
                onClick={() => (active < STEPS.length - 1 ? go(active + 1) : handleDismiss())}
                className="flex h-9 items-center gap-1.5 rounded-full px-5 text-[13px] font-bold text-white transition-colors"
                style={{ backgroundColor: "#111111" }}
                aria-label={active < STEPS.length - 1 ? "Next section" : "Finish guide"}
              >
                {active < STEPS.length - 1 ? (
                  <>
                    Next
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M4.5 2L8.5 6L4.5 10" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </>
                ) : (
                  "Done"
                )}
              </button>
            </div>
          </div>

        </div>
      </div>
    </>
  );
}
