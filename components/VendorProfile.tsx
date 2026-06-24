"use client";

import Link from "next/link";
import { type VendorData, SAMPLE_VENDOR, ALL_VENDORS } from "./vendorData";

export type { VendorData };
export { SAMPLE_VENDOR, ALL_VENDORS };

// ── Constants ─────────────────────────────────────────────────────────────────

const PASSPORT_URL = "https://buy.stripe.com/bJeeVf6PEahV4UK1Ym18c04";
const PARTIFUL_URL = "https://partiful.com/e/k0QjJ5md2vLicq3B3s4n";
const IG_URL = "https://www.instagram.com/openhousecreativefest/";

// ── Sub-components ────────────────────────────────────────────────────────────

function SlotIndicator({ available, total }: { available: number; total: number }) {
  const filled = total - available;
  const urgency = available <= 2 ? "critical" : available / total < 0.5 ? "low" : "open";

  return (
    <div className="rounded-2xl border p-5"
      style={{
        borderColor: urgency === "critical" ? "#fca5a5" : urgency === "low" ? "#fde68a" : "#bbf7d0",
        background: urgency === "critical" ? "#fff5f5" : urgency === "low" ? "#fffbeb" : "#f0fdf4",
      }}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-sm font-semibold"
          style={{ color: urgency === "critical" ? "#dc2626" : urgency === "low" ? "#d97706" : "#16a34a" }}>
          {urgency === "critical"
            ? `Only ${available} spot${available !== 1 ? "s" : ""} left`
            : urgency === "low"
            ? `${available} spots remaining`
            : `${available} spots open`}
        </span>
        <span className="text-xs text-gray-500">{filled}/{total} filled</span>
      </div>
      {/* Slot dots */}
      <div className="flex gap-1.5 flex-wrap">
        {Array.from({ length: total }).map((_, i) => (
          <div
            key={i}
            className="w-4 h-4 rounded-full border"
            style={{
              background: i < filled ? (urgency === "critical" ? "#dc2626" : urgency === "low" ? "#d97706" : "#16a34a") : "transparent",
              borderColor: urgency === "critical" ? "#dc2626" : urgency === "low" ? "#d97706" : "#16a34a",
              opacity: i < filled ? 1 : 0.3,
            }}
          />
        ))}
      </div>
    </div>
  );
}

function RelatedVendorCard({ vendor }: { vendor: VendorData }) {
  return (
    <Link
      href={`/vendors/${vendor.id}`}
      className="flex items-center gap-3 p-3 rounded-xl border border-gray-100 hover:border-[#e8339a] hover:bg-pink-50 transition-all group"
    >
      <span className="text-2xl">{vendor.emoji}</span>
      <div className="flex-1 min-w-0">
        <p className="text-xs font-bold tracking-wider uppercase text-[#e8339a] mb-0.5">{vendor.category}</p>
        <p className="text-sm font-semibold text-[#111] truncate group-hover:text-[#e8339a] transition-colors">{vendor.name}</p>
        <p className="text-xs text-gray-500 truncate">{vendor.activity}</p>
      </div>
      <span className="text-gray-300 group-hover:text-[#e8339a] transition-colors">→</span>
    </Link>
  );
}

// ── Main component ────────────────────────────────────────────────────────────

interface VendorProfileProps {
  vendor?: VendorData;
}

export default function VendorProfile({ vendor = SAMPLE_VENDOR }: VendorProfileProps) {
  const related = ALL_VENDORS.filter((v) => vendor.relatedIds.includes(v.id)).slice(0, 3);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-gray-400 mb-8">
        <Link href="/vendors" className="hover:text-[#e8339a] transition-colors">Makers</Link>
        <span>/</span>
        <span className="text-[#111]">{vendor.name}</span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* ── Left column ────────────────────────────────────────── */}
        <div className="lg:col-span-2 flex flex-col gap-8">
          {/* Hero */}
          <div className="rounded-2xl overflow-hidden aspect-[16/7] flex items-center justify-center text-8xl"
            style={{ background: "linear-gradient(135deg, #f0fce0 0%, #e4f9f5 50%, #fce8f4 100%)" }}>
            {vendor.emoji}
          </div>

          {/* Category + name */}
          <div>
            <p className="text-xs font-bold tracking-widest uppercase text-[#e8339a] mb-2">
              {vendor.category} · Open House Creative Fest
            </p>
            <h1 className="text-3xl sm:text-4xl font-bold text-[#111] leading-tight">
              {vendor.name}
            </h1>
            <p className="text-gray-500 mt-1 text-base">with {vendor.founder}</p>
          </div>

          {/* Founder story */}
          <div>
            <h2 className="text-sm font-bold tracking-widest uppercase text-gray-400 mb-3">
              The Maker
            </h2>
            <p className="text-gray-700 text-base leading-relaxed">{vendor.founderBio}</p>
          </div>

          {/* What you'll make */}
          <div className="rounded-2xl p-6" style={{ background: "#f8f4ff", border: "1px solid #e9d5ff" }}>
            <h2 className="text-sm font-bold tracking-widest uppercase text-purple-500 mb-3">
              What You&apos;ll Make
            </h2>
            <h3 className="text-xl font-bold text-[#111] mb-3">{vendor.activity}</h3>
            <p className="text-gray-700 leading-relaxed">{vendor.activityDetail}</p>
            <div className="flex flex-wrap gap-4 mt-4">
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-base">⏱</span>
                <span>{vendor.duration}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-base">✅</span>
                <span>{vendor.skillLevel}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600">
                <span className="text-base">🎟</span>
                <span>Included with Creative Passport</span>
              </div>
            </div>
          </div>
        </div>

        {/* ── Right column (sidebar) ──────────────────────────────── */}
        <div className="flex flex-col gap-5">
          {/* Availability */}
          <SlotIndicator available={vendor.availableSlots} total={vendor.totalSlots} />

          {/* Passport CTA */}
          <div className="rounded-2xl overflow-hidden"
            style={{ background: "linear-gradient(160deg, #111 0%, #1a1a2e 100%)" }}>
            <div className="p-5">
              <p className="text-xs font-bold tracking-widest uppercase text-[#d4e833] mb-1">
                Creative Passport
              </p>
              <p className="text-white font-bold text-lg leading-snug mb-1">
                Unlock {vendor.name} + every maker at the fest
              </p>
              <p className="text-gray-400 text-sm mb-4">
                8 guided experiences · $6.25 each · normally $12–20 solo
              </p>
              <a
                href={PASSPORT_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-3 rounded-full font-bold text-sm text-[#111] transition-transform hover:scale-105 active:scale-95"
                style={{ background: "#d4e833" }}
              >
                Get Passport — $50 →
              </a>
              <a
                href={PARTIFUL_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="block w-full text-center py-2 mt-2 text-sm text-gray-500 hover:text-gray-300 transition-colors"
              >
                RSVP free on Partiful
              </a>
            </div>
          </div>

          {/* Social */}
          <a
            href={`https://instagram.com/${vendor.instagram}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-[#e8339a] hover:bg-pink-50 transition-all group"
          >
            <span className="text-2xl">📸</span>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Follow the maker</p>
              <p className="text-sm font-semibold text-[#111] group-hover:text-[#e8339a] transition-colors">
                @{vendor.instagram}
              </p>
            </div>
            <span className="ml-auto text-gray-300 group-hover:text-[#e8339a] transition-colors">→</span>
          </a>

          {/* Event social */}
          <a
            href={IG_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 p-4 rounded-2xl border border-gray-100 hover:border-gray-300 transition-all group"
          >
            <span className="text-2xl">🏠</span>
            <div>
              <p className="text-xs text-gray-400 mb-0.5">Follow the fest</p>
              <p className="text-sm font-semibold text-[#111]">@openhousecreativefest</p>
            </div>
          </a>

          {/* Related vendors */}
          {related.length > 0 && (
            <div>
              <h2 className="text-xs font-bold tracking-widest uppercase text-gray-400 mb-3">
                Also at the fest
              </h2>
              <div className="flex flex-col gap-2">
                {related.map((v) => (
                  <RelatedVendorCard key={v.id} vendor={v} />
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
