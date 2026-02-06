import type { Metadata } from "next";
import PricingContent from "./PricingContent";

export const metadata: Metadata = {
  title: "Pricing — Affordable Websites Starting at $399",
  description:
    "Transparent web development pricing. Professional websites from $399. No hidden fees. Includes hosting, SSL, and maintenance plans. Serving Everett, Seattle, and WA.",
  keywords: [
    "website pricing",
    "affordable web design cost",
    "cheap website development",
    "web design prices everett",
    "small business website cost",
    "website packages seattle",
    "web development rates washington",
  ],
  openGraph: {
    title: "Pricing — Websites Starting at $399 | Kuvo Co.",
    description:
      "Transparent pricing for professional websites. Starting at $399 with no hidden fees. See all our packages and monthly plans.",
    url: "https://kuvoco.com/pricing",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1280,
        height: 720,
        alt: "Kuvo Co. Pricing - Affordable Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Pricing — Websites Starting at $399 | Kuvo Co.",
    description:
      "Transparent pricing for professional websites. Starting at $399 with no hidden fees.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kuvoco.com/pricing",
  },
};

export default function PricingPage() {
  return <PricingContent />;
}
