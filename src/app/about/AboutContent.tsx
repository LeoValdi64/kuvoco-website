"use client";

import { motion, useInView } from "framer-motion";
import { Gem, Zap, Eye, Lightbulb, Users, Rocket, Star, Heart, Code, Globe } from "lucide-react";
import { useRef } from "react";
import Link from "next/link";
import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

const values = [
  {
    icon: Gem,
    title: "Quality",
    description: "Every pixel matters. We craft websites with meticulous attention to detail.",
  },
  {
    icon: Zap,
    title: "Speed",
    description: "Fast delivery without compromising quality. Most sites launch within 48 hours.",
  },
  {
    icon: Eye,
    title: "Transparency",
    description: "No hidden fees, no surprises. Clear communication at every step.",
  },
  {
    icon: Lightbulb,
    title: "Innovation",
    description: "Modern technologies and best practices for future-proof websites.",
  },
];

const team = [
  {
    name: "Alex Rivera",
    role: "Founder & Lead Developer",
    initials: "AR",
    bio: "Full-stack developer with 8+ years of experience building web solutions for local businesses.",
    gradient: "from-[#3B82F6] to-[#8B5CF6]",
  },
  {
    name: "Jordan Chen",
    role: "Senior Designer",
    initials: "JC",
    bio: "Creative designer specializing in user experience and brand identity for small businesses.",
    gradient: "from-[#06B6D4] to-[#3B82F6]",
  },
  {
    name: "Sam Patel",
    role: "Full-Stack Developer",
    initials: "SP",
    bio: "Expert in React and Next.js with a passion for building fast, accessible web applications.",
    gradient: "from-[#8B5CF6] to-[#EC4899]",
  },
  {
    name: "Morgan Kim",
    role: "Project Manager",
    initials: "MK",
    bio: "Dedicated to ensuring smooth project delivery and exceptional client communication.",
    gradient: "from-[#F59E0B] to-[#EF4444]",
  },
];

const stats = [
  { icon: Users, number: "90+", label: "Sites Launched" },
  { icon: Rocket, number: "48hr", label: "Delivery" },
  { icon: Star, number: "4.9", label: "Rating" },
  { icon: Heart, number: "100%", label: "Satisfaction" },
];

function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.25, delay }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function AboutContent() {
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
              About{" "}
              <span className="gradient-text">Kuvo Co.</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#9CA3AF] max-w-2xl mx-auto">
              Building the web for local businesses
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Stats Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeIn delay={0.1}>
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, index) => {
              const Icon = stat.icon;
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, scale: 0.9 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.25, delay: index * 0.05 }}
                  className="bg-[#1A1A2E]/30 border border-white/5 rounded-2xl p-6 text-center hover:border-[#3B82F6]/30 transition-all duration-300"
                >
                  <Icon className="w-8 h-8 text-[#3B82F6] mx-auto mb-3" />
                  <div className="text-3xl sm:text-4xl font-bold gradient-text mb-2">
                    {stat.number}
                  </div>
                  <div className="text-[#9CA3AF] text-sm font-medium">
                    {stat.label}
                  </div>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Our Story Section — with visual element on right */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeIn delay={0.2}>
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
                Our Story
              </h2>
              <div className="space-y-5 text-[#9CA3AF] leading-relaxed">
                <p className="text-lg">
                  Kuvo Co. was founded with a simple mission: to help local businesses establish powerful online presences that drive real results. We saw too many talented entrepreneurs struggling with outdated websites or no web presence at all.
                </p>
                <p className="text-lg">
                  We understand the challenges small businesses face. Limited budgets, tight timelines, and the overwhelming complexity of modern web development. That&apos;s why we built Kuvo Co. — to make professional web development accessible, affordable, and remarkably fast.
                </p>
                <p className="text-lg">
                  Based in Everett, WA, we&apos;ve helped over 90 local businesses transform their online presence. From restaurants and retail shops to professional services and creative studios.
                </p>
              </div>
            </div>

            {/* Visual Element */}
            <div className="relative">
              <div className="bg-[#1A1A2E]/50 border border-white/5 rounded-2xl p-8 relative overflow-hidden">
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#06B6D4]/10 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                      <Globe className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Our Mission</h3>
                      <p className="text-sm text-[#9CA3AF]">Building the web for local businesses</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center">
                      <Code className="w-6 h-6 text-[#06B6D4]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">Modern Stack</h3>
                      <p className="text-sm text-[#9CA3AF]">React, Next.js, TypeScript</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center">
                      <Rocket className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">48hr Delivery</h3>
                      <p className="text-sm text-[#9CA3AF]">Most sites launch in just 2 days</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center">
                      <Star className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold">4.9 Star Rating</h3>
                      <p className="text-sm text-[#9CA3AF]">Trusted by 90+ businesses</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </FadeIn>
      </section>

      {/* Values Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeIn delay={0.3}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
            Our Values
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 h-full group">
                    <CardHeader>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-14 h-14 rounded-xl bg-[#3B82F6]/10 group-hover:bg-gradient-to-br group-hover:from-[#3B82F6]/20 group-hover:to-[#06B6D4]/20 flex items-center justify-center transition-all duration-300 mb-4">
                          <Icon className="w-7 h-7 text-[#3B82F6]" />
                        </div>
                        <CardTitle className="text-lg text-white mb-2">
                          {value.title}
                        </CardTitle>
                        <CardDescription className="text-[#9CA3AF] text-sm">
                          {value.description}
                        </CardDescription>
                      </div>
                    </CardHeader>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </FadeIn>
      </section>

      {/* Team Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <FadeIn delay={0.4}>
          <h2 className="text-3xl sm:text-4xl font-bold text-white mb-10 text-center">
            Our Team
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {team.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
              >
                <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 group hover:scale-[1.02]">
                  <CardHeader>
                    <div className="flex flex-col items-center text-center">
                      <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${member.gradient} flex items-center justify-center mb-4 group-hover:shadow-lg group-hover:shadow-[#3B82F6]/20 transition-all duration-300`}>
                        <span className="text-2xl font-bold text-white">
                          {member.initials}
                        </span>
                      </div>
                      <CardTitle className="text-lg text-white mb-1">
                        {member.name}
                      </CardTitle>
                      <p className="text-sm text-[#3B82F6] mb-3">
                        {member.role}
                      </p>
                      <CardDescription className="text-[#9CA3AF] text-sm">
                        {member.bio}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              </motion.div>
            ))}
          </div>
        </FadeIn>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.5}>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/80 to-[#1A1A2E]/40 border border-white/10 rounded-3xl p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Want to Work With Us?
              </h2>
              <p className="text-lg text-[#9CA3AF] mb-8 max-w-2xl mx-auto">
                Let&apos;s build something amazing together. Get in touch with our team to discuss your next website.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link href="/contact">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg"
                  >
                    Get Started
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
