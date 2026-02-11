"use client";

import { Monitor } from "lucide-react";

export function StepCurrentSite() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Monitor className="w-12 h-12 text-[#3B82F6] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Existing Website</h2>
      <p className="text-[#9CA3AF]">Tell us about your current online presence.</p>
    </div>
  );
}
