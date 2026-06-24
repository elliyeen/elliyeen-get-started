"use client";

import { useState, useEffect, useCallback, useRef } from "react";

// ── Types ─────────────────────────────────────────────────────────────────────

type VendorInterest = {
  id: string;
  name: string;
  category: string;
};

interface EmailCaptureSubmission {
  name: string;
  email: string;
  interests: string[]; // vendor IDs
  capturedAt: string;  // ISO 8601
  source: "exit-intent" | "manual";
}

interface EmailCaptureProps {
  /** Context vendor shown in headline (e.g., the one the user was just viewing) */
  vendorName?: string;
  vendorInstagram?: string;
  /** External control: show the modal immediately */
  show?: boolean;
  /** Called when the modal closes */
  onClose?: () => void;
  /** Called with the submission when the user submits */
  onSubmit?: (submission: EmailCaptureSubmission) => void;
}

// ── Vendor interest options ────────────────────────────────────────────────────

const VENDOR_OPTIONS: VendorInterest[] = [
  { id: "wild-thread-co",   name: "Wild Thread Co.",    category: "Fiber Arts" },
  { id: "knot-and-bloom",   name: "Knot & Bloom",       category: "Fiber Arts" },
  { id: "studio-sage",      name: "Studio Sage",         category: "Painting"   },
  { id: "ink-and-wash",     name: "Ink & Wash",          category: "Painting"   },
  { id: "clay-and-co",      name: "Clay & Co.",          category: "Ceramics"   },
  { id: "kiln-collective",  name: "Kiln Collective",     category: "Ceramics"   },
];

const IG_EVENT_URL = "https://www.instagram.com/openhousecreativefest/";

// ── CSV helper ────────────────────────────────────────────────────────────────
// Returns a CSV row string for a single submission.
// In a real implementation, you'd POST this to an API or accumulate in memory.

function toCSVRow(s: EmailCaptureSubmission): string {
  const escape = (v: string) => `"${v.replace(/"/g, '""')}"`;
  return [
    escape(s.name),
    escape(s.email),
    escape(s.interests.join("|")),
    escape(s.capturedAt),
    escape(s.source),
  ].join(",");
}

// ── In-memory submission log (session-scoped, not persisted) ─────────────────
// Accumulates submissions for CSV export without using localStorage.

const submissionLog: EmailCaptureSubmission[] = [];

function logSubmission(s: EmailCaptureSubmission) {
  submissionLog.push(s);
  // Output CSV row to console so it can be captured by a server/observer
  console.log("[EmailCapture CSV]", toCSVRow(s));
}

// ── Modal component ───────────────────────────────────────────────────────────

export default function EmailCapture({
  vendorName,
  vendorInstagram,
  show: externalShow,
  onClose,
  onSubmit,
}: EmailCaptureProps) {
  const [visible, setVisible] = useState(false);
  const [step, setStep] = useState<"form" | "thanks">("form");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [interests, setInterests] = useState<string[]>([]);
  const [nameError, setNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const triggered = useRef(false);

  // Exit intent: trigger when mouse leaves the viewport from the top
  useEffect(() => {
    if (externalShow !== undefined) return; // externally controlled — skip exit intent

    function handleMouseOut(e: MouseEvent) {
      if (triggered.current) return;
      // Mouse left through the top of the viewport
      if (e.clientY <= 0) {
        triggered.current = true;
        setVisible(true);
      }
    }

    // Small delay so the modal doesn't fire immediately on page load
    const timer = setTimeout(() => {
      document.addEventListener("mouseout", handleMouseOut);
    }, 3000);

    return () => {
      clearTimeout(timer);
      document.removeEventListener("mouseout", handleMouseOut);
    };
  }, [externalShow]);

  // External control
  useEffect(() => {
    if (externalShow !== undefined) setVisible(externalShow);
  }, [externalShow]);

  const close = useCallback(() => {
    setVisible(false);
    setStep("form");
    onClose?.();
  }, [onClose]);

  function toggleInterest(id: string) {
    setInterests((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const nameOk = name.trim().length > 0;
    const emailOk = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
    setNameError(!nameOk);
    setEmailError(!emailOk);
    if (!nameOk || !emailOk) return;

    const submission: EmailCaptureSubmission = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      interests,
      capturedAt: new Date().toISOString(),
      source: externalShow !== undefined ? "manual" : "exit-intent",
    };

    logSubmission(submission);
    onSubmit?.(submission);
    setStep("thanks");
  }

  if (!visible) return null;

  return (
    <>
      {/* Backdrop */}
      <div
        className="fixed inset-0 z-50 flex items-end sm:items-center justify-center p-0 sm:p-4"
        style={{ background: "rgba(10,10,10,0.85)", backdropFilter: "blur(6px)" }}
        onClick={(e) => { if (e.target === e.currentTarget) close(); }}
      >
        {/* Card */}
        <div
          className="w-full sm:max-w-md rounded-t-3xl sm:rounded-3xl overflow-hidden"
          style={{ background: "#fff", boxShadow: "0 32px 96px rgba(0,0,0,0.4)" }}
        >
          {step === "form" ? (
            <>
              {/* Header */}
              <div
                className="px-6 pt-6 pb-5"
                style={{ background: "linear-gradient(135deg, #111 0%, #1a1a2e 100%)" }}
              >
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <p className="text-xs font-bold tracking-widest uppercase mb-1"
                      style={{ color: "#d4e833" }}>
                      Don&apos;t lose track
                    </p>
                    <h2 className="text-white font-bold text-xl leading-snug">
                      {vendorName
                        ? `Want to follow ${vendorName} after the fest?`
                        : "Want updates from your favorite makers?"}
                    </h2>
                    {vendorInstagram && (
                      <p className="text-gray-400 text-sm mt-1">
                        We&apos;ll send you @{vendorInstagram}&apos;s details so you can keep creating.
                      </p>
                    )}
                  </div>
                  <button
                    onClick={close}
                    className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-gray-500 hover:text-white hover:bg-white/10 transition-colors mt-0.5"
                    aria-label="Close"
                  >
                    ✕
                  </button>
                </div>
              </div>

              {/* Form */}
              <form onSubmit={handleSubmit} className="px-6 py-5 flex flex-col gap-4">
                {/* Name */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Your name
                  </label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => { setName(e.target.value); setNameError(false); }}
                    placeholder="First name is fine"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                    style={{
                      borderColor: nameError ? "#dc2626" : "#e5e7eb",
                      background: nameError ? "#fff5f5" : "#f9fafb",
                    }}
                  />
                  {nameError && (
                    <p className="text-xs text-red-500 mt-1">Please enter your name.</p>
                  )}
                </div>

                {/* Email */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1.5">
                    Email address
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => { setEmail(e.target.value); setEmailError(false); }}
                    placeholder="you@example.com"
                    className="w-full px-4 py-3 rounded-xl border text-sm outline-none transition-colors"
                    style={{
                      borderColor: emailError ? "#dc2626" : "#e5e7eb",
                      background: emailError ? "#fff5f5" : "#f9fafb",
                    }}
                  />
                  {emailError && (
                    <p className="text-xs text-red-500 mt-1">Please enter a valid email.</p>
                  )}
                </div>

                {/* Vendor interest checkboxes */}
                <div>
                  <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wider mb-2">
                    Which makers are you interested in? <span className="text-gray-400 normal-case font-normal">(optional)</span>
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {VENDOR_OPTIONS.map((v) => {
                      const checked = interests.includes(v.id);
                      return (
                        <button
                          type="button"
                          key={v.id}
                          onClick={() => toggleInterest(v.id)}
                          className="flex items-start gap-2 px-3 py-2.5 rounded-xl border text-left transition-all"
                          style={{
                            borderColor: checked ? "#e8339a" : "#e5e7eb",
                            background: checked ? "#fce8f4" : "#f9fafb",
                          }}
                        >
                          <div
                            className="w-4 h-4 rounded flex-shrink-0 mt-0.5 flex items-center justify-center text-xs"
                            style={{
                              background: checked ? "#e8339a" : "transparent",
                              border: `1.5px solid ${checked ? "#e8339a" : "#d1d5db"}`,
                            }}
                          >
                            {checked && <span className="text-white text-xs">✓</span>}
                          </div>
                          <div>
                            <p className="text-xs font-semibold text-[#111] leading-tight">{v.name}</p>
                            <p className="text-xs text-gray-400">{v.category}</p>
                          </div>
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Submit */}
                <button
                  type="submit"
                  className="w-full py-3.5 rounded-xl font-bold text-sm text-[#111] transition-transform hover:scale-[1.02] active:scale-95"
                  style={{ background: "#d4e833" }}
                >
                  Send me maker updates →
                </button>

                <p className="text-xs text-center text-gray-400">
                  No spam. Just post-event maker follow-ups and next edition announcements.
                </p>
              </form>
            </>
          ) : (
            /* ── Thank you state ─────────────────────────────────── */
            <div className="px-6 py-10 flex flex-col items-center text-center gap-5">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#e8339a]/10 text-2xl font-black text-[#e8339a]">OK</div>
              <div>
                <h2 className="text-2xl font-bold text-[#111] mb-2">You&apos;re in.</h2>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We&apos;ll send you a recap after the fest with links to every maker you selected.
                  {interests.length > 0 && (
                    <> You picked {interests.length} maker{interests.length !== 1 ? "s" : ""} — we&apos;ll make sure you can find them.</>
                  )}
                </p>
              </div>

              {/* Social follow prompt */}
              <div className="w-full rounded-2xl overflow-hidden" style={{ background: "#111" }}>
                <div className="px-5 py-4">
                  <p className="text-xs font-bold tracking-wider uppercase mb-1" style={{ color: "#33d4b0" }}>
                    One more thing
                  </p>
                  <p className="text-white text-sm font-semibold mb-3">
                    Follow us for real-time updates at the fest
                  </p>
                  <a
                    href={IG_EVENT_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full text-center py-2.5 rounded-xl font-semibold text-sm transition-transform hover:scale-[1.02]"
                    style={{ background: "#e8339a", color: "#fff" }}
                  >
                    Follow @openhousecreativefest →
                  </a>
                </div>
              </div>

              {vendorInstagram && (
                <a
                  href={`https://instagram.com/${vendorInstagram}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-[#e8339a] hover:underline"
                >
                  Also follow @{vendorInstagram} →
                </a>
              )}

              <button
                onClick={close}
                className="text-sm text-gray-400 hover:text-gray-600 transition-colors"
              >
                Close
              </button>
            </div>
          )}
        </div>
      </div>
    </>
  );
}

// ── Export submission log accessor (for parent components to read collected data) ──

export function getSubmissions(): EmailCaptureSubmission[] {
  return [...submissionLog];
}

export function getSubmissionsCSV(): string {
  const header = "name,email,interests,capturedAt,source";
  const rows = submissionLog.map(toCSVRow);
  return [header, ...rows].join("\n");
}

export type { EmailCaptureSubmission };
