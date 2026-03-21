# Syncing Frontend with Backend

This guide explains how to keep your Next.js frontend types in sync with your NestJS BetterAuth backend.

## Current Approach (Manual)

Currently, types are manually duplicated:

- **Backend**: NestJS entities, DTOs, BetterAuth schemas
- **Frontend**: TypeScript types in `src/types/`, Zod schemas in `src/lib/validations/`

**Problems:**

- ❌ Manual duplication of types
- ❌ Types can drift out of sync
- ❌ Breaking changes not caught until runtime
- ❌ Time-consuming to maintain

## Recommended Approach: OpenAPI Type Generation

Generate frontend types automatically from your NestJS backend's OpenAPI/Swagger specification.

### Prerequisites

Your NestJS backend should have Swagger documentation configured:

```typescript
// main.ts (Backend)
import { SwaggerModule, DocumentBuilder } from "@nestjs/swagger";

const config = new DocumentBuilder().setTitle("API").setVersion("1.0").build();

const document = SwaggerModule.createDocument(app, config);
SwaggerModule.setup("api", app, document);

// Expose JSON endpoint for type generation
app.use("/api-json", (req, res) => {
  res.json(document);
});
```

### Frontend Setup

**1. Install dependencies:**

```bash
npm install -D openapi-typescript
```

**2. Add script to package.json:**

```json
{
  "scripts": {
    "generate:types": "./scripts/generate-api-types.sh",
    "dev:backend": "cd ../backend && npm run start:dev",
    "dev:with-sync": "npm run generate:types && npm run dev"
  }
}
```

**3. Make script executable:**

```bash
chmod +x scripts/generate-api-types.sh
```

**4. Generate types:**

```bash
# Start your backend first
npm run dev:backend

# In another terminal, generate types
npm run generate:types
```

This creates `src/types/api-generated.ts` with all your backend types.

### Usage

**Before (Manual types):**

```typescript
// src/types/auth.ts - Manually maintained
export interface User {
  id: string;
  email: string;
  name: string;
  // ... manually kept in sync
}
```

**After (Generated types):**

```typescript
// src/types/api-generated.ts - Auto-generated from backend
export interface paths {
  "/api/v1/auth/get-session": {
    get: {
      responses: {
        200: {
          content: {
            "application/json": components["schemas"]["SessionResponse"];
          };
        };
      };
    };
  };
}

export interface components {
  schemas: {
    User: {
      id: string;
      email: string;
      name: string;
      emailVerified: boolean;
      image?: string;
      createdAt: string;
      updatedAt: string;
      role: "ADMIN" | "MODERATOR" | "EDITOR" | "USER";
    };
    // ... all backend types auto-generated
  };
}
```

**Use in your code:**

```typescript
import type { components } from "@/types/api-generated";

type User = components["schemas"]["User"];
type Session = components["schemas"]["Session"];

// Type-safe API client
async function getSession(): Promise<components["schemas"]["SessionResponse"]> {
  const response = await apiClient.get("/api/v1/auth/get-session");
  return response.data;
}
```

### Keeping Zod Schemas

You can keep your Zod schemas for runtime validation while using generated types:

```typescript
import { z } from "zod";
import type { components } from "@/types/api-generated";

// Zod schema for validation
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().optional(),
  createdAt: z.string(),
  updatedAt: z.string(),
  role: z.enum(["ADMIN", "MODERATOR", "EDITOR", "USER"]),
});

// Ensure Zod schema matches generated type
type User = components["schemas"]["User"];
type ZodUser = z.infer<typeof UserSchema>;

// TypeScript will error if they don't match
const _typeCheck: User = {} as ZodUser;
```

### Advanced: Generate Zod Schemas Too

For automatic Zod schema generation:

```bash
npm install -D openapi-zod-client
```

Update `scripts/generate-api-types.sh`:

```bash
# Generate Zod schemas
npx openapi-zod-client "${BACKEND_URL}${OPENAPI_ENDPOINT}" \
  --output src/lib/api/generated-schemas.ts
```

This generates:

```typescript
// src/lib/api/generated-schemas.ts
import { z } from "zod";

export const UserSchema = z.object({
  id: z.string(),
  email: z.string(),
  // ... auto-generated from backend
});
```

### Workflow

**Daily Development:**

```bash
# 1. Start backend
cd backend && npm run dev

# 2. Generate types when backend changes
cd frontend && npm run generate:types

# 3. Start frontend
npm run dev
```

**CI/CD Pipeline:**

```yaml
# .github/workflows/test.yml
- name: Start backend
  run: cd backend && npm run start &

- name: Wait for backend
  run: npx wait-on http://localhost:3000/health

- name: Generate types
  run: cd frontend && npm run generate:types

- name: Type check
  run: cd frontend && npm run type-check

- name: Build
  run: cd frontend && npm run build
```

### Configuration Options

**Environment variables:**

```bash
# .env.local
BACKEND_URL=http://localhost:3000
OPENAPI_ENDPOINT=/api-json
```

**Custom generation script:**

```typescript
// scripts/generate-types.ts
import openapiTS from "openapi-typescript";
import fs from "fs";

const BACKEND_URL = process.env.BACKEND_URL || "http://localhost:3000";

async function generate() {
  const output = await openapiTS(`${BACKEND_URL}/api-json`, {
    // Custom options
    pathParamsAsTypes: true,
    exportType: true,
  });

  fs.writeFileSync("src/types/api-generated.ts", output);
  console.log("✅ Types generated!");
}

generate();
```

## Alternative Approaches

### 1. Shared Types Package (Monorepo)

If you control both repos and want a monorepo:

```
monorepo/
├── packages/
│   ├── shared-types/    # Shared TypeScript + Zod schemas
│   ├── backend/         # NestJS
│   └── frontend/        # Next.js
└── package.json
```

**Pros:**

- Single source of truth
- Both projects import the same types
- Works with npm workspaces or turborepo

**Cons:**

- Requires monorepo setup
- More complex project structure

### 2. Type Generation from Database

Generate types from your Prisma schema:

```bash
npm install -D prisma-zod-generator
```

**Pros:**

- Types match database exactly
- Works well with Prisma

**Cons:**

- Doesn't include API-specific types (DTOs, responses)
- Backend and frontend might have different type needs

### 3. tRPC (Future consideration)

For end-to-end type safety without code generation:

**Pros:**

- Automatic type inference
- No code generation needed
- Best developer experience

**Cons:**

- Would require refactoring your REST API
- BetterAuth uses REST, not tRPC
- More architectural changes

## Migration Guide

### Step 1: Set up type generation

```bash
# Install dependencies
npm install -D openapi-typescript

# Make script executable
chmod +x scripts/generate-api-types.sh

# Generate types
npm run generate:types
```

### Step 2: Gradually migrate to generated types

Don't migrate everything at once. Start with new code:

```typescript
// New code - use generated types
import type { components } from "@/types/api-generated";
type User = components["schemas"]["User"];

// Old code - keep existing types (for now)
import type { User } from "@/types/auth";
```

### Step 3: Add type compatibility checks

Ensure your Zod schemas match generated types:

```typescript
import { z } from "zod";
import type { components } from "@/types/api-generated";

export const UserSchema = z.object({
  // ... your Zod schema
});

// Type check - will error if schemas don't match
type User = components["schemas"]["User"];
type ZodUser = z.infer<typeof UserSchema>;
const _check: User = {} as ZodUser;
```

### Step 4: Update CI/CD

Add type generation to your CI pipeline:

```yaml
- name: Generate types
  run: npm run generate:types

- name: Type check
  run: npm run type-check
```

## Best Practices

1. **Generate types before building:**

   ```json
   {
     "scripts": {
       "prebuild": "npm run generate:types",
       "build": "next build"
     }
   }
   ```

2. **Commit generated types to git:**
   - Makes types available without running backend
   - CI/CD can verify types match

3. **Version your API:**
   - Use API versioning (`/api/v1/`)
   - Generate types per API version if needed

4. **Document type generation:**
   - Add to README
   - Include in onboarding docs
   - Script should be self-documenting

## Troubleshooting

**Backend not running:**

```bash
# Error: connect ECONNREFUSED
# Solution: Start backend first
cd backend && npm run dev
```

**Types out of sync:**

```bash
# Solution: Regenerate types
npm run generate:types
```

**TypeScript errors after generation:**

```bash
# Solution: Verify backend OpenAPI spec is correct
curl http://localhost:3000/api-json | jq
```

## Summary

**Current state:**

- ✅ Manual type definitions
- ❌ Types can drift out of sync

**Recommended solution:**

- ✅ OpenAPI type generation
- ✅ Automatic sync with backend
- ✅ Catch breaking changes at compile time
- ✅ Minimal setup required

**Commands:**

```bash
npm run generate:types    # Generate types from backend
npm run type-check        # Verify types are correct
npm run dev:with-sync     # Generate types + start dev server
```
