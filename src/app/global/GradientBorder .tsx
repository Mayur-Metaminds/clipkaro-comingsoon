import { cn } from "../../lib";
import React from "react";

interface GradientBorderProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  borderRadius?: string;
}

const GradientBorder = ({
  children,
  className = "",
  innerClassName = "",
  borderRadius = "12px",
}: GradientBorderProps) => {
  return (
    <div
      className={cn(
        "gradient-border-only-with-fix-bg relative box-border overflow-hidden",
        className
      )}
      style={{
        borderRadius: borderRadius,
      }}
    >
      <div className={cn("h-full w-full", innerClassName)}>{children}</div>
    </div>
  );
};

export default GradientBorder;
