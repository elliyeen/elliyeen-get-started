import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SiteNav from "@/app/SiteNav";

const BASE_URL = "https://www.elliyeen.com";

export const metadata: Metadata = {
  title: "Sports Intelligence — Elliyeen Research",
  description:
    "Evidence-based game analysis that identifies how teams created control, where performance was constrained, and what must improve before the next game.",
  alternates: { canonical: `${BASE_URL}/sports` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/sports`,
    title: "Sports Intelligence — Elliyeen Research",
    description:
      "Evidence-based game analysis that identifies how teams created control, where performance was constrained, and what must improve before the next game.",
  },
};

const leagues = [
  {
    name: "NFL",
    href: "/sports/nfl",
    description:
      "Verified game analysis, possession production, Five Winning Truths, and measurable preparation priorities.",
  },
  {
    name: "College Football",
    href: "/sports/college-football",
    description:
      "Program and game analysis connecting execution, roster resources, constraints, and winning probability.",
  },
];

export default function SportsPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#8B4A1A]">
          Elliyeen Sports Analytics
        </p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-black sm:text-5xl">
          Sports Intelligence
        </h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">
          Evidence-based game analysis that identifies how teams created control, where
          performance was constrained, and what must improve before the next game.
        </p>

        <div className="mt-12 grid gap-4 sm:grid-cols-2">
          {leagues.map((league) => (
            <a
              key={league.href}
              href={league.href}
              className="group flex flex-col justify-between rounded-2xl border border-zinc-200 p-6 transition-colors hover:border-zinc-300 hover:bg-zinc-50"
            >
              <div>
                <h2 className="text-xl font-bold text-black">{league.name}</h2>
                <p className="mt-2 text-sm text-zinc-600">{league.description}</p>
              </div>
              <span className="mt-6 inline-flex items-center gap-1 text-sm font-semibold text-[#123A5A]">
                Explore {league.name}
                <ArrowRight size={14} className="transition-transform group-hover:translate-x-0.5" />
              </span>
            </a>
          ))}
        </div>
      </main>
    </>
  );
}
