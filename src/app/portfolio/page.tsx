import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio — 40+ Websites Built for Local Businesses",
  description:
    "Browse our portfolio of 40+ custom websites built for restaurants, contractors, medical offices, salons, and more. Each site is modern, responsive, and optimized.",
  openGraph: {
    title: "Kuvo Co. Portfolio — 50+ Websites Built",
    description:
      "Browse our portfolio of 40+ custom websites built for local businesses across every industry.",
    url: "https://kuvoco.com/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
