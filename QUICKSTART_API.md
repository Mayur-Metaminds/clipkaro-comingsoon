# API Service Quick Start

**Create a new API service in 5 minutes!**

## 1. Define Your Schema

Add your entity schema to `src/types/api.ts`:

```typescript
// src/types/api.ts
import { z } from "zod";

export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  description: z.string().optional(),
  category: z.string(),
  inStock: z.boolean(),
  createdAt: z.string().datetime(),
});

export type Product = z.infer<typeof ProductSchema>;
```

## 2. Create Service File

Copy `src/services/_template.service.ts` to your new service:

```bash
cp src/services/_template.service.ts src/services/product.service.ts
```

## 3. Update Service Class

```typescript
// src/services/product.service.ts
import { BaseService, QueryParams } from "@/lib/api";
import { ProductSchema, type Product } from "@/types/api";
import { apiService } from "@/lib/api";
import { z } from "zod";

// Extended query params
export interface ProductQueryParams extends QueryParams {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
}

class ProductService extends BaseService<Product> {
  protected baseUrl = "/products";
  protected schema = ProductSchema;

  // Add custom methods here
  async getByCategory(category: string) {
    return apiService.get(
      `/products/category/${category}`,
      this.getListSchema()
    );
  }

  async toggleStock(id: number) {
    return apiService.post(
      `/products/${id}/toggle-stock`,
      this.getMessageSchema()
    );
  }
}

export const productService = new ProductService();
```

## 4. Use in Components

```typescript
// In your component or page
import { productService } from "@/services/product.service";

// Get all products with filters
const { data, meta } = await productService.getAll({
  page: 1,
  pageSize: 20,
  category: "electronics",
  inStock: true,
  sort: "price",
  order: "asc",
});

// Get single product
const { data: product } = await productService.getById(123);

// Create product
const { data: newProduct } = await productService.create({
  name: "New Product",
  price: 99.99,
  category: "electronics",
  inStock: true,
});

// Update product
await productService.update(123, { price: 79.99 });

// Delete product
await productService.delete(123);

// Search
const results = await productService.search("laptop");

// Custom method
const electronics = await productService.getByCategory("electronics");
```

## Built-in Methods

Every service extending `BaseService` gets these methods automatically:

| Method                   | Description                             |
| ------------------------ | --------------------------------------- |
| `getAll(params?)`        | Get all items with pagination & filters |
| `getById(id)`            | Get single item                         |
| `create(data)`           | Create new item                         |
| `update(id, data)`       | Partial update (PATCH)                  |
| `replace(id, data)`      | Full update (PUT)                       |
| `delete(id)`             | Delete item                             |
| `search(query, params?)` | Search items                            |
| `count(params?)`         | Count items                             |
| `batchCreate(items)`     | Create multiple items                   |
| `batchUpdate(updates)`   | Update multiple items                   |
| `batchDelete(ids)`       | Delete multiple items                   |

## Query Parameters

```typescript
interface QueryParams {
  page?: number; // Page number
  pageSize?: number; // Items per page
  sort?: string; // Field to sort by
  order?: "asc" | "desc"; // Sort order
  search?: string; // Search query
  [key: string]: any; // Custom filters
}
```

## Response Structure

### List Response

```typescript
{
  data: Product[],
  meta: {
    page: number,
    pageSize: number,
    total: number,
    totalPages: number
  }
}
```

### Single Item Response

```typescript
{
  success: boolean,
  data: Product
}
```

### Message Response

```typescript
{
  success: boolean,
  message: string
}
```

## Error Handling

```typescript
import { ApiError } from "@/lib/api";

try {
  await productService.create(productData);
} catch (error) {
  if (error instanceof ApiError) {
    console.error("API Error:", error.message);
    console.error("Status Code:", error.statusCode);
    console.error("Response Data:", error.data);
  } else {
    console.error("Unknown error:", error);
  }
}
```

## Common Patterns

### Pattern 1: Filtering

```typescript
const products = await productService.getAll({
  category: "electronics",
  minPrice: 100,
  maxPrice: 500,
  inStock: true,
});
```

### Pattern 2: Pagination

```typescript
const { data, meta } = await productService.getAll({
  page: 1,
  pageSize: 20,
});

console.log(`Page ${meta.page} of ${meta.totalPages}`);
console.log(`Total items: ${meta.total}`);
```

### Pattern 3: Sorting

```typescript
const products = await productService.getAll({
  sort: "price",
  order: "desc", // Most expensive first
});
```

### Pattern 4: Search with Filters

```typescript
const results = await productService.search("laptop", {
  category: "electronics",
  minPrice: 500,
});
```

### Pattern 5: Batch Operations

```typescript
// Create multiple
await productService.batchCreate([
  { name: "Product 1", price: 10, category: "tech", inStock: true },
  { name: "Product 2", price: 20, category: "tech", inStock: true },
]);

// Update multiple
await productService.batchUpdate([
  { id: 1, data: { price: 15 } },
  { id: 2, data: { price: 25 } },
]);

// Delete multiple
await productService.batchDelete([1, 2, 3]);
```

## Real-World Example

```typescript
"use client";

import { useState, useEffect } from "react";
import { productService } from "@/services/product.service";
import type { Product } from "@/types/api";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);

  useEffect(() => {
    loadProducts();
  }, [page]);

  async function loadProducts() {
    try {
      setLoading(true);
      const { data } = await productService.getAll({
        page,
        pageSize: 20,
        sort: "createdAt",
        order: "desc",
      });
      setProducts(data);
    } catch (error) {
      console.error("Failed to load products:", error);
    } finally {
      setLoading(false);
    }
  }

  async function handleDelete(id: number) {
    try {
      await productService.delete(id);
      loadProducts(); // Reload list
    } catch (error) {
      console.error("Failed to delete:", error);
    }
  }

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      {products.map((product) => (
        <div key={product.id}>
          <h3>{product.name}</h3>
          <p>${product.price}</p>
          <button onClick={() => handleDelete(product.id)}>Delete</button>
        </div>
      ))}
    </div>
  );
}
```

## Configuration

### API Base URL

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
```

### Token Storage

```typescript
// src/lib/auth/tokenManager.ts
const USE_COOKIES = true; // or false for localStorage
```

### Token Expiration

```typescript
// src/lib/auth/tokenManager.ts
const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days
```

## Next Steps

1. ✅ Read [SERVICE_ARCHITECTURE.md](./SERVICE_ARCHITECTURE.md) for deep dive
2. ✅ Check `src/services/user.service.ts` for real example
3. ✅ Use `src/services/_template.service.ts` as starting point
4. ✅ Define your schemas in `src/types/api.ts`
5. ✅ Create services in `src/services/`

**You're ready to build!** 🚀
