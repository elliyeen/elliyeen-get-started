import type { Metadata } from "next";
import { notFound } from "next/navigation";
import QRLanding from "@/components/QRLanding";
import { ALL_VENDORS } from "@/components/vendorData";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateStaticParams() {
  return ALL_VENDORS.map((v) => ({ id: v.id }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const vendor = ALL_VENDORS.find((v) => v.id === id);
  if (!vendor) return {};
  return {
    title: `${vendor.name} — Open House Creative Fest`,
    description: vendor.activity,
    // Prevent QR landing pages from being indexed
    robots: { index: false, follow: false },
  };
}

export default async function QRPage({ params }: Props) {
  const { id } = await params;
  const vendor = ALL_VENDORS.find((v) => v.id === id);
  if (!vendor) notFound();

  return (
    <QRLanding
      vendor={{
        name: vendor.name,
        founder: vendor.founder,
        activity: vendor.activityDetail,
        emoji: vendor.emoji,
        instagram: vendor.instagram,
        availableSlots: vendor.availableSlots,
      }}
    />
  );
}
