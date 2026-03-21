# Integration Example: Auth + Brand System

Complete example showing how to use both the Authentication System and Brand Design System together.

## Complete Setup

### 1. Root Layout with All Providers

```tsx
// src/app/layout.tsx
import { AuthProvider } from "@/contexts/AuthContext";
import { BrandProvider } from "@/components/providers/BrandProvider";
import { ToastProvider } from "@/components/providers/ToastProvider";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import "@/styles/globals.css";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <ErrorBoundary>
          <BrandProvider>
            <ToastProvider>
              <AuthProvider
                config={{
                  storageType: "cookies",
                  redirectAfterLogin: "/dashboard",
                  redirectAfterLogout: "/login",
                }}
              >
                {children}
              </AuthProvider>
            </ToastProvider>
          </BrandProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
```

### 2. Configure Your Brand

```tsx
// src/config/brand.ts
import type { BrandConfig } from "@/config/brand";

export const myCompanyBrand: BrandConfig = {
  name: "My Company",
  colors: {
    primary: "#0066CC",    // Company blue
    secondary: "#6C757D",  // Neutral gray
    accent: "#FF6B35",     // Accent orange
    success: "#28A745",
    warning: "#FFC107",
    error: "#DC3545",
    info: "#17A2B8",
  },
  typography: {
    fontFamily: "Inter, system-ui, sans-serif",
    headingFont: "Poppins, system-ui, sans-serif",
    baseFontSize: 16,
    scaleRatio: 1.25,
  },
  radius: {
    style: "md",
  },
  shadows: {
    intensity: "medium",
    colored: false,
  },
};

// Activate your brand
export const activeBrand = myCompanyBrand;
```

## Page Examples

### 3. Public Home Page

```tsx
// src/app/page.tsx
import { Button } from "@/components";
import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Hero Section - Uses brand colors automatically */}
      <section
        style={{
          background: `linear-gradient(135deg, var(--color-primary-600), var(--color-accent-600))`,
          padding: "var(--spacing-12) var(--spacing-6)",
        }}
      >
        <div className="max-w-4xl mx-auto text-center">
          <h1
            style={{
              fontSize: "var(--font-size-5xl)",
              fontFamily: "var(--font-heading)",
              color: "white",
              marginBottom: "var(--spacing-6)",
            }}
          >
            Welcome to My Company
          </h1>
          <p
            style={{
              fontSize: "var(--font-size-xl)",
              color: "white",
              opacity: 0.9,
              marginBottom: "var(--spacing-8)",
            }}
          >
            Build amazing products with our scalable Next.js starter
          </p>
          <div style={{ display: "flex", gap: "var(--spacing-4)", justifyContent: "center" }}>
            <Link href="/signup">
              <Button variant="primary" size="lg">
                Get Started
              </Button>
            </Link>
            <Link href="/login">
              <Button variant="outline" size="lg">
                Sign In
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section style={{ padding: "var(--spacing-12) var(--spacing-6)" }}>
        <div className="max-w-6xl mx-auto">
          <h2
            style={{
              fontSize: "var(--font-size-3xl)",
              fontFamily: "var(--font-heading)",
              textAlign: "center",
              marginBottom: "var(--spacing-8)",
            }}
          >
            Features
          </h2>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(300px, 1fr))", gap: "var(--spacing-6)" }}>
            <FeatureCard
              title="Authentication"
              description="Secure login with JWT tokens"
              icon="🔐"
            />
            <FeatureCard
              title="Brand System"
              description="Customizable design system"
              icon="🎨"
            />
            <FeatureCard
              title="Type Safe"
              description="Full TypeScript support"
              icon="✨"
            />
          </div>
        </div>
      </section>
    </div>
  );
}

function FeatureCard({ title, description, icon }) {
  return (
    <div
      style={{
        padding: "var(--spacing-6)",
        borderRadius: "var(--radius-lg)",
        backgroundColor: "var(--color-primary-50)",
        border: "1px solid var(--color-primary-200)",
        boxShadow: "var(--shadow-md)",
      }}
    >
      <div style={{ fontSize: "var(--font-size-4xl)", marginBottom: "var(--spacing-4)" }}>
        {icon}
      </div>
      <h3
        style={{
          fontSize: "var(--font-size-xl)",
          fontFamily: "var(--font-heading)",
          marginBottom: "var(--spacing-2)",
        }}
      >
        {title}
      </h3>
      <p style={{ fontSize: "var(--font-size-base)", color: "var(--color-primary-700)" }}>
        {description}
      </p>
    </div>
  );
}
```

### 4. Login Page

```tsx
// src/app/login/page.tsx
"use client";

import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input, Card } from "@/components";
import Link from "next/link";

export default function LoginPage() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        padding: "var(--spacing-6)",
        background: "var(--color-primary-50)",
      }}
    >
      <Card style={{ maxWidth: "400px", width: "100%" }}>
        <div style={{ padding: "var(--spacing-8)" }}>
          {/* Logo */}
          <div style={{ textAlign: "center", marginBottom: "var(--spacing-6)" }}>
            <h1
              style={{
                fontSize: "var(--font-size-3xl)",
                fontFamily: "var(--font-heading)",
                color: "var(--color-primary-600)",
              }}
            >
              Welcome Back
            </h1>
            <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-primary-600)", marginTop: "var(--spacing-2)" }}>
              Sign in to your account
            </p>
          </div>

          {/* Login Form */}
          <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: "var(--spacing-4)" }}>
            <div>
              <label style={{ fontSize: "var(--font-size-sm)", fontWeight: 500, marginBottom: "var(--spacing-2)", display: "block" }}>
                Email
              </label>
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                required
              />
            </div>

            <div>
              <label style={{ fontSize: "var(--font-size-sm)", fontWeight: 500, marginBottom: "var(--spacing-2)", display: "block" }}>
                Password
              </label>
              <Input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
              />
            </div>

            <Button type="submit" variant="primary" isLoading={isLoading}>
              {isLoading ? "Signing in..." : "Sign In"}
            </Button>
          </form>

          {/* Footer Links */}
          <div style={{ marginTop: "var(--spacing-6)", textAlign: "center" }}>
            <p style={{ fontSize: "var(--font-size-sm)" }}>
              Don't have an account?{" "}
              <Link
                href="/signup"
                style={{
                  color: "var(--color-primary-600)",
                  fontWeight: 500,
                  textDecoration: "none",
                }}
              >
                Sign up
              </Link>
            </p>
          </div>
        </div>
      </Card>
    </div>
  );
}
```

### 5. Protected Dashboard

```tsx
// src/app/dashboard/page.tsx
"use client";

import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Card } from "@/components";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user, logout } = useAuth();

  return (
    <div style={{ minHeight: "100vh", background: "var(--color-primary-50)" }}>
      {/* Header */}
      <header
        style={{
          background: "var(--color-primary-600)",
          color: "white",
          padding: "var(--spacing-4) var(--spacing-6)",
          boxShadow: "var(--shadow-md)",
        }}
      >
        <div style={{ maxWidth: "1200px", margin: "0 auto", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <h1 style={{ fontSize: "var(--font-size-xl)", fontFamily: "var(--font-heading)" }}>
            My Dashboard
          </h1>
          <Button variant="secondary" size="sm" onClick={logout}>
            Logout
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main style={{ maxWidth: "1200px", margin: "0 auto", padding: "var(--spacing-8) var(--spacing-6)" }}>
        {/* Welcome Card */}
        <Card style={{ marginBottom: "var(--spacing-8)", padding: "var(--spacing-6)" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-4)" }}>
            {user?.avatar && (
              <img
                src={user.avatar}
                alt={user.name}
                style={{
                  width: "64px",
                  height: "64px",
                  borderRadius: "var(--radius-full)",
                  border: "2px solid var(--color-primary-600)",
                }}
              />
            )}
            <div>
              <h2
                style={{
                  fontSize: "var(--font-size-2xl)",
                  fontFamily: "var(--font-heading)",
                  marginBottom: "var(--spacing-1)",
                }}
              >
                Welcome back, {user?.name}!
              </h2>
              <p style={{ fontSize: "var(--font-size-sm)", color: "var(--color-primary-600)" }}>
                {user?.email}
              </p>
            </div>
          </div>
        </Card>

        {/* Stats Grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))", gap: "var(--spacing-6)" }}>
          <StatCard title="Total Users" value="1,234" icon="👥" color="primary" />
          <StatCard title="Revenue" value="$12,345" icon="💰" color="success" />
          <StatCard title="Projects" value="42" icon="📊" color="accent" />
          <StatCard title="Messages" value="89" icon="📧" color="info" />
        </div>
      </main>
    </div>
  );
}

function StatCard({ title, value, icon, color }) {
  return (
    <Card
      style={{
        padding: "var(--spacing-6)",
        background: `var(--color-${color}-50)`,
        border: `1px solid var(--color-${color}-200)`,
      }}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
        <div>
          <p
            style={{
              fontSize: "var(--font-size-sm)",
              color: `var(--color-${color}-600)`,
              marginBottom: "var(--spacing-2)",
            }}
          >
            {title}
          </p>
          <p
            style={{
              fontSize: "var(--font-size-3xl)",
              fontFamily: "var(--font-heading)",
              fontWeight: 700,
              color: `var(--color-${color}-700)`,
            }}
          >
            {value}
          </p>
        </div>
        <div style={{ fontSize: "var(--font-size-2xl)" }}>{icon}</div>
      </div>
    </Card>
  );
}
```

### 6. Navigation Component

```tsx
// src/components/layout/Navigation.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components";
import Link from "next/link";

export function Navigation() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <nav
      style={{
        background: "white",
        borderBottom: "1px solid var(--color-primary-200)",
        padding: "var(--spacing-4) var(--spacing-6)",
        boxShadow: "var(--shadow-sm)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        {/* Logo */}
        <Link
          href="/"
          style={{
            fontSize: "var(--font-size-xl)",
            fontFamily: "var(--font-heading)",
            fontWeight: 700,
            color: "var(--color-primary-600)",
            textDecoration: "none",
          }}
        >
          My Company
        </Link>

        {/* Nav Items */}
        <div style={{ display: "flex", gap: "var(--spacing-6)", alignItems: "center" }}>
          <Link
            href="/"
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-primary-700)",
              textDecoration: "none",
            }}
          >
            Home
          </Link>
          <Link
            href="/features"
            style={{
              fontSize: "var(--font-size-base)",
              color: "var(--color-primary-700)",
              textDecoration: "none",
            }}
          >
            Features
          </Link>

          {/* Auth Buttons */}
          {isAuthenticated ? (
            <>
              <Link href="/dashboard">
                <Button variant="ghost" size="sm">
                  Dashboard
                </Button>
              </Link>
              <div style={{ display: "flex", alignItems: "center", gap: "var(--spacing-3)" }}>
                <span style={{ fontSize: "var(--font-size-sm)" }}>
                  Hi, {user?.name}
                </span>
                <Button variant="outline" size="sm" onClick={logout}>
                  Logout
                </Button>
              </div>
            </>
          ) : (
            <>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button variant="primary" size="sm">
                  Get Started
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
```

## Key Integration Points

### 1. Provider Order Matters

```tsx
<ErrorBoundary>          {/* Catches all errors */}
  <BrandProvider>        {/* Injects brand CSS variables */}
    <ToastProvider>      {/* Provides toast notifications */}
      <AuthProvider>     {/* Provides auth state */}
        {children}
      </AuthProvider>
    </ToastProvider>
  </BrandProvider>
</ErrorBoundary>
```

### 2. Components Use Both Systems

```tsx
// Button uses brand colors
<Button variant="primary">Click Me</Button>

// Auth hook for user state
const { user, isAuthenticated } = useAuth();
```

### 3. Protected Routes with Branded UI

```tsx
<ProtectedRoute
  loadingComponent={
    <div style={{ background: "var(--color-primary-50)" }}>
      <Spinner color="var(--color-primary-600)" />
    </div>
  }
>
  <Dashboard />
</ProtectedRoute>
```

## Environment Variables

```env
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3005/api/v1
NEXT_PUBLIC_APP_NAME=My Company
```

## Testing

```tsx
// Test component with both providers
import { render } from "@testing-library/react";
import { AuthProvider } from "@/contexts/AuthContext";
import { BrandProvider } from "@/components/providers/BrandProvider";

function renderWithProviders(component) {
  return render(
    <BrandProvider>
      <AuthProvider>
        {component}
      </AuthProvider>
    </BrandProvider>
  );
}

test("dashboard shows user name", () => {
  const { getByText } = renderWithProviders(<Dashboard />);
  expect(getByText(/welcome/i)).toBeInTheDocument();
});
```

## Summary

This integration example demonstrates:

- ✅ **Complete provider setup** with proper nesting order
- ✅ **Brand-aware components** using CSS variables
- ✅ **Protected routes** with authentication checks
- ✅ **Consistent styling** across public and protected pages
- ✅ **Type-safe** auth and brand usage
- ✅ **Production-ready** patterns

Both systems work together seamlessly to provide a complete, scalable foundation for your Next.js application!
