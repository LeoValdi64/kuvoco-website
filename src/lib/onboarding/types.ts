export interface OnboardingData {
  // Step 1: Plan
  plan: 'starter' | 'business' | 'professional' | null;
  billingCycle: 'monthly' | 'annual';

  // Step 2: Business Info
  businessName: string;
  industry: string;
  description: string;
  location: string;
  phone: string;
  email: string;
  socialMedia: { platform: string; url: string }[];
  operatingHours: string;
  audioDescriptions: { stepId: string; url: string }[];

  // Step 3: Domain
  domainOption: 'own' | 'buy' | 'subdomain' | null;
  existingDomain: string;
  desiredDomain: string;

  // Step 4: Existing Site
  hasExistingSite: boolean | null;
  existingSiteUrl: string;
  likesAboutCurrent: string;
  dislikesAboutCurrent: string;

  // Step 5: Vision
  stylePreference: string[];
  preferredColors: string[];
  referenceSites: { url: string; notes: string }[];
  desiredSections: string[];
  specialFeatures: string[];
  visionNotes: string;

  // Step 6: Assets
  uploadedFiles: { name: string; type: string; url: string }[];
  hasOwnContent: boolean | null;
  contentNotes: string;
  needsContentCreation: boolean;

  // Step 7: Communication
  preferredContact: string[];
  additionalNotes: string;
}

export const ONBOARDING_STEPS = [
  { id: 1, label: 'Plan' },
  { id: 2, label: 'Business' },
  { id: 3, label: 'Domain' },
  { id: 4, label: 'Current Site' },
  { id: 5, label: 'Vision' },
  { id: 6, label: 'Assets' },
  { id: 7, label: 'Contact' },
  { id: 8, label: 'Review' },
] as const;

export const TOTAL_STEPS = ONBOARDING_STEPS.length;

export const DEFAULT_ONBOARDING_DATA: OnboardingData = {
  plan: null,
  billingCycle: 'monthly',
  businessName: '',
  industry: '',
  description: '',
  location: '',
  phone: '',
  email: '',
  socialMedia: [],
  operatingHours: '',
  audioDescriptions: [],
  domainOption: null,
  existingDomain: '',
  desiredDomain: '',
  hasExistingSite: null,
  existingSiteUrl: '',
  likesAboutCurrent: '',
  dislikesAboutCurrent: '',
  stylePreference: [],
  preferredColors: [],
  referenceSites: [],
  desiredSections: [],
  specialFeatures: [],
  visionNotes: '',
  uploadedFiles: [],
  hasOwnContent: null,
  contentNotes: '',
  needsContentCreation: false,
  preferredContact: [],
  additionalNotes: '',
};
