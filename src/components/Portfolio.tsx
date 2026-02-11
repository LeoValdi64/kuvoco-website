"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Eye, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const featuredTemplates = [
  {
    subdomain: "pizzeria",
    name: "Pizzeria",
    category: "Restaurants",
    categoryColor: "bg-orange-500/20 text-orange-400",
  },
  {
    subdomain: "dental",
    name: "Dental Clinic",
    category: "Health",
    categoryColor: "bg-green-500/20 text-green-400",
  },
  {
    subdomain: "roofing",
    name: "Roofing",
    category: "Home Services",
    categoryColor: "bg-yellow-500/20 text-yellow-400",
  },
  {
    subdomain: "autodetailing",
    name: "Auto Detailing",
    category: "Automotive",
    categoryColor: "bg-red-500/20 text-red-400",
  },
  {
    subdomain: "nailsalon",
    name: "Nail Salon",
    category: "Beauty",
    categoryColor: "bg-pink-500/20 text-pink-400",
  },
  {
    subdomain: "lawfirm",
    name: "Law Firm",
    category: "Professional",
    categoryColor: "bg-blue-500/20 text-blue-400",
  },
];

export default function Portfolio() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="templates" className="relative py-24 sm:py-32 bg-[#111827]/30">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Website Templates
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            Browse our collection of professionally designed templates.
            Pick one you love, and we will customize it for your brand.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredTemplates.map((template, index) => (
            <motion.div
              key={template.subdomain}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: index * 0.05 }}
              className="group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:border-[#3B82F6]/30 hover:-translate-y-1 hover:shadow-[0_8px_30px_rgba(59,130,246,0.1)] transition-all duration-300"
            >
              {/* Screenshot */}
              <div className="relative aspect-video overflow-hidden">
                <Image
                  src={`/portfolio/${template.subdomain}.jpg`}
                  alt={`${template.name} website template`}
                  fill
                  className="object-cover object-top transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              </div>

              {/* Info */}
              <div className="p-4">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-white font-semibold text-sm">
                    {template.name}
                  </h3>
                  <Badge className={`text-[10px] ${template.categoryColor}`}>
                    {template.category}
                  </Badge>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-2">
                  <a
                    href={`https://${template.subdomain}.kuvoco.com`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1"
                  >
                    <Button
                      variant="outline"
                      size="sm"
                      className="w-full border-white/10 bg-white/5 text-[#9CA3AF] hover:text-white hover:bg-white/10 hover:border-white/20 text-xs"
                    >
                      <Eye className="w-3.5 h-3.5 mr-1.5" />
                      Preview
                    </Button>
                  </a>
                  <Link
                    href={`/contact?template=${encodeURIComponent(template.name)}`}
                    className="flex-1"
                  >
                    <Button
                      size="sm"
                      className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white text-xs"
                    >
                      I Want This
                      <ArrowRight className="w-3.5 h-3.5 ml-1.5" />
                    </Button>
                  </Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Browse All */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.3, delay: 0.15 }}
          className="text-center mt-12"
        >
          <Link
            href="/templates"
            className="inline-flex items-center gap-2 text-sm text-[#3B82F6] hover:text-[#06B6D4] transition-colors"
          >
            Browse All Templates
            <ArrowRight size={16} />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
