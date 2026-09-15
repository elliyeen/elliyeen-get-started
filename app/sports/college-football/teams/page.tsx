import type { Metadata } from "next";

const BASE_URL = "https://www.elliyeen.com";

export const metadata: Metadata = {
  title: "College Football Teams — Elliyeen Research",
  description: "College football team and program profiles covered by Elliyeen Sports Analytics.",
  alternates: { canonical: `${BASE_URL}/sports/college-football/teams` },
};

export default function CollegeFootballTeamsPage() {
  return (
    <>
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <a
          href="/sports/college-football"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
        >
          ← College Football
        </a>
        <h1 className="mt-4 font-serif text-4xl font-bold text-black sm:text-5xl">
          College Football Teams
        </h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">
          Analysis coming soon.
        </p>
      </main>
    </>
  );
}
