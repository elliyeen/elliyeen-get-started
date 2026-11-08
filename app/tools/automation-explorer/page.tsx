import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import SolutionExplorer from "@/components/tools/SolutionExplorer";

export const metadata: Metadata = {
  title: "Automation Solution Explorer (staging preview) — Elliyeen",
  description: "Pick the kind of work and the tools involved to see illustrative patterns, where a person stays in charge, and the risks to weigh. These are examples,",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <ToolShell eyebrow="Automation Solution Explorer" title="See how work like yours is sometimes automated" intro="Pick the kind of work and the tools involved to see illustrative patterns, where a person stays in charge, and the risks to weigh. These are examples, not recommendations or quotes.">
      <SolutionExplorer />
    </ToolShell>
  );
}
