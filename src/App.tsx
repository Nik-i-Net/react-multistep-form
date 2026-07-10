import { useReducer } from "react";
import { FormContext, formReducer, initialState, useFormContext } from "./state/FormContext";
import PersonalInfoStep from "./steps/01-PersonalInfo";
import StepNav from "./StepNav";
import CompleteStep from "./steps/Complete";
import SelectPlanStep from "./steps/02-SelectPlan";
import AddOnsStep from "./steps/03-AddOns";
import SummaryStep from "./steps/04-Summary";
import Button from "./components/Button";

function ActiveStep() {
  const { state } = useFormContext();

  if (state.isCompleted) return <CompleteStep />;

  switch (state.activeStep) {
    case 1:
      return <PersonalInfoStep />;
    case 2:
      return <SelectPlanStep />;
    case 3:
      return <AddOnsStep />;
    case 4:
      return <SummaryStep />;
    default:
      throw new Error(`Invalid active step: ${state.activeStep}`);
  }
}

function StepActions() {
  const { state, dispatch } = useFormContext();
  const step = state.activeStep;

  if (state.isCompleted) return null;

  return (
    <div className={`flex ${step === 1 ? "justify-end" : "justify-between"}`}>
      {step > 1 && (
        <Button variant="ghost" onClick={() => dispatch({ type: "BACK_STEP" })}>
          Go Back
        </Button>
      )}
      {step < 4 ? (
        <Button onClick={() => dispatch({ type: "NEXT_STEP" })}>Next Step</Button>
      ) : (
        <Button variant="accent" onClick={() => dispatch({ type: "CONFIRM_ORDER" })}>
          Confirm
        </Button>
      )}
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <main className="min-h-screen bg-surface flex justify-center items-center p-4">
      <FormContext value={{ state, dispatch }}>
        <div className="max-w-235 w-full flex gap-4 bg-white rounded-2xl p-4 shadow-lg">
          <StepNav />
          <div className="pt-11 pb-4 px-21 flex-1 flex flex-col justify-between">
            <ActiveStep />
            <StepActions />
          </div>
        </div>
      </FormContext>
    </main>
  );
}

export default App;
