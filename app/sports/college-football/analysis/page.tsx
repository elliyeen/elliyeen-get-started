import type { Metadata } from "next";
import SiteNav from "@/app/SiteNav";

const BASE_URL = "https://www.elliyeen.com";

export const metadata: Metadata = {
  title: "College Football Game Analysis — Elliyeen Research",
  description: "Verified college football game analysis from Elliyeen Sports Analytics.",
  alternates: { canonical: `${BASE_URL}/sports/college-football/analysis` },
};

export default function CollegeFootballAnalysisIndexPage() {
  return (
    <>
      <SiteNav />
      <main className="mx-auto max-w-5xl px-6 py-16 sm:py-24">
        <a
          href="/sports/college-football"
          className="text-sm font-medium text-zinc-500 hover:text-zinc-800"
        >
          ← College Football
        </a>
        <h1 className="mt-4 font-serif text-4xl font-bold text-black sm:text-5xl">
          College Football Game Analysis
        </h1>
        <p className="mt-5 max-w-2xl text-base text-zinc-600 sm:text-lg">
          Analysis coming soon.
        </p>
      </main>
    </>
  );
}
