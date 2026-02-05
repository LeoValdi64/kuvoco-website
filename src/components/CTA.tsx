"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function CTA() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0">
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full opacity-15"
          style={{
            background:
              "radial-gradient(circle, rgba(59,130,246,0.4) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full opacity-10"
          style={{
            background:
              "radial-gradient(ellipse, rgba(6,182,212,0.3) 0%, transparent 70%)",
          }}
        />
      </div>

      <div
        ref={ref}
        className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center"
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight mb-6">
            Ready to Launch Your
            <br />
            <span className="gradient-text">Business Online?</span>
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto mb-10">
            Get a professional website that drives results. No complicated
            process, no hidden fees --- just a great site delivered fast.
          </p>
          <a
            href="mailto:hello@kuvoco.com"
            className="group inline-flex items-center gap-2 px-8 py-4 text-base font-medium text-white bg-[#3B82F6] rounded-lg hover:bg-[#2563EB] transition-all duration-300 hover:shadow-[0_0_40px_rgba(59,130,246,0.4)]"
          >
            Get Started Today
            <ArrowRight
              size={18}
              className="transition-transform group-hover:translate-x-1"
            />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
