import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Kuvo Co.",
  description: "Transparent pricing for professional web development. Starting at $399. No hidden fees.",
};

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main>
        <PricingContent />
      </main>
      <Footer />
    </>
  );
}
