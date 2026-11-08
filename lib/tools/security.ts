// Security Readiness questionnaire logic. A voluntary self-check that produces a preliminary gap summary.
// It performs no scanning, touches no system, and is not an assessment, audit or compliance certification.

export type Reply = "yes" | "no" | "unsure";
export interface Item { id: string; area: string; text: string; help: string; weight: 1 | 2 | 3 }
export const ITEMS: Item[] = [
  { id: "mfa", area: "Accounts", weight: 3, text: "Is multi-factor sign-in required for email and for the systems that hold client data?", help: "A code or key in addition to the password." },
  { id: "access", area: "Accounts", weight: 2, text: "When someone leaves or changes role, is their access removed or reviewed within a week?", help: "Include shared accounts and vendor portals." },
  { id: "backup", area: "Recovery", weight: 3, text: "Are backups made automatically and has a restore been tested in the last year?", help: "A backup that was never restored is untested." },
  { id: "patch", area: "Devices and software", weight: 2, text: "Are computers and key software updated automatically or on a schedule someone owns?", help: "Include phones used for work." },
  { id: "incident", area: "Response", weight: 2, text: "Is there a written plan for who does what, and who is told, if something goes wrong?", help: "One page is enough to start." },
  { id: "vendors", area: "Vendors", weight: 2, text: "Do you know which outside services hold your or your clients' data?", help: "Cloud storage, email, payment, AI tools." },
  { id: "logs", area: "Visibility", weight: 1, text: "Would you notice unusual sign-ins or data downloads?", help: "Alerts or regular review of logs." },
  { id: "encryption", area: "Data protection", weight: 2, text: "Are laptops and phones that hold client data encrypted?", help: "Built-in disk encryption counts." },
  { id: "secrets", area: "Data protection", weight: 3, text: "Are passwords, keys and tokens kept in a password manager or secrets tool, never in documents, chat or code?", help: "Shared spreadsheets of passwords are a common gap." },
  { id: "aiuse", area: "AI use", weight: 2, text: "Is there a rule for what may and may not be pasted into AI tools?", help: "Client data, health information and credentials should be excluded by default." },
  { id: "classify", area: "Data protection", weight: 1, text: "Do you know which of your data is sensitive (personal, financial, health) and where it lives?", help: "A simple list is enough." },
  { id: "training", area: "People", weight: 1, text: "Have staff had basic phishing and data-handling guidance in the last year?", help: "Short and practical beats long and rare." },
];
export interface Health { id: "health"; text: string }
export const HEALTH_Q = "Does your organisation handle patient or health information?";
export interface Result { complete: boolean; missing: string[]; gaps: { id: string; area: string; text: string; status: "gap" | "unconfirmed"; weight: number }[]; inPlace: number; total: number; byArea: { area: string; gap: number; ok: number }[]; healthNote: string | null; disclaimer: string }

const DISCLAIMER = "Preliminary self-check only. It did not scan or test anything, is not a security assessment or audit, and is not a compliance certification. It cannot tell you that you are secure or compliant.";
export function assess(replies: Partial<Record<string, Reply>>, health: Reply | undefined): Result {
  const missing = ITEMS.filter((i) => !replies[i.id]).map((i) => i.id);
  if (missing.length || !health) return { complete: false, missing: [...missing, ...(health ? [] : ["health"])], gaps: [], inPlace: 0, total: ITEMS.length, byArea: [], healthNote: null, disclaimer: DISCLAIMER };
  const gaps = ITEMS.filter((i) => replies[i.id] !== "yes").map((i) => ({ id: i.id, area: i.area, text: i.text, status: (replies[i.id] === "no" ? "gap" : "unconfirmed") as "gap" | "unconfirmed", weight: i.weight }))
    .sort((a, b) => b.weight - a.weight || (a.status === b.status ? 0 : a.status === "gap" ? -1 : 1));
  const areas = [...new Set(ITEMS.map((i) => i.area))];
  const byArea = areas.map((area) => ({ area, gap: ITEMS.filter((i) => i.area === area && replies[i.id] !== "yes").length, ok: ITEMS.filter((i) => i.area === area && replies[i.id] === "yes").length }));
  const healthNote = health === "yes" ? "You handle health information. HIPAA or other legal duties may apply to your organisation and to vendors you use. This page cannot say. Ask a qualified adviser, and do not paste patient information into any tool without confirming it is allowed."
    : health === "unsure" ? "Not knowing whether you handle health information is worth settling first, because the answer changes which rules apply." : null;
  return { complete: true, missing: [], gaps, inPlace: ITEMS.length - gaps.length, total: ITEMS.length, byArea, healthNote, disclaimer: DISCLAIMER };
}
