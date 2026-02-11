"use client";

import { Sparkles } from "lucide-react";

export function StepVision() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Sparkles className="w-12 h-12 text-[#3B82F6] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Your Vision</h2>
      <p className="text-[#9CA3AF]">Describe your ideal website style and features.</p>
    </div>
  );
}
