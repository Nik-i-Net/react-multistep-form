import clsx from "clsx";
import { ADD_ONS, BILLING_MODES, PLANS } from "../data/subscriptions";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../components/StepHeader";

function SummaryStep() {
  const { state, dispatch } = useFormContext();
  const plan = PLANS.find((i) => i.id === state.planId)!;
  const billingMode = BILLING_MODES.find((i) => i.id === state.billingId)!;
  const addOns = ADD_ONS.filter((i) => state.addOnIds.includes(i.id));
  const total =
    (plan.price + addOns.reduce((sum, cur) => sum + cur.price, 0)) * billingMode.multiplier;

  return (
    <div className="select-none">
      <StepHeader
        title="Finishing up"
        description="Double-check everything looks OK before confirming."
      />

      <div
        className={clsx(
          "flex flex-col gap-5 mt-9 pt-4 px-6 pb-6 bg-background rounded-lg",
          "max-md:gap-2.5 max-md:mt-5 max-md:pb-4",
        )}
      >
        <div className="flex justify-between items-center">
          <div>
            <p className="text-primary font-medium max-md:text-sm max-md:font-bold">
              {plan.name} ({billingMode.name})
            </p>
            <button
              type="button"
              className="text-sm font-medium underline text-muted cursor-pointer hover:text-accent"
              onClick={() => dispatch({ type: "GO_TO_STEP", payload: 2 })}
            >
              Change
            </button>
          </div>
          <p className="text-primary font-bold max-md:text-sm">
            ${plan.price * billingMode.multiplier}/{billingMode.short}
          </p>
        </div>

        {addOns.length > 0 && (
          <>
            <hr className="border-0 border-b border-border" />

            <div className="flex flex-col gap-4 max-md:gap-2.5">
              {addOns.map((addOn) => (
                <div className="flex justify-between" key={addOn.id}>
                  <p className="text-sm text-muted">{addOn.name}</p>
                  <p className="text-sm text-primary">
                    +${addOn.price * billingMode.multiplier}/{billingMode.short}
                  </p>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      <div className="flex justify-between items-center mt-5 px-6">
        <p className="text-sm text-muted">
          Total (per {billingMode.id === "monthly" ? "month" : "year"})
        </p>
        <p className="text-xl font-bold text-accent max-md:text-base">
          ${total}/{billingMode.short}
        </p>
      </div>
    </div>
  );
}

export default SummaryStep;
