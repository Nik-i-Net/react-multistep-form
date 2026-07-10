import clsx from "clsx";
import { ADD_ONS, BILLING_MODES } from "../data";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../StepHeader";
import checkmarkIcon from "../assets/icons/icon-checkmark.svg";

function AddOnsStep() {
  const { state, dispatch } = useFormContext();
  const billingMode = BILLING_MODES.find((i) => i.id === state.billingId)!;

  return (
    <div className="select-none">
      <StepHeader title="Pick add-ons" description="Add-ons help enhance your gaming experience." />
      <div className="mt-9 flex flex-col gap-4">
        {ADD_ONS.map((addOn) => {
          const isActive = state.addOnIds.includes(addOn.id);

          return (
            <label
              className={clsx(
                "py-4 px-6 flex justify-between items-center",
                "border rounded-md cursor-pointer hover:border-accent",
                isActive ? "border-accent bg-background" : "border-border",
              )}
              key={addOn.id}
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  className="sr-only"
                  checked={isActive}
                  onChange={() => dispatch({ type: "TOGGLE_ADD_ON", payload: addOn.id })}
                />
                <span
                  className={clsx(
                    "w-5 h-5 border border-border rounded-sm flex justify-center items-center",
                    isActive && "bg-accent",
                  )}
                  aria-hidden
                >
                  <img src={checkmarkIcon} alt="" className={clsx(!isActive && "invisible")} />
                </span>

                <div className="ml-6">
                  <p className="text-primary font-bold tracking-tight">{addOn.name}</p>
                  <p className="text-sm text-muted">{addOn.description}</p>
                </div>
              </div>
              <p className="text-sm text-accent font-medium">
                +${addOn.price * billingMode.multiplier}/{billingMode.short}
              </p>
            </label>
          );
        })}
      </div>
    </div>
  );
}

export default AddOnsStep;
