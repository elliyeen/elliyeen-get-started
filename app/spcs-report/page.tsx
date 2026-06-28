import type { Metadata } from "next";
import SPCSFlipbook from "@/components/SPCSFlipbook";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SiteNav from "@/app/SiteNav";

export const metadata: Metadata = {
  title: "Case Study: Savannah Personal Care Services — Elliyeen Research",
  description:
    "22-agent audit + full site rebuild for a home care agency in Savannah, GA. The FAQ had Wix placeholder copy. The hero spoke to no one. Here's what we found and what we built.",
  robots: { index: false, follow: false },
};

const beforeProblems = [
  {
    label: "FAQ was Wix placeholder copy",
    detail:
      "Families in crisis — deciding whether to trust a stranger with their parent — arrived to find questions the software put there. Not one of the seven questions families actually ask before calling a home care agency.",
  },
  {
    label: "The hero spoke to the company, not the buyer",
    detail:
      "The adult daughter making this decision at 11pm, alone, afraid she'll choose wrong — her name appeared nowhere. The first words on the page described the agency's services. Not her situation.",
  },
  {
    label: "The credential that should have closed every sale was invisible",
    detail:
      "Shannon Stafford Simpson is a Certified Nursing Assistant who built a care agency from clinical experience. Home Instead's Savannah operator bought a franchise manual. That gap appeared nowhere above the fold.",
  },
  {
    label: "Not ranking for any local search term that matters",
    detail:
      "\"Home care Savannah\" — the search a family types when something has changed — returned no result for SPCS. Competitors who were less qualified were capturing every search-intent visitor.",
  },
];

const afterWins = [
  "Hero rebuilt around the adult daughter's exact 11pm fear — \"You've been managing this long enough.\"",
  "FAQ replaced with 7 questions families actually ask before trusting a home care agency",
  "The Savannah Standard — Shannon's 5-step process — named, owned, and documented end to end",
  "Named testimonials with specific outcomes: \"We finally slept through the night.\" — Robert S., Pooler",
  "Shannon's CNA credential positioned as the primary differentiator above the fold",
  "60-second care finder + Savannah Family Guide PDF for email capture and local authority",
];

export default function SPCSReportPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <SiteNav />

      {/* ─── BEFORE: Case Study Hero ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 md:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
          Case Study · Home Care · Savannah, GA
        </p>
        <h1 className="mt-4 max-w-3xl font-serif text-4xl leading-[1.08] tracking-[-0.04em] sm:text-5xl md:text-6xl">
          <span className="text-[#1B5EA8]">We rebuilt it.</span>
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-[1.7] text-zinc-600">
          Savannah Personal Care Services had a website. Families were finding it.
          Nobody was calling. Read the full report.
        </p>

        {/* Stats strip */}
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {[
            ["22", "specialist frameworks"],
            ["19", "page audit report"],
            ["1", "rebuilt site, live now"],
            ["0", "generic findings"],
          ].map(([num, label]) => (
            <div key={label} className="flex flex-col">
              <span className="font-serif text-3xl font-bold tracking-[-0.03em] text-[#1B5EA8]">{num}</span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BEFORE: What we found ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 sm:p-8 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Before — what we found</p>
          <h2 className="mt-3 font-serif text-2xl tracking-[-0.03em] sm:text-3xl">
            The site was live. The revenue wasn&apos;t.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Four specific findings. Each one a named, locatable gap between what the site was doing
            and what it needed to do to convert a family in crisis into a scheduled call.
          </p>

          <div className="mt-8 grid gap-5 sm:grid-cols-2">
            {beforeProblems.map((item, i) => (
              <div
                key={item.label}
                className="rounded-2xl border border-zinc-100 bg-[#f7f4ee] p-5"
              >
                <div className="flex items-start gap-3">
                  <span className="mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-red-100 text-xs font-bold text-red-500">
                    {i + 1}
                  </span>
                  <div>
                    <p className="font-semibold text-zinc-900 text-sm">{item.label}</p>
                    <p className="mt-2 text-sm leading-6 text-zinc-600">{item.detail}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── Transition to Flipbook ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
        <div className="rounded-[2rem] border border-[#0D1B2A]/20 bg-[#0D1B2A] px-8 py-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2E5F8A]">The audit</p>
          <p className="mt-2 font-serif text-xl text-white sm:text-2xl">
            22 specialist frameworks. 19 pages. Every finding documented with evidence and a specific fix.
          </p>
          <p className="mt-2 text-sm text-zinc-400">Scroll through or download the PDF below.</p>
        </div>
      </div>

      {/* ─── THE FLIPBOOK ────────────────────────────────────────────────────── */}
      <SPCSFlipbook />

      {/* ─── AFTER: What was built ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">After — what was built</p>
              <h2 className="mt-3 font-serif text-2xl tracking-[-0.03em] sm:text-3xl md:text-4xl">
                The rebuilt site is live.
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                Every finding in the audit became a specific decision in the new site.
                The hero speaks to the 11pm buyer. The FAQ answers the questions families
                actually ask. The founder&apos;s credential is the first thing you read.
              </p>

              <div className="mt-6 space-y-3">
                {afterWins.map((win) => (
                  <div key={win} className="flex items-start gap-3 text-sm text-zinc-700">
                    <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#1B5EA8]" />
                    {win}
                  </div>
                ))}
              </div>

              <a
                href="https://elliyeen.github.io/savannah-pcs/"
                target="_blank"
                rel="noopener noreferrer"
                className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#1B5EA8] px-5 py-3 text-sm font-bold text-white hover:bg-[#164d8e]"
              >
                Experience the new site <ArrowRight size={15} />
              </a>
            </div>

            {/* Live site preview card */}
            <div className="flex items-center justify-center border-t border-zinc-100 bg-[#f7f4ee] p-8 md:border-l md:border-t-0 md:p-10">
              <div className="w-full max-w-sm overflow-hidden rounded-2xl border border-zinc-200 bg-white shadow-xl shadow-zinc-900/10">
                <div className="border-b border-zinc-100 bg-zinc-50 px-4 py-2.5 flex items-center gap-2">
                  <div className="flex gap-1.5">
                    <div className="h-2.5 w-2.5 rounded-full bg-red-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-yellow-400" />
                    <div className="h-2.5 w-2.5 rounded-full bg-green-400" />
                  </div>
                  <div className="flex-1 rounded bg-white px-3 py-1 text-[10px] text-zinc-400 font-mono">
                    elliyeen.github.io/savannah-pcs
                  </div>
                </div>
                <div className="bg-[#0a5c52] px-5 py-6 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4db8a8]">
                    Savannah Personal Care Services
                  </p>
                  <p className="mt-2 font-serif text-lg leading-tight text-white">
                    You&apos;ve been managing this long enough.
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[#9dd6cf]">
                    Shannon Stafford Simpson is a Certified Nursing Assistant who built a care agency.
                    Not a business operator who hired caregivers.
                  </p>
                  <div className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-center text-[11px] font-bold text-white">
                    Find the right care in 60 seconds →
                  </div>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-zinc-100" />
                  <div className="h-2 w-full rounded-full bg-zinc-100" />
                  <div className="h-2 w-2/3 rounded-full bg-zinc-100" />
                </div>
                <div className="border-t border-zinc-100 bg-zinc-50 px-5 py-3">
                  <p className="text-[10px] font-semibold text-[#0a5c52]">★★★★★ "We finally slept through the night." — Robert S., Pooler</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ─── CONVERSION CTA ──────────────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-16 sm:px-6">
        <div className="rounded-[2rem] bg-[#0D1B2A] p-8 md:p-12">
          <div className="grid items-center gap-8 md:grid-cols-2">
            <div>
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2E5F8A]">
                Your site next
              </p>
              <h2 className="mt-3 font-serif text-3xl tracking-[-0.03em] text-white sm:text-4xl">
                If you recognized any of those four problems in your own site, that&apos;s not a coincidence.
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                Every site we audit has a version of these gaps. The specific findings are different.
                The pattern — visitors arriving and leaving without converting — is the same.
              </p>
              <p className="mt-4 text-sm leading-6 text-zinc-400">
                We run 4 engagements per quarter. The diagnostic call is 20 minutes and free.
                Three specific findings, whether you work with us or not.
              </p>
            </div>
            <div className="flex flex-col gap-4">
              <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <p className="text-sm font-bold text-white">What you get from the diagnostic</p>
                <div className="mt-4 space-y-2.5">
                  {[
                    "The single highest-leverage problem on your site — named and located",
                    "The hero headline rewritten to speak to your actual buyer",
                    "The objection your site never answers that's killing conversion",
                  ].map((item) => (
                    <div key={item} className="flex items-start gap-2.5 text-sm text-zinc-300">
                      <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#2E5F8A]" />
                      {item}
                    </div>
                  ))}
                </div>
              </div>
              <a
                href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
                className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B5EA8] px-6 py-4 text-sm font-bold text-white hover:bg-[#164d8e]"
              >
                Fix it <ArrowRight size={15} />
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
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
                  <li><a href="/#advisor"     className="hover:text-black">See the Work</a></li>
                  <li><a href="/#pricing"     className="hover:text-black">Pricing</a></li>
                  <li><a href="/faq"          className="hover:text-black">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Services</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/case-studies" className="hover:text-black">Industries</a></li>
                  <li><a href="/#pricing"     className="hover:text-black">Full Audit</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Company</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/#founder"     className="hover:text-black">About</a></li>
                  <li><a href="/#cases"       className="hover:text-black">Industries</a></li>
                  <li><a href="mailto:abdullah@elliyeen.com" className="hover:text-black">Contact</a></li>
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
              <a href="/privacy"      className="text-sm text-zinc-400 hover:text-black">Privacy Policy</a>
              <a href="/terms"        className="text-sm text-zinc-400 hover:text-black">Terms</a>
              <a href="/accessibility" className="text-sm text-zinc-400 hover:text-black">Accessibility</a>
              <a href="/do-not-sell"  className="text-sm text-zinc-400 hover:text-black">Do Not Sell My Data</a>
              <a href="/sitemap-page" className="text-sm text-zinc-400 hover:text-black">Sitemap</a>
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
    </div>
  );
}
