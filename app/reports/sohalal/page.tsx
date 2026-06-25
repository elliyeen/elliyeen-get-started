import type { Metadata } from "next";
import SoHalalReportClient from "./SoHalalReportClient";

export const metadata: Metadata = {
  title: "So Halal Soul Food — Economic Engineering Report · Elliyeen Research",
  description:
    "Full economic engineering audit of So Halal Soul Food, Stone Mountain, GA. Mobile rendering failure, ordering friction, and three ranked profit opportunities with a 30/90-day roadmap.",
  alternates: { canonical: "https://www.elliyeen.com/reports/sohalal" },
  openGraph: {
    title: "So Halal Soul Food — Economic Engineering Report",
    description:
      "Mobile site broken on every phone. Ordering redirect losing conversions. Three ranked opportunities with a 30-day action plan.",
    url: "https://www.elliyeen.com/reports/sohalal",
    siteName: "Elliyeen Research",
    type: "article",
  },
};

export default function SoHalalReportPage() {
  return <SoHalalReportClient />;
}
