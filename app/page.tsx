import type { Metadata } from "next";
import React from "react";
import CyclingWord from "./CyclingWord";

export const metadata: Metadata = {
  title: "Elliyeen Research — Engineer Higher Revenue",
  description:
    "Elliyeen Research helps organizations understand customers, remove friction, and engineer exceptional experiences that increase revenue, profitability, and sustainable growth. Talk to Elliyeen AI free.",
  alternates: { canonical: "https://elliyeen-get-started.pages.dev" },
};
import { ArrowRight, BarChart3, Bot, CheckCircle2, LineChart, LockKeyhole, Search, Sparkles, Users } from "lucide-react";

const prompts = [
  "Why aren't we growing?",
  "How much revenue are we losing?",
  "Can you audit our website?",
  "Why are competitors winning?",
  "How do we improve customer experience?",
  "What should we do first?",
];

const process = [
  { icon: Users,    title: "Understand Customers", body: "We uncover what your customers need, want, fear, and struggle with." },
  { icon: Search,   title: "Identify Friction",    body: "We find gaps, bottlenecks, and missed opportunities holding growth back." },
  { icon: Sparkles, title: "Design Experiences",   body: "We create clearer journeys that build trust and drive action." },
  { icon: LineChart, title: "Engineer Growth",     body: "We implement, optimize, and improve the system over time." },
];

const cases = [
  {
    tag: "Home Care",
    title: "Savannah Personal Care",
    body: "Reworked the customer journey around trust, clarity, accessibility, and local search intent.",
    metrics: ["More clarity", "Better trust", "Cleaner path"],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Financial Services",
    title: "Wealth Management Firm",
    body: "Designed an AI-assisted onboarding workflow to help prospects understand services faster.",
    metrics: ["Less friction", "Better fit", "Faster follow-up"],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
  },
  {
    tag: "Education / Sports",
    title: "College Golf Program",
    body: "Built a recruiting path that turns performance data into clearer scholarship positioning.",
    metrics: ["Clear story", "Better proof", "More action"],
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
  },
];

export default function GetStartedPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">

      {/* ── Nav ── */}
      <nav className="sticky top-0 z-50 bg-[#f7f4ee]/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-4 sm:px-6 sm:py-5">
          <div className="text-sm font-bold tracking-[0.22em]">ELLIYEEN</div>

          <div className="hidden items-center gap-9 text-sm font-medium text-zinc-600 md:flex">
            <a href="#solutions" className="hover:text-black">Product</a>
            <a href="#cases"     className="hover:text-black">Enterprise</a>
            <a href="#assessment" className="hover:text-black">Pricing</a>
            <a href="#advisor"   className="hover:text-black">Resources</a>
          </div>

          <div className="flex items-center gap-2">
            <a href="#contact"    className="hidden rounded-full border border-zinc-300 px-4 py-2 text-sm font-medium text-zinc-800 hover:border-zinc-400 md:block">Contact sales</a>
            <a href="#assessment" className="rounded-full bg-[#111111] px-4 py-2 text-sm font-semibold text-white hover:bg-zinc-800">Try Elliyeen</a>
          </div>
        </div>
      </nav>

      {/* ── Hero ── */}
      <section className="relative mx-auto grid max-w-7xl items-center gap-10 px-4 pb-14 pt-10 sm:px-6 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-20">
        <div>
          <h1 className="font-serif text-5xl leading-[1.05] tracking-[-0.04em] sm:text-6xl md:text-7xl lg:text-8xl">
            Engineer Higher
            <br />
            <CyclingWord />
          </h1>

          <p className="mt-6 text-base leading-7 text-zinc-700 sm:text-lg sm:leading-8">
            Free your organization to focus on what matters most, today.
          </p>
          <p className="mt-3 text-base leading-7 text-zinc-700 sm:text-lg sm:leading-8">
            Engineer your business to deliver exceptional experiences, increase profitability, and accelerate sustainable growth.
          </p>

          <div className="mt-7 flex flex-col gap-3 sm:flex-row">
            <a href="#assessment" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-black px-6 text-sm font-bold text-white shadow-xl shadow-black/10 hover:bg-zinc-800">
              Try Elliyeen
            </a>
            <a href="#advisor" className="inline-flex min-h-[52px] items-center justify-center gap-2 rounded-xl px-6 text-sm font-bold hover:bg-white">
              Talk to Elliyeen AI <ArrowRight size={16} />
            </a>
          </div>

          <div className="mt-7 flex items-center gap-4">
            <div className="flex -space-x-3">
              {[1, 2, 3, 4].map((i) => (
                <img key={i} alt="Client avatar" className="h-9 w-9 rounded-full border-2 border-[#f7f4ee] object-cover" src={`https://i.pravatar.cc/80?img=${i + 12}`} />
              ))}
            </div>
            <div className="text-sm text-zinc-700">
              <div className="text-amber-500">★★★★★</div>
              <div>Trusted by growth-focused organizations</div>
            </div>
          </div>
        </div>

        {/* Hero card — hidden on small phones, visible from sm up */}
        <div className="relative hidden sm:block">
          <div className="absolute -right-8 -top-10 hidden h-48 w-48 rounded-full bg-[#1B5EA8]/10 blur-3xl md:block" />
          <div className="relative rotate-[-2deg] rounded-[2rem] border border-zinc-200 bg-white p-4 shadow-2xl shadow-zinc-900/10 sm:p-5">
            <div className="rounded-[1.4rem] border border-zinc-100 bg-gradient-to-br from-white to-[#eef3fb] p-5 sm:p-8">
              <div className="mb-6 flex items-center justify-between">
                <div className="text-xs font-bold tracking-[0.18em] text-zinc-500">ELLIYEEN RESEARCH</div>
                <LockKeyhole size={18} className="text-zinc-400" />
              </div>
              <p className="text-sm font-semibold text-zinc-500">Your Revenue Opportunity</p>
              <h2 className="mt-2 text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">$2.4M+</h2>
              <p className="mt-2 text-sm font-semibold text-emerald-600">High opportunity</p>
              <div className="mt-6 h-40 rounded-2xl bg-[linear-gradient(180deg,rgba(27,94,168,0.22),rgba(27,94,168,0.04))] p-4 sm:h-48">
                <svg viewBox="0 0 500 180" className="h-full w-full overflow-visible">
                  <path d="M10 150 C70 130 95 150 130 110 S190 40 230 90 S280 130 315 70 S370 80 410 35 S450 45 490 12" fill="none" stroke="#1B5EA8" strokeWidth="7" strokeLinecap="round" />
                  <circle cx="230" cy="90" r="9" fill="white" stroke="#1B5EA8" strokeWidth="5" />
                </svg>
              </div>
              <div className="mt-6 grid gap-3 text-sm">
                {['Customer Clarity', 'Conversion Experience', 'Trust & Credibility', 'Organic Visibility', 'Operational Efficiency'].map((item) => (
                  <div key={item} className="flex items-center gap-3 text-zinc-700">
                    <CheckCircle2 size={16} className="shrink-0 text-[#1B5EA8]" /> {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI Advisor ── */}
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
                {prompts.map((prompt, index) => (
                  <button key={prompt} className={`flex w-full items-center justify-between rounded-xl px-4 py-3 text-left text-sm ${index === 0 ? 'bg-[#eef3fb] text-[#1B5EA8]' : 'hover:bg-zinc-50'}`}>
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
                <input className="flex-1 bg-transparent px-3 text-sm outline-none sm:px-4" placeholder="Ask a follow-up question..." />
                <button className="rounded-xl bg-[#1B5EA8] p-3 text-white"><ArrowRight size={18} /></button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Process ── */}
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
              <h3 className="mt-4 text-sm font-bold sm:text-base">{item.title}</h3>
              <p className="mt-2 text-xs leading-5 text-zinc-600 sm:text-sm sm:leading-6">{item.body}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── Case Studies ── */}
      <section id="cases" className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-5 sm:p-6 md:p-8">
          <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="font-serif text-3xl tracking-[-0.04em] sm:text-4xl">Real results. Real impact.</h2>
            <a className="inline-flex items-center gap-2 text-sm font-bold text-[#1B5EA8] sm:whitespace-nowrap" href="#">View all case studies <ArrowRight size={15} /></a>
          </div>
          <div className="grid gap-5 sm:gap-6 md:grid-cols-3">
            {cases.map((item) => (
              <article key={item.title} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <img src={item.image} alt={item.title} className="h-44 w-full object-cover" />
                <div className="p-5 sm:p-6">
                  <p className="text-xs font-bold uppercase tracking-[0.18em] text-zinc-500">{item.tag}</p>
                  <h3 className="mt-2 text-lg font-bold sm:text-xl">{item.title}</h3>
                  <p className="mt-3 text-sm leading-6 text-zinc-600">{item.body}</p>
                  <div className="mt-5 grid grid-cols-3 gap-2 text-sm font-semibold text-[#1B5EA8]">
                    {item.metrics.map((metric) => <span key={metric}>{metric}</span>)}
                  </div>
                  <a className="mt-5 inline-flex items-center gap-2 text-sm font-bold" href="#">View Case Study <ArrowRight size={15} /></a>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 pt-8 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] bg-[#080713] p-8 text-white shadow-2xl shadow-zinc-900/10 sm:p-10 md:p-16">
          <div className="grid gap-10 md:grid-cols-2">
            <div>
              <h2 className="font-serif text-3xl leading-tight tracking-[-0.04em] sm:text-4xl md:text-5xl">Ready to engineer higher revenue?</h2>
              <p className="mt-5 text-sm leading-7 text-zinc-300 sm:text-base">Let's build a plan tailored to your customers, your market, and your growth goals.</p>
              <div className="mt-7 flex flex-col gap-3 sm:flex-row">
                <a href="#assessment" className="inline-flex min-h-[52px] items-center justify-center rounded-xl bg-white px-6 text-sm font-bold text-black">Start Your Assessment</a>
                <a href="#advisor"    className="inline-flex min-h-[52px] items-center justify-center gap-2 px-6 text-sm font-bold">Talk to Elliyeen AI <ArrowRight size={16} /></a>
              </div>
            </div>
            <div className="space-y-5 sm:space-y-6">
              {[
                [Bot,      "AI-Powered Insights",  "Data and AI uncover opportunities humans miss."],
                [Users,    "Human Expertise",       "Strategists, designers, and engineers who care about your results."],
                [BarChart3, "Measurable Outcomes",  "We focus on what moves the needle: revenue, customers, and ROI."],
              ].map(([Icon, title, body]: any) => (
                <div key={title} className="flex gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/10"><Icon size={20} /></div>
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

      {/* ── Footer ── */}
      <footer className="border-t border-zinc-100 bg-white">
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 sm:py-12">
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            <div>
              <div className="text-sm font-bold tracking-[0.22em] text-zinc-900">ELLIYEEN</div>
              <p className="mt-2 max-w-xs text-sm leading-6 text-zinc-500">AI-powered revenue engineering for growth-focused organizations.</p>
            </div>

            <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Product</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="#solutions"  className="hover:text-black">Overview</a></li>
                  <li><a href="#advisor"    className="hover:text-black">AI Advisor</a></li>
                  <li><a href="#assessment" className="hover:text-black">Pricing</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Services</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="#solutions" className="hover:text-black">Revenue Audit</a></li>
                  <li><a href="#solutions" className="hover:text-black">CX Design</a></li>
                  <li><a href="#solutions" className="hover:text-black">Growth Strategy</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Company</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="#about" className="hover:text-black">About</a></li>
                  <li><a href="#cases" className="hover:text-black">Case Studies</a></li>
                  <li><a href="#contact" className="hover:text-black">Contact</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-400">Resources</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="#research" className="hover:text-black">Research</a></li>
                  <li><a href="#advisor"  className="hover:text-black">Blog</a></li>
                  <li><a href="#contact"  className="hover:text-black">FAQ</a></li>
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
              className="flex h-9 w-9 items-center justify-center rounded-full border border-zinc-200 text-zinc-500 transition-colors hover:border-[#0A66C2] hover:text-[#0A66C2]"
              aria-label="LinkedIn"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect x="2" y="9" width="4" height="12"/><circle cx="4" cy="4" r="2"/>
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </main>
  );
}
