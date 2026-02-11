"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@clerk/nextjs";
import { redirect } from "next/navigation";
import { OnboardingProvider } from "@/lib/onboarding/context";

export default function OnboardingLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { isSignedIn, isLoaded } = useAuth();

  if (isLoaded && !isSignedIn) {
    redirect("/sign-in?redirect_url=/onboarding");
  }

  return (
    <OnboardingProvider>
      <div className="min-h-screen bg-zinc-950">
        {/* Minimal Header */}
        <header className="border-b border-white/5 bg-zinc-950/80 backdrop-blur-xl">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/logo.png"
                alt="Kuvo Co."
                width={32}
                height={32}
                className="h-8 w-auto"
              />
              <div className="flex items-center">
                <span className="text-lg font-bold text-[#3B82F6]">Kuvo</span>
                <span className="text-lg font-normal text-[#6B7280]">Co.</span>
              </div>
            </Link>
            <Link
              href="/"
              className="text-sm text-[#6B7280] hover:text-white transition-colors"
            >
              Exit
            </Link>
          </div>
        </header>

        {/* Content */}
        <main className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {children}
        </main>
      </div>
    </OnboardingProvider>
  );
}
