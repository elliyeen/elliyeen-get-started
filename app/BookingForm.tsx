"use client";

import { useState } from "react";
import { CheckCircle2 } from "lucide-react";

export default function BookingForm() {
  const [submitted, setSubmitted] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    // Wire to Formspree, Netlify Forms, or Resend before launch:
    // const data = new FormData(e.currentTarget);
    // await fetch("https://formspree.io/f/your-id", { method: "POST", body: data });
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="flex h-full min-h-[320px] flex-col items-center justify-center gap-4 text-center">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#eef3fb]">
          <CheckCircle2 size={28} className="text-[#1B5EA8]" />
        </div>
        <h3 className="text-lg font-bold text-zinc-900">We have your site.</h3>
        <p className="max-w-xs text-sm leading-6 text-zinc-600">
          Expect three specific findings in your inbox within 48 hours. No pitch. No obligation to continue.
        </p>
        <p className="text-xs text-zinc-400">Check your spam folder if you don&apos;t hear from us.</p>
      </div>
    );
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="w-full space-y-4"
      aria-label="Book your free diagnostic"
    >
      <div>
        <label htmlFor="book-name" className="mb-1.5 block text-sm font-semibold text-zinc-700">
          Your name
        </label>
        <input
          id="book-name"
          name="name"
          type="text"
          autoComplete="given-name"
          required
          placeholder="First name"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
        />
      </div>
      <div>
        <label htmlFor="book-website" className="mb-1.5 block text-sm font-semibold text-zinc-700">
          Your website
        </label>
        <input
          id="book-website"
          name="website"
          type="text"
          required
          placeholder="https://yoursite.com"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
        />
      </div>
      <div>
        <label htmlFor="book-email" className="mb-1.5 block text-sm font-semibold text-zinc-700">
          Work email
        </label>
        <input
          id="book-email"
          name="email"
          type="email"
          autoComplete="email"
          required
          placeholder="you@company.com"
          className="w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-sm outline-none focus:border-zinc-400 focus:ring-2 focus:ring-zinc-100"
        />
      </div>
      <button
        type="submit"
        className="w-full rounded-xl bg-[#111111] px-6 py-4 text-sm font-bold text-white hover:bg-zinc-800"
      >
        Request my free diagnostic
      </button>
      <p className="text-center text-xs text-zinc-400">
        We respond within 48 hours. No pitch. No commitment required.
      </p>
    </form>
  );
}
