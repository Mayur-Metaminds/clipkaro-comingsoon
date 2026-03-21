import * as React from "react";
import { cn } from "@/lib/utils";

export interface SpinnerProps extends React.HTMLAttributes<HTMLDivElement> {
  size?: "sm" | "md" | "lg";
  variant?: "default" | "secondary" | "muted";
}

/**
 * Loading spinner component (shadcn/ui compatible)
 * Integrates with the unified theme system
 */
export const Spinner = React.forwardRef<HTMLDivElement, SpinnerProps>(
  ({ size = "md", variant = "default", className, ...props }, ref) => {
    const sizes = {
      sm: "h-4 w-4 border-2",
      md: "h-8 w-8 border-[3px]",
      lg: "h-12 w-12 border-4",
    };

    const variants = {
      default: "border-primary/20 border-t-primary",
      secondary: "border-secondary/20 border-t-secondary",
      muted: "border-muted/20 border-t-muted-foreground",
    };

    return (
      <div
        ref={ref}
        role="status"
        aria-label="Loading"
        className={cn(
          "inline-block animate-spin rounded-full",
          sizes[size],
          variants[variant],
          className
        )}
        {...props}
      >
        <span className="sr-only">Loading...</span>
      </div>
    );
  }
);

Spinner.displayName = "Spinner";
