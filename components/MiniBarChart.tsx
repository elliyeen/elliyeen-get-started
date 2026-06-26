import type { MiniBarChartProps } from "@/lib/types";

export function MiniBarChart({
  beforeLabel,
  afterLabel,
  beforeValue,
  afterValue,
  maxValue = 100,
  tone = "danger",
}: MiniBarChartProps) {
  const H = 64;
  const barColor = tone === "danger" ? "#B91C1C" : "#047857";
  const beforeH = (beforeValue / maxValue) * H;
  const afterH = (afterValue / maxValue) * H;

  return (
    <div className="mt-4">
      <svg viewBox="0 0 120 90" className="w-full" style={{ height: 72 }}>
        {/* Grid lines */}
        {[0, 0.5, 1].map((f, i) => {
          const y = 4 + H * (1 - f);
          return (
            <line key={i} x1="24" y1={y} x2="114" y2={y} stroke="#E7E2DA" strokeWidth="0.5" />
          );
        })}

        {/* Before bar — gray */}
        <rect x="32" y={4 + H - beforeH} width="22" height={beforeH} fill="#D8D0C5" rx="2" />

        {/* After bar — accent */}
        <rect x="68" y={4 + H - afterH} width="22" height={afterH} fill={barColor} rx="2" />

        {/* Labels */}
        <text x="43" y="86" fontSize="6" textAnchor="middle" fill="#8A837A">{beforeLabel}</text>
        <text x="79" y="86" fontSize="6" textAnchor="middle" fill="#8A837A">{afterLabel}</text>
      </svg>
    </div>
  );
}
