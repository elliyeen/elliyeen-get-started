"use client";

import MobileNav from "./MobileNav";

export default function SiteNav() {
  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50">
      <div
        className="absolute inset-0 bg-[#f7f4ee]/90"
        style={{
          backdropFilter: "saturate(180%) blur(12px)",
          WebkitBackdropFilter: "saturate(180%) blur(12px)",
        }}
        aria-hidden="true"
      />
      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        <a href="/" className="text-sm font-bold tracking-[0.22em]">
          ELLIYEEN
        </a>

        <div className="hidden items-center gap-9 text-sm font-medium text-zinc-600 md:flex">
          <a href="/#assessment" className="hover:text-black">How It Works</a>
          <a href="/#cases"      className="hover:text-black">Case Studies</a>
          <a href="/reports"     className="hover:text-black">Reports</a>
          <a href="/#pricing"    className="hover:text-black">Pricing</a>
          <a href="/#advisor"    className="hover:text-black">AI Advisor</a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="/#contact"
            className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-400 md:block"
          >
            Contact sales
          </a>
          <a
            href="/#book"
            className="rounded-full bg-[#1B5EA8] px-4 py-2 text-sm font-semibold text-white hover:bg-[#164d8e]"
          >
            Fix it
          </a>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
