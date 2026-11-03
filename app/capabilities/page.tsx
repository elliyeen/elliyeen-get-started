import type { Metadata } from "next";
import SiteNav from "@/app/SiteNav";
import { ArrowRight } from "lucide-react";

const URL_CANONICAL = "https://www.elliyeen.com/capabilities";

export const metadata: Metadata = {
  title: "Capabilities — Elliyeen LLC",
  description:
    "Elliyeen LLC is a Dallas-based technology and cybersecurity solutions company. Core capabilities, the proposed Station Readiness solution, engagement model and procurement information.",
  alternates: { canonical: URL_CANONICAL },
  openGraph: { title: "Capabilities — Elliyeen LLC", url: URL_CANONICAL, type: "website" },
};

const CONTACT_MAILTO = "mailto:abdullah@elliyeen.com?subject=Elliyeen%20capabilities%20inquiry";
const PROCUREMENT_MAILTO = "mailto:abdullah@elliyeen.com?subject=Request%20for%20procurement%20details";

const capabilities = [
  {
    n: "01",
    title: "Super Intelligence (SI) and operational decision-support engineering",
    body: "Workflow automation, human oversight and evidence-backed analytics.",
  },
  {
    n: "02",
    title: "Cybersecurity and quantum-resilient security engineering",
    body: "Zero Trust, post-quantum cryptography (PQC), secure systems engineering and AI security.",
  },
  {
    n: "03",
    title: "Data integration and cloud engineering",
    body: "API integration, data pipelines, cloud-native architecture and traceability.",
  },
  {
    n: "04",
    title: "Infrastructure readiness and assurance",
    body: "Inspections, work orders, SLA tracking, accessibility and verified corrective action.",
  },
];

const engagement = [
  { n: "01", title: "Discovery", body: "Understand the operation, its data and its constraints." },
  { n: "02", title: "Baseline and integration assessment", body: "Establish how work is tracked today and what an integration would involve." },
  {
    n: "03",
    title: "Proposed six-month paid pilot",
    body: "Month 1 success criteria, month 3 checkpoint, month 6 evidence-backed evaluation.",
  },
];

const facts = [
  ["Legal name", "Elliyeen LLC"],
  ["Operating location", "Dallas, Texas"],
  ["Formation state", "Wyoming"],
  ["Website", "www.elliyeen.com"],
  ["Contact", "abdullah@elliyeen.com"],
  ["UEI, CAGE, NAICS, SAM.gov registration", "Available upon request"],
  ["Socioeconomic certifications, insurance, contract vehicles", "Available upon request"],
];

export default function CapabilitiesPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <div className="print:hidden">
        <SiteNav />
      </div>

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pb-12 pt-14 sm:px-6 md:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Capability statement</p>
        <h1 className="mt-4 font-serif t-display">Elliyeen LLC</h1>
        <p className="mt-6 max-w-2xl t-body-lg text-zinc-700">
          A Dallas-based technology and cybersecurity solutions company, formed in Wyoming and operating from Dallas, Texas.
        </p>
        <p className="mt-4 max-w-2xl text-base leading-[1.8] text-zinc-700">
          <strong>Mission.</strong> Make complex infrastructure and enterprise operations more secure, measurable, and accountable.
        </p>
        <p className="mt-3 max-w-2xl text-base leading-[1.8] text-zinc-700">
          <strong>Experience.</strong> Over 20 years of combined experience across military service, information technology, and
          Super Intelligence (SI).
        </p>
        <div className="mt-8 flex flex-wrap gap-3 print:hidden">
          <a
            href={CONTACT_MAILTO}
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#123A5A] px-6 text-sm font-bold text-[#F5F1E7] transition-colors hover:bg-[#D87A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123A5A]"
          >
            Contact Elliyeen <ArrowRight size={16} aria-hidden="true" />
          </a>
          <a
            href="/dart/"
            className="inline-flex min-h-[44px] items-center gap-2 rounded-full border border-zinc-400 bg-white px-6 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123A5A]"
          >
            See the Station Readiness demo
          </a>
        </div>
      </section>

      {/* Core capabilities */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6" aria-labelledby="core-capabilities">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Core capabilities</p>
          <h2 id="core-capabilities" className="mt-4 font-serif t-title">What Elliyeen builds</h2>
          <ol className="mt-8">
            {capabilities.map((c, i) => (
              <li key={c.n} className={`flex items-start gap-6 py-6 ${i > 0 ? "border-t border-zinc-100" : ""}`}>
                <span className="shrink-0 pt-0.5 font-serif text-2xl font-bold leading-none text-zinc-300" aria-hidden="true">{c.n}</span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{c.title}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-zinc-700">{c.body}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Station Readiness */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6" aria-labelledby="station-readiness">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Featured proposed solution</p>
          <h2 id="station-readiness" className="mt-4 font-serif t-title">Station Readiness</h2>
          <p className="mt-4 text-base leading-[1.8] text-zinc-700">
            Turn transit data into a clean, safe experience for all. Station Readiness is a proposed integration and verification
            layer connecting station issues, the responsible crew or contractor, corrective action, independent evidence,
            human-reviewed verified closure and performance measures.
          </p>
          <p className="mt-4 text-base leading-[1.8] text-zinc-700">
            It starts with a simulated Akard Station / Red Line demonstration.
          </p>
          <p className="mt-6 rounded-xl border border-zinc-300 bg-zinc-50 p-4 text-sm leading-[1.7] text-zinc-800" role="note">
            <strong>Demonstration notice.</strong> The demonstration uses simulated data and shows planned capabilities. It is an
            independent Elliyeen demonstration, not affiliated with or endorsed by DART. It does not imply that DART has contracted
            for, approved, or deployed this system.
          </p>
          <a
            href="/dart/demo"
            className="mt-6 inline-flex min-h-[44px] items-center gap-2 rounded-full bg-[#123A5A] px-6 text-sm font-bold text-[#F5F1E7] transition-colors hover:bg-[#D87A24] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123A5A] print:hidden"
          >
            Open the 90-second demo <ArrowRight size={16} aria-hidden="true" />
          </a>
        </div>
      </section>

      {/* Engagement */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6" aria-labelledby="engagement">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Engagement</p>
          <h2 id="engagement" className="mt-4 font-serif t-title">From discovery to a proposed pilot</h2>
          <ol className="mt-8">
            {engagement.map((e, i) => (
              <li key={e.n} className={`flex items-start gap-6 py-6 ${i > 0 ? "border-t border-zinc-100" : ""}`}>
                <span className="shrink-0 pt-0.5 font-serif text-2xl font-bold leading-none text-zinc-300" aria-hidden="true">{e.n}</span>
                <div>
                  <h3 className="font-semibold text-zinc-900">{e.title}</h3>
                  <p className="mt-2 text-sm leading-[1.8] text-zinc-700">{e.body}</p>
                </div>
              </li>
            ))}
          </ol>
          <p className="mt-4 text-sm text-zinc-700">Pricing and scope are subject to procurement and mutual agreement.</p>
        </div>
      </section>

      {/* Company & procurement */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6" aria-labelledby="procurement">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Company &amp; procurement</p>
          <h2 id="procurement" className="mt-4 font-serif t-title">Company information</h2>
          <dl className="mt-8 divide-y divide-zinc-100">
            {facts.map(([k, v]) => (
              <div key={k} className="grid gap-1 py-4 sm:grid-cols-[1fr_1fr] sm:gap-6">
                <dt className="text-sm font-semibold text-zinc-900">{k}</dt>
                <dd className="text-sm text-zinc-700">{v}</dd>
              </div>
            ))}
          </dl>
          <a
            href={PROCUREMENT_MAILTO}
            className="mt-8 inline-flex min-h-[44px] items-center gap-2 rounded-full border border-zinc-400 bg-white px-6 text-sm font-bold text-zinc-900 transition-colors hover:bg-zinc-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#123A5A] print:hidden"
          >
            Request procurement details
          </a>
        </div>
      </section>
    </main>
  );
}
