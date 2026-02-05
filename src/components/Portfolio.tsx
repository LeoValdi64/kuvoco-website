"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const projects = [
  {
    name: "FastPaving Service",
    category: "Construction",
    url: "https://fastpavingservice.com",
    gradient: "from-orange-600/20 to-amber-600/20",
    accent: "bg-orange-500",
  },
  {
    name: "Elite Dental Clinic",
    category: "Healthcare",
    url: "https://dental-clinic-landing.vercel.app",
    gradient: "from-sky-600/20 to-cyan-600/20",
    accent: "bg-sky-500",
  },
  {
    name: "Premier Auto Detail",
    category: "Automotive",
    url: "https://auto-detail-landing.vercel.app",
    gradient: "from-red-600/20 to-rose-600/20",
    accent: "bg-red-500",
  },
  {
    name: "Bella Rosa Restaurant",
    category: "Restaurant",
    url: "https://restaurant-landing.vercel.app",
    gradient: "from-pink-600/20 to-fuchsia-600/20",
    accent: "bg-pink-500",
  },
  {
    name: "Summit Architecture",
    category: "Professional",
    url: "https://architecture-landing.vercel.app",
    gradient: "from-emerald-600/20 to-teal-600/20",
    accent: "bg-emerald-500",
  },
  {
    name: "Fresh Bake Co.",
    category: "Food & Beverage",
    url: "https://bakery-landing-v2.vercel.app",
    gradient: "from-yellow-600/20 to-orange-600/20",
    accent: "bg-yellow-500",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="portfolio" className="relative py-24 sm:py-32 bg-[#111827]/30">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Our Work
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            A selection of websites we&apos;ve crafted for businesses like yours
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <motion.div
              key={project.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: index * 0.05 }}
            >
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <Card className="group relative p-0 rounded-xl overflow-hidden border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]">
                  {/* Gradient placeholder */}
                  <div
                    className={`h-48 bg-gradient-to-br ${project.gradient} relative`}
                  >
                    <div className="absolute inset-0 bg-[#0A0A0F]/40" />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <span className="text-2xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                        {project.name.charAt(0)}
                      </span>
                    </div>
                    {/* Hover overlay */}
                    <div className="absolute inset-0 bg-[#3B82F6]/0 group-hover:bg-[#3B82F6]/10 transition-colors duration-300 flex items-center justify-center">
                      <ExternalLink
                        size={24}
                        className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      />
                    </div>
                  </div>

                  {/* Info */}
                  <div className="p-5 bg-[#1A1A2E]/50">
                    <div className="flex items-center justify-between">
                      <div>
                        <h3 className="font-semibold text-white mb-2">
                          {project.name}
                        </h3>
                        <Badge
                          variant="outline"
                          className="border-white/10 bg-white/5 text-[#9CA3AF] hover:bg-white/10"
                        >
                          <span
                            className={`w-1.5 h-1.5 rounded-full ${project.accent}`}
                          />
                          {project.category}
                        </Badge>
                      </div>
                      <span className="text-xs text-[#6B7280] group-hover:text-[#3B82F6] transition-colors flex items-center gap-1">
                        Visit Site
                        <ExternalLink size={12} />
                      </span>
                    </div>
                  </div>
                </Card>
              </a>
            </motion.div>
          ))}
        </div>

        {/* View All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="text-center mt-12"
        >
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#06B6D4] transition-colors"
          >
            View All Projects
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
