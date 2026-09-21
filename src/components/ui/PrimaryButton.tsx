import React, { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

export interface PrimaryButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  icon?: ReactNode;
  loading?: boolean;
  fullWidth?: boolean;
}

/**
 * Reusable Primary Button component based on Figma spec:
 * - border-radius: 0.25rem (rounded)
 * - background: var(--Primary, #5980A6)
 * - height: 2.5rem (40px)
 * - padding: 0.5rem 1rem (py-2 px-4)
 * - display: flex; justify-content: center; align-items: center; gap: 0.5rem
 */
export function PrimaryButton({
  children,
  icon,
  loading = false,
  fullWidth = true,
  disabled,
  type = "button",
  className,
  ...props
}: PrimaryButtonProps) {
  const isDisabled = disabled || loading;

  return (
    <button
      type={type}
      disabled={isDisabled}
      aria-disabled={isDisabled}
      aria-busy={loading}
      className={cn(
        "inline-flex h-10 items-center justify-center gap-2 rounded-md bg-primary px-4 py-2 text-sm font-medium text-white transition-all duration-200 select-none hover:bg-primary-hover active:scale-[0.99] disabled:cursor-not-allowed disabled:opacity-60 focus:outline-hidden focus-visible:ring-2 focus-visible:ring-primary/40",
        fullWidth ? "w-full self-stretch" : "w-auto",
        className
      )}
      {...props}
    >
      {loading ? (
        <span
          className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"
          aria-hidden="true"
        />
      ) : (
        <>
          <span>{children}</span>
          {icon && <span className="shrink-0">{icon}</span>}
        </>
      )}
    </button>
  );
}

export default PrimaryButton;
