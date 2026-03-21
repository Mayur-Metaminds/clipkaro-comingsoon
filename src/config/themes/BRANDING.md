# Branding Guide

## Single Source of Truth Approach

All design tokens are defined in **`src/config/design-tokens.ts`**. This is your single source of truth for branding.

## How to Rebrand (Recommended Method)

### Step 1: Update Design Tokens

Edit `src/config/design-tokens.ts`:

```typescript
export const designTokens = {
  brand: {
    primary: {
      500: "#YOUR_LIGHT_COLOR",
      600: "#YOUR_MAIN_COLOR", // ← Main brand color
      700: "#YOUR_DARK_COLOR",
      // ... other shades
    },
    accent: {
      600: "#YOUR_ACCENT_COLOR",
      // ... other shades
    },
  },
  // ... rest stays the same
};
```

### Step 2: Generate CSS Variables (Optional)

If you want to regenerate `globals.css` from design tokens:

```bash
npm run theme:generate
```

This auto-generates CSS variables from your TypeScript config.

## Quick Rebrand (Direct CSS Method)

For faster rebranding without regenerating, directly edit `src/styles/globals.css`:

```css
:root {
  /* Just change these 4 lines! */
  --color-primary-600: #YOUR_MAIN_COLOR;
  --color-primary-700: #YOUR_DARKER_SHADE;
  --color-primary-500: #YOUR_LIGHTER_SHADE;
  --color-accent-600: #YOUR_ACCENT_COLOR;
}
```

## Pre-made Themes

### Tech Startup (Purple/Pink)

```typescript
// In design-tokens.ts
primary: { 600: "#a855f7", 700: "#9333ea", 500: "#c084fc" }
accent: { 600: "#ec4899" }
```

### Fintech (Green)

```typescript
primary: { 600: "#059669", 700: "#047857", 500: "#10b981" }
accent: { 600: "#0891b2" }
```

### E-commerce (Orange)

```typescript
primary: { 600: "#ea580c", 700: "#c2410c", 500: "#f97316" }
accent: { 600: "#dc2626" }
```

### SaaS (Indigo)

```typescript
primary: { 600: "#4f46e5", 700: "#4338ca", 500: "#6366f1" }
accent: { 600: "#7c3aed" }
```

### Healthcare (Teal)

```typescript
primary: { 600: "#0d9488", 700: "#0f766e", 500: "#14b8a6" }
accent: { 600: "#06b6d4" }
```

## Tools for Color Generation

1. **UI Colors** - https://uicolors.app/create
   - Paste your brand color
   - Get full color scale (50-950)
   - Copy all shades to design-tokens.ts

2. **Tailwind Shades** - https://www.tints.dev/
   - Another great tool for generating color scales

3. **Coolors** - https://coolors.co/
   - For finding complementary accent colors

## Best Practices

1. **Use a color scale generator** - Don't manually pick shades
2. **Test contrast ratios** - Use tools like WebAIM Contrast Checker
3. **Check dark mode** - Make sure colors work in both modes
4. **Keep semantic colors distinct** - Success/error/warning should differ from brand colors
5. **Document your brand colors** - Add comments in design-tokens.ts

## Advanced: Custom Typography

```typescript
// In design-tokens.ts
typography: {
  fontFamily: {
    sans: "'Your Custom Font', sans-serif",
    display: "'Your Display Font', serif",
  },
}
```

Don't forget to import the fonts in `layout.tsx`!

## Advanced: Custom Spacing/Radius

```typescript
// In design-tokens.ts
spacing: {
  xs: "0.5rem",   // Make everything more spacious
  sm: "1rem",
  md: "2rem",
  // ...
},
radius: {
  lg: "1.5rem",   // Make everything rounder
  xl: "2rem",
  // ...
}
```

## Workflow

**For new projects:**

1. Update `design-tokens.ts` with brand colors
2. Optionally run `npm run theme:generate`
3. Done!

**For quick tweaks:**

1. Edit `globals.css` directly
2. See changes instantly
3. Later update `design-tokens.ts` to match (if using script)

Both methods work - choose what fits your workflow!
