"use client";

import { motion, useInView, AnimatePresence } from "framer-motion";
import { Check, Sparkles, ChevronDown, ArrowRight, Rocket, Building2, Crown, Puzzle, Shield, TrendingUp, Zap, Gift, RefreshCw, Star } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const pricingTiers = [
  {
    icon: Gift,
    name: "Free",
    price: "$0",
    period: "one-time",
    description: "Get started at no cost",
    features: [
      "1 basic page",
      "Subdomain only (business.kuvoco.com)",
      "Mobile responsive design",
      "5-day delivery",
      "Requires monthly plan ($29/mo min)",
    ],
    cta: "Get Started",
    popular: false,
    isFree: true,
    includesGrowth: false,
  },
  {
    icon: Rocket,
    name: "Starter",
    price: "$399",
    period: "one-time",
    description: "Perfect for getting started online",
    features: [
      "1 page website",
      "Custom domain included",
      "Design preview before deploy",
      "Basic SEO setup",
      "2 revisions included",
      "48-hour delivery",
    ],
    cta: "Get Started",
    popular: false,
    isFree: false,
    includesGrowth: true,
  },
  {
    icon: Building2,
    name: "Business",
    price: "$699",
    period: "one-time",
    description: "Most popular for local businesses",
    features: [
      "Up to 3 pages",
      "Custom domain included",
      "Design preview before deploy",
      "Google Maps integration",
      "Enhanced SEO",
      "3 revisions included",
      "3-day delivery",
    ],
    cta: "Get Started",
    popular: true,
    isFree: false,
    includesGrowth: true,
  },
  {
    icon: Crown,
    name: "Professional",
    price: "$999",
    period: "one-time",
    description: "For businesses that need more",
    features: [
      "Up to 5 pages",
      "Custom domain included",
      "Design preview before deploy",
      "Custom animations",
      "Advanced SEO",
      "Priority support",
      "5 revisions included",
      "5-day delivery",
    ],
    cta: "Get Started",
    popular: false,
    isFree: false,
    includesGrowth: true,
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
      "Complex integrations",
      "Custom requirements",
      "Dedicated timeline",
    ],
    cta: "Contact Us",
    popular: false,
    isFree: false,
    includesGrowth: true,
  },
];

const maintenancePlans = [
  {
    icon: Shield,
    name: "Basic",
    basePrice: 29,
    features: [
      "2 content changes/month",
      "Hosting included",
      "SSL certificate",
      "Monthly backups",
    ],
    isMinimum: true,
  },
  {
    icon: TrendingUp,
    name: "Growth",
    basePrice: 59,
    features: [
      "5 content changes/month",
      "Analytics dashboard",
      "Performance monitoring",
      "Weekly backups",
    ],
    isMinimum: false,
  },
  {
    icon: Zap,
    name: "Pro",
    basePrice: 149,
    features: [
      "12 content changes/month",
      "Priority support",
      "A/B testing",
      "Daily backups",
    ],
    isMinimum: false,
  },
];

const enterprisePlan = {
  icon: Crown,
  name: "Enterprise",
  features: [
    "Your dedicated tech partner",
    "Personal agent for direct communication",
    "Like having an employee, but more affordable",
    "We handle all the tech logistics",
    "Unlimited strategic consultations",
    "Priority 24-hour response",
  ],
};

type BillingPeriod = "monthly" | "quarterly" | "semiannual" | "annual";

const billingOptions: { key: BillingPeriod; label: string; discount: number }[] = [
  { key: "monthly", label: "Monthly", discount: 0 },
  { key: "quarterly", label: "Quarterly (-10%)", discount: 0.10 },
  { key: "semiannual", label: "Semi-annual (-15%)", discount: 0.15 },
  { key: "annual", label: "Annual (-25%)", discount: 0.25 },
];

function calculateDiscountedPrice(basePrice: number, discount: number): string {
  const discounted = basePrice * (1 - discount);
  return discounted.toFixed(2);
}


const faqs = [
  {
    question: "Is the monthly maintenance plan required?",
    answer: "Yes, every website requires a monthly maintenance plan to keep it running, secure, and performing well. This includes hosting, SSL, backups, and content changes. The Basic plan starts at just $29/month. Commit quarterly, semi-annually, or annually to save up to 25%.",
  },
  {
    question: "What's included in the FREE tier?",
    answer: "The FREE tier gives you a basic 1-page website on a subdomain (yourbusiness.kuvoco.com). It's perfect for testing the waters. To get a custom domain, design preview, and faster delivery, upgrade to a paid tier. FREE tier requires the Basic monthly plan ($29/mo).",
  },
  {
    question: "What is 'Switch & Save'?",
    answer: "Already have a website? Switch to Kuvo Co. and save $300 off any paid tier (Starter, Business, or Professional). This makes Starter just $99! The only requirement is a 1-year commitment to any monthly plan. You can pay monthly or save more by paying annually.",
  },
  {
    question: "What's included with the 3 months of Growth plan?",
    answer: "Every paid website tier (Starter, Business, Professional) includes 3 months of our Growth plan ($59/mo value) completely FREE. This includes analytics dashboard, performance monitoring, 5 content changes per month, and weekly backups. After 3 months, you can continue on Growth or switch to any plan.",
  },
  {
    question: "How long does it take to build my website?",
    answer: "Delivery times vary by tier: FREE tier in 5 days, Starter in 48 hours, Business in 3 days, and Professional in 5 days. All paid tiers include a design preview before final deployment so you can approve the look before we go live.",
  },
  {
    question: "Do I get to approve the design before it goes live?",
    answer: "Yes! All paid tiers (Starter, Business, Professional) include a design preview. We'll show you the design and you can request revisions (2-5 depending on your tier) before we deploy. The FREE tier is deployed directly.",
  },
  {
    question: "What commitment discounts are available?",
    answer: "Save on your monthly maintenance plan by committing longer: Quarterly saves 10%, Semi-annual saves 15%, and Annual saves 25%. These discounts apply to all maintenance plans (Basic, Growth, Pro, Enterprise).",
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
  const [billingPeriod, setBillingPeriod] = useState<BillingPeriod>("annual");
  const currentDiscount = billingOptions.find(opt => opt.key === billingPeriod)?.discount || 0;

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
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeIn delay={0.1}>
          {/* 3 Months Growth FREE Banner */}
          <div className="text-center mb-8">
            <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-4 py-2 text-sm shadow-lg shadow-emerald-500/25">
              <Star className="w-4 h-4 mr-2 inline" />
              All paid tiers include 3 months of Growth plan FREE ($177 value)
            </Badge>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-5">
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
                  {tier.includesGrowth && !tier.popular && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-emerald-500 text-white border-0 px-2 py-1 text-xs shadow-lg shadow-emerald-500/25">
                      3mo Growth FREE
                    </Badge>
                  )}
                  <Card
                    className={cn(
                      "border rounded-2xl overflow-hidden hover:-translate-y-1 transition-all duration-300 h-full flex flex-col",
                      tier.popular && "border-[#3B82F6]/50 glow-blue bg-[#1A1A2E]/70",
                      tier.isFree && "bg-[#1A1A2E]/30 border-white/10",
                      !tier.popular && !tier.isFree && "bg-[#1A1A2E]/50 border-white/5"
                    )}
                  >
                    <CardHeader className="text-center pb-4">
                      <div className={cn(
                        "w-12 h-12 rounded-xl flex items-center justify-center mx-auto mb-3",
                        tier.isFree ? "bg-gray-500/20" : "bg-[#3B82F6]/10"
                      )}>
                        <Icon className={cn(
                          "w-6 h-6",
                          tier.isFree ? "text-gray-400" : "text-[#3B82F6]"
                        )} />
                      </div>
                      <CardTitle className="text-xl text-white mb-1">
                        {tier.name}
                      </CardTitle>
                      <div className="mb-2">
                        <span className={cn(
                          "text-3xl font-bold",
                          tier.isFree ? "text-gray-400" : "gradient-text"
                        )}>
                          {tier.price}
                        </span>
                        {tier.period && (
                          <span className="text-[#9CA3AF] text-xs ml-1">
                            {tier.period}
                          </span>
                        )}
                      </div>
                      <p className="text-[#9CA3AF] text-xs">
                        {tier.description}
                      </p>
                    </CardHeader>
                    <CardContent className="flex-1 pt-0">
                      <ul className="space-y-2">
                        {tier.features.map((feature) => (
                          <li key={feature} className="flex items-start gap-2">
                            <Check className={cn(
                              "w-4 h-4 flex-shrink-0 mt-0.5",
                              tier.isFree ? "text-gray-500" : "text-[#3B82F6]"
                            )} />
                            <span className="text-[#9CA3AF] text-xs">
                              {feature}
                            </span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter className="pt-0">
                      <Link href="/contact" className="w-full">
                        <Button
                          className={cn(
                            "w-full font-semibold text-sm",
                            tier.popular
                              ? "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white"
                              : tier.isFree
                              ? "border-gray-600 hover:bg-gray-800/50 text-gray-300"
                              : "border-white/20 hover:bg-white/5 text-white"
                          )}
                          variant={tier.popular ? "default" : "outline"}
                          size="sm"
                        >
                          {tier.cta}
                          <ArrowRight className="w-3 h-3 ml-1" />
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

      {/* Switch & Save Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.15}>
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-br from-orange-500/10 via-amber-500/10 to-yellow-500/10 border border-orange-500/30 p-8">
            <div className="absolute top-0 right-0 w-40 h-40 bg-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-40 h-40 bg-amber-500/20 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10 flex flex-col lg:flex-row items-center gap-8">
              <div className="flex-shrink-0">
                <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-orange-500 to-amber-500 flex items-center justify-center shadow-xl shadow-orange-500/30">
                  <RefreshCw className="w-10 h-10 text-white" />
                </div>
              </div>

              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl sm:text-3xl font-bold text-white mb-2">
                  Switch & Save <span className="gradient-text">$300</span>
                </h3>
                <p className="text-[#9CA3AF] mb-4">
                  Already have a website? Time to upgrade. Switch to Kuvo Co. and save $300 off any paid tier.
                </p>
                <div className="flex flex-wrap gap-3 justify-center lg:justify-start mb-4">
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400 bg-orange-500/10">
                    Starter: $399 → $99
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400 bg-orange-500/10">
                    Business: $699 → $399
                  </Badge>
                  <Badge variant="outline" className="border-orange-500/50 text-orange-400 bg-orange-500/10">
                    Professional: $999 → $699
                  </Badge>
                </div>
                <p className="text-xs text-[#6B7280]">
                  Requires 1-year commitment to any monthly plan. Pay monthly or save more with annual payment.
                </p>
              </div>

              <div className="flex-shrink-0">
                <Link href="/contact">
                  <Button className="bg-gradient-to-r from-orange-500 to-amber-500 hover:opacity-90 text-white font-semibold px-6">
                    Claim $300 Off
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Maintenance Plans Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.2}>
          <div className="text-center mb-8">
            <Badge className="mb-4 bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30">
              Required with every website
            </Badge>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
              Monthly Maintenance Plans
            </h2>
            <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto mb-6">
              Your website needs care to keep running, secure, and performing. We handle it all.
            </p>

            {/* Billing Period Tabs */}
            <div className="flex flex-wrap gap-2 justify-center bg-[#1A1A2E]/50 rounded-xl p-2 max-w-fit mx-auto">
              {billingOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => setBillingPeriod(option.key)}
                  className={cn(
                    "px-4 py-2 rounded-lg text-sm font-medium transition-all duration-300",
                    billingPeriod === option.key
                      ? "bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white shadow-lg shadow-[#3B82F6]/25"
                      : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  )}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {maintenancePlans.map((plan, index) => {
              const Icon = plan.icon;
              const discountedPrice = calculateDiscountedPrice(plan.basePrice, currentDiscount);
              const showDiscount = currentDiscount > 0;
              return (
                <motion.div
                  key={plan.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                  className="relative"
                >
                  {plan.isMinimum && (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gray-600 text-white border-0 px-2 py-1 text-xs">
                      FREE tier minimum
                    </Badge>
                  )}
                  <Card className={cn(
                    "border rounded-2xl p-6 hover:border-[#3B82F6]/30 transition-all duration-300 h-full",
                    plan.isMinimum ? "bg-[#1A1A2E]/30 border-gray-600/30" : "bg-[#1A1A2E]/50 border-white/5"
                  )}>
                    <div className="flex flex-col h-full">
                      <div className="w-12 h-12 rounded-xl bg-[#3B82F6]/10 flex items-center justify-center mb-4">
                        <Icon className="w-6 h-6 text-[#3B82F6]" />
                      </div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {plan.name}
                      </h3>
                      <div className="mb-4">
                        {showDiscount && (
                          <div className="text-sm text-[#6B7280] line-through mb-1">
                            ${plan.basePrice}/mo
                          </div>
                        )}
                        <span className="text-3xl font-bold gradient-text">
                          ${discountedPrice}
                        </span>
                        <span className="text-[#9CA3AF] text-sm ml-1">
                          /mo
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

            {/* Enterprise Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.15 }}
              className="relative"
            >
              <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-purple-500 to-pink-500 text-white border-0 px-3 py-1 text-xs shadow-lg shadow-purple-500/25">
                Premium
              </Badge>
              <Card className="border rounded-2xl p-6 h-full bg-gradient-to-br from-[#1A1A2E]/70 via-[#1A1A2E]/50 to-purple-900/20 border-purple-500/30 hover:border-purple-500/50 transition-all duration-300 relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 via-transparent to-pink-500/5" />
                <div className="relative flex flex-col h-full">
                  <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500/20 to-pink-500/20 flex items-center justify-center mb-4">
                    <enterprisePlan.icon className="w-6 h-6 text-purple-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white mb-1">
                    {enterprisePlan.name}
                  </h3>
                  <p className="text-sm text-purple-300 mb-4">
                    We become your tech team
                  </p>
                  <div className="mb-4">
                    <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
                      Let&apos;s Talk
                    </span>
                  </div>
                  <ul className="space-y-2 flex-1 mb-4">
                    {enterprisePlan.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2">
                        <div className="w-1.5 h-1.5 rounded-full bg-purple-400 flex-shrink-0 mt-2" />
                        <span className="text-[#9CA3AF] text-sm">
                          {feature}
                        </span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-auto pt-4 border-t border-purple-500/20">
                    <p className="text-xs text-[#6B7280] mb-3">
                      Skip the cost of an internal tech team. Focus on your business, we handle the technology.
                    </p>
                    <Link href="/contact" className="w-full">
                      <Button className="w-full bg-gradient-to-r from-purple-500 to-pink-500 hover:opacity-90 text-white font-semibold text-sm">
                        Contact Us
                        <ArrowRight className="w-3 h-3 ml-1" />
                      </Button>
                    </Link>
                  </div>
                </div>
              </Card>
            </motion.div>
          </div>
        </FadeIn>
      </section>

      {/* Despreocúpate / Don't Worry Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.25}>
          <div className="relative overflow-hidden rounded-3xl bg-gradient-to-br from-[#3B82F6]/10 via-[#06B6D4]/10 to-[#3B82F6]/5 border border-[#3B82F6]/20 p-10">
            <div className="absolute top-0 left-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 -translate-x-1/2" />
            <div className="absolute bottom-0 right-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 translate-x-1/2" />

            <div className="relative z-10 text-center">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Don&apos;t Worry, <span className="gradient-text">We&apos;ve Got This</span>
              </h2>

              <div className="grid md:grid-cols-2 gap-6 text-left max-w-4xl mx-auto mb-8">
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">Focus on your business</h4>
                  <p className="text-[#9CA3AF] text-sm">
                    You&apos;re great at what you do. We&apos;re great at websites. Let us handle your online presence while you do what you do best.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">We know what works</h4>
                  <p className="text-[#9CA3AF] text-sm">
                    Don&apos;t worry about what changes to make — we understand the market and SEO. We constantly update your site to increase visitor flow.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">More visitors = More customers</h4>
                  <p className="text-[#9CA3AF] text-sm">
                    Your website isn&apos;t just an online presence — it&apos;s your main source of new clients. We turn it into a lead-generating machine.
                  </p>
                </div>
                <div className="bg-white/5 rounded-xl p-5 border border-white/10">
                  <h4 className="text-lg font-semibold text-white mb-2">24-48hr support for changes</h4>
                  <p className="text-[#9CA3AF] text-sm">
                    Need something updated? We respond fast. Modern design, new technology, and a team that actually cares about your success.
                  </p>
                </div>
              </div>

              <p className="text-[#6B7280] text-sm italic">
                &quot;It costs less to join us than to keep losing customers with an outdated site.&quot;
              </p>
            </div>
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
