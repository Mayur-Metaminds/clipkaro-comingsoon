# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a **reusable Next.js template** incorporating best practices and common setup for new projects. It includes Next.js 15.5.4 with App Router, React 19, TypeScript, and Tailwind CSS v4. Turbopack is configured for faster builds and development.

When working with this template, preserve its minimal, clean structure. Add features as requested but maintain the template's purpose as a starting point for new projects.

## Development Commands

```bash
# Development
npm run dev              # Start dev server (Turbopack, http://localhost:3000)
npm run build            # Production build
npm start                # Start production server

# Code Quality
npm run lint             # Run ESLint
npm run lint:fix         # Fix ESLint errors
npm run format           # Format code with Prettier
npm run format:check     # Check formatting
npm run type-check       # TypeScript type checking

# Setup
npm install              # Install dependencies
npm run prepare          # Setup git hooks (runs automatically after install)
```

## Project Structure

```
src/
├── app/                    # Next.js App Router
│   ├── layout.tsx         # Root layout with Geist fonts
│   └── page.tsx           # Home page
├── components/            # React components
│   ├── ui/               # Reusable UI components (Button, Input, Card)
│   ├── layout/           # Layout components (Header, Footer, Sidebar)
│   ├── features/         # Feature-specific components (organized by domain)
│   └── index.ts          # Barrel exports for clean imports
├── lib/                   # Utilities and helpers
│   ├── utils.ts          # Common utilities (includes cn() for class merging)
│   ├── env.ts            # Environment variable configuration
│   ├── analytics.ts      # Google Analytics tracking utilities
│   ├── api/              # API service layer
│   │   ├── client.ts     # Axios client with interceptors
│   │   ├── service.ts    # API service methods with Zod validation
│   │   └── README.md     # API service documentation
│   └── index.ts          # Barrel exports
├── services/              # API service layer by domain
│   └── user.service.ts   # Example user service
├── hooks/                 # Custom React hooks
│   └── index.ts          # Barrel exports
├── types/                 # TypeScript type definitions
│   └── index.ts          # Common types (Nullable, Optional, Maybe)
├── constants/             # App-wide constants
│   └── index.ts          # Constants and config
├── config/                # Application configuration
│   ├── site.ts           # Site metadata and settings
│   └── index.ts          # Barrel exports
└── styles/                # Global styles
    └── globals.css        # Tailwind imports and CSS variables

public/                    # Static assets (images, SVGs, fonts)
```

### Import Conventions

Use absolute imports with the `@/` alias:

```typescript
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/Button";
import type { Nullable } from "@/types";
```

## Configuration

### TypeScript

- Path alias: `@/*` maps to `./src/*`
- Strict mode enabled
- Target: ES2017

### Styling

- Tailwind CSS v4 (using new PostCSS plugin `@tailwindcss/postcss`)
- **shadcn/ui** component library integrated with unified theme system
- Default fonts: Geist (sans) and Geist Mono from `next/font/google`
- Font CSS variables: `--font-geist-sans` and `--font-geist-mono`

### ESLint

- Uses Next.js recommended config (`next/core-web-vitals`, `next/typescript`)
- Flat config format with FlatCompat for compatibility

## UI Components (shadcn/ui)

This template uses **shadcn/ui** - a collection of beautifully designed, accessible components built with Radix UI and Tailwind CSS.

### Available Components

All components in `src/components/ui/` are shadcn/ui compatible and integrate with the unified theme system:

- **Button** - Primary, secondary, outline, ghost, and link variants
- **Input** - Text inputs with theme integration
- **Textarea** - Multi-line text inputs
- **Label** - Accessible form labels
- **Card** - Container with header, content, footer
- **Select** - Dropdown select with Radix UI
- **Separator** - Horizontal/vertical dividers
- **Spinner** - Loading indicators
- **FormError** - Error message display
- **Toast** - Notification system

### Usage Example

```tsx
import { Button } from "@/components/ui/Button";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { Label } from "@/components/ui/Label";

export function MyComponent() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Sign In</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div>
            <Label htmlFor="email">Email</Label>
            <Input id="email" type="email" placeholder="you@example.com" />
          </div>
          <Button className="w-full">Sign In</Button>
        </div>
      </CardContent>
    </Card>
  );
}
```

### Adding More Components

To add additional shadcn/ui components:

```bash
npx shadcn@latest add [component-name]
```

Example:

```bash
npx shadcn@latest add dialog
npx shadcn@latest add dropdown-menu
npx shadcn@latest add toast
```

## Design Tokens & Branding

**Unified Theme System:** Integrates `src/config/theme.config.ts` with shadcn/ui CSS variables

The template uses a two-layer theming approach:

1. **shadcn/ui variables** (HSL format) - Used by shadcn components
2. **Custom design tokens** (HEX format) - For custom styling

See **[docs/THEMING.md](./docs/THEMING.md)** for complete theming guide.

### Quick Color Changes

**Method 1: Direct CSS (Fastest)**

Edit `src/styles/globals.css`:

```css
:root {
  /* Primary brand color (buttons, links) */
  --primary: 217 91% 60%; /* HSL: Blue */
  --primary-foreground: 0 0% 100%;

  /* Accent color (highlights, CTAs) */
  --accent: 271 91% 65%; /* HSL: Purple */
  --accent-foreground: 0 0% 100%;
}
```

**Method 2: TypeScript Config (Structured)**

Edit `src/config/theme.config.ts`:

```typescript
export const themeConfig = {
  colors: {
    primary: {
      500: "#3b82f6",
      600: "#2563eb", // Main brand color
      700: "#1d4ed8",
    },
    accent: {
      500: "#a855f7",
      600: "#9333ea", // Main accent color
      700: "#7e22ce",
    },
  },
};
```

### Pre-made Theme Presets

Apply instantly in `src/config/theme.config.ts`:

**Tech Startup** (Purple/Pink)

```typescript
import { themePresets } from "@/config/theme.config";
// Use: themePresets.techStartup
```

**Fintech** (Green/Cyan)

```typescript
// Use: themePresets.fintech
```

**E-commerce** (Orange/Red)

```typescript
// Use: themePresets.ecommerce
```

**SaaS** (Indigo/Purple)

```typescript
// Use: themePresets.saas
```

**📖 Complete Guide:** See [docs/THEMING.md](./docs/THEMING.md) for detailed theming instructions.

### What Updates Automatically

- ✅ Button colors & gradients
- ✅ Input focus states
- ✅ Link colors
- ✅ Background gradients
- ✅ Shadows & effects
- ✅ All interactive elements

### Design System Includes

- **Colors:** Full color scales (50-950) for brand, semantic
- **Typography:** Font families, sizes, weights, line heights
- **Spacing:** Consistent spacing scale (xs to 4xl)
- **Radius:** Border radius values
- **Shadows:** Shadow scales for depth
- **Animation:** Duration and easing curves
- **Breakpoints:** Responsive breakpoints

## Site Configuration

Site metadata and settings are centralized in `src/config/site.ts`. Update this file to customize:

- Site name, description, URL
- Author information
- Social media links
- SEO keywords
- OpenGraph and Twitter card metadata

```typescript
import { siteConfig, defaultMetadata } from "@/config/site";

// Use in components
console.log(siteConfig.name);

// Override metadata in specific pages
export const metadata = {
  ...defaultMetadata,
  title: "Custom Page Title",
};
```

## Environment Variables

Environment variables are configured in `.env.example` and validated in `src/lib/env.ts`.

**Setup:**

1. Copy `.env.example` to `.env.local`
2. Add your environment variables
3. Access via `env` object: `import { env } from "@/lib/env"`

**Available Variables:**

- `NEXT_PUBLIC_GA_MEASUREMENT_ID` - Google Analytics measurement ID (optional)
- `NEXT_PUBLIC_API_URL` - Base URL for API requests (optional, defaults to `/api`)

## Google Analytics

Google Analytics is pre-configured and will load automatically in production when `NEXT_PUBLIC_GA_MEASUREMENT_ID` is set.

**Setup:**

1. Get your measurement ID from [Google Analytics](https://analytics.google.com/)
2. Add to `.env.local`: `NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX`

**Features:**

- Automatically disabled in development
- Only loads when measurement ID is configured
- Type-safe tracking utilities

**Tracking Events:**

```typescript
import { trackEvent, trackButtonClick, trackFormSubmit } from "@/lib/analytics";

// Track custom events
trackEvent("purchase", "ecommerce", "product-name", 99.99);

// Track button clicks
trackButtonClick("signup-button");

// Track form submissions
trackFormSubmit("contact-form");
```

## Utilities

### cn() Helper

The template includes a `cn()` utility in `src/lib/utils.ts` for merging Tailwind classes:

```typescript
import { cn } from "@/lib/utils";

<div className={cn("text-base", isActive && "font-bold", className)} />
```

This combines `clsx` for conditional classes and `tailwind-merge` to avoid style conflicts.

## API Service Layer

**Production-ready API architecture** with automatic CRUD, token management, and type safety.

### Quick Start

See **[QUICKSTART_API.md](./QUICKSTART_API.md)** for a 5-minute guide.

**1. Define Schema:**

```typescript
// src/types/api.ts
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
});
export type Product = z.infer<typeof ProductSchema>;
```

**2. Create Service (extends BaseService):**

```typescript
// src/services/product.service.ts
import { BaseService } from "@/lib/api";
import { ProductSchema, type Product } from "@/types/api";

class ProductService extends BaseService<Product> {
  protected baseUrl = "/products";
  protected schema = ProductSchema;
}

export const productService = new ProductService();
```

**3. Use in Components:**

```typescript
// Automatic CRUD operations
const { data, meta } = await productService.getAll({ page: 1 });
const product = await productService.getById(123);
await productService.create({ name: "New Product", price: 99 });
await productService.update(123, { price: 79 });
await productService.delete(123);
```

### Features

- ✅ **BaseService class** with automatic CRUD operations
- ✅ **Token management** (cookies or localStorage)
- ✅ **Automatic token refresh** on 401 errors
- ✅ **Zod validation** for all responses
- ✅ **Query building** with pagination, sorting, filtering
- ✅ **Batch operations** support
- ✅ **Type safety** throughout
- ✅ **Reusable across projects**

### Documentation

- 📖 **[QUICKSTART_API.md](./QUICKSTART_API.md)** - Create service in 5 minutes
- 📖 **[SERVICE_ARCHITECTURE.md](./SERVICE_ARCHITECTURE.md)** - Complete architecture guide
- 📖 **[src/services/\_template.service.ts](./src/services/_template.service.ts)** - Service template
- 📖 **[src/lib/api/README.md](./src/lib/api/README.md)** - API client documentation

### Token Management

Tokens are automatically managed and included in all API requests:

```typescript
import { tokenManager } from "@/lib/auth/tokenManager";

// After login, tokens are stored
tokenManager.setTokens(accessToken, refreshToken);

// All subsequent API calls automatically include Bearer token
// 401 errors trigger automatic token refresh
```

**Configuration:**

```typescript
// src/lib/auth/tokenManager.ts
const USE_COOKIES = true; // Switch between cookies/localStorage
const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days
```

### Built-in Methods

Every service extending `BaseService` includes:

- `getAll(params?)` - List with pagination/filters
- `getById(id)` - Get single item
- `create(data)` - Create new item
- `update(id, data)` - Partial update
- `delete(id)` - Delete item
- `search(query, params?)` - Search items
- `batchCreate/Update/Delete` - Bulk operations

### Example Services

- `src/services/auth.service.ts` - Authentication
- `src/services/user.service.ts` - User management
- `src/services/_template.service.ts` - Copy for new services

## Authentication System

Complete authentication system with login, signup, password reset, and optional OAuth providers.

### Features

- ✅ Email/password authentication
- ✅ Google OAuth (configurable via feature flags)
- ✅ Access token + refresh token system
- ✅ Automatic token refresh on expiry
- ✅ Zod schema validation
- ✅ Form error handling
- ✅ Responsive UI components

### Token Management

The template uses a dual-token system:

- **Access Token**: Short-lived token for API requests
- **Refresh Token**: Long-lived token to get new access tokens

**Automatic Refresh Flow:**

1. When an API request returns 401 Unauthorized
2. The interceptor automatically calls `/auth/refresh` with the refresh token
3. New access token is stored and the original request is retried
4. If refresh fails, user is redirected to login

```typescript
// Token manager handles all token operations
import { tokenManager } from "@/lib/auth/tokenManager";

// Set tokens after login
tokenManager.setTokens(accessToken, refreshToken);

// Check if user is authenticated
tokenManager.isAuthenticated();

// Clear tokens on logout
tokenManager.clearTokens();
```

### Feature Flags

Enable/disable authentication providers via environment variables:

```bash
# .env.local
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true
NEXT_PUBLIC_GOOGLE_CLIENT_ID=your-client-id

NEXT_PUBLIC_ENABLE_GITHUB_AUTH=false
```

Google button only renders when enabled in config.

### Pages

**Login** - `/login`
**Signup** - `/signup`
**Reset Password** - `/reset-password`

All pages include:

- Form validation with Zod
- Error handling
- Loading states
- Responsive design
- Optional Google OAuth button

### Auth Service

```typescript
import { authService } from "@/services/auth.service";

// Login
await authService.login({ email, password });

// Signup
await authService.signup({ name, email, password, confirmPassword });

// Request password reset
await authService.requestPasswordReset({ email });

// Get current user
await authService.getCurrentUser();

// Logout
await authService.logout();
```

### Customization

**Add more OAuth providers:**

1. Add feature flag in `src/config/features.ts`
2. Create button component in `src/components/features/auth/`
3. Add to login/signup pages

**Change token storage:**

- Default: localStorage
- Update `src/lib/auth/tokenManager.ts` to use cookies or another method

## Development Tools

### Code Quality & Formatting

- **Prettier**: Automatic code formatting with Tailwind CSS plugin
- **ESLint**: Next.js recommended configuration
- **EditorConfig**: Consistent editor settings across IDEs

### Git Hooks (Husky)

Pre-commit hooks automatically run before each commit:

- **lint-staged**: Runs ESLint and Prettier on staged files
- **commitlint**: Enforces conventional commit messages

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

[optional body]
```

**Types:**

- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting)
- `refactor`: Code refactoring
- `perf`: Performance improvements
- `test`: Adding or updating tests
- `chore`: Maintenance tasks
- `ci`: CI/CD changes
- `build`: Build system changes

**Examples:**

```bash
feat: add user authentication
fix: resolve navigation bug on mobile
docs: update README with setup instructions
refactor: restructure component folder
style: format code with prettier
chore: update dependencies
```

**Important**: Commit messages MUST follow this format. Messages like "added feature" or "updated files" will be rejected by the commit hook.

### VS Code Setup

Recommended extensions (see `.vscode/extensions.json`):

- ESLint
- Prettier
- Tailwind CSS IntelliSense
- Pretty TypeScript Errors
- Error Lens
- Code Spell Checker

Workspace settings include:

- Format on save enabled
- ESLint auto-fix on save
- Tailwind CSS autocomplete for `cn()` function
