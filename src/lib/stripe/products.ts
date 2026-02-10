export const PACKAGES = {
  starter: {
    name: "Starter",
    price: 39900,
    mode: "payment" as const,
    metadata: { tier: "starter", type: "package" },
  },
  business: {
    name: "Business",
    price: 69900,
    mode: "payment" as const,
    metadata: { tier: "business", type: "package" },
  },
  professional: {
    name: "Professional",
    price: 99900,
    mode: "payment" as const,
    metadata: { tier: "professional", type: "package" },
  },
} as const;

export const SUBSCRIPTIONS = {
  basic: {
    name: "Basic",
    price: 2900,
    mode: "subscription" as const,
    interval: "month" as const,
    changes: 2,
    metadata: { tier: "basic", type: "subscription", changesPerMonth: "2" },
  },
  growth: {
    name: "Growth",
    price: 5900,
    mode: "subscription" as const,
    interval: "month" as const,
    changes: 5,
    metadata: { tier: "growth", type: "subscription", changesPerMonth: "5" },
  },
  pro: {
    name: "Pro",
    price: 14900,
    mode: "subscription" as const,
    interval: "month" as const,
    changes: 12,
    metadata: { tier: "pro", type: "subscription", changesPerMonth: "12" },
  },
} as const;

export type PackageKey = keyof typeof PACKAGES;
export type SubscriptionKey = keyof typeof SUBSCRIPTIONS;
