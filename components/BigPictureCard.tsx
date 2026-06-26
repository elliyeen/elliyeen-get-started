import { MiniBarChart } from "./MiniBarChart";
import { MiniLineChart } from "./MiniLineChart";

type BigPictureCardProps = {
  title: string;
  value: string;
  valueSuffix?: string;
  description: string;
  chartType: "bar" | "line";
  tone?: "danger" | "success" | "warning";
  beforeLabel?: string;
  afterLabel?: string;
  beforeValue?: number;
  afterValue?: number;
  yLabels?: string[];
  linePoints?: number[];
  dashedFromIndex?: number;
};

const toneColor: Record<string, string> = {
  danger: "#B91C1C",
  success: "#047857",
  warning: "#9B5F21",
};

export function BigPictureCard({
  title,
  value,
  valueSuffix,
  description,
  chartType,
  tone = "danger",
  beforeLabel = "Current State",
  afterLabel = "Opportunity",
  beforeValue = 22,
  afterValue = 72,
  yLabels = ["$10K", "$5K", "$0"],
  linePoints = [30, 32, 28, 34, 52, 70],
  dashedFromIndex = 3,
}: BigPictureCardProps) {
  const color = toneColor[tone] ?? "#B91C1C";

  return (
    <div className="flex h-full flex-col p-6">
      <p
        className="font-sans font-bold uppercase tracking-[0.08em] text-[#111111]"
        style={{ fontSize: 12 }}
      >
        {title}
      </p>

      <p
        className="mt-3 font-serif font-medium leading-none tracking-tight"
        style={{ fontSize: 28, color }}
      >
        {value}
        {valueSuffix && (
          <span style={{ fontSize: 16, color }}>{valueSuffix}</span>
        )}
      </p>

      <p className="mt-2 text-sm leading-6 text-[#111111]">{description}</p>

      <div className="mt-auto">
        {chartType === "bar" ? (
          <MiniBarChart
            beforeLabel={beforeLabel}
            afterLabel={afterLabel}
            beforeValue={beforeValue}
            afterValue={afterValue}
            tone={tone === "success" ? "success" : "danger"}
          />
        ) : (
          <MiniLineChart
            points={linePoints}
            dashedFromIndex={dashedFromIndex}
            tone={tone === "success" ? "success" : "danger"}
          />
        )}
      </div>
    </div>
  );
}
