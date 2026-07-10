import { z, ZodType } from "zod";
import type { FormState } from "./state/FormContext";

function validate(schema: ZodType, value: string): string | undefined {
  const result = schema.safeParse(value);
  return result.success ? undefined : result.error.issues[0].message;
}

export function validateName(value: string): string | undefined {
  const nameSchema = z
    .string()
    .nonempty("Required")
    .regex(/^[a-z\s.'-]+$/i, "Only letters and spaces are allowed")
    .min(4, "Too short")
    .max(40, "Too long");
  return validate(nameSchema, value);
}

export function validateEmail(value: string): string | undefined {
  const emailSchema = z
    .string()
    .nonempty("Required")
    .email("Invalid email address")
    .max(254, "Too long");
  return validate(emailSchema, value);
}

export function validatePhone(value: string): string | undefined {
  const phoneSchema = z
    .string()
    .nonempty("Required")
    .regex(/^\d{10}$/, "Should consist of exactly 10 digits");
  return validate(phoneSchema, value);
}

type StepValidator = (state: FormState) => Record<string, string | undefined>;
export const stepValidators: Record<number, StepValidator | undefined> = {
  1: (state) => ({
    name: validateName(state.name),
    email: validateEmail(state.email),
    phone: validatePhone(state.phone),
  }),
};
