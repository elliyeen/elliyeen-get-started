import type { MiniLineChartProps } from "@/lib/types";

export function MiniLineChart({
  points,
  dashedFromIndex = 3,
  tone = "danger",
}: MiniLineChartProps) {
  const H = 56;
  const W = 96;
  const X0 = 4;
  const Y0 = 4;
  const lineColor = tone === "danger" ? "#B91C1C" : "#047857";

  const max = Math.max(...points);
  const min = Math.min(...points);
  const range = max - min || 1;

  const coords = points.map((v, i) => ({
    x: X0 + (i / (points.length - 1)) * W,
    y: Y0 + H - ((v - min) / range) * H,
  }));

  const solidPts = coords.slice(0, dashedFromIndex + 1);
  const dashedPts = coords.slice(dashedFromIndex);

  const toPath = (pts: { x: number; y: number }[]) =>
    pts.map((p, i) => `${i === 0 ? "M" : "L"} ${p.x} ${p.y}`).join(" ");

  return (
    <div className="mt-4">
      <svg viewBox="0 0 104 72" className="w-full" style={{ height: 64 }}>
        {/* Baseline */}
        <line x1={X0} y1={Y0 + H} x2={X0 + W} y2={Y0 + H} stroke="#E7E2DA" strokeWidth="0.5" />
        <line x1={X0} y1={Y0 + H / 2} x2={X0 + W} y2={Y0 + H / 2} stroke="#E7E2DA" strokeWidth="0.5" />

        {/* Solid portion */}
        <path d={toPath(solidPts)} fill="none" stroke="#D8D0C5" strokeWidth="1.5" />

        {/* Dashed / projected portion */}
        <path
          d={toPath(dashedPts)}
          fill="none"
          stroke={lineColor}
          strokeWidth="1.5"
          strokeDasharray="3 2"
        />

        {/* Dots */}
        {coords.map((p, i) => (
          <circle
            key={i}
            cx={p.x}
            cy={p.y}
            r="2"
            fill={i >= dashedFromIndex ? lineColor : "#D8D0C5"}
          />
        ))}
      </svg>
    </div>
  );
}
