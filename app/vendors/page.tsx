import type { Metadata } from "next";
import VendorDirectory from "@/components/VendorDirectory";

export const metadata: Metadata = {
  title: "Meet the Makers — Open House Creative Fest",
  description:
    "6 local makers. 1 Creative Passport. See exactly what you'll make at Open House Creative Fest — June 27–28, Del Amo Fashion Center, Torrance.",
};

export default function VendorsPage() {
  return <VendorDirectory />;
}
