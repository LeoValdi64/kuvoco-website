import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function CTA() {
  return (
    <section className="px-4 pb-24 sm:px-6 sm:pb-32 lg:px-8">
      <div className="relative mx-auto max-w-6xl overflow-hidden rounded-3xl border border-cyan-400/20 bg-gradient-to-br from-cyan-400/10 via-blue-500/5 to-transparent px-6 py-16 text-center sm:px-12 sm:py-20">
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_center,rgba(34,211,238,.12),transparent_55%)]" />
        <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-300">Start without a sales call</p>
        <h2 className="mx-auto mt-4 max-w-3xl text-3xl font-bold tracking-tight sm:text-5xl">Tell us about the business. We will tell you what the website should fix.</h2>
        <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-slate-400">Send the business name, current website if one exists, and the service you most want customers to request. We will respond by email.</p>
        <Button asChild size="lg" className="mt-9 h-12 bg-cyan-500 px-7 text-slate-950 hover:bg-cyan-400">
          <Link href="/contact">Request a project review <ArrowRight className="ml-2 h-4 w-4" /></Link>
        </Button>
      </div>
    </section>
  );
}
