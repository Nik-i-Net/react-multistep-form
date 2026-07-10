import Input from "../components/Input";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../StepHeader";

function PersonalInfoStep() {
  const { state, dispatch } = useFormContext();

  const updateField =
    (field: "name" | "email" | "phone") => (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch({
        type: "SET_PERSONAL_INFO",
        payload: { [field]: e.target.value },
      });
    };

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
        onChange={updateField("name")}
      />
      <Input
        label="Email Address"
        name="email"
        type="email"
        placeholder="e.g. stephenking@lorem.com"
        className="mt-6"
        value={state.email}
        onChange={updateField("email")}
      />
      <Input
        label="Phone Number"
        name="phone"
        error="Test error"
        type="tel"
        placeholder="e.g. +1 234 567 890"
        className="mt-6"
        value={state.phone}
        onChange={updateField("phone")}
      />
    </div>
  );
}

export default PersonalInfoStep;
