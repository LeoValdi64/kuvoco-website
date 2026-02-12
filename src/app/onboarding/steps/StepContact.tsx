"use client";

import { Mail, Phone, MessageSquare, Mic, Check } from "lucide-react";
import { motion, type Variants } from "framer-motion";
import { useOnboarding } from "@/lib/onboarding/context";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";

/* ------------------------------------------------------------------ */
/*  Constants                                                          */
/* ------------------------------------------------------------------ */

const CONTACT_OPTIONS = [
  {
    value: "Email",
    icon: Mail,
    label: "Email",
    description: "We'll send updates and questions to your inbox.",
  },
  {
    value: "Phone/WhatsApp",
    icon: Phone,
    label: "Phone / WhatsApp",
    description: "Quick calls or messages for faster turnaround.",
  },
  {
    value: "Portal Messages",
    icon: MessageSquare,
    label: "Portal Messages",
    description: "Communicate through your Kuvoco client portal.",
  },
] as const;

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function toggleInArray(arr: string[], value: string): string[] {
  return arr.includes(value)
    ? arr.filter((v) => v !== value)
    : [...arr, value];
}

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.1 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

const fadeIn: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } },
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

export function StepContact() {
  const { data, updateData } = useOnboarding();

  function toggleContact(value: string) {
    updateData({
      preferredContact: toggleInArray(data.preferredContact, value),
    });
  }

  const notesLength = data.additionalNotes.length;

  return (
    <motion.div
      className="space-y-10"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="flex items-center gap-3" variants={fadeIn}>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20">
          <MessageSquare className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">Communication</h2>
          <p className="text-sm text-zinc-400">
            How would you like us to contact you?
          </p>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 1. Preferred Contact Methods                                  */}
      {/* ============================================================ */}
      <motion.section className="space-y-4" variants={fadeIn}>
        <div className="flex items-center gap-2">
          <Label className="text-zinc-300 text-base font-medium">
            Preferred Contact
          </Label>
          <span className="text-xs text-zinc-500 ml-1">
            (select all that apply)
          </span>
        </div>

        <motion.div
          className="grid grid-cols-1 sm:grid-cols-3 gap-3"
          variants={containerVariants}
        >
          {CONTACT_OPTIONS.map((option) => {
            const Icon = option.icon;
            const isSelected = data.preferredContact.includes(option.value);

            return (
              <motion.button
                key={option.value}
                type="button"
                onClick={() => toggleContact(option.value)}
                variants={cardVariants}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`relative flex flex-col items-center gap-3 rounded-xl border p-5 transition-colors duration-200 cursor-pointer text-center ${
                  isSelected
                    ? "border-blue-500 bg-blue-600/10 shadow-[0_0_20px_rgba(59,130,246,0.15)]"
                    : "border-zinc-800 bg-zinc-900/50 hover:border-zinc-700"
                }`}
              >
                {/* Checkmark badge */}
                {isSelected && (
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute top-2 right-2 w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center"
                  >
                    <Check className="w-3 h-3 text-white" />
                  </motion.div>
                )}

                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 ${
                    isSelected ? "bg-blue-600/20" : "bg-zinc-800"
                  }`}
                >
                  <Icon
                    className={`w-5 h-5 transition-colors duration-200 ${
                      isSelected ? "text-blue-400" : "text-zinc-400"
                    }`}
                  />
                </div>

                <span className="text-sm font-medium text-white">
                  {option.label}
                </span>
                <span className="text-xs text-zinc-400">
                  {option.description}
                </span>
              </motion.button>
            );
          })}
        </motion.div>
      </motion.section>

      {/* ============================================================ */}
      {/* 2. Additional Notes                                          */}
      {/* ============================================================ */}
      <motion.section className="space-y-4" variants={fadeIn}>
        <div className="flex items-center gap-2">
          <Label className="text-zinc-300 text-base font-medium">
            Additional Notes
          </Label>
          <span className="text-xs text-zinc-500 ml-1">(optional)</span>
        </div>

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-xs text-zinc-500">
              Anything else you want us to know?
            </span>
            <span
              className={`text-xs ${
                notesLength > 1000 ? "text-red-400" : "text-zinc-500"
              }`}
            >
              {notesLength}/1000
            </span>
          </div>
          <Textarea
            placeholder="Preferred times to reach you, project deadlines, special requests..."
            value={data.additionalNotes}
            onChange={(e) => {
              if (e.target.value.length <= 1000) {
                updateData({ additionalNotes: e.target.value });
              }
            }}
            rows={4}
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
              Record a message instead of typing.
            </p>
          </div>
        </div>
      </motion.section>
    </motion.div>
  );
}
