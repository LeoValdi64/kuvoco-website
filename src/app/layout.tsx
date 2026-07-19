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
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL("https://kuvoco.com"),
  title: {
    default: "Kuvoco — Websites for Washington Service Businesses",
    template: "%s | Kuvoco",
  },
  description:
    "Conversion-focused websites for local service businesses in Washington. One-time project pricing, local SEO foundations, and no mandatory monthly contract.",
  keywords: [
    "web design Washington",
    "small business website Washington",
    "local service business website",
    "web development Mount Vernon WA",
    "local SEO website",
  ],
  authors: [{ name: "Kuvoco", url: "https://kuvoco.com" }],
  alternates: { canonical: "https://kuvoco.com" },
  icons: { icon: "/logo.png", apple: "/logo.png" },
  openGraph: {
    title: "Kuvoco — Websites Built to Win Local Customers",
    description:
      "Fast, focused websites for Washington service businesses. Clear scope, one-time pricing, and no mandatory monthly plan.",
    url: "https://kuvoco.com",
    siteName: "Kuvoco",
    type: "website",
    locale: "en_US",
    images: [
      {
        url: "/opengraph-image",
        width: 1200,
        height: 630,
        alt: "Kuvoco website design for local service businesses",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuvoco — Websites Built to Win Local Customers",
    description: "Conversion-focused websites for Washington service businesses.",
    images: ["/opengraph-image"],
  },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  "@id": "https://kuvoco.com/#business",
  name: "Kuvoco",
  url: "https://kuvoco.com",
  logo: "https://kuvoco.com/logo.png",
  email: "hello@kuvoco.com",
  description:
    "Website design, development, and local SEO foundations for service businesses in Washington.",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mount Vernon",
    addressRegion: "WA",
    addressCountry: "US",
  },
  areaServed: {
    "@type": "State",
    name: "Washington",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body className="font-sans bg-[#080b12] text-white antialiased">
        <Starfield />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
