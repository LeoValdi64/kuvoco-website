"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  "All",
  "Restaurants",
  "Health",
  "Home Services",
  "Automotive",
  "Professional",
  "Beauty",
  "Events & Other",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Project {
  subdomain: string;
  name: string;
  category: Category;
}

const PROJECTS: Project[] = [
  { subdomain: "pizzeria", name: "Pizzeria", category: "Restaurants" },
  { subdomain: "steakhouse", name: "Steakhouse", category: "Restaurants" },
  { subdomain: "sushi", name: "Sushi Restaurant", category: "Restaurants" },
  { subdomain: "coffee", name: "Coffee Shop", category: "Restaurants" },
  { subdomain: "cafe", name: "Café", category: "Restaurants" },
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
  { subdomain: "wedding", name: "Wedding Planner", category: "Events & Other" },
  { subdomain: "eventvenue", name: "Event Venue", category: "Events & Other" },
  { subdomain: "dj", name: "DJ Services", category: "Events & Other" },
  { subdomain: "daycare", name: "Daycare", category: "Events & Other" },
  { subdomain: "tutoring", name: "Tutoring", category: "Events & Other" },
];

const categoryColors: Record<Category, string> = {
  All: "bg-white/10 text-white",
  Restaurants: "bg-orange-500/20 text-orange-400",
  Health: "bg-green-500/20 text-green-400",
  "Home Services": "bg-yellow-500/20 text-yellow-400",
  Automotive: "bg-red-500/20 text-red-400",
  Professional: "bg-blue-500/20 text-blue-400",
  Beauty: "bg-pink-500/20 text-pink-400",
  "Events & Other": "bg-purple-500/20 text-purple-400",
};

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Portfolio
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            40+ websites built for local businesses across every industry.
            Each one custom-designed, mobile-responsive, and optimized for
            performance.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat}{" "}
                <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div layout className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <motion.a
                key={project.subdomain}
                href={`https://${project.subdomain}.kuvoco.com`}
                target="_blank"
                rel="noopener noreferrer"
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3 }}
                className="group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300"
              >
                {/* Screenshot */}
                <div className="relative aspect-video overflow-hidden">
                  <Image
                    src={`/portfolio/${project.subdomain}.jpg`}
                    alt={`${project.name} website`}
                    fill
                    className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                  {/* Hover Overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
                    <span className="flex items-center gap-1.5 text-sm text-white font-medium bg-[#3B82F6] px-4 py-2 rounded-full">
                      <ExternalLink className="w-3.5 h-3.5" />
                      Visit Site
                    </span>
                  </div>
                </div>

                {/* Info */}
                <div className="p-4 flex items-center justify-between">
                  <div>
                    <h3 className="text-white font-semibold text-sm">
                      {project.name}
                    </h3>
                    <p className="text-[#6B7280] text-xs mt-0.5">
                      {project.subdomain}.kuvoco.com
                    </p>
                  </div>
                  <Badge
                    className={`text-[10px] ${categoryColors[project.category]}`}
                  >
                    {project.category}
                  </Badge>
                </div>
              </motion.a>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[#9CA3AF] mb-4">
            Want a website like these for your business?
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Get Started
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
