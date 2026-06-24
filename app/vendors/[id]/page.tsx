import type { Metadata } from "next";
import { notFound } from "next/navigation";
import VendorProfile from "@/components/VendorProfile";
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
    description: `${vendor.activity} with ${vendor.founder}. Included with the $50 Creative Passport at Open House Creative Fest, June 27–28, Del Amo Fashion Center, Torrance.`,
  };
}

export default async function VendorPage({ params }: Props) {
  const { id } = await params;
  const vendor = ALL_VENDORS.find((v) => v.id === id);
  if (!vendor) notFound();
  return <VendorProfile vendor={vendor} />;
}
