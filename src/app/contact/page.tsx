import type { Metadata } from "next";
import ContactContent from "./ContactContent";

export const metadata: Metadata = {
  title: "Request a Website Review",
  description: "Tell Kuvoco about your Washington service business and request a website review by email. No meeting required.",
  alternates: { canonical: "https://kuvoco.com/contact" },
};

export default function ContactPage() {
  return <ContactContent />;
}
