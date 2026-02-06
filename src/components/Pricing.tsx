"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Check, Sparkles, Gift, ArrowRight, Star, RefreshCw, Crown } from "lucide-react";
import Link from "next/link";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const tiers = [
  {
    name: "Free",
    price: "$0",
    description: "Get started at no cost",
    popular: false,
    isFree: true,
    includesGrowth: false,
    features: [
      "1 basic page",
      "Subdomain (business.kuvoco.com)",
      "Mobile responsive",
      "Requires $29/mo plan",
    ],
  },
  {
    name: "Starter",
    price: "$399",
    description: "Perfect for getting started online",
    popular: false,
    isFree: false,
    includesGrowth: true,
    features: [
      "1 page + custom domain",
      "Design preview before deploy",
      "Basic SEO + 2 revisions",
      "48-hour delivery",
    ],
  },
  {
    name: "Business",
    price: "$699",
    description: "Most popular for local businesses",
    popular: true,
    isFree: false,
    includesGrowth: true,
    features: [
      "Up to 3 pages + domain",
      "Design preview + Google Maps",
      "Enhanced SEO + 3 revisions",
      "3-day delivery",
    ],
  },
  {
    name: "Professional",
    price: "$999",
    description: "For businesses that need more",
    popular: false,
    isFree: false,
    includesGrowth: true,
    features: [
      "Up to 5 pages + domain",
      "Custom animations",
      "Advanced SEO + priority support",
      "5 revisions + 5-day delivery",
    ],
  },
  {
    name: "Custom",
    price: "Let's Talk",
    description: "Tailored to your exact needs",
    popular: false,
    isFree: false,
    includesGrowth: true,
    features: [
      "E-commerce solutions",
      "Web applications",
      "Complex integrations",
      "Dedicated timeline",
    ],
  },
];

const maintenance = [
  { name: "Basic", basePrice: 29, features: "2 changes + hosting + SSL" },
  { name: "Growth", basePrice: 59, features: "5 changes + analytics + weekly backups" },
  { name: "Pro", basePrice: 149, features: "12 changes + priority + A/B testing" },
];

const enterprisePlan = {
  name: "Enterprise",
  tagline: "We become your tech team",
  features: "Dedicated tech partner + unlimited consultations",
};

type BillingPeriod = "monthly" | "quarterly" | "semiannual" | "annual";

const billingOptions: { key: BillingPeriod; label: string; shortLabel: string; discount: number }[] = [
  { key: "monthly", label: "Monthly", shortLabel: "Monthly", discount: 0 },
  { key: "quarterly", label: "Quarterly (-10%)", shortLabel: "Qtrly", discount: 0.10 },
  { key: "semiannual", label: "Semi-annual (-15%)", shortLabel: "Semi", discount: 0.15 },
  { key: "annual", label: "Annual (-25%)", shortLabel: "Annual", discount: 0.25 },
];

function calculateDiscountedPrice(basePrice: number, discount: number): string {
  const discounted = basePrice * (1 - discount);
  return discounted.toFixed(2);
}

export default function Pricing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("annual");
  const currentDiscount = billingOptions.find(opt => opt.key === billingPeriod)?.discount || 0;

  return (
    <section id="pricing" className="relative py-24 sm:py-32 bg-[#111827]/30">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto mb-6">
            No hidden fees. No surprises. Just great websites.
          </p>

          {/* 3 Months Growth FREE Badge */}
          <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-4 py-2 text-sm shadow-lg shadow-emerald-500/25">
            <Star size={14} className="mr-2 inline" />
            Paid tiers include 3 months of Growth plan FREE ($177 value)
          </Badge>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5 mb-12">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              <Card
                className={`relative p-0 rounded-xl border transition-all duration-300 hover:-translate-y-1 ${
                  tier.popular
                    ? "bg-[#1A1A2E] border-[#3B82F6]/50 glow-blue"
                    : tier.isFree
                    ? "bg-[#1A1A2E]/30 border-white/10"
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
                {/* Growth FREE badge */}
                {tier.includesGrowth && !tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge className="bg-emerald-500 text-white hover:bg-emerald-500 text-xs px-2">
                      3mo Growth FREE
                    </Badge>
                  </div>
                )}

                <CardContent className="p-5">
                  <div className="mb-4">
                    <div className="flex items-center gap-2 mb-1">
                      {tier.isFree && <Gift size={16} className="text-gray-400" />}
                      <h3 className="text-base font-semibold">{tier.name}</h3>
                    </div>
                    <p className="text-xs text-[#6B7280] mb-3">
                      {tier.description}
                    </p>
                    <div className="flex items-baseline gap-1">
                      <span className={`text-2xl font-bold ${tier.isFree ? "text-gray-400" : ""}`}>
                        {tier.price}
                      </span>
                      {tier.price !== "Let's Talk" && (
                        <span className="text-xs text-[#6B7280]">one-time</span>
                      )}
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    {tier.features.map((feature) => (
                      <li
                        key={feature}
                        className="flex items-start gap-2 text-xs text-[#9CA3AF]"
                      >
                        <Check
                          size={14}
                          className={`mt-0.5 shrink-0 ${tier.isFree ? "text-gray-500" : "text-[#3B82F6]"}`}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {tier.popular ? (
                    <Button
                      asChild
                      size="sm"
                      className="w-full bg-[#3B82F6] hover:bg-[#2563EB] text-white hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    >
                      <Link href="/contact">Get Started</Link>
                    </Button>
                  ) : (
                    <Button
                      variant="outline"
                      size="sm"
                      asChild
                      className={`w-full ${
                        tier.isFree
                          ? "bg-transparent text-gray-400 border-gray-600 hover:bg-gray-800/50"
                          : "bg-white/5 text-white border-white/10 hover:bg-white/10 hover:border-white/20"
                      }`}
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

        {/* Switch & Save Banner */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="mb-16"
        >
          <div className="relative overflow-hidden rounded-xl bg-gradient-to-r from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-500/30 p-6">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-lg shadow-orange-500/25">
                  <RefreshCw size={24} className="text-white" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white">
                    Already have a website? <span className="text-orange-400">Save $300</span>
                  </h4>
                  <p className="text-sm text-[#9CA3AF]">
                    Switch to us with a 1-year plan commitment. Starter just $99!
                  </p>
                </div>
              </div>
              <Link href="/pricing">
                <Button size="sm" className="bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white">
                  Learn More
                  <ArrowRight size={16} className="ml-1" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>

        {/* Maintenance Plans */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3, delay: 0.2 }}
        >
          <div className="text-center mb-8">
            <Badge className="mb-3 bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30">
              Required with every site
            </Badge>
            <h3 className="text-xl font-semibold mb-2">
              Monthly Maintenance Plans
            </h3>
            <p className="text-sm text-[#6B7280] mb-4">
              Hosting, SSL, backups, and content changes included
            </p>

            {/* Billing Period Tabs */}
            <div className="flex flex-wrap gap-1 sm:gap-2 justify-center bg-[#1A1A2E]/50 rounded-xl p-1.5 max-w-fit mx-auto">
              {billingOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setBillingPeriod(option.key)}
                  className={`px-2 sm:px-3 py-1.5 rounded-lg text-xs sm:text-sm font-medium transition-all duration-300 ${
                    billingPeriod === option.key
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white shadow-lg shadow-[#3B82F6]/25"
                      : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  }`}
                >
                  <span className="hidden sm:inline">{option.label}</span>
                  <span className="sm:hidden">{option.shortLabel}</span>
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            {maintenance.map((plan) => {
              const discountedPrice = calculateDiscountedPrice(plan.basePrice, currentDiscount);
              const showDiscount = currentDiscount > 0;
              return (
                <Card
                  key={plan.name}
                  className="p-0 rounded-lg bg-[#1A1A2E]/30 border-white/5 hover:border-white/10 transition-colors text-center"
                >
                  <CardContent className="p-4">
                    <p className="text-sm font-medium text-white mb-1">
                      {plan.name}
                    </p>
                    {showDiscount && (
                      <p className="text-xs text-[#6B7280] line-through">
                        ${plan.basePrice}/mo
                      </p>
                    )}
                    <p className="text-xl font-bold text-[#3B82F6]">
                      ${discountedPrice}
                      <span className="text-xs font-normal text-[#6B7280]">
                        /mo
                      </span>
                    </p>
                    <p className="text-xs text-[#9CA3AF] mt-2">{plan.features}</p>
                  </CardContent>
                </Card>
              );
            })}

            {/* Enterprise Card */}
            <Card className="p-0 rounded-lg bg-gradient-to-br from-[#1A1A2E]/50 to-purple-900/20 border-purple-500/30 hover:border-purple-500/50 transition-colors text-center relative overflow-hidden">
              <div className="absolute -top-2 left-1/2 -translate-x-1/2 z-10">
                <Badge className="bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 text-[10px] px-2 py-0.5">
                  Premium
                </Badge>
              </div>
              <CardContent className="p-4 pt-5">
                <div className="flex items-center justify-center gap-1 mb-1">
                  <Crown size={14} className="text-purple-400" />
                  <p className="text-sm font-medium text-white">
                    {enterprisePlan.name}
                  </p>
                </div>
                <p className="text-[10px] text-purple-300 mb-1">
                  {enterprisePlan.tagline}
                </p>
                <p className="text-lg font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                  Let&apos;s Talk
                </p>
                <p className="text-xs text-[#9CA3AF] mt-2">{enterprisePlan.features}</p>
              </CardContent>
            </Card>
          </div>

          {/* View Full Pricing Link */}
          <div className="text-center">
            <Link href="/pricing">
              <Button variant="outline" className="border-white/20 hover:bg-white/5 text-white">
                View Full Pricing Details
                <ArrowRight size={16} className="ml-2" />
              </Button>
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
