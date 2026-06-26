import type { OpportunityMapProps } from "@/lib/types";

const sizeMap = { sm: 8, md: 16, lg: 28 };
const intensityOpacity = { low: 0.25, medium: 0.55, high: 0.85 };

export function OpportunityMap({ caption, hotspots }: OpportunityMapProps) {
  return (
    <div
      className="rounded-2xl border border-[#E7E2DA] bg-white p-6"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <p
        className="mb-4 font-sans font-bold uppercase tracking-[0.08em] text-[#8A837A]"
        style={{ fontSize: 11 }}
      >
        Customer Draw Area
      </p>

      {/* Map placeholder */}
      <div className="relative overflow-hidden rounded-xl bg-[#F7EEE7]" style={{ height: 220 }}>
        {/* Grid lines */}
        <svg className="absolute inset-0 h-full w-full opacity-20" viewBox="0 0 100 100" preserveAspectRatio="none">
          {[20, 40, 60, 80].map((v) => (
            <line key={`h${v}`} x1="0" y1={v} x2="100" y2={v} stroke="#9B5F21" strokeWidth="0.5" />
          ))}
          {[20, 40, 60, 80].map((v) => (
            <line key={`v${v}`} x1={v} y1="0" x2={v} y2="100" stroke="#9B5F21" strokeWidth="0.5" />
          ))}
        </svg>

        {/* Heat spots */}
        {hotspots.map((h, i) => (
          <div
            key={i}
            className="absolute rounded-full bg-[#B91C1C]"
            style={{
              top: `${h.y}%`,
              left: `${h.x}%`,
              width: sizeMap[h.size],
              height: sizeMap[h.size],
              opacity: intensityOpacity[h.intensity],
              transform: "translate(-50%, -50%)",
            }}
          />
        ))}

        <span
          className="absolute bottom-2 left-3 font-sans font-semibold uppercase tracking-widest text-[#8A837A]"
          style={{ fontSize: 9 }}
        >
          Stone Mountain, GA
        </span>
      </div>

      {/* Legend */}
      <div className="mt-4 space-y-1.5">
        <div className="flex items-center gap-2 text-[11px] text-[#5F5A52]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#B91C1C] opacity-85" />
          Primary radius — Stone Mountain
        </div>
        <div className="flex items-center gap-2 text-[11px] text-[#5F5A52]">
          <span className="h-2 w-2 shrink-0 rounded-full bg-[#B91C1C] opacity-30" />
          Secondary reach — social channels
        </div>
      </div>

      <p className="mt-3 text-[11px] leading-5 text-[#8A837A]">{caption}</p>
    </div>
  );
}
