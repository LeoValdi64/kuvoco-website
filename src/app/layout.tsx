import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

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
  authors: [{ name: "Kuvo Co.", url: "https://kuvoco.com" }],
  openGraph: {
    title: "Kuvo Co. — Professional Web Development",
    description:
      "Professional websites for local businesses. Built fast. Built right. Launch in as little as 48 hours.",
    url: "https://kuvoco.com",
    siteName: "Kuvo Co.",
    type: "website",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: "Kuvo Co. — Professional Web Development",
    description:
      "Professional websites for local businesses. Built fast. Built right.",
  },
  metadataBase: new URL("https://kuvoco.com"),
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} scroll-smooth`}>
      <body className="font-sans bg-[#0A0A0F] text-white antialiased">
        {children}
      </body>
    </html>
  );
}
