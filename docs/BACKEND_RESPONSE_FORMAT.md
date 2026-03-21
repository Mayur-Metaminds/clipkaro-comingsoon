# Backend Response Format

This document describes the actual response format from your BetterAuth backend.

## Authentication Endpoints

### Sign Up / Sign In

**Endpoint:** `POST /api/v1/auth/sign-up/email` or `POST /api/v1/auth/sign-in/email`

**Success Response (200):**

```json
{
  "token": null, // Token is managed by httpOnly cookies, so this is usually null
  "user": {
    "id": "9c2a34ec-d056-4b26-8e56-99b37191983c",
    "email": "user@example.com",
    "name": "User Name",
    "emailVerified": false,
    "image": null, // Can be null
    "createdAt": "2025-12-09T07:36:27.177Z",
    "updatedAt": "2025-12-09T07:36:27.177Z"
    // Note: "role" field may be undefined in response, defaults to "USER"
  }
}
```

**Error Response (422):**

```json
{
  "statusCode": 422,
  "message": "User already exists. Use another email.",
  "error": "Unprocessable Entity"
}
```

### Get Session

**Endpoint:** `GET /api/v1/auth/get-session`

**Success Response (200):**

```json
{
  "token": "session-token-here",
  "user": {
    "id": "9c2a34ec-d056-4b26-8e56-99b37191983c",
    "email": "user@example.com",
    "name": "User Name",
    "emailVerified": false,
    "image": null,
    "createdAt": "2025-12-09T07:36:27.177Z",
    "updatedAt": "2025-12-09T07:36:27.177Z",
    "role": "USER" // May be present in get-session
  }
}
```

**No Session (200):**

```json
null
```

## Important Notes

### Cookie-Based Sessions

BetterAuth uses **httpOnly cookies** for session management:

1. **Authentication cookies are set automatically** by the backend
2. **Token in response body is usually null** because the actual session token is in the cookie
3. **All subsequent requests include the cookie automatically** due to `withCredentials: true`
4. **Frontend doesn't need to manually store tokens** - cookies handle it

### Session Duration

- **Cookie Duration:** 7 days (configured in backend)
- **Auto-renewal:** Backend can auto-renew cookies on each request
- **Expiry:** Cookies expire after 7 days of inactivity

### Field Nullability

- **`image`**: Can be `null` or `undefined` - Zod schema: `z.string().nullable().optional()`
- **`role`**: May be `undefined` in signup response - Zod schema: `UserRoleSchema.optional().default("USER")`

### Why token is null

The `token` field in the response is `null` because:

- BetterAuth uses httpOnly cookies (more secure)
- Cookies can't be accessed by JavaScript
- Frontend just needs to know the user is authenticated
- Backend validates the cookie on every request

### Frontend Handling

The frontend creates a minimal Session object for state management:

```typescript
// Backend returns: { token: null, user: {...} }
const response = await authService.signUp({ email, password, name });

// Frontend creates session for state tracking
setUser(response.user);
setSession({
  token: response.token || "", // Empty string if null
  expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(),
});
```

This session object is **only for frontend state management**. The real authentication is handled by cookies.

## Zod Schema Validation

The frontend validates all responses with Zod:

```typescript
// User schema - handles null/undefined fields
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(), // ✅ Can be null or undefined
  createdAt: z.string(),
  updatedAt: z.string(),
  role: UserRoleSchema.optional().default("USER"), // ✅ Defaults to "USER"
});

// Auth response schema
export const AuthResponseSchema = z.object({
  token: z.string().nullable(), // Can be null
  user: UserSchema,
});

// Get session response schema
export const GetSessionResponseSchema = z
  .object({
    token: z.string(),
    user: UserSchema,
  })
  .nullable(); // Can be null if no session
```

This ensures type safety and catches any response format changes at runtime.

## Error Handling

All error responses follow this format:

```json
{
  "statusCode": 400 | 401 | 403 | 404 | 422 | 500,
  "message": "Human-readable error message",
  "error": "HTTP Error Name",
  "errors": {  // Optional: Field-specific validation errors
    "email": ["Email already exists"],
    "password": ["Password too weak"]
  }
}
```

The frontend automatically extracts the `message` field and shows it to users.

## Common Responses

### 200 Success (Signup/Login)

```json
{
  "token": null,
  "user": {
    "id": "...",
    "email": "user@example.com",
    "name": "User Name",
    "emailVerified": false,
    "image": null,
    "createdAt": "2025-12-09T07:36:27.177Z",
    "updatedAt": "2025-12-09T07:36:27.177Z"
  }
}
```

### 400 Bad Request

```json
{
  "statusCode": 400,
  "message": "Invalid request format"
}
```

### 401 Unauthorized

```json
{
  "statusCode": 401,
  "message": "Invalid credentials"
}
```

### 422 Validation Error

```json
{
  "statusCode": 422,
  "message": "User already exists. Use another email."
}
```

### 500 Server Error

```json
{
  "statusCode": 500,
  "message": "Internal server error"
}
```

## Summary

- ✅ Backend returns `{ token: null, user: {...} }` on signup/login
- ✅ Session managed by httpOnly cookies (more secure)
- ✅ `image` field can be `null` or `undefined`
- ✅ `role` field may be `undefined` in signup, defaults to "USER"
- ✅ Frontend creates minimal session object for state
- ✅ Errors include user-friendly `message` field
- ✅ All responses validated with Zod schemas
- ✅ Cookie duration is 7 days
