"use client";

import { useEffect } from "react";
import { generateBrandCSS } from "../../lib/brandUtils";

/**
 * BrandProvider
 * Injects brand CSS variables into the document
 * This makes your brand colors available throughout the app
 *
 * Usage: Add to your root layout
 * ```tsx
 * <BrandProvider>
 *   {children}
 * </BrandProvider>
 * ```
 */
export function BrandProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Check if brand styles already exist
    const existingStyle = document.getElementById("brand-variables");
    if (existingStyle) {
      return;
    }

    // Generate and inject brand CSS
    const brandCSS = generateBrandCSS();
    const style = document.createElement("style");
    style.id = "brand-variables";
    style.textContent = brandCSS;
    document.head.appendChild(style);

    return () => {
      // Cleanup on unmount
      const styleElement = document.getElementById("brand-variables");
      if (styleElement) {
        styleElement.remove();
      }
    };
  }, []);

  return <>{children}</>;
}
