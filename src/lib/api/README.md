# API Service Layer

Centralized API service using Axios and Zod for type-safe HTTP requests with automatic validation.

## Features

- ✅ Axios client with interceptors
- ✅ Automatic request/response logging in development
- ✅ Zod schema validation for all responses
- ✅ Centralized error handling
- ✅ TypeScript type inference from Zod schemas
- ✅ Authentication token handling (ready to configure)

## Quick Start

### 1. Configure API Base URL

Add to `.env.local`:

```env
NEXT_PUBLIC_API_URL=https://api.example.com
```

### 2. Define Your Schema

Create a Zod schema in `src/types/api.ts`:

```typescript
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
});

export type Product = z.infer<typeof ProductSchema>;
```

### 3. Create a Service

Create a service file in `src/services/`:

```typescript
import { apiService } from "@/lib/api";
import { ProductSchema } from "@/types/api";

export const productService = {
  async getProducts() {
    const ResponseSchema = z.object({
      data: z.array(ProductSchema),
    });

    return apiService.get("/products", ResponseSchema);
  },

  async getProductById(id: number) {
    return apiService.get(`/products/${id}`, ProductSchema);
  },

  async createProduct(data: Omit<Product, "id">) {
    return apiService.post("/products", ProductSchema, data);
  },
};
```

### 4. Use in Components

```typescript
"use client";

import { useEffect, useState } from "react";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/api";

export function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProducts() {
      try {
        const response = await productService.getProducts();
        setProducts(response.data);
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to fetch");
      } finally {
        setLoading(false);
      }
    }

    fetchProducts();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <ul>
      {products.map((product) => (
        <li key={product.id}>{product.name}</li>
      ))}
    </ul>
  );
}
```

## Error Handling

The API service includes a custom `ApiError` class:

```typescript
import { apiService, ApiError } from "@/lib/api";

try {
  await apiService.get("/endpoint", schema);
} catch (error) {
  if (error instanceof ApiError) {
    console.error("API Error:", error.message);
    console.error("Status Code:", error.statusCode);
    console.error("Data:", error.data);
  }
}
```

## Advanced Usage

### Custom Headers

```typescript
await apiService.get("/endpoint", schema, {
  headers: {
    "X-Custom-Header": "value",
  },
});
```

### Authentication

Modify `src/lib/api/client.ts` to add auth tokens:

```typescript
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("authToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Response Wrappers

Use helper schemas for common API response patterns:

```typescript
import { ApiResponseSchema, PaginatedResponseSchema } from "@/types/api";

// Wrapped response
const WrappedSchema = ApiResponseSchema(ProductSchema);

// Paginated response
const PaginatedSchema = PaginatedResponseSchema(ProductSchema);
```

## Best Practices

1. **Always define Zod schemas** for API responses
2. **Create service files** per domain (users, products, etc.)
3. **Export types** using `z.infer<typeof Schema>`
4. **Handle errors** appropriately in components
5. **Use environment variables** for API URLs
