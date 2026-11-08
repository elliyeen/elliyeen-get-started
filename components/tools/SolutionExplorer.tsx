"use client";
import { useState } from "react";
import { SYSTEMS, WORKFLOWS, explore } from "@/lib/tools/explorer";
import type { System, Workflow } from "@/lib/tools/explorer";

export default function SolutionExplorer() {
  const [workflow, setWorkflow] = useState<Workflow | "any">("any");
  const [systems, setSystems] = useState<System[]>([]);
  const [health, setHealth] = useState(false);
  const { matches, notes } = explore(workflow, systems, health);
  const toggle = (s: System) => setSystems((cur) => (cur.includes(s) ? cur.filter((x) => x !== s) : [...cur, s]));
  return (
    <div>
      <form className="grid gap-4" aria-label="Explorer filters" onSubmit={(e) => e.preventDefault()}>
        <div>
          <label htmlFor="wf" className="block text-base font-semibold">What kind of work?</label>
          <select id="wf" value={workflow} onChange={(e) => setWorkflow(e.target.value as Workflow | "any")} className="mt-1 min-h-[44px] w-full rounded-lg border border-zinc-300 bg-white px-3 text-base">
            <option value="any">Any</option>{WORKFLOWS.map((w) => <option key={w.id} value={w.id}>{w.label}</option>)}
          </select>
        </div>
        <fieldset className="rounded-xl border border-zinc-200 p-4">
          <legend className="px-1 text-base font-semibold">Which tools are involved? (optional)</legend>
          <div className="mt-1 grid gap-2 sm:grid-cols-2">{SYSTEMS.map((s) => (
            <label key={s.id} className="flex min-h-[44px] items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50"><input type="checkbox" checked={systems.includes(s.id)} onChange={() => toggle(s.id)} className="h-5 w-5 accent-[#123A5A]" />{s.label}</label>))}</div>
        </fieldset>
        <label className="flex min-h-[44px] items-center gap-3 text-sm"><input type="checkbox" checked={health} onChange={(e) => setHealth(e.target.checked)} className="h-5 w-5 accent-[#123A5A]" />This involves patient or health information</label>
      </form>
      <div className="mt-6 grid gap-2" role="note" data-testid="explorer-notes">{notes.map((n) => <p key={n} className="rounded-lg border border-zinc-300 bg-zinc-50 p-3 text-sm">{n}</p>)}</div>
      <div aria-live="polite" className="mt-6 grid gap-4">
        <h2 className="font-serif text-2xl">{matches.length} illustrative pattern{matches.length === 1 ? "" : "s"}</h2>
        {matches.length === 0 ? <p className="text-sm">No example matches those choices. That does not mean it cannot be done; it means there is no illustrated pattern here.</p> : null}
        {matches.map((p) => (
          <article key={p.id} className="rounded-2xl border border-zinc-200 bg-[#f7f4ee] p-5">
            <p className="text-xs font-bold uppercase tracking-[0.2em] text-zinc-600">Illustrative example</p>
            <h3 className="mt-1 font-serif text-xl">{p.name}</h3>
            <p className="mt-2 text-sm leading-[1.7]">{p.summary}</p>
            <h4 className="mt-3 text-sm font-semibold">Steps</h4><ol className="mt-1 list-decimal pl-6 text-sm leading-[1.8]">{p.steps.map((s) => <li key={s}>{s}</li>)}</ol>
            <h4 className="mt-3 text-sm font-semibold">Where a person stays in charge</h4><ul className="mt-1 list-disc pl-6 text-sm leading-[1.8]">{p.humanCheckpoints.map((s) => <li key={s}>{s}</li>)}</ul>
            <h4 className="mt-3 text-sm font-semibold">Risks to weigh</h4><ul className="mt-1 list-disc pl-6 text-sm leading-[1.8]">{p.risks.map((s) => <li key={s}>{s}</li>)}</ul>
          </article>))}
      </div>
    </div>
  );
}
