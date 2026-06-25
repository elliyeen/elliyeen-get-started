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
        <a href="/" className="text-sm font-bold tracking-[0.22em] text-black">
          ELLIYEEN
        </a>

        <div className="hidden items-center gap-9 text-sm font-medium text-black md:flex">
          <a href="/#assessment" className="hover:text-black">How It Works</a>
          <a href="/#cases"      className="hover:text-black">Case Studies</a>
          <a href="/reports"     className="hover:text-black">Reports</a>
          <a href="/#pricing"    className="hover:text-black">Pricing</a>
          <a href="/#advisor"    className="hover:text-black">Advisor</a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
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
