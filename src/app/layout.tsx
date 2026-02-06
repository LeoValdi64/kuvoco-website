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

export const viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  viewportFit: "cover",
};

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
  authors: [{ name: "Kuvo Co.", url: "https://kuvoco.com" }],
  openGraph: {
    title: "Kuvo Co. — Professional Web Development",
    description:
      "Professional websites for local businesses. Built fast. Built right. Launch in as little as 48 hours.",
    url: "https://kuvoco.com",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/og-image.jpg",
        width: 1280,
        height: 720,
        alt: "Kuvo Co. — Professional Web Development",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuvo Co. — Professional Web Development",
    description:
      "Professional websites for local businesses. Built fast. Built right.",
    images: ["/og-image.jpg"],
  },
  metadataBase: new URL("https://kuvoco.com"),
  alternates: {
    canonical: "https://kuvoco.com",
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
    url: "https://kuvoco.com",
    description: "Professional web development for local businesses",
    location: {
      "@type": "Place",
      address: {
        "@type": "PostalAddress",
        addressLocality: "Everett",
        addressRegion: "WA",
        addressCountry: "US",
      },
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: "Kuvo Co.",
    url: "https://kuvoco.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://kuvoco.com/?q={search_term_string}",
      "query-input": "required name=search_term_string",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: "Kuvo Co.",
    url: "https://kuvoco.com",
    description: "Professional web development for local businesses. Fast, affordable, and modern websites for small businesses.",
    priceRange: "$$",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Everett",
      addressRegion: "WA",
      addressCountry: "US",
    },
    areaServed: {
      "@type": "GeoCircle",
      geoMidpoint: {
        "@type": "GeoCoordinates",
        latitude: 47.9790,
        longitude: -122.2021,
      },
      geoRadius: "50000",
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
