/**
 * Brand Utilities
 * Generate CSS variables and utilities from brand configuration
 */

import { brandTokens } from "@/config/brand";

/**
 * Generate CSS variables from brand tokens
 * Call this to get a CSS string for injection
 */
export function generateBrandCSS(): string {
  const tokens = brandTokens;
  const variables: string[] = [];

  // Add brand name
  variables.push(`  /* Brand: ${tokens.name} */`);
  variables.push("");

  // Primary colors
  variables.push("  /* Primary Colors */");
  Object.entries(tokens.colors.primary).forEach(([shade, color]) => {
    variables.push(`  --color-primary-${shade}: ${color};`);
  });
  variables.push("");

  // Secondary colors
  variables.push("  /* Secondary Colors */");
  Object.entries(tokens.colors.secondary).forEach(([shade, color]) => {
    variables.push(`  --color-secondary-${shade}: ${color};`);
  });
  variables.push("");

  // Accent colors
  variables.push("  /* Accent Colors */");
  Object.entries(tokens.colors.accent).forEach(([shade, color]) => {
    variables.push(`  --color-accent-${shade}: ${color};`);
  });
  variables.push("");

  // Semantic colors
  variables.push("  /* Semantic Colors */");
  variables.push(`  --color-success: ${tokens.colors.success};`);
  variables.push(`  --color-warning: ${tokens.colors.warning};`);
  variables.push(`  --color-error: ${tokens.colors.error};`);
  variables.push(`  --color-info: ${tokens.colors.info};`);
  variables.push("");

  // Typography
  variables.push("  /* Typography */");
  variables.push(`  --font-family: ${tokens.typography.fontFamily};`);
  variables.push(`  --font-heading: ${tokens.typography.headingFont};`);
  variables.push(`  --font-mono: ${tokens.typography.monoFont};`);
  Object.entries(tokens.typography.fontSize).forEach(([size, value]) => {
    variables.push(`  --font-size-${size}: ${value};`);
  });
  variables.push("");

  // Spacing
  variables.push("  /* Spacing */");
  tokens.spacing.forEach((value, index) => {
    variables.push(`  --spacing-${index}: ${value};`);
  });
  variables.push("");

  // Border radius
  variables.push("  /* Border Radius */");
  Object.entries(tokens.radius).forEach(([size, value]) => {
    variables.push(`  --radius-${size}: ${value};`);
  });
  variables.push("");

  // Shadows
  variables.push("  /* Shadows */");
  Object.entries(tokens.shadows).forEach(([size, value]) => {
    variables.push(`  --shadow-${size}: ${value};`);
  });

  return `:root {\n${variables.join("\n")}\n}`;
}

/**
 * Get brand color value
 * Useful for programmatic access to brand colors
 */
export function getBrandColor(
  color: "primary" | "secondary" | "accent",
  shade: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950
): string {
  return brandTokens.colors[color][shade];
}

/**
 * Get semantic color value
 */
export function getSemanticColor(
  type: "success" | "warning" | "error" | "info"
): string {
  return brandTokens.colors[type];
}

/**
 * Generate Tailwind CSS config object
 * Use this if you want to extend Tailwind with brand colors
 */
export function generateTailwindConfig() {
  const tokens = brandTokens;

  return {
    theme: {
      extend: {
        colors: {
          primary: tokens.colors.primary,
          secondary: tokens.colors.secondary,
          accent: tokens.colors.accent,
          success: tokens.colors.success,
          warning: tokens.colors.warning,
          error: tokens.colors.error,
          info: tokens.colors.info,
        },
        fontFamily: {
          sans: [tokens.typography.fontFamily],
          heading: [tokens.typography.headingFont],
          mono: [tokens.typography.monoFont],
        },
        fontSize: tokens.typography.fontSize,
        spacing: Object.fromEntries(
          tokens.spacing.map((value, i) => [i, value])
        ),
        borderRadius: tokens.radius,
        boxShadow: tokens.shadows,
      },
    },
  };
}

/**
 * Export brand tokens for use in components
 */
export { brandTokens };
