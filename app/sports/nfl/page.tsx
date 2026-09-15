import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { sampleGameCard } from "@/lib/sports/esa/sample-game-card";

const BASE_URL = "https://www.elliyeen.com";
const FEATURED_GAME_HREF =
  "/sports/nfl/analysis/2026/week-1/denver-broncos-at-kansas-city-chiefs";

export const metadata: Metadata = {
  title: "NFL Sports Intelligence — Elliyeen Research",
  description:
    "NFL game analysis, possession production, Five Winning Truths, and measurable preparation priorities.",
  alternates: { canonical: `${BASE_URL}/sports/nfl` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/sports/nfl`,
    title: "NFL Sports Intelligence — Elliyeen Research",
    description:
      "NFL game analysis, possession production, Five Winning Truths, and measurable preparation priorities.",
  },
};

const teams = Array.from(
  new Set(
    sampleGameCard.analyses.map((a) => a.teamId),
  ),
).map((teamId) => {
  const game = sampleGameCard.game;
  return game.away.teamId === teamId ? game.away : game.home;
});

export default function NflSportsPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <a href="/sports" className="text-sm font-medium text-zinc-500 hover:text-zinc-800">
          ← Sports
        </a>
        <h1 className="mt-4 font-serif text-4xl font-bold text-black sm:text-5xl">NFL</h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">
          Elliyeen Sports Analytics reconstructs each NFL game from play-by-play data —
          possessions, chunk gains, red-zone finishes, and the coaching priorities that follow —
          so preparation starts from evidence, not impressions. Analyses are marked preliminary
          until they pass ESA quality control against the official gamebook.
        </p>

        <section className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Featured game analysis
          </h2>
          <a
            href={FEATURED_GAME_HREF}
            className="group mt-4 flex flex-col justify-between gap-2 rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50 sm:flex-row sm:items-center"
          >
            <div>
              <p className="text-lg font-bold text-black">
                {sampleGameCard.game.away.name} at {sampleGameCard.game.home.name}
              </p>
              <p className="mt-1 text-sm text-zinc-600">
                {sampleGameCard.game.away.score}–{sampleGameCard.game.home.score} · Final
              </p>
            </div>
            <span className="inline-flex items-center gap-1 text-sm font-semibold text-[#123A5A]">
              View game card
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </span>
          </a>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">Teams</h2>
          <div className="mt-4 flex flex-wrap gap-3">
            {teams.map((team) => (
              <span
                key={team.teamId}
                className="rounded-full border border-zinc-200 px-4 py-2 text-sm font-medium text-zinc-700"
              >
                {team.name}
              </span>
            ))}
          </div>
          <p className="mt-3 text-sm text-zinc-500">Full team profiles are coming soon.</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Latest analyses
          </h2>
          <ul className="mt-4 flex flex-col divide-y divide-zinc-100">
            <li className="py-4">
              <a href={FEATURED_GAME_HREF} className="text-sm font-semibold text-[#123A5A] hover:underline">
                {sampleGameCard.game.away.name} at {sampleGameCard.game.home.name} — Week{" "}
                {sampleGameCard.game.week}, {sampleGameCard.game.date.slice(0, 4)}
              </a>
            </li>
          </ul>
        </section>
      </main>
    </>
  );
}
