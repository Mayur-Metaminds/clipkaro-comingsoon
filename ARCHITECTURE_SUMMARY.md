# Architecture Summary

**Complete reusable Next.js starter template with best practices**

## 📁 Project Structure

```
nextjs-template/
├── src/
│   ├── app/
│   │   ├── api/                  # API Routes (optional)
│   │   └── (auth)/              # Auth pages (login, signup)
│   │
│   ├── components/
│   │   ├── ui/                   # Base UI components
│   │   ├── features/             # Feature-specific components
│   │   └── layout/               # Layout components
│   │
│   ├── lib/
│   │   ├── api/                  # API Service Layer
│   │   │   ├── client.ts        # Axios client with interceptors
│   │   │   ├── service.ts       # Generic API methods
│   │   │   └── BaseService.ts   # Base service class (CRUD)
│   │   ├── auth/                 # Authentication
│   │   │   └── tokenManager.ts  # Token management (cookies/localStorage)
│   │   └── utils/
│   │       └── cookies.ts        # Cookie utilities
│   │
│   ├── services/                 # Domain Services
│   │   ├── auth.service.ts      # Authentication service
│   │   ├── user.service.ts      # User service (extends BaseService)
│   │   └── _template.service.ts # Template for new services
│   │
│   ├── types/                    # TypeScript Types
│   │   ├── api.ts               # API schemas (User, Product, etc.)
│   │   └── auth.ts              # Auth schemas
│   │
│   └── config/
│       ├── site.ts              # Site metadata
│       ├── features.ts          # Feature flags
│       └── design-tokens.ts     # Design system tokens
│
├── DOCUMENTATION/
│   ├── SERVICE_ARCHITECTURE.md   # Complete API service guide
│   ├── QUICKSTART_API.md         # 5-minute API quick start
│   └── REUSABLE_CHECKLIST.md     # Copy to new project checklist
│
└── CLAUDE.md                      # Claude Code instructions
```

---

## 🏗️ Architecture Layers

### 1. API Service Layer (Client-Side)

**Location:** `src/lib/api/` + `src/services/`

**Purpose:** Type-safe API calls from client components

**Key Files:**

- `BaseService.ts` - Reusable CRUD operations
- `client.ts` - Axios with token interceptors
- `service.ts` - Generic HTTP methods with Zod validation

**Example:**

```typescript
// src/services/product.service.ts
class ProductService extends BaseService<Product> {
  protected baseUrl = "/products";
  protected schema = ProductSchema;
}

export const productService = new ProductService();

// Usage
const products = await productService.getAll({ page: 1 });
```

**Best For:**

- Client component data fetching
- Form submissions and mutations
- Complex filtering/pagination
- File uploads
- All external API calls

---

### 2. Token Management

**Location:** `src/lib/auth/tokenManager.ts`

**Features:**

- Supports cookies (recommended) or localStorage
- Automatic token refresh on 401
- Configurable expiration times

**Configuration:**

```typescript
const USE_COOKIES = true; // Switch between cookies/localStorage
const ACCESS_TOKEN_MAX_AGE = 15 * 60; // 15 minutes
const REFRESH_TOKEN_MAX_AGE = 7 * 24 * 60 * 60; // 7 days
```

---

## 🎯 When to Use What?

### Use **API Services** For:

- ✅ All external API calls
- ✅ Form submissions (login, signup)
- ✅ Mutations (create, update, delete)
- ✅ Client component data fetching
- ✅ Complex queries with filters
- ✅ Real-time updates
- ✅ Browser-specific operations

### Use **API Routes** (Optional) For:

- ✅ External API proxy (if needed)
- ✅ Webhooks
- ✅ Complex server-side logic

**Note:** This template uses client-side API services with token management. Server Actions are not included since we call external APIs, not a direct database.

---

## 🚀 Quick Start Guides

### Create New API Service (5 min)

1. **Define schema** in `src/types/api.ts`:

```typescript
export const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
});
```

2. **Create service** by copying `_template.service.ts`:

```typescript
class ProductService extends BaseService<Product> {
  protected baseUrl = "/products";
  protected schema = ProductSchema;
}
```

3. **Use in components**:

```typescript
const products = await productService.getAll();
```

📖 **Full Guide:** [QUICKSTART_API.md](./QUICKSTART_API.md)

---

## 📦 Copy to New Project

### Core Files to Copy

```
src/lib/api/          ✅ Complete directory
src/lib/auth/         ✅ Token management
src/lib/utils/        ✅ Cookie utilities
src/services/         ✅ Service templates
src/types/            ✅ Type definitions
```

#### Dependencies:

```bash
npm install axios zod
```

📖 **Full Checklist:** [REUSABLE_CHECKLIST.md](./REUSABLE_CHECKLIST.md)

---

## 🎨 Design System

**Location:** `src/config/design-tokens.ts`

**Single source of truth** for colors, typography, spacing.

**Quick Change Brand Colors:**

```typescript
export const designTokens = {
  brand: {
    primary: {
      600: "#YOUR_BRAND_COLOR", // Main brand color
    },
  },
};
```

All components automatically update!

📖 **Full Guide:** See CLAUDE.md → "Design Tokens & Branding"

---

## 🔐 Authentication

### Current Setup

1. **Client-side auth** with API services (`authService.login`)
2. **Token storage** in cookies or localStorage
3. **Automatic token refresh** on 401 errors
4. **External API backend** integration

### Best Practices

- ✅ Use cookies for token storage (more secure than localStorage)
- ✅ Automatic token refresh on 401 errors
- ✅ Zod validation for all requests/responses
- ✅ Centralized error handling

---

## 🛠️ Configuration

### Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=https://api.example.com
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX
NEXT_PUBLIC_ENABLE_GOOGLE_AUTH=true
```

### Token Storage

```typescript
// src/lib/auth/tokenManager.ts
const USE_COOKIES = true; // or false for localStorage
```

### API Base URL

```typescript
// src/lib/api/client.ts
baseURL: env.NEXT_PUBLIC_API_URL || "/api",
```

---

## 📚 Documentation Index

| Document                    | Purpose                           |
| --------------------------- | --------------------------------- |
| **CLAUDE.md**               | Claude Code instructions          |
| **SERVICE_ARCHITECTURE.md** | Complete API service architecture |
| **QUICKSTART_API.md**       | 5-minute API service tutorial     |
| **REUSABLE_CHECKLIST.md**   | Copy to new project checklist     |
| **ARCHITECTURE_SUMMARY.md** | This file - overview              |

---

## ✨ Features

### Authentication

- ✅ Login, signup, password reset
- ✅ Google OAuth (configurable)
- ✅ Token management (cookies/localStorage)
- ✅ Automatic token refresh

### API Layer

- ✅ BaseService with CRUD operations
- ✅ Zod validation for type safety
- ✅ Automatic bearer token injection
- ✅ Automatic token refresh on 401
- ✅ Error handling
- ✅ Pagination, filtering, sorting

### Design System

- ✅ Design tokens in TypeScript
- ✅ Pre-made themes
- ✅ Tailwind CSS v4
- ✅ Dark mode ready

### Developer Experience

- ✅ TypeScript strict mode
- ✅ ESLint + Prettier
- ✅ Git hooks (Husky)
- ✅ Conventional commits
- ✅ VS Code settings included

---

## 🎓 Best Practices

### 1. One Service Per Domain

```
services/
├── user.service.ts
├── product.service.ts
├── order.service.ts
```

### 2. Define Schemas in Types

```
types/
├── api.ts      # API entities
├── auth.ts     # Auth types
```

### 3. Use Absolute Imports

```typescript
import { userService } from "@/services/user.service";
import { Button } from "@/components/ui/Button";
```

### 4. Export Singleton Instances

```typescript
export const productService = new ProductService();
```

### 5. Validate Everything with Zod

```typescript
const ProductSchema = z.object({...});
```

---

## 🚢 Production Ready

This template is production-ready with:

- ✅ Type safety throughout
- ✅ Error handling
- ✅ Security best practices (HTTP-only cookies)
- ✅ Performance optimizations (Turbopack)
- ✅ Code quality tools (ESLint, Prettier)
- ✅ Git workflow (Husky hooks)
- ✅ Comprehensive documentation

---

## 🤝 Contributing to New Projects

When starting a new project:

1. **Copy core files** (see REUSABLE_CHECKLIST.md)
2. **Configure environment** (.env.local)
3. **Update branding** (design-tokens.ts)
4. **Create domain services** (use templates)
5. **Build features** with consistent patterns

---

## 📞 Need Help?

- 📖 **API Services:** Read [SERVICE_ARCHITECTURE.md](./SERVICE_ARCHITECTURE.md)
- 📖 **Quick Start:** Read [QUICKSTART_API.md](./QUICKSTART_API.md)
- 🚀 **Copy Project:** Use [REUSABLE_CHECKLIST.md](./REUSABLE_CHECKLIST.md)

---

**This architecture provides everything you need to build production-ready Next.js applications with consistent, reusable patterns!** 🚀
