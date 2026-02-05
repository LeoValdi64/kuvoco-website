import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio — Kuvo Co.",
  description: "Browse our portfolio of professional websites built for local businesses. See real results from real clients.",
};

export default function PortfolioPage() {
  return (
    <main>
      <PortfolioContent />
    </main>
  );
}
