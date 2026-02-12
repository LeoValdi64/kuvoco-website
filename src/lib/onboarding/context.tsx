"use client";

import {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
  type ReactNode,
} from "react";
import {
  type OnboardingData,
  DEFAULT_ONBOARDING_DATA,
  TOTAL_STEPS,
} from "./types";

const STORAGE_KEY = "kuvoco-onboarding";

export type StepPlanView = "onetime" | "monthly";

interface OnboardingContextValue {
  data: OnboardingData;
  updateData: (updates: Partial<OnboardingData>) => void;
  currentStep: number;
  nextStep: () => void;
  prevStep: () => void;
  goToStep: (step: number) => void;
  resetOnboarding: () => void;
  direction: number; // 1 = forward, -1 = backward (for animations)
  stepPlanView: StepPlanView;
  setStepPlanView: (view: StepPlanView) => void;
}

const OnboardingContext = createContext<OnboardingContextValue | null>(null);

export function OnboardingProvider({ children }: { children: ReactNode }) {
  const [data, setData] = useState<OnboardingData>(DEFAULT_ONBOARDING_DATA);
  const [currentStep, setCurrentStep] = useState(1);
  const [direction, setDirection] = useState(1);
  const [hydrated, setHydrated] = useState(false);
  const [stepPlanView, setStepPlanView] = useState<StepPlanView>("onetime");

  // Restore from localStorage on mount
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.data) setData({ ...DEFAULT_ONBOARDING_DATA, ...parsed.data });
        if (parsed.currentStep) setCurrentStep(parsed.currentStep);
        if (parsed.stepPlanView) setStepPlanView(parsed.stepPlanView);
      }
    } catch {
      // Ignore corrupted data
    }
    setHydrated(true);
  }, []);

  // Auto-save to localStorage on every change
  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ data, currentStep, stepPlanView })
      );
    } catch {
      // localStorage full or unavailable
    }
  }, [data, currentStep, stepPlanView, hydrated]);

  const updateData = useCallback((updates: Partial<OnboardingData>) => {
    setData((prev) => ({ ...prev, ...updates }));
  }, []);

  const nextStep = useCallback(() => {
    setDirection(1);
    setCurrentStep((prev) => {
      // On step 1, if viewing one-time plans, switch to monthly view instead of advancing
      if (prev === 1 && stepPlanView === "onetime") {
        setStepPlanView("monthly");
        return prev;
      }
      return Math.min(prev + 1, TOTAL_STEPS);
    });
  }, [stepPlanView]);

  const prevStep = useCallback(() => {
    setDirection(-1);
    setCurrentStep((prev) => {
      // On step 1 monthly view, go back to onetime view instead of staying at step 1
      if (prev === 1 && stepPlanView === "monthly") {
        setStepPlanView("onetime");
        return prev;
      }
      // On step 2, go back to step 1 monthly view
      if (prev === 2) {
        setStepPlanView("monthly");
      }
      return Math.max(prev - 1, 1);
    });
  }, [stepPlanView]);

  const goToStep = useCallback((step: number) => {
    setDirection((prev) => (step > prev ? 1 : -1));
    setCurrentStep(Math.max(1, Math.min(step, TOTAL_STEPS)));
  }, []);

  const resetOnboarding = useCallback(() => {
    setData(DEFAULT_ONBOARDING_DATA);
    setCurrentStep(1);
    setDirection(1);
    setStepPlanView("onetime");
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      // Ignore
    }
  }, []);

  return (
    <OnboardingContext.Provider
      value={{
        data,
        updateData,
        currentStep,
        nextStep,
        prevStep,
        goToStep,
        resetOnboarding,
        direction,
        stepPlanView,
        setStepPlanView,
      }}
    >
      {children}
    </OnboardingContext.Provider>
  );
}

export function useOnboarding() {
  const context = useContext(OnboardingContext);
  if (!context) {
    throw new Error("useOnboarding must be used within an OnboardingProvider");
  }
  return context;
}
