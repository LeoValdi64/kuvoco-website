"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ExternalLink } from "lucide-react";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";

const CATEGORIES = [
  "All",
  "Restaurants",
  "Health",
  "Home Services",
  "Automotive",
  "Professional",
  "Beauty",
  "Events & Other",
  "Client Projects",
] as const;

type Category = (typeof CATEGORIES)[number];

interface Project {
  name: string;
  category: Category;
  /** kuvoco.com subdomain — used for the link and screenshot when no external url is set */
  subdomain?: string;
  /** external URL for client projects with their own domains */
  url?: string;
}

const PROJECTS: Project[] = [
  // Restaurants
  { subdomain: "pizzeria", name: "Pizzeria", category: "Restaurants" },
  { subdomain: "steakhouse", name: "Steakhouse", category: "Restaurants" },
  { subdomain: "sushi", name: "Sushi Restaurant", category: "Restaurants" },
  { subdomain: "agave", name: "Agave Cocina", category: "Restaurants" },
  { subdomain: "catering", name: "Catering Service", category: "Restaurants" },
  { subdomain: "chispitas", name: "Chispitas Restaurant", category: "Restaurants" },

  // Health
  { subdomain: "veterinary", name: "Veterinary Clinic", category: "Health" },
  { subdomain: "dental", name: "Dental Clinic", category: "Health" },

  // Home Services
  { subdomain: "hvac", name: "HVAC", category: "Home Services" },
  { subdomain: "electrician", name: "Electrician", category: "Home Services" },
  { subdomain: "painting", name: "Painting", category: "Home Services" },
  { subdomain: "pool", name: "Pool Builder", category: "Home Services" },
  { subdomain: "interiordesign", name: "Interior Design", category: "Home Services" },

  // Automotive
  { subdomain: "carwash", name: "Car Wash", category: "Automotive" },
  { subdomain: "autodetailing", name: "Auto Detailing", category: "Automotive" },
  { subdomain: "mechanic", name: "Mechanic", category: "Automotive" },
  { subdomain: "towing", name: "Towing", category: "Automotive" },

  // Professional
  { subdomain: "lawfirm", name: "Law Firm", category: "Professional" },
  { subdomain: "insurance", name: "Insurance", category: "Professional" },
  { subdomain: "realtor", name: "Realtor", category: "Professional" },
  { subdomain: "photographer", name: "Photographer", category: "Professional" },

  // Beauty
  { subdomain: "tattoo", name: "Tattoo Shop", category: "Beauty" },
  { subdomain: "nailsalon", name: "Nail Salon", category: "Beauty" },
  { subdomain: "barber", name: "Barber Shop", category: "Beauty" },
  { subdomain: "yoga", name: "Yoga Studio", category: "Beauty" },

  // Events & Other
  { subdomain: "wedding", name: "Wedding Planner", category: "Events & Other" },
  { subdomain: "eventvenue", name: "Event Venue", category: "Events & Other" },
  { subdomain: "dj", name: "DJ Services", category: "Events & Other" },
  { subdomain: "cyber", name: "Cybersecurity", category: "Events & Other" },

  // Client Projects (custom domains)
  { name: "CornerIntel", url: "https://cornerintel.com", category: "Client Projects" },
  { name: "Fast Paving Service", url: "https://fastpavingservice.com", category: "Client Projects" },
  { name: "TRJ Construction", url: "https://trj-construction-web.vercel.app", category: "Client Projects" },
  { name: "Henry's Auto Detail", url: "https://henrys-auto-detail.vercel.app", category: "Client Projects" },
  { name: "PH Delacroix", url: "https://ph-delacroix.vercel.app", category: "Client Projects" },
  { name: "Abreme Porfa", url: "https://abreme-porfa2.vercel.app", category: "Client Projects" },
  { name: "Sunrise Contractor", url: "https://sunrise.cornerintel.com", category: "Client Projects" },
  { name: "HR Green WA", url: "https://hrgreenwa.vercel.app", category: "Client Projects" },
  { name: "Music Lessons", url: "https://music-lessons-landing.vercel.app", category: "Client Projects" },
  { name: "IT Support", url: "https://it-support-landing-theta.vercel.app", category: "Client Projects" },
];

interface DevTool {
  name: string;
  url: string;
  description: string;
}

const DEV_TOOLS: DevTool[] = [
  { name: "Shadowcraft", url: "https://shadowcraft-alpha.vercel.app", description: "CSS shadow editor" },
  { name: "Pomodoro Timer", url: "https://pomodoro-timer-ashy-ten.vercel.app", description: "Focus timer" },
  { name: "Invoice Generator", url: "https://invoice-generator-gold-eight.vercel.app", description: "Create invoices" },
  { name: "Markdown Converter", url: "https://markdown-converter-zeta.vercel.app", description: "MD to HTML" },
  { name: "JSON Formatter", url: "https://json-formatter-tau-gilt.vercel.app", description: "Format JSON" },
  { name: "Password Generator", url: "https://password-generator-eight-plum.vercel.app", description: "Secure passwords" },
  { name: "Color Palette", url: "https://color-palette-one-sepia.vercel.app", description: "Color tools" },
  { name: "SEO Meta Generator", url: "https://seo-meta-generator-one.vercel.app", description: "Meta tags" },
  { name: "Gradient Generator", url: "https://gradient-generator-blue-two.vercel.app", description: "CSS gradients" },
  { name: "Mortgage Calculator", url: "https://mortgage-calculator-eta-five.vercel.app", description: "Loan calculator" },
  { name: "Tip Calculator", url: "https://tip-calculator-eight-rose.vercel.app", description: "Tip splitter" },
  { name: "World Clock", url: "https://world-clock-azure.vercel.app", description: "Time zones" },
  { name: "Bookmark Manager", url: "https://bookmark-manager-one-sigma.vercel.app", description: "Save bookmarks" },
  { name: "Todo List", url: "https://todo-list-nine-kappa-52.vercel.app", description: "Task manager" },
  { name: "SplitEase", url: "https://splitease-eight.vercel.app", description: "Bill splitting" },
  { name: "FlexLab", url: "https://flexlab-xi.vercel.app", description: "Flexbox playground" },
  { name: "TypeFlow", url: "https://typeflow-khaki.vercel.app", description: "Typing tool" },
  { name: "QR Forge", url: "https://qrforge-kappa.vercel.app", description: "QR generator" },
  { name: "Quote Vault", url: "https://quote-vault-phi.vercel.app", description: "Quotes collection" },
  { name: "Snake Game", url: "https://snake-game-azure-one.vercel.app", description: "Classic game" },
  { name: "Expense Tracker", url: "https://expense-tracker-psi-virid.vercel.app", description: "Track expenses" },
];

const categoryColors: Record<Category, string> = {
  All: "bg-white/10 text-white",
  Restaurants: "bg-orange-500/20 text-orange-400",
  Health: "bg-green-500/20 text-green-400",
  "Home Services": "bg-yellow-500/20 text-yellow-400",
  Automotive: "bg-red-500/20 text-red-400",
  Professional: "bg-blue-500/20 text-blue-400",
  Beauty: "bg-pink-500/20 text-pink-400",
  "Events & Other": "bg-purple-500/20 text-purple-400",
  "Client Projects": "bg-cyan-500/20 text-cyan-400",
};

/** Strip the protocol from a URL for compact display. */
function displayUrl(url: string): string {
  return url.replace(/^https?:\/\//, "").replace(/\/$/, "");
}

function ProjectCard({ project }: { project: Project }) {
  const href = project.url ?? `https://${project.subdomain}.kuvoco.com`;
  const label = project.url ? displayUrl(project.url) : `${project.subdomain}.kuvoco.com`;

  return (
    <motion.a
      key={project.name}
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300"
    >
      {/* Screenshot */}
      <div className="relative aspect-video overflow-hidden">
        {project.subdomain ? (
          <Image
            src={`/portfolio/${project.subdomain}.jpg`}
            alt={`${project.name} website`}
            fill
            className="object-cover object-top transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          />
        ) : (
          <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#3B82F6]/30 via-[#0A0A0F] to-[#06B6D4]/20 transition-transform duration-500 group-hover:scale-105">
            <span className="text-xl font-bold text-white/90 px-4 text-center">
              {project.name}
            </span>
          </div>
        )}
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="flex items-center gap-1.5 text-sm text-white font-medium bg-[#3B82F6] px-4 py-2 rounded-full">
            <ExternalLink className="w-3.5 h-3.5" />
            Visit Site
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">
            {project.name}
          </h3>
          <p className="text-[#6B7280] text-xs mt-0.5 truncate">{label}</p>
        </div>
        <Badge className={`text-[10px] shrink-0 ${categoryColors[project.category]}`}>
          {project.category}
        </Badge>
      </div>
    </motion.a>
  );
}

function DevToolCard({ tool }: { tool: DevTool }) {
  return (
    <motion.a
      key={tool.name}
      href={tool.url}
      target="_blank"
      rel="noopener noreferrer"
      layout
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="group relative bg-white/[0.02] border border-white/5 rounded-xl overflow-hidden hover:border-[#3B82F6]/30 transition-all duration-300"
    >
      {/* Placeholder gradient */}
      <div className="relative aspect-video overflow-hidden">
        <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-[#06B6D4]/25 via-[#0A0A0F] to-[#3B82F6]/25 transition-transform duration-500 group-hover:scale-105">
          <span className="text-xl font-bold text-white/90 px-4 text-center">
            {tool.name}
          </span>
        </div>
        {/* Hover Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end justify-center pb-4">
          <span className="flex items-center gap-1.5 text-sm text-white font-medium bg-[#3B82F6] px-4 py-2 rounded-full">
            <ExternalLink className="w-3.5 h-3.5" />
            Open Tool
          </span>
        </div>
      </div>

      {/* Info */}
      <div className="p-4 flex items-center justify-between gap-2">
        <div className="min-w-0">
          <h3 className="text-white font-semibold text-sm truncate">{tool.name}</h3>
          <p className="text-[#6B7280] text-xs mt-0.5 truncate">{tool.description}</p>
        </div>
        <Badge className="text-[10px] shrink-0 bg-indigo-500/20 text-indigo-400">
          Dev Tools
        </Badge>
      </div>
    </motion.a>
  );
}

export default function PortfolioContent() {
  const [activeCategory, setActiveCategory] = useState<Category>("All");

  const filtered =
    activeCategory === "All"
      ? PROJECTS
      : PROJECTS.filter((p) => p.category === activeCategory);

  return (
    <section className="py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <h1 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Our Work
          </h1>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            Business websites and client projects built across every industry —
            each custom-designed, mobile-responsive, and optimized for
            performance.
          </p>
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {CATEGORIES.map((cat) => {
            const count =
              cat === "All"
                ? PROJECTS.length
                : PROJECTS.filter((p) => p.category === cat).length;
            return (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                  activeCategory === cat
                    ? "bg-[#3B82F6] text-white shadow-[0_0_20px_rgba(59,130,246,0.3)]"
                    : "bg-white/5 text-[#9CA3AF] hover:bg-white/10 hover:text-white"
                }`}
              >
                {cat} <span className="opacity-60">({count})</span>
              </button>
            );
          })}
        </div>

        {/* Grid */}
        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filtered.map((project) => (
              <ProjectCard key={project.name} project={project} />
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Developer Tools Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-24 mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
            Developer Tools
          </h2>
          <p className="text-lg text-[#9CA3AF] max-w-2xl mx-auto">
            A collection of free, web-based utilities we&apos;ve built — from
            design helpers to everyday calculators.
          </p>
        </motion.div>

        <motion.div
          layout
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          {DEV_TOOLS.map((tool) => (
            <DevToolCard key={tool.name} tool={tool} />
          ))}
        </motion.div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-center mt-16"
        >
          <p className="text-[#9CA3AF] mb-4">
            Want a website like these for your business?
          </p>
          <a
            href="/pricing"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] text-white font-medium px-8 py-3 rounded-full hover:opacity-90 transition-opacity"
          >
            Get Started
            <ExternalLink className="w-4 h-4" />
          </a>
        </motion.div>
      </div>
    </section>
  );
}
