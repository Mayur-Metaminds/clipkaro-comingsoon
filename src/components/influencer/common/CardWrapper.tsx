"use client";

import { cn } from "@/lib/utils";

interface CardWrapperProps {
  children: React.ReactNode;
  className?: string;
  innerClassName?: string;
  variant?: "default" | "gradientBorder";
}

export function CardWrapper({
  children,
  className,
  innerClassName,
  variant = "default",
}: CardWrapperProps) {
  return (
    <div
      className={cn(
        "rounded-xl",
        variant === "gradientBorder" && "p-[1px]",
        className,
      )}
    >
      <div className={cn("rounded-xl", innerClassName)}>{children}</div>
    </div>
  );
}
