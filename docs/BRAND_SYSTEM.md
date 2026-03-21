# Brand Design System

A comprehensive, configurable design system that allows you to define your brand once and have everything update automatically across your entire application.

## Features

- 🎨 **One-Time Configuration** - Define your brand, everything updates
- 🎯 **Auto-Generated Color Shades** - Provide 1 color, get 11 shades
- 🌗 **Dark Mode Ready** - Automatic dark mode support
- 📦 **Pre-built Presets** - 5+ brand themes ready to use
- 🔧 **Fully Customizable** - Typography, spacing, shadows, and more
- 🚀 **Zero Runtime Overhead** - CSS variables for performance
- 💪 **TypeScript Support** - Full type safety
- 🎭 **Component Integration** - All UI components use brand colors

## Quick Start

### 1. Define Your Brand

Edit `/src/config/brand.ts`:

```tsx
import type { BrandConfig } from "@/config/brand";

export const myBrand: BrandConfig = {
  name: "My Company",
  colors: {
    primary: "#FF6B6B",    // Your main brand color
    secondary: "#4ECDC4",  // Supporting color
    accent: "#FFE66D",     // Highlight color
  },
  // Optional customizations
  typography: {
    fontFamily: "Inter, sans-serif",
    headingFont: "Poppins, sans-serif",
  },
  radius: {
    style: "lg", // Rounded corners
  },
  shadows: {
    intensity: "medium",
    colored: true, // Tinted shadows
  },
};

// Set as active brand
export const activeBrand: BrandConfig = myBrand;
```

### 2. Add BrandProvider

Wrap your app in `/src/app/layout.tsx`:

```tsx
import { BrandProvider } from "@/components/providers/BrandProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <BrandProvider>
          {children}
        </BrandProvider>
      </body>
    </html>
  );
}
```

### 3. Use Brand Colors

All components automatically use your brand colors!

```tsx
import { Button } from "@/components";

// This button now uses your brand's primary color
<Button variant="primary">Click Me</Button>
```

## Brand Configuration

### Complete BrandConfig Interface

```tsx
interface BrandConfig {
  /** Brand name */
  name: string;

  /** Brand colors - only need to define these! */
  colors: {
    primary: string;      // Main CTA color
    secondary: string;    // Supporting elements
    accent: string;       // Highlights, badges
    success?: string;     // Success states (default: green)
    warning?: string;     // Warning states (default: amber)
    error?: string;       // Error states (default: red)
    info?: string;        // Info states (default: blue)
  };

  /** Typography settings */
  typography?: {
    fontFamily?: string;       // Body text font
    headingFont?: string;      // Heading font
    monoFont?: string;         // Code/monospace font
    baseFontSize?: number;     // Base size in pixels
    scaleRatio?: number;       // Font size scale (1.25 = Major Third)
  };

  /** Spacing settings */
  spacing?: {
    baseUnit?: number;         // Base unit in pixels (default: 4)
    scale?: number[];          // Spacing multipliers
  };

  /** Border radius */
  radius?: {
    style?: "none" | "sm" | "md" | "lg" | "xl" | "full";
    custom?: {
      sm?: string;
      md?: string;
      lg?: string;
      xl?: string;
    };
  };

  /** Shadow settings */
  shadows?: {
    intensity?: "none" | "subtle" | "medium" | "strong";
    colored?: boolean;         // Tint shadows with brand color
  };

  /** Dark mode overrides (optional) */
  darkMode?: Partial<BrandColors>;
}
```

## Pre-built Brand Presets

### Default Brand (Modern Blue)

```tsx
import { defaultBrand } from "@/config/brand";

export const activeBrand = defaultBrand;
```

Clean, professional blue theme perfect for SaaS products.

### Tech Startup Brand

```tsx
import { techStartupBrand } from "@/config/brand";

export const activeBrand = techStartupBrand;
```

Bold indigo/violet with strong shadows. Great for tech companies.

### E-commerce Brand

```tsx
import { ecommerceBrand } from "@/config/brand";

export const activeBrand = ecommerceBrand;
```

Warm orange tones with subtle shadows. Perfect for online stores.

### SaaS Brand

```tsx
import { saasBrand } from "@/config/brand";

export const activeBrand = saasBrand;
```

Sky blue with modern typography. Optimized for B2B software.

### Fintech Brand

```tsx
import { fintechBrand } from "@/config/brand";

export const activeBrand = fintechBrand;
```

Professional emerald green. Perfect for financial applications.

### Creative Agency Brand

```tsx
import { creativeAgencyBrand } from "@/config/brand";

export const activeBrand = creativeAgencyBrand;
```

Vibrant pink/orange with strong colored shadows. Bold and creative.

## How It Works

### 1. Color Shade Generation

Provide **one color**, get **11 shades** (50, 100, 200, ... 950):

```tsx
colors: {
  primary: "#3b82f6"  // You provide this
}

// System generates:
primary: {
  50: "#eff6ff",   // Lightest
  100: "#dbeafe",
  // ... 9 more shades
  900: "#1e3a8a",
  950: "#172554"   // Darkest
}
```

### 2. CSS Variable Generation

Brand config → CSS variables:

```css
:root {
  /* Your primary color becomes */
  --color-primary-50: #eff6ff;
  --color-primary-100: #dbeafe;
  --color-primary-500: #3b82f6;
  --color-primary-600: #2563eb;
  --color-primary-900: #1e3a8a;

  /* Typography */
  --font-family: Inter, sans-serif;
  --font-size-base: 16px;

  /* Spacing */
  --spacing-0: 0px;
  --spacing-1: 4px;
  --spacing-4: 16px;

  /* And many more... */
}
```

### 3. Component Integration

Components use CSS variables:

```tsx
// Button component
className="bg-[var(--color-primary-600)] hover:bg-[var(--color-primary-700)]"

// Changes automatically when you switch brands!
```

## Using Brand Colors

### In Components

```tsx
import { Button, Card } from "@/components";

// Primary brand color
<Button variant="primary">Primary Action</Button>

// Secondary brand color
<Button variant="secondary">Secondary</Button>

// Outline with brand color
<Button variant="outline">Outlined</Button>
```

### In Custom CSS

```css
.my-element {
  background-color: var(--color-primary-600);
  color: var(--color-primary-50);
  border-radius: var(--radius-md);
  box-shadow: var(--shadow-lg);
}

.my-element:hover {
  background-color: var(--color-primary-700);
}
```

### In Tailwind

Use arbitrary values with CSS variables:

```tsx
<div className="bg-[var(--color-primary-600)] text-[var(--color-primary-50)]">
  Content
</div>
```

### Programmatically

```tsx
import { getBrandColor, getSemanticColor } from "@/lib/brandUtils";

// Get brand color
const primaryColor = getBrandColor("primary", 600); // "#3b82f6"

// Get semantic color
const successColor = getSemanticColor("success"); // "#10b981"
```

## Typography System

### Font Scale

The system uses a **modular scale** for font sizes:

```tsx
typography: {
  baseFontSize: 16,      // Base size in pixels
  scaleRatio: 1.25,      // Major Third scale
}

// Generates:
xs:   12.8px  (base / ratio²)
sm:   14.4px  (base / ratio)
base: 16px    (base)
lg:   20px    (base * ratio)
xl:   25px    (base * ratio²)
2xl:  31.25px (base * ratio³)
// ... up to 5xl
```

### Common Scale Ratios

| Ratio | Name           | Character    |
| ----- | -------------- | ------------ |
| 1.125 | Major Second   | Subtle       |
| 1.200 | Minor Third    | Compact      |
| 1.250 | Major Third    | Balanced ✨  |
| 1.333 | Perfect Fourth | Comfortable  |
| 1.414 | Augmented      | Dynamic      |
| 1.500 | Perfect Fifth  | Bold         |
| 1.618 | Golden Ratio   | Harmonious   |

### Using Typography

```tsx
// In components
<h1 style={{ fontSize: "var(--font-size-4xl)" }}>Heading</h1>
<p style={{ fontSize: "var(--font-size-base)" }}>Body text</p>

// In CSS
.heading {
  font-family: var(--font-heading);
  font-size: var(--font-size-3xl);
}
```

## Spacing System

### Base Unit Scale

```tsx
spacing: {
  baseUnit: 4,  // 4px base
  scale: [0, 0.25, 0.5, 1, 1.5, 2, 3, 4, 6, 8, 12, 16, 24]
}

// Generates:
--spacing-0:  0px     (4 * 0)
--spacing-1:  1px     (4 * 0.25)
--spacing-2:  2px     (4 * 0.5)
--spacing-3:  4px     (4 * 1)
--spacing-4:  6px     (4 * 1.5)
--spacing-5:  8px     (4 * 2)
--spacing-6:  12px    (4 * 3)
// ... etc
```

### Using Spacing

```css
.element {
  padding: var(--spacing-4); /* 16px */
  margin: var(--spacing-6);  /* 24px */
  gap: var(--spacing-3);     /* 12px */
}
```

## Border Radius

### Preset Styles

```tsx
radius: {
  style: "md"  // Choose: none, sm, md, lg, xl, full
}
```

| Style   | sm      | md      | lg      | xl      |
| ------- | ------- | ------- | ------- | ------- |
| `none`  | 0       | 0       | 0       | 0       |
| `sm`    | 0.25rem | 0.375rem| 0.5rem  | 0.75rem |
| `md` ✨ | 0.375rem| 0.5rem  | 0.75rem | 1rem    |
| `lg`    | 0.5rem  | 0.75rem | 1rem    | 1.5rem  |
| `xl`    | 0.75rem | 1rem    | 1.5rem  | 2rem    |
| `full`  | 9999px  | 9999px  | 9999px  | 9999px  |

### Custom Radius

```tsx
radius: {
  custom: {
    sm: "0.5rem",
    md: "1rem",
    lg: "1.5rem",
    xl: "2rem",
  }
}
```

### Using Radius

```css
.card {
  border-radius: var(--radius-lg);
}

.button {
  border-radius: var(--radius-md);
}
```

## Shadows

### Shadow Intensity

```tsx
shadows: {
  intensity: "medium",  // none, subtle, medium, strong
  colored: false,       // Tint with brand color
}
```

### Shadow Comparison

| Size | Subtle           | Medium ✨        | Strong           |
| ---- | ---------------- | ---------------- | ---------------- |
| sm   | Very light       | Light            | Noticeable       |
| md   | Subtle elevation | Clear elevation  | Strong elevation |
| lg   | Soft depth       | Clear depth      | Deep shadows     |
| xl   | Gentle far       | Far elements     | Dramatic depth   |

### Using Shadows

```css
.card {
  box-shadow: var(--shadow-md);
}

.modal {
  box-shadow: var(--shadow-xl);
}
```

## Advanced Usage

### Accessing Brand Tokens

```tsx
import { brandTokens } from "@/lib/brandUtils";

console.log(brandTokens.colors.primary[600]); // "#2563eb"
console.log(brandTokens.typography.fontSize.xl); // "1.25rem"
console.log(brandTokens.spacing[4]); // "16px"
```

### Generating Custom Brand

```tsx
import { generateBrandTokens } from "@/config/brand";

const customBrand = {
  name: "Custom",
  colors: {
    primary: "#FF0000",
    secondary: "#00FF00",
    accent: "#0000FF",
  },
};

const tokens = generateBrandTokens(customBrand);
```

### Tailwind Integration

Generate Tailwind config from brand:

```tsx
// tailwind.config.ts
import { generateTailwindConfig } from "@/lib/brandUtils";

export default {
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  ...generateTailwindConfig(),
};
```

### Dark Mode

Define custom dark mode colors:

```tsx
export const myBrand: BrandConfig = {
  name: "My Brand",
  colors: {
    primary: "#3b82f6",
    secondary: "#64748b",
    accent: "#a855f7",
  },
  darkMode: {
    primary: "#60a5fa",     // Lighter primary for dark mode
    secondary: "#94a3b8",   // Lighter secondary
    accent: "#c084fc",      // Lighter accent
  },
};
```

## Component Examples

### Custom Button with Brand

```tsx
export function BrandButton({ children, ...props }) {
  return (
    <button
      style={{
        backgroundColor: "var(--color-primary-600)",
        color: "white",
        padding: "var(--spacing-3) var(--spacing-6)",
        borderRadius: "var(--radius-md)",
        boxShadow: "var(--shadow-sm)",
        fontFamily: "var(--font-family)",
      }}
      {...props}
    >
      {children}
    </button>
  );
}
```

### Custom Card with Brand

```tsx
export function BrandCard({ children }) {
  return (
    <div
      style={{
        backgroundColor: "var(--color-primary-50)",
        border: "1px solid var(--color-primary-200)",
        borderRadius: "var(--radius-lg)",
        padding: "var(--spacing-6)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      {children}
    </div>
  );
}
```

### Gradient with Brand Colors

```tsx
export function GradientHero() {
  return (
    <div
      style={{
        background: `linear-gradient(
          135deg,
          var(--color-primary-600),
          var(--color-accent-600)
        )`,
        padding: "var(--spacing-12)",
        borderRadius: "var(--radius-xl)",
      }}
    >
      <h1 style={{ color: "white", fontSize: "var(--font-size-4xl)" }}>
        Welcome
      </h1>
    </div>
  );
}
```

## Migration Guide

### From Custom Theme

1. Extract your colors to brand config
2. Add BrandProvider to your app
3. Replace hardcoded colors with CSS variables
4. Update components to use brand variables

### From Tailwind Theme

1. Convert Tailwind colors to brand config
2. Generate Tailwind config from brand
3. Use CSS variables in utility classes
4. Keep Tailwind for layout, use brand for colors

## Best Practices

1. **Define Once** - Set your brand in one place
2. **Use Variables** - Always use CSS variables, not hardcoded colors
3. **Semantic Colors** - Use primary/secondary/accent meaningfully
4. **Consistent Spacing** - Use spacing scale for all margins/padding
5. **Radius Consistency** - Stick to one radius style
6. **Shadow Sparingly** - Use shadows to show elevation, not decoration
7. **Test Dark Mode** - Ensure colors work in both light/dark
8. **Typography Hierarchy** - Use font scale for consistent hierarchy
9. **Brand Guidelines** - Document your brand choices
10. **Component Library** - Build reusable components with brand

## Performance

- **Zero Runtime JS** - Pure CSS variables
- **No Re-renders** - Styles don't cause React re-renders
- **Small Bundle** - Only config object in bundle
- **CSS Caching** - Variables cached by browser
- **Fast Updates** - Change one variable, everything updates

## Troubleshooting

### Colors not applying

Check that:

1. BrandProvider is in your layout
2. CSS variables are generated
3. Components use `var(--color-*)`

### Dark mode not working

Ensure:

1. Dark mode colors are defined
2. Media query is correct
3. Browser supports prefers-color-scheme

### Fonts not loading

Verify:

1. Font files are imported
2. CSS variables are set
3. Font family fallbacks exist

## Related Documentation

- [Component Library](/docs/COMPONENTS.md)
- [Authentication System](/docs/AUTH_SYSTEM.md)
- [Architecture Overview](/docs/ARCHITECTURE_SUMMARY.md)
