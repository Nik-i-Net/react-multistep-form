import Input from "../components/Input";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../StepHeader";
import { validateName, validateEmail, validatePhone } from "../validation";
import { useState } from "react";

function PersonalInfoStep() {
  const { state, dispatch } = useFormContext();
  const [touched, setTouched] = useState({ name: false, email: false, phone: false });
  const [isPhoneFocused, setIsPhoneFocused] = useState(false);
  const validators = { name: validateName, email: validateEmail, phone: validatePhone } as const;

  function validateField(field: "name" | "email" | "phone", value: string) {
    const error = validators[field](value);
    dispatch({ type: "SET_ERRORS", payload: { [field]: error } });
  }

  function handleOnChange(field: "name" | "email" | "phone") {
    return (e: React.ChangeEvent<HTMLInputElement>) => {
      let value = e.target.value;
      if (field === "phone") value = value.replace(/\D/g, "");

      if (state.errors[field]) setTouched({ ...touched, [field]: true });
      if (touched[field]) validateField(field, value);
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
        className="mt-9 max-md:mt-5"
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
        className="mt-6 max-md:mt-4"
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
        className="mt-6 max-md:mt-4"
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
