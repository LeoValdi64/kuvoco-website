"use client";

import { Globe } from "lucide-react";

export function StepDomain() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Globe className="w-12 h-12 text-[#3B82F6] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Domain Setup</h2>
      <p className="text-[#9CA3AF]">Choose how you want to handle your domain.</p>
    </div>
  );
}
