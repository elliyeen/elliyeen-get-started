"use client";

// ── Types ─────────────────────────────────────────────────────────────────────

interface QRLandingVendor {
  name: string;
  founder: string;
  activity: string;
  instagram: string;
  availableSlots: number;
}

interface QRLandingProps {
  vendor?: QRLandingVendor;
}

// ── Default vendor (shown when no vendor prop is passed) ──────────────────────

const DEFAULT_VENDOR: QRLandingVendor = {
  name: "Studio Sage",
  founder: "Lily Ramirez",
  activity: "Paint a glazed ceramic bud vase — she provides the bisqueware, you provide the vision.",
  instagram: "studiosagela",
  availableSlots: 6,
};

// ── Constants ─────────────────────────────────────────────────────────────────

const PASSPORT_URL = "https://buy.stripe.com/bJeeVf6PEahV4UK1Ym18c04";
const IG_EVENT_URL = "https://www.instagram.com/openhousecreativefest/";

// ── Main component ────────────────────────────────────────────────────────────
// Mobile-first. Designed to be the QR code destination replacing Instagram redirects.
// Loads fast: no images, no heavy dependencies.

export default function QRLanding({ vendor = DEFAULT_VENDOR }: QRLandingProps) {
  const urgencyText =
    vendor.availableSlots <= 2
      ? `Only ${vendor.availableSlots} spot${vendor.availableSlots !== 1 ? "s" : ""} left`
      : vendor.availableSlots <= 5
      ? `${vendor.availableSlots} spots remaining`
      : `${vendor.availableSlots} spots open`;

  const urgencyColor =
    vendor.availableSlots <= 2
      ? "#dc2626"
      : vendor.availableSlots <= 5
      ? "#d97706"
      : "#16a34a";

  return (
    <div
      className="min-h-screen flex flex-col"
      style={{ background: "linear-gradient(160deg, #0d0d0d 0%, #111827 100%)" }}
    >
      {/* ── Top brand strip ─────────────────────────────────────── */}
      <div className="flex items-center justify-between px-5 py-4">
        <span
          className="text-xs font-bold tracking-widest uppercase"
          style={{ color: "#d4e833" }}
        >
          Open House Creative Fest
        </span>
        <span className="text-xs text-gray-500">Jun 27–28 · Del Amo</span>
      </div>

      {/* ── Hero ──────────────────────────────────────────────────── */}
      <div className="flex-1 flex flex-col items-center justify-center px-6 pb-6 gap-6 text-center">
        {/* Vendor name initial */}
        <div
          className="w-24 h-24 rounded-3xl flex items-center justify-center text-4xl font-black tracking-tighter"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.1)", color: "#e8339a" }}
        >
          {vendor.name.charAt(0)}
        </div>

        {/* Vendor name + maker */}
        <div>
          <p className="text-xs font-bold tracking-widest uppercase mb-2" style={{ color: "#e8339a" }}>
            You scanned {vendor.name}&apos;s QR code
          </p>
          <h1 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
            with {vendor.founder}
          </h1>
        </div>

        {/* Activity teaser */}
        <div
          className="rounded-2xl px-5 py-4 max-w-sm w-full text-left"
          style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <p className="text-xs font-bold tracking-wider uppercase mb-2" style={{ color: "#33d4b0" }}>
            What you&apos;ll make
          </p>
          <p className="text-white text-sm leading-relaxed">{vendor.activity}</p>
        </div>

        {/* Availability indicator */}
        <div className="flex items-center gap-2">
          <span
            className="w-2 h-2 rounded-full animate-pulse"
            style={{ background: urgencyColor }}
          />
          <span className="text-sm font-semibold" style={{ color: urgencyColor }}>
            {urgencyText}
          </span>
          <span className="text-gray-600 text-sm">at this booth</span>
        </div>

        {/* Event info */}
        <div className="flex items-center gap-4 text-xs text-gray-500">
          <span>June 27–28, 2026</span>
          <span>Del Amo Fashion Center</span>
        </div>
      </div>

      {/* ── CTA section ──────────────────────────────────────────── */}
      <div className="px-5 pb-8 flex flex-col gap-3 max-w-sm mx-auto w-full">
        {/* Value reframe */}
        <p className="text-center text-xs text-gray-500">
          Creative Passport · 8 guided experiences · $6.25 each
        </p>

        {/* Primary CTA */}
        <a
          href={PASSPORT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-4 rounded-2xl font-bold text-base text-[#111] transition-transform active:scale-95"
          style={{ background: "#d4e833" }}
        >
          Get Your Creative Passport — $50 →
        </a>

        {/* Divider */}
        <div className="flex items-center gap-3">
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
          <span className="text-xs text-gray-600">or</span>
          <div className="flex-1 h-px" style={{ background: "rgba(255,255,255,0.08)" }} />
        </div>

        {/* Secondary CTA */}
        <a
          href={`https://instagram.com/${vendor.instagram}`}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full text-center py-3 rounded-2xl font-semibold text-sm border transition-colors"
          style={{
            color: "#e8339a",
            borderColor: "rgba(232,51,154,0.3)",
            background: "rgba(232,51,154,0.05)",
          }}
        >
          Follow @{vendor.instagram} on Instagram
        </a>

        {/* Event Instagram */}
        <a
          href={IG_EVENT_URL}
          target="_blank"
          rel="noopener noreferrer"
          className="text-center text-xs text-gray-600 hover:text-gray-400 transition-colors"
        >
          Follow @openhousecreativefest for updates
        </a>
      </div>

      {/* ── Bottom brand ─────────────────────────────────────────── */}
      <div
        className="px-5 py-3 text-center border-t"
        style={{ borderColor: "rgba(255,255,255,0.05)" }}
      >
        <p className="text-xs text-gray-600">
          Don&apos;t just shop. Create. · openhousecreativefest.com
        </p>
      </div>
    </div>
  );
}
