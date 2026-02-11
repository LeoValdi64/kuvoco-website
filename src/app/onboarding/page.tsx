"use client";

import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useOnboarding } from "@/lib/onboarding/context";
import {
  StepPlan,
  StepBusiness,
  StepDomain,
  StepCurrentSite,
  StepVision,
  StepAssets,
  StepContact,
  StepReview,
} from "./steps";

const STEPS = [
  { id: 1, label: "Plan", component: StepPlan },
  { id: 2, label: "Business", component: StepBusiness },
  { id: 3, label: "Domain", component: StepDomain },
  { id: 4, label: "Current Site", component: StepCurrentSite },
  { id: 5, label: "Vision", component: StepVision },
  { id: 6, label: "Assets", component: StepAssets },
  { id: 7, label: "Contact", component: StepContact },
  { id: 8, label: "Review", component: StepReview },
];

export default function OnboardingPage() {
  const { currentStep, nextStep, prevStep, direction } = useOnboarding();
  const StepComponent = STEPS[currentStep - 1].component;

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 300 : -300,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -300 : 300,
      opacity: 0,
    }),
  };

  return (
    <div className="space-y-8">
      {/* Progress Bar */}
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm">
          <span className="text-[#9CA3AF]">
            Step {currentStep} of {STEPS.length}
          </span>
          <span className="text-white font-medium">
            {STEPS[currentStep - 1].label}
          </span>
        </div>
        <div className="w-full bg-white/5 rounded-full h-2 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] rounded-full"
            initial={false}
            animate={{ width: `${(currentStep / STEPS.length) * 100}%` }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          />
        </div>
        {/* Step dots */}
        <div className="hidden sm:flex items-center justify-between px-1">
          {STEPS.map((step) => (
            <div
              key={step.id}
              className="flex flex-col items-center gap-1"
            >
              <div
                className={`w-2.5 h-2.5 rounded-full transition-colors duration-200 ${
                  step.id <= currentStep
                    ? "bg-[#3B82F6]"
                    : "bg-white/10"
                }`}
              />
              <span
                className={`text-[10px] transition-colors duration-200 ${
                  step.id === currentStep
                    ? "text-white"
                    : step.id < currentStep
                    ? "text-[#3B82F6]"
                    : "text-[#6B7280]"
                }`}
              >
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Step Content */}
      <div className="relative min-h-[500px] overflow-hidden">
        <AnimatePresence mode="wait" custom={direction}>
          <motion.div
            key={currentStep}
            custom={direction}
            variants={variants}
            initial="enter"
            animate="center"
            exit="exit"
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <StepComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Navigation */}
      <div className="flex items-center justify-between pt-4 border-t border-white/5">
        <Button
          variant="ghost"
          onClick={prevStep}
          disabled={currentStep === 1}
          className="text-[#9CA3AF] hover:text-white disabled:opacity-30"
        >
          <ChevronLeft className="w-4 h-4 mr-1" />
          Back
        </Button>

        {currentStep < STEPS.length ? (
          <Button
            onClick={nextStep}
            className="bg-[#3B82F6] hover:bg-[#2563EB] text-white px-6"
          >
            Next
            <ChevronRight className="w-4 h-4 ml-1" />
          </Button>
        ) : (
          <Button className="bg-gradient-to-r from-[#3B82F6] to-[#06B6D4] hover:opacity-90 text-white px-8">
            Submit & Pay
          </Button>
        )}
      </div>
    </div>
  );
}
