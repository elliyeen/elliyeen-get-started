"use client";

import { useId, useMemo } from "react";
import { scaleLinear } from "d3-scale";
import type { PossessionEntry, TeamId } from "@/lib/sports/esa/types";

interface PossessionMapProps {
  teamName: string;
  teamId: TeamId;
  possessions?: PossessionEntry[];
}

const WIDTH = 640;
const HEIGHT_PER_ROW = 28;
const MARGIN = { top: 8, right: 96, bottom: 8, left: 40 };

const RESULT_LABEL: Record<PossessionEntry["result"], string> = {
  TD: "Touchdown",
  FG: "Field goal",
  PUNT: "Punt",
  TURNOVER: "Turnover",
  DOWNS: "Turnover on downs",
  END_OF_HALF: "End of half",
};

export function PossessionMap({ teamName, teamId, possessions }: PossessionMapProps) {
  const titleId = useId();
  const descId = useId();

  const laneWidth = WIDTH - MARGIN.left - MARGIN.right;

  // D3 is used only for the linear scale mapping field position (0-100) to
  // the SVG x-axis — no charting library, no canvas, no 3D.
  const xScale = useMemo(() => scaleLinear().domain([0, 100]).range([0, laneWidth]), [laneWidth]);

  if (!possessions || possessions.length === 0) {
    return (
      <div className="esa-possession-map" data-team={teamId}>
        <p className="text-sm text-[var(--e-soft)]" role="status">
          Possession-level field position data is unavailable for this record. It will appear once
          verified play-by-play data passes ESA quality control.
        </p>
      </div>
    );
  }

  const height = possessions.length * HEIGHT_PER_ROW + MARGIN.top + MARGIN.bottom;

  return (
    <div className="esa-possession-map">
      <svg
        viewBox={`0 0 ${WIDTH} ${height}`}
        role="img"
        aria-labelledby={`${titleId} ${descId}`}
        preserveAspectRatio="xMidYMid meet"
        className="h-auto w-full"
      >
        <title id={titleId}>{teamName} possession production</title>
        <desc id={descId}>
          {possessions.length} possession lanes showing starting field position, ending field
          position and result.
        </desc>
        {possessions.map((p, i) => {
          const y = MARGIN.top + i * HEIGHT_PER_ROW + HEIGHT_PER_ROW / 2;
          const x1 = MARGIN.left + xScale(p.startFieldPosition);
          const x2 = MARGIN.left + xScale(p.endFieldPosition);
          return (
            <g key={p.possessionNumber}>
              <line x1={x1} y1={y} x2={x2} y2={y} stroke="var(--e-soft)" strokeWidth={2} />
              <circle cx={x1} cy={y} r={3} fill="var(--e-soft)" />
              <circle
                cx={x2}
                cy={y}
                r={p.isScoring ? 6 : 3}
                fill={p.isScoring ? "var(--esa-scoring, #b8860b)" : "var(--e-soft)"}
              />
              <text x={MARGIN.left + laneWidth + 8} y={y + 4} fontSize={11} fill="var(--e-ink)">
                {RESULT_LABEL[p.result]}
              </text>
            </g>
          );
        })}
      </svg>
      <table className="sr-only">
        <caption className="sr-only">{teamName} possession-by-possession detail</caption>
        <thead>
          <tr>
            <th scope="col">Possession</th>
            <th scope="col">Start</th>
            <th scope="col">End</th>
            <th scope="col">Result</th>
            <th scope="col">Points</th>
          </tr>
        </thead>
        <tbody>
          {possessions.map((p) => (
            <tr key={p.possessionNumber}>
              <td>{p.possessionNumber}</td>
              <td>{p.startFieldPosition}</td>
              <td>{p.endFieldPosition}</td>
              <td>{RESULT_LABEL[p.result]}</td>
              <td>{p.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
