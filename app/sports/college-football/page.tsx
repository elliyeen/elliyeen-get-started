import type { Metadata } from "next";

const BASE_URL = "https://www.elliyeen.com";

export const metadata: Metadata = {
  title: "College Football Sports Intelligence — Elliyeen Research",
  description:
    "Program and game analysis connecting execution, roster resources, constraints, and winning probability.",
  alternates: { canonical: `${BASE_URL}/sports/college-football` },
  openGraph: {
    type: "website",
    url: `${BASE_URL}/sports/college-football`,
    title: "College Football Sports Intelligence — Elliyeen Research",
    description:
      "Program and game analysis connecting execution, roster resources, constraints, and winning probability.",
  },
};

export default function CollegeFootballPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <a href="/sports" className="text-sm font-medium text-zinc-500 hover:text-zinc-800">
          ← Sports
        </a>
        <h1 className="mt-4 font-serif text-4xl font-bold text-black sm:text-5xl">
          College Football
        </h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">
          Elliyeen Sports Analytics connects program execution, roster resources, constraints, and
          winning probability into evidence-based college football analysis.
        </p>

        <section className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Featured analyses
          </h2>
          <p className="mt-4 text-sm text-zinc-500">Analysis coming soon.</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Teams &amp; programs
          </h2>
          <p className="mt-4 text-sm text-zinc-500">Analysis coming soon.</p>
        </section>

        <section className="mt-12">
          <h2 className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
            Latest analyses
          </h2>
          <p className="mt-4 text-sm text-zinc-500">Analysis coming soon.</p>
        </section>
      </main>
    </>
  );
}
