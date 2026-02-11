import type { Metadata } from "next";
import TemplatesContent from "./TemplatesContent";

export const metadata: Metadata = {
  title: "Website Templates — 40+ Designs for Local Businesses",
  description:
    "Browse 40+ professional website templates designed for restaurants, contractors, medical offices, salons, and more. Pick a design you love, and we will customize it for your brand.",
  openGraph: {
    title: "Kuvo Co. Templates — 40+ Website Designs",
    description:
      "Browse 40+ professional website templates designed for local businesses across every industry.",
    url: "https://kuvoco.com/templates",
  },
};

export default function TemplatesPage() {
  return <TemplatesContent />;
}
