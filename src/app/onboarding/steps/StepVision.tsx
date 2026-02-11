"use client";

import {
  Sparkles,
  Palette,
  Globe,
  LayoutGrid,
  Zap,
  StickyNote,
  Plus,
  Trash2,
  Mic,
  Check,
} from "lucide-react";
import { useOnboarding } from "@/lib/onboarding/context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const STYLE_OPTIONS = [
  { value: "Modern", emoji: "🚀", description: "Clean lines, bold layouts" },
  { value: "Minimalist", emoji: "✨", description: "Less is more, whitespace-driven" },
  { value: "Corporate", emoji: "🏢", description: "Professional & trustworthy" },
  { value: "Colorful", emoji: "🎨", description: "Vibrant, energetic palette" },
  { value: "Elegant", emoji: "💎", description: "Refined, sophisticated feel" },
  { value: "Bold", emoji: "⚡", description: "High-impact, attention-grabbing" },
] as const;

const COLOR_OPTIONS = [
  { value: "Blue", color: "#3B82F6" },
  { value: "Red", color: "#EF4444" },
  { value: "Green", color: "#22C55E" },
  { value: "Purple", color: "#A855F7" },
  { value: "Orange", color: "#F97316" },
  { value: "Yellow", color: "#EAB308" },
  { value: "Pink", color: "#EC4899" },
  { value: "Teal", color: "#14B8A6" },
  { value: "Black", color: "#18181B" },
  { value: "White", color: "#F4F4F5" },
  { value: "Gold", color: "#CA8A04" },
  { value: "Navy", color: "#1E3A5F" },
] as const;

const SECTION_OPTIONS = [
  "Hero",
  "About Us",
  "Services",
  "Gallery/Portfolio",
  "Testimonials",
  "Contact",
  "FAQ",
  "Pricing",
  "Blog",
  "Map/Location",
  "Team",
  "Menu/Catalog",
] as const;

const FEATURE_OPTIONS = [
  "Online Booking",
  "Quote Calculator",
  "Chat Widget",
  "E-commerce",
  "Newsletter",
  "Social Feed",
  "Video Background",
  "Custom Animations",
] as const;

const MAX_REFERENCES = 5;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value)
    ? arr.filter((v) => v !== value)
    : [...arr, value];
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepVision() {
  const { data, updateData } = useOnboarding();

  /* ---------- Style Preference ---------- */
  function toggleStyle(value: string) {
    updateData({ stylePreference: toggleInArray(data.stylePreference, value) });
  }

  /* ---------- Colors ---------- */
  const hasNoColorPreference = data.preferredColors.includes("No preference");

  function toggleColor(value: string) {
    if (value === "No preference") {
      updateData({
        preferredColors: hasNoColorPreference ? [] : ["No preference"],
      });
    } else {
      const without = data.preferredColors.filter((c) => c !== "No preference");
      updateData({ preferredColors: toggleInArray(without, value) });
    }
  }

  /* ---------- Reference Sites ---------- */
  function addReference() {
    if (data.referenceSites.length >= MAX_REFERENCES) return;
    updateData({
      referenceSites: [...data.referenceSites, { url: "", notes: "" }],
    });
  }

  function updateReference(
    index: number,
    field: "url" | "notes",
    value: string
  ) {
    const updated = data.referenceSites.map((ref, i) =>
      i === index ? { ...ref, [field]: value } : ref
    );
    updateData({ referenceSites: updated });
  }

  function removeReference(index: number) {
    updateData({
      referenceSites: data.referenceSites.filter((_, i) => i !== index),
    });
  }

  /* ---------- Sections & Features ---------- */
  function toggleSection(value: string) {
    updateData({ desiredSections: toggleInArray(data.desiredSections, value) });
  }

  function toggleFeature(value: string) {
    updateData({ specialFeatures: toggleInArray(data.specialFeatures, value) });
  }

  /* ---------- Notes ---------- */
  const notesLength = data.visionNotes.length;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20">
          <Sparkles className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Your Vision</h2>
          <p className="text-sm text-zinc-400">
            Describe your ideal website style and features.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. Style Preference                                          */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Style Preference
          </Label>
          <span className="text-xs text-zinc-500 ml-1">
            (select all that apply)
          </span>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
          {STYLE_OPTIONS.map((style) => {
            const isSelected = data.stylePreference.includes(style.value);
            return (
              <button
                key={style.value}
                type="button"
                onClick={() => toggleStyle(style.value)}
                className={`relative flex flex-col items-center gap-2 rounded-xl border p-4 transition-all duration-200 cursor-pointer text-center ${
                  isSelected
                    ? "border-blue-500 bg-blue-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                }`}
              >
                <span className="text-2xl">{style.emoji}</span>
                <span className="text-sm font-medium text-white">
                  {style.value}
                </span>
                <span className="text-xs text-zinc-400">
                  {style.description}
                </span>
                {isSelected && (
                  <div className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center">
                    <Check className="w-3 h-3 text-white" />
                  </div>
                )}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 2. Preferred Colors                                          */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Palette className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Preferred Colors
          </Label>
        </div>

        <div className="flex flex-wrap gap-3">
          {COLOR_OPTIONS.map((c) => {
            const isSelected =
              !hasNoColorPreference && data.preferredColors.includes(c.value);
            const isLight =
              c.value === "White" || c.value === "Yellow" || c.value === "Gold";
            return (
              <button
                key={c.value}
                type="button"
                onClick={() => toggleColor(c.value)}
                className="flex flex-col items-center gap-1.5 group"
                title={c.value}
              >
                <div
                  className={`relative w-10 h-10 rounded-full border-2 transition-all duration-200 ${
                    isSelected
                      ? "border-blue-500 scale-110 shadow-[0_0_12px_rgba(59,130,246,0.3)]"
                      : "border-zinc-700 group-hover:border-zinc-500"
                  }`}
                  style={{ backgroundColor: c.color }}
                >
                  {isSelected && (
                    <div className="absolute inset-0 flex items-center justify-center">
                      <Check
                        className={`w-5 h-5 ${
                          isLight ? "text-zinc-900" : "text-white"
                        }`}
                      />
                    </div>
                  )}
                </div>
                <span className="text-[11px] text-zinc-400">{c.value}</span>
              </button>
            );
          })}
        </div>

        {/* No preference toggle */}
        <button
          type="button"
          onClick={() => toggleColor("No preference")}
          className={`flex items-center gap-2 rounded-lg border px-3 py-2 text-sm transition-all duration-200 ${
            hasNoColorPreference
              ? "border-blue-500 bg-blue-600/10 text-blue-400"
              : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700"
          }`}
        >
          {hasNoColorPreference && <Check className="w-4 h-4" />}
          No preference
        </button>
      </section>

      {/* ============================================================ */}
      {/* 3. Reference Sites                                           */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Globe className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Reference Sites
          </Label>
          <span className="text-xs text-zinc-500 ml-1">(optional)</span>
        </div>

        {data.referenceSites.length > 0 && (
          <div className="space-y-4">
            {data.referenceSites.map((ref, index) => (
              <div
                key={index}
                className="rounded-lg border border-zinc-800 bg-zinc-900/50 p-4 space-y-3"
              >
                <div className="flex items-start gap-3">
                  <div className="flex-1 space-y-3">
                    <Input
                      placeholder="https://example.com"
                      value={ref.url}
                      onChange={(e) =>
                        updateReference(index, "url", e.target.value)
                      }
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
                    />
                    <Textarea
                      placeholder="What do you like about it?"
                      value={ref.notes}
                      onChange={(e) =>
                        updateReference(index, "notes", e.target.value)
                      }
                      rows={2}
                      className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 resize-none"
                    />
                  </div>
                  <Button
                    variant="ghost"
                    size="icon-xs"
                    onClick={() => removeReference(index)}
                    className="text-zinc-500 hover:text-red-400 shrink-0 mt-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}

        {data.referenceSites.length < MAX_REFERENCES && (
          <Button
            variant="outline"
            size="sm"
            onClick={addReference}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add Reference
            {data.referenceSites.length > 0 && (
              <span className="text-zinc-500 ml-1">
                ({data.referenceSites.length}/{MAX_REFERENCES})
              </span>
            )}
          </Button>
        )}
      </section>

      {/* ============================================================ */}
      {/* 4. Desired Sections                                          */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <LayoutGrid className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Desired Sections
          </Label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {SECTION_OPTIONS.map((section) => {
            const isSelected = data.desiredSections.includes(section);
            return (
              <button
                key={section}
                type="button"
                onClick={() => toggleSection(section)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-600/10 text-white"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-blue-500 border-blue-500"
                      : "border-zinc-600"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                {section}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 5. Special Features                                          */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Zap className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Special Features
          </Label>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
          {FEATURE_OPTIONS.map((feature) => {
            const isSelected = data.specialFeatures.includes(feature);
            return (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={`flex items-center gap-2 rounded-lg border px-3 py-2.5 text-sm transition-all duration-200 cursor-pointer ${
                  isSelected
                    ? "border-blue-500 bg-blue-600/10 text-white"
                    : "border-zinc-800 bg-zinc-900/50 text-zinc-400 hover:border-zinc-700 hover:text-zinc-300"
                }`}
              >
                <div
                  className={`w-4 h-4 rounded border flex items-center justify-center shrink-0 transition-colors ${
                    isSelected
                      ? "bg-blue-500 border-blue-500"
                      : "border-zinc-600"
                  }`}
                >
                  {isSelected && <Check className="w-3 h-3 text-white" />}
                </div>
                {feature}
              </button>
            );
          })}
        </div>
      </section>

      {/* ============================================================ */}
      {/* 6. Additional Notes                                          */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <StickyNote className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Additional Notes
          </Label>
          <span className="text-xs text-zinc-500 ml-1">(optional)</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Anything else we should know about your vision?
            </span>
            <span
              className={`text-xs ${
                notesLength > 1000 ? "text-red-400" : "text-zinc-500"
              }`}
            >
              {notesLength}/1000
            </span>
          </div>
          <Textarea
            placeholder="Share any other ideas, inspirations, or specific requirements..."
            value={data.visionNotes}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                updateData({ visionNotes: e.target.value });
              }
            }}
            rows={4}
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 resize-none"
          />
        </div>

        {/* Voice Note Placeholder */}
        <div className="flex items-center gap-3 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 px-4 py-3">
          <Button
            variant="outline"
            size="icon"
            disabled
            className="border-zinc-600 text-zinc-500 cursor-not-allowed"
          >
            <Mic className="w-4 h-4" />
          </Button>
          <div>
            <p className="text-sm text-zinc-400">Voice note coming soon</p>
            <p className="text-xs text-zinc-600">
              Describe your vision with a voice recording instead of typing.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
