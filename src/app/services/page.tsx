import { Metadata } from "next";
import ServicesContent from "./ServicesContent";

export const metadata: Metadata = {
  title: "Services — Kuvo Co.",
  description: "Web design, development, maintenance, and SEO services for local businesses. Professional websites delivered fast.",
};

export default function ServicesPage() {
  return <ServicesContent />;
}
