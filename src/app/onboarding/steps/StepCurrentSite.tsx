"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, Monitor, Mic, Sparkles } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding/context";

export function StepCurrentSite() {
  const { data, updateData } = useOnboarding();
  const [selected, setSelected] = useState<boolean | null>(data.hasExistingSite);

  function handleSelect(value: boolean) {
    setSelected(value);
    updateData({ hasExistingSite: value });
    if (!value) {
      updateData({
        existingSiteUrl: "",
        likesAboutCurrent: "",
        dislikesAboutCurrent: "",
      });
    }
  }

  const options = [
    {
      value: true,
      icon: Globe,
      label: "Yes",
      description: "I have a website I'd like to improve or replace",
    },
    {
      value: false,
      icon: Sparkles,
      label: "No",
      description: "I'm starting fresh and need a new website",
    },
  ] as const;

  return (
    <div className="space-y-8">
      <div className="text-center">
        <div className="flex justify-center mb-4">
          <Monitor className="w-10 h-10 text-blue-500" />
        </div>
        <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2">
          Existing Website
        </h2>
        <p className="text-zinc-400 text-sm sm:text-base">
          Do you have an existing website?
        </p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg mx-auto">
        {options.map((option) => {
          const isSelected = selected === option.value;
          const Icon = option.icon;

          return (
            <motion.div
              key={option.label}
              whileHover={{ y: -4 }}
              whileTap={{ scale: 0.98 }}
              transition={{ type: "spring", stiffness: 400, damping: 25 }}
            >
              <Card
                onClick={() => handleSelect(option.value)}
                className={`cursor-pointer transition-all duration-200 bg-zinc-900/50 border ${
                  isSelected
                    ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "border-zinc-800 hover:border-zinc-700"
                }`}
              >
                <CardContent className="flex flex-col items-center text-center p-6 gap-3">
                  <div
                    className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                      isSelected
                        ? "bg-blue-600/20 text-blue-500"
                        : "bg-zinc-800 text-zinc-400"
                    }`}
                  >
                    <Icon className="w-6 h-6" />
                  </div>
                  <span className="text-lg font-semibold text-white">
                    {option.label}
                  </span>
                  <span className="text-xs text-zinc-400">
                    {option.description}
                  </span>
                </CardContent>
              </Card>
            </motion.div>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {selected === true && (
          <motion.div
            key="yes-form"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden"
          >
            <div className="space-y-5 max-w-lg mx-auto pt-2">
              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">
                  Current Website URL
                </Label>
                <Input
                  placeholder="https://example.com"
                  value={data.existingSiteUrl}
                  onChange={(e) =>
                    updateData({ existingSiteUrl: e.target.value })
                  }
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">
                  What do you like about your current site?
                </Label>
                <Textarea
                  placeholder="e.g. The layout is clean, I like the color scheme..."
                  value={data.likesAboutCurrent}
                  onChange={(e) =>
                    updateData({ likesAboutCurrent: e.target.value })
                  }
                  rows={3}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 resize-none"
                />
              </div>

              <div className="space-y-2">
                <Label className="text-zinc-300 text-sm">
                  What would you like to change?
                </Label>
                <div className="relative">
                  <Textarea
                    placeholder="e.g. It feels outdated, needs better mobile support..."
                    value={data.dislikesAboutCurrent}
                    onChange={(e) =>
                      updateData({ dislikesAboutCurrent: e.target.value })
                    }
                    rows={3}
                    className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 resize-none pr-12"
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    disabled
                    className="absolute right-2 top-2 text-zinc-500"
                    title="Voice input coming soon"
                  >
                    <Mic className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-xs text-zinc-500">
                  Voice input coming soon
                </p>
              </div>
            </div>
          </motion.div>
        )}

        {selected === false && (
          <motion.div
            key="no-message"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.25 }}
          >
            <Card className="max-w-lg mx-auto bg-zinc-900/50 border-zinc-800">
              <CardContent className="flex flex-col items-center text-center p-8 gap-3">
                <Sparkles className="w-8 h-8 text-blue-500" />
                <p className="text-white font-medium text-lg">
                  Great! We&apos;ll build something amazing from scratch.
                </p>
                <p className="text-zinc-400 text-sm">
                  No worries — we&apos;ll guide you through every step to create
                  the perfect website for your business.
                </p>
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
