import type { Metadata } from "next";
import SiteNav from "./SiteNav";
import ScrollReveal from "./ScrollReveal";
import CasesCarousel from "@/components/CasesCarousel";
import { ArrowRight, CheckCircle2, LineChart, Search, Sparkles, Users } from "lucide-react";

export const metadata: Metadata = {
  title: "Elliyeen Research — Website Audit & Revenue Diagnosis",
  description:
    "We audit every layer of your website — copy, trust, UX, SEO, conversion, and AI search readiness — using 18 specialist frameworks. Then we tell you exactly what to fix, in what order, with copy rewrites included.",
  alternates: { canonical: "https://www.elliyeen.com" },
};

const process = [
  {
    icon: Users,
    title: "Customer Intelligence",
    type: "Buyer Research",
    body: "We map your buyer's trigger moment, dominant emotion, and the exact language they use when they feel the problem you solve. Delivered as a written customer brief.",
  },
  {
    icon: Search,
    title: "Friction Diagnosis",
    type: "Website Audit",
    body: "We run 18 specialist frameworks across your copy, UX, trust signals, SEO, accessibility, and conversion architecture. Every gap documented with evidence.",
  },
  {
    icon: Sparkles,
    title: "Prioritized Roadmap",
    type: "Revenue Model",
    body: "We rank every finding by revenue impact. You receive copy rewrites, UX recommendations, and a week-by-week action plan — not a PDF that sits in a folder.",
  },
  {
    icon: LineChart,
    title: "Implementation Support",
    type: "Growth System",
    body: "We review your changes, run a second-pass audit, and measure what moved. Every implementation tracked against a baseline.",
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

const faqSchema = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: [
    {
      "@type": "Question",
      name: "How is a website audit from Elliyeen Research different from an agency giving recommendations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "Agencies give you a list. We give you the replacement copy. Every finding in our report includes the specific fix — the actual headline, the rewritten CTA, the exact objection response — ready to implement. You don't need to hire another writer to act on what we find.",
      },
    },
    {
      "@type": "Question",
      name: "Can't we audit our own website internally?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "You can. The problem is you read it as the person who built it — you see what you meant to say, not what a stranger sees for the first time. We bring 18 frameworks that most in-house teams don't run, applied simultaneously across every layer of your site. The findings are things you wouldn't catch because you're too close to it.",
      },
    },
    {
      "@type": "Question",
      name: "How long until we see results from implementing the audit recommendations?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The roadmap is ranked by speed of impact, not complexity. Most clients implement the first change within a week of receiving the report. Changes to hero copy and CTA structure tend to show movement within two to four weeks. We stay available to review your implementations and measure what moved.",
      },
    },
    {
      "@type": "Question",
      name: "How long does an Elliyeen Research website audit take?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full audit is delivered in four hours or less. Customer intelligence, 22-framework diagnosis, prioritized roadmap, and copy rewrites are completed in a single session — not spread across days or weeks.",
      },
    },
    {
      "@type": "Question",
      name: "What does a website audit from Elliyeen Research include?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "A full audit covers 18 specialist frameworks across positioning, copy, UX, trust signals, SEO, accessibility, conversion architecture, and AI search readiness (AEO). Every gap is documented with evidence. The deliverable includes copy rewrites, UX recommendations, and a week-by-week action plan ranked by revenue impact.",
      },
    },
    {
      "@type": "Question",
      name: "How much does a website audit cost?",
      acceptedAnswer: {
        "@type": "Answer",
        text: "The diagnostic call is free — 20 minutes, three specific findings, no pitch. A full audit starts from $1,500 and includes all 18 frameworks, a full report, and copy rewrites. Audit + implementation is scoped custom to your site and team.",
      },
    },
  ],
};

export default function GetStartedPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }}
      />
      {/* Fix 8 — Skip to main content for keyboard / screen reader users */}
      <a
        href="#main-content"
        className="fixed left-4 top-4 z-[60] -translate-y-20 rounded-lg bg-black px-4 py-2 text-sm font-bold text-white focus:translate-y-0 transition-transform"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-[#f7f4ee] text-[#111111]">

        <SiteNav />

        {/* Fix 2 — Committed headline. Fix 6 — No stock avatars. Fix 10 — Methodology card replaces fake revenue number. */}
        <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-20">
          <div>
            <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl">
              Know exactly what&apos;s costing your revenue.
              <br />
              <span className="text-[#1B5EA8]">Fix&nbsp;it.</span>
            </h1>

            <p className="mt-5 max-w-md text-lg leading-[1.7] text-zinc-600">
              Something specific is costing you customers every week. We find it, write the replacement copy, and rank every gap by revenue impact — so you know exactly what to fix, in what order, with the work already done.
            </p>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#book" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-[#1B5EA8] px-6 text-sm font-bold text-white shadow-xl shadow-[#1B5EA8]/20 hover:bg-[#164d8e]">
                Fix it
              </a>
              <a href="#assessment" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold hover:bg-white">
                See how it works <ArrowRight size={16} />
              </a>
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

          {/* Scroll indicator */}
          <div className="absolute bottom-5 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-1 animate-bounce md:flex" aria-hidden="true">
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
              <path d="M5 8l5 5 5-5" stroke="#a1a1aa" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        </section>

        {/* Logo ticker */}
        <div className="bg-white py-5 overflow-hidden">
          <p className="mb-4 text-center text-[10px] font-bold uppercase tracking-[0.26em] text-zinc-400">
            Experience from
          </p>
          <div className="relative overflow-hidden">
            {/* Fade edges */}
            <div className="pointer-events-none absolute inset-y-0 left-0 z-10 w-20 bg-gradient-to-r from-white to-transparent" />
            <div className="pointer-events-none absolute inset-y-0 right-0 z-10 w-20 bg-gradient-to-l from-white to-transparent" />
            <div className="ticker-track">
              {[
                { name: "Motorola Solutions",     src: "/logos/motorola-solutions.png",                        square: false },
                { name: "OCC",                    src: "/logos/occ.svg",                                       square: true  },
                { name: "Aurora Flight Sciences", src: "/logos/aurora-flight-sciences.svg",                    square: false },
                { name: "PayBlue",                src: "/logos/payblue.svg",                                   square: false },
                { name: "Motorola Solutions",     src: "/logos/motorola-solutions.png",                        square: false },
                { name: "OCC",                    src: "/logos/occ.svg",                                       square: true  },
                { name: "Aurora Flight Sciences", src: "/logos/aurora-flight-sciences.svg",                    square: false },
                { name: "PayBlue",                src: "/logos/payblue.svg",                                   square: false },
              ].map(({ name, src, square }, i) => (
                <div
                  key={i}
                  className="shrink-0 flex items-center justify-center"
                  style={{ width: 140 }}
                >
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={src}
                    alt={name}
                    style={{
                      height: 36,
                      width: "auto",
                      maxWidth: square ? 36 : 140,
                      objectFit: "contain",
                      display: "block",
                    }}
                    loading="lazy"
                  />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Real Output Demo — replaces generic AI chatbot with actual SPCS before/after */}
        <section id="advisor" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <ScrollReveal>
          <div className="rounded-[2rem] border border-zinc-200 bg-white/80 p-5 shadow-xl shadow-zinc-900/5 backdrop-blur sm:p-6 md:p-10">
            <div className="mb-6 sm:mb-8">
              <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl">We don&apos;t describe the problem.<br className="hidden sm:block" /> We write the fix.</h2>
              <p className="mt-4 max-w-xl text-sm leading-7 text-zinc-600 sm:text-base">
                Every finding ships with the rewritten version — formatted, ready to paste.
                Shannon received this the day her audit was delivered.
                No copywriter needed. No briefing required.{" "}
                <span className="font-semibold text-zinc-800">The fix is in the finding.</span>
              </p>
            </div>

            {/* Before / After — Hero Copy */}
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-zinc-50 p-5 sm:p-6">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Before — original hero copy</p>
                <blockquote className="font-serif text-lg leading-[1.5] text-zinc-700 sm:text-xl">
                  &ldquo;Savannah Personal Care Services provides compassionate, personalized home care for seniors and individuals with disabilities in the Savannah, Georgia area. Our dedicated team of caregivers is committed to improving quality of life.&rdquo;
                </blockquote>
                <div className="mt-5 space-y-2">
                  {[
                    "Opens with the company name, not the buyer's situation",
                    "\"Compassionate\" and \"dedicated\" — zero evidence, zero belief",
                    "No buyer is named. No fear is acknowledged. No person is in the room.",
                  ].map((note) => (
                    <div key={note} className="flex items-start gap-2 text-xs text-red-600">
                      <span className="mt-0.5 shrink-0 font-bold">✕</span>
                      {note}
                    </div>
                  ))}
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-50 p-5 sm:p-6">
                <p className="mb-4 text-[11px] font-bold uppercase tracking-[0.2em] text-green-600">After — rebuilt hero copy</p>
                <blockquote className="font-serif text-lg leading-[1.5] text-zinc-900 sm:text-xl">
                  &ldquo;You&apos;ve been managing this long enough.&rdquo;
                </blockquote>
                <p className="mt-3 text-sm leading-6 text-zinc-600">
                  Shannon Stafford Simpson is a Certified Nursing Assistant who built a care agency.
                  Not a business operator who hired caregivers. That difference matters
                  — and your family deserves to know it before the first call.
                </p>
                <div className="mt-5 space-y-2">
                  {[
                    "Opens with the buyer's exact emotional state at the decision moment",
                    "Shannon's CNA credential positioned as primary differentiator",
                    "Makes the gap between SPCS and franchise competitors explicit",
                  ].map((note) => (
                    <div key={note} className="flex items-start gap-2 text-xs text-green-700">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0" />
                      {note}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Before / After — FAQ */}
            <div className="mt-4 grid gap-4 md:grid-cols-2">
              <div className="rounded-2xl bg-zinc-50 p-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-red-400">Before — FAQ questions on site</p>
                <div className="space-y-2">
                  {[
                    "What types of products or services do you offer?",
                    "How can I contact you?",
                    "Do you have a return policy?",
                  ].map((q) => (
                    <div key={q} className="flex items-start gap-2 text-sm text-zinc-500">
                      <span className="shrink-0 text-red-400 font-bold text-xs mt-0.5">✕</span>
                      {q}
                    </div>
                  ))}
                  <p className="text-[11px] text-red-500 font-semibold mt-3">Wix default placeholder copy. Visible to every family in crisis who found the site.</p>
                </div>
              </div>

              <div className="rounded-2xl bg-zinc-50 p-5">
                <p className="mb-3 text-[11px] font-bold uppercase tracking-[0.2em] text-green-600">After — 7 questions families actually ask</p>
                <div className="space-y-2">
                  {[
                    "What happens if my caregiver doesn't show up?",
                    "How do I know the caregiver is trustworthy?",
                    "Can care start this week?",
                  ].map((q) => (
                    <div key={q} className="flex items-start gap-2 text-sm text-zinc-700">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-green-600" />
                      {q}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="mt-6 flex items-start">
              <a
                href="/spcs-report"
                className="inline-flex shrink-0 items-center gap-2 rounded-xl border border-zinc-200 px-5 py-3 text-sm font-semibold text-zinc-800 hover:border-zinc-400 hover:bg-zinc-50"
              >
                Read the full case study <ArrowRight size={14} />
              </a>
            </div>
          </div>
          </ScrollReveal>
        </section>

        {/* Fix 4 — Process section with deliverables and timelines */}
        <section id="assessment" className="mx-auto max-w-7xl px-4 py-12 sm:px-6 md:py-16">
          <div className="mb-8 text-center sm:mb-10">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Our process</p>
            <h2 className="mt-4 font-serif text-3xl tracking-[-0.04em] sm:text-4xl md:text-5xl">From insight to impact.</h2>
          </div>
          <div className="grid grid-cols-2 gap-4 sm:gap-6 md:grid-cols-4">
            {process.map((item, index) => (
              <ScrollReveal key={item.title} delay={index * 80}>
              <div className="relative rounded-3xl border border-zinc-200 bg-white p-5 text-center shadow-sm sm:p-8">
                <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-zinc-200 bg-white shadow-sm sm:h-16 sm:w-16">
                  <item.icon size={20} />
                </div>
                <div className="mx-auto mt-3 flex h-6 w-6 items-center justify-center rounded-full bg-[#1B5EA8] text-xs font-bold text-white">{index + 1}</div>
                <p className="mt-2 text-[10px] font-bold uppercase tracking-widest text-zinc-400 sm:text-[11px]">{item.type}</p>
                <h3 className="mt-2 text-sm font-bold sm:text-base">{item.title}</h3>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.body}</p>
              </div>
              </ScrollReveal>
            ))}
          </div>
        </section>

        <section id="cases" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <ScrollReveal>
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 sm:p-6 md:p-8">
            <div className="mb-7">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">Case studies</p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.04em] sm:text-4xl">
                The sites were live.<br className="hidden sm:block" /> The revenue wasn&apos;t.
              </h2>
              <p className="mt-2 max-w-lg text-sm leading-6 text-zinc-500">
                Four audits. Four gaps no owner had named. Here&apos;s what we found — and what each one was costing.
              </p>
            </div>
            <CasesCarousel />
          </div>
          </ScrollReveal>
        </section>

        {/* Advocacy prompt */}
        <div className="mx-auto max-w-7xl px-4 pb-2 sm:px-6">
          <p className="text-center text-sm text-zinc-400">
            Know a founder whose site isn&apos;t converting?{" "}
            <a href="mailto:abdullah@elliyeen.com?subject=Referral" className="font-semibold text-zinc-600 underline underline-offset-2 hover:text-black">
              Send them this page.
            </a>
          </p>
        </div>

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
                    Elliyeen was built to close that gap. Eighteen specialist frameworks run simultaneously on a single site. The output is not a report. It is a prioritized roadmap with copy rewrites, UX recommendations, and a week-by-week action plan.
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
                  The complete framework we use to diagnose why websites don't convert — and what to do about it.
                </p>
                <ul className="mt-6 space-y-3">
                  {[
                    "The 7 unanswered objections that kill most conversions",
                    "The 5 trust signals missing from most service business sites",
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
                    className="w-full rounded-xl bg-[#1B5EA8] px-6 py-4 text-sm font-bold text-white hover:bg-[#164d8e]"
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
                <p className="mt-4 font-serif text-2xl leading-[1.2] tracking-[-0.03em] text-zinc-900 sm:text-3xl">
                  The last audit we completed found{" "}
                  <span className="text-[#1B5EA8]">$36,600/month</span>{" "}
                  in uncaptured revenue. It cost $1,500.
                </p>
                <a
                  id="contact"
                  href="#book"
                  className="mt-6 inline-flex items-center gap-2 rounded-xl bg-[#1B5EA8] px-6 py-4 text-sm font-bold text-white hover:bg-[#164d8e]"
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

        {/* Objection FAQ */}
        <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
          <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
            <div className="mb-8">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Common questions</p>
              <h2 className="mt-4 font-serif text-3xl tracking-[-0.03em] md:text-4xl">Before you decide.</h2>
            </div>
            <div className="grid gap-6 md:grid-cols-2">
              {[
                {
                  q: "How long does the audit take?",
                  a: "Four hours or less. Customer intelligence, 22-framework diagnosis, prioritized roadmap, and copy rewrites are completed in a single session — not spread across days or weeks.",
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
              ].map(({ q, a }) => (
                <div key={q} className="rounded-2xl border border-zinc-100 bg-[#f7f4ee] p-6">
                  <p className="font-semibold text-zinc-900">{q}</p>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{a}</p>
                </div>
              ))}
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
                    <li><a href="#advisor"      className="hover:text-black">See the Work</a></li>
                    <li><a href="#pricing"      className="hover:text-black">Pricing</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Services</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="#lead-magnet"  className="hover:text-black">Free Audit PDF</a></li>
                    <li><a href="#cases"         className="hover:text-black">Case Studies</a></li>
                    <li><a href="#pricing" className="hover:text-black">Full Audit</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Company</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="#founder"      className="hover:text-black">About</a></li>
                    <li><a href="#cases"         className="hover:text-black">Case Studies</a></li>
                    <li><a href="#book" className="hover:text-black">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Reports</p>
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
