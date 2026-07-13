import { useFormContext } from "../state/FormContext";
import { stepValidators } from "../lib/validation";

export function useFormNavigation() {
  const { state, dispatch } = useFormContext();

  function validateSteps(from: number, to: number): boolean {
    let allValid = true;
    for (let step = from; step < to; step++) {
      const validate = stepValidators[step];
      if (!validate) continue;
      const errors = validate(state);
      const hasErrors = Object.values(errors).some((e) => e !== undefined);
      if (hasErrors) {
        dispatch({ type: "SET_ERRORS", payload: errors });
        allValid = false;
      }
    }
    return allValid;
  }

  function nextStep() {
    if (!validateSteps(state.activeStep, state.activeStep + 1)) return;
    dispatch({ type: "NEXT_STEP" });
  }

  function goToStep(step: number) {
    if (step > state.activeStep && !validateSteps(state.activeStep, step)) return;
    dispatch({ type: "GO_TO_STEP", payload: step });
  }

  function backStep() {
    dispatch({ type: "BACK_STEP" });
  }

  return { nextStep, goToStep, backStep };
}
