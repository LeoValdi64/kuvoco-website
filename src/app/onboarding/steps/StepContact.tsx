"use client";

import { MessageSquare } from "lucide-react";

export function StepContact() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <MessageSquare className="w-12 h-12 text-[#3B82F6] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Communication</h2>
      <p className="text-[#9CA3AF]">How would you like us to stay in touch?</p>
    </div>
  );
}
