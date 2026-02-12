"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Zap } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/lib/onboarding/context";

const plans = [
  {
    id: "starter" as const,
    name: "Starter",
    price: 399,
    pages: 1,
    delivery: "48hr",
    revisions: 2,
    popular: false,
    features: ["Mobile responsive", "Basic SEO"],
  },
  {
    id: "business" as const,
    name: "Business",
    price: 699,
    pages: 3,
    delivery: "3-day",
    revisions: 3,
    popular: true,
    features: [
      "Mobile responsive",
      "Advanced SEO",
      "Contact form",
      "Google Analytics",
    ],
  },
  {
    id: "professional" as const,
    name: "Professional",
    price: 999,
    pages: 5,
    delivery: "5-day",
    revisions: 5,
    popular: false,
    features: [
      "Mobile responsive",
      "Premium SEO",
      "Contact form",
      "Google Analytics",
      "Custom animations",
      "Priority support",
    ],
  },
] as const;

const subscriptions = [
  {
    id: "basic" as const,
    name: "Basic",
    price: 29,
    changes: 2,
  },
  {
    id: "growth" as const,
    name: "Growth",
    price: 59,
    changes: 5,
  },
  {
    id: "pro" as const,
    name: "Pro",
    price: 149,
    changes: 12,
  },
] as const;

export function StepPlan() {
  const { data, updateData } = useOnboarding();
  const [view, setView] = useState<"onetime" | "monthly">("onetime");

  const selectedPlan = data.plan;
  const selectedSubscription = data.subscriptionPlan;

  return (
    <div className="w-full max-w-5xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Choose Your Plan
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          Select the package that fits your needs
        </p>
      </div>

      {/* Toggle */}
      <div className="flex items-center justify-center mb-8">
        <div className="bg-zinc-900 border border-zinc-800 rounded-full p-1 flex">
          <button
            onClick={() => setView("onetime")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              view === "onetime"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            One-Time Build
          </button>
          <button
            onClick={() => setView("monthly")}
            className={`px-5 py-2 rounded-full text-sm font-medium transition-all ${
              view === "monthly"
                ? "bg-blue-600 text-white shadow-lg shadow-blue-600/25"
                : "text-zinc-400 hover:text-zinc-200"
            }`}
          >
            Monthly Plans
          </button>
        </div>
      </div>

      {view === "onetime" ? (
        <>
          {/* One-Time Plan Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {plans.map((plan) => {
              const isSelected = selectedPlan === plan.id;

              return (
                <motion.div
                  key={plan.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Card
                    onClick={() => updateData({ plan: plan.id })}
                    className={`relative cursor-pointer transition-all duration-200 bg-zinc-900 border ${
                      isSelected
                        ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : plan.popular
                          ? "border-zinc-700"
                          : "border-zinc-800"
                    } hover:border-blue-500/50`}
                  >
                    {/* Most Popular Badge */}
                    {plan.popular && (
                      <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                        <Badge className="bg-blue-600 text-white border-0 px-3 py-1 text-xs">
                          <Star className="w-3 h-3 mr-1 fill-current" />
                          Most Popular
                        </Badge>
                      </div>
                    )}

                    <CardHeader className="pb-0">
                      <CardTitle className="text-lg text-white">
                        {plan.name}
                      </CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-white">
                          ${plan.price}
                        </span>
                        <span className="text-zinc-500 text-sm ml-1">
                          one-time
                        </span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4">
                      {/* Meta info */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
                          {plan.pages} {plan.pages === 1 ? "page" : "pages"}
                        </span>
                        <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
                          {plan.delivery} delivery
                        </span>
                        <span className="text-xs bg-zinc-800 text-zinc-300 px-2 py-1 rounded-md">
                          {plan.revisions} revisions
                        </span>
                      </div>

                      {/* Features */}
                      <ul className="space-y-2">
                        {plan.features.map((feature) => (
                          <li
                            key={feature}
                            className="flex items-center gap-2 text-sm text-zinc-300"
                          >
                            <Check className="w-4 h-4 text-blue-500 shrink-0" />
                            {feature}
                          </li>
                        ))}
                      </ul>

                      {/* Selection indicator */}
                      <div className="mt-5 pt-4 border-t border-zinc-800">
                        <div
                          className={`w-full py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select Plan"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Free subscription callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-zinc-300">
                All paid packages include{" "}
                <span className="text-blue-400 font-semibold">
                  3 months free
                </span>{" "}
                Growth subscription ($59/mo value)
              </span>
            </div>
          </motion.div>
        </>
      ) : (
        <>
          {/* Monthly Subscription Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {subscriptions.map((sub) => {
              const isSelected = selectedSubscription === sub.id;

              return (
                <motion.div
                  key={sub.id}
                  whileHover={{ y: -4 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 25 }}
                >
                  <Card
                    onClick={() => updateData({ subscriptionPlan: sub.id })}
                    className={`cursor-pointer transition-all duration-200 bg-zinc-900 border ${
                      isSelected
                        ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                        : "border-zinc-800"
                    } hover:border-blue-500/50`}
                  >
                    <CardHeader className="pb-0">
                      <CardTitle className="text-lg text-white">
                        {sub.name}
                      </CardTitle>
                      <div className="mt-2">
                        <span className="text-3xl font-bold text-white">
                          ${sub.price}
                        </span>
                        <span className="text-zinc-500 text-sm ml-1">/mo</span>
                      </div>
                    </CardHeader>

                    <CardContent className="pt-4">
                      <p className="text-sm text-zinc-400 mb-4">
                        {sub.changes} content changes per month
                      </p>

                      <ul className="space-y-2">
                        <li className="flex items-center gap-2 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-blue-500 shrink-0" />
                          {sub.changes} changes/month
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-blue-500 shrink-0" />
                          Hosting included
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-blue-500 shrink-0" />
                          SSL certificate
                        </li>
                        <li className="flex items-center gap-2 text-sm text-zinc-300">
                          <Check className="w-4 h-4 text-blue-500 shrink-0" />
                          Uptime monitoring
                        </li>
                      </ul>

                      {/* Selection indicator */}
                      <div className="mt-5 pt-4 border-t border-zinc-800">
                        <div
                          className={`w-full py-2 rounded-lg text-sm font-medium text-center transition-colors ${
                            isSelected
                              ? "bg-blue-600 text-white"
                              : "bg-zinc-800 text-zinc-400"
                          }`}
                        >
                          {isSelected ? "Selected" : "Select Plan"}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          {/* Free subscription callout */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="mt-6 p-4 rounded-xl bg-zinc-900/50 border border-zinc-800 text-center"
          >
            <div className="flex items-center justify-center gap-2 text-sm">
              <Zap className="w-4 h-4 text-yellow-500" />
              <span className="text-zinc-300">
                All paid packages include{" "}
                <span className="text-blue-400 font-semibold">
                  3 months free
                </span>{" "}
                Growth subscription ($59/mo value)
              </span>
            </div>
          </motion.div>
        </>
      )}
    </div>
  );
}
