"use client";
import { useId } from "react";

export interface Opt { value: string | number; label: string }
/** A labelled radio group: fieldset + legend, native radios, arrow-key navigation from the browser, 44px targets. */
export default function RadioGroup({ legend, help, name, options, value, onChange, error }: { legend: string; help?: string; name: string; options: Opt[]; value: string | number | undefined; onChange: (v: string | number) => void; error?: boolean }) {
  const hid = useId();
  return (
    <fieldset className={`rounded-xl border p-4 ${error ? "border-red-700" : "border-zinc-200"}`} aria-describedby={[help ? hid : "", error ? `${hid}-err` : ""].filter(Boolean).join(" ") || undefined} aria-invalid={error ? true : undefined}>
      <legend className="px-1 text-base font-semibold text-zinc-900">{legend}</legend>
      {help ? <p id={hid} className="mb-2 text-sm text-zinc-700">{help}</p> : null}
      <div className="mt-1 grid gap-2 sm:grid-cols-2">
        {options.map((o) => {
          const id = `${name}-${o.value}`;
          return (
            <label key={id} htmlFor={id} className="flex min-h-[44px] cursor-pointer items-center gap-3 rounded-lg border border-zinc-200 px-3 py-2 text-sm hover:bg-zinc-50 has-[:checked]:border-[#123A5A] has-[:checked]:bg-[#e8eef6] has-[:focus-visible]:outline has-[:focus-visible]:outline-[3px] has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-[#1b5ea8]">
              <input id={id} type="radio" name={name} value={String(o.value)} checked={value === o.value} onChange={() => onChange(o.value)} className="h-5 w-5 accent-[#123A5A]" />
              <span>{o.label}</span>
            </label>
          );
        })}
      </div>
      {error ? <p id={`${hid}-err`} className="mt-2 text-sm font-semibold text-red-800">Please choose an answer.</p> : null}
    </fieldset>
  );
}
