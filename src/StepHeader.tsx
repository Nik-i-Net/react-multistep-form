interface StepHeaderProps {
  title: string;
  description: string;
}

function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div>
      <h1 className="text-[2rem] leading-8 font-bold text-primary max-md:text-2xl">{title}</h1>
      <p className="text-muted mt-3 max-md:mt-2">{description}</p>
    </div>
  );
}

export default StepHeader;
