# Brand Themes

Quick rebrand your application by changing design tokens.

## Quick Start

### Option 1: Use Example Theme (Fastest)

1. Open `src/styles/globals.css`
2. Find the `:root` section
3. Copy one of the example themes from `examples.ts`
4. Replace the color variables in `:root`
5. Save and refresh!

### Option 2: Custom Colors

1. Choose your brand colors
2. Update in `src/styles/globals.css`:

```css
:root {
  --color-primary-600: #YOUR_MAIN_COLOR;
  --color-primary-700: #YOUR_DARKER_SHADE;
  --color-primary-500: #YOUR_LIGHTER_SHADE;
  --color-accent-600: #YOUR_ACCENT_COLOR;
}
```

## Example Themes

### Tech Startup (Purple/Pink)

```css
--color-primary-600: #a855f7;
--color-accent-600: #ec4899;
```

### Fintech (Green)

```css
--color-primary-600: #059669;
--color-accent-600: #0891b2;
```

### E-commerce (Orange)

```css
--color-primary-600: #ea580c;
--color-accent-600: #dc2626;
```

### SaaS (Indigo)

```css
--color-primary-600: #4f46e5;
--color-accent-600: #7c3aed;
```

### Healthcare (Teal)

```css
--color-primary-600: #0d9488;
--color-accent-600: #06b6d4;
```

## What Gets Updated

When you change the design tokens, these automatically update:

- ✅ All button colors and gradients
- ✅ Input focus states
- ✅ Links and interactive elements
- ✅ Background gradients
- ✅ Shadows and highlights
- ✅ Error/Success/Warning colors

## Advanced Customization

For more control, edit `src/config/design-tokens.ts`:

- Typography (fonts, sizes, weights)
- Spacing scale
- Border radius
- Shadows
- Animation timing
- Breakpoints

## Tips

- Use a color palette generator (like https://uicolors.app)
- Maintain sufficient contrast ratios for accessibility
- Test both light and dark modes
- Keep semantic colors (success, error, warning) distinct from brand colors
