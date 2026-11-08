import type { Metadata } from "next";
import Link from "next/link";
import ToolShell from "@/components/tools/ToolShell";

export const metadata: Metadata = { title: "Tools (staging preview) — Elliyeen", robots: { index: false, follow: false } };

const TOOLS = [
  { href: "/tools/ai-opportunity", title: "AI Opportunity Assessment", body: "Is one repetitive task worth automating? Eight questions, a plain summary." },
  { href: "/tools/security-readiness", title: "Security Readiness Check", body: "A voluntary self-check of security basics. Not an audit or a certification." },
  { href: "/tools/automation-explorer", title: "Automation Solution Explorer", body: "Illustrative patterns for common work, with human checkpoints and risks." },
  { href: "/tools/roi-calculator", title: "ROI Calculator", body: "Your numbers, three cases, assumptions shown. No promised savings." },
];
export default function ToolsHub() {
  return (
    <ToolShell eyebrow="Staging preview" title="Tools" intro="Four small tools that run entirely in your browser. They are drafts for review and are not live on the site menu.">
      <ul className="grid gap-4">{TOOLS.map((t) => (
        <li key={t.href}><Link href={t.href} className="block rounded-2xl border border-zinc-200 bg-[#f7f4ee] p-5 hover:border-zinc-400 focus-visible:outline focus-visible:outline-[3px] focus-visible:outline-offset-2 focus-visible:outline-[#1b5ea8]"><span className="font-serif text-xl">{t.title}</span><span className="mt-1 block text-sm text-zinc-700">{t.body}</span></Link></li>))}</ul>
    </ToolShell>
  );
}
