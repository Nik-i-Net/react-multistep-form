import clsx from "clsx";
import type { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className">;

function Input({ label, name, error, className, ...inputProps }: InputProps) {
  return (
    <div className={clsx("flex flex-col gap-1", className)}>
      <div className="flex justify-between">
        <label htmlFor={name} className="text-sm font-medium text-primary max-md:text-xs">
          {label}
        </label>
        {error && <p className="text-sm font-bold text-error max-md:text-xs">{error}</p>}
      </div>
      <input
        id={name}
        name={name}
        className={clsx(
          "px-4 py-3 border rounded-lg text-primary font-bold",
          "placeholder:font-medium placeholder:text-muted",
          "focus:outline-none",
          error ? "border-error" : "border-border focus:border-accent",
          "max-md:py-2 max-md:rounded-sm",
        )}
        {...inputProps}
      />
    </div>
  );
}

export default Input;
