import { ADD_ONS, BILLING_MODES, PLANS } from "../data";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../StepHeader";

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

      <div className="mt-9 pt-4 px-6 pb-6 rounded-lg bg-background flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-primary font-medium">
              {plan.name} ({billingMode.name})
            </p>
            <button
              type="button"
              className="text-sm text-muted font-medium underline cursor-pointer hover:text-accent"
              onClick={() => dispatch({ type: "GO_TO_STEP", payload: 2 })}
            >
              Change
            </button>
          </div>
          <p className="text-primary font-bold">
            ${plan.price * billingMode.multiplier}/{billingMode.short}
          </p>
        </div>

        {addOns.length > 0 && (
          <>
            <hr className="border-0 border-b border-border" />

            <div className="flex flex-col gap-4">
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

      <div className="mt-5 px-6 flex justify-between items-center">
        <p className="text-sm text-muted">
          Total (per {billingMode.id === "monthly" ? "month" : "year"})
        </p>
        <p className="text-xl font-bold text-accent">
          ${total}/{billingMode.short}
        </p>
      </div>
    </div>
  );
}

export default SummaryStep;
