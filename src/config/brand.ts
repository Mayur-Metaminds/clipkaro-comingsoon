/**
 * Brand Configuration System
 * Define your brand once, and everything updates automatically!
 *
 * This system provides:
 * - Automatic color palette generation from primary brand color
 * - Type-safe brand configuration
 * - CSS variable generation
 * - Dark mode support
 * - Pre-built brand presets
 *
 * Usage:
 * 1. Define your brand in this file
 * 2. Run the app - all components automatically use your brand
 * 3. Switch brands by changing the active brand
 *
 * @example
 * ```ts
 * export const myBrand: Brand = {
 *   name: "My Company",
 *   colors: {
 *     primary: "#FF6B6B",
 *     secondary: "#4ECDC4",
 *     accent: "#FFE66D",
 *   },
 *   typography: {
 *     fontFamily: "Inter, sans-serif",
 *   },
 * };
 * ```
 */

export interface BrandColors {
  /** Primary brand color - main CTA buttons, links */
  primary: string;
  /** Secondary brand color - supporting elements */
  secondary: string;
  /** Accent color - highlights, badges */
  accent: string;
  /** Success state color */
  success?: string;
  /** Warning state color */
  warning?: string;
  /** Error state color */
  error?: string;
  /** Info state color */
  info?: string;
}

export interface BrandTypography {
  /** Primary font family for body text */
  fontFamily?: string;
  /** Font family for headings */
  headingFont?: string;
  /** Font family for code/monospace */
  monoFont?: string;
  /** Base font size (px) */
  baseFontSize?: number;
  /** Font scale ratio (e.g., 1.25 for Major Third) */
  scaleRatio?: number;
}

export interface BrandSpacing {
  /** Base spacing unit (px) */
  baseUnit?: number;
  /** Spacing scale multipliers */
  scale?: number[];
}

export interface BrandRadius {
  /** Border radius style */
  style?: "none" | "sm" | "md" | "lg" | "xl" | "full";
  /** Custom radius values (overrides style) */
  custom?: {
    sm?: string;
    md?: string;
    lg?: string;
    xl?: string;
  };
}

export interface BrandShadows {
  /** Shadow intensity */
  intensity?: "none" | "subtle" | "medium" | "strong";
  /** Use colored shadows (tinted with brand color) */
  colored?: boolean;
}

export interface BrandConfig {
  /** Brand name */
  name: string;
  /** Brand colors */
  colors: BrandColors;
  /** Typography settings */
  typography?: BrandTypography;
  /** Spacing settings */
  spacing?: BrandSpacing;
  /** Border radius settings */
  radius?: BrandRadius;
  /** Shadow settings */
  shadows?: BrandShadows;
  /** Dark mode colors (optional, auto-generated if not provided) */
  darkMode?: Partial<BrandColors>;
}

/**
 * Generate color shades from a base color
 * Creates 50-950 shades like Tailwind CSS
 */
function generateColorShades(hex: string): Record<number, string> {
  // Convert hex to RGB
  const hexToRgb = (hex: string) => {
    const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
    return result
      ? {
          r: parseInt(result[1], 16),
          g: parseInt(result[2], 16),
          b: parseInt(result[3], 16),
        }
      : { r: 0, g: 0, b: 0 };
  };

  const rgb = hexToRgb(hex);

  // Generate shades by adjusting lightness
  const shades: Record<number, string> = {};
  const levels = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

  levels.forEach((level) => {
    let factor = 1;
    if (level < 500) {
      // Lighter shades
      factor = 1 + ((500 - level) / 500) * 0.9;
    } else if (level > 500) {
      // Darker shades
      factor = 1 - ((level - 500) / 500) * 0.7;
    }

    const r = Math.min(255, Math.round(rgb.r * factor));
    const g = Math.min(255, Math.round(rgb.g * factor));
    const b = Math.min(255, Math.round(rgb.b * factor));

    shades[level] = `#${r.toString(16).padStart(2, "0")}${g.toString(16).padStart(2, "0")}${b.toString(16).padStart(2, "0")}`;
  });

  return shades;
}

/**
 * Default Brand - Modern Blue Theme
 */
export const defaultBrand: BrandConfig = {
  name: "Default",
  colors: {
    primary: "#3b82f6", // Blue
    secondary: "#64748b", // Slate
    accent: "#a855f7", // Purple
    success: "#10b981", // Green
    warning: "#f59e0b", // Amber
    error: "#ef4444", // Red
    info: "#3b82f6", // Blue
  },
  typography: {
    fontFamily: "var(--font-geist-sans), system-ui, sans-serif",
    headingFont: "var(--font-geist-sans), system-ui, sans-serif",
    monoFont: "var(--font-geist-mono), monospace",
    baseFontSize: 16,
    scaleRatio: 1.25, // Major Third
  },
  spacing: {
    baseUnit: 4,
    scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24],
  },
  radius: {
    style: "md",
  },
  shadows: {
    intensity: "medium",
    colored: false,
  },
};

/**
 * Preset Brands - Ready to use!
 */

// Tech Startup Brand
export const techStartupBrand: BrandConfig = {
  name: "Tech Startup",
  colors: {
    primary: "#6366f1", // Indigo
    secondary: "#8b5cf6", // Violet
    accent: "#ec4899", // Pink
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  radius: {
    style: "xl",
  },
  shadows: {
    intensity: "strong",
    colored: true,
  },
};

// E-commerce Brand
export const ecommerceBrand: BrandConfig = {
  name: "E-commerce",
  colors: {
    primary: "#f97316", // Orange
    secondary: "#78716c", // Stone
    accent: "#fbbf24", // Yellow
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  radius: {
    style: "sm",
  },
  shadows: {
    intensity: "subtle",
    colored: false,
  },
};

// SaaS Brand
export const saasBrand: BrandConfig = {
  name: "SaaS",
  colors: {
    primary: "#0ea5e9", // Sky
    secondary: "#06b6d4", // Cyan
    accent: "#8b5cf6", // Violet
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  typography: {
    baseFontSize: 15,
    scaleRatio: 1.2,
  },
  radius: {
    style: "lg",
  },
  shadows: {
    intensity: "medium",
    colored: false,
  },
};

// Fintech Brand
export const fintechBrand: BrandConfig = {
  name: "Fintech",
  colors: {
    primary: "#059669", // Emerald
    secondary: "#0f172a", // Slate
    accent: "#06b6d4", // Cyan
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  typography: {
    baseFontSize: 16,
  },
  radius: {
    style: "md",
  },
  shadows: {
    intensity: "subtle",
    colored: false,
  },
};

// Creative Agency Brand
export const creativeAgencyBrand: BrandConfig = {
  name: "Creative Agency",
  colors: {
    primary: "#ec4899", // Pink
    secondary: "#f97316", // Orange
    accent: "#eab308", // Yellow
    success: "#10b981",
    warning: "#f59e0b",
    error: "#ef4444",
    info: "#3b82f6",
  },
  radius: {
    style: "xl",
  },
  shadows: {
    intensity: "strong",
    colored: true,
  },
};

/**
 * Active Brand
 * Change this to switch your entire app's branding!
 *
 * Options:
 * - defaultBrand
 * - techStartupBrand
 * - ecommerceBrand
 * - saasBrand
 * - fintechBrand
 * - creativeAgencyBrand
 * - Or create your own!
 */
export const activeBrand: BrandConfig = defaultBrand;

/**
 * Generate complete theme tokens from brand config
 * This creates all the shades, CSS variables, etc.
 */
export function generateBrandTokens(brand: BrandConfig) {
  // Generate color shades
  const primaryShades = generateColorShades(brand.colors.primary);
  const secondaryShades = generateColorShades(brand.colors.secondary);
  const accentShades = generateColorShades(brand.colors.accent);

  // Generate spacing scale
  const spacing = brand.spacing || defaultBrand.spacing!;
  const spacingValues = spacing.scale!.map(
    (multiplier) => `${spacing.baseUnit! * multiplier}px`
  );

  // Generate font sizes based on scale ratio
  const typography = brand.typography || defaultBrand.typography!;
  const baseSize = typography.baseFontSize || 16;
  const ratio = typography.scaleRatio || 1.25;

  const fontSizes = {
    xs: `${baseSize * Math.pow(ratio, -2)}px`,
    sm: `${baseSize * Math.pow(ratio, -1)}px`,
    base: `${baseSize}px`,
    lg: `${baseSize * Math.pow(ratio, 1)}px`,
    xl: `${baseSize * Math.pow(ratio, 2)}px`,
    "2xl": `${baseSize * Math.pow(ratio, 3)}px`,
    "3xl": `${baseSize * Math.pow(ratio, 4)}px`,
    "4xl": `${baseSize * Math.pow(ratio, 5)}px`,
    "5xl": `${baseSize * Math.pow(ratio, 6)}px`,
  };

  // Generate radius values
  const radiusMap = {
    none: { sm: "0", md: "0", lg: "0", xl: "0" },
    sm: { sm: "0.25rem", md: "0.375rem", lg: "0.5rem", xl: "0.75rem" },
    md: { sm: "0.375rem", md: "0.5rem", lg: "0.75rem", xl: "1rem" },
    lg: { sm: "0.5rem", md: "0.75rem", lg: "1rem", xl: "1.5rem" },
    xl: { sm: "0.75rem", md: "1rem", lg: "1.5rem", xl: "2rem" },
    full: { sm: "9999px", md: "9999px", lg: "9999px", xl: "9999px" },
  };

  const radius = brand.radius?.custom || radiusMap[brand.radius?.style || "md"];

  // Generate shadows
  const shadowsMap = {
    none: {
      sm: "none",
      md: "none",
      lg: "none",
      xl: "none",
    },
    subtle: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.03)",
      md: "0 2px 4px 0 rgb(0 0 0 / 0.05)",
      lg: "0 4px 6px -1px rgb(0 0 0 / 0.07)",
      xl: "0 8px 12px -2px rgb(0 0 0 / 0.1)",
    },
    medium: {
      sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
      md: "0 4px 6px -1px rgb(0 0 0 / 0.1)",
      lg: "0 10px 15px -3px rgb(0 0 0 / 0.1)",
      xl: "0 20px 25px -5px rgb(0 0 0 / 0.1)",
    },
    strong: {
      sm: "0 2px 4px 0 rgb(0 0 0 / 0.1)",
      md: "0 6px 10px -2px rgb(0 0 0 / 0.15)",
      lg: "0 15px 25px -5px rgb(0 0 0 / 0.2)",
      xl: "0 25px 40px -10px rgb(0 0 0 / 0.25)",
    },
  };

  const shadows = shadowsMap[brand.shadows?.intensity || "medium"];

  return {
    name: brand.name,
    colors: {
      primary: primaryShades,
      secondary: secondaryShades,
      accent: accentShades,
      success: brand.colors.success || defaultBrand.colors.success!,
      warning: brand.colors.warning || defaultBrand.colors.warning!,
      error: brand.colors.error || defaultBrand.colors.error!,
      info: brand.colors.info || defaultBrand.colors.info!,
    },
    typography: {
      fontFamily: typography.fontFamily!,
      headingFont: typography.headingFont || typography.fontFamily!,
      monoFont: typography.monoFont!,
      fontSize: fontSizes,
    },
    spacing: spacingValues,
    radius,
    shadows,
  };
}

// Export the active brand tokens
export const brandTokens = generateBrandTokens(activeBrand);
