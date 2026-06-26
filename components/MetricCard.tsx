import type { MetricCardProps } from "@/lib/types";

const toneColor: Record<string, string> = {
  default: "#111111",
  danger: "#B91C1C",
  success: "#047857",
  warning: "#9B5F21",
};

export function MetricCard({ value, label, note, tone = "default", dark = false }: MetricCardProps) {
  const valueColor = dark
    ? tone === "danger" ? "#FCA5A5" : "#ffffff"
    : toneColor[tone];

  return (
    <div className="px-5 py-4">
      <p
        className="font-serif leading-none tracking-tight"
        style={{ fontSize: 36, color: valueColor }}
      >
        {value}
      </p>
      <p className={`mt-1 text-sm font-semibold ${dark ? "text-white" : "text-[#111111]"}`}>{label}</p>
      <p className={`text-xs ${dark ? "text-white/50" : "text-[#8A837A]"}`}>{note}</p>
    </div>
  );
}
