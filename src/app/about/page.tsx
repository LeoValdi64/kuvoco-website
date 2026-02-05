import { Metadata } from "next";
import AboutContent from "./AboutContent";

export const metadata: Metadata = {
  title: "About Us — Kuvo Co.",
  description: "Learn about Kuvo Co. — a web development studio building stunning websites for local businesses. Based in Everett, WA.",
};

export default function AboutPage() {
  return <AboutContent />;
}
