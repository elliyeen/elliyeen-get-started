import type { ImpactProjectionCardProps } from "@/lib/types";

export function ImpactProjectionCard({
  title,
  value,
  subtitle,
  bars,
}: ImpactProjectionCardProps) {
  const max = Math.max(...bars);

  return (
    <div
      className="flex flex-col rounded-2xl border border-[#E7E2DA] bg-[#111111] p-6 text-white"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.12)" }}
    >
      <p
        className="font-sans font-bold uppercase tracking-[0.08em] text-white/50"
        style={{ fontSize: 11 }}
      >
        {title}
      </p>

      <p
        className="mt-4 font-serif font-medium leading-none tracking-tight text-white"
        style={{ fontSize: 36 }}
      >
        {value}
      </p>
      <p className="mt-1 text-sm text-white/60">{subtitle}</p>

      {/* Bar progression */}
      <div className="mt-6 flex items-end gap-2">
        {bars.map((b, i) => {
          const pct = (b / max) * 100;
          return (
            <div key={i} className="flex flex-1 flex-col items-center gap-1">
              <div className="w-full overflow-hidden rounded-t" style={{ height: 60 }}>
                <div
                  className="w-full rounded-t bg-[#B91C1C]"
                  style={{ height: `${pct}%`, marginTop: `${100 - pct}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>

      <p className="mt-4 text-[11px] text-white/40">
        Combined if all 3 steps validated
      </p>
    </div>
  );
}
