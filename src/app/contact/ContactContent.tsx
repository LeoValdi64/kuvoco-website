"use client";

import { motion, useInView } from "framer-motion";
import { Mail, MapPin, Phone, Clock, ArrowRight } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";

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

export default function ContactContent() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    businessType: "",
    budgetRange: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setIsSubmitted(true);
    setIsSubmitting(false);
  };

  const handleChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

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
              Get In{" "}
              <span className="gradient-text">Touch</span>
            </h1>
            <p className="text-xl sm:text-2xl text-[#9CA3AF] max-w-2xl mx-auto">
              Ready to launch your business online? Let&apos;s talk about your project.
            </p>
          </div>
        </FadeIn>
      </section>

      {/* Two Column Layout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side - Contact Form (2/3 width) */}
          <FadeIn delay={0.1} className="lg:col-span-2">
            <div className="relative bg-[#1A1A2E]/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10 overflow-hidden">
              {/* Gradient blur blobs */}
              <div className="absolute top-0 right-0 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#06B6D4]/10 rounded-full blur-3xl" />

              <div className="relative z-10">
                {!isSubmitted ? (
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                      <Label htmlFor="fullName" className="text-white text-sm font-medium mb-2 block">
                        Full Name
                      </Label>
                      <Input
                        id="fullName"
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleChange("fullName", e.target.value)}
                        placeholder="John Doe"
                        className="bg-[#111827] border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-white text-sm font-medium mb-2 block">
                        Email Address
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => handleChange("email", e.target.value)}
                        placeholder="john@example.com"
                        className="bg-[#111827] border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="phone" className="text-white text-sm font-medium mb-2 block">
                        Phone Number
                      </Label>
                      <Input
                        id="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleChange("phone", e.target.value)}
                        placeholder="(425) 555-0123"
                        className="bg-[#111827] border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                      />
                    </div>

                    <div>
                      <Label htmlFor="businessType" className="text-white text-sm font-medium mb-2 block">
                        Business Type
                      </Label>
                      <Select
                        value={formData.businessType}
                        onValueChange={(value) => handleChange("businessType", value)}
                      >
                        <SelectTrigger
                          id="businessType"
                          className="w-full bg-[#111827] border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                        >
                          <SelectValue placeholder="Select your business type" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="restaurant">Restaurant</SelectItem>
                          <SelectItem value="healthcare">Healthcare</SelectItem>
                          <SelectItem value="home-services">Home Services</SelectItem>
                          <SelectItem value="automotive">Automotive</SelectItem>
                          <SelectItem value="professional-services">Professional Services</SelectItem>
                          <SelectItem value="retail">Retail</SelectItem>
                          <SelectItem value="other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="budgetRange" className="text-white text-sm font-medium mb-2 block">
                        Budget Range
                      </Label>
                      <Select
                        value={formData.budgetRange}
                        onValueChange={(value) => handleChange("budgetRange", value)}
                      >
                        <SelectTrigger
                          id="budgetRange"
                          className="w-full bg-[#111827] border-white/10 rounded-lg px-4 py-3 text-white focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30"
                        >
                          <SelectValue placeholder="Select your budget range" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="starter">Starter ($399)</SelectItem>
                          <SelectItem value="business">Business ($699)</SelectItem>
                          <SelectItem value="professional">Professional ($999)</SelectItem>
                          <SelectItem value="custom">Custom (Let&apos;s Talk)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="message" className="text-white text-sm font-medium mb-2 block">
                        Message
                      </Label>
                      <Textarea
                        id="message"
                        required
                        rows={5}
                        value={formData.message}
                        onChange={(e) => handleChange("message", e.target.value)}
                        placeholder="Tell us about your project..."
                        className="bg-[#111827] border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/30 resize-none"
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] text-white font-semibold px-8 py-6 text-lg rounded-lg transition-all duration-300"
                    >
                      {isSubmitting ? "Sending..." : "Send Message"}
                    </Button>
                  </form>
                ) : (
                  <Card className="bg-[#1A1A2E]/50 border-white/5 p-8 text-center">
                    <div className="w-16 h-16 rounded-full bg-[#3B82F6]/10 flex items-center justify-center mx-auto mb-4">
                      <Mail className="w-8 h-8 text-[#3B82F6]" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Thank You!</h3>
                    <p className="text-[#9CA3AF] mb-6">
                      We&apos;ve received your message and will get back to you within 24 hours.
                    </p>
                    <Button
                      onClick={() => setIsSubmitted(false)}
                      variant="outline"
                      className="border-white/20 hover:bg-white/5 text-white"
                    >
                      Send Another Message
                    </Button>
                  </Card>
                )}
              </div>
            </div>
          </FadeIn>

          {/* Right Side - Contact Info (1/3 width) */}
          <div className="space-y-6">
            <FadeIn delay={0.2}>
              <div className="relative bg-[#1A1A2E]/50 border border-white/5 rounded-2xl p-8 overflow-hidden">
                {/* Gradient blur blobs */}
                <div className="absolute top-0 right-0 w-40 h-40 bg-[#3B82F6]/10 rounded-full blur-3xl" />
                <div className="absolute bottom-0 left-0 w-40 h-40 bg-[#06B6D4]/10 rounded-full blur-3xl" />

                <div className="relative z-10 space-y-6">
                  {/* Email */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#3B82F6]/10 flex items-center justify-center flex-shrink-0">
                      <Mail className="w-6 h-6 text-[#3B82F6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Email Us</h3>
                      <a
                        href="mailto:hello@kuvoco.com"
                        className="text-sm text-[#9CA3AF] hover:text-[#3B82F6] transition-colors"
                      >
                        hello@kuvoco.com
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Location */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#06B6D4]/10 flex items-center justify-center flex-shrink-0">
                      <MapPin className="w-6 h-6 text-[#06B6D4]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Our Location</h3>
                      <p className="text-sm text-[#9CA3AF]">Everett, WA</p>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Phone */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#8B5CF6]/10 flex items-center justify-center flex-shrink-0">
                      <Phone className="w-6 h-6 text-[#8B5CF6]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Call Us</h3>
                      <a
                        href="tel:+14255550123"
                        className="text-sm text-[#9CA3AF] hover:text-[#8B5CF6] transition-colors"
                      >
                        (425) 555-0123
                      </a>
                    </div>
                  </div>

                  <div className="h-px bg-white/5" />

                  {/* Business Hours */}
                  <div className="flex items-start gap-4">
                    <div className="w-12 h-12 rounded-lg bg-[#F59E0B]/10 flex items-center justify-center flex-shrink-0">
                      <Clock className="w-6 h-6 text-[#F59E0B]" />
                    </div>
                    <div>
                      <h3 className="text-white font-semibold mb-1">Business Hours</h3>
                      <p className="text-sm text-[#9CA3AF]">Mon-Fri: 9am - 6pm PST</p>
                    </div>
                  </div>
                </div>
              </div>
            </FadeIn>

            {/* Quick Quote CTA */}
            <FadeIn delay={0.3}>
              <div className="relative bg-gradient-to-br from-[#3B82F6]/10 to-[#06B6D4]/10 border border-[#3B82F6]/20 rounded-2xl p-6 overflow-hidden">
                <h3 className="text-white font-semibold mb-2">Need a Quick Quote?</h3>
                <p className="text-sm text-[#9CA3AF] mb-4">
                  Check out our transparent pricing plans to see what fits your needs.
                </p>
                <Link href="/pricing">
                  <Button className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] text-white font-semibold">
                    View Pricing
                    <ArrowRight className="w-4 h-4 ml-2" />
                  </Button>
                </Link>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <FadeIn delay={0.4}>
          <div className="relative overflow-hidden bg-gradient-to-br from-[#1A1A2E]/80 to-[#1A1A2E]/40 border border-white/10 rounded-3xl p-12 text-center">
            <div className="absolute top-0 right-0 w-64 h-64 bg-[#3B82F6]/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#06B6D4]/10 rounded-full blur-3xl translate-y-1/2 -translate-x-1/2" />

            <div className="relative z-10">
              <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Let&apos;s Build Something Amazing
              </h2>
              <p className="text-lg text-[#9CA3AF] mb-6 max-w-2xl mx-auto">
                From concept to launch, we&apos;re here to help your business succeed online.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
                <Link href="/templates">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white font-semibold px-8 py-6 text-lg"
                  >
                    Browse Templates
                  </Button>
                </Link>
                <Link href="/pricing">
                  <Button
                    size="lg"
                    variant="outline"
                    className="border-white/20 hover:bg-white/5 text-white font-semibold px-8 py-6 text-lg"
                  >
                    See Pricing
                  </Button>
                </Link>
              </div>
              <p className="text-sm text-[#6B7280]">
                We typically respond within 24 hours.
              </p>
            </div>
          </div>
        </FadeIn>
      </section>
    </main>
  );
}
