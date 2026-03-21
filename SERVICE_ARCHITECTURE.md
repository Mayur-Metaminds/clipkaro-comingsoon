# Service Architecture Guide

This document explains the reusable API service architecture that you can copy to any Next.js project.

## Table of Contents

1. [Overview](#overview)
2. [Token Management](#token-management)
3. [API Client Configuration](#api-client-configuration)
4. [BaseService Class](#baseservice-class)
5. [Creating Domain Services](#creating-domain-services)
6. [Usage Examples](#usage-examples)
7. [Copy to New Project](#copy-to-new-project)

---

## Overview

This template provides a **production-ready, type-safe API service layer** with:

- ✅ **Automatic token management** (cookies or localStorage)
- ✅ **Automatic token refresh** on 401 errors
- ✅ **Zod schema validation** for all API responses
- ✅ **BaseService class** with CRUD operations
- ✅ **Query building** with filtering, pagination, sorting
- ✅ **Batch operations** support
- ✅ **Type safety** throughout

### Architecture Layers

```
┌─────────────────────────────────────────┐
│  Components (UI Layer)                  │
├─────────────────────────────────────────┤
│  Services (Business Logic)              │
│  - userService                          │
│  - authService                          │
│  - <your-domain>Service                 │
├─────────────────────────────────────────┤
│  BaseService (Reusable CRUD)            │
├─────────────────────────────────────────┤
│  apiService (HTTP Methods)              │
├─────────────────────────────────────────┤
│  apiClient (Axios + Interceptors)       │
├─────────────────────────────────────────┤
│  Token Manager (Auth)                   │
└─────────────────────────────────────────┘
```

---

## Token Management

### Files

- `src/lib/auth/tokenManager.ts` - Token storage and retrieval
- `src/lib/utils/cookies.ts` - Cookie utilities

### Configuration

Toggle between **cookies** (recommended) or **localStorage**:

```typescript
// src/lib/auth/tokenManager.ts
const USE_COOKIES = true; // Set to false for localStorage

// Token expiration
const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days
```

### Usage

```typescript
import { tokenManager } from "@/lib/auth/tokenManager";

// Store tokens after login
tokenManager.setTokens(accessToken, refreshToken);

// Get access token (automatically used in API calls)
const token = tokenManager.getAccessToken();

// Check authentication
if (tokenManager.isAuthenticated()) {
  // User is logged in
}

// Logout
tokenManager.clearTokens();
```

### How It Works

1. **Login**: Save access + refresh tokens to cookies/localStorage
2. **API Request**: Access token automatically added to `Authorization` header
3. **Token Expired (401)**: Automatically call `/auth/refresh` with refresh token
4. **Get New Token**: Update access token and retry original request
5. **Refresh Failed**: Clear tokens and redirect to login

---

## API Client Configuration

### Files

- `src/lib/api/client.ts` - Axios instance with interceptors
- `src/lib/api/service.ts` - Generic API methods with Zod validation

### Request Flow

```
Request → Add Auth Header → API Call → Response
   ↓                                      ↓
   └───────── If 401 ← Refresh Token ← ──┘
```

### Interceptors

**Request Interceptor:**

- Adds `Authorization: Bearer <token>` header automatically
- Logs requests in development

**Response Interceptor:**

- Handles 401: Automatic token refresh
- Handles 403, 404, 500: Error logging
- Validates response with Zod schemas

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com  # Optional, defaults to /api
```

---

## BaseService Class

The `BaseService` class provides **automatic CRUD operations** for any domain entity.

### File

`src/lib/api/BaseService.ts`

### Built-in Methods

| Method                   | Description                   | HTTP   |
| ------------------------ | ----------------------------- | ------ |
| `getAll(params?)`        | Get all items with pagination | GET    |
| `getById(id)`            | Get single item               | GET    |
| `create(data)`           | Create new item               | POST   |
| `update(id, data)`       | Partial update                | PATCH  |
| `replace(id, data)`      | Full update                   | PUT    |
| `delete(id)`             | Delete item                   | DELETE |
| `search(query, params?)` | Search items                  | GET    |
| `count(params?)`         | Count items                   | GET    |
| `batchCreate(items)`     | Create multiple               | POST   |
| `batchUpdate(updates)`   | Update multiple               | PATCH  |
| `batchDelete(ids)`       | Delete multiple               | DELETE |

### Query Parameters

```typescript
interface QueryParams {
  page?: number;
  pageSize?: number;
  sort?: string;
  order?: "asc" | "desc";
  search?: string;
  [key: string]: string | number | boolean | undefined;
}
```

---

## Creating Domain Services

### Step 1: Define Schema

```typescript
// src/types/api.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  createdAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;
```

### Step 2: Create Service

```typescript
// src/services/product.service.ts
import { BaseService, QueryParams } from "@/lib/api";
import { ProductSchema, type Product } from "@/types/api";
import { apiService } from "@/lib/api";
import { z } from "zod";

/**
 * Extended query parameters for products
 */
export interface ProductQueryParams extends QueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

class ProductService extends BaseService<Product> {
  protected baseUrl = "/products";
  protected schema = ProductSchema;

  /**
   * Get featured products
   */
  async getFeatured() {
    return apiService.get(
      "/products/featured",
      z.object({
        data: z.array(this.schema),
      })
    );
  }

  /**
   * Get products by category
   */
  async getByCategory(category: string, params?: ProductQueryParams) {
    const queryString = this.buildQueryString(params);
    return apiService.get(
      `/products/category/${category}${queryString}`,
      this.getListSchema()
    );
  }

  /**
   * Add product to favorites
   */
  async addToFavorites(productId: number) {
    return apiService.post(
      `/products/${productId}/favorite`,
      this.getMessageSchema()
    );
  }
}

// Export singleton instance
export const productService = new ProductService();
```

### Step 3: Use in Components

```typescript
// In your component
import { productService } from "@/services/product.service";

// Get all products with pagination
const { data, meta } = await productService.getAll({
  page: 1,
  pageSize: 20,
  sort: "price",
  order: "asc",
});

// Get single product
const { data: product } = await productService.getById(123);

// Create product
const { data: newProduct } = await productService.create({
  name: "New Product",
  price: 99.99,
});

// Update product
await productService.update(123, { price: 79.99 });

// Delete product
await productService.delete(123);

// Search products
const results = await productService.search("laptop", {
  category: "electronics",
  minPrice: 500,
});

// Custom method
const featured = await productService.getFeatured();
```

---

## Usage Examples

### Example 1: User Authentication

```typescript
import { authService } from "@/services/auth.service";

// Login
const { data } = await authService.login({
  email: "user@example.com",
  password: "password123",
});

// Tokens are automatically stored
// All subsequent API calls will include the access token
```

### Example 2: CRUD Operations

```typescript
import { userService } from "@/services/user.service";

// List users with filters
const users = await userService.getAll({
  page: 1,
  pageSize: 10,
  status: "active",
  sort: "createdAt",
  order: "desc",
});

// Get user profile
const profile = await userService.getProfile();

// Update profile
await userService.updateProfile({
  name: "New Name",
});

// Upload avatar
const file = document.querySelector('input[type="file"]').files[0];
await userService.uploadAvatar(file);
```

### Example 3: Batch Operations

```typescript
// Create multiple products
await productService.batchCreate([
  { name: "Product 1", price: 10 },
  { name: "Product 2", price: 20 },
]);

// Update multiple products
await productService.batchUpdate([
  { id: 1, data: { price: 15 } },
  { id: 2, data: { price: 25 } },
]);

// Delete multiple products
await productService.batchDelete([1, 2, 3]);
```

### Example 4: Error Handling

```typescript
import { ApiError } from "@/lib/api";

try {
  await userService.create(userData);
} catch (error) {
  if (error instanceof ApiError) {
    console.error("API Error:", error.message);
    console.error("Status:", error.statusCode);
    console.error("Data:", error.data);
  } else {
    console.error("Unknown error:", error);
  }
}
```

---

## Copy to New Project

### Checklist: Files to Copy

#### 1. Core API Files

```
src/lib/api/
├── client.ts          ← Axios client with interceptors
├── service.ts         ← Generic API methods
├── BaseService.ts     ← Base service class
└── index.ts           ← Exports
```

#### 2. Auth Files

```
src/lib/auth/
├── tokenManager.ts    ← Token storage/retrieval
└── oauth.ts           ← OAuth utilities (if needed)
```

#### 3. Utility Files

```
src/lib/utils/
└── cookies.ts         ← Cookie utilities
```

#### 4. Type Definitions

```
src/types/
├── api.ts             ← Common API schemas
├── auth.ts            ← Auth schemas
└── index.ts           ← Exports
```

#### 5. Example Services

```
src/services/
├── auth.service.ts    ← Authentication service
└── user.service.ts    ← User service (example)
```

#### 6. Dependencies

```bash
npm install axios zod
```

```json
{
  "dependencies": {
    "axios": "^1.6.0",
    "zod": "^3.22.0"
  }
}
```

### Quick Setup

1. **Copy files** listed above
2. **Install dependencies**: `npm install axios zod`
3. **Set environment variables**:
   ```bash
   NEXT_PUBLIC_API_URL=https://your-api.com
   ```
4. **Configure token storage** in `tokenManager.ts`:
   ```typescript
   const USE_COOKIES = true; // or false for localStorage
   ```
5. **Create your services** by extending `BaseService`
6. **Use in components**!

### Customization Options

**Change base URL:**

```typescript
// src/lib/api/client.ts
export const apiClient = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL || "/api",
});
```

**Change token expiration:**

```typescript
// src/lib/auth/tokenManager.ts
const ACCESS_TOKEN_MAX_AGE = 30 * 60; // 30 minutes
const REFRESH_TOKEN_MAX_AGE = 30 * 24 * 60 * 60; // 30 days
```

**Change response structure:**

```typescript
// src/lib/api/BaseService.ts
protected getSingleSchema() {
  return z.object({
    // Customize your API response structure here
    success: z.boolean(),
    data: this.schema,
  });
}
```

---

## Best Practices

### 1. One Service Per Domain

```
src/services/
├── user.service.ts
├── product.service.ts
├── order.service.ts
├── auth.service.ts
└── ...
```

### 2. Define Schemas in Types

```typescript
// src/types/api.ts - Define all schemas here
export const UserSchema = z.object({ ... });
export const ProductSchema = z.object({ ... });
```

### 3. Extend QueryParams for Filtering

```typescript
export interface ProductQueryParams extends QueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
}
```

### 4. Use Singletons

```typescript
// Export instance, not class
export const productService = new ProductService();
```

### 5. Handle Errors Gracefully

```typescript
try {
  await userService.create(data);
} catch (error) {
  if (error instanceof ApiError) {
    // Handle API errors
  }
}
```

---

## Advanced Features

### Custom Headers

```typescript
await apiService.get("/users", UserSchema, {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

### File Upload

```typescript
async uploadFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  return apiService.post("/upload", UploadSchema, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
}
```

### Query String Building

```typescript
// Automatically builds: /users?page=1&pageSize=20&status=active
await userService.getAll({
  page: 1,
  pageSize: 20,
  status: "active",
});
```

### Response Transformation

```typescript
const { data, meta } = await userService.getAll();
// data: User[]
// meta: { page, pageSize, total, totalPages }
```

---

## Troubleshooting

### Issue: Tokens not persisting

**Solution**: Check `USE_COOKIES` setting in `tokenManager.ts`. If using cookies, ensure your domain allows cookies.

### Issue: 401 errors not refreshing token

**Solution**: Check that `/auth/refresh` endpoint exists and returns `{ data: { access_token: string } }`.

### Issue: CORS errors

**Solution**: Configure your backend to allow credentials:

```javascript
// Backend CORS config
cors({
  origin: "http://localhost:3000",
  credentials: true,
});
```

### Issue: Type errors with schemas

**Solution**: Ensure you're using `z.infer<typeof Schema>` to extract types:

```typescript
export type User = z.infer<typeof UserSchema>;
```

---

## Summary

This architecture provides:

- ✅ **Zero boilerplate** for new services (extend BaseService)
- ✅ **Type-safe** API calls with Zod validation
- ✅ **Automatic authentication** with token refresh
- ✅ **Consistent patterns** across all services
- ✅ **Easy to copy** to new projects
- ✅ **Production-ready** with error handling

**Copy these files to any project and have a complete API layer in minutes!**

---

For questions or improvements, see the [API Service README](src/lib/api/README.md).
