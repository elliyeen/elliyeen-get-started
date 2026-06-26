import type { MetricCardProps } from "@/lib/types";

const toneColor: Record<string, string> = {
  default: "#111111",
  danger: "#B91C1C",
  success: "#047857",
  warning: "#9B5F21",
};

export function MetricCard({ value, label, note, tone = "default" }: MetricCardProps) {
  return (
    <div>
      <p
        className="font-serif leading-none tracking-tight"
        style={{ fontSize: 36, color: toneColor[tone] }}
      >
        {value}
      </p>
      <p className="mt-1 text-sm font-semibold text-[#111111]">{label}</p>
      <p className="text-xs text-[#8A837A]">{note}</p>
    </div>
  );
}
