"use client";

import { useState } from "react";
import Link from "next/link";

// ── Vendor data ──────────────────────────────────────────────────────────────

const VENDORS = [
  {
    id: "wild-thread-co",
    name: "Wild Thread Co.",
    category: "Fiber Arts",
    founder: "Maya Chen",
    activity: "Weave a mini wall hanging with raw cotton and natural dye — no experience needed.",
    availableSlots: 8,
    totalSlots: 12,
    instagram: "wildthreadco",
  },
  {
    id: "knot-and-bloom",
    name: "Knot & Bloom",
    category: "Fiber Arts",
    founder: "Sara Okafor",
    activity: "Knot a cotton macramé plant hanger and take it home the same day.",
    availableSlots: 3,
    totalSlots: 10,
    instagram: "knotandbloom",
  },
  {
    id: "studio-sage",
    name: "Studio Sage",
    category: "Painting",
    founder: "Lily Ramirez",
    activity: "Paint a glazed ceramic bud vase — she provides the bisqueware, you provide the vision.",
    availableSlots: 6,
    totalSlots: 12,
    instagram: "studiosagela",
  },
  {
    id: "ink-and-wash",
    name: "Ink & Wash",
    category: "Painting",
    founder: "James Park",
    activity: "Create a botanical watercolor print using pressed flowers from the LA hills.",
    availableSlots: 10,
    totalSlots: 15,
    instagram: "inkandwashstudio",
  },
  {
    id: "clay-and-co",
    name: "Clay & Co.",
    category: "Ceramics",
    founder: "Rosa Martinez",
    activity: "Hand-build a pinch pot using air-dry clay and custom texture stamps.",
    availableSlots: 5,
    totalSlots: 10,
    instagram: "clayandco_la",
  },
  {
    id: "kiln-collective",
    name: "Kiln Collective",
    category: "Ceramics",
    founder: "Darius Webb",
    activity: "Cut and carve a decorative slab tile — fired and mailed to you within 3 weeks.",
    availableSlots: 2,
    totalSlots: 8,
    instagram: "kilncollective",
  },
];

const CATEGORIES = ["All", "Fiber Arts", "Painting", "Ceramics"];

const PASSPORT_URL = "https://buy.stripe.com/bJeeVf6PEahV4UK1Ym18c04";

// ── Availability badge ────────────────────────────────────────────────────────

function AvailabilityBadge({ available, total }: { available: number; total: number }) {
  const pct = available / total;
  if (available <= 2) {
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-red-100 text-red-600">
        {available} spot{available !== 1 ? "s" : ""} left
      </span>
    );
  }
  if (pct < 0.5) {
    return (
      <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-amber-100 text-amber-700">
        {available} spots left
      </span>
    );
  }
  return (
    <span className="text-xs font-semibold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-700">
      {available} spots open
    </span>
  );
}

// ── Vendor card ───────────────────────────────────────────────────────────────

function VendorCard({ vendor }: { vendor: typeof VENDORS[0] }) {
  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="group flex flex-col bg-white rounded-2xl border border-gray-100 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 overflow-hidden"
    >
      {/* Color header with category initial */}
      <div className="h-32 flex items-center justify-center"
        style={{ background: "linear-gradient(135deg, #f0fce0 0%, #e4f9f5 100%)" }}>
        <span className="text-5xl font-black tracking-tighter" style={{ color: "rgba(232,51,154,0.3)" }}>{vendor.category.charAt(0)}</span>
      </div>

      <div className="flex flex-col flex-1 p-5 gap-3">
        {/* Category label */}
        <span className="text-xs font-bold tracking-widest uppercase text-[#e8339a]">
          {vendor.category}
        </span>

        {/* Vendor name + founder */}
        <div>
          <h3 className="font-semibold text-[#111] text-lg leading-snug group-hover:text-[#e8339a] transition-colors">
            {vendor.name}
          </h3>
          <p className="text-sm text-gray-500 mt-0.5">with {vendor.founder}</p>
        </div>

        {/* Activity description */}
        <p className="text-sm text-gray-700 leading-relaxed flex-1">
          {vendor.activity}
        </p>

        {/* Footer row */}
        <div className="flex items-center justify-between pt-2 border-t border-gray-50">
          <AvailabilityBadge available={vendor.availableSlots} total={vendor.totalSlots} />
          <span className="text-xs text-gray-400 group-hover:text-[#e8339a] transition-colors font-medium">
            View maker →
          </span>
        </div>
      </div>
    </Link>
  );
}

// ── Passport CTA banner ───────────────────────────────────────────────────────

function PassportCTA({ position }: { position: "top" | "bottom" }) {
  return (
    <div className="rounded-2xl overflow-hidden mb-10"
      style={{ background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)" }}>
      <div className="px-6 py-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          {position === "top" ? (
            <>
              <p className="text-xs font-bold tracking-widest uppercase text-[#d4e833] mb-1">
                Creative Passport
              </p>
              <p className="text-white font-semibold text-xl leading-snug">
                Unlock every maker. One ticket.
              </p>
              <p className="text-gray-400 text-sm mt-1">
                8 guided hands-on experiences · normally $12–20 each · yours for $50
              </p>
            </>
          ) : (
            <>
              <p className="text-xs font-bold tracking-widest uppercase text-[#33d4b0] mb-1">
                Ready to create?
              </p>
              <p className="text-white font-semibold text-xl leading-snug">
                Get your Creative Passport today
              </p>
              <p className="text-gray-400 text-sm mt-1">
                Early bird price ends soon · limited availability
              </p>
            </>
          )}
        </div>
        <a
          href={PASSPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 px-6 py-3 rounded-full font-bold text-sm text-[#111] transition-transform hover:scale-105 active:scale-95"
          style={{ background: "#d4e833" }}
        >
          Get Passport — $50 →
        </a>
      </div>
    </div>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

export default function VendorDirectory() {
  const [activeCategory, setActiveCategory] = useState("All");

  const filtered = activeCategory === "All"
    ? VENDORS
    : VENDORS.filter((v) => v.category === activeCategory);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Page header */}
      <div className="mb-8">
        <p className="text-xs font-bold tracking-widest uppercase text-[#e8339a] mb-2">
          Open House Creative Fest · June 27–28
        </p>
        <h1 className="text-3xl sm:text-4xl font-bold text-[#111] leading-tight">
          Meet the makers.
        </h1>
        <p className="text-gray-600 mt-2 text-base max-w-xl">
          {VENDORS.length} local makers. One Creative Passport. Everything you&apos;ll make is listed right here.
        </p>
      </div>

      {/* Passport CTA — top */}
      <PassportCTA position="top" />

      {/* Category filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border transition-all ${
              activeCategory === cat
                ? "bg-[#e8339a] text-white border-[#e8339a]"
                : "bg-white text-gray-600 border-gray-200 hover:border-[#e8339a] hover:text-[#e8339a]"
            }`}
          >
            {cat}
          </button>
        ))}
        <span className="ml-auto self-center text-xs text-gray-400 font-medium">
          {filtered.length} maker{filtered.length !== 1 ? "s" : ""}
        </span>
      </div>

      {/* Vendor grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 mb-12">
        {filtered.map((vendor) => (
          <VendorCard key={vendor.id} vendor={vendor} />
        ))}
      </div>

      {/* Passport CTA — bottom */}
      <PassportCTA position="bottom" />
    </div>
  );
}
