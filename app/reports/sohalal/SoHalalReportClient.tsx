"use client";

import { useState, useEffect, useRef } from "react";
import {
  AlertTriangle,
  CheckCircle2,
  XCircle,
  ArrowUpRight,
  ArrowUp,
  ChevronDown,
  X,
  ChevronRight,
  ChevronLeft,
  TrendingUp,
  Smartphone,
  DollarSign,
  BarChart3,
} from "lucide-react";
import SiteNav from "@/app/SiteNav";

// ─── DATA ─────────────────────────────────────────────────────────────────────

const WIZARD_STEPS = [
  {
    step: "1 of 5",
    title: "The site is broken on every phone.",
    body: "Every customer who finds So Halal on Instagram or TikTok taps the link and lands on a page that requires horizontal scrolling. 71% of the page is hidden. Most leave before seeing the menu.",
    stats: [
      { n: "1336px", label: "body width on mobile", color: "red" },
      { n: "390px", label: "iPhone 14 screen width", color: "blue" },
      { n: "71%", label: "of the page hidden", color: "red" },
    ],
    evidence: "[VERIFIED] — measured live, 2026-06-25",
  },
  {
    step: "2 of 5",
    title: "Three revenue leaks, all fixable within 30 days.",
    body: "The mobile failure blocks every customer who found the site. The Otter redirect adds friction at peak ordering intent. No bundle means every order is built item-by-item — the lowest-AOV path.",
    stats: [
      { n: "$0", label: "cost to fix mobile rendering", color: "green" },
      { n: "2–4 hrs", label: "time to fix in Wix Mobile Editor", color: "blue" },
      { n: "3", label: "ranked profit opportunities", color: "blue" },
    ],
    evidence: "[VERIFIED + BENCHMARK]",
  },
  {
    step: "3 of 5",
    title: "Revenue sitting uncaptured — modeled from menu pricing.",
    body: "No POS data was available. These estimates use verified menu pricing, operating schedule, and QSR benchmarks. The mobile fix alone is estimated to recover $2,000–4,000/month in previously abandoned orders.",
    stats: [
      { n: "$14–25K", label: "estimated monthly baseline", color: "blue" },
      { n: "+$4–10K", label: "monthly from all 3 fixes", color: "green" },
      { n: "0.42", label: "analysis confidence", color: "amber" },
    ],
    evidence: "[ASSUMPTION] — no POS or financial data provided",
  },
  {
    step: "4 of 5",
    title: "A sequenced 30-day plan. One fix at a time.",
    body: "Week 1 fixes the mobile rendering and cleans up the menu issues. Week 2 establishes a baseline. Week 3 adds the bundle. Week 4 evaluates the Otter contract. Each action is isolated so the result is measurable.",
    stats: [
      { n: "Week 1", label: "mobile fix + menu cleanup", color: "blue" },
      { n: "Week 3", label: "bundle live + AOV tracking", color: "blue" },
      { n: "Week 4", label: "Otter contract decision", color: "blue" },
    ],
    evidence: "30-day roadmap — full detail in report",
  },
  {
    step: "5 of 5",
    title: "Elliyeen turns this audit into execution.",
    body: "This report is the diagnosis. The implementation — Wix configuration, copy rewrite, menu architecture, ordering flow — is the work Elliyeen handles. One engagement. Documented deliverables.",
    stats: [
      { n: "22", label: "specialist frameworks applied", color: "blue" },
      { n: "Free", label: "20-min diagnostic call", color: "green" },
      { n: "3", label: "specific findings, no pitch", color: "blue" },
    ],
    evidence: "Book at elliyeen.com/#book",
  },
];

const MOBILE_CHECKS = [
  { label: "Viewport meta tag", pass: true, detail: "width=device-width, initial-scale=1 — declared correctly" },
  { label: "Body renders within viewport", pass: false, detail: "1336px body on 390px screen — 946px overflow [VERIFIED]" },
  { label: "Horizontal scroll required", pass: false, detail: "Confirmed on all 5 pages [VERIFIED]" },
  { label: "Touch targets ≥ 44px", pass: false, detail: "11 elements below Google minimum [VERIFIED]" },
  { label: "H1 on homepage", pass: false, detail: "No H1 element found — critical SEO gap [VERIFIED]" },
  { label: "First Contentful Paint", pass: true, detail: "228ms — fast [VERIFIED]" },
  { label: "Console errors", pass: true, detail: "0 errors across all 5 pages [VERIFIED]" },
  { label: "Broken links", pass: true, detail: "All 5 internal + 3 external links return HTTP 200 [VERIFIED]" },
  { label: "Images with missing alt text", pass: null, detail: "1 image — minor accessibility gap [VERIFIED]" },
  { label: "Page resources (menu page)", pass: null, detail: "204 resources — heavy for a food site [VERIFIED]" },
];

const LINK_AUDIT = [
  { page: "Home", url: "/", flag: null },
  { page: "Our Story", url: "/blank-1", flag: "Slug should be /our-story — Wix default, zero SEO value" },
  { page: "Contact", url: "/blank-2", flag: "Slug should be /contact — Wix default, zero SEO value" },
  { page: "Menu", url: "/menus", flag: null },
  { page: "Cart", url: "/cart-page", flag: null },
];

const OPPORTUNITIES = [
  {
    rank: 1,
    score: 91,
    title: "Fix mobile rendering",
    type: "Digital / Demand conversion",
    impact: "Recover 20–35% of abandoned mobile sessions",
    impactMoney: "+$2,000–4,000/month [ASSUMPTION]",
    confidence: 0.85,
    cost: "$0 cash · 2–4 hrs in Wix Mobile Editor",
    evidence: "[VERIFIED] Body renders 1336px on 390px viewport. [BENCHMARK] 60–75% of restaurant web traffic is mobile.",
    action: "Wix Editor → Mobile Editor → adjust breakpoints on all 5 pages → verify on real iPhone.",
    color: "red",
  },
  {
    rank: 2,
    score: 79,
    title: "Remove or replace Otter redirect",
    type: "Profit engineering",
    impact: "Retain $4–8 per order (15–25% commission rate)",
    impactMoney: "+$2,000–4,000/month [ASSUMPTION]",
    confidence: 0.55,
    cost: "Verify Otter contract terms first",
    evidence: "[VERIFIED] Menu page redirects to tryotter.com. [BENCHMARK] Each redirect step loses 10–20% of visitors.",
    action: "Check Otter contract (flat fee vs. commission). If commission: evaluate Wix Restaurants or Square Online.",
    color: "amber",
  },
  {
    rank: 3,
    score: 74,
    title: "Feature a Family Bundle above the menu",
    type: "Profit engineering / AOV lift",
    impact: "+$13–22 AOV lift on bundle orders (~52%)",
    impactMoney: "+$800–2,000/month [ASSUMPTION]",
    confidence: 0.45,
    cost: "Design time only — no additional food cost",
    evidence: "[VERIFIED] No bundle featured. [BENCHMARK] QSR bundles at top of order flow increase AOV 35–60%.",
    action: "Design: 2 specials + 2 desserts + 2 drinks. A la carte ~$72. Bundle at $58–64. Test 3 weeks.",
    color: "zinc",
  },
];

const WASTE = [
  { severity: "Critical", type: "Conversion waste", desc: "Mobile rendering failure loses an estimated 25–40% of mobile sessions before ordering. Every Instagram and TikTok visitor hits a broken page.", evidence: "[VERIFIED]" },
  { severity: "High", type: "Ordering friction", desc: "Third-party redirect (tryotter.com) adds 1–3 extra steps at peak ordering intent. Each step loses ~10–20% of remaining visitors.", evidence: "[BENCHMARK]" },
  { severity: "High", type: "SEO waste", desc: "URL slugs /blank-1 and /blank-2 are Wix defaults. 'Our Story' and 'Contact' pages have zero indexable SEO value in their current slugs.", evidence: "[VERIFIED]" },
  { severity: "High", type: "Menu waste", desc: "'Rice Bowls' section appears in the menu navigation with zero items. Customer clicks → finds nothing → confusion at highest-intent moment.", evidence: "[VERIFIED]" },
  { severity: "Medium", type: "Trust erosion", desc: "Address conflict: homepage title tag shows Decatur, GA. Ordering system shows Stone Mountain, GA. Damages local SEO and customer navigation.", evidence: "[VERIFIED]" },
  { severity: "Medium", type: "Email waste", desc: "No email capture. soulhalal79@gmail.com signals informal operation to catering buyers. Every non-converting visitor is permanently lost.", evidence: "[VERIFIED]" },
];

const MENU_FULL = [
  {
    cat: "Specials",
    note: "Highest-AOV category. Oxtail is the demand signal.",
    items: [
      { name: "Jamaican Brown Stewed Chicken", price: "$10.99", note: "" },
      { name: "Hood Rich (spaghetti + fish)", price: "$17.99", note: "" },
      { name: "Jerk Island", price: "$26.99", note: "Quarter leg + 3 sides" },
      { name: "Grandma's Special", price: "$28.99", note: "3 fried chicken + 4 sides + cornbread · NO substitutes" },
      { name: "Auntie Special", price: "$28.99", note: "Turkey wing + 3 sides" },
      { name: "Grandpa's Special", price: "$30.99", note: "2 whiting fish + 4 sides + cornbread · NO substitutes" },
      { name: "Gramps", price: "$30.99", note: "2 wings + 1 fish + 4 sides" },
      { name: "Oxtail", price: "$30.99", note: "2 sides included" },
    ],
  },
  {
    cat: "Fried Wings",
    note: "Available in 5-pc and 10-pc. High repeat rate item.",
    items: [
      { name: "Crispy Golden Fried (5-pc)", price: "$6.99", note: "10-pc: $15.99" },
      { name: "Honey BBQ (5-pc)", price: "$7.99", note: "10-pc: $15.99" },
      { name: "Honey Hot (5-pc)", price: "$7.99", note: "10-pc: $15.99" },
      { name: "Jerk (5-pc)", price: "$8.99", note: "10-pc: $16.99" },
      { name: "Honey Lemon Pepper (5-pc)", price: "$9.99", note: "10-pc: $18.99" },
      { name: "Fried Fish / whiting", price: "$7.99", note: "" },
      { name: "Honey Lemon Pepper Fish", price: "$7.99 (1 pc)", note: "2 pc: $14.99" },
      { name: "Hot Honey Fish", price: "$7.99 (1 pc)", note: "2 pc: $15.99" },
    ],
  },
  {
    cat: "Sides",
    note: null,
    items: [
      { name: "Glazed Cornbread", price: "$3.99", note: "" },
      { name: "Cabbage", price: "$5.99", note: "" },
      { name: "String Beans", price: "$5.99", note: "" },
      { name: "Baked Beans", price: "$5.99", note: "" },
      { name: "Halal Roll", price: "$5.99", note: "" },
      { name: "Black Eyed Peas", price: "$6.99", note: "" },
      { name: "Collard Greens", price: "$6.99", note: "" },
      { name: "Southern Potato Salad", price: "$6.99", note: "" },
      { name: "Yams", price: "$7.99", note: "" },
      { name: "Mac & Cheese", price: "$7.99", note: "" },
      { name: "Drop Your Neck Dressing", price: "$7.99", note: "" },
      { name: "Halal Roll (2)", price: "$9.99", note: "" },
    ],
    flag: "String Beans listed twice on live site at $5.99 and $6.99. One entry is a duplicate — verify and remove.",
  },
  {
    cat: "Rice",
    note: null,
    items: [
      { name: "Rice & Peas", price: "$6.99", note: "" },
      { name: "Yellow Rice", price: "$6.99", note: "" },
      { name: "Coconut Rice", price: "$6.99", note: "" },
    ],
  },
  {
    cat: "Rasta Pasta",
    note: "Caribbean fusion — strongest differentiator alongside Halal cert.",
    items: [
      { name: "Veggie Rasta Pasta", price: "$14.99", note: "" },
      { name: "Chicken Rasta Pasta", price: "$17.99", note: "" },
    ],
  },
  {
    cat: "Sweets & Drinks",
    note: "High-margin add-on category. No bundle features these.",
    items: [
      { name: "Sweet Potato Pie", price: "$4.99", note: "" },
      { name: "Banana Pudding", price: "$6.99", note: "" },
      { name: "Daberry Lemonade", price: "$6.99", note: "" },
      { name: "Tropical Hibiscus", price: "$6.99", note: "" },
      { name: "Cake of the Day", price: "$6.99", note: "" },
      { name: "Peach Cobbler", price: "$7.99", note: "" },
      { name: "Peach Cobbler CinnaBOM", price: "$7.99", note: "" },
      { name: "Biscoff Pudding", price: "$7.99", note: "" },
      { name: "Shortbread Banana Pudding", price: "$7.99", note: "" },
    ],
  },
  {
    cat: "Vegan",
    note: "Underrepresented in current menu layout — buried below other categories.",
    items: [
      { name: "Halal Cabbage Roll (1)", price: "$4.99", note: "" },
      { name: "Halal Cabbage Roll (2)", price: "$8.99", note: "" },
    ],
  },
  {
    cat: "For the Low",
    note: "Accessible price point. Drives trial and repeat visits.",
    items: [
      { name: "The Halal Boil", price: "$10.99", note: "" },
      { name: "The Halal Chick", price: "$12.99", note: "" },
    ],
  },
  {
    cat: "Sandwiches",
    note: null,
    items: [
      { name: "Halal Smash w/ Fries", price: "$15.99", note: "" },
      { name: "MacFish", price: "$17.99", note: "" },
      { name: "Fish Samich (Fries Included)", price: "$17.99", note: "" },
    ],
  },
  {
    cat: "Kids Menu",
    note: null,
    items: [
      { name: "Kiddos Meal (3 wings + mac)", price: "$10.99", note: "" },
      { name: "Spaghetti Bowl", price: "$10.99", note: "" },
    ],
  },
];

const PRICE_RANGES = [
  { cat: "Specials", low: 10.99, high: 30.99 },
  { cat: "Sandwiches", low: 15.99, high: 17.99 },
  { cat: "Rasta Pasta", low: 14.99, high: 17.99 },
  { cat: "For the Low", low: 10.99, high: 12.99 },
  { cat: "Fried Wings (5 pc)", low: 6.99, high: 9.99 },
  { cat: "Kids Menu", low: 10.99, high: 10.99 },
  { cat: "Sweets & Drinks", low: 4.99, high: 7.99 },
  { cat: "Vegan", low: 4.99, high: 8.99 },
  { cat: "Rice", low: 6.99, high: 6.99 },
  { cat: "Sides", low: 3.99, high: 9.99 },
];

const NAV_SECTIONS = [
  {
    group: "Findings",
    open: true,
    items: [
      { label: "Overview", id: "overview" },
      { label: "Site Crawl", id: "site-crawl" },
      { label: "Mobile Audit", id: "mobile-audit" },
      { label: "Primary Constraint", id: "constraint" },
    ],
  },
  {
    group: "Financial Model",
    open: true,
    items: [
      { label: "Revenue Estimate", id: "revenue-estimate" },
      { label: "Opportunity Impact", id: "opportunity-impact" },
    ],
  },
  {
    group: "Opportunities",
    open: true,
    items: [
      { label: "Profit Opportunities", id: "opportunities" },
      { label: "Waste Identified", id: "waste" },
      { label: "Digital & SEO", id: "seo" },
    ],
  },
  {
    group: "Menu",
    open: true,
    items: [
      { label: "Full Menu Pricing", id: "menu" },
      { label: "Price Range Chart", id: "price-chart" },
    ],
  },
  {
    group: "Roadmap",
    open: true,
    items: [
      { label: "30-Day Plan", id: "roadmap-30" },
      { label: "90-Day Plan", id: "roadmap-90" },
    ],
  },
];

// ─── COMPONENT ────────────────────────────────────────────────────────────────

export default function SoHalalReportClient() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [navGroups, setNavGroups] = useState(NAV_SECTIONS.map((g) => g.open));
  const [wizardOpen, setWizardOpen] = useState(false);
  const [wizardStep, setWizardStep] = useState(0);
  const [activeSection, setActiveSection] = useState("overview");
  const [collapsed, setCollapsed] = useState<Record<string, boolean>>({});
  const [showTop, setShowTop] = useState(false);

  // Show back-to-top button after scrolling down
  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Open sidebar on desktop by default
  useEffect(() => {
    if (window.innerWidth >= 1024) setSidebarOpen(true);
  }, []);

  // Track active section on scroll
  useEffect(() => {
    const sectionIds = NAV_SECTIONS.flatMap((g) => g.items.map((i) => i.id));
    const handler = () => {
      for (const id of [...sectionIds].reverse()) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= 120) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const toggleSection = (id: string) =>
    setCollapsed((prev) => ({ ...prev, [id]: !prev[id] }));

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setSidebarOpen(false);
  };

  const isCollapsed = (id: string) => !!collapsed[id];

  // ── Section wrapper ──────────────────────────────────────────────────────────
  const Section = ({
    id,
    label,
    title,
    children,
    dark = false,
  }: {
    id: string;
    label: string;
    title: string;
    children: React.ReactNode;
    dark?: boolean;
  }) => {
    const col = isCollapsed(id);
    return (
      <section
        id={id}
        className={`scroll-mt-20 ${dark ? "bg-[#0D1B2A] text-white" : ""}`}
      >
        <div className={`${dark ? "mx-auto max-w-5xl px-4 py-14 sm:px-6" : "mx-auto max-w-5xl px-4 py-10 sm:px-6"}`}>
          <button
            onClick={() => toggleSection(id)}
            className={`flex w-full items-center justify-between gap-4 text-left group`}
          >
            <div>
              <p className={`text-[10px] font-bold uppercase tracking-[0.28em] ${dark ? "text-zinc-500" : "text-zinc-400"}`}>
                {label}
              </p>
              <h2 className={`mt-1.5 font-serif t-heading ${dark ? "text-white" : ""}`}>
                {title}
              </h2>
            </div>
            <ChevronDown
              size={18}
              className={`shrink-0 transition-transform duration-200 ${dark ? "text-zinc-500" : "text-zinc-400"} ${col ? "" : "rotate-180"}`}
            />
          </button>
          {!col && <div className="mt-6">{children}</div>}
        </div>
      </section>
    );
  };

  const step = WIZARD_STEPS[wizardStep];

  return (
    <>
      {/* ── Sidebar ─────────────────────────────────────────────────────────── */}
      {/* Backdrop */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 z-30 bg-black/40 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar drawer */}
      <aside
        className={`fixed left-0 top-0 z-40 flex h-full w-60 flex-col bg-[#0D1B2A] transition-transform duration-300 ease-in-out ${
          sidebarOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        style={{ paddingTop: "68px" }}
      >
        {/* Sidebar header */}
        <div className="border-b border-white/10 px-5 pb-4 pt-3">
          <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">Report</p>
          <p className="mt-0.5 text-sm font-semibold text-white">So Halal Soul Food</p>
          <p className="text-[10px] text-zinc-500">Stone Mountain, GA · June 2026</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 overflow-y-auto py-3">
          {NAV_SECTIONS.map((group, gi) => (
            <div key={group.group} className="mb-1">
              <button
                onClick={() =>
                  setNavGroups((prev) => {
                    const next = [...prev];
                    next[gi] = !next[gi];
                    return next;
                  })
                }
                className="flex w-full items-center justify-between px-5 py-2 text-left"
              >
                <span className="text-[10px] font-bold uppercase tracking-[0.14em] text-zinc-500">
                  {group.group}
                </span>
                <ChevronDown
                  size={10}
                  className={`text-zinc-600 transition-transform ${navGroups[gi] ? "rotate-180" : ""}`}
                />
              </button>
              {navGroups[gi] && (
                <div>
                  {group.items.map((item) => (
                    <button
                      key={item.id}
                      onClick={() => scrollTo(item.id)}
                      className={`block w-full border-l-2 py-1.5 pl-6 pr-4 text-left text-xs font-light transition-all ${
                        activeSection === item.id
                          ? "border-[#4EADA0] bg-[#4EADA0]/10 font-normal text-white"
                          : "border-transparent text-zinc-400 hover:border-white/20 hover:bg-white/4 hover:text-zinc-200"
                      }`}
                    >
                      {item.label}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ))}
        </nav>

        {/* Sidebar CTA */}
        <div className="border-t border-white/10 p-4">
          <a
            href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
            className="block rounded-lg bg-[#1B5EA8] px-4 py-2.5 text-center text-xs font-bold text-white hover:bg-[#164d8e]"
          >
            Get your free diagnosis
          </a>
        </div>
      </aside>

      {/* Sidebar toggle */}
      <button
        onClick={() => setSidebarOpen(!sidebarOpen)}
        aria-label={sidebarOpen ? "Close navigation" : "Open navigation"}
        className={`fixed top-1/2 z-50 flex h-12 w-4 -translate-y-1/2 items-center justify-center rounded-r bg-[#0D1B2A] shadow-lg transition-all duration-300 ${
          sidebarOpen ? "left-60" : "left-0"
        }`}
      >
        {sidebarOpen ? (
          <ChevronLeft size={10} className="text-zinc-400" />
        ) : (
          <ChevronRight size={10} className="text-zinc-400" />
        )}
      </button>

      {/* ── Wizard ──────────────────────────────────────────────────────────── */}
      {wizardOpen && (
        <div
          className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 p-4"
          style={{ backdropFilter: "blur(6px)", WebkitBackdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) setWizardOpen(false); }}
        >
          <div className="w-full max-w-xl overflow-hidden rounded-2xl bg-white shadow-2xl">
            {/* Wizard header */}
            <div className="flex items-start justify-between border-b border-zinc-100 px-6 py-5">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                  {step.step} — So Halal Soul Food
                </p>
                <h3 className="mt-1.5 font-serif t-subheading text-zinc-900">
                  {step.title}
                </h3>
              </div>
              <button
                onClick={() => setWizardOpen(false)}
                className="ml-4 flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-zinc-100 text-zinc-500 hover:bg-zinc-200"
              >
                <X size={14} />
              </button>
            </div>

            {/* Wizard body */}
            <div className="px-6 py-5">
              <p className="text-sm leading-6 text-zinc-600">{step.body}</p>

              {/* Stats */}
              <div className="mt-5 grid grid-cols-3 gap-3">
                {step.stats.map((s) => (
                  <div key={s.label} className="rounded-xl border border-zinc-100 bg-zinc-50 p-3 text-center">
                    <p
                      className={`font-serif text-2xl tracking-tight ${
                        s.color === "red"
                          ? "text-red-500"
                          : s.color === "green"
                          ? "text-emerald-600"
                          : s.color === "amber"
                          ? "text-amber-500"
                          : "text-[#1B5EA8]"
                      }`}
                    >
                      {s.n}
                    </p>
                    <p className="mt-1 text-[10px] leading-4 text-zinc-400">{s.label}</p>
                  </div>
                ))}
              </div>

              <p className="mt-4 text-[10px] font-mono text-zinc-400">{step.evidence}</p>
            </div>

            {/* Wizard footer */}
            <div className="flex items-center justify-between border-t border-zinc-100 px-6 py-4">
              <button
                onClick={() => setWizardStep((s) => Math.max(0, s - 1))}
                disabled={wizardStep === 0}
                className="flex items-center gap-1.5 text-xs font-semibold text-zinc-400 hover:text-zinc-700 disabled:opacity-30"
              >
                <ChevronLeft size={14} /> Previous
              </button>

              {/* Progress dots */}
              <div className="flex gap-1.5">
                {WIZARD_STEPS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setWizardStep(i)}
                    className={`h-1.5 rounded-full transition-all ${
                      i === wizardStep ? "w-5 bg-[#1B5EA8]" : "w-1.5 bg-zinc-200 hover:bg-zinc-400"
                    }`}
                  />
                ))}
              </div>

              {wizardStep < WIZARD_STEPS.length - 1 ? (
                <button
                  onClick={() => setWizardStep((s) => s + 1)}
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#1B5EA8] hover:text-[#164d8e]"
                >
                  Next <ChevronRight size={14} />
                </button>
              ) : (
                <a
                  href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
                  className="flex items-center gap-1.5 text-xs font-semibold text-[#1B5EA8] hover:underline"
                  onClick={() => setWizardOpen(false)}
                >
                  Book call <ArrowUpRight size={13} />
                </a>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ── Main content ────────────────────────────────────────────────────── */}
      <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
        <SiteNav />

        {/* ── Hero ────────────────────────────────────────────────────────── */}
        <section id="overview" className="scroll-mt-20 mx-auto max-w-5xl px-4 pb-10 pt-14 sm:px-6">
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">
                Revenue & CX Audit · June 2026
              </p>
              <h1 className="mt-3 font-serif t-display">
                So Halal Soul Food
              </h1>
              <p className="mt-1 text-sm text-zinc-400">
                Stone Mountain, GA · sohalalsoulfood.com
              </p>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-base leading-7 text-zinc-600">
            Halal-certified soul food and Caribbean restaurant. Compelling founder story.
            60+ menu items. Active social channels. The product is differentiated.
            The demand is real. The website is broken on every phone — and every customer
            from Instagram or TikTok is on their phone.
          </p>

          {/* Confidence badge */}
          <div className="mt-4 inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-4 py-1.5 text-xs font-semibold text-zinc-500">
            <span className="h-2 w-2 rounded-full bg-amber-400" />
            Analysis confidence: 0.42 — Menu and site verified. No POS or revenue data.
          </div>

          {/* Stats strip */}
          <div className="mt-6 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {[
              { value: "5 / 5", label: "Pages crawled", sub: "All HTTP 200" },
              { value: "0", label: "Broken links", sub: "Internal + external" },
              { value: "1336px", label: "Body on mobile", sub: "vs 390px screen" },
              { value: "60+", label: "Menu items", sub: "All prices verified" },
            ].map((s) => (
              <div key={s.label} className="rounded-2xl border border-zinc-200 bg-white p-4">
                <p className="font-serif t-subheading text-[#0D1B2A]">{s.value}</p>
                <p className="mt-0.5 text-xs font-semibold text-zinc-600">{s.label}</p>
                <p className="text-[10px] text-zinc-400">{s.sub}</p>
              </div>
            ))}
          </div>

          {/* Wizard trigger */}
          <div className="mt-6">
            <button
              onClick={() => { setWizardStep(0); setWizardOpen(true); }}
              className="inline-flex items-center gap-2 rounded-xl bg-[#0D1B2A] px-5 py-3 text-sm font-bold text-white hover:bg-[#1a2e40] transition-colors"
            >
              <BarChart3 size={15} />
              View 5 key findings
            </button>
            <span className="ml-3 text-xs text-zinc-400">Interactive overview of every critical issue</span>
          </div>
        </section>

        {/* ── Site Crawl ──────────────────────────────────────────────────── */}
        <Section id="site-crawl" label="Site Crawl" title="5 pages · All links verified · 2026-06-25">
          <p className="text-sm text-zinc-500">
            Every page was HTTP-verified and screenshotted. No broken links found. Two URL slug
            issues identified — both are Wix defaults that destroy SEO indexability.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-zinc-100">
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Page</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">URL</th>
                  <th className="px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">Status</th>
                  <th className="hidden px-5 py-3 text-left text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400 sm:table-cell">Flag</th>
                </tr>
              </thead>
              <tbody>
                {LINK_AUDIT.map((row, i) => (
                  <tr key={row.url} className={i < LINK_AUDIT.length - 1 ? "border-b border-zinc-100" : ""}>
                    <td className="px-5 py-3.5 font-medium text-zinc-800">{row.page}</td>
                    <td className="px-5 py-3.5 font-mono text-xs text-zinc-500">{row.url}</td>
                    <td className="px-5 py-3.5">
                      <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-50 px-2.5 py-0.5 text-xs font-semibold text-emerald-700">
                        <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
                        200
                      </span>
                    </td>
                    <td className="hidden px-5 py-3.5 text-xs sm:table-cell">
                      {row.flag ? (
                        <span className="text-amber-600">{row.flag}</span>
                      ) : (
                        <span className="text-zinc-300">—</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Screenshots */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <img
                src="/reports/sohalal/sohalal-desktop-home.png"
                alt="So Halal homepage at 1440px desktop width"
                className="w-full"
              />
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-zinc-700">Homepage — Desktop (1440px)</p>
                <p className="text-[10px] text-zinc-400">sohalalsoulfood.com · captured 2026-06-25</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
              <img
                src="/reports/sohalal/sohalal-menu-desktop.png"
                alt="So Halal menu page at 1440px desktop width"
                className="w-full"
              />
              <div className="px-4 py-3">
                <p className="text-xs font-semibold text-zinc-700">Menu — Desktop (1440px)</p>
                <p className="text-[10px] text-zinc-400">sohalalsoulfood.com/menus · 204 resources loaded</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Mobile Audit ────────────────────────────────────────────────── */}
        <Section id="mobile-audit" label="Mobile Performance Audit" title="Tested at 390×844px — iPhone 14">
          {/* Critical alert */}
          <div className="flex items-start gap-3 rounded-2xl border border-red-100 bg-red-50 p-5">
            <AlertTriangle size={18} className="mt-0.5 shrink-0 text-red-500" />
            <div>
              <p className="font-semibold text-red-700">
                Critical: site body renders at 1336px on a 390px screen.
              </p>
              <p className="mt-1 text-sm leading-6 text-red-600">
                Horizontal scroll is required to read any page on a phone. Every customer
                arriving from Instagram or TikTok hits a broken experience before they can
                find the menu, contact info, or order button.
              </p>
            </div>
          </div>

          {/* Overflow chart — Tufte style */}
          <div className="mt-5 rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Viewport vs. Page Width — [VERIFIED]
            </p>
            <div className="mt-4 space-y-5">
              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-700">Phone screen (viewport)</span>
                  <span className="font-mono font-semibold text-[#1B5EA8]">390px</span>
                </div>
                <div className="relative h-5 overflow-hidden rounded bg-zinc-100">
                  <div className="absolute left-0 top-0 h-full rounded bg-[#1B5EA8]" style={{ width: "29.2%" }} />
                  <div
                    className="absolute top-0 h-full border-r-2 border-dashed border-[#1B5EA8]"
                    style={{ left: "29.2%" }}
                  />
                </div>
              </div>
              <div>
                <div className="mb-2 flex items-center justify-between text-xs">
                  <span className="font-medium text-zinc-700">Page body (actual width)</span>
                  <span className="font-mono font-semibold text-red-500">1336px</span>
                </div>
                <div className="relative h-5 overflow-hidden rounded bg-zinc-100">
                  <div className="absolute left-0 top-0 h-full w-full rounded bg-red-200" />
                  <div
                    className="absolute left-0 top-0 h-full rounded bg-red-400"
                    style={{ width: "29.2%" }}
                  />
                  <div
                    className="absolute top-0 h-full border-r-2 border-dashed border-[#1B5EA8]"
                    style={{ left: "29.2%" }}
                  />
                </div>
              </div>
              <p className="text-xs text-zinc-400">
                The dashed line marks the right edge of the phone screen.
                Everything to the right is hidden — requiring horizontal scroll to access.
                <span className="ml-1 font-semibold text-red-500">71% of the page is not visible.</span>
              </p>
            </div>
          </div>

          {/* Checklist */}
          <div className="mt-4 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {MOBILE_CHECKS.map((c, i) => (
              <div
                key={c.label}
                className={`flex items-start gap-3 px-5 py-3.5 ${i < MOBILE_CHECKS.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                {c.pass === true ? (
                  <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-emerald-500" />
                ) : c.pass === false ? (
                  <XCircle size={15} className="mt-0.5 shrink-0 text-red-400" />
                ) : (
                  <AlertTriangle size={15} className="mt-0.5 shrink-0 text-amber-400" />
                )}
                <div>
                  <p className={`text-sm font-medium ${c.pass === false ? "text-red-700" : c.pass === null ? "text-amber-700" : "text-zinc-700"}`}>
                    {c.label}
                  </p>
                  <p className="text-xs text-zinc-400">{c.detail}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Mobile screenshots */}
          <div className="mt-5 grid gap-4 sm:grid-cols-2">
            <div className="overflow-hidden rounded-2xl border border-red-200 bg-white">
              <img
                src="/reports/sohalal/sohalal-mobile-home.png"
                alt="So Halal homepage on iPhone 14 showing horizontal overflow"
                className="w-full"
              />
              <div className="border-t border-red-100 bg-red-50 px-4 py-3">
                <p className="text-xs font-semibold text-red-700">Homepage — Mobile (390px)</p>
                <p className="text-[10px] text-red-500">Horizontal overflow confirmed · content cut off</p>
              </div>
            </div>
            <div className="overflow-hidden rounded-2xl border border-red-200 bg-white">
              <img
                src="/reports/sohalal/sohalal-mobile-menu.png"
                alt="So Halal menu on iPhone 14 showing mobile rendering failure"
                className="w-full"
              />
              <div className="border-t border-red-100 bg-red-50 px-4 py-3">
                <p className="text-xs font-semibold text-red-700">Menu — Mobile (390px)</p>
                <p className="text-[10px] text-red-500">11 touch targets below 44px · menu hard to navigate</p>
              </div>
            </div>
          </div>
        </Section>

        {/* ── Primary Constraint ──────────────────────────────────────────── */}
        <section id="constraint" className="scroll-mt-20 bg-[#0D1B2A] text-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">Primary Constraint</p>
            <h2 className="mt-3 font-serif t-title">
              The site is broken on every phone.
            </h2>
            <p className="mt-4 max-w-2xl text-base leading-7 text-zinc-300">
              The mobile fix costs $0 and takes 2–4 hours. Every other opportunity —
              bundles, direct ordering, loyalty — generates zero additional return until
              the customer can actually use the site. Fix this first. Then measure.
            </p>
            <div className="mt-8 grid gap-4 sm:grid-cols-3">
              {[
                { label: "Constraint type", value: "Digital / Demand conversion" },
                { label: "Evidence quality", value: "Verified — live DOM measurement" },
                { label: "Fix cost", value: "$0 cash · 2–4 hrs of Wix editor time" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-white/10 p-5">
                  <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-500">{s.label}</p>
                  <p className="mt-1.5 text-sm font-semibold text-white">{s.value}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Financial Model ─────────────────────────────────────────────── */}
        <section id="revenue-estimate" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Financial Model</p>
          <h2 className="mt-2 font-serif t-heading">
            Revenue estimate — no POS data provided
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Built from verified menu pricing, operating schedule (Wed–Sun, 5 hrs/day), and QSR benchmarks.
            All figures are assumptions and must be validated against actual Otter or POS data.
          </p>

          {/* Confidence notice */}
          <div className="mt-4 flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
            <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
            <p className="text-xs leading-5 text-amber-700">
              [ASSUMPTION] — No revenue baseline was provided. Pull Wix Analytics or Otter order data
              to validate these estimates before using them for budgeting decisions.
            </p>
          </div>

          {/* Scenarios — Tufte horizontal bars */}
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6">
            <p className="mb-1 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Monthly Revenue Estimate — 3 Scenarios
            </p>
            <p className="mb-5 text-xs text-zinc-400">
              Based on 22 operating days/month, verified menu AOV range $22–28
            </p>
            {[
              { label: "Conservative", orders: 20, aov: 22, pct: 35, note: "20 orders/day · $22 AOV" },
              { label: "Moderate", orders: 30, aov: 25, pct: 57, note: "30 orders/day · $25 AOV" },
              { label: "Optimistic", orders: 40, aov: 28, pct: 80, note: "40 orders/day · $28 AOV" },
            ].map((s) => {
              const rev = s.orders * s.aov * 22;
              return (
                <div key={s.label} className="mb-5 last:mb-0">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <div>
                      <span className="font-semibold text-zinc-800">{s.label}</span>
                      <span className="ml-2 text-zinc-400">{s.note}</span>
                    </div>
                    <span className="font-mono font-semibold text-zinc-700">
                      ${rev.toLocaleString()}/mo
                    </span>
                  </div>
                  <div className="relative h-5 overflow-hidden rounded bg-zinc-100">
                    <div
                      className="absolute left-0 top-0 h-full rounded bg-[#1B5EA8]/70"
                      style={{ width: `${s.pct}%` }}
                    />
                    <span className="absolute right-2 top-0 flex h-full items-center text-[10px] font-mono text-zinc-400">
                      [ASSUMPTION]
                    </span>
                  </div>
                </div>
              );
            })}

            <div className="mt-6 border-t border-zinc-100 pt-5">
              <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
                Estimated AOV Distribution
              </p>
              {[
                { type: "Solo meal (1 entrée + 1 side)", range: "$18–24", pct: 52 },
                { type: "Family special", range: "$28–31", pct: 88 },
                { type: "Wings order (5-pc + side)", range: "$13–16", pct: 40 },
                { type: "Dessert / drink add-on", range: "$6–8", pct: 22 },
                { type: "Blended AOV estimate", range: "$22–28", pct: 72, bold: true },
              ].map((row) => (
                <div key={row.type} className="mt-3">
                  <div className="mb-1 flex items-center justify-between text-xs">
                    <span className={row.bold ? "font-semibold text-zinc-800" : "text-zinc-600"}>{row.type}</span>
                    <span className="font-mono text-zinc-500">{row.range}</span>
                  </div>
                  <div className="h-2 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className={`h-full rounded-full ${row.bold ? "bg-[#1B5EA8]" : "bg-[#1B5EA8]/40"}`}
                      style={{ width: `${row.pct}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Opportunity Impact ──────────────────────────────────────────── */}
        <section id="opportunity-impact" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Financial Model</p>
          <h2 className="mt-2 font-serif t-heading">
            Three fixes · cumulative monthly impact
          </h2>
          <p className="mt-2 text-sm leading-6 text-zinc-500">
            Impact is additive and depends on the mobile fix happening first. Ranges reflect
            conservative and optimistic assumptions. Confidence shown per opportunity.
          </p>

          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6">
            {/* Waterfall chart — Tufte style */}
            <p className="mb-5 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">
              Monthly Revenue Impact — Opportunity Waterfall [ASSUMPTION]
            </p>
            {[
              { label: "Baseline (moderate estimate)", low: 14400, high: 24640, pct: 0, width: 72, color: "zinc", baseline: true },
              { label: "+ Mobile fix (Opp 1)", low: 2000, high: 4000, pct: 72, width: 14, color: "blue", conf: "0.80 confidence" },
              { label: "+ Otter commission removed (Opp 2)", low: 1800, high: 4000, pct: 86, width: 13, color: "blue", conf: "0.40 confidence" },
              { label: "+ Bundle AOV lift (Opp 3)", low: 800, high: 2000, pct: 99, width: 6, color: "blue", conf: "0.45 confidence" },
            ].map((row) => (
              <div key={row.label} className="mb-4 last:mb-0">
                <div className="mb-1.5 flex flex-wrap items-center justify-between gap-1 text-xs">
                  <div>
                    <span className={row.baseline ? "font-semibold text-zinc-800" : "font-medium text-zinc-700"}>
                      {row.label}
                    </span>
                    {row.conf && (
                      <span className="ml-2 text-zinc-400">{row.conf}</span>
                    )}
                  </div>
                  <span className="font-mono text-zinc-500">
                    {row.baseline
                      ? `$${row.low.toLocaleString()}–$${row.high.toLocaleString()}/mo`
                      : `+$${row.low.toLocaleString()}–$${row.high.toLocaleString()}/mo`}
                  </span>
                </div>
                <div className="relative h-4 overflow-hidden rounded bg-zinc-100">
                  {!row.baseline && (
                    <div
                      className="absolute top-0 h-full bg-zinc-200"
                      style={{ width: `${row.pct}%` }}
                    />
                  )}
                  <div
                    className={`absolute top-0 h-full rounded ${row.baseline ? "bg-zinc-300" : "bg-[#1B5EA8]/80"}`}
                    style={{
                      left: row.baseline ? "0" : `${row.pct}%`,
                      width: `${row.width}%`,
                    }}
                  />
                </div>
              </div>
            ))}

            <div className="mt-6 rounded-xl bg-zinc-50 p-4">
              <div className="flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-xs font-bold text-zinc-700">Combined monthly impact if all 3 validated</p>
                  <p className="mt-0.5 text-[10px] text-zinc-400">[ASSUMPTION] — validate mobile fix first, then re-model</p>
                </div>
                <p className="font-mono text-lg font-bold text-[#1B5EA8]">+$4,600–$10,000/mo</p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Profit Opportunities ────────────────────────────────────────── */}
        <section id="opportunities" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Profit Opportunities</p>
          <h2 className="mt-2 font-serif t-heading">
            Three actions, ranked by Opportunity Score
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Score = Profit Impact (30) + Customer Value (20) + Speed (15) + Confidence (15) + Strategic Value (10) − Risk (5) − Complexity (5)
          </p>
          <div className="mt-6 space-y-4">
            {OPPORTUNITIES.map((opp) => (
              <div key={opp.rank} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="flex items-start gap-4 p-6">
                  <div className="flex shrink-0 flex-col items-center pt-1">
                    <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-300">
                      #{opp.rank}
                    </span>
                    <span className="mt-1 font-serif t-heading text-[#1B5EA8]">
                      {opp.score}
                    </span>
                    <span className="text-[10px] text-zinc-400">/ 100</span>
                  </div>
                  <div className="w-px self-stretch bg-zinc-100" />
                  <div className="flex-1 min-w-0">
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-400">{opp.type}</p>
                    <h3 className="mt-1 font-serif t-card-title">{opp.title}</h3>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Expected impact</p>
                        <p className="mt-1 text-sm font-semibold text-zinc-700">{opp.impact}</p>
                        <p className="text-xs text-zinc-400">{opp.impactMoney}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">
                          Confidence — {opp.confidence}
                        </p>
                        <div className="mt-2 flex items-center gap-2">
                          <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-zinc-100">
                            <div
                              className="h-full rounded-full bg-[#1B5EA8]"
                              style={{ width: `${opp.confidence * 100}%` }}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="mt-4 grid gap-3 sm:grid-cols-2">
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">Evidence</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">{opp.evidence}</p>
                      </div>
                      <div>
                        <p className="text-[10px] font-bold uppercase tracking-[0.15em] text-zinc-400">First action</p>
                        <p className="mt-1 text-xs leading-5 text-zinc-500">{opp.action}</p>
                      </div>
                    </div>

                    <div className="mt-4 inline-flex items-center gap-1.5 rounded-full border border-zinc-100 bg-zinc-50 px-3 py-1 text-xs font-semibold text-zinc-500">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#1B5EA8]" />
                      Cost: {opp.cost}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Waste ───────────────────────────────────────────────────────── */}
        <section id="waste" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Waste Identified</p>
          <h2 className="mt-2 font-serif t-heading">
            Six verified friction points
          </h2>
          <div className="mt-5 space-y-3">
            {WASTE.map((w) => (
              <div key={w.type} className="flex items-start gap-4 rounded-xl border border-zinc-200 bg-white p-4">
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                    w.severity === "Critical"
                      ? "bg-red-50 text-red-500"
                      : w.severity === "High"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-zinc-50 text-zinc-500"
                  }`}
                >
                  {w.severity}
                </span>
                <div>
                  <div className="flex items-center gap-2">
                    <p className="text-sm font-semibold text-zinc-700">{w.type}</p>
                    <span className="text-[10px] font-mono text-zinc-300">{w.evidence}</span>
                  </div>
                  <p className="mt-0.5 text-xs leading-5 text-zinc-500">{w.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Digital & SEO ───────────────────────────────────────────────── */}
        <section id="seo" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Digital & SEO Audit</p>
          <h2 className="mt-2 font-serif t-heading">
            All findings from live technical measurement [VERIFIED]
          </h2>
          <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white">
            {[
              { sev: "Critical", finding: "No H1 on homepage", detail: "Google uses H1 as primary content signal. Homepage has zero H1 elements — significant ranking penalty." },
              { sev: "Critical", finding: "URL slugs /blank-1 and /blank-2", detail: "Wix defaults. 'Our Story' and 'Contact' carry no SEO value. Should be /our-story and /contact." },
              { sev: "Critical", finding: "Address conflict", detail: "Title tag: Decatur, GA. Order system: Stone Mountain, GA. Damages Google My Business and local search." },
              { sev: "Critical", finding: "Mobile horizontal overflow", detail: "1336px body on 390px screen. Every mobile visitor lands on a broken page. See Mobile Audit section." },
              { sev: "Critical", finding: "11 touch targets below 44px", detail: "Fails Google's Core Web Vitals mobile usability standard. Navigation links and social icons affected." },
              { sev: "Moderate", finding: "Meta description not optimized", detail: '"The best food in the A!" — not optimized for search intent. Should include halal, soul food, Stone Mountain.' },
              { sev: "Moderate", finding: "No Google Reviews embedded", detail: "No social proof on any page. Critical trust signal for first-time visitors choosing a restaurant." },
              { sev: "Moderate", finding: "Typo: 'Frisday' on Contact page", detail: 'Contact page hours reads "Frisday" instead of "Friday". Signals low attention to detail.' },
              { sev: "Moderate", finding: "No email capture", detail: "Every non-converting visitor is permanently lost. No newsletter, loyalty, or lead form on any page." },
              { sev: "Low", finding: "1 image missing alt text", detail: "Minor accessibility and SEO gap. Easy fix." },
            ].map((row, i, arr) => (
              <div
                key={row.finding}
                className={`flex items-start gap-4 px-5 py-4 ${i < arr.length - 1 ? "border-b border-zinc-100" : ""}`}
              >
                <span
                  className={`mt-0.5 shrink-0 rounded-full px-2 py-0.5 text-[10px] font-bold uppercase ${
                    row.sev === "Critical"
                      ? "bg-red-50 text-red-500"
                      : row.sev === "Moderate"
                      ? "bg-amber-50 text-amber-600"
                      : "bg-zinc-50 text-zinc-500"
                  }`}
                >
                  {row.sev}
                </span>
                <div>
                  <p className="text-sm font-semibold text-zinc-700">{row.finding}</p>
                  <p className="mt-0.5 text-xs leading-5 text-zinc-500">{row.detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ── Menu Analysis ───────────────────────────────────────────────── */}
        <section id="menu" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Menu Analysis</p>
          <h2 className="mt-2 font-serif t-heading">
            Full menu · 60+ items · 10 categories · [VERIFIED]
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            All prices extracted from the live sohalalsoulfood.com/menus page on 2026-06-25.
            Two menu issues found: duplicate String Beans listing, empty Rice Bowls section.
          </p>

          {/* Menu issues callout */}
          <div className="mt-4 grid gap-3 sm:grid-cols-2">
            <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
              <div>
                <p className="text-xs font-semibold text-amber-700">Duplicate listing [VERIFIED]</p>
                <p className="mt-0.5 text-xs leading-5 text-amber-600">
                  "String Beans" appears twice — $5.99 and $6.99. One is incorrect. Verify and remove.
                </p>
              </div>
            </div>
            <div className="flex items-start gap-3 rounded-xl border border-amber-100 bg-amber-50 p-4">
              <AlertTriangle size={14} className="mt-0.5 shrink-0 text-amber-500" />
              <div>
                <p className="text-xs font-semibold text-amber-700">Empty section [VERIFIED]</p>
                <p className="mt-0.5 text-xs leading-5 text-amber-600">
                  "Rice Bowls" category is visible in menu nav with zero items. Remove or populate immediately.
                </p>
              </div>
            </div>
          </div>

          {/* Full menu */}
          <div className="mt-5 space-y-4">
            {MENU_FULL.map((cat) => (
              <div key={cat.cat} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="border-b border-zinc-100 px-5 py-3.5">
                  <div className="flex items-baseline gap-3">
                    <h3 className="font-serif t-card-title text-zinc-900">{cat.cat}</h3>
                    <span className="text-[10px] text-zinc-400">{cat.items.length} items</span>
                  </div>
                  {cat.note && (
                    <p className="mt-0.5 text-xs text-zinc-400">{cat.note}</p>
                  )}
                </div>
                <div className="divide-y divide-zinc-50">
                  {cat.items.map((item) => (
                    <div key={item.name} className="flex items-baseline justify-between px-5 py-2.5">
                      <div>
                        <span className="text-sm text-zinc-700">{item.name}</span>
                        {item.note && (
                          <span className="ml-2 text-[10px] text-zinc-400">{item.note}</span>
                        )}
                      </div>
                      <span className="ml-4 shrink-0 font-mono text-sm font-semibold text-zinc-800">
                        {item.price}
                      </span>
                    </div>
                  ))}
                </div>
                {cat.flag && (
                  <div className="border-t border-amber-100 bg-amber-50 px-5 py-3">
                    <p className="text-[10px] font-semibold text-amber-700">{cat.flag}</p>
                  </div>
                )}
              </div>
            ))}

            {/* Rice Bowls empty section */}
            <div className="overflow-hidden rounded-2xl border border-red-100 bg-white">
              <div className="border-b border-red-100 px-5 py-3.5">
                <div className="flex items-baseline gap-3">
                  <h3 className="font-serif t-card-title text-red-700">Rice Bowls</h3>
                  <span className="rounded-full bg-red-50 px-2 py-0.5 text-[10px] font-semibold text-red-500">
                    0 items — empty section
                  </span>
                </div>
                <p className="mt-0.5 text-xs text-red-500">
                  This category appears in the menu navigation but contains no items.
                  Customers who click this expect food — they find nothing. Remove or populate.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* ── Price Range Chart ────────────────────────────────────────────── */}
        <section id="price-chart" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Menu Pricing</p>
          <h2 className="mt-2 font-serif t-heading">
            Price range by category — [VERIFIED]
          </h2>
          <p className="mt-2 text-sm text-zinc-500">
            Specials and Sandwiches carry the highest AOV. Sweets & Drinks are the highest-margin
            add-on category — currently not featured as bundle upsell.
          </p>
          <div className="mt-5 overflow-hidden rounded-2xl border border-zinc-200 bg-white p-6">
            <div className="mb-4 flex items-center justify-between text-[10px] text-zinc-400">
              <span>$0</span>
              <span>$10</span>
              <span>$20</span>
              <span>$31</span>
            </div>
            {PRICE_RANGES.map((row) => {
              const MAX = 31;
              const leftPct = (row.low / MAX) * 100;
              const widthPct = Math.max(((row.high - row.low) / MAX) * 100, 2);
              return (
                <div key={row.cat} className="mb-4 last:mb-0">
                  <div className="mb-1.5 flex items-center justify-between text-xs">
                    <span className="font-medium text-zinc-700">{row.cat}</span>
                    <span className="font-mono text-zinc-400">
                      ${row.low.toFixed(2)}{row.high !== row.low ? ` – $${row.high.toFixed(2)}` : ""}
                    </span>
                  </div>
                  <div className="relative h-3 overflow-hidden rounded-full bg-zinc-100">
                    <div
                      className="absolute h-full rounded-full bg-[#1B5EA8]/15"
                      style={{ left: `${leftPct}%`, width: `${widthPct + 2}%` }}
                    />
                    <div
                      className="absolute h-full w-1.5 rounded-full bg-[#1B5EA8]"
                      style={{ left: `${leftPct}%` }}
                    />
                    {row.high !== row.low && (
                      <div
                        className="absolute h-full w-1.5 rounded-full bg-[#1B5EA8]"
                        style={{ left: `${Math.min(leftPct + widthPct, 97)}%` }}
                      />
                    )}
                  </div>
                </div>
              );
            })}
            <div className="mt-4 border-t border-zinc-100 pt-4">
              <p className="text-xs text-zinc-400">
                Endpoints = price of lowest and highest item in each category.
                Bar range = spread of menu prices.
              </p>
            </div>
          </div>
        </section>

        {/* ── 30-Day Roadmap ───────────────────────────────────────────────── */}
        <section id="roadmap-30" className="scroll-mt-20 bg-[#0D1B2A] text-white">
          <div className="mx-auto max-w-5xl px-4 py-14 sm:px-6">
            <button
              onClick={() => toggleSection("roadmap-30")}
              className="flex w-full items-center justify-between text-left"
            >
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">Roadmap</p>
                <h2 className="mt-2 font-serif t-heading">
                  30 days — fix, measure, test
                </h2>
              </div>
              <ChevronDown
                size={18}
                className={`shrink-0 text-zinc-500 transition-transform ${isCollapsed("roadmap-30") ? "" : "rotate-180"}`}
              />
            </button>

            {!isCollapsed("roadmap-30") && (
              <div className="mt-6 overflow-hidden rounded-2xl border border-white/10">
                {[
                  {
                    week: "Week 1",
                    actions: [
                      "Fix Wix mobile rendering on all 5 pages — verify on real iPhone before closing",
                      "Update URL slugs: /blank-1 → /our-story, /blank-2 → /contact",
                      "Resolve address conflict (Decatur vs. Stone Mountain) in title tag and all references",
                      "Fix 'Frisday' → 'Friday' typo on Contact page",
                      "Remove empty Rice Bowls section from menu nav",
                      "Remove duplicate String Beans entry (verify which price is correct)",
                    ],
                  },
                  {
                    week: "Week 2",
                    actions: [
                      "Pull Wix Analytics: compare mobile sessions Week 2 vs. Week 0 baseline",
                      "Add UTM parameter to Otter order link to track mobile click-throughs specifically",
                      "Add H1 tag to homepage — should include 'halal soul food' and location",
                    ],
                  },
                  {
                    week: "Week 3",
                    actions: [
                      "Design Family Bundle: 2 specials + 2 desserts + 2 drinks, a la carte ~$72, bundle at $58–64",
                      "Feature bundle above the fold on the menu page",
                      "Begin monitoring AOV in Otter dashboard to establish bundle baseline",
                    ],
                  },
                  {
                    week: "Week 4",
                    actions: [
                      "Review Otter contract: flat fee vs. commission model",
                      "Apply mobile conversion success threshold: ≥20% increase in order link click-throughs vs. Week 0",
                      "Go/no-go decision on switching to direct ordering (Wix Restaurants or Square Online)",
                    ],
                  },
                ].map((r, i, arr) => (
                  <div
                    key={r.week}
                    className={`px-6 py-5 ${i < arr.length - 1 ? "border-b border-white/10" : ""}`}
                  >
                    <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#4EADA0]">{r.week}</p>
                    <ul className="mt-2 space-y-1.5">
                      {r.actions.map((a) => (
                        <li key={a} className="flex items-start gap-2 text-sm leading-6 text-zinc-300">
                          <span className="mt-2 h-1 w-1 shrink-0 rounded-full bg-zinc-500" />
                          {a}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* ── 90-Day Roadmap ───────────────────────────────────────────────── */}
        <section id="roadmap-90" className="scroll-mt-20 mx-auto max-w-5xl px-4 py-10 sm:px-6">
          <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-400">Roadmap</p>
          <h2 className="mt-2 font-serif t-heading">
            90 days — build on what works
          </h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              {
                month: "Month 1",
                goal: "Fix all verified issues. Establish mobile baseline.",
                actions: [
                  "All Week 1–4 actions from 30-day plan",
                  "Mobile conversion baseline established",
                  "Bundle live · AOV tracking active",
                  "Otter contract evaluated",
                ],
              },
              {
                month: "Month 2",
                goal: "Expand what worked. Start email.",
                actions: [
                  "If bundle AOV lifts ≥20%: make permanent, test second bundle",
                  "If Otter is commission-based: pilot direct ordering",
                  "Create branded email (soulhalal@sohalalsoulfood.com)",
                  "Add email capture on homepage: 'Get our weekly specials'",
                ],
              },
              {
                month: "Month 3",
                goal: "Loyalty, social proof, catering.",
                actions: [
                  "Embed Google Reviews on homepage (min 10 visible)",
                  "Launch loyalty: order 5x, get a free dessert",
                  "Build catering landing page — Halal cert is rare in Atlanta",
                  "Add H1, alt text, and meta description improvements",
                ],
              },
            ].map((r) => (
              <div key={r.month} className="overflow-hidden rounded-2xl border border-zinc-200 bg-white">
                <div className="border-b border-zinc-100 px-5 py-4">
                  <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#1B5EA8]">{r.month}</p>
                  <p className="mt-1 text-sm font-semibold text-zinc-700">{r.goal}</p>
                </div>
                <ul className="divide-y divide-zinc-50 px-5 py-2">
                  {r.actions.map((a) => (
                    <li key={a} className="py-2 text-xs leading-5 text-zinc-600">
                      {a}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ─────────────────────────────────────────────────────────── */}
        <section className="bg-[#0D1B2A] px-4 py-16 text-white sm:px-6">
          <div className="mx-auto max-w-5xl">
            <div className="grid items-center gap-10 md:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.28em] text-zinc-500">
                  Elliyeen Research
                </p>
                <h2 className="mt-4 font-serif t-title">
                  This report is the diagnosis.
                </h2>
                <p className="mt-4 text-base leading-7 text-zinc-400">
                  The implementation — Wix configuration, menu architecture, ordering flow,
                  copy rewrite — is the work Elliyeen handles. One engagement. Documented deliverables.
                  The mobile fix takes 2–4 hours. You can start today.
                </p>
                <p className="mt-4 text-sm text-zinc-500">
                  We run 4 engagements per quarter. The diagnostic call is 20 minutes and free.
                  Three specific findings, whether you work with us or not.
                </p>
              </div>
              <div className="flex flex-col gap-4">
                <div className="rounded-2xl border border-white/10 bg-white/5 p-5">
                  <p className="text-sm font-bold text-white">What the diagnostic includes</p>
                  <div className="mt-4 space-y-3">
                    {[
                      "The single highest-leverage problem on your site — named and located",
                      "The hero headline rewritten to speak to your actual buyer",
                      "The objection your site never answers that's costing orders",
                    ].map((item) => (
                      <div key={item} className="flex items-start gap-2 text-sm text-zinc-300">
                        <CheckCircle2 size={14} className="mt-0.5 shrink-0 text-[#4EADA0]" />
                        {item}
                      </div>
                    ))}
                  </div>
                </div>
                <a
                  href="mailto:abdullah@elliyeen.com?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it."
                  className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1B5EA8] px-6 py-4 text-sm font-bold text-white hover:bg-[#164d8e] transition-colors"
                >
                  Fix it <ArrowUpRight size={15} />
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="border-t border-white/10 bg-[#0D1B2A] px-4 py-8 sm:px-6">
          <div className="mx-auto max-w-5xl flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
            <p className="text-xs text-zinc-500">
              © 2026 Elliyeen Research · All findings are evidence-labeled and dated.
            </p>
            <div className="flex gap-4 text-xs text-zinc-500">
              <a href="/reports" className="transition hover:text-white">All Reports</a>
              <a href="/" className="transition hover:text-white">elliyeen.com</a>
            </div>
          </div>
        </footer>
      </main>

      {/* Back to top */}
      {showTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Back to top"
          className="fixed bottom-6 right-6 z-50 flex h-10 w-10 items-center justify-center rounded-full bg-[#1B5EA8] text-white shadow-lg transition-all hover:bg-[#164d8e] hover:scale-110"
        >
          <ArrowUp size={18} />
        </button>
      )}
    </>
  );
}
