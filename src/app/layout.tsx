import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { ClerkProvider } from "@clerk/nextjs";
import { dark } from "@clerk/themes";
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
  title: {
    default: "Kuvo Co. — Web Development in Everett, WA | Fast & Affordable Websites",
    template: "%s | Kuvo Co.",
  },
  description:
    "Professional web development for local businesses in Everett, Seattle, and Snohomish County. Modern websites delivered in 48 hours. Starting at $399. 90+ sites launched.",
  keywords: [
    // Primary keywords
    "web development everett wa",
    "website design seattle",
    "web developer snohomish county",
    "small business website washington",
    // Service keywords
    "affordable web design",
    "fast website delivery",
    "professional website development",
    "local business websites",
    "modern website design",
    // Long-tail keywords
    "website for small business near me",
    "best web developer everett",
    "cheap website design seattle area",
    "quick website builder washington",
    // Brand
    "Kuvo Co",
    "kuvoco",
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
    "@type": "ProfessionalService",
    "@id": "https://kuvoco.com/#business",
    name: "Kuvo Co.",
    url: "https://kuvoco.com",
    logo: "https://kuvoco.com/logo.png",
    image: "https://kuvoco.com/og-image.jpg",
    description: "Professional web development for local businesses in Everett, Seattle, and Snohomish County, WA. Modern, fast, and affordable websites delivered in 48 hours.",
    priceRange: "$399-$999",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Everett",
      addressRegion: "WA",
      postalCode: "98201",
      addressCountry: "US",
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: 47.9790,
      longitude: -122.2021,
    },
    areaServed: [
      {
        "@type": "City",
        name: "Everett",
        "@id": "https://www.wikidata.org/wiki/Q588879",
      },
      {
        "@type": "City",
        name: "Seattle",
        "@id": "https://www.wikidata.org/wiki/Q5083",
      },
      {
        "@type": "AdministrativeArea",
        name: "Snohomish County",
      },
      {
        "@type": "State",
        name: "Washington",
      },
    ],
    hasOfferCatalog: {
      "@type": "OfferCatalog",
      name: "Web Development Services",
      itemListElement: [
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Starter Website",
            description: "1-page professional website with custom domain",
          },
          price: "399",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Business Website",
            description: "Up to 3 pages with Google Maps and enhanced SEO",
          },
          price: "699",
          priceCurrency: "USD",
        },
        {
          "@type": "Offer",
          itemOffered: {
            "@type": "Service",
            name: "Professional Website",
            description: "Up to 5 pages with custom animations and advanced SEO",
          },
          price: "999",
          priceCurrency: "USD",
        },
      ],
    },
    aggregateRating: {
      "@type": "AggregateRating",
      ratingValue: "5",
      reviewCount: "90",
      bestRating: "5",
      worstRating: "1",
    },
    sameAs: [],
  },
  {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://kuvoco.com/#website",
    name: "Kuvo Co.",
    url: "https://kuvoco.com",
    publisher: {
      "@id": "https://kuvoco.com/#business",
    },
  },
  {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "@id": "https://kuvoco.com/#breadcrumb",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://kuvoco.com",
      },
    ],
  },
];

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: dark,
        variables: {
          colorPrimary: '#3B82F6',
          colorBackground: '#0A0A0F',
          colorInputBackground: '#1A1A2E',
          colorInputText: '#F8FAFC',
          colorText: '#F8FAFC',
          colorTextSecondary: '#9CA3AF',
        },
        elements: {
          card: 'bg-[#1A1A2E] border border-white/10',
          formButtonPrimary: 'bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90',
          footerActionLink: 'text-[#3B82F6] hover:text-[#06B6D4]',
        },
      }}
    >
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
    </ClerkProvider>
  );
}
