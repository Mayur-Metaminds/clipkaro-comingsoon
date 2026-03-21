# Authentication System

A complete, production-ready authentication system with protected routes and configurable token storage.

## Features

- ✅ **Login/Signup/Logout** - Complete auth flow
- ✅ **Protected Routes** - Route guards for authenticated pages
- ✅ **Configurable Storage** - Choose between cookies or localStorage
- ✅ **Automatic Token Refresh** - Seamless token renewal
- ✅ **User State Management** - React Context for auth state
- ✅ **TypeScript** - Full type safety
- ✅ **Toast Notifications** - User feedback built-in

## Quick Start

### 1. Setup AuthProvider

Wrap your app with the `AuthProvider` in your root layout:

```tsx
// src/app/layout.tsx
import { AuthProvider } from "@/contexts/AuthContext";

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <AuthProvider
          config={{
            storageType: "cookies", // or "localStorage"
            redirectAfterLogin: "/dashboard",
            redirectAfterLogout: "/login",
          }}
        >
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
```

### 2. Use Authentication in Components

```tsx
import { useAuth } from "@/contexts/AuthContext";

function ProfilePage() {
  const { user, logout, isAuthenticated, isLoading } = useAuth();

  if (isLoading) return <div>Loading...</div>;

  if (!isAuthenticated) return <div>Please login</div>;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <button onClick={logout}>Logout</button>
    </div>
  );
}
```

### 3. Protect Routes

#### Method 1: Component Wrapper

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

#### Method 2: Higher-Order Component

```tsx
import { withAuth } from "@/components/auth/ProtectedRoute";

function Dashboard() {
  return <div>Protected Dashboard</div>;
}

export default withAuth(Dashboard);
```

#### Method 3: Layout Protection

```tsx
// src/app/(protected)/layout.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";

export default function ProtectedLayout({ children }) {
  return <ProtectedRoute>{children}</ProtectedRoute>;
}
```

## Configuration

### AuthConfig Options

```tsx
interface AuthConfig {
  /** Storage type for tokens */
  storageType: "cookies" | "localStorage"; // default: "cookies"

  /** Access token expiration (seconds) */
  accessTokenMaxAge?: number; // default: 900 (15 minutes)

  /** Refresh token expiration (seconds) */
  refreshTokenMaxAge?: number; // default: 604800 (7 days)

  /** Redirect after login */
  redirectAfterLogin?: string; // default: "/"

  /** Redirect after logout */
  redirectAfterLogout?: string; // default: "/login"

  /** Login page path */
  loginPath?: string; // default: "/login"
}
```

### Storage Type Comparison

| Feature             | Cookies (Recommended) | localStorage        |
| ------------------- | --------------------- | ------------------- |
| Security            | ✅ More secure        | ⚠️ XSS vulnerable   |
| Auto-expiry         | ✅ Yes                | ❌ No               |
| Server access       | ✅ Yes (SSR)          | ❌ Client-only      |
| Cross-domain        | ⚠️ Limited            | ❌ No               |
| Storage limit       | ~4KB                  | ~5-10MB             |
| Browser support     | ✅ Universal          | ✅ Universal        |

**Recommendation:** Use `cookies` for production apps.

## API Reference

### useAuth Hook

Returns the authentication context.

```tsx
const {
  user,              // Current user object | null
  isLoading,         // Loading state (boolean)
  isAuthenticated,   // Is user logged in? (boolean)
  login,             // Login function
  signup,            // Signup function
  logout,            // Logout function
  refreshUser,       // Refresh user data from API
  config,            // Auth configuration
} = useAuth();
```

#### Methods

**login(email: string, password: string): Promise\<void\>**

Logs in a user with email and password.

```tsx
try {
  await login("user@example.com", "password123");
  // User is now logged in
} catch (error) {
  // Handle login error
}
```

**signup(name: string, email: string, password: string): Promise\<void\>**

Registers a new user and auto-logs them in.

```tsx
try {
  await signup("John Doe", "john@example.com", "password123");
  // User is registered and logged in
} catch (error) {
  // Handle signup error
}
```

**logout(): Promise\<void\>**

Logs out the current user and clears tokens.

```tsx
await logout();
// User is logged out and redirected to login page
```

**refreshUser(): Promise\<void\>**

Manually refresh user data from the API.

```tsx
await refreshUser();
// User object is updated with latest data
```

### ProtectedRoute Component

Wraps components that require authentication.

```tsx
<ProtectedRoute
  loadingComponent={<CustomLoader />}
  fallback={<AccessDenied />}
  redirectTo="/custom-login"
>
  <ProtectedContent />
</ProtectedRoute>
```

**Props:**

- `children` - The protected content
- `loadingComponent` - Custom loading UI (optional)
- `fallback` - Custom unauthorized UI (optional)
- `redirectTo` - Custom login path (optional)

### withAuth HOC

Higher-Order Component for protecting pages.

```tsx
const ProtectedPage = withAuth(MyPage, {
  loadingComponent: <Loader />,
  fallback: <Denied />,
});
```

## Examples

### Login Form

```tsx
import { useState } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { Button, Input } from "@/components";

export function LoginForm() {
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await login(email, password);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <Input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <Button type="submit">Login</Button>
    </form>
  );
}
```

### Profile Component

```tsx
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components";

export function Profile() {
  const { user, logout, refreshUser } = useAuth();

  return (
    <div>
      <img src={user?.avatar} alt={user?.name} />
      <h2>{user?.name}</h2>
      <p>{user?.email}</p>
      <Button onClick={refreshUser}>Refresh</Button>
      <Button onClick={logout} variant="secondary">
        Logout
      </Button>
    </div>
  );
}
```

### Protected Dashboard

```tsx
// src/app/dashboard/page.tsx
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <DashboardContent />
    </ProtectedRoute>
  );
}

function DashboardContent() {
  const { user } = useAuth();

  return (
    <div>
      <h1>Dashboard</h1>
      <p>Welcome back, {user?.name}!</p>
    </div>
  );
}
```

### Conditional Rendering

```tsx
import { useAuth } from "@/contexts/AuthContext";

export function Header() {
  const { isAuthenticated, user, logout } = useAuth();

  return (
    <header>
      <nav>
        <Link href="/">Home</Link>
        {isAuthenticated ? (
          <>
            <Link href="/dashboard">Dashboard</Link>
            <span>Hi, {user?.name}!</span>
            <button onClick={logout}>Logout</button>
          </>
        ) : (
          <>
            <Link href="/login">Login</Link>
            <Link href="/signup">Sign Up</Link>
          </>
        )}
      </nav>
    </header>
  );
}
```

## Token Management

The authentication system uses `tokenManager` under the hood for token storage and retrieval.

### Manual Token Operations (Advanced)

```tsx
import { tokenManager } from "@/lib/auth/tokenManager";

// Configure storage
tokenManager.configure({
  storageType: "cookies",
  accessTokenMaxAge: 900,
  refreshTokenMaxAge: 604800,
});

// Set tokens manually
tokenManager.setTokens("access_token", "refresh_token");

// Get tokens
const accessToken = tokenManager.getAccessToken();
const refreshToken = tokenManager.getRefreshToken();

// Clear tokens
tokenManager.clearTokens();

// Check authentication
const isAuth = tokenManager.isAuthenticated();
```

## Integration with API

The authentication system integrates with your backend API through `authService`:

```tsx
// src/services/auth.service.ts
export const authService = {
  login: (credentials) => apiService.post("/auth/login", ...),
  signup: (data) => apiService.post("/auth/register", ...),
  getCurrentUser: () => apiService.get("/auth/me", ...),
  // ... other methods
};
```

### Expected API Endpoints

Your backend should implement these endpoints:

**POST /auth/login**

```json
Request: { "email": "user@example.com", "password": "password123" }
Response: {
  "success": true,
  "data": {
    "access_token": "eyJhbGc...",
    "refresh_token": "eyJhbGc..."
  }
}
```

**POST /auth/register**

```json
Request: { "name": "John Doe", "email": "john@example.com", "password": "password123" }
Response: {
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**GET /auth/me** (requires Authorization header)

```json
Response: {
  "success": true,
  "data": {
    "id": "user-id",
    "name": "John Doe",
    "email": "john@example.com",
    "avatar": "https://..."
  }
}
```

**POST /auth/refresh** (requires refresh_token)

```json
Request: { "refresh_token": "eyJhbGc..." }
Response: {
  "success": true,
  "data": {
    "access_token": "eyJhbGc..."
  }
}
```

## Automatic Token Refresh

The system automatically refreshes expired access tokens using the API interceptor:

1. Request fails with 401 Unauthorized
2. System calls `/auth/refresh` with refresh token
3. New access token is saved
4. Original request is retried
5. If refresh fails, user is logged out

See `src/lib/api/client.ts` for implementation details.

## Best Practices

1. **Always use cookies in production** for better security
2. **Validate tokens server-side** for sensitive operations
3. **Use HTTPS** in production to protect tokens
4. **Set short access token expiry** (15 minutes recommended)
5. **Use longer refresh token expiry** (7 days recommended)
6. **Implement proper error handling** in your login forms
7. **Show loading states** during authentication checks
8. **Use ProtectedRoute** for all authenticated pages
9. **Refresh user data** after profile updates
10. **Clear tokens on logout** (handled automatically)

## Troubleshooting

### "useAuth must be used within an AuthProvider"

Make sure `AuthProvider` wraps your component tree:

```tsx
<AuthProvider>
  <App />
</AuthProvider>
```

### Tokens not persisting

Check that:

1. Storage type is configured correctly
2. Browser allows cookies/localStorage
3. HTTPS is enabled in production (for cookies)

### Redirect loops

Ensure your login page is not wrapped with `ProtectedRoute`.

### User not updated after API changes

Call `refreshUser()` to fetch the latest user data:

```tsx
const { refreshUser } = useAuth();
await refreshUser();
```

## TypeScript Types

```tsx
interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
}

type AuthStorageType = "cookies" | "localStorage";

interface AuthConfig {
  storageType: AuthStorageType;
  accessTokenMaxAge?: number;
  refreshTokenMaxAge?: number;
  redirectAfterLogin?: string;
  redirectAfterLogout?: string;
  loginPath?: string;
}

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (email: string, password: string) => Promise<void>;
  signup: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshUser: () => Promise<void>;
  config: AuthConfig;
}
```

## Migration Guide

### From Session-based Auth

1. Replace session checks with `useAuth()` hook
2. Replace server-side auth with token-based auth
3. Update API to return JWT tokens
4. Configure token storage in AuthProvider

### From Custom Auth

1. Wrap app with `AuthProvider`
2. Replace custom auth state with `useAuth()`
3. Replace custom protected routes with `ProtectedRoute`
4. Update API calls to use `authService`

## Related Documentation

- [API Architecture](/src/lib/api/README.md)
- [Service Architecture](/docs/SERVICE_ARCHITECTURE.md)
- [Brand Design System](/docs/BRAND_SYSTEM.md)
