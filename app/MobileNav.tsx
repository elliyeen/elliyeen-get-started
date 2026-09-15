"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Menu, X, ChevronRight, ChevronDown } from "lucide-react";

const links = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/#cases" },
];

const sportsGroups = [
  {
    label: "NFL",
    href: "/sports/nfl",
    items: [
      { label: "Overview", href: "/sports/nfl" },
      { label: "Teams", href: "/sports/nfl/teams" },
      { label: "Game Analysis", href: "/sports/nfl/analysis" },
    ],
  },
  {
    label: "College Football",
    href: "/sports/college-football",
    items: [
      { label: "Overview", href: "/sports/college-football" },
      { label: "Teams", href: "/sports/college-football/teams" },
      { label: "Game Analysis", href: "/sports/college-football/analysis" },
    ],
  },
];

const resources = [
  { label: "Reports", href: "/reports" },
  { label: "Good Profit", href: "/good-profits" },
];

export default function MobileNav() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [openGroup, setOpenGroup] = useState<string | null>(null);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) close();
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open]);

  function close() {
    setOpen(false);
    setOpenGroup(null);
    document.getElementById("mobile-nav-trigger")?.focus();
  }

  function toggleGroup(label: string) {
    setOpenGroup((current) => (current === label ? null : label));
  }

  return (
    <div>
      <button
        id="mobile-nav-trigger"
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        aria-controls="mobile-nav-panel"
        className="flex h-11 w-11 items-center justify-center text-black hover:opacity-60 transition-opacity"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
          id="mobile-nav-panel"
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
          className="flex flex-col px-6 pb-10"
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            paddingTop: "96px",
            backgroundColor: "#f7f4ee",
            overflowY: "auto",
            // Force own compositing layer so backdrop-filter on nav
            // cannot bleed above this overlay on Android Chrome
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        >
          <button
            onClick={close}
            aria-label="Close menu"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 text-black"
          >
            <X size={18} />
          </button>

          <nav className="flex flex-col divide-y divide-zinc-100">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={pathname === link.href ? "page" : undefined}
                className="py-5 text-xl font-semibold text-black hover:text-black"
              >
                {link.label}
              </a>
            ))}

            {/* Sports section */}
            <div>
              <a
                href="/sports"
                onClick={close}
                aria-current={pathname === "/sports" ? "page" : undefined}
                className="block py-5 text-xl font-semibold text-black hover:text-black"
              >
                Sports
              </a>
              <div className="flex flex-col pb-3 gap-1">
                {sportsGroups.map((group) => {
                  const panelId = `mobile-sports-${group.label.replace(/\s+/g, "-").toLowerCase()}`;
                  const isGroupOpen = openGroup === group.label;
                  return (
                    <div key={group.label}>
                      <button
                        type="button"
                        onClick={() => toggleGroup(group.label)}
                        aria-expanded={isGroupOpen}
                        aria-controls={panelId}
                        className="flex min-h-[44px] w-full items-center justify-between gap-2 py-2 text-left text-base font-semibold text-black focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123A5A]"
                      >
                        <span className="flex items-center gap-2">
                          <ChevronRight size={14} className="text-zinc-400" />
                          {group.label}
                        </span>
                        <ChevronDown
                          size={16}
                          className={`text-zinc-400 transition-transform duration-200 ${isGroupOpen ? "rotate-180" : ""}`}
                        />
                      </button>
                      {isGroupOpen && (
                        <div id={panelId} className="flex flex-col gap-0.5 pb-2 pl-7">
                          {group.items.map((item) => (
                            <a
                              key={item.href}
                              href={item.href}
                              onClick={close}
                              aria-current={pathname === item.href ? "page" : undefined}
                              className="flex min-h-[44px] items-center py-2 text-base text-zinc-700"
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
            </div>

            {/* Resources section */}
            <div>
              <p className="pt-5 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                Resources
              </p>
              <div className="flex flex-col pb-2 gap-0.5">
                {resources.map((child) => (
                  <a
                    key={child.href}
                    href={child.href}
                    onClick={close}
                    aria-current={pathname === child.href ? "page" : undefined}
                    className="flex items-center gap-2 py-2 text-lg font-semibold text-black"
                  >
                    <ChevronRight size={14} className="text-zinc-400" />
                    {child.label}
                  </a>
                ))}
              </div>
            </div>
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
              onClick={close}
              className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#123A5A] px-9 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors duration-200 hover:bg-[#D87A24] active:bg-[#b8620e]"
            >
              Get Started
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
