interface StepHeaderProps {
  title: string;
  description: string;
}

function StepHeader({ title, description }: StepHeaderProps) {
  return (
    <div>
      <h1 className="text-[2rem] font-bold leading-8 text-primary max-md:text-2xl">{title}</h1>
      <p className="mt-3 text-muted max-md:mt-2">{description}</p>
    </div>
  );
}

export default StepHeader;
