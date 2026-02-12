"use client";

import { motion, AnimatePresence } from "framer-motion";
import {
  Check,
  Sparkles,
  ArrowRight,
  Rocket,
  Building2,
  Crown,
  Puzzle,
  Gift,
  Shield,
  TrendingUp,
  Zap,
  Star,
  Info,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding/context";
import type { BillingPeriod } from "@/lib/onboarding/types";
import { cn } from "@/lib/utils";

/* ------------------------------------------------------------------ */
/*  One-Time Build Tiers (matches PricingContent.tsx exactly)          */
/* ------------------------------------------------------------------ */

const pricingTiers = [
  {
    id: "free" as const,
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
    popular: false,
    isFree: true,
    includesGrowth: false,
    isEnterprise: false,
    colorTheme: {
      iconBg: "bg-gray-500/20",
      iconColor: "text-gray-400",
      borderGlow: "border-gray-500/30",
      selectedBorder: "border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.15)]",
      checkColor: "text-gray-500",
      priceColor: "text-gray-400",
    },
  },
  {
    id: "starter" as const,
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
    popular: false,
    isFree: false,
    includesGrowth: true,
    isEnterprise: false,
    colorTheme: {
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      borderGlow: "border-emerald-500/30 hover:border-emerald-500/50",
      selectedBorder: "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
      checkColor: "text-emerald-500",
      priceColor: "text-emerald-400",
    },
  },
  {
    id: "business" as const,
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
    popular: true,
    isFree: false,
    includesGrowth: true,
    isEnterprise: false,
    colorTheme: {
      iconBg: "bg-[#3B82F6]/20",
      iconColor: "text-[#3B82F6]",
      borderGlow: "border-[#3B82F6]/30 hover:border-[#3B82F6]/50",
      selectedBorder: "border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.25)]",
      checkColor: "text-[#3B82F6]",
      priceColor: "text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]",
    },
  },
  {
    id: "professional" as const,
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
    popular: false,
    isFree: false,
    includesGrowth: true,
    isEnterprise: false,
    colorTheme: {
      iconBg: "bg-violet-500/20",
      iconColor: "text-violet-400",
      borderGlow: "border-violet-500/30 hover:border-violet-500/50",
      selectedBorder: "border-violet-500 shadow-[0_0_20px_rgba(139,92,246,0.2)]",
      checkColor: "text-violet-500",
      priceColor: "text-violet-400",
    },
  },
  {
    id: "enterprise" as const,
    icon: Puzzle,
    name: "Enterprise",
    price: "Let's Talk",
    period: "",
    description: "Complete digital transformation",
    features: [
      "Multi-page web application",
      "Custom domain included",
      "Design preview before deploy",
      "Your dedicated tech partner",
      "Custom integrations & APIs",
      "Ongoing strategic support",
      "Priority development queue",
    ],
    popular: false,
    isFree: false,
    includesGrowth: true,
    isEnterprise: true,
    colorTheme: {
      iconBg: "bg-gradient-to-br from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-400",
      borderGlow: "border-amber-500/30 hover:border-amber-500/50",
      selectedBorder: "border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.2)]",
      checkColor: "text-amber-500",
      priceColor: "bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Monthly Maintenance Plans (matches PricingContent.tsx)             */
/* ------------------------------------------------------------------ */

const maintenancePlans = [
  {
    id: "basic" as const,
    icon: Shield,
    name: "Basic",
    description: "Essential maintenance for your website",
    basePrice: 29,
    features: [
      "2 content changes/month",
      "Hosting included",
      "SSL certificate",
      "Monthly backups",
      "Uptime monitoring",
      "Email support",
    ],
    isMinimum: true,
    colorTheme: {
      iconBg: "bg-gray-500/20",
      iconColor: "text-gray-400",
      borderColor: "border-gray-600/30 hover:border-gray-500/50",
      selectedBorder: "border-gray-400 shadow-[0_0_20px_rgba(156,163,175,0.15)]",
      dotColor: "bg-gray-500",
      priceColor: "text-gray-400",
      cardBg: "bg-[#1A1A2E]/30",
    },
  },
  {
    id: "growth" as const,
    icon: TrendingUp,
    name: "Growth",
    description: "For businesses ready to scale",
    basePrice: 59,
    features: [
      "5 content changes/month",
      "Analytics dashboard",
      "Performance monitoring",
      "Weekly backups",
      "Priority email support",
      "Speed optimization",
    ],
    isMinimum: false,
    colorTheme: {
      iconBg: "bg-emerald-500/20",
      iconColor: "text-emerald-400",
      borderColor: "border-emerald-500/30 hover:border-emerald-500/50",
      selectedBorder: "border-emerald-500 shadow-[0_0_20px_rgba(16,185,129,0.2)]",
      dotColor: "bg-emerald-500",
      priceColor: "text-emerald-400",
      cardBg: "bg-[#1A1A2E]/50",
    },
  },
  {
    id: "pro" as const,
    icon: Zap,
    name: "Pro",
    description: "Maximum performance and support",
    basePrice: 149,
    features: [
      "12 content changes/month",
      "Priority support",
      "Daily backups",
      "Advanced analytics",
      "Phone support",
      "Priority 24hr response",
    ],
    isMinimum: false,
    colorTheme: {
      iconBg: "bg-[#3B82F6]/20",
      iconColor: "text-[#3B82F6]",
      borderColor: "border-[#3B82F6]/30 hover:border-[#3B82F6]/50",
      selectedBorder: "border-[#3B82F6] shadow-[0_0_20px_rgba(59,130,246,0.25)]",
      dotColor: "bg-[#3B82F6]",
      priceColor: "text-transparent bg-clip-text bg-gradient-to-r from-[#3B82F6] to-[#06B6D4]",
      cardBg: "bg-[#1A1A2E]/50",
    },
  },
  {
    id: "enterprise" as const,
    icon: Crown,
    name: "Enterprise",
    description: "We become your tech team",
    basePrice: 349,
    features: [
      "30+ content changes/month",
      "Dedicated account manager",
      "Custom integrations",
      "SLA guarantee",
      "Priority 24hr response",
      "Unlimited consultations",
    ],
    isMinimum: false,
    colorTheme: {
      iconBg: "bg-gradient-to-br from-amber-500/20 to-yellow-500/20",
      iconColor: "text-amber-400",
      borderColor: "border-amber-500/30 hover:border-amber-500/50",
      selectedBorder: "border-amber-500 shadow-[0_0_25px_rgba(245,158,11,0.2)]",
      dotColor: "bg-amber-400",
      priceColor: "bg-gradient-to-r from-amber-400 to-yellow-400 bg-clip-text text-transparent",
      cardBg: "bg-gradient-to-br from-[#1A1A2E]/70 via-[#1A1A2E]/50 to-amber-900/20",
    },
  },
];

/* ------------------------------------------------------------------ */
/*  Billing period options                                            */
/* ------------------------------------------------------------------ */

const billingOptions: { key: BillingPeriod; label: string; discount: number }[] = [
  { key: "monthly", label: "Monthly", discount: 0 },
  { key: "quarterly", label: "Quarterly (-10%)", discount: 0.10 },
  { key: "semiannual", label: "Semi-annual (-15%)", discount: 0.15 },
  { key: "annual", label: "Annual (-25%)", discount: 0.25 },
];

function calculateDiscountedPrice(basePrice: number, discount: number): string {
  const discounted = basePrice * (1 - discount);
  return discounted.toFixed(2).replace(/\.00$/, "");
}

/* ------------------------------------------------------------------ */
/*  Helper: is a paid build plan                                      */
/* ------------------------------------------------------------------ */

function isPaidBuildPlan(plan: string | null): boolean {
  return plan === "starter" || plan === "business" || plan === "professional";
}

/* ------------------------------------------------------------------ */
/*  Component                                                         */
/* ------------------------------------------------------------------ */

export function StepPlan() {
  const { data, updateData, stepPlanView, setStepPlanView } = useOnboarding();

  const selectedPlan = data.plan;
  const selectedSubscription = data.subscriptionPlan;
  const billingPeriod = data.billingPeriod;
  const currentDiscount = billingOptions.find((opt) => opt.key === billingPeriod)?.discount || 0;
  const hasPaidBuild = isPaidBuildPlan(selectedPlan);

  // Auto-select Growth when switching to monthly view with a paid build plan
  const handleContinueToMonthly = () => {
    if (hasPaidBuild && !selectedSubscription) {
      updateData({ subscriptionPlan: "growth" });
    }
    setStepPlanView("monthly");
  };

  // Growth free logic messaging
  function getGrowthMessage(): string | null {
    if (!hasPaidBuild) return null;

    if (selectedSubscription === "basic") {
      return "Growth plan is included FREE for your first 3 months. After that, you'll switch to Basic ($29/mo).";
    }
    if (selectedSubscription === "pro") {
      const diff = 149 - 59;
      return `First 3 months at $${diff}/mo (Pro upgrade from included Growth). Then full $149/mo.`;
    }
    if (selectedSubscription === "enterprise") {
      const diff = 349 - 59;
      return `First 3 months at $${diff}/mo (Enterprise upgrade from included Growth). Then full $349/mo.`;
    }
    if (selectedSubscription === "growth") {
      return "Included FREE for 3 months with your build plan! ($177 value)";
    }
    return null;
  }

  return (
    <div className="w-full max-w-6xl mx-auto px-4 py-6">
      {/* Header */}
      <div className="text-center mb-6">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          {stepPlanView === "onetime"
            ? "Choose Your Build Plan"
            : "Choose Your Monthly Plan"}
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          {stepPlanView === "onetime"
            ? "Select the package that fits your needs"
            : "Your website needs care to keep running, secure, and performing"}
        </p>

        {/* Sub-step indicator */}
        <div className="flex items-center justify-center gap-3 mt-4">
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                stepPlanView === "onetime"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-[#3B82F6]/20 text-[#3B82F6]"
              )}
            >
              {stepPlanView === "monthly" ? (
                <Check className="w-4 h-4" />
              ) : (
                "1"
              )}
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                stepPlanView === "onetime" ? "text-white" : "text-[#3B82F6]"
              )}
            >
              Build Plan
            </span>
          </div>
          <div className="w-8 h-px bg-zinc-700" />
          <div className="flex items-center gap-2">
            <div
              className={cn(
                "w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold transition-all",
                stepPlanView === "monthly"
                  ? "bg-[#3B82F6] text-white"
                  : "bg-zinc-800 text-zinc-500"
              )}
            >
              2
            </div>
            <span
              className={cn(
                "text-xs font-medium",
                stepPlanView === "monthly" ? "text-white" : "text-zinc-500"
              )}
            >
              Monthly Plan
            </span>
          </div>
        </div>
      </div>

      <AnimatePresence mode="wait">
        {stepPlanView === "onetime" ? (
          <motion.div
            key="onetime"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.25 }}
          >
            {/* 3 Months Growth FREE Banner */}
            <div className="text-center mb-6">
              <Badge className="bg-gradient-to-r from-emerald-500 to-teal-500 text-white border-0 px-4 py-2 text-sm shadow-lg shadow-emerald-500/25">
                <Star className="w-4 h-4 mr-2 inline" />
                All paid tiers include 3 months of Growth plan FREE ($177 value)
              </Badge>
            </div>

            {/* One-Time Build Tier Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {pricingTiers.map((tier, index) => {
                const Icon = tier.icon;
                const isSelected = selectedPlan === tier.id;

                return (
                  <motion.div
                    key={tier.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative"
                  >
                    {/* Badges */}
                    {tier.popular && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-[#3B82F6] text-white border-0 px-3 py-1 text-xs shadow-lg shadow-[#3B82F6]/25">
                        <Sparkles className="w-3 h-3 mr-1 inline" />
                        Most Popular
                      </Badge>
                    )}
                    {tier.isEnterprise && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0 px-3 py-1 text-xs shadow-lg shadow-amber-500/25">
                        Premium
                      </Badge>
                    )}
                    {tier.includesGrowth && !tier.popular && !tier.isEnterprise && (
                      <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-emerald-500 text-white border-0 px-2 py-1 text-xs shadow-lg shadow-emerald-500/25">
                        3mo Growth FREE
                      </Badge>
                    )}

                    <Card
                      onClick={() => updateData({ plan: tier.id })}
                      className={cn(
                        "cursor-pointer border rounded-2xl overflow-hidden transition-all duration-200 h-full flex flex-col",
                        tier.isEnterprise && "bg-gradient-to-br from-[#1A1A2E]/70 via-[#1A1A2E]/50 to-amber-900/20",
                        tier.popular && "bg-[#1A1A2E]/70",
                        tier.isFree && "bg-[#1A1A2E]/30",
                        !tier.popular && !tier.isFree && !tier.isEnterprise && "bg-[#1A1A2E]/50",
                        isSelected ? tier.colorTheme.selectedBorder : tier.colorTheme.borderGlow
                      )}
                    >
                      {tier.isEnterprise && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
                      )}
                      <CardHeader className={cn("text-center pb-2 pt-5", tier.isEnterprise && "relative")}>
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center mx-auto mb-2",
                            tier.colorTheme.iconBg
                          )}
                        >
                          <Icon className={cn("w-5 h-5", tier.colorTheme.iconColor)} />
                        </div>
                        <CardTitle className="text-lg text-white mb-0.5">
                          {tier.name}
                        </CardTitle>
                        <div className="mb-1">
                          <span className={cn("text-2xl font-bold", tier.colorTheme.priceColor)}>
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

                      <CardContent className={cn("flex-1 pt-0 pb-3", tier.isEnterprise && "relative")}>
                        <ul className="space-y-1.5">
                          {tier.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <Check
                                className={cn(
                                  "w-3.5 h-3.5 flex-shrink-0 mt-0.5",
                                  tier.colorTheme.checkColor
                                )}
                              />
                              <span className="text-[#9CA3AF] text-xs">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>
                      </CardContent>

                      <CardFooter className={cn("pt-0 pb-4", tier.isEnterprise && "relative")}>
                        <div
                          className={cn(
                            "w-full py-2 rounded-lg text-sm font-medium text-center transition-colors",
                            isSelected
                              ? "bg-[#3B82F6] text-white"
                              : "bg-zinc-800/50 text-zinc-400"
                          )}
                        >
                          {isSelected ? "Selected" : "Select Plan"}
                        </div>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Continue to Monthly Plans button */}
            {selectedPlan && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-8 text-center"
              >
                <Button
                  onClick={handleContinueToMonthly}
                  size="lg"
                  className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-8"
                >
                  Next: Choose Your Monthly Plan
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
              </motion.div>
            )}
          </motion.div>
        ) : (
          <motion.div
            key="monthly"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 20 }}
            transition={{ duration: 0.25 }}
          >
            {/* Required badge */}
            <div className="text-center mb-4">
              <Badge className="bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30 mb-3">
                Required with every website
              </Badge>
            </div>

            {/* Billing Period Selector */}
            <div className="flex flex-wrap gap-2 justify-center bg-[#1A1A2E]/50 rounded-xl p-2 max-w-fit mx-auto mb-6">
              {billingOptions.map((option) => (
                <button
                  key={option.key}
                  onClick={() => updateData({ billingPeriod: option.key })}
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

            {/* Growth Free Callout (for paid build plans) */}
            {hasPaidBuild && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mb-6 p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center"
              >
                <div className="flex items-center justify-center gap-2 text-sm">
                  <Star className="w-4 h-4 text-emerald-400" />
                  <span className="text-emerald-300 font-medium">
                    Growth plan included FREE for 3 months with your{" "}
                    {pricingTiers.find((t) => t.id === selectedPlan)?.name} build!
                  </span>
                </div>
              </motion.div>
            )}

            {/* Monthly Plan Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {maintenancePlans.map((plan, index) => {
                const Icon = plan.icon;
                const isSelected = selectedSubscription === plan.id;
                const discountedPrice = calculateDiscountedPrice(plan.basePrice, currentDiscount);
                const showDiscount = currentDiscount > 0;
                const isEnterprisePlan = plan.id === "enterprise";

                // Badge logic
                let badgeContent: React.ReactNode = null;
                if (plan.isMinimum) {
                  badgeContent = (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gray-600 text-white border-0 px-2 py-1 text-xs">
                      FREE tier minimum
                    </Badge>
                  );
                } else if (plan.id === "growth" && hasPaidBuild) {
                  badgeContent = (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-emerald-500 text-white border-0 px-2 py-1 text-xs shadow-lg shadow-emerald-500/25">
                      <Star className="w-3 h-3 mr-1 inline" />
                      FREE for 3 months
                    </Badge>
                  );
                } else if (isEnterprisePlan) {
                  badgeContent = (
                    <Badge className="absolute -top-3 left-1/2 -translate-x-1/2 z-10 bg-gradient-to-r from-amber-500 to-yellow-500 text-white border-0 px-3 py-1 text-xs shadow-lg shadow-amber-500/25">
                      Premium
                    </Badge>
                  );
                }

                return (
                  <motion.div
                    key={plan.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    className="relative"
                  >
                    {badgeContent}

                    <Card
                      onClick={() => updateData({ subscriptionPlan: plan.id })}
                      className={cn(
                        "cursor-pointer border rounded-2xl p-5 transition-all duration-200 h-full",
                        plan.colorTheme.cardBg,
                        isSelected ? plan.colorTheme.selectedBorder : plan.colorTheme.borderColor,
                        isEnterprisePlan && "relative overflow-hidden"
                      )}
                    >
                      {isEnterprisePlan && (
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-500/5 via-transparent to-yellow-500/5" />
                      )}
                      <div className={cn("flex flex-col h-full", isEnterprisePlan && "relative")}>
                        <div
                          className={cn(
                            "w-10 h-10 rounded-xl flex items-center justify-center mb-3",
                            plan.colorTheme.iconBg
                          )}
                        >
                          <Icon className={cn("w-5 h-5", plan.colorTheme.iconColor)} />
                        </div>
                        <h3 className="text-lg font-bold text-white mb-0.5">
                          {plan.name}
                        </h3>
                        <p className="text-xs text-[#9CA3AF] mb-3">
                          {plan.description}
                        </p>

                        {/* Price */}
                        <div className="mb-4">
                          {showDiscount && (
                            <div className="text-sm text-[#6B7280] line-through mb-0.5">
                              ${plan.basePrice}/mo
                            </div>
                          )}
                          <span className={cn("text-2xl font-bold", plan.colorTheme.priceColor)}>
                            {isEnterprisePlan ? `$${discountedPrice}+` : `$${discountedPrice}`}
                          </span>
                          <span className="text-[#9CA3AF] text-sm ml-1">/mo</span>
                        </div>

                        {/* Features */}
                        <ul className="space-y-1.5 flex-1 mb-4">
                          {plan.features.map((feature) => (
                            <li key={feature} className="flex items-start gap-2">
                              <div
                                className={cn(
                                  "w-1.5 h-1.5 rounded-full flex-shrink-0 mt-1.5",
                                  plan.colorTheme.dotColor
                                )}
                              />
                              <span className="text-[#9CA3AF] text-sm">
                                {feature}
                              </span>
                            </li>
                          ))}
                        </ul>

                        {/* Selection indicator */}
                        <div
                          className={cn(
                            "w-full py-2 rounded-lg text-sm font-medium text-center transition-colors mt-auto",
                            isSelected
                              ? "bg-[#3B82F6] text-white"
                              : "bg-zinc-800/50 text-zinc-400"
                          )}
                        >
                          {isSelected ? "Selected" : "Select Plan"}
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>

            {/* Growth free logic messaging */}
            {hasPaidBuild && selectedSubscription && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800"
              >
                <div className="flex items-start gap-2.5 text-sm">
                  <Info className="w-4 h-4 text-[#3B82F6] shrink-0 mt-0.5" />
                  <span className="text-zinc-300">
                    {getGrowthMessage()}
                  </span>
                </div>
              </motion.div>
            )}

            {/* Free tier warning */}
            {selectedPlan === "free" && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="mt-5 p-4 rounded-xl bg-amber-500/10 border border-amber-500/20"
              >
                <div className="flex items-start gap-2.5 text-sm">
                  <Info className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <span className="text-amber-200">
                    Free tier requires a monthly plan (Basic minimum at $29/mo). No free Growth months included.
                  </span>
                </div>
              </motion.div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
