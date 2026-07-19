import { Eye, FileCheck2, Rocket, Search } from "lucide-react";

const steps = [
  { number: "01", icon: Search, title: "Business review", description: "We review your current presence, local competitors, services, and the action a visitor should take." },
  { number: "02", icon: Eye, title: "Focused preview", description: "Qualified projects can receive a homepage direction so you can evaluate the idea visually." },
  { number: "03", icon: FileCheck2, title: "Build and approve", description: "After the scope and deposit are approved, we build the complete site and apply the agreed revisions." },
  { number: "04", icon: Rocket, title: "Launch and handoff", description: "The final balance is paid, the site launches, and you receive the agreed access and documentation." },
];

export default function Process() {
  return (
    <section id="process" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">A simple process</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">See the direction. Approve the work. Launch fast.</h2>
          <p className="mx-auto mt-5 max-w-2xl text-lg leading-8 text-slate-400">Most communication can happen by email or message. A call is available when it is genuinely useful, not as a requirement.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {steps.map((step) => (
            <article key={step.number} className="relative rounded-2xl border border-white/10 bg-white/[0.025] p-6">
              <span className="font-mono text-xs tracking-[0.2em] text-cyan-400">{step.number}</span>
              <step.icon className="mt-8 h-7 w-7 text-slate-200" />
              <h3 className="mt-5 text-lg font-semibold">{step.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{step.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
