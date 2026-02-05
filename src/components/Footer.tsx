import Link from "next/link";
import Image from "next/image";
import { Github, Twitter, Linkedin, Instagram } from "lucide-react";

const footerLinks = {
  services: [
    { label: "Web Design", href: "/services" },
    { label: "Web Development", href: "/services" },
    { label: "Maintenance", href: "/pricing" },
    { label: "SEO", href: "/services" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Portfolio", href: "/portfolio" },
    { label: "Pricing", href: "/pricing" },
    { label: "Contact", href: "/contact" },
  ],
};

const socials = [
  { icon: Twitter, href: "#", label: "Twitter" },
  { icon: Instagram, href: "#", label: "Instagram" },
  { icon: Linkedin, href: "#", label: "LinkedIn" },
  { icon: Github, href: "#", label: "GitHub" },
];

export default function Footer() {
  return (
    <footer className="border-t border-white/5 bg-[#0A0A0F]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        {/* Mobile Layout */}
        <div className="md:hidden">
          {/* Brand + Socials */}
          <div className="flex items-center justify-between mb-8">
            <Link href="/" className="inline-flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Kuvo Co. logo"
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <div className="flex items-center">
                <span className="text-lg font-bold tracking-tight text-[#3B82F6]">
                  Kuvo
                </span>
                <span className="text-lg font-normal tracking-tight text-[#6B7280]">
                  Co.
                </span>
              </div>
            </Link>
            <div className="flex gap-2">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="w-8 h-8 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#6B7280] hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-all duration-200"
                >
                  <social.icon size={14} />
                </a>
              ))}
            </div>
          </div>

          {/* 2-Column Links Grid */}
          <div className="grid grid-cols-2 gap-x-8 gap-y-6 mb-8">
            {/* Services */}
            <div>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                Services
              </h4>
              <ul className="space-y-2">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-xs font-semibold text-white/60 uppercase tracking-wider mb-3">
                Company
              </h4>
              <ul className="space-y-2">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#9CA3AF] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Contact Row */}
          <div className="flex flex-wrap items-center gap-x-6 gap-y-2 text-sm text-[#6B7280] mb-6">
            <a href="mailto:hello@kuvoco.com" className="hover:text-white transition-colors">
              hello@kuvoco.com
            </a>
            <span>Everett, WA</span>
          </div>

          {/* Bottom bar */}
          <div className="pt-6 border-t border-white/5 flex flex-col gap-3">
            <p className="text-xs text-[#6B7280]">
              &copy; 2026 Kuvo Co. All rights reserved.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-xs text-[#6B7280] hover:text-white transition-colors">
                Privacy
              </a>
              <a href="#" className="text-xs text-[#6B7280] hover:text-white transition-colors">
                Terms
              </a>
            </div>
          </div>
        </div>

        {/* Desktop Layout */}
        <div className="hidden md:block">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
            {/* Brand */}
            <div className="lg:col-span-1">
              <Link href="/" className="inline-flex items-center gap-2 mb-4">
                <Image
                  src="/logo.png"
                  alt="Kuvo Co. logo"
                  width={36}
                  height={36}
                  className="h-9 w-auto"
                />
                <div className="flex items-center">
                  <span className="text-xl font-bold tracking-tight text-[#3B82F6]">
                    Kuvo
                  </span>
                  <span className="text-xl font-normal tracking-tight text-[#6B7280]">
                    Co.
                  </span>
                </div>
              </Link>
              <p className="text-sm text-[#6B7280] leading-relaxed mb-6 max-w-xs">
                Professional websites for local businesses. Built fast. Built
                right.
              </p>
              {/* Social Links */}
              <div className="flex gap-3">
                {socials.map((social) => (
                  <a
                    key={social.label}
                    href={social.href}
                    aria-label={social.label}
                    className="w-9 h-9 rounded-lg bg-white/5 border border-white/5 flex items-center justify-center text-[#6B7280] hover:text-[#3B82F6] hover:border-[#3B82F6]/30 transition-all duration-200"
                  >
                    <social.icon size={16} />
                  </a>
                ))}
              </div>
            </div>

            {/* Services */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Services</h4>
              <ul className="space-y-3">
                {footerLinks.services.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B7280] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Company */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Company</h4>
              <ul className="space-y-3">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6B7280] hover:text-white transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="text-sm font-semibold text-white mb-4">Contact</h4>
              <ul className="space-y-3">
                <li>
                  <a
                    href="mailto:hello@kuvoco.com"
                    className="text-sm text-[#6B7280] hover:text-white transition-colors"
                  >
                    hello@kuvoco.com
                  </a>
                </li>
                <li className="text-sm text-[#6B7280]">Everett, WA</li>
              </ul>
            </div>
          </div>

          {/* Bottom bar */}
          <div className="mt-12 pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-[#6B7280]">
              &copy; 2026 Kuvo Co. All rights reserved.
            </p>
            <div className="flex gap-6">
              <a
                href="#"
                className="text-xs text-[#6B7280] hover:text-white transition-colors"
              >
                Privacy Policy
              </a>
              <a
                href="#"
                className="text-xs text-[#6B7280] hover:text-white transition-colors"
              >
                Terms of Service
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
