import type { ReactNode } from "react";

export const labelClass = "block text-[13px] font-semibold lg:text-[max(13px,1.15cqw)]";

/** 16px on phones: anything smaller makes iOS zoom the page when a field is focused. */
export const controlClass =
  "block w-full border-b-[1.5px] border-ink bg-transparent pb-2 pt-2 text-base outline-none placeholder:text-ink/60 md:pb-1.5 md:pt-1.5 md:text-sm lg:pt-[0.3cqw] lg:text-[max(13px,1.05cqw)]";

interface FieldProps {
  /** The id of the control inside, which the label points at. */
  id: string;
  label: string;
  /** Marks the field as required with a star; leave off for optional fields. */
  required?: boolean;
  error?: string;
  className?: string;
  children: ReactNode;
}

/** A labelled form field: the label, the control with its violet focus line, and an error message. */
export function Field({ id, label, required = false, error, className, children }: FieldProps) {
  return (
    <div className={className}>
      <label htmlFor={id} className={labelClass}>
        {label}
        {required && <span aria-hidden="true">*</span>}
      </label>
      <div className="relative after:absolute after:inset-x-0 after:bottom-0 after:h-[2px] after:origin-left after:scale-x-0 after:bg-violet after:transition-transform after:duration-300 focus-within:after:scale-x-100">
        {children}
      </div>
      {error && (
        <p id={`${id}-error`} className="mt-1 text-xs text-red-700 lg:text-[max(11px,1cqw)]">
          {error}
        </p>
      )}
    </div>
  );
}
