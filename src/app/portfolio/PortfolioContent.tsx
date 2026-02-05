"use client";

import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
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
  accentGradient: string;
  badgeColor: string;
};

const projects: Project[] = [
  {
    name: "FastPaving Service",
    category: "Construction",
    description: "Professional paving company website with service showcase",
    url: "https://fastpavingservice.com",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    accentGradient: "from-orange-500 to-amber-500",
    badgeColor: "bg-gradient-to-r from-orange-500 to-amber-500",
  },
  {
    name: "Elite Dental Clinic",
    category: "Healthcare",
    description: "Modern dental practice landing page with booking system",
    url: "https://dental-clinic-landing.vercel.app",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    accentGradient: "from-sky-500 to-cyan-500",
    badgeColor: "bg-gradient-to-r from-sky-500 to-cyan-500",
  },
  {
    name: "Premier Auto Detail",
    category: "Automotive",
    description: "Premium auto detailing service with package pricing",
    url: "https://auto-detail-landing.vercel.app",
    tech: ["Next.js", "Tailwind CSS", "Framer Motion"],
    accentGradient: "from-red-500 to-rose-500",
    badgeColor: "bg-gradient-to-r from-red-500 to-rose-500",
  },
  {
    name: "Bella Rosa Restaurant",
    category: "Restaurant",
    description: "Elegant restaurant with online menu and reservations",
    url: "https://restaurant-landing.vercel.app",
    tech: ["React", "Tailwind CSS", "TypeScript"],
    accentGradient: "from-pink-500 to-fuchsia-500",
    badgeColor: "bg-gradient-to-r from-pink-500 to-fuchsia-500",
  },
  {
    name: "Summit Architecture",
    category: "Professional",
    description: "Architecture studio portfolio with project gallery",
    url: "https://architecture-landing.vercel.app",
    tech: ["Next.js", "React", "Tailwind CSS"],
    accentGradient: "from-emerald-500 to-teal-500",
    badgeColor: "bg-gradient-to-r from-emerald-500 to-teal-500",
  },
  {
    name: "Fresh Bake Co.",
    category: "Food & Beverage",
    description: "Artisan bakery showcase with product catalog",
    url: "https://bakery-landing-v2.vercel.app",
    tech: ["Next.js", "Tailwind CSS", "Vercel"],
    accentGradient: "from-yellow-500 to-orange-500",
    badgeColor: "bg-gradient-to-r from-yellow-500 to-orange-500",
  },
];

const categories = [
  "All",
  "Construction",
  "Healthcare",
  "Automotive",
  "Restaurant",
  "Professional",
  "Food & Beverage",
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function PortfolioContent() {
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);

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

      {/* Filter Tabs */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-12">
        <FadeIn delay={0.1}>
          <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-transparent border-0 h-auto flex-wrap justify-center gap-3 p-0">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="bg-[#1A1A2E]/60 border border-white/10 rounded-full data-[state=active]:bg-[#3B82F6] data-[state=active]:border-[#3B82F6] data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-[#3B82F6]/25 text-[#9CA3AF] hover:text-white hover:bg-[#1A1A2E] hover:border-white/20 px-5 py-2.5 transition-all duration-200"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredProjects.map((project, index) => (
                    <motion.div
                      key={`${project.name}-${index}`}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                    >
                      <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 overflow-hidden group hover:-translate-y-1 hover:shadow-[0_20px_60px_rgba(59,130,246,0.15)] h-full flex flex-col">
                        {/* Accent gradient bar at top */}
                        <div className={cn("h-1 bg-gradient-to-r", project.accentGradient)} />

                        {/* Card content */}
                        <div className="p-6 flex-1 flex flex-col">
                          {/* Project name */}
                          <h3 className="text-lg font-bold text-white mb-2">
                            {project.name}
                          </h3>

                          {/* Category badge */}
                          <div className="mb-3">
                            <Badge className={cn("text-white border-0", project.badgeColor)}>
                              {project.category}
                            </Badge>
                          </div>

                          {/* Description */}
                          <p className="text-[#9CA3AF] text-sm mb-4 flex-1">
                            {project.description}
                          </p>

                          {/* Tech tags */}
                          <div className="flex flex-wrap gap-2 mb-4">
                            {project.tech.map((tech) => (
                              <span
                                key={tech}
                                className="text-xs px-2.5 py-1 bg-[#0A0A0F]/60 text-[#9CA3AF] border border-white/5 rounded-full"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>

                          {/* Visit site link */}
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 text-[#3B82F6] hover:text-[#06B6D4] text-sm font-medium transition-colors group/link"
                          >
                            Visit Site
                            <ExternalLink className="w-4 h-4 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                          </a>
                        </div>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mt-20">
        <FadeIn delay={0.3}>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/80 to-[#1A1A2E]/40 border border-white/10 rounded-3xl p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                View More Projects
              </h2>
              <p className="text-lg text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
                Want to see more of our work? Let&apos;s discuss your project and show you what we can build.
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
