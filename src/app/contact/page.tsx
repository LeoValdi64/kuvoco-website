import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Contact Us — Get a Free Website Quote",
  description:
    "Contact Kuvo Co. for a free website quote. Professional web development in Everett, Seattle, and Snohomish County, WA. Fast response, no obligation.",
  keywords: [
    "contact web developer",
    "free website quote",
    "web design consultation everett",
    "hire web developer seattle",
    "website inquiry snohomish county",
  ],
  openGraph: {
    title: "Contact Us — Get a Free Quote | Kuvo Co.",
    description:
      "Get in touch for a free website quote. Professional web development serving Everett, Seattle, and all of Washington.",
    url: "https://kuvoco.com/contact",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1280,
        height: 720,
        alt: "Contact Kuvo Co.",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contact Us — Get a Free Quote | Kuvo Co.",
    description:
      "Get in touch for a free website quote. Professional web development in Everett, WA.",
    images: ["/og-image.jpg"],
  },
  alternates: {
    canonical: "https://kuvoco.com/contact",
  },
};

export default function ContactPage() {
  return <ContactContent />;
}
