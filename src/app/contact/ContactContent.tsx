"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Mail, MapPin, MessageSquareText } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

type FormState = {
  name: string;
  email: string;
  business: string;
  website: string;
  priority: string;
  message: string;
};

const initialState: FormState = {
  name: "",
  email: "",
  business: "",
  website: "",
  priority: "",
  message: "",
};

export default function ContactContent() {
  const [form, setForm] = useState<FormState>(initialState);

  const update = (field: keyof FormState, value: string) => {
    setForm((current) => ({ ...current, [field]: value }));
  };

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const demoSource = new URLSearchParams(window.location.search).get("demo");
    const sourceLabel = demoSource
      ? demoSource.replace(/[^a-z0-9-]/gi, "").slice(0, 40)
      : "direct";
    const subject = `Website review request - ${form.business || form.name}`;
    const body = [
      `Name: ${form.name}`,
      `Email: ${form.email}`,
      `Business: ${form.business}`,
      `Source: ${sourceLabel}`,
      `Current website: ${form.website || "None"}`,
      `Main priority: ${form.priority || "Not specified"}`,
      "",
      "Project notes:",
      form.message || "No additional notes.",
    ].join("\n");

    window.location.href = `mailto:hello@kuvoco.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  };

  return (
    <main className="min-h-screen pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-12 lg:grid-cols-[.8fr_1.2fr] lg:gap-16">
          <section>
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">No meeting required</p>
            <h1 className="mt-4 text-4xl font-bold tracking-tight sm:text-6xl">Tell us what the website needs to accomplish.</h1>
            <p className="mt-6 text-lg leading-8 text-slate-400">Send the business, current website if one exists, and the service you most want customers to request. This form opens a prepared email in your email app so you stay in control of what is sent.</p>

            <div className="mt-10 grid gap-4 text-sm text-slate-300">
              <a href="mailto:hello@kuvoco.com" className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4 hover:border-cyan-400/30">
                <Mail className="h-5 w-5 text-cyan-400" />
                <span><strong className="block text-white">Email</strong>hello@kuvoco.com</span>
              </a>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <MapPin className="h-5 w-5 text-cyan-400" />
                <span><strong className="block text-white">Based in</strong>Mount Vernon, Washington</span>
              </div>
              <div className="flex items-center gap-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                <MessageSquareText className="h-5 w-5 text-cyan-400" />
                <span><strong className="block text-white">Communication</strong>Email and message first</span>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.035] p-6 sm:p-9">
            <h2 className="text-2xl font-semibold">Request a project review</h2>
            <p className="mt-2 text-sm leading-6 text-slate-400">No payment and no obligation. We will reply with the next useful step.</p>

            <form onSubmit={handleSubmit} className="mt-8 grid gap-5">
              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" required value={form.name} onChange={(event) => update("name", event.target.value)} className="border-white/10 bg-slate-950/60" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="email">Your email</Label>
                  <Input id="email" type="email" required value={form.email} onChange={(event) => update("email", event.target.value)} className="border-white/10 bg-slate-950/60" />
                </div>
              </div>

              <div className="grid gap-5 sm:grid-cols-2">
                <div className="grid gap-2">
                  <Label htmlFor="business">Business name</Label>
                  <Input id="business" required value={form.business} onChange={(event) => update("business", event.target.value)} className="border-white/10 bg-slate-950/60" />
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="website">Current website <span className="text-slate-500">(optional)</span></Label>
                  <Input id="website" type="url" placeholder="https://" value={form.website} onChange={(event) => update("website", event.target.value)} className="border-white/10 bg-slate-950/60" />
                </div>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="priority">What should the website help customers request?</Label>
                <Input id="priority" placeholder="Example: roofing estimates, consultations, service calls" value={form.priority} onChange={(event) => update("priority", event.target.value)} className="border-white/10 bg-slate-950/60" />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="message">Anything else we should know?</Label>
                <Textarea id="message" rows={6} value={form.message} onChange={(event) => update("message", event.target.value)} className="resize-none border-white/10 bg-slate-950/60" />
              </div>

              <Button type="submit" size="lg" className="mt-2 h-12 bg-cyan-500 text-slate-950 hover:bg-cyan-400">
                Open prepared email <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
              <p className="text-center text-xs leading-5 text-slate-500">Your information is not silently submitted. Your email app opens first so you can review and send it.</p>
            </form>
          </section>
        </div>
      </div>
    </main>
  );
}
