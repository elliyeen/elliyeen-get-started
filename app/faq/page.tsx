import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "FAQ · Elliyeen Research",
  description: "Common questions about Elliyeen website audits — how long they take, what's included, how they differ from agency recommendations, and when you'll see results.",
  alternates: { canonical: "https://www.elliyeen.com/faq" },
};

const faqs = [
  {
    q: "How long does the audit take?",
    a: "Four hours or less. Customer intelligence, 18-framework diagnosis, prioritized roadmap, and copy rewrites are completed in a single session — not spread across days or weeks.",
  },
  {
    q: "How is this different from an agency giving us recommendations?",
    a: "Agencies give you a list. We give you the replacement copy. Every finding in our report includes the specific fix — the actual headline, the rewritten CTA, the exact objection response — ready to implement. You don't need to hire another writer to act on what we find.",
  },
  {
    q: "Can't we audit our own site?",
    a: "You can. The problem is you read it as the person who built it — you see what you meant to say, not what a stranger sees for the first time. We bring 18 frameworks that most in-house teams don't run, applied simultaneously across every layer of your site. The findings are things you wouldn't catch because you're too close to it.",
  },
  {
    q: "How long until we see results from the changes?",
    a: "The roadmap is ranked by speed of impact, not complexity. Most clients implement the first change within a week of receiving the report. Changes to hero copy and CTA structure tend to show movement within two to four weeks. We stay available to review your implementations and measure what moved.",
  },
  {
    q: "What does a website audit from Elliyeen include?",
    a: "A full audit covers 18 specialist frameworks across positioning, copy, UX, trust signals, SEO, accessibility, conversion architecture, and AI search readiness (AEO). Every gap is documented with evidence. The deliverable includes copy rewrites, UX recommendations, and a week-by-week action plan ranked by revenue impact.",
  },
  {
    q: "How much does a website audit cost?",
    a: "A full audit starts from $1,500 and includes all 18 frameworks, a full report, and copy rewrites. Audit + implementation is scoped custom to your site and team.",
  },
  {
    q: "Do you work with any type of business?",
    a: "We work best with founder-led businesses, local service companies, and professional practices where the website is a primary trust-building and conversion surface. If most of your revenue is tied to your website's ability to persuade a visitor, we can help.",
  },
  {
    q: "What happens after the audit is delivered?",
    a: "You receive a full written report with copy rewrites included. We stay available to review your implementations and run a second-pass audit to measure what moved. Ongoing support is available as a scoped engagement.",
  },
];

export default function FAQPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Common questions</p>
        <h1 className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
          Before you decide.
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-600">
          Everything you need to know about how an Elliyeen audit works, what it costs, and what to expect.
        </p>

        <div className="mt-12 space-y-8">
          {faqs.map(({ q, a }) => (
            <div key={q} className="border-t border-zinc-200 pt-8">
              <p className="font-semibold text-zinc-900">{q}</p>
              <p className="mt-3 text-sm leading-7 text-zinc-600">{a}</p>
            </div>
          ))}
        </div>

        <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8">
          <p className="font-semibold text-zinc-900">Still have a question?</p>
          <p className="mt-2 text-sm leading-6 text-zinc-600">Email us directly — we respond to every message.</p>
          <a
            href="mailto:abdullah@elliyeen.com?subject=Question%20about%20Elliyeen%20audit"
            className="mt-4 inline-flex items-center gap-2 rounded-xl bg-[#1B5EA8] px-5 py-3 text-sm font-bold text-white hover:bg-[#164d8e]"
          >
            Ask a question →
          </a>
        </div>
      </div>
    </main>
  );
}
