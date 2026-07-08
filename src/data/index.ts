export const PLANS = {
  arcade: { name: "Arcade", price: 9 },
  advanced: { name: "Advanced", price: 12 },
  pro: { name: "Pro", price: 15 },
};

export type PlanId = keyof typeof PLANS;

export const BILLING_MODES = {
  monthly: { name: "Monthly" },
  yearly: { name: "Yearly", multiplier: 10, promoLabel: "2 months free" },
};

export type BillingModeId = keyof typeof BILLING_MODES;

export const ADD_ONS = {
  onlineService: {
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },

  largerStorage: {
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },

  customizableProfile: {
    name: "Customizable profile",
    description: "Custom theme on your profile",
    price: 2,
  },
};

export type AddOnId = keyof typeof ADD_ONS;
