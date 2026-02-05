import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Kuvo Co.",
  description: "Transparent pricing for professional web development. Starting at $399. No hidden fees.",
};

export default function PricingPage() {
  return <PricingContent />;
}
