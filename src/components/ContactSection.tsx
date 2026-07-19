"use client";

import { FormEvent, useEffect, useState } from "react";
import {
  ArrowRight,
  CheckCircle2,
  Mail,
  MapPin,
  MessageSquareText,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { openPreparedEmail, type LeadDetails } from "@/lib/contact-email";

const fieldClass = "border-white/10 bg-slate-950/70 placeholder:text-slate-600 focus-visible:border-cyan-400/50";

type FullFormState = Required<Pick<LeadDetails, "name" | "email" | "business">> &
  Pick<LeadDetails, "website" | "priority" | "message">;

const initialFullForm: FullFormState = {
  name: "",
  email: "",
  business: "",
  website: "",
  priority: "",
  message: "",
};

const contactPromises = [
  "No payment or obligation",
  "No meeting required",
  "A useful reply by email",
];

export default function ContactSection() {
  const [form, setForm] = useState<FullFormState>(initialFullForm);

  useEffect(() => {
    if (window.location.hash !== "#contact") return;

    const frame = window.requestAnimationFrame(() => {
      document.getElementById("contact")?.scrollIntoView({ block: "start" });
    });

    return () => window.cancelAnimationFrame(frame);
  }, []);

  const update = (field: keyof FullFormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openPreparedEmail(form, "full");
  };

  return (
    <section id="contact" className="relative scroll-mt-20 px-4 pb-24 pt-12 sm:px-6 sm:pb-32 sm:pt-16 lg:px-8">
      <div className="absolute inset-x-0 bottom-0 -z-10 h-[75%] bg-[radial-gradient(circle_at_50%_80%,rgba(6,182,212,.12),transparent_55%)]" />
      <div className="mx-auto grid max-w-6xl overflow-hidden rounded-3xl border border-cyan-300/20 bg-gradient-to-br from-cyan-400/10 via-slate-950/95 to-blue-500/5 shadow-2xl shadow-blue-950/30 lg:grid-cols-[.82fr_1.18fr]">
        <div className="border-b border-white/10 p-6 sm:p-10 lg:border-b-0 lg:border-r">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">
            Your next step
          </p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">
            Let&apos;s turn your website into a reason to choose you.
          </h2>
          <p className="mt-6 text-base leading-7 text-slate-400 sm:text-lg">
            Tell us what the business sells and which service matters most. We will review the opportunity and reply with the clearest next step.
          </p>

          <div className="mt-8 grid gap-3">
            {contactPromises.map((promise) => (
              <div key={promise} className="flex items-center gap-3 text-sm text-slate-200">
                <CheckCircle2 className="h-5 w-5 shrink-0 text-cyan-300" />
                {promise}
              </div>
            ))}
          </div>

          <div className="mt-10 grid gap-3 text-sm text-slate-400">
            <a href="mailto:hello@kuvoco.com" className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4 transition hover:border-cyan-300/30 hover:text-white">
              <Mail className="h-5 w-5 text-cyan-300" />
              hello@kuvoco.com
            </a>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4">
              <MessageSquareText className="h-5 w-5 text-cyan-300" />
              Email and message first
            </div>
            <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-black/10 p-4">
              <MapPin className="h-5 w-5 text-cyan-300" />
              Mount Vernon, Washington
            </div>
          </div>
        </div>

        <div className="p-6 sm:p-10">
          <h3 className="text-2xl font-semibold">Request your project review</h3>
          <p className="mt-2 text-sm leading-6 text-slate-400">
            A little context helps us give you a more useful answer.
          </p>

          <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="contact-name">Your name</Label>
                <Input id="contact-name" required autoComplete="name" value={form.name} onChange={(event) => update("name", event.target.value)} className={fieldClass} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Your email</Label>
                <Input id="contact-email" type="email" required autoComplete="email" value={form.email} onChange={(event) => update("email", event.target.value)} className={fieldClass} />
              </div>
            </div>

            <div className="grid gap-5 sm:grid-cols-2">
              <div className="grid gap-2">
                <Label htmlFor="contact-business">Business name</Label>
                <Input id="contact-business" required autoComplete="organization" value={form.business} onChange={(event) => update("business", event.target.value)} className={fieldClass} />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-website">
                  Current website <span className="font-normal text-slate-500">(optional)</span>
                </Label>
                <Input id="contact-website" type="url" placeholder="https://" value={form.website} onChange={(event) => update("website", event.target.value)} className={fieldClass} />
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-priority">What should customers request from you?</Label>
              <Input id="contact-priority" placeholder="Estimates, service calls, consultations..." value={form.priority} onChange={(event) => update("priority", event.target.value)} className={fieldClass} />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="contact-message">What is not working today?</Label>
              <Textarea id="contact-message" rows={5} placeholder="No website, outdated design, not enough inquiries..." value={form.message} onChange={(event) => update("message", event.target.value)} className={`${fieldClass} resize-none`} />
            </div>

            <Button type="submit" size="lg" className="mt-1 h-12 bg-cyan-400 text-slate-950 hover:bg-cyan-300">
              Open my prepared request
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
            <p className="text-center text-xs leading-5 text-slate-500">
              Nothing is sent silently. Review the prepared email before sending it.
            </p>
          </form>
        </div>
      </div>
    </section>
  );
}
