"use client";

import { useState, useEffect, useCallback, useRef } from "react";
import Image from "next/image";

// ─── Config ────────────────────────────────────────────────────────────────
const TOTAL_PAGES = 19;
const REPORT_TITLE = "Revenue Opportunity Report";
const REPORT_SUBTITLE = "Savannah Personal Care Services";
const PDF_URL = "/spcs-report/report.pdf";
const PAGE_URL = (n: number) =>
  `/spcs-report/page_${String(n).padStart(2, "0")}.jpg`;

const PAGES = Array.from({ length: TOTAL_PAGES }, (_, i) => PAGE_URL(i + 1));

// ─── Icons ──────────────────────────────────────────────────────────────────
const Icon = {
  ChevronLeft: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M15 19l-7-7 7-7" />
    </svg>
  ),
  ChevronRight: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
    </svg>
  ),
  Download: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
    </svg>
  ),
  Share: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z" />
    </svg>
  ),
  ZoomIn: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
    </svg>
  ),
  ZoomOut: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7" />
    </svg>
  ),
  BookOpen: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
    </svg>
  ),
  X: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-5 h-5">
      <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
    </svg>
  ),
  Check: () => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.5} className="w-4 h-4">
      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
    </svg>
  ),
};

// ─── Types ───────────────────────────────────────────────────────────────────
type ViewMode = "single" | "spread";

export default function SPCSFlipbook() {
  const [current, setCurrent] = useState(0);
  const [viewMode, setViewMode] = useState<ViewMode>("single");
  const [zoomed, setZoomed] = useState(false);
  const [flipping, setFlipping] = useState(false);
  const [flipDir, setFlipDir] = useState<"next" | "prev">("next");
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [copied, setCopied] = useState(false);
  const [shareToast, setShareToast] = useState(false);
  const thumbsRef = useRef<HTMLDivElement>(null);

  const isSpread = viewMode === "spread";
  const step = isSpread ? 2 : 1;
  const canNext = current + step < TOTAL_PAGES;
  const canPrev = current > 0;

  const displayPages =
    isSpread && current > 0
      ? current + 1 < TOTAL_PAGES
        ? [current, current + 1]
        : [current]
      : [current];

  // ── Navigation ─────────────────────────────────────────────
  const flip = useCallback(
    (dir: "next" | "prev", target: number) => {
      if (flipping) return;
      setFlipDir(dir);
      setFlipping(true);
      setTimeout(() => {
        setCurrent(target);
        setFlipping(false);
      }, 280);
    },
    [flipping]
  );

  const goNext = useCallback(() => {
    if (!canNext) return;
    flip("next", Math.min(current + step, TOTAL_PAGES - 1));
  }, [canNext, current, step, flip]);

  const goPrev = useCallback(() => {
    if (!canPrev) return;
    flip("prev", Math.max(current - step, 0));
  }, [canPrev, current, step, flip]);

  const jumpTo = useCallback(
    (idx: number) => {
      if (idx === current) return;
      flip(idx > current ? "next" : "prev", idx);
    },
    [current, flip]
  );

  // ── Keyboard ────────────────────────────────────────────────
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (lightbox !== null) {
        if (e.key === "Escape") setLightbox(null);
        if (e.key === "ArrowRight") setLightbox((l) => (l !== null && l + 1 < TOTAL_PAGES ? l + 1 : l));
        if (e.key === "ArrowLeft") setLightbox((l) => (l !== null && l - 1 >= 0 ? l - 1 : l));
        return;
      }
      if (e.key === "ArrowRight" || e.key === "ArrowDown") goNext();
      if (e.key === "ArrowLeft" || e.key === "ArrowUp") goPrev();
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [goNext, goPrev, lightbox]);

  // ── Auto-scroll thumbnails ──────────────────────────────────
  useEffect(() => {
    const el = thumbsRef.current?.children[current] as HTMLElement;
    el?.scrollIntoView({ behavior: "smooth", block: "nearest", inline: "center" });
  }, [current]);

  // ── Spread toggle ───────────────────────────────────────────
  const toggleSpread = () => {
    setViewMode((m) => (m === "single" ? "spread" : "single"));
    if (!isSpread && current % 2 !== 0 && current > 0) setCurrent(current - 1);
  };

  // ── Share ───────────────────────────────────────────────────
  const handleShare = async () => {
    const url = window.location.href;
    if (navigator.share) {
      try {
        await navigator.share({
          title: `${REPORT_TITLE} — ${REPORT_SUBTITLE}`,
          text: "Read the full Revenue Opportunity Report from Elliyeen Research.",
          url,
        });
      } catch {}
    } else {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setShareToast(true);
      setTimeout(() => { setCopied(false); setShareToast(false); }, 2500);
    }
  };

  const pageLabel =
    isSpread && displayPages.length === 2
      ? `${current + 1} – ${current + 2} of ${TOTAL_PAGES}`
      : `${current + 1} of ${TOTAL_PAGES}`;

  return (
    <div className="flex flex-col min-h-screen bg-[#0D1B2A] select-none">

      {/* ── Header ─────────────────────────────────────────── */}
      <header className="flex items-center justify-between px-5 py-3 border-b border-white/10 shrink-0">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-md bg-[#2E5F8A] flex items-center justify-center font-black text-white text-sm">
            E
          </div>
          <div>
            <p className="text-white font-bold text-sm leading-none">ELLIYEEN RESEARCH</p>
            <p className="text-[#7AACCC] text-xs mt-0.5 leading-none">{REPORT_SUBTITLE}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={toggleSpread}
            className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              isSpread
                ? "bg-[#2E5F8A] text-white"
                : "bg-white/10 text-[#C8D4DF] hover:bg-white/15"
            }`}
          >
            <Icon.BookOpen />
            {isSpread ? "Single" : "Spread"}
          </button>

          <button
            onClick={() => setZoomed((z) => !z)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
              zoomed
                ? "bg-[#2E5F8A] text-white"
                : "bg-white/10 text-[#C8D4DF] hover:bg-white/15"
            }`}
          >
            {zoomed ? <Icon.ZoomOut /> : <Icon.ZoomIn />}
            <span className="hidden sm:inline">{zoomed ? "Zoom Out" : "Zoom In"}</span>
          </button>

          <button
            onClick={handleShare}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-white/10 hover:bg-white/15 text-[#C8D4DF] text-xs font-medium transition-all"
          >
            {copied ? <Icon.Check /> : <Icon.Share />}
            <span className="hidden sm:inline">{copied ? "Copied!" : "Share"}</span>
          </button>

          <a
            href={PDF_URL}
            download="SPCS_Revenue_Opportunity_Report.pdf"
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[#2E5F8A] hover:bg-[#1A3F5F] text-white text-xs font-semibold transition-all"
          >
            <Icon.Download />
            <span>Download</span>
          </a>
        </div>
      </header>

      {/* ── Viewer ─────────────────────────────────────────── */}
      <main className="flex-1 flex flex-col items-center justify-center px-3 py-6 gap-5">

        <p className="text-[#7AACCC] text-xs font-medium tracking-widest uppercase">
          {REPORT_TITLE}
        </p>

        <div className="flex items-center gap-3 w-full justify-center">
          <button
            onClick={goPrev}
            disabled={!canPrev}
            className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
          >
            <Icon.ChevronLeft />
          </button>

          <div
            className="flex gap-1 transition-all duration-[280ms] ease-in-out"
            style={{
              opacity: flipping ? 0 : 1,
              transform: flipping
                ? `translateX(${flipDir === "next" ? "18px" : "-18px"}) scale(0.98)`
                : zoomed
                ? "scale(1.14)"
                : "scale(1)",
            }}
          >
            {displayPages.map((idx, pos) => (
              <div
                key={idx}
                className="relative cursor-zoom-in group"
                style={{
                  width:
                    isSpread && displayPages.length === 2
                      ? "min(42vw, 390px)"
                      : "min(72vw, 520px)",
                }}
                onClick={() => setLightbox(idx)}
              >
                <div
                  className="relative rounded overflow-hidden border border-white/10"
                  style={{
                    boxShadow:
                      "0 24px 56px rgba(0,0,0,0.65), 0 4px 14px rgba(0,0,0,0.4)",
                  }}
                >
                  <Image
                    src={PAGES[idx]}
                    alt={`Page ${idx + 1}`}
                    width={1275}
                    height={1650}
                    className="w-full h-auto block"
                    priority={idx < 4}
                    quality={90}
                  />
                  <div className="absolute inset-0 bg-white/0 group-hover:bg-white/5 transition-colors flex items-center justify-center">
                    <div className="opacity-0 group-hover:opacity-80 transition-opacity bg-black/40 rounded-full p-2">
                      <Icon.ZoomIn />
                    </div>
                  </div>
                </div>

                {isSpread && displayPages.length === 2 && (
                  <div
                    className={`absolute inset-y-0 w-8 pointer-events-none ${
                      pos === 0
                        ? "right-0 bg-gradient-to-r from-transparent to-black/30"
                        : "left-0 bg-gradient-to-l from-transparent to-black/30"
                    }`}
                  />
                )}
              </div>
            ))}
          </div>

          <button
            onClick={goNext}
            disabled={!canNext}
            className="shrink-0 w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 disabled:cursor-not-allowed text-white flex items-center justify-center transition-all"
          >
            <Icon.ChevronRight />
          </button>
        </div>

        <p className="text-[#4A7A9A] text-xs">
          Page {pageLabel}&nbsp;&nbsp;·&nbsp;&nbsp;
          <span className="hidden sm:inline">← → arrow keys &nbsp;·&nbsp; </span>
          Click page to zoom
        </p>

        {/* ── Thumbnail strip ──────────────────────────────── */}
        <div
          ref={thumbsRef}
          className="flex gap-1.5 overflow-x-auto max-w-full px-2 pb-1 scroll-smooth"
          style={{ scrollbarWidth: "none" }}
        >
          {PAGES.map((src, i) => (
            <button
              key={i}
              onClick={() => jumpTo(i)}
              title={`Page ${i + 1}`}
              className={`shrink-0 rounded overflow-hidden border-2 transition-all duration-150 ${
                displayPages.includes(i)
                  ? "border-[#2E5F8A] opacity-100 scale-105"
                  : "border-transparent opacity-35 hover:opacity-65"
              }`}
              style={{ width: 32, height: 42 }}
            >
              <Image
                src={src}
                alt={`p${i + 1}`}
                width={64}
                height={83}
                className="w-full h-full object-cover"
                quality={35}
                loading="lazy"
              />
            </button>
          ))}
        </div>

        {/* ── Mobile download bar ──────────────────────────── */}
        <div className="flex sm:hidden items-center gap-3 mt-1">
          <a
            href={PDF_URL}
            download="SPCS_Revenue_Opportunity_Report.pdf"
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-[#2E5F8A] text-white text-sm font-semibold"
          >
            <Icon.Download />
            Download PDF
          </a>
          <button
            onClick={handleShare}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 text-[#C8D4DF] text-sm font-medium"
          >
            <Icon.Share />
            Share
          </button>
        </div>
      </main>

      {/* ── Lightbox ───────────────────────────────────────── */}
      {lightbox !== null && (
        <div
          className="fixed inset-0 bg-black/92 z-50 flex flex-col items-center justify-center p-4 gap-3"
          onClick={() => setLightbox(null)}
        >
          <button
            className="absolute top-4 right-4 w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 text-white flex items-center justify-center transition-all"
            onClick={() => setLightbox(null)}
          >
            <Icon.X />
          </button>

          <div
            className="max-h-[88vh] max-w-[92vw] overflow-auto rounded shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <Image
              src={PAGES[lightbox]}
              alt={`Page ${lightbox + 1}`}
              width={1275}
              height={1650}
              className="w-auto h-auto max-h-[86vh]"
              quality={96}
            />
          </div>

          <div
            className="flex items-center gap-4"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setLightbox((l) => (l! > 0 ? l! - 1 : l))}
              disabled={lightbox === 0}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white flex items-center justify-center"
            >
              <Icon.ChevronLeft />
            </button>
            <span className="text-white/50 text-xs">
              Page {lightbox + 1} of {TOTAL_PAGES}&nbsp;·&nbsp;Esc to close
            </span>
            <button
              onClick={() => setLightbox((l) => (l! + 1 < TOTAL_PAGES ? l! + 1 : l))}
              disabled={lightbox === TOTAL_PAGES - 1}
              className="w-9 h-9 rounded-full bg-white/10 hover:bg-white/20 disabled:opacity-20 text-white flex items-center justify-center"
            >
              <Icon.ChevronRight />
            </button>
          </div>
        </div>
      )}

      {/* ── Share toast ────────────────────────────────────── */}
      <div
        className={`fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center gap-2 px-4 py-2.5 rounded-xl bg-[#1A3F5F] border border-[#2E5F8A] text-white text-sm font-medium shadow-xl transition-all duration-300 ${
          shareToast ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4 pointer-events-none"
        }`}
      >
        <Icon.Check />
        Link copied to clipboard
      </div>
    </div>
  );
}
