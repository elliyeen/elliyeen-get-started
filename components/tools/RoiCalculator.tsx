"use client";
import { useRef, useState } from "react";
import { computeRoi, validate } from "@/lib/tools/roi";
import type { FieldError, RoiInputs, RoiOutput, Scenario } from "@/lib/tools/roi";

type Raw = Record<keyof RoiInputs, string>;
const FIELDS: { k: keyof RoiInputs; label: string; help: string; unit?: string }[] = [
  { k: "tasksPerMonth", label: "How many times a month does the task happen?", help: "Your own count." },
  { k: "minutesPerTask", label: "Minutes each time, by hand", help: "Include the small stops and restarts." },
  { k: "hourlyCostUsd", label: "Hourly cost of the person doing it (USD)", help: "Wages plus overhead, as you see it." },
  { k: "reviewMinutesPerAutomatedTask", label: "Minutes a person still spends checking each automated task", help: "Review keeps mistakes out. Use 0 only if nobody checks." },
  { k: "shareConservativePct", label: "Cautious guess: percent of tasks that could be automated", help: "Pick what you would be comfortable defending." },
  { k: "shareBasePct", label: "Middle guess: percent automated", help: "Must be at least the cautious guess." },
  { k: "shareOptimisticPct", label: "Hopeful guess: percent automated", help: "Must be at least the middle guess." },
  { k: "oneTimeCostUsd", label: "One-time cost to set it up (USD)", help: "Your own estimate or a quote you hold." },
  { k: "monthlyRunCostUsd", label: "Monthly running cost (USD)", help: "Tools, support, checking time not already counted." },
  { k: "horizonMonths", label: "Months to look at", help: "A whole number from 1 to 60." },
];
const EMPTY = Object.fromEntries(FIELDS.map((f) => [f.k, ""])) as Raw;
const usd = (n: number) => `${n < 0 ? "-" : ""}$${Math.abs(Math.round(n)).toLocaleString("en-US")}`;
const NAMES: Record<Scenario, string> = { conservative: "Cautious case", base: "Middle case", optimistic: "Hopeful case" };

export default function RoiCalculator() {
  const [raw, setRaw] = useState<Raw>(EMPTY);
  const [errors, setErrors] = useState<FieldError[]>([]);
  const [out, setOut] = useState<RoiOutput | null>(null);
  const heading = useRef<HTMLHeadingElement>(null);
  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const parsed = Object.fromEntries(FIELDS.map((f) => [f.k, raw[f.k].trim() === "" ? NaN : Number(raw[f.k])])) as unknown as RoiInputs;
    const errs = validate(parsed); setErrors(errs);
    if (errs.length) { setOut(null); return; }
    setOut(computeRoi(parsed)); setTimeout(() => heading.current?.focus(), 0);
  };
  const reset = () => { setRaw(EMPTY); setErrors([]); setOut(null); };
  const err = (k: keyof RoiInputs) => errors.find((e) => e.field === k)?.message;
  return (
    <div>
      <p className="mb-4 rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm" role="note">You supply every number. Nothing is pre-filled, and nothing here is a prediction or a promise of savings.</p>
      <form onSubmit={submit} noValidate className="grid gap-4" aria-label="ROI inputs">
        {FIELDS.map((f) => (
          <div key={f.k}>
            <label htmlFor={f.k} className="block text-base font-semibold">{f.label}</label>
            <p id={`${f.k}-help`} className="text-sm text-zinc-700">{f.help}</p>
            <input id={f.k} inputMode="decimal" autoComplete="off" value={raw[f.k]} onChange={(e) => setRaw((r) => ({ ...r, [f.k]: e.target.value }))} aria-describedby={`${f.k}-help${err(f.k) ? ` ${f.k}-err` : ""}`} aria-invalid={err(f.k) ? true : undefined}
              className={`mt-1 min-h-[44px] w-full rounded-lg border bg-white px-3 text-base ${err(f.k) ? "border-red-700" : "border-zinc-300"}`} />
            {err(f.k) ? <p id={`${f.k}-err`} className="mt-1 text-sm font-semibold text-red-800">{err(f.k)}</p> : null}
          </div>))}
        <div className="flex flex-wrap gap-3"><button type="submit" className="btn btn-primary">Show the three cases</button><button type="button" onClick={reset} className="btn btn-secondary">Start over</button></div>
      </form>
      <div aria-live="polite" className="mt-8">
        {errors.length ? <p role="alert" className="font-semibold text-red-800">{errors.length} thing{errors.length === 1 ? "" : "s"} to fix above.</p> : null}
        {out ? (
          <section className="rounded-2xl border border-zinc-300 bg-[#f7f4ee] p-6" aria-labelledby="roi-result">
            <h2 id="roi-result" ref={heading} tabIndex={-1} className="font-serif text-2xl outline-none focus-visible:outline-[3px] focus-visible:outline-[#1b5ea8]">Three cases from your numbers</h2>
            <div className="mt-4 overflow-x-auto"><table className="w-full min-w-[520px] text-left text-sm"><caption className="sr-only">Monthly and total results by case</caption>
              <thead><tr><th scope="col" className="py-2 pr-3">Case</th><th scope="col" className="py-2 pr-3">Monthly net</th><th scope="col" className="py-2 pr-3">Net over the period, after set-up</th><th scope="col" className="py-2">Payback</th></tr></thead>
              <tbody>{(["conservative", "base", "optimistic"] as Scenario[]).map((s) => { const r = out.scenarios[s]; return <tr key={s} className="border-t border-zinc-300"><th scope="row" className="py-2 pr-3 font-semibold">{NAMES[s]}{s === "conservative" ? " (the one to plan around)" : ""}</th><td className="py-2 pr-3">{usd(r.monthlyNetUsd)}</td><td className="py-2 pr-3">{usd(r.netOverHorizonUsd)}</td><td className="py-2">{r.paybackMonths === "never" ? "not within these numbers" : `${r.paybackMonths} months`}</td></tr>; })}</tbody></table></div>
            <h3 className="mt-5 font-semibold">What moves the answer most</h3>
            <ol className="mt-1 list-decimal pl-6 text-sm leading-[1.8]">{out.sensitivity.map((s) => <li key={s.input}>{s.label}: a 20% change moves the middle case by about {usd(s.swingUsd)}</li>)}</ol>
            <h3 className="mt-5 font-semibold">How this was worked out</h3>
            <ul className="mt-1 list-disc pl-6 text-sm leading-[1.8]">{out.assumptions.map((a) => <li key={a}>{a}</li>)}</ul>
          </section>) : null}
      </div>
    </div>
  );
}
