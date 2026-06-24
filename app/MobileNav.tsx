"use client";

import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";

const links = [
  { label: "How It Works", href: "#assessment" },
  { label: "Case Studies", href: "#cases" },
  { label: "Reports", href: "/reports" },
  { label: "Pricing", href: "#pricing" },
  { label: "AI Advisor", href: "#advisor" },
];

export default function MobileNav() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <div className="md:hidden">
      <button
        onClick={() => setOpen(!open)}
        aria-label={open ? "Close menu" : "Open menu"}
        aria-expanded={open}
        className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-700 hover:border-zinc-500"
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
            className="absolute right-4 top-4 flex h-9 w-9 items-center justify-center rounded-full border border-zinc-300 text-zinc-700"
          >
            <X size={18} />
          </button>

          <nav className="flex flex-col divide-y divide-zinc-100">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="py-5 text-xl font-semibold text-zinc-800 hover:text-black"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="mt-auto flex flex-col gap-3">
            <a
              href="#contact"
              onClick={() => setOpen(false)}
              className="rounded-xl border border-zinc-300 px-6 py-4 text-center text-sm font-medium text-zinc-800"
            >
              Contact sales
            </a>
            <a
              href="#book"
              onClick={() => setOpen(false)}
              className="rounded-xl bg-[#1B5EA8] px-6 py-4 text-center text-sm font-bold text-white hover:bg-[#164d8e]"
            >
              Get your free site diagnosis
            </a>
          </div>
        </div>
      )}
    </div>
  );
}
