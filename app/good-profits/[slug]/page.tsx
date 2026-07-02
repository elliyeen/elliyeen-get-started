import type { Metadata } from "next";
import { notFound } from "next/navigation";
import SiteNav from "@/app/SiteNav";
import { articles, getArticle } from "@/lib/good-profits";
import { ArrowRight } from "lucide-react";

const BASE_URL = "https://www.elliyeen.com";

export function generateStaticParams() {
  return articles.map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) return {};
  return {
    title: `${article.title} — Good Profit`,
    description: article.description,
    keywords: [
      article.theme.toLowerCase(),
      "good profit",
      "revenue optimization",
      "website audit",
      "Elliyeen Research",
    ],
    alternates: { canonical: `${BASE_URL}/good-profits/${article.slug}` },
    openGraph: {
      type: "article",
      url: `${BASE_URL}/good-profits/${article.slug}`,
      title: article.title,
      description: article.description,
      images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
    },
  };
}

export default async function GoodProfitArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const article = getArticle(slug);
  if (!article) notFound();

  const currentIndex = articles.findIndex((a) => a.slug === slug);
  const prev = currentIndex > 0 ? articles[currentIndex - 1] : null;
  const next =
    currentIndex < articles.length - 1 ? articles[currentIndex + 1] : null;
  const related = articles.filter(
    (_a, i) => i !== currentIndex && i !== currentIndex - 1 && i !== currentIndex + 1
  ).slice(0, 4);

  const articleSchema = {
    "@context": "https://schema.org",
    "@type": "Article",
    "@id": `${BASE_URL}/good-profits/${article.slug}#article`,
    headline: article.title,
    description: article.description,
    url: `${BASE_URL}/good-profits/${article.slug}`,
    datePublished: article.dateISO,
    dateModified: article.dateISO,
    author: { "@type": "Person", name: "Abbas Abdullah", url: BASE_URL },
    publisher: { "@id": `${BASE_URL}/#organization` },
    mainEntityOfPage: `${BASE_URL}/good-profits/${article.slug}`,
    keywords: `${article.theme.toLowerCase()}, good profit, revenue optimization, website audit`,
    isPartOf: { "@id": `${BASE_URL}/good-profits` },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(articleSchema) }}
      />

      <a
        href="#main-content"
        className="skip-link"
      >
        Skip to main content
      </a>

      <main id="main-content" className="min-h-screen bg-[#f7f4ee] text-[#111111]">
        <SiteNav />

        {/* ── Essay container ───────────────────────────────────────────── */}
        <div className="mx-auto max-w-[680px] px-4 sm:px-6">

          {/* Back breadcrumb */}
          <div className="pt-12 sm:pt-16">
            <a
              href="/good-profits"
              className="text-[11px] font-bold uppercase tracking-[0.22em] text-zinc-400 hover:text-zinc-700"
            >
              ← Good Profit
            </a>
          </div>

          {/* Theme tag */}
          <div className="mt-6">
            <span className="rounded-full bg-[#1B5EA8]/10 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.22em] text-[#1B5EA8]">
              {article.theme}
            </span>
          </div>

          {/* Title */}
          <h1 className="mt-4 font-serif t-title text-[#111111]">
            {article.title}
          </h1>

          {/* Meta */}
          <div className="mt-4 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-zinc-400">
            <span>By Abbas Abdullah</span>
            <span aria-hidden="true">·</span>
            <time dateTime={article.dateISO}>{article.date}</time>
            <span aria-hidden="true">·</span>
            <span>{article.readTime} read</span>
            <span aria-hidden="true">·</span>
            <span>Issue #{article.issue}</span>
          </div>

          {/* Divider */}
          <hr className="mt-8 border-zinc-200" />

          {/* ── Essay body ────────────────────────────────────────────── */}
          <article aria-label={article.title} className="py-10">

            {/* Intro */}
            {article.intro.map((para, i) => (
              <p
                key={i}
                className="mb-6 t-body-lg text-zinc-700"
              >
                {para}
              </p>
            ))}

            {/* Sections */}
            {article.sections.map((section, si) => (
              <div key={si} className="mt-2">
                {section.heading && (
                  <h2 className="mb-4 mt-8 t-label text-zinc-400">
                    {section.heading}
                  </h2>
                )}
                {section.paragraphs.map((para, pi) => (
                  <p
                    key={pi}
                    className="mb-6 t-body-lg text-zinc-700"
                  >
                    {para}
                  </p>
                ))}
              </div>
            ))}

          </article>

          {/* Divider */}
          <hr className="border-zinc-200" />

          {/* ── Inline CTA ────────────────────────────────────────────── */}
          <div className="py-10">
            <p className="text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400">
              Apply this to your site
            </p>
            <p className="mt-3 font-serif t-card-title text-[#111111]">
              See what this looks like on a real page.
            </p>
            <p className="mt-2 text-sm leading-[1.75] text-zinc-500">
              Every audit finding ships with the specific replacement — headline,
              CTA, FAQ, trust signal. The fix is in the finding.
            </p>
            <a
              href={`mailto:abdullah@elliyeen.com?subject=Good%20Profit%20Issue%20%23${article.issue}%20%E2%80%94%20audit%20inquiry&body=Hi%20Abbas%2C%0A%0AI%20read%20Issue%20%23${article.issue}%20and%20want%20to%20apply%20this%20to%20my%20site.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D`}
              className="mt-5 inline-flex h-[52px] min-w-[190px] items-center justify-center gap-2 rounded-xl bg-[#123A5A] px-8 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] hover:bg-[#0e2d47]"
            >
              Get Started <ArrowRight size={15} />
            </a>
          </div>

          <hr className="border-zinc-200" />

          {/* ── Prev / Next ───────────────────────────────────────────── */}
          {(prev || next) && (
            <nav aria-label="Article navigation" className="grid grid-cols-2 gap-3 py-8">
              {prev ? (
                <a
                  href={`/good-profits/${prev.slug}`}
                  className="group flex flex-col gap-1"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    ← Issue #{prev.issue}
                  </span>
                  <span className="text-sm font-medium leading-[1.4] text-zinc-700 group-hover:text-[#1B5EA8]">
                    {prev.title}
                  </span>
                </a>
              ) : <div />}
              {next ? (
                <a
                  href={`/good-profits/${next.slug}`}
                  className="group flex flex-col gap-1 text-right"
                >
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                    Issue #{next.issue} →
                  </span>
                  <span className="text-sm font-medium leading-[1.4] text-zinc-700 group-hover:text-[#1B5EA8]">
                    {next.title}
                  </span>
                </a>
              ) : <div />}
            </nav>
          )}

          {/* ── You might also like ───────────────────────────────────── */}
          {related.length > 0 && (
            <>
              <hr className="border-zinc-200" />
              <section aria-label="Related essays" className="py-10">
                <p className="mb-6 text-[11px] font-bold uppercase tracking-[0.24em] text-zinc-400">
                  You might also like
                </p>
                <div className="space-y-0">
                  {related.map((a, i) => (
                    <a
                      key={a.slug}
                      href={`/good-profits/${a.slug}`}
                      className={`group flex items-start justify-between gap-4 border-t border-zinc-200 py-4 hover:opacity-70 transition-opacity${
                        i === related.length - 1 ? " border-b" : ""
                      }`}
                    >
                      <div className="min-w-0">
                        <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-[#1B5EA8]">
                          {a.theme}
                        </p>
                        <p className="text-sm font-medium leading-[1.4] text-zinc-800 group-hover:text-[#1B5EA8]">
                          {a.title}
                        </p>
                      </div>
                      <span className="shrink-0 text-[11px] font-medium text-zinc-400 whitespace-nowrap">
                        {a.readTime} read
                      </span>
                    </a>
                  ))}
                </div>
              </section>
            </>
          )}

        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <footer className="mt-8 border-t border-zinc-100 bg-white">
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
                    <li><a href="/#cases"        className="hover:text-black">Industries</a></li>
                    <li><a href="/#pricing"      className="hover:text-black">Pricing</a></li>
                    <li><a href="/faq"           className="hover:text-black">FAQ</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Resources</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/reports"      className="hover:text-black">Reports</a></li>
                    <li><a href="/good-profits" className="hover:text-black">Good Profit</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Company</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    <li><a href="/about"        className="hover:text-black">About</a></li>
                    <li><a href="/#cases"       className="hover:text-black">Industries</a></li>
                    <li><a href="mailto:abdullah@elliyeen.com" className="hover:text-black">Contact</a></li>
                  </ul>
                </div>
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-zinc-900">Good Profit</p>
                  <ul className="mt-4 space-y-3 text-sm text-zinc-600">
                    {articles.map((a) => (
                      <li key={a.slug}>
                        <a href={`/good-profits/${a.slug}`} className="hover:text-black">
                          Issue #{a.issue}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
            <div className="mt-10 flex flex-col gap-4 border-t border-zinc-100 pt-8 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-zinc-400">
                © {new Date().getFullYear()} Elliyeen Research. All rights reserved.
              </p>
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
