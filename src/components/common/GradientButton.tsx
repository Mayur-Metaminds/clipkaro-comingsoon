import { ButtonHTMLAttributes, forwardRef } from "react";
import { cn } from "../../lib/utils";

export interface GradientButtonProps
  extends ButtonHTMLAttributes<HTMLButtonElement> {
  className?: string;
}

export const GradientButton = forwardRef<HTMLButtonElement, GradientButtonProps>(
  ({ className, children, ...props }, ref) => {
    return (
      <button
        ref={ref}
        className={cn(
          "inline-flex items-center justify-center rounded-lg bg-gradient-to-r from-[#7C3AED] to-[#EC4899] px-4 py-2 text-sm font-medium text-white transition-opacity hover:opacity-90 focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2",
          className,
        )}
        {...props}
      >
        {children}
      </button>
    );
  },
);

GradientButton.displayName = "GradientButton";
