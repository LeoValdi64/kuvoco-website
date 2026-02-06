import type { Metadata } from "next";
import PortfolioContent from "./PortfolioContent";

export const metadata: Metadata = {
  title: "Portfolio — 90+ Websites Built for Local Businesses",
  description:
    "Browse our portfolio of 90+ professional websites built for local businesses. See real examples of our web design and development work in Everett, Seattle, and beyond.",
  keywords: [
    "web design portfolio",
    "website examples",
    "local business websites",
    "web development work samples",
    "everett web designer portfolio",
    "seattle website examples",
  ],
  openGraph: {
    title: "Our Portfolio — 90+ Websites Delivered | Kuvo Co.",
    description:
      "See real examples of websites we've built for local businesses. 90+ projects delivered with 100% satisfaction.",
    url: "https://kuvoco.com/portfolio",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1280,
        height: 720,
        alt: "Kuvo Co. Portfolio - 90+ Websites",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Our Portfolio — 90+ Websites Delivered | Kuvo Co.",
    description:
      "See real examples of websites we've built for local businesses.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kuvoco.com/portfolio",
  },
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
