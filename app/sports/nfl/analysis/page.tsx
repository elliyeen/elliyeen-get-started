import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import { sampleGameCard } from "@/lib/sports/esa/sample-game-card";

const BASE_URL = "https://www.elliyeen.com";
const FEATURED_GAME_HREF =
  "/sports/nfl/analysis/2026/week-1/denver-broncos-at-kansas-city-chiefs";

export const metadata: Metadata = {
  title: "NFL Game Analysis — Elliyeen Research",
  description: "NFL game analysis from Elliyeen Sports Analytics.",
  alternates: { canonical: `${BASE_URL}/sports/nfl/analysis` },
};

export default function NflAnalysisIndexPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <a href="/sports/nfl" className="text-sm font-medium text-zinc-500 hover:text-zinc-800">
          ← NFL
        </a>
        <h1 className="mt-4 font-serif text-4xl font-bold text-black sm:text-5xl">
          NFL Game Analysis
        </h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">
          Every analysis below is reconstructed from game data, with coaching-facing findings
          and measurable preparation priorities. Records stay marked preliminary until they pass
          ESA quality control against the official gamebook.
        </p>

        <ul className="mt-10 flex flex-col divide-y divide-zinc-100">
          <li className="py-4">
            <a
              href={FEATURED_GAME_HREF}
              className="group flex items-center justify-between gap-2 text-sm font-semibold text-[#123A5A] hover:underline"
            >
              {sampleGameCard.game.away.name} at {sampleGameCard.game.home.name} — Week{" "}
              {sampleGameCard.game.week}, {sampleGameCard.game.date.slice(0, 4)}
              <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
            </a>
          </li>
        </ul>
      </main>
    </>
  );
}
