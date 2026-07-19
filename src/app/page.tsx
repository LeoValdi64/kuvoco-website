import Link from "next/link";
import { ArrowRight, Check } from "lucide-react";
import Hero from "@/components/Hero";
import Services from "@/components/Services";
import Portfolio from "@/components/Portfolio";
import Process from "@/components/Process";
import FAQ from "@/components/FAQ";
import CTA from "@/components/CTA";
import { Button } from "@/components/ui/button";

const included = [
  "Mobile-first custom design",
  "Local SEO foundation",
  "Lead-focused contact experience",
  "Performance and launch setup",
  "Clear ownership after final payment",
  "No mandatory monthly maintenance plan",
];

function Offer() {
  return (
    <section id="pricing" className="relative scroll-mt-20 border-y border-white/5 bg-white/[0.025] py-24 sm:py-32">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-[1.05fr_.95fr] lg:items-center lg:px-8">
        <div>
          <p className="mb-4 text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">
            Clear investment
          </p>
          <h2 className="text-3xl font-bold tracking-tight sm:text-5xl">
            Pay for the build. Keep the website.
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-8 text-slate-400">
            Projects use a defined scope and one-time development price. Your first year of managed hosting and any domain costs are quoted separately, so you can see exactly what you are paying for.
          </p>
          <div className="mt-8 flex flex-wrap gap-3 text-sm text-slate-300">
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">50% to begin</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">50% before launch</span>
            <span className="rounded-full border border-white/10 bg-white/5 px-4 py-2">WA tax added where required</span>
          </div>
        </div>

        <div className="rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent p-7 shadow-2xl shadow-blue-950/30 sm:p-9">
          <p className="text-sm font-medium text-cyan-300">Focused business websites</p>
          <div className="mt-3 flex items-end gap-3">
            <span className="text-4xl font-bold sm:text-5xl">From $1,500</span>
            <span className="pb-1 text-sm text-slate-500">development</span>
          </div>
          <p className="mt-4 text-sm leading-6 text-slate-400">
            Final price depends on pages, content, integrations, and how much preparation your business needs.
          </p>
          <ul className="mt-7 grid gap-3">
            {included.map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-slate-200">
                <Check className="mt-0.5 h-4 w-4 shrink-0 text-cyan-400" />
                {item}
              </li>
            ))}
          </ul>
          <Button asChild size="lg" className="mt-8 w-full bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            <Link href="/contact">
              Request a project review
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}

export default function Home() {
  return (
    <main>
      <Hero />
      <Services />
      <Portfolio />
      <Process />
      <Offer />
      <FAQ />
      <CTA />
    </main>
  );
}
