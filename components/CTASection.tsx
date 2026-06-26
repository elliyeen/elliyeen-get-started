import Image from "next/image";
import type { CTASectionProps } from "@/lib/types";

export function CTASection({
  headline,
  bullets,
  ctaLabel,
  imageSrc,
  trustNote,
}: CTASectionProps) {
  return (
    <section className="bg-[#111111]">
      <div className="mx-auto grid max-w-[1280px] items-center gap-12 px-8 py-20 lg:grid-cols-[1.3fr_1fr]">

        {/* Left — text */}
        <div>
          <p
            className="font-sans font-bold uppercase tracking-[0.28em] text-white/40"
            style={{ fontSize: 10 }}
          >
            Your Next Step
          </p>

          <h2
            className="mt-4 font-serif font-medium leading-[1.02] tracking-[-0.02em] text-white"
            style={{ fontSize: "clamp(36px, 4vw, 56px)" }}
          >
            {headline}
          </h2>

          <ul className="mt-6 space-y-3">
            {bullets.map((b) => (
              <li key={b} className="flex items-start gap-3 text-sm text-white/60">
                <svg className="mt-0.5 h-4 w-4 shrink-0 text-[#047857]" viewBox="0 0 16 16" fill="currentColor">
                  <path d="M6.5 12L2 7.5l1.4-1.4L6.5 9.2l6.1-6.1L14 4.5 6.5 12z" />
                </svg>
                {b}
              </li>
            ))}
          </ul>

          <div className="mt-8">
            <a
              href="mailto:abdullah@elliyeen.com?subject=Strategy%20Call%20Request"
              className="inline-block rounded-lg bg-[#B91C1C] px-7 py-4 text-sm font-semibold text-white transition hover:-translate-y-px hover:bg-[#991B1B] hover:shadow-lg"
            >
              {ctaLabel} →
            </a>
            <p className="mt-3 text-[11px] text-white/30">
              20 minutes · Three specific findings · No pitch
            </p>
          </div>

          {trustNote && (
            <p className="mt-4 text-xs text-white/30">{trustNote}</p>
          )}
        </div>

        {/* Right — food image */}
        <div className="relative overflow-hidden rounded-2xl">
          <div className="relative" style={{ paddingTop: "70%" }}>
            <Image
              src={imageSrc}
              alt="So Halal Soul Food"
              fill
              className="object-cover brightness-75"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
            <div className="absolute bottom-5 left-5 right-5">
              <p className="text-xs font-medium text-white/60">The food is not the problem.</p>
              <p className="mt-1 font-serif text-xl text-white">So Halal Soul Food</p>
              <p className="text-sm text-white/50">Stone Mountain, GA</p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-white/5">
        <div className="mx-auto flex max-w-[1280px] items-center justify-between px-8 py-6">
          <p className="text-[11px] text-white/20">
            © 2026 Elliyeen · All findings are evidence-labeled and dated.
          </p>
          <div className="flex gap-5 text-[11px] text-white/20">
            <a href="/reports" className="transition hover:text-white/60">Revenue Cards</a>
            <a href="/" className="transition hover:text-white/60">elliyeen.com</a>
          </div>
        </div>
      </div>
    </section>
  );
}
