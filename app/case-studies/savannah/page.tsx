import type { Metadata } from "next";
import SPCSFlipbook from "@/components/SPCSFlipbook";

export const metadata: Metadata = {
  title: "Savannah Personal Care Services — Revenue Opportunity Report",
  description:
    "How Elliyeen Research rebuilt a home care agency's digital presence — 74 competitors audited, 15 failures documented, 12 pages rebuilt. Read the full Revenue Opportunity Report.",
  openGraph: {
    title: "Revenue Opportunity Report — Savannah Personal Care Services",
    description:
      "74 competitors. 15 failures. One rebuild. See how Elliyeen Research engineered a complete digital transformation for a Savannah home care agency.",
    images: [{ url: "/spcs-report/page_01.jpg", width: 1275, height: 1650 }],
    type: "article",
  },
  twitter: {
    card: "summary_large_image",
    title: "Revenue Opportunity Report — Savannah Personal Care Services",
    description: "74 competitors audited. Full digital rebuild. Read the case study.",
    images: ["/spcs-report/page_01.jpg"],
  },
};

export default function SPCSCaseStudyPage() {
  return <SPCSFlipbook />;
}
