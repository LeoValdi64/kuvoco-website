"use client";

import { motion, useInView } from "framer-motion";
import { Gem, Zap, Eye, Lightbulb } from "lucide-react";
import { useRef } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

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
  },
  {
    name: "Jordan Chen",
    role: "Senior Designer",
    initials: "JC",
    bio: "Creative designer specializing in user experience and brand identity for small businesses.",
  },
  {
    name: "Sam Patel",
    role: "Full-Stack Developer",
    initials: "SP",
    bio: "Expert in React and Next.js with a passion for building fast, accessible web applications.",
  },
  {
    name: "Morgan Kim",
    role: "Project Manager",
    initials: "MK",
    bio: "Dedicated to ensuring smooth project delivery and exceptional client communication.",
  },
];

function FadeInSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.6, delay }}
    >
      {children}
    </motion.div>
  );
}

export default function AboutContent() {
  return (
    <>
      <Navbar />
      <main className="bg-[#0A0A0F] min-h-screen pt-32 pb-20">
        {/* Hero Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeInSection>
            <div className="text-center">
              <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.1] mb-6">
                About{" "}
                <span className="gradient-text">Kuvo Co.</span>
              </h1>
              <p className="text-lg sm:text-xl text-[#9CA3AF] max-w-2xl mx-auto">
                Building the web for local businesses
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* Our Story Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeInSection delay={0.2}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-6">
              Our Story
            </h2>
            <div className="space-y-6 text-[#9CA3AF] leading-relaxed">
              <p className="text-lg">
                Kuvo Co. was founded with a simple mission: to help local businesses establish powerful online presences that drive real results. We saw too many talented entrepreneurs struggling with outdated websites or no web presence at all, losing potential customers to competitors with better online visibility.
              </p>
              <p className="text-lg">
                We understand the challenges small businesses face. Limited budgets, tight timelines, and the overwhelming complexity of modern web development can make it difficult to get a professional website off the ground. That&apos;s why we built Kuvo Co. — to make professional web development accessible, affordable, and remarkably fast.
              </p>
              <p className="text-lg">
                Based in Everett, WA, we&apos;ve helped over 90 local businesses transform their online presence. From restaurants and retail shops to professional services and creative studios, we bring the same level of dedication and expertise to every project, no matter the size.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* Mission Section */}
        <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeInSection delay={0.3}>
            <div className="bg-[#1A1A2E]/30 border border-white/5 rounded-2xl p-8 sm:p-12">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Our Mission
              </h2>
              <p className="text-2xl sm:text-3xl font-semibold gradient-text mb-6">
                Building the web for local businesses
              </p>
              <p className="text-lg text-[#9CA3AF] leading-relaxed">
                We believe every business deserves a stunning, high-performing website that works as hard as they do. Our mission is to make professional web development accessible and affordable for local businesses, delivering exceptional quality at speeds that matter to growing companies.
              </p>
            </div>
          </FadeInSection>
        </section>

        {/* Values Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-24">
          <FadeInSection delay={0.4}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
              Our Values
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {values.map((value, index) => {
                const Icon = value.icon;
                return (
                  <FadeInSection key={value.title} delay={0.5 + index * 0.1}>
                    <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300 h-full">
                      <CardHeader>
                        <div className="flex items-start gap-4">
                          <div className="flex-shrink-0 w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center">
                            <Icon className="w-6 h-6 text-[#3B82F6]" />
                          </div>
                          <div>
                            <CardTitle className="text-xl text-white mb-2">
                              {value.title}
                            </CardTitle>
                            <CardDescription className="text-[#9CA3AF] text-base">
                              {value.description}
                            </CardDescription>
                          </div>
                        </div>
                      </CardHeader>
                    </Card>
                  </FadeInSection>
                );
              })}
            </div>
          </FadeInSection>
        </section>

        {/* Team Section */}
        <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <FadeInSection delay={0.6}>
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-12 text-center">
              Our Team
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {team.map((member, index) => (
                <FadeInSection key={member.name} delay={0.7 + index * 0.1}>
                  <Card className="bg-[#1A1A2E]/50 border-white/5 hover:border-[#3B82F6]/30 transition-all duration-300">
                    <CardHeader>
                      <div className="flex flex-col items-center text-center">
                        <div className="w-20 h-20 rounded-full bg-gradient-to-br from-[#3B82F6] to-[#06B6D4] flex items-center justify-center mb-4">
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
                </FadeInSection>
              ))}
            </div>
          </FadeInSection>
        </section>
      </main>
      <Footer />
    </>
  );
}
