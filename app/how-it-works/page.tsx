import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SiteNav from "../SiteNav";

export const metadata: Metadata = {
  title: "How It Works · Elliyeen Research — Website Audit Process",
  description:
    "Elliyeen audits every layer of your website using 18 specialist frameworks — copy, trust, UX, SEO, conversion, and AI search readiness. Here is exactly how the process works, step by step.",
  keywords: [
    "website audit process",
    "how website audit works",
    "customer intelligence",
    "friction diagnosis",
    "implementation support",
    "revenue diagnosis",
    "AEO audit",
    "conversion audit",
  ],
  alternates: { canonical: "https://www.elliyeen.com/how-it-works" },
};

const howToSchema = {
  "@context": "https://schema.org",
  "@type": "HowTo",
  name: "How an Elliyeen Website Audit Works",
  description:
    "A step-by-step website audit using 18 specialist frameworks across copy, UX, trust, SEO, conversion, and AI search readiness — with copy rewrites and a prioritized revenue roadmap included.",
  step: [
    {
      "@type": "HowToStep",
      name: "Customer Intelligence",
      text: "We map your buyer's trigger moment, dominant emotion, and the exact language they use when they feel the problem you solve. Delivered as a written customer brief.",
    },
    {
      "@type": "HowToStep",
      name: "Friction Diagnosis",
      text: "We run 18 specialist frameworks across your copy, UX, trust signals, SEO, accessibility, and conversion architecture. Every gap documented with evidence.",
    },
    {
      "@type": "HowToStep",
      name: "Prioritized Roadmap",
      text: "We rank every finding by revenue impact. You receive copy rewrites, UX recommendations, and a week-by-week action plan — not a PDF that sits in a folder.",
    },
    {
      "@type": "HowToStep",
      name: "Implementation Support",
      text: "We review your changes, run a second-pass audit, and measure what moved. Every implementation tracked against a baseline.",
    },
  ],
};

const steps = [
  {
    number: "01",
    title: "Know your buyer's exact language before writing a word.",
    type: "Customer Intelligence",
    body: "We map the trigger moment, dominant emotion, and the precise phrasing buyers use when they feel the problem you solve.",
  },
  {
    number: "02",
    title: "Surface every revenue gap across 18 frameworks in a single session.",
    type: "Friction Diagnosis",
    body: "Copy, UX, trust signals, SEO, accessibility, and conversion architecture — audited simultaneously, every finding documented with evidence.",
  },
  {
    number: "03",
    title: "Receive the replacement copy, ranked by revenue impact, ready to ship.",
    type: "Prioritized Roadmap",
    body: "Not a list of recommendations. The actual rewritten headline, the fixed CTA, the resolved objection — ranked by what moves revenue fastest.",
  },
  {
    number: "04",
    title: "Track every change against a baseline so you know exactly what moved.",
    type: "Implementation Support",
    body: "We review your implementations, run a second-pass audit, and measure what changed — so results are visible, not assumed.",
  },
];

const frameworks = [
  "Positioning & Differentiation",
  "Copy & Emotional Resonance",
  "UX & Cognitive Load",
  "Visual Design & Trust",
  "Conversion Architecture",
  "SEO & Content Authority",
  "AI Search Readiness (AEO)",
  "Accessibility (WCAG 2.2)",
  "Growth Systems & Lead Capture",
];

export default function HowItWorksPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(howToSchema) }}
      />
      <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
        <SiteNav />
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Our process</p>
          <h1 className="mt-4 font-serif t-display">
            Find the gap. Write the fix. Ship it.
          </h1>
          <p className="mt-6 t-body text-zinc-600">
            Four steps. One engagement. Every deliverable in writing — the diagnosis, the copy, the roadmap, and the measurement.
          </p>

          <div className="mt-14 space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="border-t border-zinc-200 pt-10">
                <div className="flex items-start gap-6">
                  <span className="shrink-0 font-serif t-title font-bold text-zinc-200">
                    {step.number}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {step.type}
                    </p>
                    <h2 className="mt-1 t-card-title font-bold text-zinc-900">{step.title}</h2>
                    <p className="mt-3 text-sm leading-7 text-zinc-600">{step.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
              18 frameworks
            </p>
            <h2 className="mt-3 font-serif t-heading">
              Every layer of your site, examined.
            </h2>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {frameworks.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-zinc-700">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B5EA8]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-10 rounded-2xl border border-zinc-200 bg-white p-8">
            <p className="font-semibold text-zinc-900">Ready to see what&apos;s costing you revenue?</p>
            <p className="mt-2 text-sm leading-6 text-zinc-600">
              Full audit starts from $1,500. Copy rewrites included.
            </p>
            <a
              href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
              className="mt-4 inline-flex h-[52px] min-w-[190px] items-center justify-center gap-2 rounded-xl bg-[#123A5A] px-8 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] hover:bg-[#0e2d47]"
            >
              Get Started <ArrowRight size={15} />
            </a>
          </div>

        </div>

        <footer className="border-t border-zinc-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm font-bold tracking-[0.22em] text-zinc-900">ELLIYEEN</div>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Product</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/how-it-works" className="hover:text-black">How It Works</a></li>
                    <li><a href="/#cases"        className="hover:text-black">See the Work</a></li>
                    <li><a href="/#pricing"      className="hover:text-black">Pricing</a></li>
                    <li><a href="/faq"           className="hover:text-black">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Services</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/case-studies"  className="hover:text-black">Industries</a></li>
                    <li><a href="/#pricing"      className="hover:text-black">Full Audit</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Company</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/#founder"      className="hover:text-black">About</a></li>
                    <li><a href="/#cases"        className="hover:text-black">Industries</a></li>
                    <li><a href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it." className="hover:text-black">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Reports</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/reports"                              className="hover:text-black">All Reports</a></li>
                    <li><a href="/reports/milano-audit.html"            className="hover:text-black">Milano Family Pizza</a></li>
                    <li><a href="/reports/wealth-management-audit.html" className="hover:text-black">Wealth Management</a></li>
                    <li><a href="/spcs-report"                          className="hover:text-black">Savannah Personal Care</a></li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="mt-10 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-400">© {new Date().getFullYear()} Elliyeen Research. All rights reserved.</p>
              <div className="flex flex-wrap gap-x-6 gap-y-2">
                <a href="/privacy"       className="text-sm text-zinc-400 hover:text-black">Privacy Policy</a>
                <a href="/terms"         className="text-sm text-zinc-400 hover:text-black">Terms</a>
                <a href="/accessibility" className="text-sm text-zinc-400 hover:text-black">Accessibility</a>
                <a href="/do-not-sell"   className="text-sm text-zinc-400 hover:text-black">Do Not Sell My Data</a>
                <a href="/sitemap-page"  className="text-sm text-zinc-400 hover:text-black">Sitemap</a>
              </div>
              <a
                href="https://www.linkedin.com/in/abbasabdullah/"
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Abbas Abdullah on LinkedIn (opens in new tab)"
                className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                  <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                  <rect x="2" y="9" width="4" height="12" />
                  <circle cx="4" cy="4" r="2" />
                </svg>
              </a>
            </div>
          </div>
        </footer>
      </main>
    </>
  );
}
