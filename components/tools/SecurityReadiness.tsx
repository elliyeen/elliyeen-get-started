"use client";
import { useRef, useState } from "react";
import RadioGroup from "./RadioGroup";
import { HEALTH_Q, ITEMS, assess } from "@/lib/tools/security";
import type { Reply, Result } from "@/lib/tools/security";

const OPTS = [{ value: "yes", label: "Yes" }, { value: "no", label: "No" }, { value: "unsure", label: "Not sure" }];
export default function SecurityReadiness() {
  const [replies, setReplies] = useState<Partial<Record<string, Reply>>>({});
  const [health, setHealth] = useState<Reply | undefined>();
  const [result, setResult] = useState<Result | null>(null);
  const [tried, setTried] = useState(false);
  const heading = useRef<HTMLHeadingElement>(null);
  const submit = (e: React.FormEvent) => { e.preventDefault(); setTried(true); const r = assess(replies, health); setResult(r); if (r.complete) setTimeout(() => heading.current?.focus(), 0); };
  const reset = () => { setReplies({}); setHealth(undefined); setResult(null); setTried(false); };
  const missing = new Set(result?.missing ?? []);
  return (
    <div>
      <form onSubmit={submit} noValidate className="grid gap-4" aria-label="Security readiness questions">
        <p className="text-sm text-zinc-700">Thirteen yes or no questions. Answer "Not sure" when you do not know: it is shown as something to confirm.</p>
        {ITEMS.map((i) => <RadioGroup key={i.id} legend={i.text} help={i.help} name={i.id} options={OPTS} value={replies[i.id]} onChange={(v) => setReplies((r) => ({ ...r, [i.id]: v as Reply }))} error={tried && missing.has(i.id)} />)}
        <RadioGroup legend={HEALTH_Q} name="health" options={OPTS} value={health} onChange={(v) => setHealth(v as Reply)} error={tried && missing.has("health")} />
        <div className="flex flex-wrap gap-3"><button type="submit" className="btn btn-primary">See my gap summary</button><button type="button" onClick={reset} className="btn btn-secondary">Start over</button></div>
      </form>
      <div aria-live="polite" className="mt-8">
        {result && !result.complete ? <p role="alert" className="font-semibold text-red-800">{result.missing.length} question{result.missing.length === 1 ? "" : "s"} still need an answer.</p> : null}
        {result?.complete ? (
          <section className="rounded-2xl border border-zinc-300 bg-[#f7f4ee] p-6" aria-labelledby="sec-result">
            <h2 id="sec-result" ref={heading} tabIndex={-1} className="font-serif text-2xl outline-none focus-visible:outline-[3px] focus-visible:outline-[#1b5ea8]">{result.inPlace} of {result.total} basics in place</h2>
            <p className="mt-2 rounded-lg border border-zinc-300 bg-white p-3 text-sm" role="note">{result.disclaimer}</p>
            {result.healthNote ? <p className="mt-3 rounded-lg border border-amber-700 bg-amber-50 p-3 text-sm text-amber-950" role="note">{result.healthNote}</p> : null}
            {result.gaps.length ? <><h3 className="mt-5 font-semibold">What to look at first</h3><ol className="mt-1 list-decimal pl-6 text-sm leading-[1.8]">{result.gaps.map((g) => <li key={g.id}><span className="font-semibold">{g.area}.</span> {g.text} <span className="text-zinc-700">({g.status === "gap" ? "answered No" : "not confirmed"})</span></li>)}</ol></> : <p className="mt-4 text-sm">You answered yes to every basic. That does not mean you are secure; it means these basics were not flagged by your own answers.</p>}
            <h3 className="mt-5 font-semibold">By area</h3>
            <ul className="mt-1 text-sm leading-[1.8]">{result.byArea.map((a) => <li key={a.area}>{a.area}: {a.ok} in place, {a.gap} to look at</li>)}</ul>
          </section>
        ) : null}
      </div>
    </div>
  );
}
