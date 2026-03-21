/**
 * Unified Theme Configuration
 *
 * This is the single source of truth for all theming.
 * Changes here will automatically update:
 * - shadcn/ui components
 * - Custom components
 * - CSS variables
 * - Tailwind theme
 */

export const themeConfig = {
  /**
   * Brand Colors
   * These map to both your design tokens and shadcn's color system
   */
  colors: {
    // Primary brand color (used in buttons, links, focus states)
    primary: {
      50: "#eff6ff",
      100: "#dbeafe",
      200: "#bfdbfe",
      300: "#93c5fd",
      400: "#60a5fa",
      500: "#3b82f6",
      600: "#2563eb", // Main brand color
      700: "#1d4ed8",
      800: "#1e40af",
      900: "#1e3a8a",
      950: "#172554",
    },

    // Secondary/neutral colors (used for backgrounds, borders, text)
    secondary: {
      50: "#f8fafc",
      100: "#f1f5f9",
      200: "#e2e8f0",
      300: "#cbd5e1",
      400: "#94a3b8",
      500: "#64748b",
      600: "#475569",
      700: "#334155",
      800: "#1e293b",
      900: "#0f172a",
      950: "#020617",
    },

    // Accent color (used for highlights, call-to-actions)
    accent: {
      50: "#faf5ff",
      100: "#f3e8ff",
      200: "#e9d5ff",
      300: "#d8b4fe",
      400: "#c084fc",
      500: "#a855f7",
      600: "#9333ea", // Main accent color
      700: "#7e22ce",
      800: "#6b21a8",
      900: "#581c87",
      950: "#3b0764",
    },

    // Semantic colors (success, warning, error, info)
    success: {
      50: "#f0fdf4",
      100: "#dcfce7",
      500: "#22c55e",
      600: "#16a34a",
      700: "#15803d",
    },
    warning: {
      50: "#fffbeb",
      100: "#fef3c7",
      500: "#f59e0b",
      600: "#d97706",
      700: "#b45309",
    },
    error: {
      50: "#fef2f2",
      100: "#fee2e2",
      500: "#ef4444",
      600: "#dc2626",
      700: "#b91c1c",
    },
    info: {
      50: "#eff6ff",
      100: "#dbeafe",
      500: "#3b82f6",
      600: "#2563eb",
      700: "#1d4ed8",
    },
  },

  /**
   * Typography
   */
  typography: {
    fontFamily: {
      sans: "var(--font-geist-sans), -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
      mono: "var(--font-geist-mono), 'SF Mono', Monaco, 'Courier New', monospace",
    },
    fontSize: {
      xs: "0.75rem",
      sm: "0.875rem",
      base: "1rem",
      lg: "1.125rem",
      xl: "1.25rem",
      "2xl": "1.5rem",
      "3xl": "1.875rem",
      "4xl": "2.25rem",
      "5xl": "3rem",
    },
  },

  /**
   * Border Radius
   * Controls the roundness of components
   */
  radius: {
    sm: "0.375rem",
    md: "0.5rem",
    lg: "var(--radius)", // shadcn default
    xl: "1rem",
    "2xl": "1.5rem",
  },

  /**
   * Shadows
   */
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  /**
   * Animation
   */
  animation: {
    duration: {
      fast: "150ms",
      normal: "200ms",
      slow: "300ms",
    },
  },
} as const;

/**
 * Pre-made theme presets
 * Apply these to quickly rebrand your app
 */
export const themePresets = {
  techStartup: {
    primary: {
      600: "#a855f7",
      700: "#9333ea",
      500: "#c084fc",
    },
    accent: {
      600: "#ec4899",
      700: "#db2777",
      500: "#f472b6",
    },
  },
  fintech: {
    primary: {
      600: "#059669",
      700: "#047857",
      500: "#10b981",
    },
    accent: {
      600: "#0891b2",
      700: "#0e7490",
      500: "#06b6d4",
    },
  },
  ecommerce: {
    primary: {
      600: "#ea580c",
      700: "#c2410c",
      500: "#f97316",
    },
    accent: {
      600: "#dc2626",
      700: "#b91c1c",
      500: "#ef4444",
    },
  },
  saas: {
    primary: {
      600: "#4f46e5",
      700: "#4338ca",
      500: "#6366f1",
    },
    accent: {
      600: "#7c3aed",
      700: "#6d28d9",
      500: "#8b5cf6",
    },
  },
};

export type ThemeConfig = typeof themeConfig;
export type ThemePreset = keyof typeof themePresets;
