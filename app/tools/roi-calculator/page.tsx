import type { Metadata } from "next";
import ToolShell from "@/components/tools/ToolShell";
import RoiCalculator from "@/components/tools/RoiCalculator";

export const metadata: Metadata = {
  title: "ROI Calculator (staging preview) — Elliyeen",
  description: "Enter your own figures and see a cautious, a middle and a hopeful case, with the assumptions shown and the most sensitive inputs ranked. It never prom",
  robots: { index: false, follow: false },
};

export default function Page() {
  return (
    <ToolShell eyebrow="ROI Calculator" title="What could automation be worth, on your numbers?" intro="Enter your own figures and see a cautious, a middle and a hopeful case, with the assumptions shown and the most sensitive inputs ranked. It never promises savings.">
      <RoiCalculator />
    </ToolShell>
  );
}
