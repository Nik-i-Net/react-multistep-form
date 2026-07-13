import arcadeIcon from "../assets/icons/icon-arcade.svg";
import advancedIcon from "../assets/icons/icon-advanced.svg";
import proIcon from "../assets/icons/icon-pro.svg";

export const PLANS = [
  { id: "arcade", name: "Arcade", price: 9, icon: arcadeIcon },
  { id: "advanced", name: "Advanced", price: 12, icon: advancedIcon },
  { id: "pro", name: "Pro", price: 15, icon: proIcon },
] as const;

export type Plan = (typeof PLANS)[number];
export type PlanId = Plan["id"];

export const BILLING_MODES = [
  { id: "monthly", name: "Monthly", short: "mo", multiplier: 1 },
  { id: "yearly", name: "Yearly", short: "yr", multiplier: 10, promoLabel: "2 months free" },
] as const;

export type BillingMode = (typeof BILLING_MODES)[number];
export type BillingModeId = BillingMode["id"];

export const ADD_ONS = [
  {
    id: "online_service",
    name: "Online service",
    description: "Access to multiplayer games",
    price: 1,
  },
  {
    id: "larger_storage",
    name: "Larger storage",
    description: "Extra 1TB of cloud save",
    price: 2,
  },
  {
    id: "customizable_profile",
    name: "Customizable profile",
    description: "Custom theme on your profile",
    price: 2,
  },
] as const;

export type AddOn = (typeof ADD_ONS)[number];
export type AddOnId = AddOn["id"];
