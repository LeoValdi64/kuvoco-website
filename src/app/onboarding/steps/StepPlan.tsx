"use client";

import { Package } from "lucide-react";

export function StepPlan() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Package className="w-12 h-12 text-[#3B82F6] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Choose Your Plan</h2>
      <p className="text-[#9CA3AF]">Select the package that fits your needs.</p>
    </div>
  );
}
