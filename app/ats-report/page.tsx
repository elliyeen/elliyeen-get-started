import type { Metadata } from "next";
import ATSBeforeAfter from "@/components/ATSBeforeAfter";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import SiteNav from "@/app/SiteNav";

export const metadata: Metadata = {
  title: "Case Study: Associated Training Services — Elliyeen Research",
  description:
    "22-agent audit + full site rebuild for a heavy equipment, crane, and CDL training school. 22 navigation items, six competing CTAs, and $26/hr wage proof buried in the footer. Here's what we found and what we built.",
  robots: { index: false, follow: false },
};

const beforeProblems = [
  {
    label: "22 navigation items and six competing CTAs",
    detail:
      "A prospective student comparing training programs at 9pm had to choose between 22 links before finding the one that mattered. Six calls-to-action fought for the same click, all at equal visual weight.",
  },
  {
    label: "The best proof on the site was buried in the footer",
    detail:
      "A graduate earning $26/hr starting wage is the single most persuasive fact ATS has. It appeared nowhere above the fold — the exact place a student decides whether to keep reading or leave.",
  },
  {
    label: "No career-outcome headline — just the company name",
    detail:
      "65 years of operation and four accreditations said nothing about what a student's life looks like six months after enrolling. The homepage led with the company, not the outcome.",
  },
  {
    label: "The certification path had no name and no shape",
    detail:
      "Three levels of crane certification existed but were never presented as a path. Students couldn't see the next step, so they couldn't picture themselves on it.",
  },
];

const afterWins = [
  "Career outcome headline leads — wage proof moved above the fold, where decisions happen",
  "Six competing CTAs collapsed into one",
  "22 navigation items simplified to a single clear path",
  "The three-level crane certification reframed as The ATS Career Path",
  "Free Starter Kit added to capture the lead before the call",
  "65 years of operation and four accreditations repositioned as supporting proof, not the headline",
];

export default function ATSReportPage() {
  return (
    <div className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <SiteNav />

      {/* ─── BEFORE: Case Study Hero ─────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 pb-10 pt-12 sm:px-6 md:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
          Case Study · Trade School · Sun Prairie, WI
        </p>
        <h1 className="mt-4 max-w-3xl font-serif t-display">
          <span className="text-[#1B5EA8]">We rebuilt it.</span>
        </h1>
        <p className="mt-5 max-w-2xl t-body-lg text-zinc-600">
          Associated Training Services had 65 years of proof and a graduate earning $26/hr.
          None of it reached the student making the decision. Read the full report.
        </p>

        {/* Stats strip */}
        <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
          {[
            ["22", "specialist frameworks"],
            ["22", "nav items → 1 path"],
            ["1", "rebuilt site, live now"],
            ["0", "generic findings"],
          ].map(([num, label]) => (
            <div key={label} className="flex flex-col">
              <span className="font-serif t-heading font-bold text-[#1B5EA8]">{num}</span>
              <span className="mt-1 text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500">{label}</span>
            </div>
          ))}
        </div>
      </section>

      {/* ─── BEFORE: What we found ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-6 sm:p-8 md:p-10">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Before — what we found</p>
          <h2 className="mt-3 font-serif t-title">
            The site was live. The proof was invisible.
          </h2>
          <p className="mt-3 max-w-2xl text-sm leading-6 text-zinc-500">
            Four specific findings. Each one a named, locatable gap between what the site was doing
            and what it needed to do to turn a comparison-shopping student into an enrolled one.
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

      {/* ─── Transition ───────────────────────────────────────────── */}
      <div className="mx-auto max-w-7xl px-4 pb-6 sm:px-6">
        <div className="rounded-[2rem] border border-[#0D1B2A]/20 bg-[#0D1B2A] px-8 py-6 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#2E5F8A]">The audit</p>
          <p className="mt-2 font-serif t-subheading text-white">
            22 specialist frameworks. Every finding documented with evidence and a specific fix.
          </p>
          <p className="mt-2 text-sm text-zinc-400">Read the full report below.</p>
        </div>
      </div>

      {/* ─── BEFORE/AFTER TOGGLE ─────────────────────────────────────────────── */}
      <ATSBeforeAfter />

      {/* ─── AFTER: What was built ───────────────────────────────────────────── */}
      <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
        <div className="overflow-hidden rounded-[2rem] border border-zinc-200 bg-white">
          <div className="grid md:grid-cols-2">
            <div className="p-8 md:p-10">
              <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">After — what was built</p>
              <h2 className="mt-3 font-serif t-title">
                The rebuilt site is live.
              </h2>
              <p className="mt-4 text-sm leading-6 text-zinc-600">
                Every finding in the audit became a specific decision in the new site.
                The hero speaks to the outcome a student wants. The wage proof leads.
                The path to certification finally has a name and a shape.
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
                href="https://elliyeen.github.io/associatedtrainingservices/"
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
                    elliyeen.github.io/associatedtrainingservices
                  </div>
                </div>
                <div className="bg-[#123A5A] px-5 py-6 text-center">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#7fa8c9]">
                    Associated Training Services
                  </p>
                  <p className="mt-2 font-serif text-lg leading-tight text-white">
                    Start at $26/hr. Certified in weeks, not years.
                  </p>
                  <p className="mt-2 text-[11px] leading-5 text-[#c3d6e6]">
                    65 years of training crane, heavy equipment, and CDL operators.
                    Four accreditations. One clear path.
                  </p>
                  <div className="mt-4 rounded-lg bg-white/10 px-4 py-2 text-center text-[11px] font-bold text-white">
                    Get the Free Starter Kit →
                  </div>
                </div>
                <div className="px-5 py-4 space-y-2">
                  <div className="h-2 w-3/4 rounded-full bg-zinc-100" />
                  <div className="h-2 w-full rounded-full bg-zinc-100" />
                  <div className="h-2 w-2/3 rounded-full bg-zinc-100" />
                </div>
                <div className="border-t border-zinc-100 bg-zinc-50 px-5 py-3">
                  <p className="text-[10px] font-semibold text-[#123A5A]">The ATS Career Path — three levels, one clear next step</p>
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
              <h2 className="mt-3 font-serif t-title text-white">
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
                className="inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#123A5A] px-9 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors duration-200 hover:bg-[#D87A24] active:bg-[#b8620e] sm:w-auto sm:min-w-[180px]"
              >
                Get Started <ArrowRight size={15} />
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
                  <li><a href="/faq"          className="hover:text-black">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Services</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/case-studies/savannah" className="hover:text-black">Industries</a></li>
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
                  <li><a href="/reports/operator-school-audit.html"   className="hover:text-black">Associated Training Services</a></li>
                  <li><a href="/spcs-report"                          className="hover:text-black">Savannah Personal Care</a></li>
                  <li><a href="/ats-report"                           className="hover:text-black">Associated Training Services (Rebuild)</a></li>
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
