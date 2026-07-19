import { Gauge, MapPinned, MessageSquareText, PanelsTopLeft } from "lucide-react";

const services = [
  {
    icon: PanelsTopLeft,
    title: "Lead-focused design",
    description: "A clear message, strong calls to action, and a structure that helps customers understand why they should contact you.",
  },
  {
    icon: Gauge,
    title: "Fast modern development",
    description: "Responsive Next.js websites built for speed, reliability, and a polished experience on every screen.",
  },
  {
    icon: MapPinned,
    title: "Local SEO foundation",
    description: "Location, service, metadata, and search foundations designed for the Washington markets you actually serve.",
  },
  {
    icon: MessageSquareText,
    title: "Contact that feels easy",
    description: "Forms, email, and quote paths designed to reduce friction — without forcing your customers into a meeting.",
  },
];

export default function Services() {
  return (
    <section id="services" className="scroll-mt-20 border-y border-white/5 bg-white/[0.025] py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="max-w-2xl">
          <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">What your website needs to do</p>
          <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">Turn attention into a real inquiry.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">A beautiful site matters, but the business result matters more. Every decision should make it easier to trust you, understand the offer, and take the next step.</p>
        </div>
        <div className="mt-14 grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <article key={service.title} className="rounded-2xl border border-white/10 bg-[#0d1320]/80 p-6">
              <div className="mb-5 flex h-11 w-11 items-center justify-center rounded-xl bg-cyan-400/10 text-cyan-300">
                <service.icon className="h-5 w-5" />
              </div>
              <h3 className="text-lg font-semibold">{service.title}</h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">{service.description}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}
