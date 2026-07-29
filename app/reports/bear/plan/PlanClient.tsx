"use client";

import { useEffect, useState } from "react";
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

type Step = {
  n: number;
  title: string;
  text: string;
  bullets: string[];
  why: string;
  prompt?: string;
};

const steps: Step[] = [
  {
    n: 1,
    title: "Fix what's broken",
    text: "Right now, some words on your homepage are covered up by boxes. That's the first thing to fix — it costs nothing and takes a day.",
    bullets: [
      "Move the floating stat boxes so they don't cover your words",
      "Change your headline to say what makes Bear different: it watches your trades, but never trades for you",
      "Replace your 3 reviews with real trader names, so people believe them",
    ],
    why: "If people can't read your page, nothing else in this plan matters. Fix this before you spend a dollar on growth.",
    prompt: `In the homepage hero, fix three things:
1. The floating stat cards ("Risk management +18% improved", "Win rate +15%") overlap the subheadline text on desktop. Fix the layout so they never overlap — anchor them to flank the medallion graphic only, or move them below the subhead.
2. Rewrite the H1 to lead with the fact that Bear reads every trade but never places one — that's the one claim no competing journal or signal service can make. Give me 3 short options.
3. Replace the three testimonials with a component that requires a real first name and a verifiable detail (e.g. "247 trades logged"), instead of unattributed quotes.`,
  },
  {
    n: 2,
    title: "Make your page load faster",
    text: "Your homepage video takes about 6 seconds to load. Most people leave before that. This is slowing down everything else you do.",
    bullets: ["Shrink the video, or show a picture first and let people tap play", "Test your page on a phone, not just a computer"],
    why: "A slow page loses visitors before they ever read your words. This is a quick technical fix, not a redesign.",
    prompt: `The homepage's Largest Contentful Paint is 6.3 seconds, measured with Lighthouse — the hero autoplay video is the likely cause. Fix this:
1. Add a poster image so the hero shows something instantly instead of waiting on the video.
2. Compress the video file, or lazy-load it so it starts after the page is interactive instead of blocking first paint.
3. Re-run Lighthouse after the fix and confirm LCP is under 2.5s.`,
  },
  {
    n: 3,
    title: "Find your first 20 real traders",
    text: "Ask 20 to 30 traders to try Bear for free. Let them log real trades. This gives you real stories to show other people later.",
    bullets: ["Message traders directly in trading groups — don't post an ad", "Ask each one for a short, honest quote about what Bear told them"],
    why: "People trust real traders more than your own words. You need this proof before you spend money getting more visitors.",
  },
  {
    n: 4,
    title: "Let people share their results",
    text: 'Bear already gives each trader a type, like "The Momentum Chaser." Turn that into a picture people can post on X. This is your cheapest way to get new users.',
    bullets: ["Build a shareable card with the trader's type and one real stat", 'Add a one-tap "Share to X" button'],
    why: "Every share is a free ad, and people trust it more than a real ad — because a trader is vouching for Bear, not you.",
    prompt: `Build a shareable "Trading DNA" result card. Requirements:
1. Auto-generate it the first time a user hits 10 logged trades.
2. Show their archetype name (e.g. "The Momentum Chaser"), their Trader Score, and one real specific stat from their own history — no generic praise.
3. Dark background matching our site's palette, sized for a clean X/Twitter share preview (1200x675).
4. Add a one-tap "Share to X" button that pre-fills a tweet with the card attached, plus a "Copy image" fallback.
5. No dollar amounts or account info on the card by default — let the user opt in if they want to add a P&L stat.
6. Track "card generated" and "card shared" events in PostHog.`,
  },
  {
    n: 5,
    title: "Fix your prices",
    text: "Your free trial costs the same as your most expensive plan right now — that's confusing. Your prices are also too low for what Bear actually does.",
    bullets: [
      "Make a real free plan, with no confusing trial",
      "Raise your main paid plan to about $25–$29 a month",
      'Save your $99.99 "Founding" price for traders who already tried Bear and love it',
    ],
    why: "A low price makes people think Bear isn't as good as it really is. Other trading journals with fewer features already charge more.",
    prompt: `Fix our pricing page and tiers:
1. Remove the free trial that currently converts to the same price as our top paid tier — replace it with a real free plan (unlimited trade logging, capped Coach Bear messages, no expiry).
2. Update the main paid tier's price to $24–29/month.
3. Keep the Founding tier, but cap it at a real number (e.g. 250 spots) and show the remaining count live on the page instead of just claiming spots are limited.`,
  },
  {
    n: 6,
    title: "Watch three simple numbers",
    text: "You don't need fancy numbers yet. Just watch these three things every week.",
    bullets: ["Sign-ups: how many visitors join the waitlist", "Real use: how many of them actually log a trade", "Return: how many come back the next week"],
    why: "These three numbers tell you if Bear is working before you spend money to grow faster. If people log a trade but never come back, that's your next problem to solve — not more sign-ups.",
    prompt: `Confirm PostHog is tracking three events, and add whichever are missing:
1. "waitlist_signup" — fires when someone joins the waitlist.
2. "trade_logged" — fires the first time a user logs a trade.
3. "coach_bear_first_response" — fires the first time a user gets a response from Coach Bear.
Then build a simple internal dashboard (or a PostHog insight) that shows, per week: total signups, signup-to-trade-logged conversion rate, and how many of last week's activated users logged a trade again this week.`,
  },
];

function stepKey(n: number) {
  return `bear-plan-step-${n}`;
}

export default function PlanClient() {
  const [done, setDone] = useState<Record<number, boolean>>({});

  useEffect(() => {
    const next: Record<number, boolean> = {};
    for (const s of steps) {
      next[s.n] = typeof window !== "undefined" && localStorage.getItem(stepKey(s.n)) === "1";
    }
    setDone(next);
  }, []);

  function toggle(n: number) {
    setDone((prev) => {
      const isDone = !prev[n];
      try {
        localStorage.setItem(stepKey(n), isDone ? "1" : "0");
      } catch {}
      return { ...prev, [n]: isDone };
    });
  }

  const doneCount = Object.values(done).filter(Boolean).length;

  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <SiteNav />

      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
          Read This, Then Do It
        </p>
        <h1 className="mt-4 font-serif t-title text-zinc-900">Do these 6 things. In this order. Bear grows.</h1>
        <p className="mt-4 max-w-xl t-body text-zinc-600">
          Skip step one, and step four won&rsquo;t work. Do them in order. Check off each one the moment
          it&rsquo;s done &mdash; and watch what happens next.
        </p>

        <div className="mt-4">
          <Link href="/reports/bear" className="text-sm font-semibold" style={{ color: BLUE }}>
            &larr; Back to the full audit
          </Link>
        </div>

        <div className="mt-8">
          <div className="mb-2 flex items-baseline justify-between text-sm text-zinc-500">
            <span>Your progress</span>
            <span><b className="font-mono text-zinc-800">{doneCount}</b> of 6 done</span>
          </div>
          <div className="h-2 overflow-hidden rounded-full bg-zinc-200">
            <div
              className="h-full rounded-full transition-all duration-300"
              style={{ width: `${(doneCount / 6) * 100}%`, background: BLUE }}
            />
          </div>
        </div>

        <div className="mt-10 space-y-4">
          {steps.map((s) => {
            const isDone = !!done[s.n];
            return (
              <div
                key={s.n}
                className={`rounded-2xl border bg-white p-6 transition ${isDone ? "border-emerald-400" : "border-zinc-200"}`}
              >
                <div className="flex items-start gap-4">
                  <div className={`flex h-9 w-9 shrink-0 items-center justify-center font-mono text-base font-bold ${isDone ? "text-emerald-500" : "text-zinc-800"}`}>
                    {isDone ? <Check size={20} /> : s.n}
                  </div>
                  <div className="min-w-0 flex-1">
                    <h2 className="font-serif text-lg font-bold text-zinc-900">{s.title}</h2>
                    <p className="mt-1.5 text-[15px] leading-6 text-zinc-700">{s.text}</p>

                    <ul className="mt-3 space-y-2 border-t border-zinc-100 pt-3">
                      {s.bullets.map((b) => (
                        <li key={b} className="flex gap-2 text-sm leading-6 text-zinc-700">
                          <span className="mt-1 h-1 w-1 shrink-0 rounded-full" style={{ background: BLUE }} />
                          {b}
                        </li>
                      ))}
                    </ul>

                    {s.prompt && (
                      <div className="mt-4 rounded-xl border border-zinc-100 bg-[#faf9f6] p-4">
                        <div className="flex items-center justify-between gap-3">
                          <span className="text-[11px] font-bold uppercase tracking-wide text-zinc-500">
                            Claude prompt
                          </span>
                          <CopyButton text={s.prompt} />
                        </div>
                        <pre className="mt-2 whitespace-pre-wrap font-mono text-[12px] leading-5 text-zinc-700">
                          {s.prompt}
                        </pre>
                      </div>
                    )}

                    <div className="mt-4 rounded-lg bg-[#faf9f6] px-3 py-2.5 text-[13px] leading-5 text-zinc-500">
                      <b className="text-zinc-700">Why this matters:</b> {s.why}
                    </div>

                    <button
                      onClick={() => toggle(s.n)}
                      className="mt-4 rounded-full px-4 py-2 text-sm font-semibold text-white transition hover:opacity-90"
                      style={{ background: isDone ? "#10b981" : BLUE }}
                    >
                      {isDone ? "Done" : "Mark as done"}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <div className="mt-12 rounded-2xl border border-zinc-200 bg-white p-8 text-center">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Your site</p>
          <h2 className="mt-4 font-serif t-title text-zinc-900">Want a plan like this for your site?</h2>
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
