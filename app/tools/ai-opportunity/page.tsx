import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import OpportunityAssessment from "@/components/tools/OpportunityAssessment";

export const metadata: Metadata = {
  title: "AI Opportunity Assessment (staging preview) — Elliyeen",
  description: "Answer a few plain questions about one repetitive task and get a short summary of what points in favour, what to fix first, and what to be careful abo",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <ToolShell eyebrow="AI Opportunity Assessment" title="Is this task worth automating?" intro="Answer a few plain questions about one repetitive task and get a short summary of what points in favour, what to fix first, and what to be careful about.">
      <OpportunityAssessment />
    </ToolShell>
  );
}
