"use client";

import { useState, FormEvent } from "react";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Clock } from "lucide-react";
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
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { cn } from "@/lib/utils";

export default function ContactContent() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    businessType: "",
    budgetRange: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Reset form after 5 seconds
    setTimeout(() => {
      setIsSubmitted(false);
      setFormData({
        name: "",
        email: "",
        phone: "",
        businessType: "",
        budgetRange: "",
        message: "",
      });
    }, 5000);
  };

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 },
  };

  return (
    <main className="min-h-screen bg-[#0A0A0F] pt-32 pb-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero Section */}
        <motion.div {...fadeInUp} className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
            <span className="gradient-text">Get In Touch</span>
          </h1>
          <p className="text-lg md:text-xl text-[#9CA3AF] max-w-2xl mx-auto">
            Ready to launch your business online? Let&apos;s talk about your
            project.
          </p>
        </motion.div>

        {/* Two Column Layout */}
        <div className="grid lg:grid-cols-3 gap-12">
          {/* Contact Form - Left Side (2/3 width) */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.1, duration: 0.5 }}
            className="lg:col-span-2"
          >
            {isSubmitted ? (
              <Card className="bg-[#1A1A2E]/30 backdrop-blur-xl border-white/10 p-8 text-center">
                <div className="flex flex-col items-center justify-center py-12">
                  <div className="w-16 h-16 bg-[#3B82F6]/10 rounded-full flex items-center justify-center mb-4">
                    <Mail className="w-8 h-8 text-[#3B82F6]" />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-2">
                    Thank You!
                  </h3>
                  <p className="text-[#9CA3AF]">
                    We&apos;ve received your message and will get back to you
                    within 24 hours.
                  </p>
                </div>
              </Card>
            ) : (
              <div className="bg-[#1A1A2E]/30 backdrop-blur-xl border border-white/10 rounded-2xl p-8 sm:p-10">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Name Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="name"
                      className="text-sm font-medium text-[#E5E7EB]"
                    >
                      Full Name
                    </Label>
                    <Input
                      id="name"
                      type="text"
                      required
                      placeholder="John Smith"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="bg-[#1A1A2E] border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                    />
                  </div>

                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="email"
                      className="text-sm font-medium text-[#E5E7EB]"
                    >
                      Email Address
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      required
                      placeholder="john@business.com"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="bg-[#1A1A2E] border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                    />
                  </div>

                  {/* Phone Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="phone"
                      className="text-sm font-medium text-[#E5E7EB]"
                    >
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      type="tel"
                      placeholder="(555) 123-4567"
                      value={formData.phone}
                      onChange={(e) =>
                        setFormData({ ...formData, phone: e.target.value })
                      }
                      className="bg-[#1A1A2E] border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                    />
                  </div>

                  {/* Business Type Select */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="businessType"
                      className="text-sm font-medium text-[#E5E7EB]"
                    >
                      Business Type
                    </Label>
                    <Select
                      value={formData.businessType}
                      onValueChange={(value) =>
                        setFormData({ ...formData, businessType: value })
                      }
                    >
                      <SelectTrigger
                        id="businessType"
                        className="bg-[#1A1A2E] border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all data-[placeholder]:text-[#6B7280]"
                      >
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A2E] border-white/10">
                        <SelectItem
                          value="restaurant"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Restaurant
                        </SelectItem>
                        <SelectItem
                          value="healthcare"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Healthcare
                        </SelectItem>
                        <SelectItem
                          value="home-services"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Home Services
                        </SelectItem>
                        <SelectItem
                          value="automotive"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Automotive
                        </SelectItem>
                        <SelectItem
                          value="professional-services"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Professional Services
                        </SelectItem>
                        <SelectItem
                          value="retail"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Retail
                        </SelectItem>
                        <SelectItem
                          value="other"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Other
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Budget Range Select */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="budgetRange"
                      className="text-sm font-medium text-[#E5E7EB]"
                    >
                      Budget Range
                    </Label>
                    <Select
                      value={formData.budgetRange}
                      onValueChange={(value) =>
                        setFormData({ ...formData, budgetRange: value })
                      }
                    >
                      <SelectTrigger
                        id="budgetRange"
                        className="bg-[#1A1A2E] border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all data-[placeholder]:text-[#6B7280]"
                      >
                        <SelectValue placeholder="Select your budget range" />
                      </SelectTrigger>
                      <SelectContent className="bg-[#1A1A2E] border-white/10">
                        <SelectItem
                          value="starter"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Starter ($399)
                        </SelectItem>
                        <SelectItem
                          value="business"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Business ($699)
                        </SelectItem>
                        <SelectItem
                          value="professional"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Professional ($999)
                        </SelectItem>
                        <SelectItem
                          value="custom"
                          className="text-white hover:bg-white/10 focus:bg-white/10"
                        >
                          Custom (Let&apos;s Talk)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Message Field */}
                  <div className="space-y-2">
                    <Label
                      htmlFor="message"
                      className="text-sm font-medium text-[#E5E7EB]"
                    >
                      Message
                    </Label>
                    <Textarea
                      id="message"
                      required
                      placeholder="Tell us about your project..."
                      rows={5}
                      value={formData.message}
                      onChange={(e) =>
                        setFormData({ ...formData, message: e.target.value })
                      }
                      className="bg-[#1A1A2E] border-[#3B82F6]/20 rounded-lg px-4 py-3 text-white placeholder:text-[#6B7280] focus:border-[#3B82F6] focus:ring-2 focus:ring-[#3B82F6]/20 transition-all"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:from-[#2563EB] hover:to-[#0891B2] text-white font-semibold py-3 rounded-lg transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.3)]"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            )}
          </motion.div>

          {/* Company Info Sidebar - Right Side (1/3 width) */}
          <motion.div
            {...fadeInUp}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="lg:col-span-1 space-y-6"
          >
            {/* Email Card */}
            <Card className="bg-[#1A1A2E]/50 border-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Mail className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Email Us</h3>
                  <a
                    href="mailto:hello@kuvoco.com"
                    className="text-[#9CA3AF] hover:text-[#3B82F6] transition-colors text-sm"
                  >
                    hello@kuvoco.com
                  </a>
                </div>
              </div>
            </Card>

            {/* Location Card */}
            <Card className="bg-[#1A1A2E]/50 border-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center shrink-0">
                  <MapPin className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Our Location
                  </h3>
                  <p className="text-[#9CA3AF] text-sm">Everett, WA</p>
                </div>
              </div>
            </Card>

            {/* Phone Card */}
            <Card className="bg-[#1A1A2E]/50 border-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Phone className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">Call Us</h3>
                  <a
                    href="tel:+14255550123"
                    className="text-[#9CA3AF] hover:text-[#3B82F6] transition-colors text-sm"
                  >
                    (425) 555-0123
                  </a>
                </div>
              </div>
            </Card>

            {/* Hours Card */}
            <Card className="bg-[#1A1A2E]/50 border-white/5 p-6">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 bg-[#3B82F6]/10 rounded-lg flex items-center justify-center shrink-0">
                  <Clock className="w-6 h-6 text-[#3B82F6]" />
                </div>
                <div>
                  <h3 className="text-white font-semibold mb-1">
                    Business Hours
                  </h3>
                  <p className="text-[#9CA3AF] text-sm">
                    Mon-Fri: 9am - 6pm PST
                  </p>
                </div>
              </div>
            </Card>
          </motion.div>
        </div>

        {/* Bottom Section */}
        <motion.div
          {...fadeInUp}
          transition={{ delay: 0.3, duration: 0.5 }}
          className="text-center mt-16"
        >
          <p className="text-[#9CA3AF] text-sm">
            We typically respond within 24 hours.
          </p>
        </motion.div>
      </div>
    </main>
  );
}
