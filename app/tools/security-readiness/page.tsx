import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import SecurityReadiness from "@/components/tools/SecurityReadiness";

export const metadata: Metadata = {
  title: "Security Readiness Check (staging preview) — Elliyeen",
  description: "A voluntary self-check. You answer; nothing is scanned or tested. You get a short list of basics to look at first. It is not an audit and not a compli",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <ToolShell eyebrow="Security Readiness Check" title="A quick look at the security basics" intro="A voluntary self-check. You answer; nothing is scanned or tested. You get a short list of basics to look at first. It is not an audit and not a compliance certification.">
      <SecurityReadiness />
    </ToolShell>
  );
}
