import { createContext, useContext, type Dispatch } from "react";
import type { AddOnId, BillingModeId, PlanId } from "../data/subscriptions";

export type FormState = {
  name: string;
  email: string;
  phone: string;
  planId: PlanId;
  billingId: BillingModeId;
  addOnIds: AddOnId[];
  activeStep: number;
  maxStep: number;
  isCompleted: boolean;
  errors: Record<string, string | undefined>;
};

export type FormAction =
  | {
      type: "SET_PERSONAL_INFO";
      payload: { name?: string; email?: string; phone?: string };
    }
  | { type: "SELECT_PLAN"; payload: PlanId }
  | { type: "SET_BILLING"; payload: BillingModeId }
  | { type: "TOGGLE_ADD_ON"; payload: AddOnId }
  | { type: "NEXT_STEP" }
  | { type: "BACK_STEP" }
  | { type: "GO_TO_STEP"; payload: number }
  | { type: "CONFIRM_ORDER" }
  | { type: "SET_ERRORS"; payload: Record<string, string | undefined> };

export const initialFormState: FormState = {
  name: "",
  email: "",
  phone: "",
  planId: "arcade",
  billingId: "monthly",
  addOnIds: [],
  activeStep: 1,
  maxStep: 1,
  isCompleted: false,
  errors: {},
};

export const TOTAL_STEPS = 4;

export function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case "SET_PERSONAL_INFO":
      return { ...state, ...action.payload };

    case "SELECT_PLAN":
      return { ...state, planId: action.payload };

    case "SET_BILLING":
      return { ...state, billingId: action.payload };

    case "TOGGLE_ADD_ON":
      return {
        ...state,
        addOnIds: state.addOnIds.includes(action.payload)
          ? state.addOnIds.filter((id) => id !== action.payload)
          : [...state.addOnIds, action.payload],
      };

    case "NEXT_STEP": {
      if (state.isCompleted) return state;
      const next = Math.min(state.activeStep + 1, TOTAL_STEPS);
      return {
        ...state,
        activeStep: next,
        maxStep: Math.max(state.maxStep, next),
      };
    }

    case "BACK_STEP":
      if (state.isCompleted) return state;
      return {
        ...state,
        activeStep: Math.max(state.activeStep - 1, 1),
      };

    case "GO_TO_STEP":
      if (state.isCompleted) return state;
      if (action.payload < 1 || action.payload > state.maxStep) return state;
      return { ...state, activeStep: action.payload };

    case "CONFIRM_ORDER":
      if (state.activeStep !== TOTAL_STEPS) return state;
      return { ...state, isCompleted: true };

    case "SET_ERRORS":
      return { ...state, errors: { ...state.errors, ...action.payload } };

    default:
      throw new Error(`Unhandled action: ${action satisfies never}`);
  }
}

type FormContextValue = {
  state: FormState;
  dispatch: Dispatch<FormAction>;
};

export const FormContext = createContext<FormContextValue | null>(null);

export function useFormContext() {
  const context = useContext(FormContext);
  if (!context) throw new Error("useFormContext must be used within FormContext");
  return context;
}
