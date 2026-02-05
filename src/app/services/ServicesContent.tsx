"use client";

import { motion, useInView } from "framer-motion";
import { Palette, Code, Shield, TrendingUp, Check } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

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

export default function ServicesContent() {
  const heroRef = useRef(null);
  const heroInView = useInView(heroRef, { once: true });

  return (
    <main className="bg-[#0A0A0F] min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section ref={heroRef} className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-gradient-to-br from-[#3B82F6]/20 via-[#06B6D4]/10 to-transparent blur-3xl rounded-full opacity-30" />
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={heroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.3 }}
        >
          <div className="text-center relative">
            <div className="mx-auto w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full mb-8" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Our{" "}
              <span className="gradient-text">Services</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto">
              Comprehensive web solutions designed to help your business thrive online
            </p>
          </div>
        </motion.div>
      </section>

      {/* Services Sections */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {services.map((service, index) => {
          const Icon = service.icon;
          const isEven = index % 2 === 0;
          const stepNumber = (index + 1).toString().padStart(2, '0');

          return (
            <ServiceCard
              key={service.title}
              service={service}
              Icon={Icon}
              isEven={isEven}
              stepNumber={stepNumber}
              index={index}
            />
          );
        })}
      </section>

      {/* Bottom CTA */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <div className="relative bg-gradient-to-br from-[#3B82F6]/10 to-[#06B6D4]/10 border-2 border-[#3B82F6]/30 rounded-2xl p-8 sm:p-12 text-center overflow-hidden group">
          <div className="absolute inset-0 bg-gradient-to-r from-[#3B82F6]/0 via-[#3B82F6]/5 to-[#06B6D4]/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-[#3B82F6]/20 to-transparent blur-2xl" />
          <div className="absolute bottom-0 left-0 w-32 h-32 bg-gradient-to-tr from-[#06B6D4]/20 to-transparent blur-2xl" />

          <div className="relative z-10">
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-4">
              Ready to get started?
            </h2>
            <p className="text-lg sm:text-xl text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
              Let&apos;s discuss your project and create a custom solution that fits your needs and budget.
            </p>
            <Button asChild size="lg" className="text-base sm:text-lg px-8 py-6 shadow-lg shadow-[#3B82F6]/20 hover:shadow-[#3B82F6]/40 transition-shadow duration-300">
              <Link href="/contact">
                Schedule a Free Consultation
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </main>
  );
}

function ServiceCard({
  service,
  Icon,
  isEven,
  stepNumber,
  index,
}: {
  service: (typeof services)[number];
  Icon: (typeof services)[number]["icon"];
  isEven: boolean;
  stepNumber: string;
  index: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
      transition={{ duration: 0.25, delay: 0.1 }}
    >
      <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/20 transition-all duration-300 group">
        <div className={cn(
          "grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-12",
          !isEven && "lg:grid-flow-dense"
        )}>
          {/* Content */}
          <div className={cn(!isEven && "lg:col-start-2")}>
            <div className="text-6xl sm:text-7xl font-bold bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] bg-clip-text text-transparent opacity-20 mb-4 select-none">
              {stepNumber}
            </div>

            <div className="flex items-center gap-4 mb-6">
              <div className="flex-shrink-0 w-14 h-14 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center group-hover:bg-[#3B82F6]/20 transition-colors duration-300">
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
              <div className="bg-[#0A0A0F]/50 rounded-xl p-6 border border-white/5 relative overflow-hidden">
                <div className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                     style={{
                       background: 'linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.1), transparent)',
                       backgroundSize: '200% 100%',
                     }} />

                <h3 className="text-sm font-semibold text-[#3B82F6] uppercase tracking-wide mb-4 relative z-10">
                  What&apos;s Included
                </h3>
                <ul className="space-y-3 relative z-10">
                  {service.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3 group/item">
                      <Check className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5 group-hover/item:scale-110 transition-transform duration-200" />
                      <span className="text-[#9CA3AF] group-hover/item:text-white transition-colors duration-200">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}
