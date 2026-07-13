import clsx from "clsx";
import { ADD_ONS, BILLING_MODES } from "../data/subscriptions";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../components/StepHeader";
import checkmarkIcon from "../assets/icons/icon-checkmark.svg";

function AddOnsStep() {
  const { state, dispatch } = useFormContext();
  const billingMode = BILLING_MODES.find((i) => i.id === state.billingId)!;

  return (
    <div className="select-none">
      <StepHeader title="Pick add-ons" description="Add-ons help enhance your gaming experience." />
      <div className="flex flex-col gap-4 mt-9 max-md:gap-3 max-md:mt-5">
        {ADD_ONS.map((addOn) => {
          const isActive = state.addOnIds.includes(addOn.id);

          return (
            <label
              className={clsx(
                "flex justify-between items-center py-4 px-6",
                "border rounded-md cursor-pointer hover:border-accent",
                isActive ? "border-accent bg-background" : "border-border",
                "max-md:py-2 max-md:px-4",
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
                    "flex justify-center items-center w-5 h-5 border border-border rounded-sm",
                    isActive && "bg-accent",
                  )}
                  aria-hidden
                >
                  <img src={checkmarkIcon} alt="" className={clsx(!isActive && "invisible")} />
                </span>

                <div className="ml-6 max-md:ml-4">
                  <p className="text-primary font-bold tracking-tight">{addOn.name}</p>
                  <p className="text-sm text-muted max-md:text-xs max-md:tracking-tight">
                    {addOn.description}
                  </p>
                </div>
              </div>
              <p className="text-sm font-medium text-accent max-md:text-xs">
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
