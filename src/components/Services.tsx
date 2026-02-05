"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Palette, Code, Shield, TrendingUp } from "lucide-react";

const services = [
  {
    icon: Palette,
    title: "Web Design",
    description: "Custom designs that convert visitors into customers",
  },
  {
    icon: Code,
    title: "Web Development",
    description: "Fast, responsive, SEO-optimized websites",
  },
  {
    icon: Shield,
    title: "Maintenance Plans",
    description: "Monthly support, updates, and monitoring",
  },
  {
    icon: TrendingUp,
    title: "SEO & Performance",
    description: "Search engine visibility and speed optimization",
  },
];

export default function Services() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="services" className="relative py-24 sm:py-32">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What We Do
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            End-to-end web solutions tailored for your business needs
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="group relative p-6 rounded-xl bg-[#1A1A2E]/50 border border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 hover:-translate-y-1 hover:shadow-[0_0_30px_rgba(59,130,246,0.1)]"
            >
              <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center mb-5 group-hover:bg-[#3B82F6]/20 transition-colors">
                <service.icon size={24} className="text-[#3B82F6]" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{service.title}</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed">
                {service.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
