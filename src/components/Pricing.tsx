"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Starter",
    price: "$399",
    description: "Perfect for getting started online",
    popular: false,
    features: [
      "Single page website",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form",
      "48-hour delivery",
    ],
  },
  {
    name: "Business",
    price: "$699",
    description: "Most popular for local businesses",
    popular: true,
    features: [
      "Up to 3 pages",
      "Contact form integration",
      "Google Maps embed",
      "Enhanced SEO",
      "3-day delivery",
    ],
  },
  {
    name: "Professional",
    price: "$999",
    description: "For businesses that need more",
    popular: false,
    features: [
      "Up to 5 pages",
      "Custom animations",
      "Advanced SEO",
      "Priority support",
      "5-day delivery",
    ],
  },
  {
    name: "Custom",
    price: "Let's Talk",
    description: "Tailored to your exact needs",
    popular: false,
    features: [
      "E-commerce solutions",
      "Web applications",
      "Complex requirements",
      "Custom integrations",
      "Dedicated timeline",
    ],
  },
];

const maintenance = [
  { name: "Basic", price: "$29", period: "/mo", features: "2 content changes per month" },
  { name: "Growth", price: "$59", period: "/mo", features: "5 changes + analytics dashboard" },
  { name: "Pro", price: "$149", period: "/mo", features: "12 changes + priority support" },
  { name: "Enterprise", price: "$349+", period: "/mo", features: "30 changes + dedicated manager" },
];

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#111827]/30">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            No hidden fees. No surprises. Just great websites.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`relative p-0 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular
                    ? "bg-[#1A1A2E] border-[#3B82F6]/50 glow-blue"
                    : "bg-[#1A1A2E]/50 border-white/5 hover:border-white/10"
                }`}
              >
                {/* Popular badge */}
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-[#3B82F6] text-white hover:bg-[#3B82F6]">
                      <Sparkles size={12} />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardContent className="p-6">
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-1">{tier.name}</h3>
                    <p className="text-xs text-[#6B7280] mb-4">
                      {tier.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold">{tier.price}</span>
                      {tier.price !== "Let's Talk" && (
                        <span className="text-sm text-[#6B7280]">one-time</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-3 mb-8">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-sm text-[#9CA3AF]"
                      >
                        <Check
                          size={16}
                          className="text-[#3B82F6] mt-0.5 shrink-0"
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {tier.popular ? (
                    <Button
                      asChild
                      className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      asChild
                      className="w-full bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"
                    >
                      <Link href="/contact">
                        {tier.price === "Let's Talk" ? "Contact Us" : "Get Started"}
                      </Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Maintenance Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.5 }}
        >
          <div className="text-center mb-8">
            <h3 className="text-xl font-semibold mb-2">
              Monthly Maintenance Add-ons
            </h3>
            <p className="text-sm text-[#6B7280]">
              Keep your site fresh and performing at its best
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {maintenance.map((plan) => (
              <Card
                key={plan.name}
                className="p-0 rounded-lg bg-[#1A1A2E]/30 border-white/5 hover:border-white/10 transition-colors text-center"
              >
                <CardContent className="p-4">
                  <p className="text-sm font-medium text-white mb-1">
                    {plan.name}
                  </p>
                  <p className="text-xl font-bold text-[#3B82F6]">
                    {plan.price}
                    <span className="text-xs font-normal text-[#6B7280]">
                      {plan.period}
                    </span>
                  </p>
                  <p className="text-xs text-[#9CA3AF] mt-2">{plan.features}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
