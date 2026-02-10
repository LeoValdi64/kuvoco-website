"use client";

import Link from "next/link";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";
import { UserButton } from "@clerk/nextjs";

export default function PortalNavbar() {
  return (
    <nav className="w-full bg-[#0A0A0F]/80 backdrop-blur-xl border-b border-white/5">
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
            <div className="flex items-center">
              <span className="text-xl font-bold tracking-tight text-[#3B82F6]">
                Kuvo
              </span>
              <span className="text-xl font-normal tracking-tight text-[#6B7280]">
                Co.
              </span>
            </div>
          </Link>

          {/* Right side: Back to site + UserButton */}
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="flex items-center gap-1.5 text-sm text-[#9CA3AF] hover:text-white transition-colors duration-200"
            >
              <ArrowLeft className="w-4 h-4" />
              <span className="hidden sm:inline">Back to site</span>
            </Link>
            <div className="w-px h-5 bg-white/10" />
            <UserButton
              appearance={{
                elements: {
                  avatarBox: "w-8 h-8",
                },
              }}
            />
          </div>
        </div>
      </div>
    </nav>
  );
}
