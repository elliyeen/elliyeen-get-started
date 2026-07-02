"use client";

import { useState, useEffect } from "react";
import { Menu, X, ChevronRight } from "lucide-react";

const links = [
  { label: "How It Works", href: "/how-it-works" },
  { label: "Industries", href: "/#cases" },
  { label: "Resources", href: null, children: [
    { label: "Reports", href: "/reports" },
    { label: "Good Profit", href: "/good-profits" },
  ]},
  { label: "Pricing", href: "/#pricing" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  useEffect(() => {
    function handleKey(e: KeyboardEvent) {
      if (e.key === "Escape" && open) setOpen(false);
    }
    document.addEventListener("keydown", handleKey);
    return () => document.removeEventListener("keydown", handleKey);
  }, [open]);

  return (
    <div>
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-11 w-11 items-center justify-center text-black hover:opacity-60 transition-opacity"
      >
        {open ? <X size={18} /> : <Menu size={18} />}
      </button>

      {open && (
        <div
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
            // Force own compositing layer so backdrop-filter on nav
            // cannot bleed above this overlay on Android Chrome
            transform: "translateZ(0)",
            WebkitTransform: "translateZ(0)",
          }}
        >
          <button
            onClick={() => setOpen(false)}
            aria-label="Close menu"
            className="absolute right-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-zinc-300 text-black"
          >
            <X size={18} />
          </button>

          <nav className="flex flex-col divide-y divide-zinc-100">
            {links.map((link) =>
              link.children ? (
                <div key={link.label}>
                  <p className="pt-5 pb-2 text-xs font-bold uppercase tracking-[0.2em] text-zinc-400">
                    {link.label}
                  </p>
                  <div className="flex flex-col pb-2 gap-0.5">
                    {link.children.map((child) => (
                      <a
                        key={child.href}
                        href={child.href}
                        onClick={() => setOpen(false)}
                        className="flex items-center gap-2 py-2 text-lg font-semibold text-black"
                      >
                        <ChevronRight size={14} className="text-zinc-400" />
                        {child.label}
                      </a>
                    ))}
                  </div>
                </div>
              ) : (
                <a
                  key={link.href!}
                  href={link.href!}
                  onClick={() => setOpen(false)}
                  className="py-5 text-xl font-semibold text-black hover:text-black"
                >
                  {link.label}
                </a>
              )
            )}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
              onClick={() => setOpen(false)}
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
