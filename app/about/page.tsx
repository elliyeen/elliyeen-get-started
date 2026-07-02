import type { Metadata } from "next";
import SiteNav from "@/app/SiteNav";
import { ArrowRight, CheckCircle2 } from "lucide-react";

export const metadata: Metadata = {
  title: "About — Elliyeen Research",
  description:
    "Elliyeen Research audits websites using 18 frameworks to find what is costing you revenue — then delivers the ranked roadmap and replacement copy to fix it.",
  alternates: { canonical: "https://www.elliyeen.com/about" },
};

const CONTACT_MAILTO =
  "mailto:abdullah@elliyeen.com" +
  "?subject=Website%20audit%20inquiry%20%E2%80%94%20let%27s%20work%20together" +
  "&body=Hi%20Abbas%2C%0A%0AI%27d%20like%20to%20get%20my%20website%20audited%20by%20Elliyeen.%0A%0AWebsite%3A%20%5Bpaste%20your%20URL%20here%5D%0A%0ALooking%20forward%20to%20it.";

const steps = [
  {
    n: "01",
    title: "Send your URL",
    body: "Email your site address and a one-line description of your primary buyer. No intake form. No discovery call required to start.",
  },
  {
    n: "02",
    title: "Receive the audit",
    body: "Elliyeen runs 18 frameworks across your site — copy, trust, UX, SEO, conversion, and AI search readiness — in a single session. Every gap is documented with evidence and ranked by revenue impact.",
  },
  {
    n: "03",
    title: "Get the fix, not just the finding",
    body: "Your report arrives with the ranked roadmap and the replacement copy already written — the new headline, the fixed CTA, the resolved objection. You paste it in. You don't need to interpret anything.",
  },
  {
    n: "04",
    title: "Implement and measure",
    body: "A 30-day action plan ships with the report, ordered so each change is isolated and measurable. Optional implementation support is available to review changes and run a second-pass audit.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <SiteNav />

      {/* Hero */}
      <section className="mx-auto max-w-4xl px-4 pb-16 pt-14 sm:px-6 md:pt-20">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">
          About Elliyeen Research
        </p>
        <h1 className="mt-4 font-serif t-display">
          Find what&apos;s costing you revenue.<br />Get the fix with it.
        </h1>
        <p className="mt-6 max-w-2xl t-body-lg text-zinc-600">
          Elliyeen audits websites using 18 specialist frameworks and delivers
          the ranked roadmap plus the replacement copy — not a list of problems,
          but a decision: here is what to fix, here is why it comes first,
          and here is exactly what to replace it with.
        </p>
      </section>

      {/* Purpose */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">
            What Elliyeen is for
          </p>
          <h2 className="mt-4 font-serif t-title">
            For businesses where the site should be converting more than it is.
          </h2>
          <div className="mt-6 space-y-5 text-base leading-[1.8] text-zinc-600">
            <p>
              Most website audits produce a PDF with 40 bullet points, zero prioritization,
              and recommendations written by someone who has never tried to convert a
              customer in their life. The agency gets paid. The report gets filed.
              The site stays broken.
            </p>
            <p>
              Elliyeen was built as the alternative. If your site gets visitors but
              doesn&apos;t convert them at the rate it should — if people read your
              pricing page and don&apos;t contact you, if your bounce rate is high but
              you don&apos;t know why, if you&apos;re planning a rewrite but don&apos;t
              know what to keep — this is the engagement.
            </p>
            <p>
              The question is never whether there&apos;s friction on your site.
              There always is. The question is which friction is costing the most —
              and what specifically to put in its place.
            </p>
          </div>
        </div>
      </section>

      {/* How to use it */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">
            How it works
          </p>
          <h2 className="mt-4 font-serif t-title">
            Four steps. Everything delivered in writing.
          </h2>
          <div className="mt-10 space-y-0">
            {steps.map((step, i) => (
              <div
                key={step.n}
                className={`flex items-start gap-6 py-8 ${i > 0 ? "border-t border-zinc-100" : ""}`}
              >
                <span className="shrink-0 font-serif text-2xl font-bold text-zinc-200 leading-none pt-0.5">
                  {step.n}
                </span>
                <div>
                  <p className="font-semibold text-zinc-900">{step.title}</p>
                  <p className="mt-2 text-sm leading-[1.8] text-zinc-600">{step.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What clients get */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">
            What you receive
          </p>
          <h2 className="mt-4 font-serif t-title">
            Not a report. A decision.
          </h2>
          <p className="mt-4 text-base leading-[1.8] text-zinc-600">
            Every Elliyeen audit delivers the same three outputs — whether the engagement
            is a single audit or a full implementation.
          </p>
          <div className="mt-8 grid gap-5 sm:grid-cols-3">
            {[
              {
                n: "01",
                title: "Ranked roadmap",
                body: "Every gap ordered by revenue impact. The highest-leverage fix comes first. You always know what to do next.",
              },
              {
                n: "02",
                title: "Replacement copy",
                body: "Every headline, CTA, and objection response that needs to change is rewritten and delivered with the report.",
              },
              {
                n: "03",
                title: "30-day action plan",
                body: "Isolated weekly steps so each change is measurable and the cause of any movement is clear.",
              },
            ].map((item) => (
              <div key={item.n} className="rounded-2xl border border-zinc-100 bg-[#f7f4ee] p-6">
                <p className="font-mono text-xs font-bold text-[#1B5EA8]">{item.n}</p>
                <p className="mt-3 font-semibold text-zinc-900">{item.title}</p>
                <p className="mt-2 text-sm leading-6 text-zinc-600">{item.body}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 grid gap-3 sm:grid-cols-2">
            {[
              "Positioning & headline clarity",
              "Trust signal architecture",
              "Objection mapping — named and located",
              "Copy conversion analysis",
              "UX friction and flow gaps",
              "Mobile rendering and performance",
              "SEO — technical and on-page",
              "AI search readiness (AEO)",
              "Call-to-action structure",
              "Social proof placement",
              "Revenue model and pricing display",
              "Competitive differentiation gaps",
            ].map((item) => (
              <div key={item} className="flex items-start gap-3 text-sm text-zinc-700">
                <CheckCircle2 size={15} className="mt-0.5 shrink-0 text-[#1B5EA8]" />
                {item}
              </div>
            ))}
          </div>
          <div className="mt-8 rounded-xl bg-[#111111] px-5 py-4 text-center text-sm font-bold tracking-wide text-white">
            18 frameworks · 1 clear roadmap · copy rewrites included
          </div>
        </div>
      </section>

      {/* Abbas */}
      <section className="mx-auto max-w-4xl px-4 pb-12 sm:px-6">
        <div className="rounded-[2rem] border border-zinc-200 bg-white p-8 md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-400">
            The founder
          </p>
          <h2 className="mt-4 font-serif t-title">
            Abbas Abdullah
          </h2>
          <p className="mt-1 text-sm text-zinc-400">Founder, Elliyeen Research</p>

          <div className="mt-6 space-y-5 text-base leading-[1.8] text-zinc-600">
            <p>
              Abbas has spent his career at the intersection of customer behavior,
              revenue systems, and digital experience — working with organizations
              including Motorola Solutions, OCC, Aurora Flight Sciences, and PayBlue.
            </p>
            <p>
              At each of those organizations, the cost of a missed signal was measured
              in real numbers. That standard — find the specific problem, model the
              impact, deliver the fix — is what Elliyeen applies to every website audit.
            </p>
            <p>
              Elliyeen takes four engagements per quarter. The constraint is deliberate.
              Every audit gets the full methodology, not a templated scan. The output is
              a report you can act on the same day you receive it.
            </p>
          </div>

          <a
            href="https://www.linkedin.com/in/abbasabdullah/"
            target="_blank"
            rel="noopener noreferrer"
            className="mt-6 inline-flex items-center gap-2 rounded-full border border-zinc-200 px-5 py-2.5 text-sm font-medium text-zinc-700 hover:border-[#0A66C2] hover:text-[#0A66C2] transition-colors"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
              <rect x="2" y="9" width="4" height="12" />
              <circle cx="4" cy="4" r="2" />
            </svg>
            LinkedIn
          </a>
        </div>
      </section>

      {/* CTA */}
      <section className="mx-auto max-w-4xl px-4 pb-20 sm:px-6">
        <div className="rounded-[2rem] bg-[#0D1B2A] p-8 text-white md:p-12">
          <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">
            Work with Elliyeen
          </p>
          <h2 className="mt-4 font-serif t-title">
            Four engagements per quarter.
          </h2>
          <p className="mt-4 max-w-xl text-base leading-[1.8] text-zinc-400">
            If you&apos;re planning a site change, a campaign, or a pricing update —
            audit before you build. The fix is almost never what you think it is.
          </p>
          <a
            href={CONTACT_MAILTO}
            className="mt-8 inline-flex h-[54px] w-full items-center justify-center gap-2 rounded-full bg-[#123A5A] px-9 text-sm font-bold text-[#F5F1E7] shadow-[0_6px_28px_rgba(18,58,90,0.22)] transition-colors duration-200 hover:bg-[#D87A24] active:bg-[#b8620e] sm:w-auto sm:min-w-[180px]"
          >
            Get Started <ArrowRight size={15} />
          </a>
          <p className="mt-4 text-xs text-zinc-600">
            Email opens pre-filled. You paste your URL and send.
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-zinc-200 bg-white px-4 py-8 sm:px-6">
        <div className="mx-auto max-w-4xl flex flex-col items-center gap-3 sm:flex-row sm:justify-between">
          <p className="text-xs text-zinc-400">© {new Date().getFullYear()} Elliyeen Research</p>
          <div className="flex gap-5 text-xs text-zinc-400">
            <a href="/" className="hover:text-black">Home</a>
            <a href="/reports" className="hover:text-black">Reports</a>
            <a href={CONTACT_MAILTO} className="hover:text-black">Contact</a>
          </div>
        </div>
      </footer>
    </main>
  );
}
