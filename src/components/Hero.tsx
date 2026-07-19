import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const highlights = [
  "First working preview in 1–2 business days",
  "Local SEO and conversion foundations",
  "Async-first — no meeting required",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-24 pt-36 sm:pb-32 sm:pt-44">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,.16),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,.14),transparent_32%)]" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl">
          <Badge variant="outline" className="mb-7 border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-cyan-300">
            Mount Vernon · Serving businesses across Washington
          </Badge>
          <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
            A website that helps local customers
            <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
              choose your business.
            </span>
          </h1>
          <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
            Kuvoco builds fast, conversion-focused websites for service businesses. Clear scope, one-time project pricing, and no mandatory monthly contract.
          </p>

          <div className="mt-10 flex flex-col gap-4 sm:flex-row">
            <Button asChild size="lg" className="h-12 bg-cyan-500 px-7 text-slate-950 hover:bg-cyan-400">
              <Link href="/contact">
                Request a free preview
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg" className="h-12 border-white/15 bg-white/5 px-7 text-white hover:bg-white/10">
              <Link href="/#work">See demo concepts</Link>
            </Button>
          </div>

          <div className="mt-10 grid gap-3 sm:grid-cols-3">
            {highlights.map((item) => (
              <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
