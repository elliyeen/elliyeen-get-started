import type { Metadata } from "next";
import BearReportClient from "./BearReportClient";

export const metadata: Metadata = {
  title: "BEAR — AI Trading Coach Audit",
  description:
    "Full audit of withbear.app: security, performance, design, copy, GTM plan, moat/USP analysis, pricing strategy, and growth metrics for an AI trading coach's pre-launch waitlist site.",
  alternates: { canonical: "https://www.elliyeen.com/reports/bear" },
  openGraph: {
    title: "BEAR — AI Trading Coach Audit",
    description:
      "6.3s load time, an unused viral loop, and a pricing ladder priced below its own market — full audit and growth plan for withbear.app.",
    url: "https://www.elliyeen.com/reports/bear",
    siteName: "Elliyeen Research",
    type: "article",
  },
};

export default function BearReportPage() {
  return <BearReportClient />;
}
