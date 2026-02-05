"use client";

import { useRef, useState } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    question: "How quickly can my website be ready?",
    answer:
      "Our Starter package can be delivered in as little as 48 hours. Business sites typically take 3 days, and Professional sites around 5 days. Custom projects are scoped individually based on complexity.",
  },
  {
    question: "What is included in the pricing?",
    answer:
      "All packages include responsive design, basic SEO setup, a contact form, hosting setup assistance, and one round of revisions. Higher tiers include additional pages, advanced features, and priority support.",
  },
  {
    question: "Can I update the website myself after launch?",
    answer:
      "Yes. We build on modern platforms that make content updates straightforward. We also offer monthly maintenance plans if you prefer us to handle updates for you.",
  },
  {
    question: "Do you provide hosting?",
    answer:
      "We help you set up hosting on reliable, fast providers. Hosting costs are separate and typically range from $0-20/month depending on your needs. We recommend the best option for your specific project.",
  },
  {
    question: "Can I add more pages later?",
    answer:
      "Absolutely. Our sites are built to scale. You can add pages, features, or integrations at any time. We offer competitive rates for additional development work after initial launch.",
  },
  {
    question: "Do you work with clients outside of the US?",
    answer:
      "Yes, we work with businesses globally. All communication and collaboration happens online, making location irrelevant. We adapt to your timezone for meetings and communication.",
  },
  {
    question: "What technologies do you use?",
    answer:
      "We use modern web technologies including React, Next.js, and Tailwind CSS. Our stack is chosen for performance, SEO, and maintainability. We select the best tools for each specific project.",
  },
  {
    question: "Can I see examples of your previous work?",
    answer:
      "Check out our portfolio section above for a selection of recent projects. We also provide live links so you can experience the sites firsthand. Contact us for additional examples in your industry.",
  },
];

function FAQItem({
  faq,
  isOpen,
  onToggle,
}: {
  faq: { question: string; answer: string };
  isOpen: boolean;
  onToggle: () => void;
}) {
  return (
    <div className="border-b border-white/5 last:border-b-0">
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full py-5 text-left group"
      >
        <span className="text-sm sm:text-base font-medium text-white group-hover:text-[#3B82F6] transition-colors pr-4">
          {faq.question}
        </span>
        <ChevronDown
          size={18}
          className={`text-[#6B7280] shrink-0 transition-transform duration-300 ${
            isOpen ? "rotate-180 text-[#3B82F6]" : ""
          }`}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden"
          >
            <p className="text-sm text-[#9CA3AF] leading-relaxed pb-5">
              {faq.answer}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section id="faq" className="relative py-24 sm:py-32 bg-[#111827]/30">
      <div ref={ref} className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl sm:text-4xl font-bold tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          <p className="text-[#9CA3AF] max-w-2xl mx-auto">
            Everything you need to know about working with us
          </p>
        </motion.div>

        {/* Accordion */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="rounded-xl bg-[#1A1A2E]/50 border border-white/5 px-6"
        >
          {faqs.map((faq, index) => (
            <FAQItem
              key={index}
              faq={faq}
              isOpen={openIndex === index}
              onToggle={() =>
                setOpenIndex(openIndex === index ? null : index)
              }
            />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
