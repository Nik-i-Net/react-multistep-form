import type { InputHTMLAttributes } from "react";

type InputProps = {
  label: string;
  name: string;
  error?: string;
  className?: string;
} & Omit<InputHTMLAttributes<HTMLInputElement>, "name" | "className">;

function Input({ label, name, error, className, ...inputProps }: InputProps) {
  return (
    <div className={`flex flex-col gap-1 ${className ?? ""}`}>
      <div className="flex justify-between">
        <label htmlFor={name} className="text-sm font-medium text-primary">
          {label}
        </label>
        {error && <p className="text-sm font-bold text-error">{error}</p>}
      </div>
      <input
        id={name}
        name={name}
        className={`border rounded-lg px-4 py-3 text-primary font-bold placeholder:font-medium placeholder:text-muted focus:outline-none
          ${error ? "border-error" : "border-border focus:border-accent"}`}
        {...inputProps}
      />
    </div>
  );
}

export default Input;
