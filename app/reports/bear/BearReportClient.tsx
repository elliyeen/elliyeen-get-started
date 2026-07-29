"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import SiteNav from "@/app/SiteNav";
import { Copy, Check, ArrowRight } from "lucide-react";

const BLUE = "#1B5EA8";

function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <button
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1800);
      }}
      className={`inline-flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold transition ${
        copied ? "bg-emerald-50 text-emerald-700" : "bg-zinc-100 text-zinc-600 hover:bg-zinc-200"
      }`}
    >
      {copied ? <Check size={12} /> : <Copy size={12} />}
      {copied ? "Copied" : "Copy"}
    </button>
  );
}

function SevTag({ level }: { level: "crit" | "mod" | "low" | "note" }) {
  const styles = {
    crit: "bg-red-50 text-red-600",
    mod: "bg-amber-50 text-amber-700",
    low: "bg-emerald-50 text-emerald-700",
    note: "bg-blue-50 text-[#1B5EA8]",
  } as const;
  const labels = { crit: "Bug", mod: "Moderate", low: "Low", note: "Note" } as const;
  return (
    <span className={`self-start shrink-0 rounded-full px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide ${styles[level]}`}>
      {labels[level]}
    </span>
  );
}

function Finding({
  level,
  title,
  children,
}: {
  level: "crit" | "mod" | "low" | "note";
  title: string;
  children: React.ReactNode;
}) {
  return (
    <div className="grid grid-cols-[88px_1fr] gap-4 border-t border-zinc-200 py-5 first:border-none sm:grid-cols-[110px_1fr]">
      <SevTag level={level} />
      <div>
        <h3 className="font-serif text-[17px] font-semibold text-zinc-900">{title}</h3>
        <div className="mt-1.5 text-sm leading-6 text-zinc-600">{children}</div>
      </div>
    </div>
  );
}

function Section({
  id,
  eyebrow,
  title,
  dek,
  children,
}: {
  id: string;
  eyebrow: string;
  title: string;
  dek?: string;
  children: React.ReactNode;
}) {
  return (
    <section id={id} className="scroll-mt-24 border-t border-zinc-200 py-14 first:border-none first:pt-0">
      <p className="text-xs font-bold uppercase tracking-[0.24em] text-zinc-400">{eyebrow}</p>
      <h2 className="mt-3 font-serif t-heading text-zinc-900">{title}</h2>
      {dek && <p className="mt-3 max-w-2xl text-[15px] leading-7 text-zinc-600">{dek}</p>}
      <div className="mt-8">{children}</div>
    </section>
  );
}

const promptStep1 = `In the homepage hero, fix three things:
1. The floating stat cards ("Risk management +18% improved", "Win rate +15%") overlap the subheadline text on desktop. Fix the layout so they never overlap — anchor them to flank the medallion graphic only, or move them below the subhead.
2. Rewrite the H1 to lead with the fact that Bear reads every trade but never places one — that's the one claim no competing journal or signal service can make. Give me 3 short options.
3. Replace the three testimonials with a component that requires a real first name and a verifiable detail (e.g. "247 trades logged"), instead of unattributed quotes.`;

const promptStep2 = `The homepage's Largest Contentful Paint is 6.3 seconds, measured with Lighthouse — the hero autoplay video is the likely cause. Fix this:
1. Add a poster image so the hero shows something instantly instead of waiting on the video.
2. Compress the video file, or lazy-load it so it starts after the page is interactive instead of blocking first paint.
3. Re-run Lighthouse after the fix and confirm LCP is under 2.5s.`;

const promptDNA = `Build a shareable "Trading DNA" result card. Requirements:
1. Auto-generate it the first time a user hits 10 logged trades.
2. Show their archetype name (e.g. "The Momentum Chaser"), their Trader Score, and one real specific stat from their own history — no generic praise.
3. Dark background matching our site's palette, sized for a clean X/Twitter share preview (1200x675).
4. Add a one-tap "Share to X" button that pre-fills a tweet with the card attached, plus a "Copy image" fallback.
5. No dollar amounts or account info on the card by default — let the user opt in if they want to add a P&L stat.
6. Track "card generated" and "card shared" events in PostHog.`;

const promptPricing = `Fix our pricing page and tiers:
1. Remove the free trial that currently converts to the same price as our top paid tier — replace it with a real free plan (unlimited trade logging, capped Coach Bear messages, no expiry).
2. Update the main paid tier's price to $24–29/month.
3. Keep the Founding tier, but cap it at a real number (e.g. 250 spots) and show the remaining count live on the page instead of just claiming spots are limited.`;

export default function BearReportClient() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <SiteNav />

      <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
        {/* Masthead */}
        <div className="border-b border-zinc-200 pb-8">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
            Website Audit · withbear.app
          </p>
          <h1 className="mt-4 font-serif t-display text-zinc-900">BEAR: Audit &amp; Go-To-Market Plan</h1>
          <p className="mt-4 max-w-2xl t-body text-zinc-600">
            A full-surface review of BEAR&rsquo;s pre-launch waitlist site &mdash; security posture, technical
            hygiene, design/UX, and copy &mdash; followed by a phased GTM plan, pricing strategy, and growth
            metrics for the waitlist-to-launch window.
          </p>
          <div className="mt-6 flex flex-wrap gap-x-6 gap-y-2 text-xs text-zinc-500">
            <span><b className="text-zinc-800">Reviewed</b> July 2026</span>
            <span><b className="text-zinc-800">Stage</b> Pre-launch, waitlist gated</span>
            <span><b className="text-zinc-800">Stack</b> Next.js on Vercel, PostHog analytics</span>
          </div>
          <div className="mt-4">
            <Link href="/reports/bear/plan" className="text-sm font-semibold" style={{ color: BLUE }}>
              Prefer a simple checklist? See the six-step plan &rarr;
            </Link>
          </div>
        </div>

        {/* Quick nav */}
        <div className="mt-6 flex flex-wrap gap-2">
          {[
            ["overview", "Overview"],
            ["security", "Security"],
            ["design", "Design & UX"],
            ["copy", "Copy"],
            ["gtm", "GTM Plan"],
            ["moat", "Moat & Virality"],
            ["pricing", "Pricing"],
            ["metrics", "Growth Metrics"],
          ].map(([href, label]) => (
            <a
              key={href}
              href={`#${href}`}
              className="rounded-md border border-zinc-200 bg-white px-3 py-1.5 text-xs font-semibold text-zinc-600 transition hover:border-zinc-400 hover:text-zinc-900"
            >
              {label}
            </a>
          ))}
        </div>

        <Section id="overview" eyebrow="01 · Overview" title="Where BEAR stands">
          <p className="text-[15px] leading-7 text-zinc-600">
            BEAR is an AI trading coach &mdash; it reads a trader&rsquo;s logged history, names costly
            behavioral patterns, and coaches in one voice (&ldquo;Coach Bear&rdquo;). Explicitly read-only
            and non-custodial: it never places trades. The site itself is a single-page marketing site in
            waitlist mode; the product is gated behind auth and not yet live to the public.
          </p>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-[15px] leading-7 text-zinc-700">
              <b className="text-zinc-900">The positioning is genuinely strong.</b> &ldquo;Game film for
              traders&rdquo; and &ldquo;a coach with the receipts&rdquo; are sharp, ownable lines. The
              read-only, non-custodial framing works as both a trust argument and a legal shield.
            </p>
            <p className="mt-3 text-[15px] leading-7 text-zinc-700">
              The site&rsquo;s execution has a layout bug in the hero, a 6.3-second load time, thin
              technical hardening for a product that will eventually touch brokerage data, and a pricing
              ladder priced below what the market already pays for less &mdash; all fixable before the
              waitlist converts to launch.
            </p>
          </div>
        </Section>

        <Section
          id="security"
          eyebrow="02 · Security & Performance"
          title="Measured, not guessed"
          dek="Assessed via response headers, TLS configuration, route probing, and a real Lighthouse run — not visual judgment."
        >
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              ["60", "Performance", "text-red-500"],
              ["94", "Accessibility", "text-emerald-600"],
              ["100", "Best Practices", "text-emerald-600"],
              ["100", "SEO Structure", "text-emerald-600"],
            ].map(([n, l, c]) => (
              <div key={l} className="rounded-2xl border border-zinc-200 bg-white p-4 text-center">
                <div className={`font-mono text-2xl font-bold ${c}`}>{n}</div>
                <div className="mt-1 text-[11px] font-semibold uppercase tracking-wide text-zinc-500">{l}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white px-6">
            <Finding level="crit" title="LCP is 6.3s — nearly 3x the &ldquo;good&rdquo; threshold">
              Largest Contentful Paint measured at 6.3s (target under 2.5s). The hero autoplay video is the
              near-certain culprit. A trader on a phone at 11pm who sees nothing for 6 seconds has already left.
            </Finding>
            <Finding level="mod" title="No Content-Security-Policy header">
              HSTS, X-Content-Type-Options, and X-Frame-Options are present, but no CSP — the standard next
              layer against injected scripts, worth having before brokerage data enters the picture.
            </Finding>
            <Finding level="low" title="Viewport zoom is disabled">
              <code className="rounded bg-zinc-100 px-1 py-0.5 text-xs">user-scalable=no</code> blocks
              pinch-to-zoom — the one real accessibility failure Lighthouse caught, and easy to remove.
            </Finding>
            <Finding level="note" title="TLS and transport are solid">
              Valid wildcard cert, HSTS with a 2-year max-age, HTTPS enforced throughout. No issues found.
            </Finding>
          </div>
        </Section>

        <Section
          id="design"
          eyebrow="03 · Design & UX"
          title="What the screen actually shows"
          dek="Reviewed live at desktop and mobile viewports (390×844)."
        >
          <div className="grid gap-4 sm:grid-cols-2">
            <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <Image src="/reports/bear/desktop-hero.png" alt="BEAR homepage hero, desktop" width={1200} height={800} className="w-full" />
              <figcaption className="border-t border-zinc-200 px-4 py-2.5 text-xs text-zinc-500">
                Desktop hero — stat cards overlap the subhead
              </figcaption>
            </figure>
            <figure className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <Image src="/reports/bear/mobile-hero.png" alt="BEAR homepage hero, mobile" width={600} height={1200} className="w-full" />
              <figcaption className="border-t border-zinc-200 px-4 py-2.5 text-xs text-zinc-500">
                Mobile hero — clean, no overlap at this size
              </figcaption>
            </figure>
          </div>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white px-6">
            <Finding level="crit" title="Hero stat cards overlap the subheadline (desktop only)">
              Confirmed via Lighthouse + live rendering: the overlap bug only exists at desktop widths. Mobile
              hides the floating cards entirely and renders clean — scope the fix accordingly.
            </Finding>
            <Finding level="mod" title="Pricing sits ahead of proof">
              The pricing ladder is fully built out before any visitor can use the product, with only three
              unattributed testimonials as proof.
            </Finding>
            <Finding level="note" title="What&rsquo;s working">
              The waitlist page (bear&rsquo;s eyes, single field, one CTA) is the best-executed screen on the
              site, on any device &mdash; the homepage hero should learn from its restraint.
            </Finding>
          </div>
        </Section>

        <Section
          id="copy"
          eyebrow="04 · Copy & Positioning"
          title="The claim is buried in paragraph three"
        >
          <blockquote className="border-l-2 pl-4 text-[15px] italic leading-7 text-zinc-600" style={{ borderColor: BLUE }}>
            &ldquo;You size up after two wins. That&rsquo;s your pattern, and it&rsquo;s the most expensive
            one you have.&rdquo;
          </blockquote>
          <p className="mt-4 text-[15px] leading-7 text-zinc-600">
            This is the strongest copy on the site &mdash; specific, evidence-based, slightly uncomfortable.
            It does more selling than any feature bullet.
          </p>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="text-[15px] leading-7 text-zinc-700">
              <b className="text-zinc-900">The preemptive claim is buried.</b> &ldquo;Bear reads; Bear never
              trades for you&rdquo; appears four times across the page but never as the load-bearing
              headline. It&rsquo;s the entire wedge against journals and signal services &mdash; it should be
              the first sentence, not the third section.
            </p>
          </div>
        </Section>

        <Section
          id="gtm"
          eyebrow="05 · GTM Plan"
          title="Fix, then prove, then grow"
          dek="Four phases, sequenced so proof exists before spend."
        >
          <div className="space-y-5">
            {[
              ["Weeks 1–2", "Fix the trust surface", "Hero bug, testimonial attribution, security headers, H1 rewrite — before a single paid visitor arrives."],
              ["Weeks 2–5", "Seed proof before spend", "Recruit 20–30 beta traders directly, ship 3–5 named case studies, replace the medallion with a real demo."],
              ["Weeks 5–8", "Open the funnel", "Organic-first on FinTwit, small trading-educator partnerships, flip off noindex, add real waitlist scarcity."],
              ["Weeks 8–12", "Launch to the waitlist", "Cohorted invites (100–200 at a time), Founding tier sold to the proven beta cohort, not cold traffic."],
            ].map(([w, t, d]) => (
              <div key={t} className="grid grid-cols-[90px_1fr] gap-4 border-t border-zinc-200 pt-5 first:border-none first:pt-0">
                <span className="font-mono text-xs" style={{ color: BLUE }}>{w}</span>
                <div>
                  <h3 className="font-serif text-[16px] font-semibold text-zinc-900">{t}</h3>
                  <p className="mt-1 text-sm leading-6 text-zinc-600">{d}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Claude prompt · Fix the hero</p>
                <CopyButton text={promptStep1} />
              </div>
              <pre className="mt-3 whitespace-pre-wrap font-mono text-[12.5px] leading-6 text-zinc-700">{promptStep1}</pre>
            </div>
            <div className="rounded-2xl border border-zinc-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Claude prompt · Fix load speed</p>
                <CopyButton text={promptStep2} />
              </div>
              <pre className="mt-3 whitespace-pre-wrap font-mono text-[12.5px] leading-6 text-zinc-700">{promptStep2}</pre>
            </div>
          </div>
        </Section>

        <Section
          id="moat"
          eyebrow="06 · Moat & Virality"
          title="Trading DNA is a viral loop sitting unused"
          dek='BEAR already computes a shareable, named archetype ("The Momentum Chaser") and a Trader Score — structurally identical to Spotify Wrapped or Wordle. It is currently buried as feature #5 of 8.'
        >
          <div className="rounded-2xl border-2 bg-blue-50/40 p-6" style={{ borderColor: BLUE }}>
            <p className="text-[15px] leading-7 text-zinc-700">
              Ship a shareable, branded result card that generates automatically after a user&rsquo;s first
              10 logged trades, with a one-tap share to X. Every share is a free, high-trust impression in
              front of an audience that already self-selects as traders &mdash; the cheapest CAC channel
              available, because the poster is vouching for the product themselves.
            </p>
          </div>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Claude prompt · Trading DNA share card</p>
              <CopyButton text={promptDNA} />
            </div>
            <pre className="mt-3 whitespace-pre-wrap font-mono text-[12.5px] leading-6 text-zinc-700">{promptDNA}</pre>
          </div>

          <div className="mt-8 overflow-x-auto">
            <table className="w-full min-w-[560px] border-collapse text-sm">
              <thead>
                <tr className="border-b border-zinc-200 text-left text-[11px] font-bold uppercase tracking-wide text-zinc-400">
                  <th className="pb-3 pr-4">Layer</th>
                  <th className="pb-3 pr-4">Weak (copyable in a quarter)</th>
                  <th className="pb-3">Strong (compounds)</th>
                </tr>
              </thead>
              <tbody className="text-zinc-600">
                {[
                  ["Personalization", "“AI reads your trades”", "Coaching gets sharper the longer a trader stays"],
                  ["Category", "“AI trading coach” (generic)", "Own “game film for traders” as the category name"],
                  ["Trust", "“We’re read-only” (a claim)", "Read-only architecture is expensive for an incumbent to retrofit"],
                  ["Switching cost", "None today", "Months of logged “game film” becomes an archive worth keeping"],
                ].map((row) => (
                  <tr key={row[0]} className="border-b border-zinc-100">
                    <td className="py-3 pr-4 font-semibold text-zinc-800">{row[0]}</td>
                    <td className="py-3 pr-4">{row[1]}</td>
                    <td className="py-3">{row[2]}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>

        <Section
          id="pricing"
          eyebrow="07 · Pricing"
          title="Priced like a commodity, written like a premium coach"
          dek="Established journals with less capability already charge more than BEAR's mid tier: Tradervue and TraderSync run up to $79.99/mo for a plain journal — no coaching layer at all."
        >
          <div className="grid gap-4 sm:grid-cols-3">
            {[
              { tier: "Free", price: "$0", features: ["Unlimited trade logging", "Trading DNA share card", "~5 Coach Bear msgs/mo"], note: "Replaces the confusing 7-day trial." },
              { tier: "Pro", price: "$24–29", sub: "/mo", was: "was $10.99–20.99", features: ["Unlimited Coach Bear", "Full behavioral analytics", "Weekly reports"], note: "Priced at parity with Tradervue/TraderSync — a coach is a bigger claim than a journal.", reco: true },
              { tier: "Founding", price: "$59–79", sub: "/mo", was: "was $99.99", features: ["Everything in Pro, for life", "Real capped spots, shown live", "Direct line to the founder"], note: "Sell to the warm beta cohort, not cold visitors." },
            ].map((c) => (
              <div
                key={c.tier}
                className={`relative rounded-2xl border bg-white p-5 ${c.reco ? "border-2" : "border-zinc-200"}`}
                style={c.reco ? { borderColor: BLUE } : {}}
              >
                {c.reco && (
                  <span
                    className="absolute -top-3 left-4 rounded-full px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-white"
                    style={{ background: BLUE }}
                  >
                    Recommended
                  </span>
                )}
                <p className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">{c.tier}</p>
                <p className="mt-2 font-mono text-2xl font-bold text-zinc-900">
                  {c.price}
                  {c.sub && <span className="text-sm font-medium text-zinc-500">{c.sub}</span>}
                </p>
                {c.was && <p className="text-xs text-zinc-400 line-through">{c.was}</p>}
                <ul className="mt-3 space-y-1.5 border-t border-zinc-100 pt-3 text-[13px] text-zinc-700">
                  {c.features.map((f) => (
                    <li key={f} className="flex gap-1.5">
                      <span style={{ color: BLUE }}>✓</span> {f}
                    </li>
                  ))}
                </ul>
                <p className="mt-3 border-t border-dashed border-zinc-200 pt-3 text-xs leading-5 text-zinc-500">{c.note}</p>
              </div>
            ))}
          </div>
          <div className="mt-6 rounded-2xl border border-zinc-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <p className="text-xs font-bold uppercase tracking-wide text-zinc-500">Claude prompt · Fix pricing tiers</p>
              <CopyButton text={promptPricing} />
            </div>
            <pre className="mt-3 whitespace-pre-wrap font-mono text-[12.5px] leading-6 text-zinc-700">{promptPricing}</pre>
          </div>
        </Section>

        <Section
          id="metrics"
          eyebrow="08 · Growth Metrics"
          title="What to watch for the first 1,000 users"
          dek="CAC and LTV are premature at this scale. Watch whether the core loop works, and whether it spreads."
        >
          <div className="space-y-4">
            {[
              ["Visitor → waitlist signup rate", "target 15–25%", "Cheapest, fastest read on whether the hero and copy convert."],
              ["Activation rate", "signup → first trade logged", "Tests the real product promise, not just curiosity."],
              ["Week-1 / Week-4 retention", "of activated users only", "Tells you if this is a habit or a novelty."],
              ["Referral k-factor", ">0.3 is a real signal", "Tells you if the referral loop is doing any work."],
              ["Sean Ellis PMF score", "≥40% “very disappointed”", "The standard early-stage signal — works at low N."],
            ].map(([n, t, w]) => (
              <div key={n} className="grid grid-cols-1 gap-1 border-t border-zinc-200 pt-4 first:border-none first:pt-0 sm:grid-cols-[1.4fr_1fr_2fr] sm:items-baseline sm:gap-4">
                <span className="font-semibold text-zinc-800">{n}</span>
                <span className="font-mono text-xs" style={{ color: BLUE }}>{t}</span>
                <span className="text-sm text-zinc-500">{w}</span>
              </div>
            ))}
          </div>
        </Section>

        {/* CTA */}
        <div className="mt-16 rounded-2xl border border-zinc-200 bg-white p-8 text-center sm:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Your site</p>
          <h2 className="mt-4 font-serif t-title text-zinc-900">Want a report like this on your site?</h2>
          <a
            href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry"
            className="mt-6 inline-flex items-center justify-center gap-2 rounded-xl px-6 py-3 text-sm font-bold text-white transition hover:opacity-90"
            style={{ background: BLUE }}
          >
            Get your free diagnosis <ArrowRight size={16} />
          </a>
        </div>
      </div>
    </main>
  );
}
