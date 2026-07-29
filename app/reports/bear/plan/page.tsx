import type { Metadata } from "next";
import PlanClient from "./PlanClient";

export const metadata: Metadata = {
  title: "BEAR — Your Simple Plan",
  description:
    "Six steps to grow Bear, in plain language, with copy-paste Claude prompts for each technical step.",
  alternates: { canonical: "https://www.elliyeen.com/reports/bear/plan" },
};

export default function BearPlanPage() {
  return <PlanClient />;
}
