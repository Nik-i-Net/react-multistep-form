import clsx from "clsx";
import { BILLING_MODES, PLANS, type BillingMode, type Plan } from "../data";
import { useFormContext } from "../state/FormContext";
import StepHeader from "../StepHeader";

interface PlanCardProps {
  plan: Plan;
  billingMode: BillingMode;
}

function PlanCard({ plan, billingMode }: PlanCardProps) {
  const { state, dispatch } = useFormContext();

  return (
    <label
      className="cursor-pointer pt-5 px-4 pb-4 rounded-lg border border-border
      has-checked:border-accent has-checked:bg-background
      hover:border-accent max-md:flex max-md:gap-3 max-md:py-3.75"
    >
      <input
        type="radio"
        name="plan"
        className="sr-only"
        checked={state.planId === plan.id}
        onChange={() => dispatch({ type: "SELECT_PLAN", payload: plan.id })}
      />
      <img src={plan.icon} alt="" className="max-md:h-10 max-md:mt-1" />
      <div>
        <p className="text-primary font-bold mt-10 max-md:mt-0">{plan.name}</p>
        <p className="text-muted text-sm">
          ${plan.price * billingMode.multiplier}/{billingMode.short}
        </p>
        {billingMode.id === "yearly" && (
          <p className="mt-1 text-xs text-primary font-medium tracking-tighter">
            {billingMode.promoLabel}
          </p>
        )}
      </div>
    </label>
  );
}

function SelectPlanStep() {
  const { state, dispatch } = useFormContext();
  const billingMode = BILLING_MODES.find((i) => i.id === state.billingId)!;

  return (
    <div className="select-none">
      <StepHeader
        title="Select your plan"
        description="You have the option of monthly or yearly billing."
      />

      <div
        className="mt-9 grid grid-cols-3 gap-4.5 max-md:mt-5 max-md:grid-cols-1 max-md:gap-3"
        role="radiogroup"
      >
        {PLANS.map((plan) => (
          <PlanCard key={plan.id} plan={plan} billingMode={billingMode} />
        ))}
      </div>

      <div className="mt-8 py-3.5 flex justify-center items-center gap-6 rounded-lg bg-background max-md:mt-6 max-md:py-3">
        <label className="cursor-pointer">
          <input
            type="radio"
            name="billing"
            value="monthly"
            className="sr-only"
            checked={state.billingId === "monthly"}
            onChange={() => dispatch({ type: "SET_BILLING", payload: "monthly" })}
          />
          <span
            className={clsx(
              "font-bold text-sm",
              state.billingId === "monthly" ? "text-primary" : "text-muted",
            )}
          >
            Monthly
          </span>
        </label>

        <div
          className="w-9 h-5 p-1 rounded-full bg-primary cursor-pointer transition-all"
          onClick={() =>
            dispatch({
              type: "SET_BILLING",
              payload: state.billingId === "monthly" ? "yearly" : "monthly",
            })
          }
        >
          <div
            className={clsx(
              "w-3 h-3 rounded-full bg-white",
              state.billingId === "yearly" && "ml-auto",
            )}
          />
        </div>

        <label className="cursor-pointer">
          <input
            type="radio"
            name="billing"
            value="yearly"
            className="sr-only"
            checked={state.billingId === "yearly"}
            onChange={() => dispatch({ type: "SET_BILLING", payload: "yearly" })}
          />
          <span
            className={clsx(
              "font-bold text-sm",
              state.billingId === "yearly" ? "text-primary" : "text-muted",
            )}
          >
            Yearly
          </span>
        </label>
      </div>
    </div>
  );
}

export default SelectPlanStep;
