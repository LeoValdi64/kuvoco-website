"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight, Sparkles } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  name: string;
  category: string;
  description: string;
  url: string;
  tech: string[];
  gradient: string;
  featured?: boolean;
};

const allProjects: Project[] = [
  // Featured projects first
  {
    name: "Fast Paving Service",
    category: "Construction",
    description: "Professional paving company website with service showcase, quote request system, and project gallery. Our first paid client project.",
    url: "https://fastpavingservice.com",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    gradient: "from-orange-500 via-amber-500 to-yellow-500",
    featured: true,
  },
  {
    name: "FlowBoard SaaS",
    category: "Technology",
    description: "Modern SaaS landing page with feature showcase, pricing tiers, and interactive demo sections.",
    url: "https://flowboard-saas.vercel.app",
    tech: ["Next.js", "Framer Motion", "TypeScript"],
    gradient: "from-violet-500 via-purple-500 to-fuchsia-500",
    featured: true,
  },
  {
    name: "PawCare Veterinary",
    category: "Healthcare",
    description: "Warm and welcoming veterinary clinic website with service booking and pet care resources.",
    url: "https://pawcare-vet.vercel.app",
    tech: ["Next.js", "Tailwind CSS", "React"],
    gradient: "from-emerald-500 via-teal-500 to-cyan-500",
    featured: true,
  },
  // Regular projects
  {
    name: "Elite Dental Clinic",
    category: "Healthcare",
    description: "Modern dental practice landing page with booking system",
    url: "https://dental-clinic-landing.vercel.app",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    gradient: "from-sky-500 to-cyan-500",
  },
  {
    name: "Premier Auto Detail",
    category: "Automotive",
    description: "Premium auto detailing service with package pricing",
    url: "https://auto-detail-landing.vercel.app",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    gradient: "from-red-500 to-rose-500",
  },
  {
    name: "Bella Rosa Restaurant",
    category: "Restaurant",
    description: "Elegant restaurant with online menu and reservations",
    url: "https://restaurant-landing.vercel.app",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    gradient: "from-pink-500 to-rose-400",
  },
  {
    name: "Summit Architecture",
    category: "Professional",
    description: "Architecture studio portfolio with project gallery",
    url: "https://architecture-landing.vercel.app",
    tech: ["Next.js", "React", "Tailwind CSS"],
    gradient: "from-slate-500 to-zinc-600",
  },
  {
    name: "Fresh Bake Co.",
    category: "Restaurant",
    description: "Artisan bakery showcase with product catalog",
    url: "https://bakery-landing-v2.vercel.app",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    gradient: "from-yellow-500 to-orange-500",
  },
  {
    name: "Pizzeria Napoli",
    category: "Restaurant",
    description: "Authentic Italian pizzeria with online ordering",
    url: "https://pizzeria-landing.vercel.app",
    tech: ["Next.js", "Tailwind CSS", "React"],
    gradient: "from-red-600 to-orange-500",
  },
  {
    name: "BugShield Pest Control",
    category: "Home Services",
    description: "Professional pest control services with instant quotes",
    url: "https://bugshield-pest-control.vercel.app",
    tech: ["Next.js", "Tailwind CSS", "TypeScript"],
    gradient: "from-green-600 to-emerald-500",
  },
  {
    name: "Sparkle Car Wash",
    category: "Automotive",
    description: "Premium car wash with membership packages",
    url: "https://carwash-landing-henna.vercel.app",
    tech: ["Next.js", "Framer Motion", "Tailwind CSS"],
    gradient: "from-blue-500 to-cyan-400",
  },
  {
    name: "Mortgage Calculator",
    category: "Finance",
    description: "Interactive mortgage calculator with payment breakdowns",
    url: "https://mortgage-calculator-eta-five.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    gradient: "from-emerald-600 to-teal-500",
  },
  {
    name: "NovaPay Payments",
    category: "Technology",
    description: "Modern fintech landing page with feature highlights",
    url: "https://novapay-landing-weld.vercel.app",
    tech: ["Next.js", "Framer Motion", "React"],
    gradient: "from-indigo-500 to-purple-500",
  },
  {
    name: "QRForge Generator",
    category: "Technology",
    description: "QR code generator tool with customization options",
    url: "https://qrforge-kappa.vercel.app",
    tech: ["Next.js", "TypeScript", "Tailwind CSS"],
    gradient: "from-gray-700 to-slate-600",
  },
  {
    name: "Gradient Generator",
    category: "Technology",
    description: "CSS gradient generator with real-time preview",
    url: "https://gradient-generator-blue-two.vercel.app",
    tech: ["Next.js", "React", "Tailwind CSS"],
    gradient: "from-pink-500 via-purple-500 to-indigo-500",
  },
  {
    name: "Paycheck Calculator",
    category: "Finance",
    description: "Salary calculator with tax and deduction breakdowns",
    url: "https://paycheck-calculator-zeta.vercel.app",
    tech: ["Next.js", "TypeScript", "React"],
    gradient: "from-green-500 to-emerald-600",
  },
];

const categories = [
  "All",
  "Technology",
  "Healthcare",
  "Restaurant",
  "Automotive",
  "Home Services",
  "Finance",
  "Construction",
  "Professional",
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.4, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

function ProjectImagePlaceholder({ gradient, name }: { gradient: string; name: string }) {
  const initials = name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className={cn(
      "w-full aspect-video bg-gradient-to-br rounded-xl flex items-center justify-center relative overflow-hidden",
      gradient
    )}>
      {/* Grid pattern overlay */}
      <div className="absolute inset-0 opacity-10">
        <div className="w-full h-full" style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)`,
          backgroundSize: '20px 20px'
        }} />
      </div>
      {/* Initials */}
      <span className="text-4xl font-bold text-white/30 select-none relative z-10">
        {initials}
      </span>
      {/* Shine effect */}
      <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent" />
    </div>
  );
}

function FeaturedProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
    >
      <Card className="bg-[#1A1A2E]/60 border-white/10 hover:border-[#3B82F6]/40 transition-all duration-500 overflow-hidden group hover:shadow-[0_30px_80px_rgba(59,130,246,0.2)]">
        <div className="flex flex-col lg:flex-row">
          {/* Image section */}
          <div className="lg:w-1/2 p-4">
            <div className="relative overflow-hidden rounded-xl group-hover:scale-[1.02] transition-transform duration-500">
              <ProjectImagePlaceholder gradient={project.gradient} name={project.name} />
              {/* Hover overlay */}
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-xl">
                <a
                  href={project.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white text-black px-6 py-3 rounded-lg font-semibold flex items-center gap-2 hover:bg-gray-100 transition-colors"
                >
                  View Live Site
                  <ExternalLink className="w-4 h-4" />
                </a>
              </div>
            </div>
          </div>

          {/* Content section */}
          <div className="lg:w-1/2 p-6 lg:p-8 flex flex-col justify-center">
            <div className="flex items-center gap-3 mb-3">
              <Badge className={cn("bg-gradient-to-r text-white border-0", project.gradient)}>
                {project.category}
              </Badge>
              {index === 0 && (
                <Badge className="bg-amber-500/20 text-amber-400 border-amber-500/30">
                  <Sparkles className="w-3 h-3 mr-1" />
                  Client Project
                </Badge>
              )}
            </div>

            <h3 className="text-2xl lg:text-3xl font-bold text-white mb-3">
              {project.name}
            </h3>

            <p className="text-[#9CA3AF] mb-5 text-base lg:text-lg leading-relaxed">
              {project.description}
            </p>

            <div className="flex flex-wrap gap-2 mb-6">
              {project.tech.map((tech) => (
                <span
                  key={tech}
                  className="text-sm px-3 py-1.5 bg-[#0A0A0F]/60 text-[#9CA3AF] border border-white/10 rounded-full"
                >
                  {tech}
                </span>
              ))}
            </div>

            <a
              href={project.url}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#06B6D4] font-semibold transition-colors group/link"
            >
              Visit Site
              <ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
            </a>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function ProjectCard({ project, index }: { project: Project; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
    >
      <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 overflow-hidden group hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(59,130,246,0.15)] h-full flex flex-col">
        {/* Image placeholder */}
        <div className="p-3 pb-0">
          <div className="relative overflow-hidden rounded-lg group-hover:scale-[1.02] transition-transform duration-300">
            <ProjectImagePlaceholder gradient={project.gradient} name={project.name} />
            {/* Quick link overlay on hover */}
            <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center rounded-lg">
              <a
                href={project.url}
                target="_blank"
                rel="noopener noreferrer"
                className="bg-white/90 backdrop-blur-sm text-black px-4 py-2 rounded-lg font-medium text-sm flex items-center gap-2 hover:bg-white transition-colors"
              >
                View Site
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>
          </div>
        </div>

        {/* Card content */}
        <div className="p-5 pt-4 flex-1 flex flex-col">
          {/* Category badge */}
          <div className="mb-2">
            <Badge variant="outline" className="text-xs border-white/20 text-[#9CA3AF]">
              {project.category}
            </Badge>
          </div>

          {/* Project name */}
          <h3 className="text-lg font-bold text-white mb-2 group-hover:text-[#3B82F6] transition-colors">
            {project.name}
          </h3>

          {/* Description */}
          <p className="text-[#6B7280] text-sm mb-4 flex-1 line-clamp-2">
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-1.5">
            {project.tech.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="text-xs px-2 py-1 bg-[#0A0A0F]/60 text-[#6B7280] rounded-md"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

export default function PortfolioContent() {
  const [activeTab, setActiveTab] = useState("All");

  const featuredProjects = allProjects.filter((p) => p.featured);
  const regularProjects = allProjects.filter((p) => !p.featured);

  const filteredProjects =
    activeTab === "All"
      ? regularProjects
      : regularProjects.filter((project) => project.category === activeTab);

  return (
    <main className="bg-[#0A0A0F] min-h-screen pt-32 pb-20">
      {/* Hero Section */}
      <section className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="absolute inset-0 -top-32 -z-10">
          <div className="absolute inset-0 bg-gradient-to-b from-[#3B82F6]/5 via-[#06B6D4]/5 to-transparent" />
          <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[500px] h-[500px] bg-[#3B82F6]/10 rounded-full blur-[120px]" />
        </div>

        <FadeIn>
          <div className="text-center relative">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-24 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full -translate-y-8" />
            <Badge className="mb-6 bg-[#3B82F6]/20 text-[#3B82F6] border-[#3B82F6]/30 text-sm px-4 py-1.5">
              90+ Websites Delivered
            </Badge>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
              Our{" "}
              <span className="gradient-text">Portfolio</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#9CA3AF] max-w-2xl mx-auto">
              A showcase of websites we&apos;ve crafted for businesses like yours
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Featured Projects Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.1}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full" />
            <h2 className="text-2xl font-bold text-white">Featured Projects</h2>
          </div>
        </FadeIn>

        <div className="space-y-6">
          {featuredProjects.map((project, index) => (
            <FeaturedProjectCard key={project.name} project={project} index={index} />
          ))}
        </div>
      </section>

      {/* All Projects Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-20">
        <FadeIn delay={0.2}>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-12 h-1 bg-gradient-to-r from-[#06B6D4] to-[#3B82F6] rounded-full" />
            <h2 className="text-2xl font-bold text-white">All Projects</h2>
          </div>

          <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
            {/* Filter Tabs */}
            <div className="overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 sm:overflow-visible mb-10">
              <TabsList className="bg-transparent border-0 h-auto inline-flex sm:flex sm:flex-wrap gap-2 sm:gap-3 p-0 min-w-max sm:min-w-0">
                {categories.map((category) => (
                  <TabsTrigger
                    key={category}
                    value={category}
                    className="bg-[#1A1A2E]/60 border border-white/10 rounded-full data-[state=active]:bg-[#3B82F6] data-[state=active]:border-[#3B82F6] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#3B82F6]/25 text-[#9CA3AF] hover:text-white hover:bg-[#1A1A2E] hover:border-white/20 px-4 py-2 text-sm transition-all duration-200 whitespace-nowrap"
                  >
                    {category}
                  </TabsTrigger>
                ))}
              </TabsList>
            </div>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-0">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
                  {filteredProjects.map((project, index) => (
                    <ProjectCard key={`${project.name}-${index}`} project={project} index={index} />
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.3}>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/80 to-[#1A1A2E]/40 border border-white/10 rounded-3xl p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Ready to Join Our Portfolio?
              </h2>
              <p className="text-lg text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
                Let&apos;s build something amazing together. Your business deserves a website that stands out.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg"
                  >
                    Start Your Project
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:bg-white/5 text-white font-semibold px-8 py-6 text-lg"
                  >
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
