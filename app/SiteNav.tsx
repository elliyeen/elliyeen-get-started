"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown, ArrowRight } from "lucide-react";
import MobileNav from "./MobileNav";

export default function SiteNav() {
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") setResourcesOpen(false);
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

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
          <a href="/how-it-works" className="hover:text-black">How It Works</a>
          <a href="/#cases"       className="hover:text-black">Industries</a>

          {/* Resources dropdown */}
          <div className="relative" ref={dropdownRef}>
            <button
              onClick={() => setResourcesOpen((o) => !o)}
              aria-expanded={resourcesOpen}
              className="flex items-center gap-1 hover:text-black"
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {resourcesOpen && (
              <div className="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg">
                <a
                  href="/reports"
                  onClick={() => setResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Reports
                </a>
                <a
                  href="/good-profits"
                  onClick={() => setResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Good Profit
                </a>
              </div>
            )}
          </div>

          <a href="/#pricing"    className="hover:text-black">Pricing</a>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
            className="inline-flex min-h-[44px] items-center gap-2 rounded-xl bg-[#123A5A] px-6 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] hover:bg-[#0e2d47]"
          >
            Fix it <ArrowRight size={14} />
          </a>
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
