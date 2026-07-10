import thankYouIcon from "../assets/icons/icon-thank-you.svg";
import StepHeader from "../StepHeader";

function CompleteStep() {
  return (
    <div className="h-full flex flex-col justify-center items-center gap-8 text-center max-md:gap-6 max-md:tracking-tight max-md:py-10">
      <img src={thankYouIcon} className="w-20 h-20 max-md:w-14 max-md:h-14" alt="" />
      <StepHeader
        title="Thank you!"
        description="Thanks for confirming your subscription! We hope you have fun using our platform. If you ever need support, please feel free to email us at support@loremgaming.com."
      />
    </div>
  );
}

export default CompleteStep;
