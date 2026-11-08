import type { ReactNode } from "react";
import SiteNav from "@/app/SiteNav";

const CONTACT = "mailto:abdullah@elliyeen.com?subject=Elliyeen%20consultation%20request";

/** Shared frame for the staged tools. No data leaves the page: there is no network call, storage or analytics anywhere in these tools. */
export default function ToolShell({ eyebrow, title, intro, children }: { eyebrow: string; title: string; intro: string; children: ReactNode }) {
  return (
    <main className="min-h-screen bg-white text-[#111111]">
      <a href="#tool-content" className="skip-link">Skip to the tool</a>
      <div className="print:hidden"><SiteNav /></div>
      <section className="mx-auto max-w-3xl px-4 pb-6 pt-12 sm:px-6 md:pt-16">
        <p className="text-xs font-bold uppercase tracking-[0.28em] text-zinc-600">{eyebrow}</p>
        <h1 className="mt-3 font-serif t-display">{title}</h1>
        <p className="mt-4 max-w-2xl t-body-lg text-zinc-700">{intro}</p>
        <p className="mt-4 rounded-xl border border-zinc-300 bg-zinc-50 p-4 text-sm leading-[1.7] text-zinc-800" role="note" data-testid="privacy-note">
          <strong>Private by design.</strong> Everything you type stays in this browser tab. Nothing is sent, saved or tracked, and there is no account. Close the tab and it is gone. Please do not type real client, patient or confidential details.
        </p>
        <p className="mt-3 text-xs text-zinc-600">Staging preview. This page is not listed in the site menu or sitemap and is hidden from search engines until it is approved.</p>
      </section>
      <section id="tool-content" tabIndex={-1} className="mx-auto max-w-3xl px-4 pb-16 outline-none sm:px-6">{children}</section>
      <section className="mx-auto max-w-3xl px-4 pb-20 sm:px-6">
        <div className="rounded-2xl border border-zinc-200 bg-[#f7f4ee] p-6">
          <h2 className="font-serif text-xl">Want to talk it through?</h2>
          <p className="mt-2 text-sm leading-[1.7] text-zinc-700">A person at Elliyeen can look at your situation with you. This email link does not include anything you entered here.</p>
          <a href={CONTACT} className="btn btn-primary mt-4">Email Elliyeen</a>
        </div>
      </section>
    </main>
  );
}
