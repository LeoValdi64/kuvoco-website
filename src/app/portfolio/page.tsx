import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Our Work — Websites & Developer Tools by Kuvo Co.",
  description:
    "Explore business websites and client projects we've built across every industry, plus a collection of free web-based developer tools. Each site is custom-designed, mobile-responsive, and optimized for performance.",
  openGraph: {
    title: "Kuvo Co. — Our Work & Developer Tools",
    description:
      "Business websites, client projects, and free developer tools built by Kuvo Co.",
    url: "https://kuvoco.com/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
