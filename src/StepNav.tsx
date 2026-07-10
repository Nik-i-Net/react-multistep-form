import clsx from "clsx";
import { useFormContext } from "./state/FormContext";
import { useFormNavigation } from "./hooks/useFormNavigation";

const STEPS = [
  { number: 1, label: "Your info" },
  { number: 2, label: "Select plan" },
  { number: 3, label: "Add-ons" },
  { number: 4, label: "Summary" },
];

function StepNav() {
  const { state } = useFormContext();
  const { goToStep } = useFormNavigation();

  return (
    <nav
      className="px-8 py-9 text-white w-68.5 h-142 flex flex-col gap-7 bg-no-repeat bg-cover rounded-lg
        bg-[url('/bg-sidebar-desktop.svg')] max-md:bg-[url('/bg-sidebar-mobile.svg')]"
    >
      {STEPS.map((step) => {
        const isActive = step.number === state.activeStep;
        const isReachable = state.maxStep >= step.number && !state.isCompleted;
        const isClickable = isReachable && !isActive;
        const buttonClass = clsx(
          "rounded-full w-8 h-8 flex items-center justify-center font-medium",
          isActive ? "bg-selected text-primary" : "border border-white text-white",
          isClickable ? "cursor-pointer" : "cursor-default",
        );
        const handleClick = isClickable
          ? () => goToStep(step.number)
          : undefined;

        return (
          <div key={step.number} className="flex items-center gap-4">
            <button onClick={handleClick} className={buttonClass} type="button">
              {step.number}
            </button>
            <div className="hidden md:block">
              <p className="text-muted text-xs leading-4 uppercase">Step {step.number}</p>
              <p className="text-white text-sm font-bold tracking-wider uppercase">{step.label}</p>
            </div>
          </div>
        );
      })}
    </nav>
  );
}

export default StepNav;
