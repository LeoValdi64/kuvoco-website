"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";

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

export default function FAQ() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

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
        >
          <Accordion
            type="single"
            collapsible
            defaultValue="item-0"
            className="rounded-xl bg-[#1A1A2E]/50 border border-white/5 px-6"
          >
            {faqs.map((faq, index) => (
              <AccordionItem
                key={index}
                value={`item-${index}`}
                className="border-b border-white/5 last:border-b-0"
              >
                <AccordionTrigger className="text-sm sm:text-base font-medium text-white hover:text-[#3B82F6] hover:no-underline transition-colors">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-sm text-[#9CA3AF] leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  );
}
