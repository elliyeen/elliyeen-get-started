import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Suspense } from "react";
import SiteNav from "@/app/SiteNav";
import { EsaGameCard } from "@/components/sports/GameCard/EsaGameCard";
import { sampleGameCard } from "@/lib/sports/esa/sample-game-card";

const BASE_URL = "https://www.elliyeen.com";

interface GameRoute {
  season: string;
  week: string;
  matchup: string;
  gameId: string;
}

// Single published ESA fixture game today. Each future PUBLISHED game
// (see the ESA architecture proposal's publication state machine) adds one
// entry here — this static export requires every route enumerable at build
// time via generateStaticParams.
const GAMES: GameRoute[] = [
  {
    season: "2026",
    week: "week-6",
    matchup: "denver-broncos-vs-kansas-city-chiefs",
    gameId: sampleGameCard.gameId,
  },
];

function findGame(season: string, week: string, matchup: string) {
  return GAMES.find((g) => g.season === season && g.week === week && g.matchup === matchup);
}

export function generateStaticParams() {
  return GAMES.map((g) => ({ season: g.season, week: g.week, matchup: g.matchup }));
}

type RouteParams = { season: string; week: string; matchup: string };

export async function generateMetadata({
  params,
}: {
  params: Promise<RouteParams>;
}): Promise<Metadata> {
  const { season, week, matchup } = await params;
  const game = findGame(season, week, matchup);
  if (!game) return {};

  const { away, home } = sampleGameCard.game;
  const weekNumber = week.replace(/^week-/, "");
  const title = `${away.name} at ${home.name} — Week ${weekNumber}, ${season} | ESA Game Card`;
  const description = `Elliyeen Sports Analytics interactive game card for ${away.name} at ${home.name}: possession production, chunk gains, red-zone finishes and coaching priorities. Preliminary — official gamebook pending verification.`;
  const canonicalPath = `/sports/nfl/analysis/${season}/${week}/${matchup}/`;

  return {
    title,
    description,
    alternates: { canonical: `${BASE_URL}${canonicalPath}` },
    openGraph: {
      type: "article",
      url: `${BASE_URL}${canonicalPath}`,
      title,
      description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function EsaGameCardPage({ params }: { params: Promise<RouteParams> }) {
  const { season, week, matchup } = await params;
  const game = findGame(season, week, matchup);
  if (!game) notFound();

  return (
    <>
      <SiteNav />
      <main className="min-h-screen bg-[var(--e-white)] pt-20">
        <Suspense fallback={null}>
          <EsaGameCard gameId={game.gameId} data={sampleGameCard} />
        </Suspense>
      </main>
    </>
  );
}
