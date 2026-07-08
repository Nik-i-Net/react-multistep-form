import type { ButtonHTMLAttributes } from "react";

type ButtonProps = {
  variant?: "primary" | "ghost";
} & ButtonHTMLAttributes<HTMLButtonElement>;

function Button({ variant = "primary", className, children, ...props }: ButtonProps) {
  const baseClasses = "rounded-md font-medium transition-colors hover:cursor-pointer";
  const styles = {
    primary: "px-6 py-3 bg-primary text-white hover:bg-primary/90",
    ghost: "bg-transparent text-muted hover:text-primary",
  };

  return (
    <button className={`${baseClasses} ${styles[variant]} ${className ?? ""}`} {...props}>
      {children}
    </button>
  );
}

export default Button;
