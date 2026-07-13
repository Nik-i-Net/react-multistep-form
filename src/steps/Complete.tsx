import clsx from "clsx";
import thankYouIcon from "../assets/icons/icon-thank-you.svg";
import StepHeader from "../components/StepHeader";

function CompleteStep() {
  return (
    <div
      className={clsx(
        "flex flex-col justify-center items-center gap-8 h-full text-center",
        "max-md:gap-6 max-md:py-10 max-md:tracking-tight",
      )}
    >
      <img src={thankYouIcon} className="w-20 h-20 max-md:w-14 max-md:h-14" alt="" />
      <StepHeader
        title="Thank you!"
        description="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
      />
    </div>
  );
}

export default CompleteStep;
