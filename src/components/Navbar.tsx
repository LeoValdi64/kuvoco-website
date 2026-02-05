"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Menu } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Services", href: "/services" },
  { label: "Portfolio", href: "/portfolio" },
  { label: "Pricing", href: "/pricing" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <motion.nav
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.3, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <Image
              src="/logo.png"
              alt="Kuvo Co. logo"
              width={36}
              height={36}
              className="h-9 w-auto"
            />
            <div className="flex items-center gap-0.5">
              <span className="text-xl font-bold tracking-tight text-[#3B82F6]">
                KUVO
              </span>
              <span className="text-xl font-normal tracking-tight text-[#6B7280]">
                CO.
              </span>
            </div>
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={`text-sm transition-colors duration-200 ${
                  pathname === link.href
                    ? "text-[#3B82F6]"
                    : "text-[#9CA3AF] hover:text-white"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden md:block">
            <Button
              asChild
              className="px-5 py-2.5 text-sm font-medium bg-[#3B82F6] hover:bg-[#2563EB] rounded-lg transition-all duration-200 hover:shadow-[0_0_20px_rgba(59,130,246,0.3)]"
            >
              <Link href="/contact">Get Started</Link>
            </Button>
          </div>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="md:hidden p-2 text-[#9CA3AF] hover:text-white hover:bg-transparent"
              >
                <Menu size={22} />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="bg-[#0A0A0F] border-l border-white/5"
            >
              <SheetHeader>
                <SheetTitle className="sr-only">Menu</SheetTitle>
              </SheetHeader>
              <div className="flex flex-col gap-4 mt-8">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setIsOpen(false)}
                    className={`text-sm transition-colors py-2 ${
                      pathname === link.href
                        ? "text-[#3B82F6]"
                        : "text-[#9CA3AF] hover:text-white"
                    }`}
                  >
                    {link.label}
                  </Link>
                ))}
                <Button
                  asChild
                  className="w-full mt-4 bg-[#3B82F6] hover:bg-[#2563EB] text-white"
                  onClick={() => setIsOpen(false)}
                >
                  <Link href="/contact">Get Started</Link>
                </Button>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </motion.nav>
  );
}
