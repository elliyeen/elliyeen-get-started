import { MiniBarChart } from "./MiniBarChart";

type RoadmapStepFullProps = {
  step: string;
  title: string;
  badge: string;
  problem: string;
  description: string;
  actions: string[];
  impact: string;
  time: string;
  confidence: string;
  beforeValue: number;
  afterValue: number;
};

export function RoadmapStep({
  step,
  title,
  badge,
  problem,
  description,
  actions,
  impact,
  confidence,
  beforeValue,
  afterValue,
}: RoadmapStepFullProps) {
  return (
    <div
      className="flex flex-col rounded-2xl border border-[#E7E2DA] bg-white p-6 transition hover:-translate-y-0.5"
      style={{ boxShadow: "0 10px 30px rgba(0,0,0,0.04)" }}
    >
      <div className="flex items-start justify-between gap-3">
        <span className="font-mono text-xs font-bold text-[#D8D0C5]">{step}</span>
        <span className="rounded-full border border-[#E7E2DA] bg-[#F7EEE7] px-2.5 py-0.5 text-[11px] font-semibold text-[#9B5F21]">
          {badge}
        </span>
      </div>

      <h3 className="mt-3 font-serif text-xl font-medium leading-tight text-[#111111]">
        {title}
      </h3>

      <p className="mt-2 text-sm font-semibold leading-snug text-[#B91C1C]">{problem}</p>
      <p className="mt-2 text-sm leading-6 text-[#5F5A52]">{description}</p>

      <ul className="mt-4 space-y-1.5">
        {actions.map((a) => (
          <li key={a} className="flex items-start gap-2 text-xs text-[#8A837A]">
            <span className="mt-1.5 h-1 w-1 shrink-0 rounded-full bg-[#D8D0C5]" />
            {a}
          </li>
        ))}
      </ul>

      <div className="mt-auto pt-5">
        <MiniBarChart
          beforeLabel="Now"
          afterLabel="After"
          beforeValue={beforeValue}
          afterValue={afterValue}
          tone="danger"
        />
        <div className="mt-1 border-t border-[#E7E2DA] pt-4">
          <p className="text-2xl font-semibold text-[#047857]">{impact}</p>
          <p className="mt-0.5 text-[11px] text-[#8A837A]">
            Estimated monthly impact · {confidence}
          </p>
        </div>
      </div>
    </div>
  );
}
