"use client";

import { useState } from "react";
import { motion, type Variants } from "framer-motion";
import {
  ClipboardCheck,
  Pencil,
  CreditCard,
  Building2,
  Globe,
  Monitor,
  Paintbrush,
  FolderUp,
  MessageSquare,
  Check,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { useOnboarding } from "@/lib/onboarding/context";

/* ------------------------------------------------------------------ */
/*  Plan data (mirrored from StepPlan for display)                     */
/* ------------------------------------------------------------------ */

const PLANS: Record<string, { name: string; price: number }> = {
  starter: { name: "Starter", price: 399 },
  business: { name: "Business", price: 699 },
  professional: { name: "Professional", price: 999 },
};

const SUBSCRIPTIONS: Record<string, { name: string; price: number }> = {
  basic: { name: "Basic", price: 29 },
  growth: { name: "Growth", price: 59 },
  pro: { name: "Pro", price: 149 },
};

const DOMAIN_LABELS: Record<string, string> = {
  own: "Use my own domain",
  buy: "Buy a new domain",
  subdomain: "Use a free subdomain",
};

/* ------------------------------------------------------------------ */
/*  Animation variants                                                 */
/* ------------------------------------------------------------------ */

const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06 } },
};

const itemVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] },
  },
};

/* ------------------------------------------------------------------ */
/*  Section Card                                                       */
/* ------------------------------------------------------------------ */

function ReviewSection({
  icon: Icon,
  title,
  step,
  onEdit,
  children,
}: {
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  step: number;
  onEdit: (step: number) => void;
  children: React.ReactNode;
}) {
  return (
    <motion.div variants={itemVariants}>
      <Card className="bg-zinc-900 border-zinc-800 overflow-hidden">
        <CardContent className="p-0">
          {/* Header */}
          <div className="flex items-center justify-between px-5 py-3.5 border-b border-zinc-800/60">
            <div className="flex items-center gap-2.5">
              <div className="flex items-center justify-center w-7 h-7 rounded-md bg-blue-600/15">
                <Icon className="w-3.5 h-3.5 text-blue-400" />
              </div>
              <h3 className="text-sm font-semibold text-white">{title}</h3>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => onEdit(step)}
              className="text-zinc-400 hover:text-white hover:bg-zinc-800 h-7 px-2.5 text-xs gap-1.5"
            >
              <Pencil className="w-3 h-3" />
              Edit
            </Button>
          </div>
          {/* Content */}
          <div className="px-5 py-4 space-y-2">{children}</div>
        </CardContent>
      </Card>
    </motion.div>
  );
}

/* ------------------------------------------------------------------ */
/*  Helpers                                                            */
/* ------------------------------------------------------------------ */

function Row({
  label,
  value,
}: {
  label: string;
  value: React.ReactNode;
}) {
  return (
    <div className="flex items-start justify-between gap-4">
      <span className="text-xs text-zinc-500 shrink-0">{label}</span>
      <span className="text-sm text-zinc-200 text-right">{value}</span>
    </div>
  );
}

function EmptyState({ text }: { text: string }) {
  return <span className="text-zinc-600 italic">{text}</span>;
}

/* ------------------------------------------------------------------ */
/*  Main component                                                     */
/* ------------------------------------------------------------------ */

export function StepReview() {
  const { data, goToStep } = useOnboarding();
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  // Derived values
  const plan = data.plan ? PLANS[data.plan] : null;
  const subscription = data.subscriptionPlan
    ? SUBSCRIPTIONS[data.subscriptionPlan]
    : null;

  const domainValue =
    data.domainOption === "own"
      ? data.existingDomain
      : data.domainOption === "buy"
        ? data.desiredDomain
        : data.domainOption === "subdomain"
          ? data.desiredDomain
            ? `${data.desiredDomain}.kuvoco.com`
            : null
          : null;

  return (
    <motion.div
      className="space-y-6"
      initial="hidden"
      animate="visible"
      variants={containerVariants}
    >
      {/* Header */}
      <motion.div className="flex items-center gap-3" variants={itemVariants}>
        <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-blue-600/20">
          <ClipboardCheck className="w-5 h-5 text-blue-400" />
        </div>
        <div>
          <h2 className="text-xl font-semibold text-white">
            Review Your Project
          </h2>
          <p className="text-sm text-zinc-400">
            Make sure everything looks good before submitting.
          </p>
        </div>
      </motion.div>

      {/* ============================================================ */}
      {/* 1. Your Plan                                                  */}
      {/* ============================================================ */}
      <ReviewSection
        icon={CreditCard}
        title="Your Plan"
        step={1}
        onEdit={goToStep}
      >
        {plan ? (
          <>
            <Row
              label="Plan"
              value={
                <span className="flex items-center gap-2">
                  {plan.name}
                  <Badge className="bg-blue-600/15 text-blue-400 border-0 text-[10px] px-1.5 py-0">
                    ${plan.price}
                  </Badge>
                </span>
              }
            />
            <Row label="Type" value="One-time build" />
          </>
        ) : subscription ? (
          <>
            <Row
              label="Subscription"
              value={
                <span className="flex items-center gap-2">
                  {subscription.name}
                  <Badge className="bg-blue-600/15 text-blue-400 border-0 text-[10px] px-1.5 py-0">
                    ${subscription.price}/mo
                  </Badge>
                </span>
              }
            />
            <Row label="Billing" value="Monthly" />
          </>
        ) : (
          <Row label="Plan" value={<EmptyState text="No plan selected" />} />
        )}
      </ReviewSection>

      {/* ============================================================ */}
      {/* 2. Business Info                                              */}
      {/* ============================================================ */}
      <ReviewSection
        icon={Building2}
        title="Business Info"
        step={2}
        onEdit={goToStep}
      >
        <Row
          label="Business"
          value={data.businessName || <EmptyState text="Not provided" />}
        />
        <Row
          label="Industry"
          value={data.industry || <EmptyState text="Not provided" />}
        />
        <Row
          label="Location"
          value={data.location || <EmptyState text="Not provided" />}
        />
        {data.email && <Row label="Email" value={data.email} />}
        {data.phone && <Row label="Phone" value={data.phone} />}
      </ReviewSection>

      {/* ============================================================ */}
      {/* 3. Domain                                                     */}
      {/* ============================================================ */}
      <ReviewSection
        icon={Globe}
        title="Domain"
        step={3}
        onEdit={goToStep}
      >
        <Row
          label="Option"
          value={
            data.domainOption ? (
              DOMAIN_LABELS[data.domainOption]
            ) : (
              <EmptyState text="Not selected" />
            )
          }
        />
        {domainValue && <Row label="Domain" value={domainValue} />}
      </ReviewSection>

      {/* ============================================================ */}
      {/* 4. Current Website                                            */}
      {/* ============================================================ */}
      <ReviewSection
        icon={Monitor}
        title="Current Website"
        step={4}
        onEdit={goToStep}
      >
        <Row
          label="Has website"
          value={
            data.hasExistingSite === null ? (
              <EmptyState text="Not answered" />
            ) : data.hasExistingSite ? (
              <Badge className="bg-emerald-600/15 text-emerald-400 border-0 text-[10px] px-1.5 py-0">
                Yes
              </Badge>
            ) : (
              <Badge className="bg-zinc-700/40 text-zinc-400 border-0 text-[10px] px-1.5 py-0">
                No
              </Badge>
            )
          }
        />
        {data.hasExistingSite && data.existingSiteUrl && (
          <Row label="URL" value={data.existingSiteUrl} />
        )}
      </ReviewSection>

      {/* ============================================================ */}
      {/* 5. Design Vision                                              */}
      {/* ============================================================ */}
      <ReviewSection
        icon={Paintbrush}
        title="Design Vision"
        step={5}
        onEdit={goToStep}
      >
        <Row
          label="Styles"
          value={
            data.stylePreference.length > 0 ? (
              <span className="flex flex-wrap justify-end gap-1">
                {data.stylePreference.map((s) => (
                  <Badge
                    key={s}
                    className="bg-zinc-800 text-zinc-300 border-0 text-[10px] px-1.5 py-0"
                  >
                    {s}
                  </Badge>
                ))}
              </span>
            ) : (
              <EmptyState text="None selected" />
            )
          }
        />
        <Row
          label="Colors"
          value={
            data.preferredColors.length > 0 ? (
              <span className="flex items-center justify-end gap-1.5">
                {data.preferredColors.map((c) => (
                  <span
                    key={c}
                    className="w-4 h-4 rounded-full border border-zinc-700"
                    style={{ backgroundColor: c }}
                    title={c}
                  />
                ))}
              </span>
            ) : (
              <EmptyState text="None chosen" />
            )
          }
        />
        <Row
          label="References"
          value={
            data.referenceSites.length > 0
              ? `${data.referenceSites.length} site${data.referenceSites.length !== 1 ? "s" : ""}`
              : <EmptyState text="None" />
          }
        />
        <Row
          label="Sections"
          value={
            data.desiredSections.length > 0
              ? `${data.desiredSections.length} selected`
              : <EmptyState text="None" />
          }
        />
        {data.specialFeatures.length > 0 && (
          <Row
            label="Features"
            value={
              <span className="flex flex-wrap justify-end gap-1">
                {data.specialFeatures.map((f) => (
                  <Badge
                    key={f}
                    className="bg-zinc-800 text-zinc-300 border-0 text-[10px] px-1.5 py-0"
                  >
                    {f}
                  </Badge>
                ))}
              </span>
            }
          />
        )}
      </ReviewSection>

      {/* ============================================================ */}
      {/* 6. Assets                                                     */}
      {/* ============================================================ */}
      <ReviewSection
        icon={FolderUp}
        title="Assets"
        step={6}
        onEdit={goToStep}
      >
        <Row
          label="Files"
          value={
            data.uploadedFiles.length > 0
              ? `${data.uploadedFiles.length} file${data.uploadedFiles.length !== 1 ? "s" : ""} uploaded`
              : <EmptyState text="No files" />
          }
        />
        <Row
          label="Content"
          value={
            data.hasOwnContent === null ? (
              <EmptyState text="Not answered" />
            ) : data.hasOwnContent ? (
              "Has own content"
            ) : data.needsContentCreation ? (
              "Needs content creation"
            ) : (
              "No own content"
            )
          }
        />
      </ReviewSection>

      {/* ============================================================ */}
      {/* 7. Communication                                              */}
      {/* ============================================================ */}
      <ReviewSection
        icon={MessageSquare}
        title="Communication"
        step={7}
        onEdit={goToStep}
      >
        <Row
          label="Contact"
          value={
            data.preferredContact.length > 0 ? (
              <span className="flex flex-wrap justify-end gap-1">
                {data.preferredContact.map((c) => (
                  <Badge
                    key={c}
                    className="bg-zinc-800 text-zinc-300 border-0 text-[10px] px-1.5 py-0"
                  >
                    {c}
                  </Badge>
                ))}
              </span>
            ) : (
              <EmptyState text="Not selected" />
            )
          }
        />
      </ReviewSection>

      {/* ============================================================ */}
      {/* Terms & Submit                                                */}
      {/* ============================================================ */}
      <motion.div className="space-y-5 pt-2" variants={itemVariants}>
        {/* Terms checkbox */}
        <label className="flex items-start gap-3 cursor-pointer group">
          <Checkbox
            checked={agreedToTerms}
            onCheckedChange={(checked) =>
              setAgreedToTerms(checked === true)
            }
            className="mt-0.5 border-zinc-600 data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
          />
          <span className="text-sm text-zinc-400 group-hover:text-zinc-300 transition-colors leading-relaxed">
            I agree to the{" "}
            <span className="text-blue-400 underline underline-offset-2">
              Terms of Service
            </span>{" "}
            and{" "}
            <span className="text-blue-400 underline underline-offset-2">
              Privacy Policy
            </span>
          </span>
        </label>

        {/* Submit button */}
        <Button
          disabled={!agreedToTerms}
          className="w-full h-12 text-base font-semibold bg-gradient-to-r from-blue-600 to-cyan-500 hover:opacity-90 text-white disabled:opacity-40 disabled:cursor-not-allowed transition-opacity"
        >
          <Check className="w-4 h-4 mr-2" />
          Submit & Pay
        </Button>
      </motion.div>
    </motion.div>
  );
}
