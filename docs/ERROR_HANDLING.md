# Error Handling Guide

This document explains how API errors are handled in the application.

## How It Works

### 1. Axios Interceptor (Automatic)

The axios client (`src/lib/api/client.ts`) automatically handles all API errors:

```typescript
// All API errors are intercepted and processed
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    // Extract backend error message
    const backendMessage =
      error.response?.data?.message || error.response?.data?.error;

    // Attach user-friendly message to error
    error.message = backendMessage || defaultMessage;

    return Promise.reject(error);
  }
);
```

**Handles:**

- ✅ 400 Bad Request
- ✅ 401 Unauthorized (auto-redirects to /login)
- ✅ 403 Forbidden
- ✅ 404 Not Found
- ✅ 422 Validation Error (your current issue!)
- ✅ 500 Server Error
- ✅ Network errors
- ✅ Timeouts

### 2. Error Utilities (`src/lib/api/errors.ts`)

Helper functions to extract error information:

```typescript
import {
  getErrorMessage,
  getFieldErrors,
  isValidationError,
} from "@/lib/api/errors";

try {
  await authService.signUp({ email, password, name });
} catch (error) {
  // Get user-friendly message
  const message = getErrorMessage(error);
  // "Email already exists" (from backend)

  // Get field-specific errors
  const fieldErrors = getFieldErrors(error);
  // { email: "Email already exists", password: "Too weak" }

  // Check error type
  if (isValidationError(error)) {
    // Handle validation errors
  }
}
```

## Common Error Scenarios

### 422 Validation Error (Your Current Issue)

**What it means:**

- Backend rejected the request due to validation rules
- Common causes:
  - Email already exists
  - Password doesn't meet requirements
  - Invalid email format
  - Missing required fields

**Backend response example:**

```json
{
  "statusCode": 422,
  "message": "Email already exists",
  "error": "Unprocessable Entity"
}
```

**How it's handled:**

1. **Axios interceptor extracts the message:**

```typescript
error.message = "Email already exists"; // From backend
```

2. **AuthContext shows it to user:**

```typescript
catch (error) {
  toast.error("Signup failed", error.message);
  // Shows: "Email already exists"
}
```

**Before fix:**

```
❌ "Request failed with status code 422" (not helpful)
```

**After fix:**

```
✅ "Email already exists" (actual backend message)
```

### 401 Unauthorized

**What it means:**

- User is not authenticated
- Session expired
- Invalid credentials

**How it's handled:**

- Automatically redirects to `/login`
- Does not redirect if already on login page

### 400 Bad Request

**What it means:**

- Request format is invalid
- Missing required parameters

**Example:**

```json
{
  "message": "Invalid email format"
}
```

### 403 Forbidden

**What it means:**

- User is authenticated but lacks permissions

**Example:**

```json
{
  "message": "You don't have permission to delete posts"
}
```

### 500 Server Error

**What it means:**

- Something went wrong on the backend
- Database error
- Internal server error

## Using Error Utilities

### Basic Usage

```typescript
import { getErrorMessage } from "@/lib/api/errors";

try {
  await apiClient.post("/api/endpoint", data);
} catch (error) {
  const message = getErrorMessage(error);
  toast.error("Operation failed", message);
}
```

### Field-Specific Errors

If your backend returns field-specific validation errors:

**Backend response:**

```json
{
  "statusCode": 422,
  "message": "Validation failed",
  "errors": {
    "email": ["Email already exists", "Invalid format"],
    "password": ["Too weak", "Must contain uppercase"]
  }
}
```

**Frontend handling:**

```typescript
import { getFieldErrors } from "@/lib/api/errors";

try {
  await authService.signUp(data);
} catch (error) {
  const fieldErrors = getFieldErrors(error);

  if (fieldErrors) {
    // Show errors per field
    if (fieldErrors.email) {
      setEmailError(fieldErrors.email);
    }
    if (fieldErrors.password) {
      setPasswordError(fieldErrors.password);
    }
  }
}
```

### Error Type Checking

```typescript
import {
  isValidationError,
  isAuthError,
  isPermissionError,
  isNetworkError,
} from "@/lib/api/errors";

try {
  await apiClient.post("/api/endpoint", data);
} catch (error) {
  if (isValidationError(error)) {
    // Handle validation errors
    toast.error("Validation Error", getErrorMessage(error));
  } else if (isAuthError(error)) {
    // Handle auth errors (auto-redirected already)
    console.log("User needs to log in");
  } else if (isPermissionError(error)) {
    // Handle permission errors
    toast.error("Access Denied", "You don't have permission");
  } else if (isNetworkError(error)) {
    // Handle network errors
    toast.error("Network Error", "Check your internet connection");
  } else {
    // Handle other errors
    toast.error("Error", getErrorMessage(error));
  }
}
```

## Debugging Errors

### Development Mode

In development, all errors are logged to console:

```typescript
// Console output
[API Error] POST /api/v1/auth/sign-up/email 422 Email already exists
```

### Production Mode

In production, errors are NOT logged to console for security.

### Custom Logging

Use `formatErrorForLogging` for custom logging:

```typescript
import { formatErrorForLogging } from "@/lib/api/errors";

try {
  await apiClient.post("/api/endpoint", data);
} catch (error) {
  const logMessage = formatErrorForLogging(error);
  // Send to your logging service
  logToService(logMessage);
}
```

## Backend Error Format

For best results, your backend should return errors in this format:

```typescript
// NestJS example
throw new HttpException(
  {
    statusCode: 422,
    message: "Email already exists", // User-friendly message
    error: "Unprocessable Entity", // HTTP error name
    errors: {
      // Optional field-specific errors
      email: ["Email already exists"],
      password: ["Password too weak"],
    },
  },
  422
);
```

## Common Issues and Solutions

### Issue: Generic "Request failed" error

**Problem:**

```typescript
toast.error("Request failed with status code 422");
```

**Solution:**
Backend needs to include a `message` field in error response.

**Backend fix (NestJS):**

```typescript
// ❌ Don't do this
throw new UnprocessableEntityException();

// ✅ Do this instead
throw new UnprocessableEntityException("Email already exists");
```

### Issue: Not getting field-specific errors

**Problem:**
Can't show errors next to form fields.

**Solution:**
Backend should return `errors` object with field names:

```typescript
throw new UnprocessableEntityException({
  message: "Validation failed",
  errors: {
    email: ["Email already exists"],
    password: ["Password must be at least 8 characters"],
  },
});
```

### Issue: Errors not showing in toast

**Problem:**
User doesn't see error messages.

**Solution:**
Make sure error is caught and passed to toast:

```typescript
try {
  await authService.signUp(data);
} catch (error) {
  // ✅ Pass error.message (already extracted by interceptor)
  toast.error("Signup failed", error.message);
}
```

## Best Practices

1. **Always use error utilities:**

   ```typescript
   // ✅ Good
   const message = getErrorMessage(error);

   // ❌ Avoid
   const message = error?.response?.data?.message || "Error";
   ```

2. **Check error types:**

   ```typescript
   // ✅ Good
   if (isValidationError(error)) {
     // Handle validation
   }

   // ❌ Avoid
   if (error?.response?.status === 422) {
     // Handle validation
   }
   ```

3. **Show user-friendly messages:**

   ```typescript
   // ✅ Good
   toast.error("Signup failed", "Email already exists");

   // ❌ Avoid
   toast.error("Error", "Request failed with status code 422");
   ```

4. **Log errors in development:**

   ```typescript
   // Already handled by interceptor
   // No need to add extra console.log
   ```

5. **Don't expose sensitive info:**

   ```typescript
   // ✅ Good (in production)
   toast.error("Login failed", "Invalid credentials");

   // ❌ Avoid (in production)
   toast.error("Login failed", "User not found in database");
   ```

## Summary

The error handling system:

1. **Intercepts all API errors** via axios interceptor
2. **Extracts backend error messages** automatically
3. **Provides utility functions** for common error scenarios
4. **Shows user-friendly messages** in toasts
5. **Logs errors in development** for debugging

No manual error parsing needed - just catch errors and use the message!
