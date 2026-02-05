"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { ExternalLink, ArrowRight } from "lucide-react";
import Link from "next/link";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

type Project = {
  name: string;
  category: string;
  url: string;
  gradient: string;
  accent: string;
  isComingSoon?: false;
};

type ComingSoonProject = {
  name: string;
  category: string;
  isComingSoon: true;
  gradient: string;
};

const projects: Project[] = [
  {
    name: "FastPaving Service",
    category: "Home Services",
    url: "https://fastpavingservice.com",
    gradient: "from-orange-600/20 to-amber-600/20",
    accent: "bg-orange-500",
  },
  {
    name: "Elite Dental Clinic",
    category: "Healthcare",
    url: "https://dental-clinic-landing.vercel.app",
    gradient: "from-sky-600/20 to-cyan-600/20",
    accent: "bg-sky-500",
  },
  {
    name: "Premier Auto Detail",
    category: "Automotive",
    url: "https://auto-detail-landing.vercel.app",
    gradient: "from-red-600/20 to-rose-600/20",
    accent: "bg-red-500",
  },
  {
    name: "Bella Rosa Restaurant",
    category: "Restaurant",
    url: "https://restaurant-landing.vercel.app",
    gradient: "from-pink-600/20 to-fuchsia-600/20",
    accent: "bg-pink-500",
  },
  {
    name: "Summit Architecture",
    category: "Professional",
    url: "https://architecture-landing.vercel.app",
    gradient: "from-emerald-600/20 to-teal-600/20",
    accent: "bg-emerald-500",
  },
  {
    name: "Fresh Bake Co.",
    category: "Food & Beverage",
    url: "https://bakery-landing-v2.vercel.app",
    gradient: "from-yellow-600/20 to-orange-600/20",
    accent: "bg-yellow-500",
  },
];

const comingSoonProjects: ComingSoonProject[] = [
  {
    name: "Your Business Here",
    category: "Coming Soon",
    isComingSoon: true,
    gradient: "from-gray-600/20 to-gray-700/20",
  },
  {
    name: "Your Business Here",
    category: "Coming Soon",
    isComingSoon: true,
    gradient: "from-gray-600/20 to-gray-700/20",
  },
  {
    name: "Your Business Here",
    category: "Coming Soon",
    isComingSoon: true,
    gradient: "from-gray-600/20 to-gray-700/20",
  },
];

const categories = [
  "All",
  "Home Services",
  "Restaurant",
  "Healthcare",
  "Professional",
  "Food & Beverage",
  "Automotive",
];

export default function PortfolioContent() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [activeTab, setActiveTab] = useState("All");

  const filteredProjects =
    activeTab === "All"
      ? projects
      : projects.filter((project) => project.category === activeTab);

  const allProjects: (Project | ComingSoonProject)[] = [...filteredProjects, ...comingSoonProjects];

  return (
    <div className="relative pt-32 pb-24 sm:pb-32 min-h-screen">
      <div ref={ref} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            <span className="bg-gradient-to-r from-[#3B82F6] via-[#06B6D4] to-[#3B82F6] bg-clip-text text-transparent">
              Our Portfolio
            </span>
          </h1>
          <p className="text-[#9CA3AF] text-lg max-w-2xl mx-auto">
            A showcase of websites we&apos;ve crafted for businesses like yours
          </p>
        </motion.div>

        {/* Category Filter Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mb-12"
        >
          <Tabs defaultValue="All" className="w-full" onValueChange={setActiveTab}>
            <TabsList className="bg-[#1A1A2E]/80 border border-white/10 h-auto flex-wrap justify-center gap-2 p-2 rounded-xl backdrop-blur-sm">
              {categories.map((category) => (
                <TabsTrigger
                  key={category}
                  value={category}
                  className="data-[state=active]:bg-[#3B82F6] data-[state=active]:text-white data-[state=active]:shadow-md data-[state=active]:shadow-[#3B82F6]/25 text-[#9CA3AF] hover:text-white hover:bg-white/5 px-4 py-2 rounded-lg transition-all duration-200"
                >
                  {category}
                </TabsTrigger>
              ))}
            </TabsList>

            {categories.map((category) => (
              <TabsContent key={category} value={category} className="mt-12">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
                  {allProjects.map((project, index) => (
                    <motion.div
                      key={`${project.name}-${index}`}
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      {project.isComingSoon ? (
                        <Card className="group relative overflow-hidden border border-white/5 hover:border-white/15 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_30px_rgba(255,255,255,0.05)] bg-[#1A1A2E]/30">
                          <div
                            className={cn(
                              "h-48 bg-gradient-to-br relative",
                              project.gradient
                            )}
                          >
                            <div className="absolute inset-0 bg-[#0A0A0F]/40" />
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-2xl font-bold text-[#9CA3AF]">
                                Coming Soon
                              </span>
                            </div>
                          </div>
                          <CardFooter className="p-5 bg-[#1A1A2E]/50 flex items-center justify-between">
                            <div>
                              <h3 className="font-semibold text-white mb-1">
                                {project.name}
                              </h3>
                              <Badge
                                variant="secondary"
                                className="bg-[#9CA3AF]/10 text-[#9CA3AF] border-0"
                              >
                                {project.category}
                              </Badge>
                            </div>
                            <Button asChild size="sm" variant="outline">
                              <Link href="/contact">Get Started</Link>
                            </Button>
                          </CardFooter>
                        </Card>
                      ) : (
                        <a
                          href={project.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="block"
                        >
                          <Card className="group relative overflow-hidden border border-white/5 hover:border-[#3B82F6]/40 transition-all duration-300 hover:-translate-y-2 hover:scale-[1.02] hover:shadow-[0_0_40px_rgba(59,130,246,0.15)] bg-[#1A1A2E]/30">
                            <div
                              className={cn(
                                "h-48 bg-gradient-to-br relative",
                                project.gradient
                              )}
                            >
                              <div className="absolute inset-0 bg-[#0A0A0F]/40" />
                              <div className="absolute inset-0 flex items-center justify-center">
                                <span className="text-6xl font-bold text-white/20 group-hover:text-white/40 transition-colors">
                                  {project.name.charAt(0)}
                                </span>
                              </div>
                              <div className="absolute inset-0 bg-[#3B82F6]/0 group-hover:bg-[#3B82F6]/10 transition-colors duration-300 flex items-center justify-center">
                                <ExternalLink
                                  size={24}
                                  className="text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                                />
                              </div>
                            </div>
                            <CardFooter className="p-5 bg-[#1A1A2E]/50 flex items-center justify-between">
                              <div>
                                <h3 className="font-semibold text-white mb-1">
                                  {project.name}
                                </h3>
                                <Badge
                                  variant="secondary"
                                  className={cn(
                                    "border-0 text-white",
                                    project.accent
                                  )}
                                >
                                  {project.category}
                                </Badge>
                              </div>
                              <span className="text-xs text-[#6B7280] group-hover:text-[#3B82F6] transition-colors flex items-center gap-1">
                                Visit Site
                                <ExternalLink size={12} />
                              </span>
                            </CardFooter>
                          </Card>
                        </a>
                      )}
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="text-center mt-20"
        >
          <div className="max-w-2xl mx-auto">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Have a project in mind?
            </h2>
            <p className="text-[#9CA3AF] mb-8">
              Let&apos;s create something amazing together. Start your project today.
            </p>
            <Button asChild size="lg" className="bg-[#3B82F6] hover:bg-[#2563EB] text-white">
              <Link href="/contact" className="inline-flex items-center gap-2">
                Start Your Project
                <ArrowRight size={16} />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
