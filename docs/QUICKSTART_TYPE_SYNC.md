# Quick Start: Sync Frontend with Backend Types

**Goal:** Automatically generate TypeScript types from your NestJS backend to ensure your frontend stays in sync.

## 5-Minute Setup

### Step 1: Ensure Backend has Swagger/OpenAPI

Your NestJS backend should expose an OpenAPI spec. Check if this URL works:

```bash
curl http://localhost:3000/api-json
```

If not, add to your backend's `main.ts`:

```typescript
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder().setTitle("API").setVersion("1.0").build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("api", app, document);
```

### Step 2: Install Dependencies (Frontend)

```bash
npm install -D openapi-typescript
```

### Step 3: Generate Types

```bash
# Start your backend first
cd backend && npm run dev

# In another terminal, generate types
cd frontend
npm run generate:types
```

This creates `src/types/api-generated.ts` with all your backend types.

### Step 4: Use Generated Types

**Import generated types:**

```typescript
import type { components } from "@/types/api-generated";

type User = components["schemas"]["User"];
type Session = components["schemas"]["Session"];
```

**Use in services:**

```typescript
import { apiClient } from "@/lib/api/client";
import type { components } from "@/types/api-generated";

async function getUser(id: string): Promise<components["schemas"]["User"]> {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
}
```

**Combine with Zod validation:**

```typescript
import { z } from "zod";
import type { components } from "@/types/api-generated";

// Zod schema for runtime validation
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  // ... rest of schema
});

// Ensure Zod matches generated type
type User = components["schemas"]["User"];
type ZodUser = z.infer<typeof UserSchema>;

// TypeScript will error if they don't match
const _typeCheck: User = {} as ZodUser;
```

## Daily Workflow

**When backend changes:**

```bash
npm run generate:types
```

**Before building for production:**

```bash
npm run build  # Automatically runs generate:types first
```

**Development with auto-sync:**

```bash
npm run dev:with-sync  # Generates types then starts dev server
```

## What You Get

✅ **Automatic Type Safety**

- Frontend types always match backend
- Breaking changes caught at compile time
- No manual type maintenance

✅ **Better Developer Experience**

- Autocomplete for all API responses
- IntelliSense shows available endpoints
- Inline documentation from backend

✅ **Fewer Bugs**

- Can't access fields that don't exist
- Can't send wrong data shapes
- Type errors instead of runtime errors

## Example: Before vs After

**Before (Manual types):**

```typescript
// src/types/auth.ts - Manually maintained
export interface User {
  id: string;
  email: string;
  name: string;
  // ❌ Easy to get out of sync with backend
  // ❌ Breaking changes not caught
  // ❌ Time-consuming to maintain
}

// Backend adds new field "role" but frontend doesn't know
await apiClient.get("/users/me");
// ❌ TypeScript doesn't know about user.role
```

**After (Generated types):**

```typescript
import type { components } from "@/types/api-generated";

type User = components["schemas"]["User"];
// ✅ Always matches backend
// ✅ Includes new "role" field automatically
// ✅ Zero maintenance

await apiClient.get("/users/me");
// ✅ TypeScript knows about user.role
// ✅ Autocomplete shows all fields
```

## Configuration

**Environment variables (`.env.local`):**

```bash
BACKEND_URL=http://localhost:3000
OPENAPI_ENDPOINT=/api-json
```

**Scripts (already configured in `package.json`):**

```json
{
  "scripts": {
    "generate:types": "bash scripts/generate-api-types.sh",
    "dev:with-sync": "npm run generate:types && npm run dev",
    "prebuild": "npm run generate:types || true"
  }
}
```

## Troubleshooting

**Error: Backend not running**

```bash
# Start backend first
cd backend && npm run dev

# Verify it's running
curl http://localhost:3000/api-json
```

**Error: Module not found '@/types/api-generated'**

```bash
# Generate types
npm run generate:types
```

**Types out of sync**

```bash
# Regenerate types
npm run generate:types

# Verify types match
npm run type-check
```

## Next Steps

1. **Read full guide:** See `SYNCING_FRONTEND_BACKEND.md` for detailed documentation
2. **See examples:** Check `src/services/auth.service.example-with-generated-types.ts`
3. **Add to CI/CD:** Include type generation in your build pipeline
4. **Commit generated types:** Recommended so types are available offline

## Advanced Usage

**Type-safe API client:**

```typescript
import type { paths, components } from "@/types/api-generated";

type GetUserResponse =
  paths["/api/v1/users/{id}"]["get"]["responses"]["200"]["content"]["application/json"];

async function getUser(id: string): Promise<GetUserResponse> {
  const { data } = await apiClient.get(`/api/v1/users/${id}`);
  return data;
}
```

**Extract all endpoint types:**

```typescript
type Endpoints = keyof paths;
// "/api/v1/auth/sign-in/email" | "/api/v1/auth/sign-up/email" | ...
```

**Create generic API helper:**

```typescript
async function apiRequest<T extends keyof paths>(
  endpoint: T,
  method: keyof paths[T]
) {
  type Response =
    paths[T][typeof method]["responses"]["200"]["content"]["application/json"];
  const { data } = await apiClient.request({
    url: endpoint,
    method: String(method),
  });
  return data as Response;
}

// Usage
const session = await apiRequest("/api/v1/auth/get-session", "get");
// TypeScript knows exact shape of session
```

## Summary

1. **Setup:** `npm install -D openapi-typescript` (one-time)
2. **Generate:** `npm run generate:types` (when backend changes)
3. **Use:** `import type { components } from "@/types/api-generated"`
4. **Benefit:** Always in sync with backend, zero maintenance

That's it! Your frontend types will now automatically stay in sync with your backend.
