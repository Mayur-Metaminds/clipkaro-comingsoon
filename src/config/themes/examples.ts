/**
 * Example Brand Themes
 * Copy one of these to globals.css to quickly rebrand
 */

export const exampleThemes = {
  /**
   * Tech Startup Theme - Modern Purple/Pink
   */
  techStartup: `
    --color-primary-600: #a855f7;  /* Purple */
    --color-primary-700: #9333ea;
    --color-primary-500: #c084fc;
    --color-accent-600: #ec4899;   /* Pink */
  `,

  /**
   * Fintech Theme - Professional Green
   */
  fintech: `
    --color-primary-600: #059669;  /* Emerald */
    --color-primary-700: #047857;
    --color-primary-500: #10b981;
    --color-accent-600: #0891b2;   /* Cyan */
  `,

  /**
   * E-commerce Theme - Vibrant Orange
   */
  ecommerce: `
    --color-primary-600: #ea580c;  /* Orange */
    --color-primary-700: #c2410c;
    --color-primary-500: #f97316;
    --color-accent-600: #dc2626;   /* Red */
  `,

  /**
   * SaaS Theme - Clean Indigo
   */
  saas: `
    --color-primary-600: #4f46e5;  /* Indigo */
    --color-primary-700: #4338ca;
    --color-primary-500: #6366f1;
    --color-accent-600: #7c3aed;   /* Violet */
  `,

  /**
   * Healthcare Theme - Calm Teal
   */
  healthcare: `
    --color-primary-600: #0d9488;  /* Teal */
    --color-primary-700: #0f766e;
    --color-primary-500: #14b8a6;
    --color-accent-600: #06b6d4;   /* Cyan */
  `,

  /**
   * Dark Mode Optimized Theme
   */
  darkMode: `
    --color-primary-600: #60a5fa;  /* Light Blue for dark bg */
    --color-primary-700: #3b82f6;
    --color-primary-500: #93c5fd;
    --color-accent-600: #c084fc;   /* Light Purple */
  `,
};

/**
 * Instructions to Apply a Theme:
 *
 * 1. Choose a theme from above
 * 2. Copy the CSS variables
 * 3. Paste into src/styles/globals.css under :root
 * 4. Save and refresh - your app is rebranded!
 *
 * Example:
 * ```css
 * :root {
 *   --color-primary-600: #a855f7;
 *   --color-primary-700: #9333ea;
 *   --color-primary-500: #c084fc;
 *   --color-accent-600: #ec4899;
 *   ... rest of your variables
 * }
 * ```
 */
