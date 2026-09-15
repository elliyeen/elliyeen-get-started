"use client";

import { useCallback, useMemo, useState } from "react";
import { useRouter, useSearchParams, usePathname } from "next/navigation";
import { parseGameCardResponse } from "@/lib/sports/esa/schema";
import type { Finding, GameCardResponse, MetricValue, Team, TeamId, Unit, UnitAnalysis } from "@/lib/sports/esa/types";
import { emitAnalyticsEvent } from "@/lib/sports/esa/analytics";
import { PossessionMap } from "./PossessionMap";

export interface EsaGameCardProps {
  gameId: string;
  initialTeam?: TeamId;
  initialUnit?: Unit;
  data?: GameCardResponse;
}

const VALID_UNITS: Unit[] = ["offense", "defense"];

// Resolves a team's configured color token to a CSS color value. A token is
// either a CSS custom-property suffix (var(--esa-<token>)) or a literal CSS
// color (e.g. "#003594"). No team identity is known here — only tokens.
function resolveTeamColor(token: string | undefined, fallback: string): string {
  if (!token) return fallback;
  return token.startsWith("#") || token.startsWith("var(") || token.startsWith("rgb") || token.startsWith("hsl")
    ? token
    : `var(--esa-${token}, ${fallback})`;
}

function coerceUnit(value: string | null): Unit {
  return value === "offense" || value === "defense" ? value : "offense";
}

export function EsaGameCard({ gameId, initialTeam, initialUnit = "offense", data }: EsaGameCardProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const validated = useMemo(() => {
    if (!data) return null;
    return parseGameCardResponse(data);
  }, [data]);

  const teamFromUrl = searchParams.get("team");
  const unitFromUrl = searchParams.get("unit");

  // The away team is the safe default for this game — never a hard-coded
  // franchise. A URL-supplied team is only honored if it belongs to this
  // game; otherwise it falls back to the away team, same as an invalid value.
  const gameTeams: [Team, Team] | null =
    validated?.success ? [validated.data.game.away, validated.data.game.home] : null;

  function coerceTeam(value: string | null): TeamId {
    if (!gameTeams) return initialTeam ?? "";
    const [away, home] = gameTeams;
    if (value === away.teamId || value === home.teamId) return value;
    if (initialTeam && (initialTeam === away.teamId || initialTeam === home.teamId)) return initialTeam;
    return away.teamId;
  }

  const [team, setTeamState] = useState<TeamId>(() => coerceTeam(teamFromUrl));
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

  const selectedTeam =
    gameCard.game.away.teamId === team ? gameCard.game.away : gameCard.game.home;
  const opponentTeam =
    gameCard.game.away.teamId === team ? gameCard.game.home : gameCard.game.away;
  const opponentAnalysis = gameCard.analyses.find(
    (item: UnitAnalysis) => item.teamId === opponentTeam.teamId && item.unit === unit,
  );
  const accentVar = resolveTeamColor(selectedTeam.primaryColorToken, "var(--e-ink)");
  const accentLtVar = resolveTeamColor(selectedTeam.secondaryColorToken, "var(--e-surface)");

  return (
    <section
      aria-label={`Interactive game analysis, ${gameCard.game.away.name} at ${gameCard.game.home.name}`}
      className="mx-auto w-full max-w-[960px] px-4 py-8 sm:px-6"
      style={{ ["--esa-accent" as string]: accentVar, ["--esa-accent-lt" as string]: accentLtVar }}
    >
      <FinalScore data={gameCard} />

      <div className="mt-6 flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <TeamSelector teams={[gameCard.game.away, gameCard.game.home]} team={team} onSelect={handleSelectTeam} />
        <UnitSelector unit={unit} onSelect={handleSelectUnit} />
      </div>

      {!selectedAnalysis ? (
        <p role="alert" className="mt-8">
          Analysis is not available for this team and unit.
        </p>
      ) : (
        <UnitView
          analysis={selectedAnalysis}
          team={selectedTeam}
          opponent={opponentTeam}
          opponentAnalysis={opponentAnalysis}
          gameId={gameId}
          selectedFindingId={selectedFindingId}
          onSelectFinding={handleSelectFinding}
        />
      )}
    </section>
  );
}

function FinalScore({ data }: { data: GameCardResponse }) {
  return (
    <div
      className="flex items-center justify-center gap-6 rounded-2xl border border-[var(--e-rule)] bg-white px-6 py-5"
      aria-label={`Final score: ${data.game.away.name} ${data.game.away.score}, ${data.game.home.name} ${data.game.home.score}`}
    >
      <TeamScore
        name={data.game.away.name}
        score={data.game.away.score}
        accent={resolveTeamColor(data.game.away.primaryColorToken, "var(--e-ink)")}
      />
      <span className="text-xs font-bold uppercase tracking-widest text-[var(--e-muted)]">Final</span>
      <TeamScore
        name={data.game.home.name}
        score={data.game.home.score}
        accent={resolveTeamColor(data.game.home.primaryColorToken, "var(--e-ink)")}
      />
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

function TeamSelector({
  teams,
  team,
  onSelect,
}: {
  teams: [Team, Team];
  team: TeamId;
  onSelect: (team: TeamId) => void;
}) {
  return (
    <div>
      <div className="mb-1 text-xs font-semibold uppercase tracking-wide text-[var(--e-muted)]" id="esa-team-label">
        Team
      </div>
      <div role="tablist" aria-labelledby="esa-team-label" className="flex gap-2">
        {teams.map((t) => {
          const isSelected = team === t.teamId;
          const accent = resolveTeamColor(t.primaryColorToken, "var(--e-ink)");
          return (
            <button
              key={t.teamId}
              type="button"
              role="tab"
              aria-selected={isSelected}
              onClick={() => onSelect(t.teamId)}
              className="min-h-11 rounded-full border-2 px-4 py-2 text-sm font-semibold transition-colors"
              style={{
                borderColor: isSelected ? accent : "var(--e-rule)",
                backgroundColor: isSelected ? accent : "transparent",
                color: isSelected ? "#fff" : "var(--e-ink)",
              }}
            >
              {isSelected && <span aria-hidden="true">✓ </span>}
              {t.shortName ?? t.name}
            </button>
          );
        })}
      </div>
    </div>
  );
}

// Horizontal two-row bar comparison for the primary metric. Plain divs sized
// by percentage width — no charting library. Bar length is only meaningful
// when both values are numeric; non-numeric primary metrics (e.g. "2/12")
// still show their labeled values without a proportional fill.
function PrimaryComparison({
  team,
  teamMetric,
  opponent,
  opponentMetric,
}: {
  team: Team;
  teamMetric: MetricValue;
  opponent: Team;
  opponentMetric: MetricValue | undefined;
}) {
  const teamValue = typeof teamMetric.value === "number" ? teamMetric.value : null;
  const opponentValue =
    opponentMetric && typeof opponentMetric.value === "number" ? opponentMetric.value : null;
  const max = Math.max(teamValue ?? 0, opponentValue ?? 0) || 1;

  const rows: Array<{ label: string; value: number | null; formatted: string; color: string }> = [
    {
      label: team.abbreviation,
      value: teamValue,
      formatted: teamMetric.formattedValue,
      color: resolveTeamColor(team.primaryColorToken, "var(--e-ink)"),
    },
  ];
  if (opponentMetric) {
    rows.push({
      label: opponent.abbreviation,
      value: opponentValue,
      formatted: opponentMetric.formattedValue,
      color: resolveTeamColor(opponent.primaryColorToken, "var(--e-muted)"),
    });
  }

  return (
    <div className="mt-4 flex flex-col gap-2" aria-hidden="false">
      {rows.map((row) => (
        <div key={row.label} className="flex items-center gap-3">
          <span className="w-10 shrink-0 text-xs font-semibold text-[var(--e-soft)]">{row.label}</span>
          <div className="h-2 flex-1 overflow-hidden rounded-full bg-[var(--e-rule)]">
            <div
              className="h-full rounded-full"
              style={{
                width: row.value !== null ? `${Math.max(4, (row.value / max) * 100)}%` : "0%",
                backgroundColor: row.color,
              }}
            />
          </div>
          <span className="w-12 shrink-0 text-right text-xs font-semibold tabular-nums text-[var(--e-ink)]">
            {row.formatted}
          </span>
        </div>
      ))}
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
  team,
  opponent,
  opponentAnalysis,
  gameId,
  selectedFindingId,
  onSelectFinding,
}: {
  analysis: UnitAnalysis;
  team: Team;
  opponent: Team;
  opponentAnalysis: UnitAnalysis | undefined;
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

  const primaryMetric = analysis.metrics.find((m) => analysis.primaryMetricIds.includes(m.metricId));
  const opponentPrimaryMetric = opponentAnalysis?.metrics.find((m) => m.label === primaryMetric?.label);

  return (
    <div className="mt-8">
      <p className="text-2xl font-semibold leading-snug text-[var(--e-ink)]">{analysis.thesis}</p>

      <section aria-live="polite" className="mt-5 rounded-xl border border-[var(--e-rule)] bg-white p-4 sm:p-5">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-[var(--e-muted)]" id="esa-primary-finding-label">
          Primary finding
        </div>
        <h2 className="text-lg! font-bold! leading-tight! text-[var(--e-ink)] mt-1">
          {primaryMetric?.coachingLabel ?? analysis.primaryFinding}
        </h2>
        <p className="mt-1 text-sm text-[var(--e-soft)]">{analysis.primaryFinding}</p>

        {primaryMetric && (
          <PrimaryComparison
            team={team}
            teamMetric={primaryMetric}
            opponent={opponent}
            opponentMetric={opponentPrimaryMetric}
          />
        )}
      </section>

      <ul className="esa-metric-strip mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4" aria-label="Decision-relevant metrics">
        {visibleMetrics.map((metric) => {
          const opponentMetric = opponentAnalysis?.metrics.find((m) => m.label === metric.label);
          return (
            <li
              key={metric.metricId}
              className="rounded-xl border border-[var(--e-rule)] bg-white p-3"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wide text-[var(--e-muted)]">
                {metric.label}
              </div>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="text-xl font-bold tabular-nums" style={{ color: "var(--esa-accent)" }}>
                  {metric.formattedValue}
                </span>
                {opponentMetric && (
                  <span className="text-xs tabular-nums text-[var(--e-muted)]">
                    {opponentMetric.formattedValue}
                  </span>
                )}
              </div>
              <div className="text-[11px] text-[var(--e-soft)]">{metric.coachingLabel}</div>
            </li>
          );
        })}
      </ul>

      <div className="mt-8 grid gap-8 md:grid-cols-2">
        <div>
          <h2 className="text-lg! font-semibold! text-[var(--e-ink)]">Evidence findings</h2>
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
          <h2 className="text-lg! font-semibold! text-[var(--e-ink)]">Coaching priorities</h2>
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
        <h2 className="text-lg! font-semibold! text-[var(--e-ink)]">Possession map</h2>
        <PossessionMap teamName={team.name} teamId={analysis.teamId} />
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
