"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowRight,
  Search,
  Paintbrush,
  X,
  ChevronLeft,
  ChevronRight,
  ExternalLink,
  Sparkles,
  Globe,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const CATEGORIES = [
  "All",
  "Restaurants",
  "Health",
  "Home Services",
  "Automotive",
  "Beauty",
  "Professional",
  "Events",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Template {
  subdomain: string;
  name: string;
  category: Category;
}

const TEMPLATES: Template[] = [
  { subdomain: "pizzeria", name: "Pizzeria", category: "Restaurants" },
  { subdomain: "steakhouse", name: "Steakhouse", category: "Restaurants" },
  { subdomain: "sushi", name: "Sushi Restaurant", category: "Restaurants" },
  { subdomain: "coffee", name: "Coffee Shop", category: "Restaurants" },
  { subdomain: "cafe", name: "Cafe", category: "Restaurants" },
  { subdomain: "agave", name: "Agave Cocina", category: "Restaurants" },
  { subdomain: "catering", name: "Catering Service", category: "Restaurants" },
  { subdomain: "florist", name: "Florist", category: "Beauty" },
  { subdomain: "yoga", name: "Yoga Studio", category: "Beauty" },
  { subdomain: "tattoo", name: "Tattoo Shop", category: "Beauty" },
  { subdomain: "nailsalon", name: "Nail Salon", category: "Beauty" },
  { subdomain: "petgrooming", name: "Pet Grooming", category: "Beauty" },
  { subdomain: "gym", name: "Fitness Center", category: "Health" },
  { subdomain: "veterinary", name: "Veterinary Clinic", category: "Health" },
  { subdomain: "dental", name: "Dental Clinic", category: "Health" },
  { subdomain: "optometrist", name: "Optometrist", category: "Health" },
  { subdomain: "roofing", name: "Roofing", category: "Home Services" },
  { subdomain: "hvac", name: "HVAC", category: "Home Services" },
  { subdomain: "plumber", name: "Plumber", category: "Home Services" },
  { subdomain: "electrician", name: "Electrician", category: "Home Services" },
  { subdomain: "construction", name: "Construction", category: "Home Services" },
  { subdomain: "painting", name: "Painting", category: "Home Services" },
  { subdomain: "landscaping", name: "Landscaping", category: "Home Services" },
  { subdomain: "pool", name: "Pool Builder", category: "Home Services" },
  { subdomain: "interiordesign", name: "Interior Design", category: "Home Services" },
  { subdomain: "cleaning", name: "Cleaning", category: "Home Services" },
  { subdomain: "locksmith", name: "Locksmith", category: "Home Services" },
  { subdomain: "carwash", name: "Car Wash", category: "Automotive" },
  { subdomain: "autodetailing", name: "Auto Detailing", category: "Automotive" },
  { subdomain: "mechanic", name: "Mechanic", category: "Automotive" },
  { subdomain: "towing", name: "Towing", category: "Automotive" },
  { subdomain: "lawfirm", name: "Law Firm", category: "Professional" },
  { subdomain: "insurance", name: "Insurance", category: "Professional" },
  { subdomain: "realtor", name: "Realtor", category: "Professional" },
  { subdomain: "photographer", name: "Photographer", category: "Professional" },
  { subdomain: "wedding", name: "Wedding Planner", category: "Events" },
  { subdomain: "eventvenue", name: "Event Venue", category: "Events" },
  { subdomain: "dj", name: "DJ Services", category: "Events" },
  { subdomain: "daycare", name: "Daycare", category: "Events" },
  { subdomain: "tutoring", name: "Tutoring", category: "Events" },
];

const categoryColors: Record<Category, string> = {
  All: "bg-white/10 text-white",
  Restaurants: "bg-orange-500/20 text-orange-400",
  Health: "bg-green-500/20 text-green-400",
  "Home Services": "bg-yellow-500/20 text-yellow-400",
  Automotive: "bg-red-500/20 text-red-400",
  Professional: "bg-blue-500/20 text-blue-400",
  Beauty: "bg-pink-500/20 text-pink-400",
  Events: "bg-purple-500/20 text-purple-400",
};

export default function TemplatesContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);
  const [direction, setDirection] = useState(0);

  const filtered =
    activeCategory === "All"
      ? TEMPLATES
      : TEMPLATES.filter((t) => t.category === activeCategory);

  const selectedTemplate =
    selectedIndex !== null ? filtered[selectedIndex] : null;

  const goTo = useCallback(
    (dir: -1 | 1) => {
      if (selectedIndex === null) return;
      const next = selectedIndex + dir;
      if (next < 0 || next >= filtered.length) return;
      setDirection(dir);
      setSelectedIndex(next);
    },
    [selectedIndex, filtered.length]
  );

  const close = useCallback(() => {
    setSelectedIndex(null);
  }, []);

  useEffect(() => {
    if (selectedIndex === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "Escape") close();
      if (e.key === "ArrowLeft") goTo(-1);
      if (e.key === "ArrowRight") goTo(1);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, [selectedIndex, goTo, close]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (selectedIndex !== null) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
    return () => {
      document.body.style.overflow = "";
    };
  }, [selectedIndex]);

  const slideVariants = {
    enter: (d: number) => ({
      x: d > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (d: number) => ({
      x: d > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <main className="bg-[#0A0A0F] min-h-screen">
      {/* Hero Section */}
      <section className="relative pt-32 pb-12 px-4 sm:px-6 lg:px-8">
        <div className="absolute inset-0 -top-20 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-[#06B6D4]/5 to-transparent" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[120px]" />
        </div>

        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <div className="absolute top-24 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full" />
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold tracking-tight leading-[1.1] mb-6 mt-4">
              Find Your Perfect{" "}
              <span className="gradient-text">Website Design</span>
            </h1>
            <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto mb-8">
              Browse 40+ professional templates. Pick one you love, we
              customize it for your brand.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: 0.1 }}
          >
            <div className="relative overflow-hidden bg-gradient-to-r from-[#3B82F6]/10 to-[#06B6D4]/10 border border-[#3B82F6]/20 rounded-2xl p-6 max-w-3xl mx-auto">
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-[#3B82F6]/20 flex items-center justify-center flex-shrink-0">
                  <Paintbrush className="w-5 h-5 text-[#3B82F6]" />
                </div>
                <p className="text-[#9CA3AF] text-sm sm:text-base text-left leading-relaxed">
                  Not sure where to start? Pick any design below -- we will adapt it to
                  YOUR brand, YOUR colors, YOUR content. You just tell us what you need.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Sticky Filter Pills */}
      <div className="sticky top-16 lg:top-20 z-40 bg-[#0A0A0F]/90 backdrop-blur-xl border-b border-white/5">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide justify-start sm:justify-center">
            {CATEGORIES.map((cat) => {
              const count =
                cat === "All"
                  ? TEMPLATES.length
                  : TEMPLATES.filter((t) => t.category === cat).length;
              return (
                <motion.button
                  key={cat}
                  onClick={() => setActiveCategory(cat)}
                  whileTap={{ scale: 0.95 }}
                  className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat
                      ? "bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                      : "bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white"
                  }`}
                >
                  {cat}{" "}
                  <span className="opacity-60">({count})</span>
                </motion.button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Template Grid */}
      <section className="py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <motion.div
            layout
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
          >
            <AnimatePresence mode="popLayout">
              {filtered.map((template, idx) => (
                <motion.div
                  key={template.subdomain}
                  layout
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.3 }}
                  onClick={() => {
                    setDirection(0);
                    setSelectedIndex(idx);
                  }}
                  className="group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden cursor-pointer hover:border-[#3B82F6]/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300"
                >
                  {/* Screenshot */}
                  <div className="relative aspect-video overflow-hidden">
                    <Image
                      src={`/portfolio/${template.subdomain}.jpg`}
                      alt={`${template.name} website template`}
                      fill
                      className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                    />
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                      <span className="text-white font-medium text-sm opacity-0 group-hover:opacity-100 transition-opacity duration-300 tracking-wide">
                        View Template
                      </span>
                    </div>
                  </div>

                  {/* Info — minimal */}
                  <div className="p-4 flex items-center justify-between">
                    <h3 className="text-white font-semibold text-sm">
                      {template.name}
                    </h3>
                    <Badge
                      className={`text-[10px] ${categoryColors[template.category]}`}
                    >
                      {template.category}
                    </Badge>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </motion.div>
        </div>
      </section>

      {/* Modal Viewer */}
      <AnimatePresence>
        {selectedTemplate && selectedIndex !== null && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              key="modal-backdrop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[200] bg-black/80 backdrop-blur-sm"
              onClick={close}
            />

            {/* Modal container */}
            <motion.div
              key="modal-container"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
              className="fixed inset-0 z-[201] flex items-center justify-center p-3 sm:p-6 pointer-events-none"
            >
              <div
                className="relative w-full max-w-6xl max-h-[90vh] bg-zinc-900 rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Top Bar — inside modal */}
                <div className="sticky top-0 z-10 flex-shrink-0 h-14 bg-zinc-900/95 backdrop-blur border-b border-zinc-800 px-4 sm:px-5 flex items-center justify-between gap-3">
                  {/* Left: Close X */}
                  <button
                    onClick={close}
                    className="w-10 h-10 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors flex-shrink-0"
                    aria-label="Close modal"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>

                  {/* Center: Name + Badge */}
                  <div className="flex items-center gap-2.5 min-w-0 justify-center flex-1">
                    <h2 className="text-white font-bold text-sm sm:text-base truncate">
                      {selectedTemplate.name}
                    </h2>
                    <Badge
                      className={`text-[10px] flex-shrink-0 hidden sm:inline-flex ${categoryColors[selectedTemplate.category]}`}
                    >
                      {selectedTemplate.category}
                    </Badge>
                  </div>

                  {/* Right: Actions */}
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <Link
                      href={`/contact?template=${encodeURIComponent(selectedTemplate.name)}`}
                    >
                      <Button
                        size="sm"
                        className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white text-xs font-semibold rounded-full px-4"
                      >
                        <Sparkles className="w-3.5 h-3.5 mr-1.5" />
                        <span className="hidden sm:inline">I Want This</span>
                        <span className="sm:hidden">Get</span>
                      </Button>
                    </Link>
                    <a
                      href={`https://${selectedTemplate.subdomain}.kuvoco.com`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="hidden sm:flex w-9 h-9 rounded-full bg-white/5 hover:bg-white/10 items-center justify-center transition-colors"
                      title="Open in new tab"
                    >
                      <ExternalLink className="w-4 h-4 text-zinc-400" />
                    </a>
                  </div>
                </div>

                {/* Content area — scrollable */}
                <div className="flex-1 overflow-y-auto">
                  <AnimatePresence mode="wait" custom={direction}>
                    <motion.div
                      key={selectedTemplate.subdomain}
                      custom={direction}
                      variants={slideVariants}
                      initial="enter"
                      animate="center"
                      exit="exit"
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                    >
                      {/* Cover screenshot */}
                      <div className="p-4 sm:p-6">
                        <div className="relative aspect-video rounded-xl overflow-hidden border border-zinc-800">
                          <Image
                            src={`/portfolio/${selectedTemplate.subdomain}.jpg`}
                            alt={`${selectedTemplate.name} website template`}
                            fill
                            className="object-cover object-top"
                            sizes="(max-width: 1200px) 95vw, 1100px"
                            priority
                          />
                        </div>
                      </div>

                      {/* Live Preview label */}
                      <div className="hidden md:flex items-center gap-2 px-6 pb-3">
                        <Globe className="w-4 h-4 text-zinc-500" />
                        <span className="text-xs text-zinc-500 font-medium uppercase tracking-wider">
                          Live Preview
                        </span>
                      </div>

                      {/* Iframe — tablet and up */}
                      <div className="hidden md:block px-4 sm:px-6 pb-6">
                        <div className="rounded-xl overflow-hidden border border-zinc-800">
                          <iframe
                            src={`https://${selectedTemplate.subdomain}.kuvoco.com`}
                            title={`${selectedTemplate.name} live preview`}
                            className="w-full bg-white"
                            style={{ height: "70vh" }}
                            loading="lazy"
                          />
                        </div>
                      </div>

                      {/* Mobile: Open Live Site button */}
                      <div className="md:hidden flex flex-col items-center px-6 pb-6 gap-3">
                        <a
                          href={`https://${selectedTemplate.subdomain}.kuvoco.com`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button
                            variant="outline"
                            size="lg"
                            className="border-white/10 bg-white/5 text-white hover:bg-white/10 rounded-full"
                          >
                            <ExternalLink className="w-4 h-4 mr-2" />
                            Open Live Site
                          </Button>
                        </a>
                      </div>
                    </motion.div>
                  </AnimatePresence>
                </div>

                {/* Mobile Bottom Nav */}
                <div className="md:hidden flex-shrink-0 bg-zinc-900/95 backdrop-blur border-t border-zinc-800 px-4 py-3 flex items-center justify-between gap-3">
                  <button
                    onClick={() => goTo(-1)}
                    disabled={selectedIndex === 0}
                    className="flex items-center gap-1.5 text-sm text-white disabled:opacity-30 transition-opacity"
                  >
                    <ChevronLeft className="w-4 h-4" />
                    Prev
                  </button>
                  <span className="text-xs text-zinc-500">
                    {selectedIndex + 1} / {filtered.length}
                  </span>
                  <button
                    onClick={() => goTo(1)}
                    disabled={selectedIndex === filtered.length - 1}
                    className="flex items-center gap-1.5 text-sm text-white disabled:opacity-30 transition-opacity"
                  >
                    Next
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Navigation Arrows — positioned on modal edges, desktop only */}
              {selectedIndex > 0 && (
                <button
                  onClick={() => goTo(-1)}
                  className="hidden md:flex pointer-events-auto absolute left-1 lg:left-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/70 hover:bg-zinc-900 items-center justify-center transition-all shadow-lg"
                >
                  <ChevronLeft className="w-5 h-5 text-white" />
                </button>
              )}
              {selectedIndex < filtered.length - 1 && (
                <button
                  onClick={() => goTo(1)}
                  className="hidden md:flex pointer-events-auto absolute right-1 lg:right-4 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-zinc-900/70 hover:bg-zinc-900 items-center justify-center transition-all shadow-lg"
                >
                  <ChevronRight className="w-5 h-5 text-white" />
                </button>
              )}
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Bottom CTA */}
      <section className="py-16 px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/80 to-[#1A1A2E]/40 border border-white/10 rounded-3xl p-10 sm:p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <div className="w-14 h-14 rounded-2xl bg-[#3B82F6]/10 flex items-center justify-center mx-auto mb-6">
                <Search className="w-7 h-7 text-[#3B82F6]" />
              </div>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-3">
                Don&apos;t see what you need?
              </h2>
              <p className="text-[#9CA3AF] mb-8 max-w-lg mx-auto">
                We can build a completely custom website for your business.
                Tell us your vision and we will bring it to life.
              </p>
              <Link href="/contact">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg"
                >
                  Contact Us
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </main>
  );
}
