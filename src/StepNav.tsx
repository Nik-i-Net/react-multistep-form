import { useFormContext } from "./state/FormContext";

const STEPS = [
  { number: 1, label: "Your info" },
  { number: 2, label: "Select plan" },
  { number: 3, label: "Add-ons" },
  { number: 4, label: "Summary" },
];

function StepNav() {
  const { state } = useFormContext();

  return (
    <nav
      className="px-6 py-8 text-white w-68.5 h-142 flex flex-col gap-6 bg-no-repeat bg-cover rounded-xl
        bg-[url('/bg-sidebar-desktop.svg')] max-md:bg-[url('/bg-sidebar-mobile.svg')]"
    >
      {STEPS.map((step) => (
        <div key={step.number} className="flex items-center gap-4">
          <button
            className={`rounded-full w-8 h-8 flex items-center justify-center font-medium
            ${
              step.number === state.activeStep
                ? "bg-selected text-primary"
                : "border border-white text-white"
            }`}
          >
            {step.number}
          </button>
          <div className="hidden md:block">
            <p className="text-muted text-sm uppercase">Step {step.number}</p>
            <p className="text-white font-medium uppercase">{step.label}</p>
          </div>
        </div>
      ))}
    </nav>
  );
}

export default StepNav;
