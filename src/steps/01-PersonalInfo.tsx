import { z } from "zod";
import Input from "../components/Input";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../StepHeader";
import { useState } from "react";

function PersonalInfoStep() {
  const { state, dispatch } = useFormContext();
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);

  function validateField(field: "name" | "email" | "phone", value: string) {
    if (!value) {
      dispatch({ type: "SET_ERRORS", payload: { [field]: "Required" } });
      return;
    }

    const schemas = {
      name: z
        .string()
        .regex(/^[a-z\s.'-]+$/i, "Only letters and spaces are allowed")
        .min(4, "Too short")
        .max(40, "Too long"),
      email: z.email("Invalid email address").max(254, "Too long"),
      phone: z.string().regex(/^\d{10}$/, "Should consist of exactly 10 digits"),
    };

    let errorMsg: string | undefined;
    const parseResult = schemas[field].safeParse(value);
    if (parseResult.error) {
      errorMsg = parseResult.error.issues[0].message;
    }

    dispatch({ type: "SET_ERRORS", payload: { [field]: errorMsg } });
  }

  function handleOnChange(field: "name" | "email" | "phone") {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "phone") value = value.replace(/\D/g, "");

      if (touched[field]) {
        validateField(field, value);
      }

      dispatch({ type: "SET_PERSONAL_INFO", payload: { [field]: value } });
    };
  }

  function prettifyPhone(raw: string) {
    if (!/^\d{10}$/.test(raw)) return raw;
    const groups = [raw[0], raw.slice(1, 4), raw.slice(4, 7), raw.slice(7)];
    return `+${groups.join(" ")}`.trimEnd();
  }

  return (
    <div className="select-none">
      <StepHeader
        title="Personal info"
        description="Please provide your name, email address, and phone number."
      />
      <Input
        label="Name"
        name="name"
        type="text"
        placeholder="e.g. Stephen King"
        className="mt-9"
        value={state.name}
        error={state.errors.name}
        onChange={handleOnChange("name")}
        onBlur={() => {
          setTouched({ ...touched, name: true });
          validateField("name", state.name);
        }}
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="e.g. stephenking@lorem.com"
        className="mt-6"
        value={state.email}
        error={state.errors.email}
        onChange={handleOnChange("email")}
        onBlur={() => {
          setTouched({ ...touched, email: true });
          validateField("email", state.email);
        }}
      />
      <Input
        label="Phone Number"
        name="phone"
        type="tel"
        placeholder="e.g. +1 234 567 890"
        className="mt-6"
        value={isPhoneFocused ? state.phone : prettifyPhone(state.phone)}
        error={state.errors.phone}
        onChange={handleOnChange("phone")}
        onFocus={() => setIsPhoneFocused(true)}
        onBlur={() => {
          setIsPhoneFocused(false);
          setTouched({ ...touched, phone: true });
          validateField("phone", state.phone);
        }}
      />
    </div>
  );
}

export default PersonalInfoStep;
