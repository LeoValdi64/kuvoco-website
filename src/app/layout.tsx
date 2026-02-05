import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Starfield from "@/components/Starfield";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Kuvo Co. — Professional Web Development",
  description:
    "We design and develop stunning websites for local businesses. Launch in as little as 48 hours. Professional, fast, and affordable web development by Kuvo Co.",
  keywords: [
    "web development",
    "web design",
    "website builder",
    "local business websites",
    "fast website delivery",
    "Kuvo Co",
  ],
  authors: [{ name: "Kuvo Co.", url: "https://kuvoco-website.vercel.app" }],
  openGraph: {
    title: "Kuvo Co. — Professional Web Development",
    description:
      "Professional websites for local businesses. Built fast. Built right. Launch in as little as 48 hours.",
    url: "https://kuvoco-website.vercel.app",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "Kuvo Co. — Professional Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuvo Co. — Professional Web Development",
    description:
      "Professional websites for local businesses. Built fast. Built right.",
    images: ["/og-image.png"],
  },
  metadataBase: new URL("https://kuvoco-website.vercel.app"),
  alternates: {
    canonical: "https://kuvoco-website.vercel.app",
  },
  icons: {
    icon: "/logo.png",
    apple: "/logo.png",
  },
};

const jsonLd = [
  {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Kuvo Co.",
    url: "https://kuvoco-website.vercel.app",
    description: "Professional web development for local businesses",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Everett",
        addressRegion: "WA",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kuvo Co.",
    url: "https://kuvoco-website.vercel.app",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://kuvoco-website.vercel.app/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kuvo Co.",
    url: "https://kuvoco-website.vercel.app",
    description: "Professional web development for local businesses",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Everett",
      addressRegion: "WA",
    },
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        {jsonLd.map((schema, i) => (
          <script
            key={i}
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
          />
        ))}
      </head>
      <body className="font-sans bg-[#0A0A0F] text-white antialiased">
        <Starfield />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
