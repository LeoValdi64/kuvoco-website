import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us — Web Development Studio in Everett, WA",
  description:
    "Learn about Kuvo Co., a web development studio based in Everett, WA. We build stunning, fast websites for local businesses across Seattle and Snohomish County.",
  keywords: [
    "about kuvo co",
    "web development company everett",
    "website design studio seattle",
    "local web developer washington",
    "snohomish county web agency",
  ],
  openGraph: {
    title: "About Us — Kuvo Co. Web Development Studio",
    description:
      "A web development studio based in Everett, WA. We build stunning websites for local businesses across the Seattle area.",
    url: "https://kuvoco.com/about",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1280,
        height: 720,
        alt: "About Kuvo Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "About Us — Kuvo Co. Web Development Studio",
    description:
      "A web development studio based in Everett, WA building stunning websites for local businesses.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kuvoco.com/about",
  },
};

export default function AboutPage() {
  return <AboutContent />;
}
