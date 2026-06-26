import Image from "next/image";
import type { ReportHeroProps } from "@/lib/types";

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
    <div className="relative w-full overflow-hidden" style={{ height: "320px" }}>

      {/* ── Full-bleed image ──────────────────────────────────── */}
      <Image
        src={imageSrc}
        alt={`${businessName} — food photo`}
        fill
        className="object-cover object-center"
        priority
      />

      {/* ── Dark overlay for readability ──────────────────────── */}
      <div
        className="absolute inset-0"
        style={{ background: "rgba(10,10,10,0.52)" }}
      />

      {/* ── Centered funnel content ───────────────────────────── */}
      <div className="relative flex h-full flex-col items-center justify-center px-6 text-center">

        {/* Eyebrow — widest visual weight */}
        <p
          className="font-sans font-bold uppercase tracking-[0.28em] text-white/60"
          style={{ fontSize: 11 }}
        >
          {eyebrow}
        </p>

        {/* Headline — largest, slightly narrower */}
        <h1
          className="mt-3 font-serif font-medium leading-tight tracking-[-0.02em] text-white"
          style={{ fontSize: "clamp(32px, 4vw, 56px)", maxWidth: 640 }}
        >
          {businessName}
        </h1>

        {/* Location — narrower */}
        <p className="mt-2 text-sm text-white/60" style={{ maxWidth: 440 }}>
          {location} ·{" "}
          <a href={`https://www.${website}`} target="_blank" rel="noreferrer" className="hover:text-white hover:underline">
            {website}
          </a>
        </p>

        {/* Description — narrowest */}
        <p
          className="mt-4 text-white/90"
          style={{ fontSize: 17, lineHeight: 1.65, maxWidth: 520 }}
        >
          {description}
        </p>

      </div>
    </div>
  );
}
