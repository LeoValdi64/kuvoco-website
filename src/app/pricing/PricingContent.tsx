"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Check, X, ArrowRight, Sparkles } from "lucide-react";
import Link from "next/link";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { cn } from "@/lib/utils";

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

const maintenancePlans = [
  {
    plan: "Basic",
    price: "$29/mo",
    contentChanges: "2/month",
    analytics: false,
    prioritySupport: false,
    dedicatedManager: false,
  },
  {
    plan: "Growth",
    price: "$59/mo",
    contentChanges: "5/month",
    analytics: true,
    prioritySupport: false,
    dedicatedManager: false,
  },
  {
    plan: "Pro",
    price: "$149/mo",
    contentChanges: "12/month",
    analytics: true,
    prioritySupport: true,
    dedicatedManager: false,
  },
  {
    plan: "Enterprise",
    price: "$349+/mo",
    contentChanges: "30/month",
    analytics: true,
    prioritySupport: true,
    dedicatedManager: true,
  },
];

export default function PricingContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const tableRef = useRef(null);
  const isTableInView = useInView(tableRef, { once: true, margin: "-100px" });

  return (
    <div className="relative pt-32 pb-24 sm:pb-32 min-h-screen">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
              Simple, Transparent Pricing
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            No hidden fees. No surprises. Just great websites.
          </p>
        </motion.div>

        {/* Pricing Tiers */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {tiers.map((tier, index) => (
            <motion.div
              key={tier.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className={cn(tier.popular && "pt-4")}
            >
              <Card
                className={cn(
                  "relative overflow-visible transition-all duration-300 hover:-translate-y-1",
                  tier.popular
                    ? "bg-[#1A1A2E] border-[#3B82F6]/50 glow-blue"
                    : "bg-[#1A1A2E]/50 border-white/5 hover:border-white/10"
                )}
              >
                {tier.popular && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-10">
                    <Badge className="bg-[#3B82F6] text-white border-0 px-3 py-1 shadow-lg shadow-[#3B82F6]/25">
                      <Sparkles size={12} className="mr-1" />
                      Most Popular
                    </Badge>
                  </div>
                )}

                <CardHeader className="pb-4">
                  <CardTitle className="text-lg font-semibold mb-1">
                    {tier.name}
                  </CardTitle>
                  <p className="text-xs text-[#6B7280]">{tier.description}</p>
                  <div className="flex items-baseline gap-1 mt-4">
                    <span className="text-3xl font-bold">{tier.price}</span>
                    {tier.price !== "Let's Talk" && (
                      <span className="text-sm text-[#6B7280]">one-time</span>
                    )}
                  </div>
                </CardHeader>

                <CardContent className="pb-6">
                  <ul className="space-y-3">
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
                </CardContent>

                <CardFooter className="pt-0">
                  <Button
                    asChild
                    className={cn(
                      "w-full",
                      tier.popular
                        ? "bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                        : ""
                    )}
                    variant={tier.popular ? "default" : "outline"}
                  >
                    <Link href="/contact">
                      {tier.price === "Let's Talk" ? "Contact Us" : "Get Started"}
                    </Link>
                  </Button>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Maintenance Plans Table */}
        <motion.div
          ref={tableRef}
          initial={{ opacity: 0, y: 20 }}
          animate={isTableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-20"
        >
          <div className="text-center mb-8">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Monthly Maintenance Plans
            </h2>
            <p className="text-[#9CA3AF]">
              Keep your site fresh and performing at its best
            </p>
          </div>

          <div className="bg-[#1A1A2E]/50 border border-white/5 rounded-xl overflow-hidden">
            <Table>
              <TableHeader>
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-white font-semibold">Plan</TableHead>
                  <TableHead className="text-white font-semibold">Price</TableHead>
                  <TableHead className="text-white font-semibold">Content Changes</TableHead>
                  <TableHead className="text-white font-semibold text-center">Analytics</TableHead>
                  <TableHead className="text-white font-semibold text-center">Priority Support</TableHead>
                  <TableHead className="text-white font-semibold text-center">Dedicated Manager</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {maintenancePlans.map((plan, index) => (
                  <motion.tr
                    key={plan.plan}
                    initial={{ opacity: 0, x: -20 }}
                    animate={isTableInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    className="border-white/5 hover:bg-white/5"
                  >
                    <TableCell className="font-medium text-white">
                      {plan.plan}
                    </TableCell>
                    <TableCell className="text-[#3B82F6] font-semibold">
                      {plan.price}
                    </TableCell>
                    <TableCell className="text-[#9CA3AF]">
                      {plan.contentChanges}
                    </TableCell>
                    <TableCell className="text-center">
                      {plan.analytics ? (
                        <Check size={16} className="text-[#3B82F6] mx-auto" />
                      ) : (
                        <X size={16} className="text-[#6B7280] mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {plan.prioritySupport ? (
                        <Check size={16} className="text-[#3B82F6] mx-auto" />
                      ) : (
                        <X size={16} className="text-[#6B7280] mx-auto" />
                      )}
                    </TableCell>
                    <TableCell className="text-center">
                      {plan.dedicatedManager ? (
                        <Check size={16} className="text-[#3B82F6] mx-auto" />
                      ) : (
                        <X size={16} className="text-[#6B7280] mx-auto" />
                      )}
                    </TableCell>
                  </motion.tr>
                ))}
              </TableBody>
            </Table>
          </div>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isTableInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Still have questions?
            </h2>
            <p className="text-[#9CA3AF] mb-8">
              We&apos;re here to help. Get in touch and we&apos;ll answer any questions you have.
            </p>
            <Button asChild size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Contact Us
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
