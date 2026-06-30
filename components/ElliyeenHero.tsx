import Image from "next/image";
import { ArrowRight } from "lucide-react";

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

export default function ElliyeenHero() {
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate flex flex-col overflow-hidden bg-[#F5F1E7]"
      style={{ minHeight: "clamp(680px, 90svh, 900px)" }}
    >
      {/* ── Illustration ─────────────────────────────────────────────────
          Full-width image at reduced opacity so the ink-wash feel reads
          as a backdrop. The gradient overlays below do the heavy lifting
          of keeping the content area clean.
      ─────────────────────────────────────────────────────────────────── */}
      <div
        className="pointer-events-none absolute inset-0 select-none opacity-[1]"
        aria-hidden="true"
      >
        <Image
          src="/images/elliyeen-hero-art.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-right"
        />
      </div>

      {/* ── Overlays ─────────────────────────────────────────────────── */}

      {/* Mobile: very strong parchment wash — only the right-edge art bleeds through */}
      <div
        className="pointer-events-none absolute inset-0 lg:hidden"
        style={{ background: "rgba(245,241,231,0.88)" }}
        aria-hidden="true"
      />

      {/* Desktop: directional fade + targeted blob that buries the step-number labels */}
      <div
        className="pointer-events-none absolute inset-0 hidden lg:block"
        style={{
          background: [
            /* blob targeting "5 KAIZEN" — reduced so art shows through */
            "radial-gradient(ellipse 220px 160px at 78% 35%, rgba(245,241,231,0.72) 30%, rgba(245,241,231,0) 75%)",
            /* wider blob covering EXECUTION + GROW — pulled back */
            "radial-gradient(ellipse 300px 180px at 60% 49%, rgba(245,241,231,0.60) 15%, rgba(245,241,231,0) 65%)",
            /* main left-to-right directional fade — starts later, ends later */
            "linear-gradient(to right, #F5F1E7 36%, #F5F1E7E8 48%, #F5F1E7AA 60%, #F5F1E744 72%, transparent 82%)",
          ].join(", "),
        }}
        aria-hidden="true"
      />

      {/* Top + bottom edge fade */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "linear-gradient(to bottom, #F5F1E7 0%, transparent 8%, transparent 88%, #F5F1E7 100%)",
        }}
        aria-hidden="true"
      />

      {/* ── Content ─────────────────────────────────────────────────── */}
      <div className="relative z-10 flex flex-1 items-center px-6 py-24 sm:px-10 lg:px-[7vw]">
        <div className="max-w-[520px]">

          {/* Headline */}
          <h1
            id="hero-heading"
            className="font-serif font-semibold"
            style={{
              fontSize: "clamp(2.5rem, 4.5vw, 5rem)",
              lineHeight: "0.92",
              letterSpacing: "0.01em",
              color: "#123A5A",
            }}
          >
            <span className="block">Your Path</span>
            <span className="block">To Good</span>
            <span className="block" style={{ color: "#D87A24" }}>Profits</span>
          </h1>

          {/* Supporting copy */}
          <p
            className="mt-7 font-serif leading-snug"
            style={{
              fontSize: "clamp(1.1rem, 1.8vw, 1.5rem)",
              color: "#123A5A",
              opacity: 0.72,
              maxWidth: 440,
            }}
          >
            Build systems with data and grow your bottom line revenue.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-wrap gap-4">
            <a
              href={CONTACT_MAILTO}
              className="inline-flex h-[52px] min-w-[190px] items-center justify-center gap-2 rounded-xl bg-[#123A5A] px-8 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors hover:bg-[#0e2d47]"
            >
              Fix it <ArrowRight size={15} />
            </a>
            <a
              href="/how-it-works"
              className="inline-flex h-[52px] min-w-[190px] items-center justify-center gap-2 rounded-xl border px-8 text-sm font-bold transition-colors hover:bg-white/60"
              style={{
                borderColor: "rgba(18,58,90,0.28)",
                color: "#123A5A",
              }}
            >
              See how it works <ArrowRight size={15} />
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
