import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Do Not Sell My Personal Data · Elliyeen",
  description: "Submit a request to opt out of the sale or sharing of your personal information under CCPA and applicable privacy laws.",
  alternates: { canonical: "https://www.elliyeen.com/do-not-sell" },
};

export default function DoNotSellPage() {
  return (
    <main className="min-h-screen bg-[#f7f4ee] text-[#111111]">
      <div className="mx-auto max-w-2xl px-4 py-20 sm:px-6">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-500">Privacy Rights</p>
        <h1 className="mt-4 font-serif text-4xl tracking-[-0.03em] sm:text-5xl">
          Do Not Sell My Personal Data
        </h1>
        <p className="mt-6 text-base leading-7 text-zinc-600">
          Under the California Consumer Privacy Act (CCPA) and other applicable privacy laws, you have the right to opt out of the sale or sharing of your personal information.
        </p>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          Elliyeen Research does not sell personal data to third parties. We collect only the information you provide directly (name, email, website URL) for the purpose of delivering audit services and communicating about your engagement.
        </p>
        <p className="mt-4 text-base leading-7 text-zinc-600">
          If you would like to request deletion of any data we hold about you, or to confirm what data we have on record, email us directly:
        </p>
        <a
          href="mailto:privacy@elliyeen.com?subject=Do%20Not%20Sell%20My%20Data%20Request"
          className="mt-8 inline-flex items-center gap-2 rounded-xl bg-[#111111] px-6 py-3 text-sm font-bold text-white hover:bg-zinc-800"
        >
          Submit a Privacy Request →
        </a>

        <div className="mt-12 border-t border-zinc-200 pt-10 space-y-6 text-sm leading-6 text-zinc-500">
          <div>
            <p className="font-semibold text-zinc-800">What data we collect</p>
            <p className="mt-1">Name, email address, and website URL provided through contact forms or direct email. Aggregate analytics data (page views, session duration) collected via privacy-respecting tools — no personally identifiable information is tied to this data.</p>
          </div>
          <div>
            <p className="font-semibold text-zinc-800">How we use it</p>
            <p className="mt-1">Solely to deliver audit services, communicate about your engagement, and send relevant follow-up. We do not share, sell, or trade your information with any third party.</p>
          </div>
          <div>
            <p className="font-semibold text-zinc-800">Response time</p>
            <p className="mt-1">We will respond to all privacy requests within 30 days as required by applicable law.</p>
          </div>
        </div>

        <p className="mt-10 text-xs text-zinc-400">Last updated: June 2026. Questions? Contact <a href="mailto:privacy@elliyeen.com" className="underline underline-offset-2 hover:text-zinc-700">privacy@elliyeen.com</a></p>
      </div>
    </main>
  );
}
