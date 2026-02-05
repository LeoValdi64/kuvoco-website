"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ChevronDown, ArrowRight, Rocket, Building2, Crown, Puzzle, Shield, TrendingUp, Zap } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pricingTiers = [
  {
    icon: Rocket,
    name: "Starter",
    price: "$399",
    period: "one-time",
    description: "Perfect for getting started online",
    features: [
      "Single page website",
      "Mobile responsive design",
      "Basic SEO setup",
      "Contact form",
      "48-hour delivery",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    icon: Building2,
    name: "Business",
    price: "$699",
    period: "one-time",
    description: "Most popular for local businesses",
    features: [
      "Up to 3 pages",
      "Contact form integration",
      "Google Maps embed",
      "Enhanced SEO",
      "3-day delivery",
    ],
    cta: "Get Started",
    popular: true,
  },
  {
    icon: Crown,
    name: "Professional",
    price: "$999",
    period: "one-time",
    description: "For businesses that need more",
    features: [
      "Up to 5 pages",
      "Custom animations",
      "Advanced SEO",
      "Priority support",
      "5-day delivery",
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    icon: Puzzle,
    name: "Custom",
    price: "Let's Talk",
    period: "",
    description: "Tailored to your exact needs",
    features: [
      "E-commerce solutions",
      "Web applications",
      "Complex requirements",
      "Custom integrations",
      "Dedicated timeline",
    ],
    cta: "Contact Us",
    popular: false,
  },
];

const maintenancePlans = [
  {
    icon: Shield,
    name: "Basic",
    price: "$29",
    period: "/mo",
    features: [
      "2 content changes/month",
      "Hosting included",
      "SSL certificate",
      "Monthly backups",
    ],
  },
  {
    icon: TrendingUp,
    name: "Growth",
    price: "$59",
    period: "/mo",
    features: [
      "5 content changes/month",
      "Analytics dashboard",
      "Performance monitoring",
      "Weekly backups",
    ],
  },
  {
    icon: Zap,
    name: "Pro",
    price: "$149",
    period: "/mo",
    features: [
      "12 content changes/month",
      "Priority support",
      "A/B testing",
      "Daily backups",
    ],
  },
  {
    icon: Building2,
    name: "Enterprise",
    price: "$349+",
    period: "/mo",
    features: [
      "30 content changes/month",
      "Dedicated manager",
      "Custom reporting",
      "Real-time backups",
    ],
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

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.25, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function FAQItem({ question, answer, index }: { question: string; answer: string; index: number }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left bg-[#1A1A2E]/50 border border-white/5 hover:border-white/10 rounded-xl p-5 transition-all duration-300"
      >
        <div className="flex items-center justify-between">
          <h3 className="text-lg font-semibold text-white pr-4">
            {question}
          </h3>
          <ChevronDown
            className={cn(
              "w-5 h-5 text-[#9CA3AF] transition-transform duration-300 flex-shrink-0",
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
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <p className="text-[#9CA3AF] mt-3 leading-relaxed">
                {answer}
              </p>
            </motion.div>
          )}
        </AnimatePresence>
      </button>
    </motion.div>
  );
}

export default function PricingContent() {
  return (
    <main className="bg-[#0A0A0F] min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <div className="absolute inset-0 -top-32 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-[#06B6D4]/5 to-transparent" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[120px]" />
        </div>

        <FadeIn>
          <div className="text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full -translate-y-8" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Simple, Transparent{" "}
              <span className="gradient-text">Pricing</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#9CA3AF] max-w-2xl mx-auto">
              No hidden fees. No surprises. Just great websites.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Pricing Tiers */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {pricingTiers.map((tier, index) => {
              const Icon = tier.icon;
              return (
                <motion.div
                  key={tier.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                >
                  {tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#3B82F6] text-white border-0 px-3 py-1 shadow-lg shadow-[#3B82F6]/25">
                      <Sparkles className="w-3 h-3 mr-1 inline" />
                      Most Popular
                    </Badge>
                  )}
                  <Card
                    className={cn(
                      "bg-[#1A1A2E]/50 border border-white/5 rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full flex flex-col",
                      tier.popular && "border-[#3B82F6]/50 glow-blue"
                    )}
                  >
                    <CardHeader className="text-center pb-6">
                      <div className="w-14 h-14 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mx-auto mb-4">
                        <Icon className="w-7 h-7 text-[#3B82F6]" />
                      </div>
                      <CardTitle className="text-2xl text-white mb-2">
                        {tier.name}
                      </CardTitle>
                      <div className="mb-2">
                        <span className="text-4xl font-bold gradient-text">
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-[#9CA3AF] text-sm ml-2">
                            {tier.period}
                          </span>
                        )}
                      </div>
                      <p className="text-[#9CA3AF] text-sm">
                        {tier.description}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1">
                      <ul className="space-y-3">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className="w-5 h-5 text-[#3B82F6] flex-shrink-0 mt-0.5" />
                            <span className="text-[#9CA3AF] text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Link href="/contact" className="w-full">
                        <Button
                          className={cn(
                            "w-full font-semibold",
                            tier.popular
                              ? "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white"
                              : "border-white/20 hover:bg-white/5 text-white"
                          )}
                          variant={tier.popular ? "default" : "outline"}
                        >
                          {tier.cta}
                          <ArrowRight className="w-4 h-4 ml-2" />
                        </Button>
                      </Link>
                    </CardFooter>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Maintenance Plans Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.2}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Monthly Maintenance Plans
            </h2>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
              Keep your site fresh and performing at its best
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenancePlans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="bg-[#1A1A2E]/50 border border-white/5 rounded-2xl p-6 hover:border-[#3B82F6]/30 transition-all duration-300 h-full">
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        <span className="text-3xl font-bold gradient-text">
                          {plan.price}
                        </span>
                        <span className="text-[#9CA3AF] text-sm ml-1">
                          {plan.period}
                        </span>
                      </div>
                      <ul className="space-y-2 flex-1">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 rounded-full bg-[#3B82F6] flex-shrink-0 mt-2" />
                            <span className="text-[#9CA3AF] text-sm">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* FAQ Section */}
      <section className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.3}>
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-lg text-[#9CA3AF]">
              Everything you need to know about our pricing
            </p>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <FAQItem
                key={faq.question}
                question={faq.question}
                answer={faq.answer}
                index={index}
              />
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.4}>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/80 to-[#1A1A2E]/40 border border-white/10 rounded-3xl p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Get Started?
              </h2>
              <p className="text-lg text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
                Choose the plan that fits your business and let&apos;s build something amazing together.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg"
                  >
                    Start Your Project
                  </Button>
                </Link>
                <Link href="/portfolio">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:bg-white/5 text-white font-semibold px-8 py-6 text-lg"
                  >
                    View Portfolio
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
