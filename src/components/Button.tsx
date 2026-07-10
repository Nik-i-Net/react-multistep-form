import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "accent" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const baseClasses =
    "rounded-md font-medium transition-colors hover:cursor-pointer max-md:font-normal";
  const styles = {
    primary: "px-6 py-3 bg-primary text-white hover:bg-primary/90 max-md:px-4 max-md:py-2.5",
    accent: "px-6 py-3 bg-accent text-white hover:bg-accent/90 max-md:py-2.5",
    ghost: "bg-transparent text-muted hover:text-primary",
  };

  return (
    <button className={`${baseClasses} ${styles[variant]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
