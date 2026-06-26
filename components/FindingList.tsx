import type { FindingListProps } from "@/lib/types";

const dotColors = [
  "bg-[#B91C1C]",
  "bg-[#B91C1C] opacity-70",
  "bg-[#9B5F21]",
  "bg-[#9B5F21] opacity-60",
  "bg-[#D8D0C5]",
];

export function FindingList({ findings }: FindingListProps) {
  return (
    <div
      className="rounded-2xl border border-[#E7E2DA] bg-white p-6"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <p
        className="mb-4 font-sans font-bold uppercase tracking-[0.08em] text-[#8A837A]"
        style={{ fontSize: 11 }}
      >
        Finding · Annual Impact
      </p>

      <div className="space-y-0">
        {findings.map((f, i) => (
          <div
            key={f.rank}
            className="flex items-start gap-3 border-b border-[#F7EEE7] py-3 last:border-0"
          >
            <span className={`mt-1.5 h-2 w-2 shrink-0 rounded-full ${dotColors[i] ?? "bg-[#D8D0C5]"}`} />
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-[#111111] leading-tight">{f.title}</p>
              <p className="text-[11px] text-[#8A837A]">{f.description}</p>
            </div>
            <span className="shrink-0 font-mono text-sm font-semibold text-[#111111]">
              {f.value}
            </span>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-xl bg-[#F7EEE7] px-4 py-3">
        <p className="text-[11px] font-semibold text-[#5F5A52]">Total annual upside identified</p>
        <p className="mt-0.5 font-mono text-lg font-bold text-[#111111]">$44.6K–$146K/yr</p>
        <p className="text-[10px] text-[#8A837A]">[ASSUMPTION] — validate with POS data</p>
      </div>
    </div>
  );
}
