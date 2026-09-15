import type { Metadata } from "next";

const BASE_URL = "https://www.elliyeen.com";
const FEATURED_GAME_HREF =
  "/sports/nfl/analysis/2026/week-1/denver-broncos-at-kansas-city-chiefs";

export const metadata: Metadata = {
  title: "Game Intelligence — Elliyeen Research",
  description:
    "How Elliyeen Sports Analytics turns verified game evidence into coaching decisions: source acquisition, reconciliation, normalization, analysis, and quality control.",
  alternates: { canonical: `${BASE_URL}/sports/game-intelligence` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/sports/game-intelligence`,
    title: "Game Intelligence — Elliyeen Research",
    description:
      "How Elliyeen Sports Analytics turns verified game evidence into coaching decisions.",
  },
};

const pipelineSteps = [
  {
    title: "Source acquisition",
    body: "Attempt to acquire play-by-play, box score, and drive data from authoritative public sources for each game.",
  },
  {
    title: "Reconciliation",
    body: "Cross-check acquired sources against each other. Conflicting values are flagged, never silently overwritten.",
  },
  {
    title: "Normalization",
    body: "Reconcile source-specific formats into stable ESA fields — possessions, plays, and team statistics.",
  },
  {
    title: "Analysis",
    body: "Derive coaching-facing metrics — possession production, chunk gains, finishing scoring opportunities — from normalized data only.",
  },
  {
    title: "Itqan quality control",
    body: "Audit completeness, source provenance, contradictions, and calculation integrity before anything is eligible to publish.",
  },
  {
    title: "Publication",
    body: "Only validated data reaches the public Game Card. A record stays marked preliminary until the official gamebook has been verified.",
  },
];

export default function GameIntelligencePage() {
  return (
    <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
      <a href="/sports" className="text-sm font-medium text-zinc-500 hover:text-zinc-800">
        ← Sports
      </a>
      <h1 className="mt-4 font-serif text-4xl font-bold text-black sm:text-5xl">
        Game Intelligence
      </h1>
      <p className="mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">
        Game Intelligence is how Elliyeen Sports Analytics turns verified game
        evidence into coaching decisions — not a highlight reel, and not a raw
        stat dump. Every published number is traceable back to a source
        record and a documented calculation.
      </p>

      <section id="latest-game-cards" className="mt-16 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-black">Latest Game Cards</h2>
        <div className="mt-5 border border-zinc-200 p-6">
          <p className="text-sm font-semibold text-zinc-900">
            Denver Broncos at Kansas City Chiefs — 2026 Week 1
          </p>
          <p className="mt-2 text-sm text-zinc-600">
            Preliminary analysis · Official NFL gamebook pending
          </p>
          <a
            href={FEATURED_GAME_HREF}
            className="mt-4 inline-block text-sm font-semibold text-[#0B4268] hover:underline"
          >
            View the game card →
          </a>
        </div>
      </section>

      <section id="methodology" className="mt-16 scroll-mt-24">
        <h2 className="font-serif text-2xl font-bold text-black">Methodology</h2>
        <p className="mt-3 max-w-2xl text-sm text-zinc-600">
          Every game moves through the same pipeline before it can appear on
          a public Game Card:
        </p>
        <ol className="mt-6 flex flex-col gap-5">
          {pipelineSteps.map((step, i) => (
            <li key={step.title} className="flex gap-4 border-b border-zinc-100 pb-5">
              <span className="text-sm font-bold text-zinc-400">{String(i + 1).padStart(2, "0")}</span>
              <div>
                <p className="text-sm font-semibold text-zinc-900">{step.title}</p>
                <p className="mt-1 text-sm text-zinc-600">{step.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </main>
  );
}
