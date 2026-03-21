

/**
 * Generate CSS variables from design tokens
 * This ensures globals.css stays in sync with design-tokens.ts
 */
export function generateCSSVariables() {
  // const tokens = designTokens;

  // return `
  // /* Background & Foreground */
  // --background: #ffffff;
  // --foreground: #171717;

  // /* Brand Colors - Primary */
  // --color-primary-50: ${tokens.brand.primary[50]};
  // --color-primary-100: ${tokens.brand.primary[100]};
  // --color-primary-200: ${tokens.brand.primary[200]};
  // --color-primary-300: ${tokens.brand.primary[300]};
  // --color-primary-400: ${tokens.brand.primary[400]};
  // --color-primary-500: ${tokens.brand.primary[500]};
  // --color-primary-600: ${tokens.brand.primary[600]};
  // --color-primary-700: ${tokens.brand.primary[700]};
  // --color-primary-800: ${tokens.brand.primary[800]};
  // --color-primary-900: ${tokens.brand.primary[900]};
  // --color-primary: var(--color-primary-600);

  // /* Brand Colors - Accent */
  // --color-accent-50: ${tokens.brand.accent[50]};
  // --color-accent-100: ${tokens.brand.accent[100]};
  // --color-accent-200: ${tokens.brand.accent[200]};
  // --color-accent-300: ${tokens.brand.accent[300]};
  // --color-accent-400: ${tokens.brand.accent[400]};
  // --color-accent-500: ${tokens.brand.accent[500]};
  // --color-accent-600: ${tokens.brand.accent[600]};
  // --color-accent-700: ${tokens.brand.accent[700]};
  // --color-accent-800: ${tokens.brand.accent[800]};
  // --color-accent-900: ${tokens.brand.accent[900]};
  // --color-accent: var(--color-accent-600);

  // /* Semantic Colors */
  // --color-success: ${tokens.semantic.success.main};
  // --color-success-light: ${tokens.semantic.success.light};
  // --color-success-dark: ${tokens.semantic.success.dark};

  // --color-warning: ${tokens.semantic.warning.main};
  // --color-warning-light: ${tokens.semantic.warning.light};
  // --color-warning-dark: ${tokens.semantic.warning.dark};

  // --color-error: ${tokens.semantic.error.main};
  // --color-error-light: ${tokens.semantic.error.light};
  // --color-error-dark: ${tokens.semantic.error.dark};

  // --color-info: ${tokens.semantic.info.main};
  // --color-info-light: ${tokens.semantic.info.light};
  // --color-info-dark: ${tokens.semantic.info.dark};

  // /* Typography */
  // --font-sans: ${tokens.typography.fontFamily.sans};
  // --font-mono: ${tokens.typography.fontFamily.mono};
  // --font-display: ${tokens.typography.fontFamily.display};

  // /* Spacing */
  // --spacing-xs: ${tokens.spacing.xs};
  // --spacing-sm: ${tokens.spacing.sm};
  // --spacing-md: ${tokens.spacing.md};
  // --spacing-lg: ${tokens.spacing.lg};
  // --spacing-xl: ${tokens.spacing.xl};
  // --spacing-2xl: ${tokens.spacing["2xl"]};
  // --spacing-3xl: ${tokens.spacing["3xl"]};
  // --spacing-4xl: ${tokens.spacing["4xl"]};

  // /* Border Radius */
  // --radius-none: ${tokens.radius.none};
  // --radius-sm: ${tokens.radius.sm};
  // --radius-md: ${tokens.radius.md};
  // --radius-lg: ${tokens.radius.lg};
  // --radius-xl: ${tokens.radius.xl};
  // --radius-2xl: ${tokens.radius["2xl"]};
  // --radius-full: ${tokens.radius.full};

  // /* Shadows */
  // --shadow-sm: ${tokens.shadows.sm};
  // --shadow-md: ${tokens.shadows.md};
  // --shadow-lg: ${tokens.shadows.lg};
  // --shadow-xl: ${tokens.shadows.xl};
  // --shadow-2xl: ${tokens.shadows["2xl"]};
  // --shadow-inner: ${tokens.shadows.inner};

  // /* Animation */
  // --duration-fast: ${tokens.animation.duration.fast};
  // --duration-normal: ${tokens.animation.duration.normal};
  // --duration-slow: ${tokens.animation.duration.slow};
  // `.trim();
}

/**
 * Get dark mode CSS variables
 */
export function generateDarkModeVariables() {
  return `
  --background: #0a0a0a;
  --foreground: #ededed;

  /* Adjust shadows for dark mode */
  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.3);
  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.4);
  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.5);
  --shadow-xl: 0 20px 25px -5px rgb(0 0 0 / 0.6);
  `.trim();
}

// Export for scripts
if (typeof module !== "undefined") {
  module.exports = { generateCSSVariables, generateDarkModeVariables };
}
