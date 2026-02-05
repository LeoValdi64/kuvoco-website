"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, X, ArrowRight, Sparkles, ChevronDown } from "lucide-react";
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

const faqs = [
  {
    question: "How long does it take to build my website?",
    answer: "Most websites are delivered within 48 hours to 5 days, depending on the plan you choose. Starter sites ship in 48 hours, Business in 3 days, and Professional in 5 days. Custom projects have dedicated timelines.",
  },
  {
    question: "Do I need to provide my own hosting?",
    answer: "No. We handle the hosting setup as part of every plan. Your site will be deployed on fast, reliable infrastructure with SSL included at no extra cost.",
  },
  {
    question: "Can I update the website myself after launch?",
    answer: "Yes! We build with modern CMS options when needed. You can also choose one of our maintenance plans and we'll handle all updates for you.",
  },
  {
    question: "What if I need changes after the site is delivered?",
    answer: "Minor revisions are included during the delivery process. For ongoing changes, our maintenance plans cover content updates, performance monitoring, and priority support.",
  },
  {
    question: "Is there a contract or commitment?",
    answer: "No long-term contracts. Website builds are a one-time payment. Maintenance plans are month-to-month and can be cancelled anytime.",
  },
];

function FAQItem({ faq, index }: { faq: (typeof faqs)[number]; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-[#1A1A2E]/50 border border-white/5 hover:border-white/10 rounded-xl p-5 transition-all duration-200"
      >
        <div className="flex items-center justify-between gap-4">
          <h3 className="text-white font-medium">{faq.question}</h3>
          <ChevronDown
            size={18}
            className={cn(
              "text-[#9CA3AF] shrink-0 transition-transform duration-200",
              isOpen && "rotate-180"
            )}
          />
        </div>
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden"
            >
              <p className="text-[#9CA3AF] text-sm mt-3 leading-relaxed">
                {faq.answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

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
              className="flex"
            >
              <Card
                className={cn(
                  "relative overflow-visible transition-all duration-300 hover:-translate-y-1 flex flex-col w-full",
                  tier.popular
                    ? "bg-[#1A1A2E] border-[#3B82F6]/50 glow-blue mt-0 pt-4"
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

                <CardContent className="pb-6 flex-1">
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

        {/* FAQ Section */}
        <div className="mb-20">
          <div className="text-center mb-10">
            <h2 className="text-2xl sm:text-3xl font-bold mb-2">
              Frequently Asked Questions
            </h2>
            <p className="text-[#9CA3AF]">
              Everything you need to know about our services
            </p>
          </div>

          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, index) => (
              <FAQItem key={faq.question} faq={faq} index={index} />
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
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
