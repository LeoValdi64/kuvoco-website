import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    slug: "paving",
    name: "Cascade Surfaceworks",
    category: "Paving & concrete",
    label: "Rebranded concept",
    url: "https://paving.kuvoco.com",
    image: "/portfolio/paving.png",
  },
  {
    slug: "construction",
    name: "Rainline Siteworks",
    category: "Construction & sitework",
    label: "Rebranded concept",
    url: "https://construction.kuvoco.com",
    image: "/portfolio/construction.png",
  },
  {
    slug: "venue",
    name: "Alder & Ivory Estate",
    category: "Event venue",
    label: "Concept website",
    url: "https://venue.kuvoco.com",
    image: "/portfolio/venue.png",
  },
  {
    slug: "weddings",
    name: "Cedarlume Weddings",
    category: "Wedding planning",
    label: "Concept website",
    url: "https://weddings.kuvoco.com",
    image: "/portfolio/weddings.png",
  },
  {
    slug: "photography",
    name: "Northline Photo",
    category: "Creative portfolio",
    label: "Concept website",
    url: "https://photography.kuvoco.com",
    image: "/portfolio/photography.png",
  },
];

export default function Portfolio() {
  return (
    <section id="work" className="scroll-mt-20 py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <p className="text-sm font-semibold uppercase tracking-[0.2em] text-cyan-400">Selected builds</p>
            <h2 className="mt-4 text-3xl font-bold tracking-tight sm:text-5xl">See the work, not a generic promise.</h2>
            <p className="mt-5 text-lg leading-8 text-slate-400">These isolated portfolio demos include rebranded adaptations and original concepts. The demo domains do not represent operating businesses or claimed client results.</p>
          </div>
          <Link href="/#contact" className="inline-flex items-center gap-2 text-sm font-semibold text-cyan-300 hover:text-cyan-200">
            Ask for a concept in your industry <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {projects.map((project) => (
            <a key={project.slug} href={project.url} target="_blank" rel="noopener noreferrer" className="group overflow-hidden rounded-2xl border border-white/10 bg-white/[0.025] transition hover:-translate-y-1 hover:border-cyan-400/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 focus-visible:ring-offset-4 focus-visible:ring-offset-[#080b12]">
              <div className="relative aspect-[16/10] overflow-hidden">
                <Image src={project.image} alt="" fill className="object-cover object-top transition duration-500 group-hover:scale-105" sizes="(max-width: 639px) 100vw, (max-width: 1023px) 50vw, 33vw" />
                <div className="absolute left-4 top-4 rounded-full border border-white/15 bg-slate-950/80 px-3 py-1 text-[11px] font-medium uppercase tracking-wider text-slate-200 backdrop-blur">{project.label}</div>
              </div>
              <div className="flex items-center justify-between p-5">
                <div>
                  <h3 className="font-semibold">{project.name}<span className="sr-only"> (opens in a new tab)</span></h3>
                  <p className="mt-1 text-xs text-slate-500">{project.category}</p>
                </div>
                <ArrowUpRight className="h-5 w-5 text-slate-500 transition group-hover:text-cyan-300" />
              </div>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}
