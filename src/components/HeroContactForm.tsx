"use client";

import { FormEvent, useState } from "react";
import { ArrowRight, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { openPreparedEmail } from "@/lib/contact-email";

const fieldClass = "border-white/10 bg-slate-950/70 placeholder:text-slate-600 focus-visible:border-cyan-400/50";

export default function HeroContactForm() {
  const [business, setBusiness] = useState("");
  const [email, setEmail] = useState("");
  const [website, setWebsite] = useState("");

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    openPreparedEmail({ business, email, website }, "hero");
  };

  return (
    <aside
      id="hero-contact"
      className="relative rounded-3xl border border-cyan-300/20 bg-slate-950/75 p-5 shadow-2xl shadow-cyan-950/30 backdrop-blur-xl sm:p-7"
    >
      <div className="absolute inset-x-10 top-0 h-px bg-gradient-to-r from-transparent via-cyan-300/70 to-transparent" />
      <div className="flex items-center gap-2 text-sm font-semibold text-cyan-300">
        <Sparkles className="h-4 w-4" />
        Free personalized preview
      </div>
      <h2 className="mt-3 text-2xl font-bold tracking-tight">
        See what your business could look like online.
      </h2>
      <p className="mt-3 text-sm leading-6 text-slate-400">
        Send three details. We will review the opportunity and reply by email—no sales call required.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 grid gap-4">
        <div className="grid gap-2">
          <Label htmlFor="hero-business">Business name</Label>
          <Input
            id="hero-business"
            required
            autoComplete="organization"
            value={business}
            onChange={(event) => setBusiness(event.target.value)}
            placeholder="Example: Skagit Home Services"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-email">Your email</Label>
          <Input
            id="hero-email"
            type="email"
            required
            autoComplete="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            placeholder="you@business.com"
            className={fieldClass}
          />
        </div>
        <div className="grid gap-2">
          <Label htmlFor="hero-website">
            Current website <span className="font-normal text-slate-500">(optional)</span>
          </Label>
          <Input
            id="hero-website"
            type="url"
            value={website}
            onChange={(event) => setWebsite(event.target.value)}
            placeholder="https://"
            className={fieldClass}
          />
        </div>
        <Button type="submit" size="lg" className="mt-1 h-12 bg-cyan-400 text-slate-950 hover:bg-cyan-300">
          Request my free preview
          <ArrowRight className="ml-2 h-4 w-4" />
        </Button>
      </form>

      <p className="mt-4 text-center text-xs leading-5 text-slate-500">
        No payment. Your email app opens first so you can review the request.
      </p>
    </aside>
  );
}
