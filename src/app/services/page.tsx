import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Web Development Services in Everett, WA",
  description:
    "Professional web design, development, SEO, and maintenance services for local businesses in Everett, Seattle, and Snohomish County. Fast delivery, affordable prices.",
  keywords: [
    "web design services everett",
    "website development seattle",
    "SEO services snohomish county",
    "website maintenance washington",
    "local business web services",
  ],
  openGraph: {
    title: "Web Development Services | Kuvo Co.",
    description:
      "Professional web design, development, SEO, and maintenance for local businesses. Serving Everett, Seattle, and all of Washington.",
    url: "https://kuvoco.com/services",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1280,
        height: 720,
        alt: "Kuvo Co. Web Development Services",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Web Development Services | Kuvo Co.",
    description:
      "Professional web design, development, SEO, and maintenance for local businesses.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kuvoco.com/services",
  },
};

export default function ServicesPage() {
  return <ServicesContent />;
}
