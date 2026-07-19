import Link from "next/link";
import { ArrowRight, CheckCircle2 } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import HeroContactForm from "@/components/HeroContactForm";

const highlights = [
  "A personalized visual direction",
  "No meeting required",
  "Clear one-time project pricing",
];

export default function Hero() {
  return (
    <section className="relative overflow-hidden pb-20 pt-32 sm:pb-28 sm:pt-40">
      <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_20%,rgba(6,182,212,.16),transparent_34%),radial-gradient(circle_at_80%_30%,rgba(59,130,246,.14),transparent_32%)]" />
      <div className="absolute inset-0 -z-10 grid-pattern opacity-40" />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid gap-10 lg:grid-cols-[1.08fr_.72fr] lg:gap-x-14 lg:gap-y-8">
          <div className="lg:col-start-1 lg:row-start-1">
            <Badge variant="outline" className="mb-7 max-w-full whitespace-normal border-cyan-400/20 bg-cyan-400/5 px-4 py-2 text-left leading-5 text-cyan-300">
              Mount Vernon · Websites for Washington service businesses
            </Badge>
            <h1 className="max-w-4xl text-5xl font-bold tracking-[-0.04em] sm:text-6xl lg:text-7xl">
              Turn more local searches into
              <span className="block bg-gradient-to-r from-cyan-300 via-sky-400 to-blue-500 bg-clip-text text-transparent">
                real customer requests.
              </span>
            </h1>
            <p className="mt-7 max-w-2xl text-lg leading-8 text-slate-400 sm:text-xl">
              Kuvoco builds fast, focused websites that make your services easier to understand, trust, and contact—without a mandatory monthly contract.
            </p>

          </div>

          <div className="lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:self-center">
            <HeroContactForm />
          </div>

          <div className="lg:col-start-1 lg:row-start-2">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
              <Button asChild variant="outline" size="lg" className="h-12 border-white/15 bg-white/5 px-7 text-white hover:bg-white/10">
                <Link href="/#work">See what we can build</Link>
              </Button>
              <Link href="/#contact" className="inline-flex items-center justify-center text-sm font-semibold text-cyan-300 transition hover:text-cyan-200 sm:justify-start">
                Prefer the detailed form?
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </div>

            <div className="mt-8 grid gap-3 sm:grid-cols-3">
              {highlights.map((item) => (
                <div key={item} className="flex items-start gap-2 text-sm leading-6 text-slate-300">
                  <CheckCircle2 className="mt-1 h-4 w-4 shrink-0 text-cyan-400" />
                  {item}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
