"use client";

import { motion, useInView } from "framer-motion";
import { Palette, Code, Shield, TrendingUp, Check } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description: "Custom website designs that convert visitors into customers. Every design is tailored to your brand and optimized for user experience.",
    features: [
      "Custom responsive layouts",
      "Brand-aligned color schemes and typography",
      "User experience optimization",
      "Mobile-first design approach",
      "Conversion-focused layouts",
      "Iterative design process",
    ],
    cta: "Start Your Design",
    ctaLink: "/contact",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Built with modern technologies for speed, reliability, and SEO performance. Clean code that scales with your business.",
    features: [
      "React & Next.js development",
      "SEO-optimized architecture",
      "Fast load times & performance",
      "Responsive across all devices",
      "Secure and reliable hosting setup",
      "Third-party integrations",
    ],
    cta: "Start Building",
    ctaLink: "/contact",
  },
  {
    icon: Shield,
    title: "Maintenance Plans",
    description: "Keep your website running smoothly with ongoing support, updates, and monitoring. Focus on your business while we handle the tech.",
    features: [
      "Regular content updates",
      "Performance monitoring",
      "Security patches and updates",
      "Uptime monitoring",
      "Monthly analytics reports",
      "Priority support",
    ],
    cta: "View Plans",
    ctaLink: "/pricing",
  },
  {
    icon: TrendingUp,
    title: "SEO & Performance",
    description: "Boost your search engine visibility and website performance. Get found by the customers who are looking for your services.",
    features: [
      "On-page SEO optimization",
      "Google Business Profile setup",
      "Page speed optimization",
      "Schema markup implementation",
      "Analytics and tracking setup",
      "Monthly performance reports",
    ],
    cta: "Boost Your Visibility",
    ctaLink: "/contact",
  },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function ServicesContent() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0A0A0F] min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeInSection>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                Our{" "}
                <span className="gradient-text">Services</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto">
                Comprehensive web solutions designed to help your business thrive online
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* Services Sections */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isEven = index % 2 === 0;

            return (
              <FadeInSection key={service.title} delay={0.2 + index * 0.1}>
                <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/20 transition-all duration-300">
                  <div className={cn(
                    "grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12",
                    !isEven && "lg:grid-flow-dense"
                  )}>
                    {/* Content */}
                    <div className={cn(!isEven && "lg:col-start-2")}>
                      <div className="flex items-center gap-4 mb-6">
                        <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                          <Icon className="w-7 h-7 text-[#3B82F6]" />
                        </div>
                        <h2 className="text-3xl sm:text-4xl font-bold text-white">
                          {service.title}
                        </h2>
                      </div>
                      <p className="text-lg text-[#9CA3AF] mb-8 leading-relaxed">
                        {service.description}
                      </p>
                      <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href={service.ctaLink}>
                          {service.cta}
                        </Link>
                      </Button>
                    </div>

                    {/* Features List */}
                    <div className={cn(
                      "flex items-center",
                      !isEven && "lg:col-start-1 lg:row-start-1"
                    )}>
                      <div className="w-full">
                        <div className="bg-[#0A0A0F]/50 rounded-xl p-6 border border-white/5">
                          <h3 className="text-sm font-semibold text-[#3B82F6] uppercase tracking-wide mb-4">
                            What&apos;s Included
                          </h3>
                          <ul className="space-y-3">
                            {service.features.map((feature) => (
                              <li key={feature} className="flex items-start gap-3">
                                <Check className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                                <span className="text-[#9CA3AF]">{feature}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>
                  </div>
                </Card>
              </FadeInSection>
            );
          })}
        </section>

        {/* Bottom CTA */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-24">
          <FadeInSection delay={0.8}>
            <div className="bg-gradient-to-br from-[#3B82F6]/10 to-[#06B6D4]/10 border border-[#3B82F6]/20 rounded-2xl p-8 sm:p-12 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to get started?
              </h2>
              <p className="text-lg text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
                Let&apos;s discuss your project and create a custom solution that fits your needs and budget.
              </p>
              <Button asChild size="lg" className="text-base">
                <Link href="/contact">
                  Schedule a Free Consultation
                </Link>
              </Button>
            </div>
          </FadeInSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
