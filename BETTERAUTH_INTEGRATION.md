# BetterAuth Integration Guide

This document explains the BetterAuth integration that has been implemented in this Next.js template to work with your NestJS backend.

## Overview

The authentication system has been updated to work with a **BetterAuth backend** using **cookie-based sessions** instead of JWT tokens in localStorage. This provides better security and follows modern authentication best practices.

## Key Changes

### 1. Authentication Architecture

**Before (Token-Based):**

- Access tokens stored in localStorage/cookies
- Manual token refresh logic
- Bearer token authentication
- Client-side token management

**After (Session-Based with BetterAuth):**

- httpOnly cookies managed by backend
- Automatic session management
- No client-side token handling
- 7-day session duration

### 2. Updated Files

#### Core Authentication

- **`src/types/auth.ts`** - Updated types to match BetterAuth schema (User, Session, Permission, UserRole)
- **`src/lib/validations/auth.ts`** - New Zod schemas for BetterAuth API responses
- **`src/services/auth.service.ts`** - Completely rewritten to use BetterAuth endpoints
- **`src/services/permission.service.ts`** - NEW: Permission checking service
- **`src/contexts/AuthContext.tsx`** - Updated to use session-based authentication
- **`src/lib/api/client.ts`** - Simplified for cookie-based sessions (removed token logic)

#### Components & Hooks

- **`src/hooks/usePermission.ts`** - NEW: Hooks for checking user permissions
- **`src/components/layout/ProtectedRoute.tsx`** - NEW: Route protection with role-based access
- **`src/lib/auth/oauth.ts`** - Updated to use BetterAuth OAuth flow

#### Pages

- **`src/app/(auth)/login/page.tsx`** - Uses new auth flow (minimal changes needed)
- **`src/app/(auth)/signup/page.tsx`** - Updated to remove confirmPassword field
- **`src/app/(auth)/reset-password/page.tsx`** - Updated to use forgotPassword method
- **`src/app/dashboard/page.tsx`** - Fixed to use `user.image` instead of `user.avatar`

#### Configuration

- **`.env.example`** - Updated with BetterAuth backend URL
- **`src/lib/auth/tokenManager.ts`** - Deprecated (kept for backwards compatibility)

## API Endpoints

All endpoints are prefixed with `/api/v1/auth` on your backend:

### Authentication

- `POST /sign-in/email` - Email/password login
- `POST /sign-up/email` - Email/password registration
- `POST /sign-out` - Logout
- `GET /get-session` - Get current session

### Email Management

- `POST /verify-email` - Verify email with token
- `POST /send-verification-email` - Send verification email
- `POST /change-email` - Change user email

### Password Management

- `POST /forget-password` - Request password reset
- `POST /reset-password` - Reset password with token
- `POST /change-password` - Change password (authenticated)

### User Profile

- `POST /update-user` - Update user profile (name, image)

### OAuth

- `GET /sign-in/{provider}` - Initiate OAuth flow
  - Providers: google, github, discord, twitter, facebook, microsoft

### Permissions

- `GET /api/v1/permissions/my-permissions` - Get all user permissions
- `GET /api/v1/permissions/check?permission={permission}` - Check specific permission

## Usage Examples

### Basic Authentication

```tsx
import { useAuth } from "@/contexts/AuthContext";

function LoginForm() {
  const { login, isLoading } = useAuth();

  const handleSubmit = async (email: string, password: string) => {
    await login(email, password);
    // Automatically redirects and shows toast
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Protected Routes

```tsx
import { ProtectedRoute } from "@/components/layout/ProtectedRoute";

// Basic protection (any authenticated user)
export default function DashboardPage() {
  return (
    <ProtectedRoute>
      <Dashboard />
    </ProtectedRoute>
  );
}

// Role-based protection
export default function AdminPage() {
  return (
    <ProtectedRoute requiredRole="ADMIN">
      <AdminPanel />
    </ProtectedRoute>
  );
}
```

### Permission Checking (Cached)

Permissions are fetched **once** when the user logs in and cached for the entire session. This is efficient because:

- Frontend permission checks are for UX only (hiding/showing buttons)
- Backend ALWAYS validates permissions on every API call
- Permissions rarely change during a session

```tsx
import { usePermission } from "@/hooks";

function DeleteButton({ postId }: { postId: string }) {
  const { hasPermission, isLoading } = usePermission("delete:post");

  if (isLoading) return <Spinner />;
  if (!hasPermission) return null;

  return <button onClick={() => deletePost(postId)}>Delete</button>;
}
```

**Important:** The `usePermission` hook reads from a cache - it does NOT make an API call each time. Permissions are automatically refreshed when:

- User logs in
- User logs out
- You manually call `refreshPermissions()` from `usePermissions()`

### OAuth Login

```tsx
import { authService } from "@/services/auth.service";

function GoogleLoginButton() {
  const handleGoogleLogin = () => {
    authService.initiateOAuthSignIn("google", "/dashboard");
  };

  return <button onClick={handleGoogleLogin}>Sign in with Google</button>;
}
```

### Accessing User Data

```tsx
import { useAuth } from "@/contexts/AuthContext";

function UserProfile() {
  const { user, session, isAuthenticated } = useAuth();

  if (!isAuthenticated) return <LoginPrompt />;

  return (
    <div>
      <h1>Welcome, {user?.name}!</h1>
      <p>Email: {user?.email}</p>
      <p>Role: {user?.role}</p>
      <p>Email Verified: {user?.emailVerified ? "Yes" : "No"}</p>
      {user?.image && <img src={user.image} alt={user.name} />}
    </div>
  );
}
```

## User Types & Roles

### User Interface

```typescript
interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string;
  createdAt: string;
  updatedAt: string;
  role: UserRole; // "ADMIN" | "MODERATOR" | "EDITOR" | "USER"
}
```

### Role Hierarchy

```
USER < EDITOR < MODERATOR < ADMIN
```

When using `ProtectedRoute` with `requiredRole`, users with higher roles automatically have access to routes requiring lower roles.

## Environment Variables

Update your `.env.local` file:

```bash
# Required: BetterAuth backend URL
NEXT_PUBLIC_API_URL=http://localhost:3000

# Optional: Google Analytics
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

## Important Notes

### Cookie Requirements

1. **CORS Configuration**: Your backend must whitelist your frontend origin
2. **Credentials**: All API requests use `credentials: 'include'`
3. **Same-Site**: Cookies should be `SameSite=Lax` or `SameSite=None` (with Secure)
4. **Domain**: For production, ensure cookies are set for the correct domain

### Security Considerations

✅ **Benefits of Cookie-Based Sessions:**

- HttpOnly cookies prevent XSS attacks
- Automatic CSRF protection (BetterAuth handles this)
- Server-side session management
- No token storage in localStorage

⚠️ **Important:**

- Always use HTTPS in production
- Configure CORS properly on your backend
- Never expose session tokens to client-side JavaScript

### Migration from Old System

If you were using the old token-based system:

1. **Remove token-related code** from your components
2. **Update User type** to include new fields (emailVerified, role, etc.)
3. **Replace `avatar`** with `image` throughout your app
4. **Update auth method calls**:
   - `authService.login()` → `authService.signIn()`
   - `authService.signup()` → `authService.signUp()`
   - `authService.requestPasswordReset()` → `authService.forgotPassword()`

## Testing the Integration

### 1. Start Your Backend

```bash
# In your NestJS backend directory
npm run start:dev
```

Your backend should be running at `http://localhost:3000`

### 2. Configure Frontend

```bash
# Copy .env.example to .env.local
cp .env.example .env.local

# Update NEXT_PUBLIC_API_URL if needed
echo "NEXT_PUBLIC_API_URL=http://localhost:3000" >> .env.local
```

### 3. Start Frontend

```bash
npm run dev
```

### 4. Test Authentication Flow

1. Navigate to `http://localhost:3001/signup`
2. Create a new account
3. Check that you're redirected to dashboard
4. Verify session persists on page refresh
5. Test logout functionality

### 5. Test Permissions

```typescript
// In your component
const { hasPermission } = usePermission("create:post");
console.log(hasPermission); // true/false based on backend
```

## Troubleshooting

### Sessions Not Persisting

**Problem:** User gets logged out on page refresh

**Solutions:**

- Check that `credentials: 'include'` is set in all API calls
- Verify CORS is configured correctly on backend
- Ensure cookies are being set (check browser DevTools → Application → Cookies)
- Check that backend and frontend are on allowed origins

### 401 Unauthorized Errors

**Problem:** Getting 401 errors for authenticated requests

**Solutions:**

- Check that session cookie is being sent with requests
- Verify the cookie hasn't expired (7 day default)
- Check backend session validation logic
- Ensure `/get-session` endpoint is working

### OAuth Not Working

**Problem:** OAuth redirect fails or doesn't set session

**Solutions:**

- Verify OAuth providers are configured on backend
- Check redirect_to URL is correct and whitelisted
- Ensure OAuth callback URL matches backend configuration
- Check browser console for redirect errors

## Advanced Usage

### Manual Permission Refresh

If you need to refresh permissions (e.g., after a role change), use the `usePermissions` hook:

```tsx
import { usePermissions } from "@/contexts/PermissionsContext";

function AdminPanel() {
  const { permissions, refreshPermissions, isLoading } = usePermissions();

  const handleRoleUpdate = async (userId: string, newRole: string) => {
    await updateUserRole(userId, newRole);

    // Refresh permissions after role update
    await refreshPermissions();

    toast.success("Permissions updated!");
  };

  return (
    <div>
      <h2>Current Permissions:</h2>
      {isLoading ? (
        <Spinner />
      ) : (
        <ul>
          {Object.entries(permissions).map(([perm, has]) => (
            <li key={perm}>
              {perm}: {has ? "✓" : "✗"}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
```

### Higher-Order Component for Protection

```tsx
import { withAuth } from "@/components/layout/ProtectedRoute";

const ProtectedDashboard = withAuth(Dashboard);
const AdminPanel = withAuth(AdminPanelComponent, { requiredRole: "ADMIN" });

// Use like normal components
<ProtectedDashboard />
<AdminPanel />
```

### Session Refresh

```tsx
import { useAuth } from "@/contexts/AuthContext";

function MyComponent() {
  const { refreshSession } = useAuth();

  // Manually refresh session data
  const handleRefresh = async () => {
    await refreshSession();
  };
}
```

## API Service Reference

For detailed API service documentation, see:

- `QUICKSTART_API.md` - Quick start guide for API services
- `SERVICE_ARCHITECTURE.md` - Complete architecture guide
- `src/lib/api/README.md` - API client documentation

## Support

For issues specific to:

- **BetterAuth Backend**: See your backend's `AUTH_SYSTEM_DOCUMENTATION.md`
- **Next.js Template**: Create an issue in this repository
- **BetterAuth Library**: https://www.better-auth.com

## Summary

Your Next.js template is now fully integrated with your BetterAuth backend! The system provides:

✅ Secure cookie-based sessions
✅ Role-based access control
✅ Permission checking
✅ OAuth support (Google, GitHub, etc.)
✅ Email verification
✅ Password reset
✅ Protected routes
✅ TypeScript type safety

All authentication is handled seamlessly by the backend, with the frontend providing a clean, type-safe interface for your application.
