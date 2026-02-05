import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us — Kuvo Co.",
  description:
    "Get in touch with Kuvo Co. for professional web development services. Based in Everett, WA.",
  openGraph: {
    title: "Contact Us — Kuvo Co.",
    description:
      "Get in touch with Kuvo Co. for professional web development services. Based in Everett, WA.",
    url: "https://kuvoco-website.vercel.app/contact",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Contact Kuvo Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — Kuvo Co.",
    description:
      "Get in touch with Kuvo Co. for professional web development services.",
    images: ["/og-image.png"],
  },
  alternates: {
    canonical: "https://kuvoco-website.vercel.app/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
