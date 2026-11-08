"use client";
import { useRef, useState } from "react";
import RadioGroup from "./RadioGroup";
import { QUESTIONS, summarize } from "@/lib/tools/opportunity";
import type { Answers, Summary } from "@/lib/tools/opportunity";

const LABEL = { strong: "Worth a conversation", mixed: "Mixed: worth discussing the gaps", weak: "Probably not the first step" } as const;
export default function OpportunityAssessment() {
  const [answers, setAnswers] = useState<Answers>({});
  const [summary, setSummary] = useState<Summary | null>(null);
  const [tried, setTried] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const submit = (e: React.FormEvent) => {
    e.preventDefault(); setTried(true);
    const s = summarize(answers); setSummary(s);
    if (s.complete) setTimeout(() => heading.current?.focus(), 0);
  };
  const reset = () => { setAnswers({}); setSummary(null); setTried(false); };
  const missing = new Set(summary?.missing ?? []);
  return (
    <div>
      <form onSubmit={submit} noValidate className="grid gap-4" aria-label="AI opportunity questions">
        <p className="text-sm text-zinc-700">Think of <strong>one</strong> repetitive task. Eight short questions, about two minutes.</p>
        {QUESTIONS.map((q) => (
          <RadioGroup key={q.id} legend={q.text} help={q.help} name={q.id} options={q.options} value={answers[q.id]} onChange={(v) => setAnswers((a) => ({ ...a, [q.id]: v as 0 | 1 | 2 | 3 }))} error={tried && missing.has(q.id)} />
        ))}
        <div className="flex flex-wrap gap-3">
          <button type="submit" className="btn btn-primary">See my summary</button>
          <button type="button" onClick={reset} className="btn btn-secondary">Start over</button>
        </div>
      </form>
      <div aria-live="polite" className="mt-8">
        {summary && !summary.complete ? <p role="alert" className="font-semibold text-red-800">{summary.missing.length} question{summary.missing.length === 1 ? "" : "s"} still need an answer.</p> : null}
        {summary?.complete ? (
          <section className="rounded-2xl border border-zinc-300 bg-[#f7f4ee] p-6" aria-labelledby="opp-result">
            <h2 id="opp-result" ref={heading} tabIndex={-1} className="font-serif text-2xl outline-none focus-visible:outline-[3px] focus-visible:outline-[#1b5ea8]">{LABEL[summary.signal!]}</h2>
            <p className="mt-2 text-base text-zinc-800">{summary.nextStep}</p>
            {summary.strengths.length ? <><h3 className="mt-5 font-semibold">What points in favour</h3><ul className="mt-1 list-disc pl-6 text-sm leading-[1.8]">{summary.strengths.map((s) => <li key={s}>{s}</li>)}</ul></> : null}
            {summary.gaps.length ? <><h3 className="mt-5 font-semibold">Gaps to close first</h3><ul className="mt-1 list-disc pl-6 text-sm leading-[1.8]">{summary.gaps.map((s) => <li key={s}>{s}</li>)}</ul></> : null}
            {summary.cautions.length ? <><h3 className="mt-5 font-semibold">Be careful about</h3><ul className="mt-1 list-disc pl-6 text-sm leading-[1.8]">{summary.cautions.map((s) => <li key={s}>{s}</li>)}</ul></> : null}
            <h3 className="mt-5 font-semibold">What this does not tell you</h3>
            <ul className="mt-1 list-disc pl-6 text-sm leading-[1.8]">{summary.unknowns.map((s) => <li key={s}>{s}</li>)}</ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
