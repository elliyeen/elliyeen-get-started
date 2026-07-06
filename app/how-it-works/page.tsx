import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import SiteNav from "../SiteNav";
import HowItWorksDemo from "@/components/HowItWorksDemo";

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
      name: "Map Your Current Path",
      text: "We trace how a visitor actually moves through your site today — where they hesitate, where they lose trust, and where they leave instead of buying.",
    },
    {
      "@type": "HowToStep",
      name: "Find the Breaks",
      text: "We check every part of the site at once — the words, the design, the trust signals, the path to checkout. Every gap gets documented with proof.",
    },
    {
      "@type": "HowToStep",
      name: "Write the Fix",
      text: "Not a list of recommendations. The actual rewritten headline, the fixed CTA, the resolved objection — ranked by what moves revenue fastest.",
    },
    {
      "@type": "HowToStep",
      name: "Connect the System",
      text: "You implement. We run a second-pass audit and measure every change against a baseline. Revenue impact — visible.",
    },
  ],
};

const frameworks = [
  "Show what makes you different",
  "Use words people understand",
  "Make the site easy to use",
  "Look trustworthy",
  "Give one clear next step, not ten",
  "Show up on Google",
  "Show up in AI search, like ChatGPT",
  "Work for everyone, including disabled users",
  "Capture new leads automatically",
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

        {/* ── Hero: headline + interactive demo ───────────────────────── */}
        <section className="mx-auto max-w-7xl px-4 pt-16 pb-6 sm:px-6 sm:pt-20">

          {/* Compact headline */}
          <div className="mb-10 max-w-2xl">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1B5EA8]">
              How it works
            </p>
            <h1
              className="mt-4 font-serif t-display text-[#111111]"
              style={{ fontSize: "clamp(2rem, 1.6rem + 2.5vw, 4rem)" }}
            >
              We treat every business as a system.
            </h1>
            <p className="mt-5 t-body text-[#3f3f46]">
              Revenue is lost when the parts — copy, trust signals, navigation,
              proof — aren&apos;t connected to the decision your buyer is
              trying to make. We find what&apos;s broken. We write the fix.
            </p>
          </div>

          {/* Interactive 4-step demo */}
          <HowItWorksDemo />

        </section>

        {/* ── Frameworks list ──────────────────────────────────────────── */}
        <section className="mx-auto max-w-3xl px-4 py-6 sm:px-6">
          <div className="rounded-2xl border border-zinc-200 bg-white p-8">
            <p className="text-xs font-bold uppercase tracking-[0.28em] text-[#1B5EA8]">
              One broken part is all it takes
            </p>
            <h2 className="mt-3 font-serif t-heading text-[#111111]">
              You&apos;re not losing customers. You&apos;re losing them at one exact spot.
            </h2>
            <p className="mt-4 text-sm leading-6 text-[#3f3f46]">
              Someone who wanted to buy hit something confusing, slow, or
              missing — and left. More traffic won&apos;t fix that. More
              content won&apos;t fix that. We find that exact spot, fix it
              first, then move to the next one.
            </p>
            <ul className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
              {frameworks.map((f) => (
                <li key={f} className="flex items-center gap-2 text-sm text-[#3f3f46]">
                  <span className="h-1.5 w-1.5 shrink-0 rounded-full bg-[#1B5EA8]" />
                  {f}
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-8">
            <p className="font-semibold text-[#111111]">
              Ready to see what&apos;s costing you revenue?
            </p>
            <a
              href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
              className="mt-4 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#123A5A] px-9 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors duration-200 hover:bg-[#D87A24] active:bg-[#b8620e] sm:w-auto sm:min-w-[180px]"
            >
              Get Started <ArrowRight size={15} />
            </a>
          </div>
        </section>

        {/* ── Footer ───────────────────────────────────────────────────── */}
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
                    <li><a href="/reports"                                   className="hover:text-black">All Reports</a></li>
                    <li><a href="/reports/operator-school-audit.html"        className="hover:text-black">Associated Training</a></li>
                    <li><a href="/reports/milano-audit.html"                 className="hover:text-black">Milano Family Pizza</a></li>
                    <li><a href="/spcs-report"                               className="hover:text-black">Savannah Personal Care</a></li>
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
