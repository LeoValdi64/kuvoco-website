"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";

const links = [
  { label: "Services", href: "/#services" },
  { label: "Work", href: "/#work" },
  { label: "Process", href: "/#process" },
  { label: "Pricing", href: "/#pricing" },
  { label: "FAQ", href: "/#faq" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  useEffect(() => {
    const desktop = window.matchMedia("(min-width: 768px)");
    const closeMenuOnDesktop = (event: MediaQueryListEvent) => {
      if (event.matches) setOpen(false);
    };

    desktop.addEventListener("change", closeMenuOnDesktop);
    return () => desktop.removeEventListener("change", closeMenuOnDesktop);
  }, []);

  return (
    <header className={`fixed inset-x-0 top-0 z-50 border-b transition ${scrolled || open ? "border-white/10 bg-[#080b12]/90 backdrop-blur-xl" : "border-transparent bg-transparent"}`}>
      <nav className="mx-auto flex h-18 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8" aria-label="Main navigation">
        <Link href="/" className="flex items-center gap-2 rounded-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300" onClick={() => setOpen(false)}>
          <Image src="/logo.png" alt="" width={34} height={34} className="h-8 w-8" priority />
          <span className="text-lg font-bold tracking-tight">Kuvoco</span>
        </Link>

        <div className="hidden items-center gap-7 md:flex">
          {links.map((link) => (
            <Link key={link.href} href={link.href} className="rounded-sm text-sm text-slate-400 transition hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
              {link.label}
            </Link>
          ))}
          <Button asChild className="bg-cyan-500 text-slate-950 hover:bg-cyan-400">
            <Link href="/contact">Request a preview</Link>
          </Button>
        </div>

        <button
          type="button"
          className="rounded-lg border border-white/10 p-2 text-slate-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300 md:hidden"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen((value) => !value)}
        >
          {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </nav>

      {open && (
        <div className="border-t border-white/10 bg-[#080b12] px-4 pb-8 pt-5 md:hidden">
          <div className="grid gap-2">
            {links.map((link) => (
              <Link key={link.href} href={link.href} onClick={() => setOpen(false)} className="rounded-lg px-3 py-3 text-slate-300 hover:bg-white/5 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300">
                {link.label}
              </Link>
            ))}
            <Button asChild className="mt-3 bg-cyan-500 text-slate-950 hover:bg-cyan-400">
              <Link href="/contact" onClick={() => setOpen(false)}>Request a preview</Link>
            </Button>
          </div>
        </div>
      )}
    </header>
  );
}
