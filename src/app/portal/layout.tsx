"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { UserButton } from "@clerk/nextjs";
import {
  LayoutDashboard,
  CreditCard,
  FileText,
  PenLine,
  ChevronRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import PortalNavbar from "@/components/PortalNavbar";

const sidebarLinks = [
  {
    href: "/portal",
    label: "Dashboard",
    icon: LayoutDashboard,
  },
  {
    href: "/portal/billing",
    label: "Billing",
    icon: CreditCard,
  },
  {
    href: "/portal/invoices",
    label: "Invoices",
    icon: FileText,
  },
  {
    href: "/portal/changes",
    label: "Changes",
    icon: PenLine,
  },
];

export default function PortalLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="min-h-screen bg-[#0A0A0F]">
      <PortalNavbar />
      {/* Desktop Sidebar + Content */}
      <div className="flex">
        {/* Sidebar — Desktop */}
        <aside className="hidden md:flex w-64 flex-col min-h-[calc(100vh-4rem)] border-r border-white/5 bg-[#0A0A0F]/95 backdrop-blur-sm z-40 flex-shrink-0">
          <nav className="flex-1 px-3 py-4 space-y-1">
            {sidebarLinks.map((link) => {
              const isActive =
                pathname === link.href ||
                (link.href !== "/portal" && pathname.startsWith(link.href));
              const Icon = link.icon;
              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 group",
                    isActive
                      ? "bg-[#3B82F6]/10 text-[#3B82F6]"
                      : "text-[#9CA3AF] hover:text-white hover:bg-white/5"
                  )}
                >
                  <Icon
                    className={cn(
                      "w-4 h-4 flex-shrink-0",
                      isActive
                        ? "text-[#3B82F6]"
                        : "text-[#6B7280] group-hover:text-white"
                    )}
                  />
                  {link.label}
                  {isActive && (
                    <ChevronRight className="w-3 h-3 ml-auto text-[#3B82F6]" />
                  )}
                </Link>
              );
            })}
          </nav>

          <div className="px-4 py-4 border-t border-white/5">
            <Link
              href="/pricing"
              className="block text-xs text-[#6B7280] hover:text-[#3B82F6] transition-colors"
            >
              View Plans & Pricing
            </Link>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 min-h-[calc(100vh-5rem)] pb-20 md:pb-0">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8"
          >
            {children}
          </motion.div>
        </main>
      </div>

      {/* Mobile Bottom Nav */}
      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-[#0A0A0F]/95 backdrop-blur-sm border-t border-white/5 z-50">
        <div className="flex items-center justify-around py-2">
          {sidebarLinks.map((link) => {
            const isActive =
              pathname === link.href ||
              (link.href !== "/portal" && pathname.startsWith(link.href));
            const Icon = link.icon;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "flex flex-col items-center gap-1 px-3 py-1.5 rounded-lg text-xs font-medium transition-colors",
                  isActive
                    ? "text-[#3B82F6]"
                    : "text-[#6B7280] hover:text-white"
                )}
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </Link>
            );
          })}
          <div className="flex flex-col items-center gap-1 px-3 py-1.5">
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-5 h-5",
                },
              }}
            />
            <span className="text-xs text-[#6B7280]">Account</span>
          </div>
        </div>
      </nav>
    </div>
  );
}
