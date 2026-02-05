"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { Globe, Clock, ThumbsUp, Headphones } from "lucide-react";

const stats = [
  { icon: Globe, value: 90, suffix: "+", label: "Sites Launched" },
  { icon: Clock, value: 48, suffix: "hr", label: "Average Delivery" },
  { icon: ThumbsUp, value: 100, suffix: "%", label: "Satisfaction" },
  { icon: Headphones, value: 24, suffix: "/7", label: "Support" },
];

function AnimatedCounter({
  target,
  suffix,
  inView,
}: {
  target: number;
  suffix: string;
  inView: boolean;
}) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;

    let start = 0;
    const duration = 2000;
    const increment = target / (duration / 16);

    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(timer);
  }, [inView, target]);

  return (
    <span className="text-3xl sm:text-4xl font-bold text-white tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function Stats() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="relative z-10 border-y border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="text-center"
            >
              <stat.icon
                size={24}
                className="mx-auto mb-3 text-[#3B82F6]"
              />
              <AnimatedCounter
                target={stat.value}
                suffix={stat.suffix}
                inView={isInView}
              />
              <p className="text-sm text-[#6B7280] mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
