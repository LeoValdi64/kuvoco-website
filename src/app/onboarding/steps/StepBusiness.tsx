"use client";

import { useState } from "react";
import {
  Building2,
  MapPin,
  Phone,
  Mail,
  Plus,
  Trash2,
  Mic,
  Globe,
} from "lucide-react";
import { useOnboarding } from "@/lib/onboarding/context";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const INDUSTRIES = [
  "Restaurant",
  "Construction",
  "Medical",
  "Professional Services",
  "Beauty",
  "Automotive",
  "Education",
  "Real Estate",
  "Fitness",
  "Retail",
  "Technology",
  "Non-Profit",
  "Other",
] as const;

const SOCIAL_PLATFORMS = [
  "Facebook",
  "Instagram",
  "Twitter / X",
  "LinkedIn",
  "TikTok",
  "YouTube",
  "Pinterest",
  "Yelp",
  "Other",
] as const;

export function StepBusiness() {
  const { data, updateData } = useOnboarding();
  const [newPlatform, setNewPlatform] = useState("");
  const [newUrl, setNewUrl] = useState("");

  const descriptionLength = data.description.length;

  function addSocialMedia() {
    if (!newPlatform || !newUrl) return;
    updateData({
      socialMedia: [...data.socialMedia, { platform: newPlatform, url: newUrl }],
    });
    setNewPlatform("");
    setNewUrl("");
  }

  function removeSocialMedia(index: number) {
    updateData({
      socialMedia: data.socialMedia.filter((_, i) => i !== index),
    });
  }

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20">
          <Building2 className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">
            Business Information
          </h2>
          <p className="text-sm text-zinc-400">
            Tell us about your business so we can build the perfect site.
          </p>
        </div>
      </div>

      {/* Business Name & Industry — 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="businessName" className="text-zinc-300">
            Business Name <span className="text-red-400">*</span>
          </Label>
          <Input
            id="businessName"
            placeholder="Acme Corp"
            value={data.businessName}
            onChange={(e) => updateData({ businessName: e.target.value })}
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="industry" className="text-zinc-300">
            Industry
          </Label>
          <Select
            value={data.industry}
            onValueChange={(value) => updateData({ industry: value })}
          >
            <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
              <SelectValue placeholder="Select your industry" />
            </SelectTrigger>
            <SelectContent className="bg-zinc-900 border-zinc-700">
              {INDUSTRIES.map((industry) => (
                <SelectItem
                  key={industry}
                  value={industry}
                  className="text-zinc-200 focus:bg-zinc-800 focus:text-white"
                >
                  {industry}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <div className="flex items-center justify-between">
          <Label htmlFor="description" className="text-zinc-300">
            Business Description
          </Label>
          <span
            className={`text-xs ${
              descriptionLength > 500 ? "text-red-400" : "text-zinc-500"
            }`}
          >
            {descriptionLength}/500
          </span>
        </div>
        <Textarea
          id="description"
          placeholder="Briefly describe what your business does, who your customers are, and what makes you unique..."
          value={data.description}
          onChange={(e) => {
            if (e.target.value.length <= 500) {
              updateData({ description: e.target.value });
            }
          }}
          rows={4}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Location & Phone — 2-col grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="location" className="text-zinc-300">
            <MapPin className="inline w-4 h-4 mr-1 text-zinc-500" />
            Location
          </Label>
          <Input
            id="location"
            placeholder="City, State or Full Address"
            value={data.location}
            onChange={(e) => updateData({ location: e.target.value })}
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="phone" className="text-zinc-300">
            <Phone className="inline w-4 h-4 mr-1 text-zinc-500" />
            Phone
          </Label>
          <Input
            id="phone"
            type="tel"
            placeholder="(555) 123-4567"
            value={data.phone}
            onChange={(e) => updateData({ phone: e.target.value })}
            className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
          />
        </div>
      </div>

      {/* Email */}
      <div className="space-y-2">
        <Label htmlFor="email" className="text-zinc-300">
          <Mail className="inline w-4 h-4 mr-1 text-zinc-500" />
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="hello@yourbusiness.com"
          value={data.email}
          onChange={(e) => updateData({ email: e.target.value })}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 md:w-1/2"
        />
      </div>

      {/* Social Media */}
      <div className="space-y-4">
        <Label className="text-zinc-300">
          <Globe className="inline w-4 h-4 mr-1 text-zinc-500" />
          Social Media
        </Label>

        {/* Existing entries */}
        {data.socialMedia.length > 0 && (
          <div className="space-y-2">
            {data.socialMedia.map((entry, index) => (
              <div
                key={index}
                className="flex items-center gap-3 rounded-lg bg-zinc-900 border border-zinc-700 px-3 py-2"
              >
                <span className="text-sm font-medium text-zinc-300 min-w-[100px]">
                  {entry.platform}
                </span>
                <span className="text-sm text-zinc-400 truncate flex-1">
                  {entry.url}
                </span>
                <Button
                  variant="ghost"
                  size="icon-xs"
                  onClick={() => removeSocialMedia(index)}
                  className="text-zinc-500 hover:text-red-400 shrink-0"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>
            ))}
          </div>
        )}

        {/* Add new entry */}
        <div className="flex flex-col sm:flex-row items-stretch sm:items-end gap-3">
          <div className="flex-shrink-0 sm:w-[180px]">
            <Select value={newPlatform} onValueChange={setNewPlatform}>
              <SelectTrigger className="bg-zinc-900 border-zinc-700 text-white">
                <SelectValue placeholder="Platform" />
              </SelectTrigger>
              <SelectContent className="bg-zinc-900 border-zinc-700">
                {SOCIAL_PLATFORMS.map((platform) => (
                  <SelectItem
                    key={platform}
                    value={platform}
                    className="text-zinc-200 focus:bg-zinc-800 focus:text-white"
                  >
                    {platform}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex-1">
            <Input
              placeholder="https://..."
              value={newUrl}
              onChange={(e) => setNewUrl(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  addSocialMedia();
                }
              }}
              className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500"
            />
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={addSocialMedia}
            disabled={!newPlatform || !newUrl}
            className="border-zinc-700 text-zinc-300 hover:bg-zinc-800 hover:text-white disabled:opacity-40"
          >
            <Plus className="w-4 h-4 mr-1" />
            Add
          </Button>
        </div>
      </div>

      {/* Operating Hours */}
      <div className="space-y-2">
        <Label htmlFor="operatingHours" className="text-zinc-300">
          Operating Hours
          <span className="text-zinc-500 text-xs ml-2">(optional)</span>
        </Label>
        <Textarea
          id="operatingHours"
          placeholder={"Mon–Fri: 9am – 5pm\nSat: 10am – 2pm\nSun: Closed"}
          value={data.operatingHours}
          onChange={(e) => updateData({ operatingHours: e.target.value })}
          rows={3}
          className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 resize-none"
        />
      </div>

      {/* Voice Note Placeholder */}
      <div className="flex items-center gap-3 rounded-lg border border-dashed border-zinc-700 bg-zinc-900/50 px-4 py-3">
        <Button
          variant="outline"
          size="icon"
          disabled
          className="border-zinc-600 text-zinc-500 cursor-not-allowed"
        >
          <Mic className="w-4 h-4" />
        </Button>
        <div>
          <p className="text-sm text-zinc-400">Voice note coming soon</p>
          <p className="text-xs text-zinc-600">
            Record a voice description of your business instead of typing.
          </p>
        </div>
      </div>
    </div>
  );
}
