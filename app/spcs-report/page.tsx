import type { Metadata } from "next";
import SPCSFlipbook from "@/components/SPCSFlipbook";

export const metadata: Metadata = {
  title: "Revenue Opportunity Report — Savannah Personal Care Services",
  description:
    "A full revenue opportunity analysis for Savannah Personal Care Services, prepared by Elliyeen Research.",
  robots: { index: false, follow: false },
};

export default function SPCSReportPage() {
  return <SPCSFlipbook />;
}
