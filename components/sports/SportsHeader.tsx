"use client";

import { useEffect, useRef, useState } from "react";
import { usePathname } from "next/navigation";
import { ChevronDown, Menu, X } from "lucide-react";

interface NavGroup {
  label: string;
  href: string;
  items: { label: string; href: string }[];
}

const NAV_GROUPS: NavGroup[] = [
  {
    label: "NFL",
    href: "/sports/nfl",
    items: [
      { label: "Games", href: "/sports/nfl" },
      { label: "Analysis", href: "/sports/nfl/analysis" },
      { label: "Teams", href: "/sports/nfl/teams" },
    ],
  },
  {
    label: "College Football",
    href: "/sports/college-football",
    items: [
      { label: "Games", href: "/sports/college-football" },
      { label: "Analysis", href: "/sports/college-football/analysis" },
      { label: "Teams", href: "/sports/college-football/teams" },
    ],
  },
  {
    label: "Game Intelligence",
    href: "/sports/game-intelligence",
    items: [
      { label: "Latest Game Cards", href: "/sports/game-intelligence#latest-game-cards" },
      { label: "Methodology", href: "/sports/game-intelligence#methodology" },
    ],
  },
];

function isActive(pathname: string | null, href: string): boolean {
  if (!pathname) return false;
  const cleanHref = href.split("#")[0];
  if (cleanHref === "/sports") return pathname === "/sports";
  return pathname === cleanHref || pathname.startsWith(cleanHref + "/");
}

export default function SportsHeader() {
  const pathname = usePathname();
  const [openGroup, setOpenGroup] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [mobileGroup, setMobileGroup] = useState<string | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
        setOpenGroup(null);
      }
    }
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setOpenGroup(null);
        setMobileOpen(false);
        document.getElementById("sports-nav-trigger")?.focus();
      }
    }
    document.addEventListener("mousedown", handleClick);
    document.addEventListener("keydown", handleKey);
    return () => {
      document.removeEventListener("mousedown", handleClick);
      document.removeEventListener("keydown", handleKey);
    };
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [mobileOpen]);

  function handleGroupBlur(e: React.FocusEvent<HTMLDivElement>) {
    if (!e.currentTarget.contains(e.relatedTarget as Node)) {
      setOpenGroup(null);
    }
  }

  function closeMobile() {
    setMobileOpen(false);
    setMobileGroup(null);
    document.getElementById("sports-nav-trigger")?.focus();
  }

  return (
    <header
      className="sticky top-0 z-50 w-full"
      style={{ background: "var(--esa-nav-navy)" }}
    >
      <div className="mx-auto flex h-[60px] max-w-7xl items-center justify-between px-4 sm:h-[72px] sm:px-6">
        <a
          href="/sports"
          className="text-sm font-bold tracking-[0.18em] text-white"
        >
          ELLIYEEN
        </a>

        {/* Desktop nav */}
        <nav
          aria-label="Sports navigation"
          className="hidden items-center gap-7 text-sm font-medium text-white md:flex"
        >
          {NAV_GROUPS.map((group) => {
            const active = isActive(pathname, group.href);
            const open = openGroup === group.label;
            return (
              <div
                key={group.label}
                className="relative"
                ref={open ? containerRef : undefined}
                onBlur={handleGroupBlur}
              >
                <button
                  onClick={() => setOpenGroup((current) => (current === group.label ? null : group.label))}
                  aria-expanded={open}
                  aria-haspopup="true"
                  aria-current={active ? "page" : undefined}
                  className={`relative flex items-center gap-1 py-2 transition-opacity hover:opacity-80 ${
                    active ? "after:absolute after:-bottom-[1px] after:left-0 after:h-px after:w-full after:bg-white" : ""
                  }`}
                >
                  {group.label}
                  <ChevronDown
                    size={13}
                    className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`}
                  />
                </button>
                {open && (
                  <div
                    role="menu"
                    aria-label={group.label}
                    className="absolute left-0 top-full mt-2 min-w-[180px] border border-white/15 bg-[var(--esa-nav-navy)] py-1"
                  >
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        role="menuitem"
                        onClick={() => setOpenGroup(null)}
                        className="block px-4 py-2 text-sm text-white/90 hover:bg-white/10 hover:text-white"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </nav>

        {/* Mobile trigger */}
        <button
          id="sports-nav-trigger"
          onClick={() => setMobileOpen((o) => !o)}
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          aria-controls="sports-mobile-panel"
          className="flex h-11 w-11 items-center justify-center text-white md:hidden"
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {mobileOpen && (
        <div
          id="sports-mobile-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Sports navigation menu"
          className="flex flex-col overflow-y-auto px-4 pb-8 md:hidden"
          style={{
            position: "fixed",
            inset: 0,
            top: "60px",
            zIndex: 9999,
            background: "var(--esa-nav-navy)",
          }}
        >

          {NAV_GROUPS.map((group) => {
            const active = isActive(pathname, group.href);
            const open = mobileGroup === group.label;
            const panelId = `sports-mobile-${group.label.replace(/\s+/g, "-").toLowerCase()}`;
            return (
              <div key={group.label} className="border-b border-white/10">
                <button
                  onClick={() => setMobileGroup((current) => (current === group.label ? null : group.label))}
                  aria-expanded={open}
                  aria-controls={panelId}
                  aria-current={active ? "page" : undefined}
                  className="flex min-h-[44px] w-full items-center justify-between py-4 text-lg font-semibold text-white"
                >
                  {group.label}
                  <ChevronDown size={16} className={`transition-transform duration-200 ${open ? "rotate-180" : ""}`} />
                </button>
                {open && (
                  <div id={panelId} className="flex flex-col gap-1 pb-3">
                    <a
                      href={group.href}
                      onClick={closeMobile}
                      className="flex min-h-[44px] items-center pl-4 text-base text-white/85"
                    >
                      Overview
                    </a>
                    {group.items.map((item) => (
                      <a
                        key={item.href}
                        href={item.href}
                        onClick={closeMobile}
                        className="flex min-h-[44px] items-center pl-4 text-base text-white/85"
                      >
                        {item.label}
                      </a>
                    ))}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </header>
  );
}
