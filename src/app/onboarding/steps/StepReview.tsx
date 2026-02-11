"use client";

import { ClipboardCheck } from "lucide-react";

export function StepReview() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <ClipboardCheck className="w-12 h-12 text-[#3B82F6] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Review & Submit</h2>
      <p className="text-[#9CA3AF]">Review your selections and submit your project.</p>
    </div>
  );
}
