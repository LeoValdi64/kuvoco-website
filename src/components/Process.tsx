"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { MessageSquare, Code2, Rocket, HeartHandshake } from "lucide-react";

const steps = [
  {
    number: "01",
    icon: MessageSquare,
    title: "Tell Us About Your Business",
    description: "Share your vision and requirements in a quick consultation",
  },
  {
    number: "02",
    icon: Code2,
    title: "We Design & Build",
    description: "Our team crafts your custom website with precision",
  },
  {
    number: "03",
    icon: Rocket,
    title: "Review & Launch",
    description: "You review, we refine, then launch to the world",
  },
  {
    number: "04",
    icon: HeartHandshake,
    title: "Ongoing Support",
    description: "Continuous maintenance and improvements",
  },
];

export default function Process() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section className="relative py-24 sm:py-32">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.3 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            How It Works
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            From idea to launch in four simple steps
          </p>
        </motion.div>

        {/* Steps */}
        <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-6">
          {/* Connector line (desktop) */}
          <div className="hidden lg:block absolute top-16 left-[12.5%] right-[12.5%] h-px bg-gradient-to-r from-transparent via-[#3B82F6]/20 to-transparent" />

          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.25, delay: index * 0.07 }}
              className="relative text-center"
            >
              {/* Step number */}
              <div className="text-xs font-mono text-[#3B82F6] mb-4 tracking-widest">
                {step.number}
              </div>

              {/* Icon circle */}
              <div className="relative inline-flex items-center justify-center w-16 h-16 rounded-full bg-[#1A1A2E] border border-white/5 mb-6">
                <step.icon size={24} className="text-[#3B82F6]" />
                {/* Dot on connector */}
                <div className="hidden lg:block absolute -bottom-[3px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 rounded-full bg-[#3B82F6]" />
              </div>

              <h3 className="text-lg font-semibold mb-2">{step.title}</h3>
              <p className="text-sm text-[#9CA3AF] leading-relaxed max-w-xs mx-auto">
                {step.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
