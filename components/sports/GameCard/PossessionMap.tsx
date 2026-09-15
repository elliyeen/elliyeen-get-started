"use client";

import { useId, useMemo, useState } from "react";
import { scaleLinear } from "d3-scale";
import type { PossessionEntry, TeamId } from "@/lib/sports/esa/types";

interface PossessionMapProps {
  teamName: string;
  teamId: TeamId;
  possessions?: PossessionEntry[];
}

const WIDTH = 640;
const HEIGHT_PER_ROW = 32;
const MARGIN = { top: 28, right: 104, bottom: 34, left: 44 };
const FIELD_TICKS = [0, 20, 40, 50, 60, 80, 100];

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
  const detailId = useId();
  const [selected, setSelected] = useState<number | null>(null);

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
  const selectedPossession = possessions.find((p) => p.possessionNumber === selected) ?? null;

  function selectPossession(possessionNumber: number) {
    setSelected(possessionNumber);
  }

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
          position and result. Select a possession for full detail.
        </desc>

        {/* Field-position axis: ticks + own-goal/end-zone labels */}
        {FIELD_TICKS.map((tick) => {
          const x = MARGIN.left + xScale(tick);
          return (
            <g key={tick}>
              <line
                x1={x}
                x2={x}
                y1={MARGIN.top - 10}
                y2={height - MARGIN.bottom + 10}
                stroke="var(--e-rule)"
                strokeWidth={tick === 50 ? 1.5 : 1}
              />
              <text
                x={x}
                y={height - MARGIN.bottom + 24}
                textAnchor={tick === 0 ? "start" : tick === 100 ? "end" : "middle"}
                fontSize={11}
                fill="var(--e-muted)"
              >
                {tick === 0 ? "Own goal" : tick === 100 ? "End zone" : tick}
              </text>
            </g>
          );
        })}

        {possessions.map((p, i) => {
          const y = MARGIN.top + i * HEIGHT_PER_ROW + HEIGHT_PER_ROW / 2;
          const x1 = MARGIN.left + xScale(p.startFieldPosition);
          const x2 = MARGIN.left + xScale(p.endFieldPosition);
          const isSelected = selected === p.possessionNumber;
          return (
            <g
              key={p.possessionNumber}
              role="button"
              tabIndex={0}
              aria-pressed={isSelected}
              aria-controls={detailId}
              aria-label={`Possession ${p.possessionNumber}, ${RESULT_LABEL[p.result]}, starting at ${p.startFieldPosition} and ending at ${p.endFieldPosition}`}
              className="cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-[var(--esa-accent)]"
              onClick={() => selectPossession(p.possessionNumber)}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  e.preventDefault();
                  selectPossession(p.possessionNumber);
                }
              }}
            >
              <text x={MARGIN.left - 10} y={y + 4} textAnchor="end" fontSize={12} fill="var(--e-ink)">
                {p.possessionNumber}
              </text>
              <line
                x1={x1}
                y1={y}
                x2={x2}
                y2={y}
                stroke="var(--esa-accent)"
                strokeWidth={p.isScoring ? 6 : 3}
                strokeLinecap="round"
                opacity={selected == null || isSelected ? 1 : 0.45}
              />
              <circle
                cx={x1}
                cy={y}
                r={4}
                fill="white"
                stroke="var(--esa-accent)"
                strokeWidth={2}
                opacity={selected == null || isSelected ? 1 : 0.45}
              />
              <circle
                cx={x2}
                cy={y}
                r={p.isScoring ? 6 : 4}
                fill={p.isScoring ? "var(--esa-accent)" : "white"}
                stroke="var(--esa-accent)"
                strokeWidth={2}
                opacity={selected == null || isSelected ? 1 : 0.45}
              />
              <text x={MARGIN.left + laneWidth + 10} y={y + 4} fontSize={11} fill="var(--e-ink)">
                {RESULT_LABEL[p.result]}
                {p.isScoring ? ` · ${p.points} pts` : ""}
              </text>
            </g>
          );
        })}

        <text
          x={(MARGIN.left + WIDTH - MARGIN.right) / 2}
          y={height - 4}
          textAnchor="middle"
          fontSize={12}
          fill="var(--e-ink)"
        >
          Field position (yards from own goal)
        </text>
        <text
          transform={`translate(14 ${(MARGIN.top + height - MARGIN.bottom) / 2}) rotate(-90)`}
          textAnchor="middle"
          fontSize={12}
          fill="var(--e-ink)"
        >
          Possession
        </text>
      </svg>

      <p id={detailId} role="status" aria-live="polite" className="mt-3 text-sm text-[var(--e-soft)]">
        {selectedPossession ? (
          <>
            <strong className="text-[var(--e-ink)]">Possession {selectedPossession.possessionNumber}</strong> —
            started at {selectedPossession.startFieldPosition}, ended at{" "}
            {selectedPossession.endFieldPosition}, {RESULT_LABEL[selectedPossession.result]}
            {selectedPossession.isScoring ? `, ${selectedPossession.points} points` : ""}.
          </>
        ) : (
          "Select a possession to see its full detail."
        )}
      </p>

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
