import * as React from "react";
import { cn } from "@/lib/utils";

export interface FormErrorProps extends React.HTMLAttributes<HTMLParagraphElement> {
  message?: string;
}

/**
 * Form error message component (shadcn/ui compatible)
 * Integrates with the unified theme system
 */
export const FormError = React.forwardRef<HTMLParagraphElement, FormErrorProps>(
  ({ message, className, ...props }, ref) => {
    if (!message) return null;

    return (
      <p
        ref={ref}
        className={cn(
          "text-destructive mt-1 flex items-center gap-1.5 text-sm font-medium",
          className
        )}
        role="alert"
        {...props}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4 shrink-0"
        >
          <path
            fillRule="evenodd"
            d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-5a.75.75 0 01.75.75v4.5a.75.75 0 01-1.5 0v-4.5A.75.75 0 0110 5zm0 10a1 1 0 100-2 1 1 0 000 2z"
            clipRule="evenodd"
          />
        </svg>
        {message}
      </p>
    );
  }
);

FormError.displayName = "FormError";
