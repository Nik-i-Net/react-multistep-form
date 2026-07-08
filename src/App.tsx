import { useReducer } from "react";
import { FormContext, formReducer, initialState } from "./state/FormContext";
import PersonalInfoStep from "./steps/01-PersonalInfo";
import StepNav from "./StepNav";

function App() {
  const [state, dispatch] = useReducer(formReducer, initialState);

  return (
    <div>
      <FormContext value={{ state, dispatch }}>
        <StepNav />
        <PersonalInfoStep />
      </FormContext>
    </div>
  );
}

export default App;
