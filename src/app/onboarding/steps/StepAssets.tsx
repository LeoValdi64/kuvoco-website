"use client";

import { Upload } from "lucide-react";

export function StepAssets() {
  return (
    <div className="flex flex-col items-center justify-center py-16 text-center">
      <Upload className="w-12 h-12 text-[#3B82F6] mb-4" />
      <h2 className="text-2xl font-bold text-white mb-2">Assets & Content</h2>
      <p className="text-[#9CA3AF]">Upload logos, images, and content for your site.</p>
    </div>
  );
}
