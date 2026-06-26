import type { OpportunitySizeCardProps } from "@/lib/types";

const barWidths = [62, 48, 32, 20, 28];

export function OpportunitySizeCard({
  items,
  totalLabel,
  totalValue,
  note,
}: OpportunitySizeCardProps) {
  return (
    <div
      className="rounded-2xl border border-[#E7E2DA] bg-white p-6"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <p
        className="mb-4 font-sans font-bold uppercase tracking-[0.08em] text-[#8A837A]"
        style={{ fontSize: 11 }}
      >
        Opportunity Size · Monthly Impact
      </p>

      <div className="space-y-3.5">
        {items.map((item, i) => (
          <div key={item.label}>
            <div className="mb-1 flex items-center justify-between">
              <span className="text-xs font-medium text-[#5F5A52]">{item.label}</span>
              <span className="font-mono text-sm font-bold text-[#111111]">{item.value}</span>
            </div>
            <div className="h-2 w-full overflow-hidden rounded-full bg-[#F7EEE7]">
              <div
                className="h-full rounded-full bg-[#B91C1C]"
                style={{ width: `${barWidths[i] ?? 30}%` }}
              />
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 rounded-xl bg-[#F7EEE7] px-4 py-3">
        <p className="text-[11px] font-semibold text-[#5F5A52]">{totalLabel}</p>
        <p className="mt-0.5 font-mono text-xl font-bold text-[#B91C1C]">{totalValue}</p>
        <p className="mt-1 text-[10px] text-[#8A837A]">{note}</p>
      </div>
    </div>
  );
}
