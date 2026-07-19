"use client";

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";

const faqs = [
  { question: "Do I need to schedule a meeting?", answer: "No. We can handle the initial review, scope, feedback, and approvals by email or message. If a call would solve something faster, we can arrange one." },
  { question: "How fast can the website be ready?", answer: "A focused first working version can often be prepared in 1–2 business days after the scope, deposit, and required content are ready. Larger or more complex projects receive a specific timeline before work begins." },
  { question: "Is there a mandatory monthly fee?", answer: "No. Development is priced as a one-time project. The first year of managed hosting and any domain costs are itemized separately and paid in advance. Optional maintenance can be added later." },
  { question: "Will I own the website?", answer: "The agreement defines the final deliverables and ownership. Once the project is paid in full, you receive the agreed website access and rights, excluding third-party licenses and services." },
  { question: "What does local SEO include?", answer: "We set up search-friendly page structure, metadata, location and service signals, performance fundamentals, and indexation. Rankings are never guaranteed, but the technical foundation is included." },
  { question: "Can you guarantee more customers?", answer: "No honest provider can guarantee sales or rankings. We can build a faster, clearer path from search or referral traffic to a real inquiry and measure what happens after launch." },
  { question: "Why is Washington sales tax added?", answer: "Washington currently treats custom website development as a taxable retail service. Applicable sales tax is calculated separately on the invoice; hosting and domain charges are itemized." },
];

export default function FAQ() {
  return (
    <section id="faq" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Questions, answered clearly</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Know what happens before you pay.</h2>
        </div>
        <Accordion type="single" collapsible defaultValue="item-0" className="mt-12 rounded-2xl border border-white/10 bg-white/[0.025] px-6">
          {faqs.map((faq, index) => (
            <AccordionItem key={faq.question} value={`item-${index}`} className="border-white/10">
              <AccordionTrigger className="text-left text-base text-white hover:text-cyan-300 hover:no-underline">{faq.question}</AccordionTrigger>
              <AccordionContent className="text-sm leading-7 text-slate-400">{faq.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
