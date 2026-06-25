"use client";

import { useRef, useState } from "react";
import { ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";

const ALL_CASES = [
  {
    industry: "Hospitality",
    tag: "Hospitality",
    title: "Milano Family Pizza",
    location: "Richardson, TX",
    body: "Two live websites — different phone numbers, conflicting hours, split SEO authority, no conversion path on either. A 22-agent audit scored both properties and modeled the revenue sitting uncaptured.",
    metrics: [
      "Overall conductor score: 19/100 — not broken, invisible to buyers",
      "30-day fix unlocks +$6,960/month without new ad spend",
      "12-month roadmap adds +$36,600/month — domain, trust, specials",
    ],
    image: "https://images.unsplash.com/photo-1513104890138-7c749659a591?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Fresh pizza with toppings coming out of a wood-fired oven",
    href: "/reports/milano-audit.html",
    reportLabel: "Read the full audit report",
    secondaryHref: "",
    secondaryLabel: "",
  },
  {
    industry: "Hospitality",
    tag: "Hospitality",
    title: "So Halal Soul Food",
    location: "Stone Mountain, GA",
    body: "Halal-certified soul food with 60+ menu items and active social channels — but the site body renders at 1336px on a 390px phone screen. Every customer arriving from Instagram or TikTok hits a broken page before they can order.",
    metrics: [
      "Mobile rendering failure: 1336px body on 390px viewport — 71% of page hidden",
      "0 broken links — but /blank-1 and /blank-2 URL slugs destroying SEO",
      "3 ranked profit opportunities: mobile fix (91), Otter redirect (79), bundle (74)",
    ],
    image: "/reports/sohalal/sohalal-card.jpg",
    imageAlt: "So Halal Soul Food — Stone Mountain, GA",
    href: "/reports/sohalal",
    reportLabel: "Read the full audit report",
    secondaryHref: "",
    secondaryLabel: "",
  },
  {
    industry: "Home Care",
    tag: "Home Care",
    title: "Savannah Personal Care",
    location: "Savannah, GA",
    body: "The FAQ had Wix placeholder questions. The hero didn't speak to the fear the adult daughter feels at 11pm making this decision. We rebuilt the copy, structure, and local SEO around the real buyer moment.",
    metrics: [
      "FAQ replaced with 7 questions families actually ask before calling",
      "Hero rebuilt to speak to the adult daughter deciding alone at night",
      "Structured for 'home care Savannah' searches — previously invisible",
    ],
    image: "https://images.unsplash.com/photo-1584515933487-779824d29309?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Home caregiver assisting an elderly patient indoors",
    href: "/spcs-report",
    reportLabel: "Read the full audit report",
    secondaryHref: "https://elliyeen.github.io/savannah-pcs/",
    secondaryLabel: "Experience the new site",
  },
  {
    industry: "Financial Services",
    tag: "Financial Services",
    title: "Wealth Management Firm",
    location: "Southeast US",
    body: "Prospects were arriving informed but not converting. We identified three objections the site never answered and restructured the intake flow to address each one before the CTA.",
    metrics: [
      "Found 3 objections stopping conversion — none addressed anywhere on site",
      "Intake flow rebuilt so each objection is dissolved before the CTA",
      "Response time stated explicitly — previously undefined, causing hesitation",
    ],
    image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "Financial advisor reviewing documents with a client at a desk",
    href: "/reports/sax-audit",
    reportLabel: "Read the full audit report",
    secondaryHref: "",
    secondaryLabel: "",
  },
  {
    industry: "Education",
    tag: "Education / Sports",
    title: "College Golf Program",
    location: "Division I",
    body: "Recruiting pages described the program. They didn't speak to the recruit's fear of choosing the wrong school. We rebuilt the narrative around the actual decision a 17-year-old athlete makes.",
    metrics: [
      "Named the recruit's core fear: choosing wrong and wasting eligibility",
      "Stats page rebuilt to answer 'Can I actually play here?' — the real question",
      "Scholarship language added — most-searched topic, previously absent",
    ],
    image: "https://images.unsplash.com/photo-1535131749006-b7f58c99034b?q=80&w=1200&auto=format&fit=crop",
    imageAlt: "College golfer lining up a putt on a green during a tournament",
    href: "/reports/golf-program-audit.html",
    reportLabel: "Read the full audit report",
    secondaryHref: "",
    secondaryLabel: "",
  },
];

const TABS = ["All", "Hospitality", "Home Care", "Financial Services", "Education"];

export default function CasesCarousel() {
  const [activeTab, setActiveTab] = useState("All");
  const trackRef = useRef<HTMLDivElement>(null);

  const visible =
    activeTab === "All"
      ? ALL_CASES
      : ALL_CASES.filter((c) => c.industry === activeTab);

  const scroll = (dir: "left" | "right") => {
    const track = trackRef.current;
    if (!track) return;
    const card = track.querySelector("article");
    const step = card ? card.clientWidth + 20 : 360;
    track.scrollBy({ left: dir === "right" ? step : -step, behavior: "smooth" });
  };

  return (
    <div>
      {/* Header row: tabs + arrows */}
      <div className="mb-5 flex items-center justify-between gap-3">
        <div className="flex flex-wrap gap-2">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => {
                setActiveTab(tab);
                // Reset scroll on filter change
                if (trackRef.current) trackRef.current.scrollLeft = 0;
              }}
              className={`rounded-full px-3 py-1.5 text-xs font-semibold transition-colors ${
                activeTab === tab
                  ? "bg-[#0D1B2A] text-white"
                  : "bg-zinc-100 text-zinc-500 hover:bg-zinc-200 hover:text-zinc-700"
              }`}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Arrow controls */}
        <div className="flex shrink-0 gap-2">
          <button
            onClick={() => scroll("left")}
            aria-label="Scroll left"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900"
          >
            <ArrowLeft size={14} />
          </button>
          <button
            onClick={() => scroll("right")}
            aria-label="Scroll right"
            className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 bg-white text-zinc-500 transition-colors hover:border-zinc-400 hover:text-zinc-900"
          >
            <ArrowRight size={14} />
          </button>
        </div>
      </div>

      {/* Scrollable track with right fade */}
      <div className="relative">
        <div
          ref={trackRef}
          className="flex gap-5 overflow-x-auto scroll-smooth pb-3"
          style={{
            scrollSnapType: "x mandatory",
            scrollbarWidth: "none",
            msOverflowStyle: "none",
          }}
        >
          {visible.map((item) => (
            <article
              key={item.title}
              className="flex w-[300px] shrink-0 flex-col overflow-hidden rounded-2xl border border-zinc-200 bg-white sm:w-[340px]"
              style={{ scrollSnapAlign: "start" }}
            >
              {/* Image */}
              <div className="relative h-44 overflow-hidden bg-zinc-100">
                <img
                  src={item.image}
                  alt={item.imageAlt}
                  className="h-full w-full object-cover transition-transform duration-500 hover:scale-105"
                />
                {/* Industry tag */}
                <span className="absolute left-3 top-3 rounded-full bg-black/50 px-2.5 py-1 text-[10px] font-bold uppercase tracking-widest text-white backdrop-blur-sm">
                  {item.tag}
                </span>
              </div>

              {/* Body */}
              <div className="flex flex-1 flex-col p-5">
                <div className="flex items-baseline justify-between gap-2">
                  <h3 className="text-base font-bold leading-tight">{item.title}</h3>
                  <span className="shrink-0 text-xs text-zinc-400">{item.location}</span>
                </div>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.body}</p>

                {/* Metrics */}
                <div className="mt-4 grid gap-2">
                  {item.metrics.map((m) => (
                    <div key={m} className="flex items-start gap-2 text-xs leading-5 text-zinc-600">
                      <CheckCircle2 size={13} className="mt-0.5 shrink-0 text-[#1B5EA8]" />
                      {m}
                    </div>
                  ))}
                </div>

                {/* CTA */}
                {item.href && item.reportLabel && (
                  <div className="mt-auto border-t border-zinc-100 pt-4 flex flex-col gap-2">
                    <a
                      href={item.href}
                      target={item.href.startsWith("https://") ? "_blank" : undefined}
                      rel={item.href.startsWith("https://") ? "noopener noreferrer" : undefined}
                      className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#1B5EA8] hover:underline"
                    >
                      {item.reportLabel} <ArrowRight size={13} />
                    </a>
                    {item.secondaryHref && item.secondaryLabel && (
                      <a
                        href={item.secondaryHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-sm font-medium text-zinc-500 hover:text-zinc-800 hover:underline"
                      >
                        {item.secondaryLabel} <ArrowRight size={13} />
                      </a>
                    )}
                  </div>
                )}
              </div>
            </article>
          ))}
        </div>

        {/* Right fade mask */}
        <div className="pointer-events-none absolute right-0 top-0 h-full w-16 bg-gradient-to-l from-white to-transparent" />
      </div>
    </div>
  );
}
