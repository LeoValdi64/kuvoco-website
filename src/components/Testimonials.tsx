"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Star } from "lucide-react";

const testimonials = [
  {
    name: "Sarah M.",
    company: "FastPaving Service",
    quote:
      "Kuvo Co. transformed our online presence completely. We went from zero web presence to getting daily leads within a week of launching. The site looks incredible and our customers love it.",
    rating: 5,
  },
  {
    name: "James K.",
    company: "Elite Dental Clinic",
    quote:
      "Professional, fast, and exactly what we needed. The team understood our healthcare brand perfectly and delivered a site that instills trust with patients before they even walk through the door.",
    rating: 5,
  },
  {
    name: "Maria L.",
    company: "Bella Rosa Restaurant",
    quote:
      "Our new website has been a game-changer for reservations. The design perfectly captures the feel of our restaurant, and the online ordering integration has boosted our takeout sales significantly.",
    rating: 5,
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            What Our Clients Say
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            Real feedback from businesses we&apos;ve helped launch online
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.15 }}
              className="relative p-6 rounded-xl bg-[#1A1A2E]/50 border border-white/5 hover:border-white/10 transition-all duration-300"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {Array.from({ length: testimonial.rating }).map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    className="text-[#3B82F6] fill-[#3B82F6]"
                  />
                ))}
              </div>

              {/* Quote */}
              <p className="text-sm text-[#9CA3AF] leading-relaxed mb-6">
                &ldquo;{testimonial.quote}&rdquo;
              </p>

              {/* Author */}
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-[#3B82F6]/10 flex items-center justify-center">
                  <span className="text-sm font-semibold text-[#3B82F6]">
                    {testimonial.name.charAt(0)}
                  </span>
                </div>
                <div>
                  <p className="text-sm font-medium text-white">
                    {testimonial.name}
                  </p>
                  <p className="text-xs text-[#6B7280]">
                    {testimonial.company}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
