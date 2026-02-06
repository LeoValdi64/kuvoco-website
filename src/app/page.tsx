import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

function PricingCTA() {
  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#111827]/30">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-[#9CA3AF] max-w-2xl mx-auto mb-8">
          No hidden fees. No surprises. Just great websites at prices that work for your business.
        </p>
        <Link
          href="/pricing"
          className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-8 py-4 rounded-lg transition-opacity"
        >
          View Pricing
          <ArrowRight size={20} />
        </Link>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Stats />
      <Services />
      <Portfolio />
      <Process />
      <PricingCTA />
      <Testimonials />
      <FAQ />
      <CTA />
    </main>
  );
}
