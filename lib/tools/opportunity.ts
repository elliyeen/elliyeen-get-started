// AI Opportunity Assessment logic. A short, voluntary questionnaire turned into a plain-language summary. It scores nothing about the visitor's
// business quality and predicts no result; it only says whether a conversation about this task looks worthwhile and what to be careful about.

export interface Question { id: string; area: string; text: string; help: string; options: { value: 0 | 1 | 2 | 3; label: string }[]; kind: "fit" | "caution" }
export type Answers = Record<string, 0 | 1 | 2 | 3 | undefined>;
export type Signal = "strong" | "mixed" | "weak";
export interface Summary { complete: boolean; missing: string[]; signal: Signal | null; fitScore: number; fitMax: number; strengths: string[]; gaps: string[]; cautions: string[]; nextStep: string; unknowns: string[] }

const o = (a: string, b: string, c: string, d: string) => [{ value: 0 as const, label: a }, { value: 1 as const, label: b }, { value: 2 as const, label: c }, { value: 3 as const, label: d }];
export const QUESTIONS: Question[] = [
  { id: "volume", area: "Volume", kind: "fit", text: "How often does this task happen?", help: "Think of one specific task, such as entering new client details.", options: o("A few times a month or less", "Weekly", "Daily", "Many times a day") },
  { id: "rules", area: "Consistency", kind: "fit", text: "Are the steps written down and mostly the same each time?", help: "If each case needs a judgement call, that is a signal to keep a person involved.", options: o("No, it varies a lot", "Somewhat", "Mostly", "Yes, a written procedure") },
  { id: "digital", area: "Data", kind: "fit", text: "Is the information the task needs already in digital form?", help: "Paper, phone calls and photos are harder to work with.", options: o("Mostly paper or phone", "Some digital", "Mostly digital", "All digital and organised") },
  { id: "review", area: "Human review", kind: "fit", text: "Could a person check the result before anything leaves your organisation?", help: "Review is what keeps mistakes from reaching clients.", options: o("No", "Sometimes", "Usually", "Always, by a named person") },
  { id: "systems", area: "Systems", kind: "fit", text: "Can the tools you use share data (export, import or an integration)?", help: "If you are not sure, choose the first option.", options: o("Not sure", "No", "Some can", "Yes") },
  { id: "owner", area: "Ownership", kind: "fit", text: "Is there a named person who owns this process and could judge whether the result is right?", help: "Someone has to be able to say whether it worked.", options: o("No one", "Shared, unclear", "Yes, but busy", "Yes, clearly") },
  { id: "error", area: "Cost of mistakes", kind: "caution", text: "What happens if the task is done wrong?", help: "This does not lower the fit; it raises the care needed.", options: o("Little or nothing", "Some rework", "Lost money or a lost client", "Safety, legal or regulatory harm") },
  { id: "sensitivity", area: "Data sensitivity", kind: "caution", text: "Does the task involve personal, financial or health information?", help: "Health information can bring legal duties. Do not enter real examples on this page.", options: o("None", "Some personal details", "Sensitive personal or financial data", "Health or other regulated data") },
];
const FIT = QUESTIONS.filter((q) => q.kind === "fit");

export function summarize(a: Answers): Summary {
  const missing = QUESTIONS.filter((q) => a[q.id] === undefined).map((q) => q.id);
  const base = { fitMax: FIT.length * 3, unknowns: ["This is a self-reported snapshot of one task. It does not look at your systems, data or contracts.", "It does not estimate savings; use the ROI calculator with your own numbers for that."] };
  if (missing.length) return { ...base, complete: false, missing, signal: null, fitScore: 0, strengths: [], gaps: [], cautions: [], nextStep: "Answer every question to see a summary." };
  const fitScore = FIT.reduce((s, q) => s + (a[q.id] as number), 0);
  const signal: Signal = fitScore >= 13 ? "strong" : fitScore >= 8 ? "mixed" : "weak";
  const strengths = FIT.filter((q) => (a[q.id] as number) >= 2).map((q) => `${q.area}: ${q.options[a[q.id] as number].label}`);
  const gaps = FIT.filter((q) => (a[q.id] as number) <= 1).map((q) => `${q.area}: ${q.options[a[q.id] as number].label}`);
  const cautions: string[] = [];
  if ((a.error as number) >= 2) cautions.push("Mistakes would be costly, so keep a person approving every result and start small.");
  if ((a.sensitivity as number) === 2) cautions.push("Sensitive data is involved. A security review comes before any build, and no real data should be used in a trial.");
  if ((a.sensitivity as number) === 3) cautions.push("Health or other regulated data may be involved. Legal duties such as HIPAA may apply. Do not use real records in any trial; a qualified reviewer must decide what applies before work starts.");
  if ((a.review as number) === 0) cautions.push("With no human review the risk is higher. Add a review step before anything is automated.");
  const nextStep = signal === "strong" ? "This task looks worth a short conversation about a small, reviewed pilot." : signal === "mixed" ? "A conversation could help decide whether to fix the gaps first or pick a different task." : "Automation is probably not the first step for this task. Document the process and gather data first.";
  return { ...base, complete: true, missing: [], signal, fitScore, strengths, gaps, cautions, nextStep };
}
