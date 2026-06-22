import type { Metadata } from "next";
import React from "react";
import MobileNav from "./MobileNav";
import { ArrowRight, BarChart3, Bot, CheckCircle2, LineChart, Search, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Elliyeen Research — Website Audit & Revenue Diagnosis",
  description:
    "We audit every layer of your website — copy, trust, UX, SEO, conversion, and AI search readiness — using 18 specialist frameworks. Then we tell you exactly what to fix, in what order, with copy rewrites included.",
  alternates: { canonical: "https://elliyeen-get-started.pages.dev" },
};

const process = [
  {
    icon: Users,
    title: "Customer Intelligence",
    timeline: "Days 1–3",
    body: "We map your buyer's trigger moment, dominant emotion, and the exact language they use when they feel the problem you solve. Delivered as a written customer brief.",
  },
  {
    icon: Search,
    title: "Friction Diagnosis",
    timeline: "Days 4–7",
    body: "We run 18 specialist frameworks across your copy, UX, trust signals, SEO, accessibility, and conversion architecture. Every gap documented with evidence.",
  },
  {
    icon: Sparkles,
    title: "Prioritized Roadmap",
    timeline: "Days 8–10",
    body: "We rank every finding by revenue impact. You receive copy rewrites, UX recommendations, and a week-by-week action plan — not a PDF that sits in a folder.",
  },
  {
    icon: LineChart,
    title: "Implementation Support",
    timeline: "Ongoing",
    body: "We review your changes, run a second-pass audit, and measure what moved. Growth is a system — we stay until the system is working.",
  },
];

const cases = [
  {
    tag: "Home Care",
    title: "Savannah Personal Care",
    body: "The FAQ had Wix placeholder questions. The hero didn't speak to the fear the adult daughter feels at 11pm making this decision. We rebuilt the copy, structure, and local SEO around the real buyer moment.",
    metrics: ["FAQ rebuilt from actual buyer questions", "Hero copy matched to buyer's emotional state", "Local SEO structured for discovery"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Home caregiver assisting an elderly patient indoors",
  },
  {
    tag: "Financial Services",
    title: "Wealth Management Firm",
    body: "Prospects were arriving informed but not converting. We identified three objections the site never answered and restructured the intake flow to address each one before the CTA.",
    metrics: ["3 silent objections dissolved", "Onboarding flow restructured", "Response commitment made explicit"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Financial advisor reviewing documents with a client at a desk",
  },
  {
    tag: "Education / Sports",
    title: "College Golf Program",
    body: "Recruiting pages described the program. They didn't speak to the recruit's fear of choosing the wrong school. We rebuilt the narrative around the actual decision a 17-year-old athlete makes.",
    metrics: ["Copy rebuilt around the recruit's decision", "Performance data structured for clarity", "Scholarship positioning made explicit"],
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "College golfer lining up a putt on a green during a tournament",
  },
];

const auditDimensions = [
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

const pricingTiers = [
  { tier: "Diagnostic Call", price: "Free", desc: "20-minute review. Three specific findings. No pitch." },
  { tier: "Full Audit", price: "From $1,500", desc: "All 18 frameworks. Full report. Copy rewrites included." },
  { tier: "Audit + Implementation", price: "Custom", desc: "We audit and execute. Scoped to your site and team." },
];

export default function GetStartedPage() {
  return (
    <>
      {/* Fix 8 — Skip to main content for keyboard / screen reader users */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white focus:translate-y-0 transition-transform"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-[#f7f4ee] text-[#111111]">

        {/* Fix 4 — Nav labels match destinations. Fix 5 — MobileNav handles hamburger. */}
        <nav aria-label="Main navigation" className="sticky top-0 z-50 bg-[#f7f4ee]/90 backdrop-blur-md">
          <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
            <div className="text-sm font-bold tracking-[0.22em]">ELLIYEEN</div>

            <div className="hidden items-center gap-9 text-sm font-medium text-zinc-600 md:flex">
              <a href="#assessment" className="hover:text-black">How It Works</a>
              <a href="#cases"      className="hover:text-black">Case Studies</a>
              <a href="#pricing"    className="hover:text-black">Pricing</a>
              <a href="#advisor"    className="hover:text-black">AI Advisor</a>
            </div>

            <div className="flex items-center gap-2">
              <a href="#contact" className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-400 md:block">
                Contact sales
              </a>
              <a href="#lead-magnet" className="rounded-full bg-[#111111] px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">
                Free diagnosis
              </a>
              {/* Fix 5 — Mobile hamburger */}
              <MobileNav />
            </div>
          </div>
        </nav>

        {/* Fix 2 — Committed headline. Fix 6 — No stock avatars. Fix 10 — Methodology card replaces fake revenue number. */}
        <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-20">
          <div>
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
              For founders and marketing leaders
            </p>
            <h1 className="mt-4 font-serif text-5xl leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              Your website is losing revenue.
              <br />
              <span className="text-[#1B5EA8]">We'll show you exactly&nbsp;where.</span>
            </h1>

            <p className="mt-6 text-base leading-7 text-zinc-700 sm:text-lg sm:leading-8">
              We audit every layer of your website — copy, trust, UX, SEO, conversion, and AI search readiness — using 18 specialist frameworks.
            </p>
            <p className="mt-3 text-base leading-7 text-zinc-700 sm:text-lg sm:leading-8">
              Then we tell you exactly what to fix, in what order, with the copy rewrites included.
            </p>

            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <a href="#lead-magnet" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-black px-6 text-sm font-bold text-white shadow-xl shadow-black/10 hover:bg-zinc-800">
                Get your free site diagnosis
              </a>
              <a href="#assessment" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold hover:bg-white">
                See how it works <ArrowRight size={16} />
              </a>
            </div>

            {/* Fix 6 — Replaced stock avatars with honest proof signal */}
            <div className="mt-7 rounded-xl border border-zinc-200 bg-white/70 px-5 py-4 text-sm text-zinc-600">
              <span className="font-semibold text-zinc-900">18 specialist frameworks.</span>{" "}
              One prioritized roadmap. Copy rewrites included.
            </div>
          </div>

          {/* Fix 10 — Audit methodology card replaces the fake $2.4M revenue number */}
          <div className="relative hidden sm:block">
            <div className="absolute -right-8 -top-10 hidden h-48 w-48 rounded-full bg-[#1B5EA8]/10 blur-3xl md:block" />
            <div className="relative rotate-[-2deg] rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-2xl shadow-zinc-900/10 sm:p-5">
              <div className="rounded-[1.4rem] border border-zinc-100 bg-gradient-to-br from-white to-[#eef3fb] p-5 sm:p-8">
                <div className="mb-5 text-xs font-bold tracking-[0.18em] text-zinc-500">
                  ELLIYEEN AUDIT FRAMEWORK
                </div>
                <p className="text-sm font-semibold text-zinc-500">What gets diagnosed</p>
                <div className="mt-5 grid gap-3 text-sm">
                  {auditDimensions.map((dim) => (
                    <div key={dim} className="flex items-center gap-3 text-zinc-700">
                      <CheckCircle2 size={15} className="shrink-0 text-[#1B5EA8]" />
                      {dim}
                    </div>
                  ))}
                </div>
                <div className="mt-6 rounded-xl bg-[#111111] px-4 py-3 text-center text-xs font-bold tracking-wide text-white">
                  18 frameworks · 1 clear roadmap
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* AI Advisor */}
        <section id="advisor" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-zinc-200 bg-white/80 p-5 shadow-xl shadow-zinc-900/5 backdrop-blur sm:p-6 md:p-10">
            <div className="mb-6 text-center sm:mb-8">
              <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl">Get answers. Get clarity. Get growing.</h2>
              <p className="mt-3 text-sm text-zinc-600 sm:text-base">Ask Elliyeen AI anything about your business, your website, or your growth.</p>
            </div>

            <div className="grid overflow-hidden rounded-3xl border border-zinc-200 bg-white md:grid-cols-[300px_1fr] lg:grid-cols-[360px_1fr]">
              <aside className="border-b border-zinc-200 p-5 md:border-b-0 md:border-r">
                <h3 className="mb-4 text-sm font-bold">Start a conversation</h3>
                <div className="space-y-2">
                  {[
                    "Why aren't we growing?",
                    "How much revenue are we losing?",
                    "Can you audit our website?",
                    "Why are competitors winning?",
                    "How do we improve customer experience?",
                    "What should we do first?",
                  ].map((prompt, index) => (
                    <button key={prompt} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm ${index === 0 ? "bg-[#eef3fb] text-[#1B5EA8]" : "hover:bg-zinc-50"}`}>
                      <span>{prompt}</span>
                      {index === 0 && <ArrowRight size={15} />}
                    </button>
                  ))}
                </div>
              </aside>

              <div className="p-5 sm:p-6">
                <div className="mb-4 inline-flex rounded-2xl bg-zinc-100 px-4 py-3 text-sm">Why aren't we growing?</div>
                <div className="flex gap-3 sm:gap-4">
                  <div className="mt-1 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-black text-sm font-black text-white">E</div>
                  <div className="rounded-2xl bg-[#eef3fb] p-4 text-sm leading-7 text-zinc-800 sm:p-6">
                    <p className="font-semibold">Based on the way most organizations present themselves, growth is often limited by friction points that prevent visitors from becoming customers.</p>
                    <ul className="mt-4 list-disc space-y-2 pl-5">
                      <li>Visitors cannot quickly understand who you help and how.</li>
                      <li>Your value is not clearly communicated above the fold.</li>
                      <li>There is no clear next step guiding visitors to take action.</li>
                      <li>Trust signals are limited, creating hesitation.</li>
                      <li>SEO opportunities are missed that competitors capture.</li>
                    </ul>
                    <p className="mt-4">Would you like me to show the specific opportunities and recommendations?</p>
                  </div>
                </div>
                <div className="mt-6 flex rounded-2xl border border-zinc-200 bg-white p-2">
                  <label htmlFor="advisor-input" className="sr-only">Ask a follow-up question</label>
                  <input id="advisor-input" className="flex-1 bg-transparent px-3 text-sm outline-none sm:px-4" placeholder="Ask a follow-up question…" />
                  <button className="rounded-xl bg-[#1B5EA8] p-3 text-white" aria-label="Send message">
                    <ArrowRight size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fix 4 — Process section with deliverables and timelines */}
        <section id="assessment" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Our process</p>
            <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl">From insight to impact.</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {process.map((item, index) => (
              <div key={item.title} className="relative rounded-3xl border border-zinc-200 bg-white p-5 text-center shadow-sm sm:p-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm sm:h-16 sm:w-16">
                  <item.icon size={20} />
                </div>
                <div className="mx-auto mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#1B5EA8] text-xs font-bold text-white">{index + 1}</div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 sm:text-[11px]">{item.timeline}</p>
                <h3 className="mt-2 text-sm font-bold sm:text-base">{item.title}</h3>
                <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">{item.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* Fix 3 — Dead "View Case Study" links removed. Fix 7 — Descriptive alt text. Better case copy. */}
        <section id="cases" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 sm:p-6 md:p-8">
            <div className="mb-6">
              <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">Real work. Real outcomes.</h2>
              <p className="mt-1 text-sm text-zinc-500">Full case studies with numbers available upon request.</p>
            </div>
            <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
              {cases.map((item) => (
                <article key={item.title} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                  {/* Fix 7 — Descriptive alt text */}
                  <img src={item.image} alt={item.imageAlt} className="h-44 w-full object-cover" />
                  <div className="p-5 sm:p-6">
                    <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{item.tag}</p>
                    <h3 className="mt-2 text-lg font-bold sm:text-xl">{item.title}</h3>
                    <p className="mt-3 text-sm leading-6 text-zinc-600">{item.body}</p>
                    <div className="mt-5 grid gap-2">
                      {item.metrics.map((metric) => (
                        <div key={metric} className="flex items-start gap-2 text-sm text-zinc-600">
                          <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#1B5EA8]" />
                          {metric}
                        </div>
                      ))}
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Fix 1 — Founder section */}
        <section id="founder" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
            <div className="grid items-start gap-10 md:grid-cols-[260px_1fr] md:gap-16">
              <div className="flex flex-col items-center text-center md:items-start md:text-left">
                <div className="h-36 w-36 overflow-hidden rounded-full border-4 border-zinc-100 shadow-lg bg-zinc-100">
                  <img
                    src="https://media.licdn.com/dms/image/v2/D4E03AQGnYLKGJxJlbQ/profile-displayphoto-shrink_200_200/B4EZPpGfbeHsAY-/0/1734799482195?e=1756944000&v=beta&t=Eg2d7VRGKHJqNM1sJzEoJrUuYpRl-l5EaNyQpJ8vZhk"
                    alt="Abbas Abdullah, founder of Elliyeen Research"
                    className="h-full w-full object-cover"
                  />
                </div>
                <h3 className="mt-5 text-xl font-bold">Abbas Abdullah</h3>
                <p className="mt-1 text-sm text-zinc-500">Founder, Elliyeen Research</p>
                <a
                  href="https://www.linkedin.com/in/abbasabdullah/"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Abbas Abdullah on LinkedIn (opens in new tab)"
                  className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-4 py-2 text-xs font-semibold text-zinc-600 transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
                    <rect x="2" y="9" width="4" height="12" />
                    <circle cx="4" cy="4" r="2" />
                  </svg>
                  LinkedIn
                </a>
              </div>

              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Why Elliyeen exists</p>
                <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] md:text-4xl">
                  Most audits tell you what's wrong. They don't tell you what to do about&nbsp;it.
                </h2>
                <div className="mt-6 space-y-4 text-base leading-7 text-zinc-600">
                  <p>
                    I spent years watching businesses invest in websites that looked right but didn't convert. The audits they received were long, generic, and produced no specific action. Designers blamed copy. Copywriters blamed design. No one owned the result.
                  </p>
                  <p>
                    Elliyeen was built to close that gap. Eighteen specialist frameworks — from Claude Hopkins' specificity test to WCAG accessibility to AI search readiness — run simultaneously on a single site. The output is not a report. It is a prioritized roadmap with copy rewrites, UX recommendations, and a week-by-week action plan.
                  </p>
                  <p>
                    The businesses I work with don't need more opinions. They need one clear answer: <em>here is exactly what to fix, and here is the order to fix it in.</em>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Fix 9 — Email capture / Lead magnet */}
        <section id="lead-magnet" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white">
            <div className="grid md:grid-cols-2">
              <div className="p-8 md:p-12">
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Free resource</p>
                <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] md:text-4xl">
                  The 18-Point Website Audit
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-600">
                  The complete framework we use to diagnose why websites don't convert — and what to do about it. Covers copy, trust, UX, SEO, AEO, accessibility, conversion, and growth systems.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "The 7 unanswered objections that kill most conversions",
                    "The 5 trust signals missing from 90% of service business sites",
                    "How to write a hero headline that passes the 3-second test",
                    "The AI search (AEO) checklist most agencies don't know exists",
                  ].map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-zinc-700">
                      <CheckCircle2 size={16} className="mt-0.5 shrink-0 text-[#1B5EA8]" />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex items-center bg-[#f7f4ee] p-8 md:p-12">
                {/* Wire this form to Resend / ConvertKit / Mailchimp before launch */}
                <form action="#" method="POST" className="w-full space-y-4" aria-label="Download the 18-Point Website Audit PDF">
                  <div>
                    <label htmlFor="audit-name" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                      Your name
                    </label>
                    <input
                      id="audit-name"
                      name="name"
                      type="text"
                      autoComplete="given-name"
                      required
                      placeholder="First name"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                    />
                  </div>
                  <div>
                    <label htmlFor="audit-email" className="mb-1.5 block text-sm font-semibold text-zinc-700">
                      Work email
                    </label>
                    <input
                      id="audit-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@company.com"
                      className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full rounded-xl bg-[#111111] px-6 py-4 text-sm font-bold text-white hover:bg-zinc-800"
                  >
                    Send me the free audit framework
                  </button>
                  <p className="text-center text-xs text-zinc-400">
                    No spam. One email with your PDF. Unsubscribe anytime.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* Pricing section — fixes the broken "Pricing" nav link */}
        <section id="pricing" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Pricing</p>
                <h2 className="mt-4 font-serif text-4xl tracking-[-0.04em]">
                  Every engagement starts with a free 20-minute&nbsp;diagnostic.
                </h2>
                <p className="mt-5 text-base leading-7 text-zinc-600">
                  We look at your site for 20 minutes and tell you the three highest-priority changes — whether you work with us or not. No commitment. No sales call disguised as a consultation.
                </p>
                <a
                  id="contact"
                  href="mailto:hello@elliyeen.com"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-black px-6 py-4 text-sm font-bold text-white hover:bg-zinc-800"
                >
                  Book your free diagnostic <ArrowRight size={16} />
                </a>
              </div>
              <div className="grid gap-4">
                {pricingTiers.map((item) => (
                  <div key={item.tier} className="rounded-2xl border border-zinc-200 bg-[#f7f4ee] p-6">
                    <div className="flex items-center justify-between">
                      <p className="font-semibold text-zinc-900">{item.tier}</p>
                      <p className="text-sm font-bold text-[#1B5EA8]">{item.price}</p>
                    </div>
                    <p className="mt-2 text-sm text-zinc-600">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* CTA block — risk reversal, specific promise */}
        <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
          <div className="overflow-hidden rounded-[2rem] bg-[#111111] p-8 text-white shadow-2xl shadow-zinc-900/10 sm:p-10 md:p-16">
            <div className="grid gap-10 md:grid-cols-2">
              <div>
                <h2 className="font-serif text-3xl leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">
                  Most sites are losing 60–80% of qualified visitors before they take&nbsp;action.
                </h2>
                <p className="mt-5 text-sm leading-7 text-zinc-300 sm:text-base">
                  Want to know exactly where yours is losing them? Your first diagnostic is free. We look at your site for 20 minutes and give you three specific findings — no pitch attached.
                </p>
                <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                  <a href="mailto:hello@elliyeen.com" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-black hover:bg-zinc-100">
                    Book free diagnostic
                  </a>
                  <a href="#lead-magnet" className="inline-flex min-h-[52px] items-center justify-center gap-2 px-6 text-sm font-bold text-zinc-300 hover:text-white">
                    Get the free audit framework <ArrowRight size={16} />
                  </a>
                </div>
              </div>
              <div className="space-y-5 sm:space-y-6">
                {([
                  [Bot,       "18 Specialist Frameworks",     "Hopkins, Halbert, Schwartz, Apple HIG, WCAG, McKinsey Digital — run simultaneously on your site."],
                  [Users,     "One Person Who Owns the Result", "Not an agency hand-off. One senior practitioner responsible for every finding."],
                  [BarChart3, "Copy Rewrites Included",        "Every finding comes with a specific fix — the actual replacement copy, not a recommendation."],
                ] as const).map(([Icon, title, body]) => (
                  <div key={title} className="flex gap-4">
                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10">
                      <Icon size={20} />
                    </div>
                    <div>
                      <h3 className="font-bold">{title}</h3>
                      <p className="mt-1 text-sm leading-6 text-zinc-300">{body}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Footer — all links point to real anchors */}
        <footer className="border-t border-zinc-100 bg-white">
          <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
            <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
              <div>
                <div className="text-sm font-bold tracking-[0.22em] text-zinc-900">ELLIYEEN</div>
                <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">
                  18-framework website audits for founders and marketing leaders who need to know exactly why their site isn't converting.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Product</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="#assessment"  className="hover:text-black">How It Works</a></li>
                    <li><a href="#advisor"      className="hover:text-black">AI Advisor</a></li>
                    <li><a href="#pricing"      className="hover:text-black">Pricing</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Services</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="#lead-magnet"  className="hover:text-black">Free Audit PDF</a></li>
                    <li><a href="#cases"         className="hover:text-black">Case Studies</a></li>
                    <li><a href="mailto:hello@elliyeen.com" className="hover:text-black">Full Audit</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Company</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="#founder"      className="hover:text-black">About</a></li>
                    <li><a href="#cases"         className="hover:text-black">Case Studies</a></li>
                    <li><a href="mailto:hello@elliyeen.com" className="hover:text-black">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Resources</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="#lead-magnet"  className="hover:text-black">18-Point Audit</a></li>
                    <li><a href="#advisor"       className="hover:text-black">AI Advisor</a></li>
                    <li><a href="mailto:hello@elliyeen.com" className="hover:text-black">Get in touch</a></li>
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
