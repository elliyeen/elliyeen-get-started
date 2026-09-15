"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { parseGameCardResponse } from "@/lib/sports/esa/schema";
import type { Finding, GameCardResponse, TeamId, Unit, UnitAnalysis } from "@/lib/sports/esa/types";
import { emitAnalyticsEvent } from "@/lib/sports/esa/analytics";
import { PossessionMap } from "./PossessionMap";

export interface EsaGameCardProps {
  gameId: string;
  initialTeam?: TeamId;
  initialUnit?: Unit;
  data?: GameCardResponse;
}

const VALID_TEAMS: TeamId[] = ["DEN", "KC"];
const VALID_UNITS: Unit[] = ["offense", "defense"];

function coerceTeam(value: string | null): TeamId {
  return value === "DEN" || value === "KC" ? value : "DEN";
}

function coerceUnit(value: string | null): Unit {
  return value === "offense" || value === "defense" ? value : "offense";
}

const TEAM_NAME: Record<TeamId, string> = { DEN: "Denver", KC: "Kansas City" };

export function EsaGameCard({ gameId, initialTeam = "DEN", initialUnit = "offense", data }: EsaGameCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const validated = useMemo(() => {
    if (!data) return null;
    return parseGameCardResponse(data);
  }, [data]);

  const teamFromUrl = searchParams.get("team");
  const unitFromUrl = searchParams.get("unit");

  const [team, setTeamState] = useState<TeamId>(
    teamFromUrl ? coerceTeam(teamFromUrl) : initialTeam,
  );
  const [unit, setUnitState] = useState<Unit>(
    unitFromUrl ? coerceUnit(unitFromUrl) : initialUnit,
  );
  const [selectedFindingId, setSelectedFindingId] = useState<string | null>(null);

  const selectedAnalysis = useMemo(
    () =>
      validated?.success
        ? validated.data.analyses.find((item: UnitAnalysis) => item.teamId === team && item.unit === unit)
        : undefined,
    [validated, team, unit],
  );

  const updateUrl = useCallback(
    (nextTeam: TeamId, nextUnit: Unit) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set("team", nextTeam);
      params.set("unit", nextUnit);
      router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    },
    [pathname, router, searchParams],
  );

  if (!data) {
    return (
      <p role="alert">Game data is not available.</p>
    );
  }

  if (!validated || !validated.success) {
    return (
      <p role="alert">
        This game record failed validation and cannot be displayed. No statistics are shown
        because they could not be verified against the ESA data contract.
      </p>
    );
  }

  const gameCard = validated.data;

  const handleSelectTeam = (nextTeam: TeamId) => {
    setTeamState(nextTeam);
    updateUrl(nextTeam, unit);
    emitAnalyticsEvent({
      name: "game_card_team_selected",
      properties: { game_id: gameId, team_id: nextTeam, record_version: gameCard.recordVersion },
    });
  };

  const handleSelectUnit = (nextUnit: Unit) => {
    setUnitState(nextUnit);
    updateUrl(team, nextUnit);
    emitAnalyticsEvent({
      name: "game_card_unit_selected",
      properties: { game_id: gameId, team_id: team, unit: nextUnit },
    });
  };

  const handleSelectFinding = (finding: Finding) => {
    setSelectedFindingId(finding.findingId);
    emitAnalyticsEvent({
      name: "game_card_finding_opened",
      properties: { game_id: gameId, finding_id: finding.findingId, evidence_grade: finding.evidenceGrade },
    });
  };

  const accentVar = team === "DEN" ? "var(--esa-denver-blue)" : "var(--esa-chiefs-red)";
  const accentLtVar = team === "DEN" ? "var(--esa-denver-blue-lt)" : "var(--esa-chiefs-red-lt)";

  return (
    <section
      aria-label={`Interactive game analysis, ${gameCard.game.away.name} at ${gameCard.game.home.name}`}
      className="mx-auto w-full max-w-[960px] px-4 py-8 sm:px-6"
      style={{ ["--esa-accent" as string]: accentVar, ["--esa-accent-lt" as string]: accentLtVar }}
    >
      {gameCard.recordStatus === "preliminary" && (
        <p
          role="status"
          className="mb-4 inline-block rounded-full border border-[var(--e-rule)] bg-[var(--e-surface)] px-3 py-1 text-xs font-semibold uppercase tracking-wide text-[var(--e-soft)]"
        >
          Preliminary — official gamebook not yet verified
        </p>
      )}

      <FinalScore data={gameCard} />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <TeamSelector team={team} onSelect={handleSelectTeam} />
        <UnitSelector unit={unit} onSelect={handleSelectUnit} />
      </div>

      {!selectedAnalysis ? (
        <p role="alert" className="mt-8">
          Analysis is not available for this team and unit.
        </p>
      ) : (
        <UnitView
          analysis={selectedAnalysis}
          gameId={gameId}
          selectedFindingId={selectedFindingId}
          onSelectFinding={handleSelectFinding}
        />
      )}

      <DataQualityFooter data={gameCard} />
    </section>
  );
}

function FinalScore({ data }: { data: GameCardResponse }) {
  return (
    <div
      className="flex items-center justify-center gap-6 rounded-2xl border border-[var(--e-rule)] bg-white px-6 py-5"
      aria-label={`Final score: ${data.game.away.name} ${data.game.away.score}, ${data.game.home.name} ${data.game.home.score}`}
    >
      <TeamScore name={data.game.away.name} score={data.game.away.score} accent="var(--esa-denver-blue)" />
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--e-muted)]">Final</span>
      <TeamScore name={data.game.home.name} score={data.game.home.score} accent="var(--esa-chiefs-red)" />
    </div>
  );
}

function TeamScore({ name, score, accent }: { name: string; score: number; accent: string }) {
  return (
    <div className="flex flex-col items-center gap-1">
      <span className="h-1 w-10 rounded-full" style={{ backgroundColor: accent }} aria-hidden="true" />
      <span className="text-sm font-medium text-[var(--e-soft)]">{name}</span>
      <span className="text-3xl font-bold tabular-nums text-[var(--e-ink)]">{score}</span>
    </div>
  );
}

function TeamSelector({ team, onSelect }: { team: TeamId; onSelect: (team: TeamId) => void }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--e-muted)]" id="esa-team-label">
        Team
      </div>
      <div role="tablist" aria-labelledby="esa-team-label" className="flex gap-2">
        {VALID_TEAMS.map((t) => (
          <button
            key={t}
            type="button"
            role="tab"
            aria-selected={team === t}
            onClick={() => onSelect(t)}
            className="min-h-11 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors"
            style={{
              borderColor: team === t ? (t === "DEN" ? "var(--esa-denver-blue)" : "var(--esa-chiefs-red)") : "var(--e-rule)",
              backgroundColor: team === t ? (t === "DEN" ? "var(--esa-denver-blue)" : "var(--esa-chiefs-red)") : "transparent",
              color: team === t ? "#fff" : "var(--e-ink)",
            }}
          >
            {team === t && (
              <span aria-hidden="true">✓ </span>
            )}
            {TEAM_NAME[t]}
          </button>
        ))}
      </div>
    </div>
  );
}

function UnitSelector({ unit, onSelect }: { unit: Unit; onSelect: (unit: Unit) => void }) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--e-muted)]" id="esa-unit-label">
        Unit
      </div>
      <div role="tablist" aria-labelledby="esa-unit-label" className="flex gap-2">
        {VALID_UNITS.map((u) => (
          <button
            key={u}
            type="button"
            role="tab"
            aria-selected={unit === u}
            onClick={() => onSelect(u)}
            className="min-h-11 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors"
            style={{
              borderColor: unit === u ? "var(--e-ink)" : "var(--e-rule)",
              backgroundColor: unit === u ? "var(--e-ink)" : "transparent",
              color: unit === u ? "#fff" : "var(--e-ink)",
            }}
          >
            {unit === u && (
              <span aria-hidden="true">✓ </span>
            )}
            {u === "offense" ? "Offense" : "Defense"}
          </button>
        ))}
      </div>
    </div>
  );
}

function UnitView({
  analysis,
  gameId,
  selectedFindingId,
  onSelectFinding,
}: {
  analysis: UnitAnalysis;
  gameId: string;
  selectedFindingId: string | null;
  onSelectFinding: (finding: Finding) => void;
}) {
  const visibleMetrics = analysis.metrics.filter(
    (m) => m.validationStatus === "passed" || m.validationStatus === "unavailable",
  );
  const publishedFindings = analysis.findings.filter(
    (f) => f.publicationStatus === "published" && f.evidenceGrade !== "C" && f.evidenceGrade !== "D",
  );
  const activeFinding =
    publishedFindings.find((f) => f.findingId === selectedFindingId) ?? publishedFindings[0] ?? null;

  return (
    <div className="mt-8">
      <p className="text-2xl font-semibold leading-snug text-[var(--e-ink)]">
        <strong style={{ color: "var(--esa-accent)" }}>{TEAM_NAME[analysis.teamId]}</strong>{" "}
        {analysis.unit}: {analysis.thesis}
      </p>

      <div className="mt-2 text-sm text-[var(--e-soft)]" id="esa-primary-finding">
        {analysis.primaryFinding}
      </div>

      <ul className="esa-metric-strip mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Decision-relevant metrics">
        {visibleMetrics.map((metric) => (
          <li
            key={metric.metricId}
            className="rounded-xl border border-[var(--e-rule)] bg-[var(--e-surface)] p-3"
          >
            <div className="text-xs font-semibold text-[var(--e-soft)]">{metric.coachingLabel}</div>
            <div className="mt-1 text-xl font-bold tabular-nums text-[var(--e-ink)]">
              {metric.formattedValue}
            </div>
            <div className="text-[11px] text-[var(--e-muted)]">{metric.label}</div>
          </li>
        ))}
      </ul>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg font-semibold text-[var(--e-ink)]">Evidence findings</h2>
          <ul className="mt-3 flex flex-col">
            {publishedFindings.map((finding) => {
              const isActive = activeFinding?.findingId === finding.findingId;
              return (
                <li key={finding.findingId} className="border-b border-[var(--e-rule)] py-3">
                  <button
                    type="button"
                    aria-pressed={isActive}
                    onClick={() => onSelectFinding(finding)}
                    className="flex w-full items-center justify-between gap-3 text-left"
                  >
                    <span
                      className="font-medium"
                      style={{ color: isActive ? "var(--esa-accent)" : "var(--e-ink)" }}
                    >
                      {isActive && <span aria-hidden="true">▸ </span>}
                      {finding.title}
                    </span>
                    <span className="text-sm text-[var(--e-muted)]">{finding.shortEvidence}</span>
                  </button>
                </li>
              );
            })}
          </ul>
          <div
            aria-live="polite"
            role="status"
            aria-label="Selected finding evidence"
            className="mt-4 border-l-2 pl-3 text-sm text-[var(--e-soft)]"
            style={{ borderColor: "var(--esa-accent)" }}
          >
            {activeFinding?.evidence ?? "Select a finding to see its supporting evidence."}
          </div>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-[var(--e-ink)]">Coaching priorities</h2>
          <ol className="mt-3 flex flex-col gap-4">
            {analysis.priorities.map((priority) => (
              <li key={priority.priority} className="flex gap-3">
                <span className="font-bold text-[var(--e-muted)]">{String(priority.priority).padStart(2, "0")}</span>
                <div>
                  <div className="font-medium text-[var(--e-ink)]">{priority.title}</div>
                  <div className="text-sm text-[var(--e-soft)]">{priority.practiceMeasure}</div>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </div>

      <div className="mt-10">
        <h2 className="text-lg font-semibold text-[var(--e-ink)]">Possession map</h2>
        <PossessionMap teamName={TEAM_NAME[analysis.teamId]} teamId={analysis.teamId} />
      </div>

      <p className="mt-2 text-xs text-[var(--e-muted)]">Game ID: {gameId}</p>
    </div>
  );
}

function DataQualityFooter({ data }: { data: GameCardResponse }) {
  return (
    <footer className="mt-10 border-t border-[var(--e-rule)] pt-4 text-xs text-[var(--e-muted)]">
      Record version {data.recordVersion} · Data quality score {Math.round(data.dataQualityScore * 100)}%
      {" · "}
      {data.gamebookVerified ? "Official gamebook verified" : "Official gamebook verification pending"}
    </footer>
  );
}
