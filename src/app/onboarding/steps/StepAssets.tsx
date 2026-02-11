"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { motion, AnimatePresence } from "framer-motion";
import {
  Upload,
  FileText,
  Image,
  X,
  Mic,
  Film,
  File,
  CheckCircle2,
  Sparkles,
  PenLine,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { useOnboarding } from "@/lib/onboarding/context";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const MAX_FILES = 20;
const MAX_SIZE = 10 * 1024 * 1024; // 10MB

const ACCEPTED_TYPES: Record<string, string[]> = {
  "image/jpeg": [".jpg", ".jpeg"],
  "image/png": [".png"],
  "image/webp": [".webp"],
  "image/gif": [".gif"],
  "image/svg+xml": [".svg"],
  "application/pdf": [".pdf"],
  "application/msword": [".doc"],
  "application/vnd.openxmlformats-officedocument.wordprocessingml.document": [
    ".docx",
  ],
  "video/mp4": [".mp4"],
};

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileIcon(type: string) {
  if (type.startsWith("image/")) return Image;
  if (type.startsWith("video/")) return Film;
  if (type === "application/pdf") return FileText;
  if (type.includes("word") || type.includes("document")) return FileText;
  return File;
}

function isImageType(type: string) {
  return type.startsWith("image/");
}

/* ------------------------------------------------------------------ */
/*  Local file state (with object URLs for preview)                    */
/* ------------------------------------------------------------------ */

interface LocalFile {
  id: string;
  file: File;
  name: string;
  type: string;
  size: number;
  previewUrl: string | null;
}

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepAssets() {
  const { data, updateData } = useOnboarding();
  const [localFiles, setLocalFiles] = useState<LocalFile[]>([]);
  const [selected, setSelected] = useState<boolean | null>(data.hasOwnContent);

  // Revoke object URLs on unmount
  useEffect(() => {
    return () => {
      localFiles.forEach((f) => {
        if (f.previewUrl) URL.revokeObjectURL(f.previewUrl);
      });
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // Sync context whenever localFiles changes
  const syncToContext = useCallback(
    (files: LocalFile[]) => {
      updateData({
        uploadedFiles: files.map((f) => ({
          name: f.name,
          type: f.type,
          size: f.size,
          url: f.previewUrl ?? "",
        })),
      });
    },
    [updateData]
  );

  const onDrop = useCallback(
    (accepted: File[]) => {
      const remaining = MAX_FILES - localFiles.length;
      const toAdd = accepted.slice(0, remaining);

      const newFiles: LocalFile[] = toAdd.map((file) => ({
        id: `${file.name}-${file.size}-${Date.now()}-${Math.random()}`,
        file,
        name: file.name,
        type: file.type,
        size: file.size,
        previewUrl: isImageType(file.type)
          ? URL.createObjectURL(file)
          : null,
      }));

      const updated = [...localFiles, ...newFiles];
      setLocalFiles(updated);
      syncToContext(updated);
    },
    [localFiles, syncToContext]
  );

  const removeFile = useCallback(
    (id: string) => {
      setLocalFiles((prev) => {
        const file = prev.find((f) => f.id === id);
        if (file?.previewUrl) URL.revokeObjectURL(file.previewUrl);
        const updated = prev.filter((f) => f.id !== id);
        syncToContext(updated);
        return updated;
      });
    },
    [syncToContext]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: ACCEPTED_TYPES,
    maxSize: MAX_SIZE,
    maxFiles: MAX_FILES - localFiles.length,
    disabled: localFiles.length >= MAX_FILES,
  });

  function handleContentToggle(value: boolean) {
    setSelected(value);
    updateData({ hasOwnContent: value });
    if (!value) {
      updateData({ contentNotes: "" });
    }
  }

  const contentOptions = [
    {
      value: true,
      icon: CheckCircle2,
      label: "Yes",
      description: "I have text content ready to use",
    },
    {
      value: false,
      icon: Sparkles,
      label: "No",
      description: "I'll need help with content later",
    },
  ] as const;

  return (
    <div className="space-y-10">
      {/* Header */}
      <div className="flex items-center gap-3">
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20">
          <Upload className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">
            Assets & Content
          </h2>
          <p className="text-sm text-zinc-400">
            Upload your files and tell us about your content.
          </p>
        </div>
      </div>

      {/* ============================================================ */}
      {/* 1. File Upload                                                */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <Upload className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Upload your files
          </Label>
          <span className="text-xs text-zinc-500 ml-1">
            ({localFiles.length}/{MAX_FILES})
          </span>
        </div>

        {/* Dropzone */}
        <div
          {...getRootProps()}
          className={`relative rounded-xl border-2 border-dashed p-8 text-center transition-all duration-200 cursor-pointer ${
            localFiles.length >= MAX_FILES
              ? "border-zinc-800 bg-zinc-900/30 cursor-not-allowed opacity-50"
              : isDragActive
                ? "border-blue-500 bg-blue-600/10 shadow-[0_0_30px_rgba(59,130,246,0.1)]"
                : "border-zinc-700 bg-zinc-900/50 hover:border-zinc-600 hover:bg-zinc-900/70"
          }`}
        >
          <input {...getInputProps()} />
          <div className="flex flex-col items-center gap-3">
            <div
              className={`w-14 h-14 rounded-full flex items-center justify-center transition-colors ${
                isDragActive
                  ? "bg-blue-600/20 text-blue-400"
                  : "bg-zinc-800 text-zinc-400"
              }`}
            >
              <Upload className="w-7 h-7" />
            </div>
            {isDragActive ? (
              <p className="text-blue-400 font-medium">Drop your files here</p>
            ) : (
              <>
                <p className="text-white font-medium">
                  Drag & drop files here, or click to browse
                </p>
                <p className="text-xs text-zinc-500">
                  Images (JPG, PNG, WebP, GIF, SVG), PDFs, Docs, Videos (MP4)
                  &mdash; Max 10MB each
                </p>
              </>
            )}
          </div>
        </div>

        {/* File List */}
        <AnimatePresence mode="popLayout">
          {localFiles.length > 0 && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="space-y-2"
            >
              {localFiles.map((file) => {
                const Icon = getFileIcon(file.type);
                return (
                  <motion.div
                    key={file.id}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, x: -20 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center gap-3 rounded-lg border border-zinc-800 bg-zinc-900/50 px-3 py-2.5"
                  >
                    {/* Thumbnail or Icon */}
                    {file.previewUrl ? (
                      <div className="w-10 h-10 rounded-md overflow-hidden shrink-0 border border-zinc-700">
                        <img
                          src={file.previewUrl}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                    ) : (
                      <div className="w-10 h-10 rounded-md bg-zinc-800 flex items-center justify-center shrink-0">
                        <Icon className="w-5 h-5 text-zinc-400" />
                      </div>
                    )}

                    {/* File info */}
                    <div className="flex-1 min-w-0">
                      <p className="text-sm text-white truncate">{file.name}</p>
                      <p className="text-xs text-zinc-500">
                        {formatFileSize(file.size)}
                      </p>
                    </div>

                    {/* Remove */}
                    <Button
                      variant="ghost"
                      size="icon-xs"
                      onClick={() => removeFile(file.id)}
                      className="text-zinc-500 hover:text-red-400 shrink-0"
                    >
                      <X className="w-4 h-4" />
                    </Button>
                  </motion.div>
                );
              })}
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ============================================================ */}
      {/* 2. Content Ready                                              */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <FileText className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Do you have content ready?
          </Label>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 max-w-lg">
          {contentOptions.map((option) => {
            const isSelected = selected === option.value;
            const Icon = option.icon;

            return (
              <motion.div
                key={option.label}
                whileHover={{ y: -4 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 25 }}
              >
                <Card
                  onClick={() => handleContentToggle(option.value)}
                  className={`cursor-pointer transition-all duration-200 bg-zinc-900/50 border ${
                    isSelected
                      ? "border-blue-500 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                      : "border-zinc-800 hover:border-zinc-700"
                  }`}
                >
                  <CardContent className="flex flex-col items-center text-center p-6 gap-3">
                    <div
                      className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors ${
                        isSelected
                          ? "bg-blue-600/20 text-blue-500"
                          : "bg-zinc-800 text-zinc-400"
                      }`}
                    >
                      <Icon className="w-6 h-6" />
                    </div>
                    <span className="text-lg font-semibold text-white">
                      {option.label}
                    </span>
                    <span className="text-xs text-zinc-400">
                      {option.description}
                    </span>
                  </CardContent>
                </Card>
              </motion.div>
            );
          })}
        </div>

        <AnimatePresence mode="wait">
          {selected === true && (
            <motion.div
              key="content-notes"
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <div className="space-y-2 max-w-lg pt-2">
                <Label className="text-zinc-300 text-sm">
                  Paste your text content or describe what you have
                </Label>
                <Textarea
                  placeholder="Paste your homepage copy, about page text, product descriptions, or describe what content you have ready..."
                  value={data.contentNotes}
                  onChange={(e) =>
                    updateData({ contentNotes: e.target.value })
                  }
                  rows={4}
                  className="bg-zinc-900 border-zinc-700 text-white placeholder:text-zinc-500 focus:border-blue-500 resize-none"
                />
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* ============================================================ */}
      {/* 3. Content Creation                                           */}
      {/* ============================================================ */}
      <section className="space-y-4">
        <div className="flex items-center gap-2">
          <PenLine className="w-4 h-4 text-zinc-400" />
          <Label className="text-zinc-300 text-base font-medium">
            Need us to create content?
          </Label>
        </div>

        <div className="flex items-center justify-between rounded-lg border border-zinc-800 bg-zinc-900/50 px-4 py-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-white">
              Professional content creation
            </p>
            <p className="text-xs text-zinc-400">
              We can write professional copy for your website
            </p>
          </div>
          <Switch
            checked={data.needsContentCreation}
            onCheckedChange={(checked) =>
              updateData({ needsContentCreation: checked })
            }
          />
        </div>
      </section>

      {/* ============================================================ */}
      {/* 4. Voice Description Placeholder                              */}
      {/* ============================================================ */}
      <section>
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
            <p className="text-sm text-zinc-400">Voice description coming soon</p>
            <p className="text-xs text-zinc-600">
              Describe your assets and content needs with a voice recording.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}
