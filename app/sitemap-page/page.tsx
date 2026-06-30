import type { Metadata } from "next";
import { articles } from "@/lib/good-profits";

export const metadata: Metadata = {
  title: "Site Map · Elliyeen Research",
  description: "Every page on elliyeen.com — organized by section with direct links.",
  alternates: { canonical: "https://www.elliyeen.com/sitemap-page" },
};

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

const sections = [
  {
    title: "Main",
    pages: [
      { label: "Home",         href: "/",            desc: "Website audit & revenue diagnosis" },
      { label: "How It Works", href: "/how-it-works", desc: "The 18-framework audit process" },
      { label: "About",        href: "/about",        desc: "Our story and approach" },
      { label: "FAQ",          href: "/faq",          desc: "Common questions answered" },
    ],
  },
  {
    title: "Good Profit",
    pages: [
      { label: "Good Profit — Index", href: "/good-profits", desc: "Essays on earning revenue by serving customers better" },
      ...articles.map((a) => ({
        label: `Issue #${a.issue} — ${a.title}`,
        href: `/good-profits/${a.slug}`,
        desc: a.description,
      })),
    ],
  },
  {
    title: "Reports",
    pages: [
      { label: "All Reports",              href: "/reports",                              desc: "Full index of published audit reports" },
      { label: "Savannah Personal Care",   href: "/spcs-report",                          desc: "Hero copy & FAQ rebuild case study" },
      { label: "So Halal Soul Food",       href: "/revenue_card/so-halal-soul-food",      desc: "Mobile rendering audit · Stone Mountain, GA" },
    ],
  },
  {
    title: "Legal",
    pages: [
      { label: "Privacy Policy",       href: "/privacy",       desc: "How we handle your data" },
      { label: "Terms",                href: "/terms",          desc: "Terms and conditions" },
      { label: "Accessibility",        href: "/accessibility",  desc: "WCAG compliance statement" },
      { label: "Do Not Sell My Data",  href: "/do-not-sell",   desc: "CCPA opt-out request" },
    ],
  },
  {
    title: "Technical",
    pages: [
      { label: "XML Sitemap", href: "/sitemap.xml", desc: "Machine-readable sitemap for search engines" },
    ],
  },
];


export default function SitemapPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">

      {/* Header */}
      <div className="border-b border-zinc-200 bg-white">
        <div className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
          <a href="/" className="text-xs font-bold tracking-[0.22em] text-zinc-400 hover:text-zinc-700">
            ELLIYEEN
          </a>
          <h1 className="mt-4 font-serif t-display">Site Map</h1>
          <p className="mt-3 text-sm leading-6 text-zinc-500">
            Every page on elliyeen.com, organized by section.
          </p>
        </div>
      </div>

      <div className="mx-auto max-w-4xl px-4 py-12 sm:px-6">

        <div className="rounded-2xl border border-zinc-200 bg-white p-6 sm:p-10">
          <div className="space-y-10">
            {sections.map((section) => (
              <div key={section.title}>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                  {section.title}
                </p>
                <ul className="mt-4 space-y-3">
                  {section.pages.map((page) => (
                    <li key={page.href} className="flex flex-col gap-0.5 sm:flex-row sm:items-baseline sm:gap-4">
                      <a
                        href={page.href}
                        className="text-sm font-semibold text-[#1B5EA8] hover:underline underline-offset-2 shrink-0"
                      >
                        {page.label}
                      </a>
                      <span className="text-xs text-zinc-500">{page.desc}</span>
                      <span className="text-[10px] text-zinc-300 sm:ml-auto font-mono">{page.href}</span>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* ── Footer ──────────────────────────────────────────────────── */}
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
                  <li><a href="/#advisor"    className="hover:text-black">See the Work</a></li>
                  <li><a href="/#pricing"    className="hover:text-black">Pricing</a></li>
                  <li><a href="/faq"         className="hover:text-black">FAQ</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Services</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/#cases"   className="hover:text-black">Industries</a></li>
                  <li><a href="/#pricing" className="hover:text-black">Full Audit</a></li>
                </ul>
              </div>
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Company</p>
                <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                  <li><a href="/about"       className="hover:text-black">About</a></li>
                  <li><a href="/#cases"      className="hover:text-black">Industries</a></li>
                  <li><a href={CONTACT_MAILTO} className="hover:text-black">Contact</a></li>
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
              <a href="/privacy"        className="text-sm text-zinc-400 hover:text-black">Privacy Policy</a>
              <a href="/terms"          className="text-sm text-zinc-400 hover:text-black">Terms</a>
              <a href="/accessibility"  className="text-sm text-zinc-400 hover:text-black">Accessibility</a>
              <a href="/do-not-sell"    className="text-sm text-zinc-400 hover:text-black">Do Not Sell My Data</a>
              <a href="/sitemap-page"   className="text-sm text-zinc-400 hover:text-black">Sitemap</a>
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
  );
}
