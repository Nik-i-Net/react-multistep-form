import { useReducer } from "react";
import { FormContext, formReducer, initialFormState, useFormContext } from "./state/FormContext";
import PersonalInfoStep from "./steps/01-PersonalInfo";
import StepNav from "./StepNav";
import CompleteStep from "./steps/Complete";
import SelectPlanStep from "./steps/02-SelectPlan";
import AddOnsStep from "./steps/03-AddOns";
import SummaryStep from "./steps/04-Summary";
import Button from "./components/Button";
import { useFormNavigation } from "./hooks/useFormNavigation";
import clsx from "clsx";

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
  const { nextStep, backStep } = useFormNavigation();
  const step = state.activeStep;

  if (state.isCompleted) return null;

  return (
    <div
      className={clsx(
        "flex",
        step === 1 ? "justify-end" : "justify-between",
        "max-md:fixed max-md:bottom-0 max-md:left-0 max-md:right-0 max-md:bg-white max-md:p-3.5",
      )}
    >
      {step > 1 && (
        <Button variant="ghost" onClick={backStep}>
          Go Back
        </Button>
      )}
      {step < 4 ? (
        <Button onClick={nextStep}>Next Step</Button>
      ) : (
        <Button variant="accent" onClick={() => dispatch({ type: "CONFIRM_ORDER" })}>
          Confirm
        </Button>
      )}
    </div>
  );
}

function App() {
  const [state, dispatch] = useReducer(formReducer, initialFormState);

  return (
    <main className="min-h-screen bg-surface flex justify-center items-center p-4 max-md:p-0">
      <FormContext value={{ state, dispatch }}>
        <div className="max-w-235 w-full flex gap-4 bg-white rounded-2xl p-4 shadow-lg max-md:bg-transparent max-md:shadow-none max-md:p-0 max-md:flex-col max-md:items-center max-md:min-h-screen">
          <StepNav />
          <div className="pt-11 pb-4 px-21 flex-1 flex flex-col justify-between max-md:bg-white max-md:rounded-lg max-md:w-9/10 max-md:shadow-lg max-md:px-6 max-md:py-8 max-md:-mt-26 max-md:flex-0 max-lg:px-6">
            <ActiveStep />
            <StepActions />
          </div>
        </div>
      </FormContext>
    </main>
  );
}

export default App;
