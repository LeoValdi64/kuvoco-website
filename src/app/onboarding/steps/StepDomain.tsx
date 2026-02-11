"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Globe, ShoppingCart, Gift } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { useOnboarding } from "@/lib/onboarding/context";

const domainOptions = [
  {
    id: "own" as const,
    icon: Globe,
    title: "I already have a domain",
    description: "Connect a domain you already own to your new site",
  },
  {
    id: "buy" as const,
    icon: ShoppingCart,
    title: "I want to buy a domain",
    description: "We'll help you register a brand new domain name",
  },
  {
    id: "subdomain" as const,
    icon: Gift,
    title: "Use free subdomain",
    description: "Get started instantly with a free kuvoco.com subdomain",
  },
] as const;

function slugify(name: string) {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function StepDomain() {
  const { data, updateData } = useOnboarding();
  const selected = data.domainOption;
  const slug = slugify(data.businessName || "yoursite");

  return (
    <div className="w-full max-w-3xl mx-auto px-4 py-8">
      {/* Header */}
      <div className="text-center mb-8">
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Choose Your Domain
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          How do you want people to find your website?
        </p>
      </div>

      {/* Option Cards */}
      <div className="grid grid-cols-1 gap-4">
        {domainOptions.map((option) => {
          const isSelected = selected === option.id;
          const Icon = option.icon;

          return (
            <motion.div
              key={option.id}
              whileHover={{ y: -2 }}
              whileTap={{ scale: 0.99 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Card
                onClick={() =>
                  updateData({
                    domainOption: option.id,
                    ...(option.id !== "own" && { existingDomain: "" }),
                    ...(option.id !== "buy" && { desiredDomain: "" }),
                  })
                }
                className={`cursor-pointer transition-all duration-200 bg-zinc-900 border ${
                  isSelected
                    ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "border-zinc-800 hover:border-blue-500/50"
                }`}
              >
                <CardContent className="p-5">
                  <div className="flex items-start gap-4">
                    {/* Icon */}
                    <div
                      className={`shrink-0 w-10 h-10 rounded-lg flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-blue-600/20 text-blue-400"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-5 h-5" />
                    </div>

                    {/* Text */}
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="text-base font-semibold text-white">
                          {option.title}
                        </h3>
                        {option.id === "subdomain" && (
                          <Badge className="bg-emerald-600/20 text-emerald-400 border-0 text-xs">
                            Free
                          </Badge>
                        )}
                      </div>
                      <p className="text-sm text-zinc-400 mt-0.5">
                        {option.description}
                      </p>
                    </div>

                    {/* Selection indicator */}
                    <div
                      className={`shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-colors ${
                        isSelected
                          ? "border-blue-500 bg-blue-500"
                          : "border-zinc-600"
                      }`}
                    >
                      {isSelected && (
                        <motion.div
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="w-2 h-2 rounded-full bg-white"
                        />
                      )}
                    </div>
                  </div>

                  {/* Expanded content per option */}
                  <AnimatePresence>
                    {isSelected && option.id === "own" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-zinc-800">
                          <label className="text-sm text-zinc-300 mb-2 block">
                            Your domain URL
                          </label>
                          <Input
                            type="url"
                            placeholder="e.g. mybusiness.com"
                            value={data.existingDomain}
                            onChange={(e) =>
                              updateData({ existingDomain: e.target.value })
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                          />
                        </div>
                      </motion.div>
                    )}

                    {isSelected && option.id === "buy" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-zinc-800">
                          <label className="text-sm text-zinc-300 mb-2 block">
                            Desired domain name
                          </label>
                          <Input
                            type="text"
                            placeholder="e.g. mybusiness"
                            value={data.desiredDomain}
                            onChange={(e) =>
                              updateData({ desiredDomain: e.target.value })
                            }
                            onClick={(e) => e.stopPropagation()}
                            className="bg-zinc-800 border-zinc-700 text-white placeholder:text-zinc-500"
                          />
                          {(data.desiredDomain || data.businessName) && (
                            <div className="flex flex-wrap gap-2 mt-3">
                              {[".com", ".net", ".co"].map((tld) => (
                                <Badge
                                  key={tld}
                                  className="bg-zinc-800 text-zinc-300 border border-zinc-700 text-xs cursor-pointer hover:border-blue-500/50 transition-colors"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    updateData({
                                      desiredDomain:
                                        slugify(
                                          data.desiredDomain ||
                                            data.businessName
                                        ) + tld,
                                    });
                                  }}
                                >
                                  {slugify(
                                    data.desiredDomain || data.businessName
                                  )}
                                  {tld}
                                </Badge>
                              ))}
                            </div>
                          )}
                        </div>
                      </motion.div>
                    )}

                    {isSelected && option.id === "subdomain" && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.2 }}
                        className="overflow-hidden"
                      >
                        <div className="mt-4 pt-4 border-t border-zinc-800">
                          <p className="text-sm text-zinc-400 mb-2">
                            Your free subdomain
                          </p>
                          <div className="flex items-center gap-0 rounded-lg overflow-hidden border border-zinc-700">
                            <div className="bg-zinc-800 px-4 py-2.5 text-sm text-white font-medium">
                              {slug}
                            </div>
                            <div className="bg-zinc-800/50 px-3 py-2.5 text-sm text-zinc-400 border-l border-zinc-700">
                              .kuvoco.com
                            </div>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}
