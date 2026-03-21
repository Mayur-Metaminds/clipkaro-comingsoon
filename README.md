# Next.js Scalable Starter Pack

A production-ready Next.js starter template designed for **scalability**, **modularity**, and **rapid development**. Built with modern best practices and a plug-and-play architecture.

## 🚀 Features

### 🔐 Complete Authentication System
- **Protected Routes** - Route guards with automatic redirects
- **Flexible Token Storage** - Choose between cookies or localStorage
- **Automatic Token Refresh** - Seamless JWT renewal
- **Type-Safe Auth** - Full TypeScript support
- **User State Management** - React Context with hooks
- [📖 Auth Documentation](./docs/AUTH_SYSTEM.md)

### 🎨 Brand Design System
- **One-Time Configuration** - Define your brand once, everything updates
- **Auto-Generated Colors** - Provide 1 color, get 11 shades
- **5+ Pre-built Themes** - Tech Startup, SaaS, E-commerce, Fintech, Creative
- **CSS Variables** - Zero runtime overhead
- **Dark Mode Ready** - Automatic dark theme support
- **Component Integration** - All UI components use brand colors
- [📖 Brand Documentation](./docs/BRAND_SYSTEM.md)

### 🏗️ Robust Architecture
- **Layered Service Architecture** - 4-layer separation of concerns
- **BaseService Pattern** - Instant CRUD operations for any resource
- **Type-Safe API Calls** - Zod validation on all responses
- **Error Handling** - Comprehensive error management with context
- **Toast Notifications** - Built-in user feedback system

### ⚡ Developer Experience
- **TypeScript Strict Mode** - Full type safety
- **Absolute Imports** - Clean import paths with `@/`
- **Component Library** - Reusable, branded UI components
- **Modular Structure** - Clear separation of concerns
- **Comprehensive Docs** - Detailed guides and examples

## 📦 Quick Start

### 1. Installation

```bash
# Clone the repository
git clone <your-repo-url>
cd nextjs-template

# Install dependencies
npm install
# or
yarn install
# or
pnpm install
```

### 2. Configure Environment

Create `.env.local`:

```env
NEXT_PUBLIC_API_URL=http://localhost:3005/api/v1
NEXT_PUBLIC_APP_NAME=My Company
```

### 3. Configure Your Brand (Optional)

Edit `src/config/brand.ts`:

```tsx
export const myBrand: BrandConfig = {
  name: "My Company",
  colors: {
    primary: "#0066CC",
    secondary: "#6C757D",
    accent: "#FF6B35",
  },
};

export const activeBrand = myBrand;
```

### 4. Setup Authentication

Update `src/app/layout.tsx`:

```tsx
import { AuthProvider } from "@/contexts/AuthContext";
import { BrandProvider } from "@/components/providers/BrandProvider";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <BrandProvider>
          <AuthProvider
            config={{
              storageType: "cookies",
              redirectAfterLogin: "/dashboard",
            }}
          >
            {children}
          </AuthProvider>
        </BrandProvider>
      </body>
    </html>
  );
}
```

### 5. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) to see your app!

## 📚 Documentation

- **[Authentication System](./docs/AUTH_SYSTEM.md)** - Complete auth guide with examples
- **[Brand Design System](./docs/BRAND_SYSTEM.md)** - Branding and theming guide
- **[Integration Example](./docs/INTEGRATION_EXAMPLE.md)** - Full app example with both systems
- **[API Architecture](./src/lib/api/README.md)** - Service layer documentation
- **[Architecture Overview](./docs/ARCHITECTURE_SUMMARY.md)** - System design details

## 🎯 Quick Examples

### Protected Route

```tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}
```

### Use Authentication

```tsx
import { useAuth } from "@/contexts/AuthContext";

function Profile() {
  const { user, logout, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <Login />;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### Brand-Aware Component

```tsx
import { Button, Card } from "@/components";

function MyComponent() {
  return (
    <Card>
      <h1 style={{ color: "var(--color-primary-600)" }}>
        Title
      </h1>
      <Button variant="primary">Click Me</Button>
    </Card>
  );
}
```

## 🏗️ Project Structure

```
src/
├── app/                    # Next.js 15 App Router
├── components/             # React components
│   ├── ui/                # Base UI components
│   ├── auth/              # Auth components (ProtectedRoute)
│   ├── features/          # Feature-specific components
│   └── providers/         # React Context providers
├── contexts/              # React Contexts (AuthContext)
├── config/                # Configuration files
│   ├── brand.ts          # Brand design system
│   ├── site.ts           # Site metadata
│   └── features.ts       # Feature flags
├── lib/                   # Core libraries
│   ├── api/              # API service layer
│   ├── auth/             # Token management
│   └── validations/      # Zod schemas
├── services/              # Domain-specific services
├── hooks/                 # Custom React hooks
├── types/                 # TypeScript types
└── styles/                # Global styles
```

## 🎨 Available Brand Presets

```tsx
// Choose from pre-built themes
import {
  defaultBrand,        // Modern Blue
  techStartupBrand,    // Bold Indigo/Violet
  ecommerceBrand,      // Warm Orange
  saasBrand,           // Professional Sky Blue
  fintechBrand,        // Trustworthy Emerald
  creativeAgencyBrand, // Vibrant Pink/Orange
} from "@/config/brand";

export const activeBrand = techStartupBrand;
```

## 🔧 Configuration

### Auth Config

```tsx
<AuthProvider
  config={{
    storageType: "cookies",              // or "localStorage"
    accessTokenMaxAge: 900,              // 15 minutes
    refreshTokenMaxAge: 604800,          // 7 days
    redirectAfterLogin: "/dashboard",
    redirectAfterLogout: "/login",
  }}
>
```

### Brand Config

```tsx
export const myBrand: BrandConfig = {
  name: "My Company",
  colors: {
    primary: "#0066CC",
    secondary: "#6C757D",
    accent: "#FF6B35",
  },
  typography: {
    fontFamily: "Inter, sans-serif",
    baseFontSize: 16,
    scaleRatio: 1.25,
  },
  radius: { style: "md" },
  shadows: { intensity: "medium" },
};
```

## 🚢 Deployment

### Build for Production

```bash
npm run build
npm start
```

### Deploy to Vercel

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=your-repo-url)

### Environment Variables

Set these in your deployment platform:

```env
NEXT_PUBLIC_API_URL=https://api.yourapp.com
NEXT_PUBLIC_APP_NAME=Your App
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is licensed under the MIT License.

## 🔗 Links

- [Next.js Documentation](https://nextjs.org/docs)
- [TypeScript Documentation](https://www.typescriptlang.org/docs)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)

---

**Built with ❤️ for scalable, maintainable Next.js applications**
