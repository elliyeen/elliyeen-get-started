import type { Metadata } from "next";

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
        <div className="mx-auto max-w-3xl px-4 py-20 sm:px-6">

          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Our process</p>
          <h1 className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
            Find the gap. Write the fix. Ship it.
          </h1>
          <p className="mt-6 text-base leading-7 text-zinc-600">
            Four steps. One engagement. Every deliverable in writing — the diagnosis, the copy, the roadmap, and the measurement.
          </p>

          <div className="mt-14 space-y-10">
            {steps.map((step) => (
              <div key={step.number} className="border-t border-zinc-200 pt-10">
                <div className="flex items-start gap-6">
                  <span className="shrink-0 font-serif text-4xl font-bold text-zinc-200">
                    {step.number}
                  </span>
                  <div>
                    <p className="text-[10px] font-bold uppercase tracking-widest text-zinc-400">
                      {step.type}
                    </p>
                    <h2 className="mt-1 text-lg font-bold text-zinc-900">{step.title}</h2>
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
            <h2 className="mt-3 font-serif text-2xl tracking-[-0.03em]">
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
              className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#1B5EA8] px-5 py-3 text-sm font-bold text-white hover:bg-[#164d8e]"
            >
              Fix it →
            </a>
          </div>

        </div>
      </main>
    </>
  );
}
