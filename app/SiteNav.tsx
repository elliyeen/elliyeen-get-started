"use client";

import { useState, useRef, useEffect } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown } from "lucide-react";
import MobileNav from "./MobileNav";

const SPORTS_GROUPS = [
  {
    label: "NFL",
    href: "/sports/nfl",
    items: [
      { label: "NFL Overview", href: "/sports/nfl" },
      { label: "Teams", href: "/sports/nfl/teams" },
      { label: "Game Analysis", href: "/sports/nfl/analysis" },
    ],
  },
  {
    label: "College Football",
    href: "/sports/college-football",
    items: [
      { label: "College Football Overview", href: "/sports/college-football" },
      { label: "Teams", href: "/sports/college-football/teams" },
      { label: "Game Analysis", href: "/sports/college-football/analysis" },
    ],
  },
];

export default function SiteNav() {
  const pathname = usePathname();
  const [resourcesOpen, setResourcesOpen] = useState(false);
  const [sportsOpen, setSportsOpen] = useState(false);
  const [atTop, setAtTop] = useState(true);
  const resourcesRef = useRef<HTMLDivElement>(null);
  const sportsRef = useRef<HTMLDivElement>(null);

  const isSportsRoute = pathname?.startsWith("/sports") ?? false;

  /* ── Scroll-aware background (transparent over hero → frosted when scrolled) */
  useEffect(() => {
    const check = () => setAtTop(window.scrollY < 12);
    check();
    window.addEventListener("scroll", check, { passive: true });
    return () => window.removeEventListener("scroll", check);
  }, []);

  /* ── Close dropdowns on outside click or Escape ─────────────────────────── */
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (resourcesRef.current && !resourcesRef.current.contains(e.target as Node)) {
        setResourcesOpen(false);
      }
      if (sportsRef.current && !sportsRef.current.contains(e.target as Node)) {
        setSportsOpen(false);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setResourcesOpen(false);
        setSportsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  /* ── Close a dropdown when focus leaves its container ───────────────────── */
  function handleSportsBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setSportsOpen(false);
    }
  }
  function handleResourcesBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setResourcesOpen(false);
    }
  }

  return (
    <nav aria-label="Main navigation" className="sticky top-0 z-50">
      {/* Background: transparent at page top, frosted glass once scrolled */}
      <div
        className="absolute inset-0 transition-all duration-300"
        style={
          atTop
            ? { background: "transparent" }
            : {
                background: "rgba(247,244,238,0.92)",
                backdropFilter: "saturate(180%) blur(14px)",
                WebkitBackdropFilter: "saturate(180%) blur(14px)",
                borderBottom: "1px solid rgba(0,0,0,0.06)",
              }
        }
        aria-hidden="true"
      />

      <div className="relative mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
        {/* ── Logo — $100-bill gold ───────────────────────────────────────── */}
        <a
          href="/"
          className="text-sm font-bold tracking-[0.22em] transition-colors"
          style={{ color: "#D87A24" }}
        >
          ELLIYEEN
        </a>

        {/* ── Desktop nav links ───────────────────────────────────────────── */}
        <div className="hidden items-center gap-9 text-sm font-medium text-black md:flex">
          <a href="/how-it-works" className="hover:opacity-70 transition-opacity">How It Works</a>
          <a href="/#cases"       className="hover:opacity-70 transition-opacity">Industries</a>

          {/* Sports dropdown */}
          <div className="relative" ref={sportsRef} onBlur={handleSportsBlur}>
            <button
              onClick={() => setSportsOpen((o) => !o)}
              aria-expanded={sportsOpen}
              aria-haspopup="true"
              aria-current={isSportsRoute ? "page" : undefined}
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            >
              Sports
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${sportsOpen ? "rotate-180" : ""}`}
              />
            </button>
            {sportsOpen && (
              <div
                role="menu"
                aria-label="Sports"
                className="absolute left-0 top-full mt-2 grid w-[420px] grid-cols-2 gap-1 overflow-hidden rounded-xl border border-zinc-200 bg-white p-2 shadow-lg"
              >
                {SPORTS_GROUPS.map((group) => (
                  <div key={group.label} className="flex flex-col">
                    <a
                      href={group.href}
                      role="menuitem"
                      onClick={() => setSportsOpen(false)}
                      aria-current={pathname === group.href ? "page" : undefined}
                      className="rounded-lg px-3 py-2 text-sm font-semibold text-zinc-900 hover:bg-zinc-50"
                    >
                      {group.label}
                    </a>
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setSportsOpen(false)}
                        aria-current={pathname === item.href ? "page" : undefined}
                        className="rounded-lg px-3 py-2 text-sm text-zinc-600 hover:bg-zinc-50 hover:text-zinc-900"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Resources dropdown */}
          <div className="relative" ref={resourcesRef} onBlur={handleResourcesBlur}>
            <button
              onClick={() => setResourcesOpen((o) => !o)}
              aria-expanded={resourcesOpen}
              aria-haspopup="true"
              className="flex items-center gap-1 hover:opacity-70 transition-opacity"
            >
              Resources
              <ChevronDown
                size={14}
                className={`transition-transform duration-200 ${resourcesOpen ? "rotate-180" : ""}`}
              />
            </button>
            {resourcesOpen && (
              <div
                role="menu"
                aria-label="Resources"
                className="absolute left-0 top-full mt-2 w-44 overflow-hidden rounded-xl border border-zinc-200 bg-white shadow-lg"
              >
                <a
                  href="/reports"
                  role="menuitem"
                  onClick={() => setResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Reports
                </a>
                <a
                  href="/good-profits"
                  role="menuitem"
                  onClick={() => setResourcesOpen(false)}
                  className="block px-4 py-3 text-sm font-medium text-zinc-700 hover:bg-zinc-50"
                >
                  Good Profit
                </a>
              </div>
            )}
          </div>
        </div>

        {/* ── Right side: CTA + hamburger ─────────────────────────── */}
        <div className="flex items-center gap-3">
          <a
            href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
            className="inline-flex min-h-[44px] items-center gap-2 whitespace-nowrap rounded-full bg-[#123A5A] px-3 text-xs font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors duration-200 hover:bg-[#D87A24] active:bg-[#b8620e] sm:px-6 sm:text-sm"
          >
            Get Started
          </a>
          {/* Hamburger — always rendered, shown at all sizes */}
          <MobileNav />
        </div>
      </div>
    </nav>
  );
}
