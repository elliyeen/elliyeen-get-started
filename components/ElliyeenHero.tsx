import Image from "next/image";

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

export default function ElliyeenHero() {
  return (
    <section aria-labelledby="hero-heading" className="bg-[#F5F1E7]">
      {/* ── Full-bleed image panel (Calm.com structure) ─────────────────────
          Image fills the top of the viewport. Nav is transparent and floats
          above it. A gradient at the bottom dissolves the art into parchment.
      ────────────────────────────────────────────────────────────────────── */}
      <div
        className="relative w-full overflow-hidden"
        style={{ height: "clamp(360px, 58vh, 640px)" }}
      >
        <Image
          src="/images/elliyeen-hero-art-v2.png"
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover object-top"
        />

        {/* Bottom fade — dissolves art into parchment */}
        <div
          className="pointer-events-none absolute inset-x-0 bottom-0"
          style={{
            height: "45%",
            background:
              "linear-gradient(to bottom, transparent 0%, rgba(245,241,231,0.6) 60%, #F5F1E7 100%)",
          }}
          aria-hidden="true"
        />
      </div>

      {/* ── Centered content ─────────────────────────────────────────────────
          Headline + subtext + pill CTAs, centered below the image just like
          calm.com. Generous vertical breathing room drives focus on the CTA.
      ────────────────────────────────────────────────────────────────────── */}
      <div className="px-6 pb-24 pt-10 text-center sm:pb-28 sm:pt-12">
        <h1
          id="hero-heading"
          className="font-serif font-semibold"
          style={{
            fontSize: "clamp(2.6rem, 5.2vw, 5.2rem)",
            lineHeight: "1.02",
            letterSpacing: "-0.022em",
            color: "#123A5A",
          }}
        >
          Your Path To Good{" "}
          <span style={{ color: "#D87A24" }}>Profits</span>
        </h1>

        <p
          className="mx-auto mt-5 font-serif leading-relaxed"
          style={{
            fontSize: "clamp(1.05rem, 1.7vw, 1.35rem)",
            color: "#123A5A",
            opacity: 0.68,
            maxWidth: "460px",
          }}
        >
          Build systems with data and grow your bottom line revenue.
        </p>

        {/* Pill CTAs — stacked full-width on mobile, side-by-side on sm+ */}
        <div className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:justify-center">
          <a
            href={CONTACT_MAILTO}
            className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#123A5A] px-9 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors duration-200 hover:bg-[#D87A24] hover:shadow-[0_6px_28px_rgba(216,122,36,0.30)] active:bg-[#b8620e] sm:w-auto sm:min-w-[180px]"
          >
            Get Started
          </a>
          <a
            href="/how-it-works"
            className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full border border-[rgba(18,58,90,0.28)] px-9 text-sm font-bold text-[#123A5A] transition-colors duration-200 hover:bg-white/60 hover:border-[rgba(18,58,90,0.5)] active:bg-white/80 sm:w-auto sm:min-w-[180px]"
          >
            See how it works
          </a>
        </div>
      </div>
    </section>
  );
}
