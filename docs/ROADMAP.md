# Next.js Starter Pack - Roadmap & Recommendations

This document outlines suggested improvements and additions to make this starter pack even more comprehensive.

## ✅ Completed Features

- [x] Authentication System with AuthContext
- [x] Protected Routes with ProtectedRoute component
- [x] Brand Design System with auto-generated colors
- [x] 5+ Pre-built brand presets
- [x] Complete auth pages (Login, Signup, Reset Password)
- [x] Example Dashboard with protected route
- [x] Toast notification system
- [x] Error handling system
- [x] Form validation with Zod
- [x] Token management (cookies/localStorage)
- [x] Automatic token refresh
- [x] Base UI components (Button, Input, Card, Label, Spinner, etc.)
- [x] TypeScript strict mode
- [x] Comprehensive documentation

---

## 🚀 Phase 1: Essential Components (High Priority)

### 1. Additional UI Components

#### Modal/Dialog Component
```tsx
<Modal open={isOpen} onClose={() => setIsOpen(false)}>
  <ModalHeader>Confirm Action</ModalHeader>
  <ModalBody>Are you sure you want to proceed?</ModalBody>
  <ModalFooter>
    <Button onClick={handleConfirm}>Confirm</Button>
    <Button variant="outline" onClick={() => setIsOpen(false)}>Cancel</Button>
  </ModalFooter>
</Modal>
```

**Use cases:**
- Confirmations
- Forms
- Image lightbox
- Alerts

#### Dropdown Menu Component
```tsx
<DropdownMenu>
  <DropdownTrigger>
    <Button>Options</Button>
  </DropdownTrigger>
  <DropdownContent>
    <DropdownItem onSelect={handleEdit}>Edit</DropdownItem>
    <DropdownItem onSelect={handleDelete}>Delete</DropdownItem>
  </DropdownContent>
</DropdownMenu>
```

**Use cases:**
- User menus
- Action menus
- Select dropdowns

#### Avatar Component
```tsx
<Avatar src={user?.avatar} alt={user?.name} size="md" fallback={user?.name?.charAt(0)} />
```

**Use cases:**
- User profiles
- Comments
- Team members

#### Badge Component
```tsx
<Badge variant="success">Active</Badge>
<Badge variant="error">Inactive</Badge>
```

**Use cases:**
- Status indicators
- Labels
- Count badges

### 2. Layout Components

#### Sidebar Navigation
```tsx
<Sidebar>
  <SidebarHeader>Logo</SidebarHeader>
  <SidebarNav>
    <SidebarItem href="/dashboard" icon={<HomeIcon />}>Dashboard</SidebarItem>
    <SidebarItem href="/settings" icon={<SettingsIcon />}>Settings</SidebarItem>
  </SidebarNav>
</Sidebar>
```

#### Navbar with User Menu
```tsx
<Navbar>
  <NavbarBrand>My App</NavbarBrand>
  <NavbarMenu>
    <NavbarItem href="/">Home</NavbarItem>
    <NavbarItem href="/about">About</NavbarItem>
  </NavbarMenu>
  <UserMenu />
</Navbar>
```

### 3. Next.js Middleware for Route Protection

Create `/middleware.ts`:
```typescript
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('access_token');
  const isAuthPage = request.nextUrl.pathname.startsWith('/login') ||
                     request.nextUrl.pathname.startsWith('/signup');
  const isProtectedPage = request.nextUrl.pathname.startsWith('/dashboard') ||
                          request.nextUrl.pathname.startsWith('/settings');

  // Redirect authenticated users away from auth pages
  if (token && isAuthPage) {
    return NextResponse.redirect(new URL('/dashboard', request.url));
  }

  // Redirect unauthenticated users to login
  if (!token && isProtectedPage) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*', '/settings/:path*', '/login', '/signup'],
};
```

**Benefits:**
- Server-side protection
- No flash of unauthenticated content
- Better performance
- SEO-friendly

---

## 🎨 Phase 2: Advanced Components (Medium Priority)

### 4. Data Display Components

#### Table Component
```tsx
<Table>
  <TableHeader>
    <TableRow>
      <TableHead>Name</TableHead>
      <TableHead>Email</TableHead>
      <TableHead>Status</TableHead>
    </TableRow>
  </TableHeader>
  <TableBody>
    {data.map((item) => (
      <TableRow key={item.id}>
        <TableCell>{item.name}</TableCell>
        <TableCell>{item.email}</TableCell>
        <TableCell><Badge>{item.status}</Badge></TableCell>
      </TableRow>
    ))}
  </TableBody>
</Table>
```

**Use cases:**
- Data tables
- User lists
- Analytics

#### Tabs Component
```tsx
<Tabs defaultValue="profile">
  <TabsList>
    <TabsTrigger value="profile">Profile</TabsTrigger>
    <TabsTrigger value="security">Security</TabsTrigger>
  </TabsList>
  <TabsContent value="profile">Profile settings</TabsContent>
  <TabsContent value="security">Security settings</TabsContent>
</Tabs>
```

### 5. Form Components

#### Form Builder
```tsx
<Form onSubmit={handleSubmit} schema={ProfileSchema}>
  <FormField name="name" label="Full Name" />
  <FormField name="email" label="Email" type="email" />
  <FormField name="bio" label="Bio" as="textarea" />
  <FormSubmit>Save Changes</FormSubmit>
</Form>
```

#### Checkbox & Radio Components
```tsx
<Checkbox
  checked={agreed}
  onCheckedChange={setAgreed}
  label="I agree to terms"
/>

<RadioGroup value={selected} onValueChange={setSelected}>
  <Radio value="option1" label="Option 1" />
  <Radio value="option2" label="Option 2" />
</RadioGroup>
```

### 6. Feedback Components

#### Loading Skeletons
```tsx
<Skeleton className="h-12 w-full" />
<Skeleton className="h-4 w-3/4" />
```

#### Progress Bar
```tsx
<Progress value={75} max={100} />
```

#### Alert Component
```tsx
<Alert variant="warning">
  <AlertIcon />
  <AlertTitle>Warning</AlertTitle>
  <AlertDescription>Please review your settings.</AlertDescription>
</Alert>
```

---

## 🔧 Phase 3: Developer Experience (High Priority)

### 7. Testing Setup

#### Jest/Vitest Configuration
```bash
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

**`vitest.config.ts`:**
```typescript
import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';
import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./src/test/setup.ts'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
});
```

**Example test:**
```typescript
import { render, screen } from '@testing-library/react';
import { Button } from '@/components';

describe('Button', () => {
  it('renders correctly', () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText('Click me')).toBeInTheDocument();
  });
});
```

#### E2E Testing with Playwright
```bash
npm install -D @playwright/test
```

**`tests/e2e/auth.spec.ts`:**
```typescript
import { test, expect } from '@playwright/test';

test('user can login', async ({ page }) => {
  await page.goto('/login');
  await page.fill('[name="email"]', 'test@example.com');
  await page.fill('[name="password"]', 'password123');
  await page.click('button[type="submit"]');
  await expect(page).toHaveURL('/dashboard');
});
```

### 8. Code Generators

#### Component Generator
```bash
npm run generate:component MyComponent
```

Creates:
- `src/components/ui/MyComponent.tsx`
- `src/components/ui/MyComponent.test.tsx`
- Updates `src/components/index.ts`

#### Service Generator
```bash
npm run generate:service Product
```

Creates:
- `src/services/product.service.ts`
- `src/types/product.ts`
- Example tests

### 9. Storybook Setup

```bash
npm install -D @storybook/nextjs @storybook/react
npx storybook init
```

**`src/components/ui/Button.stories.tsx`:**
```typescript
import type { Meta, StoryObj } from '@storybook/react';
import { Button } from './Button';

const meta: Meta<typeof Button> = {
  title: 'UI/Button',
  component: Button,
};

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: 'primary',
    children: 'Click me',
  },
};
```

---

## 📦 Phase 4: Advanced Features (Medium Priority)

### 10. User Profile & Settings Pages

#### User Profile Page (`/profile`)
- View and edit profile information
- Upload avatar
- Change email
- View activity history

#### Settings Page (`/settings`)
- Tabs for different settings sections
- Account settings
- Security (password change, 2FA)
- Notification preferences
- Danger zone (delete account)

### 11. Email Verification Flow

```typescript
// Add to AuthService
async verifyEmail(token: string) {
  return apiService.post("/auth/verify-email", schema, { token });
}

// Add verification page
// src/app/verify-email/page.tsx
```

### 12. OAuth Integration Examples

Complete Google OAuth flow:
```typescript
// src/lib/auth/oauth.ts
export async function handleGoogleLogin() {
  const response = await fetch('/api/auth/google');
  const { url } = await response.json();
  window.location.href = url;
}

// src/app/api/auth/google/callback/route.ts
export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const code = searchParams.get('code');

  const response = await authService.oauthLogin('google', code);
  // Set tokens and redirect
}
```

### 13. Role-Based Access Control (RBAC)

```typescript
// Add to User type
interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
  permissions: string[];
}

// Create permission hook
function usePermission(permission: string) {
  const { user } = useAuth();
  return user?.permissions.includes(permission);
}

// Protected by permission
function AdminPanel() {
  const canManageUsers = usePermission('users:manage');

  if (!canManageUsers) {
    return <AccessDenied />;
  }

  return <AdminContent />;
}
```

---

## 🌐 Phase 5: API & Data Management (Low Priority)

### 14. React Query Integration

```bash
npm install @tanstack/react-query
```

```typescript
// src/hooks/useUsers.ts
export function useUsers() {
  return useQuery({
    queryKey: ['users'],
    queryFn: () => userService.getAll(),
  });
}

// Usage
function UserList() {
  const { data, isLoading, error } = useUsers();

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;

  return <UserTable data={data} />;
}
```

### 15. Optimistic Updates

```typescript
function useUpdateUser() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (data) => userService.update(user.id, data),
    onMutate: async (newData) => {
      // Cancel outgoing refetches
      await queryClient.cancelQueries({ queryKey: ['user', user.id] });

      // Optimistically update
      queryClient.setQueryData(['user', user.id], newData);
    },
    onError: (err, newData, context) => {
      // Rollback on error
      queryClient.setQueryData(['user', user.id], context.previousData);
    },
  });
}
```

### 16. Infinite Scroll / Pagination

```typescript
function useInfiniteUsers() {
  return useInfiniteQuery({
    queryKey: ['users'],
    queryFn: ({ pageParam = 1 }) => userService.getAll({ page: pageParam }),
    getNextPageParam: (lastPage) => lastPage.nextPage,
  });
}
```

---

## 🎯 Phase 6: Production Optimizations (Low Priority)

### 17. Image Optimization

```typescript
// src/components/ui/OptimizedImage.tsx
import Image from 'next/image';

export function OptimizedImage({ src, alt, ...props }) {
  return (
    <Image
      src={src}
      alt={alt}
      loading="lazy"
      quality={75}
      placeholder="blur"
      {...props}
    />
  );
}
```

### 18. Performance Monitoring

```bash
npm install @vercel/analytics @vercel/speed-insights
```

```typescript
// src/app/layout.tsx
import { Analytics } from '@vercel/analytics/react';
import { SpeedInsights } from '@vercel/speed-insights/next';

export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        {children}
        <Analytics />
        <SpeedInsights />
      </body>
    </html>
  );
}
```

### 19. Error Tracking (Sentry)

```bash
npm install @sentry/nextjs
```

```typescript
// sentry.client.config.ts
import * as Sentry from '@sentry/nextjs';

Sentry.init({
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  environment: process.env.NODE_ENV,
  tracesSampleRate: 1.0,
});
```

### 20. Bundle Analysis

```bash
npm install -D @next/bundle-analyzer
```

```javascript
// next.config.js
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

module.exports = withBundleAnalyzer({
  // ... config
});
```

---

## 📱 Phase 7: Mobile & PWA (Optional)

### 21. Responsive Design Utilities

```typescript
// src/hooks/useBreakpoint.ts
export function useBreakpoint() {
  const isMobile = useMediaQuery('(max-width: 768px)');
  const isTablet = useMediaQuery('(max-width: 1024px)');
  const isDesktop = useMediaQuery('(min-width: 1024px)');

  return { isMobile, isTablet, isDesktop };
}
```

### 22. PWA Configuration

```javascript
// next.config.js
const withPWA = require('next-pwa')({
  dest: 'public',
  register: true,
  skipWaiting: true,
});

module.exports = withPWA({
  // ... config
});
```

---

## 🔐 Phase 8: Security Enhancements (Important)

### 23. CSRF Protection

```typescript
// src/lib/csrf.ts
export function generateCSRFToken() {
  return crypto.randomUUID();
}

export function validateCSRFToken(token: string) {
  // Validate against session
}
```

### 24. Rate Limiting

```typescript
// src/middleware.ts
import rateLimit from '@/lib/rateLimit';

export function middleware(request: NextRequest) {
  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
  });

  return limiter(request);
}
```

### 25. Content Security Policy

```typescript
// next.config.js
module.exports = {
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'Content-Security-Policy',
            value: "default-src 'self'; script-src 'self' 'unsafe-inline';",
          },
        ],
      },
    ];
  },
};
```

---

## 📊 Priority Matrix

| Feature | Priority | Effort | Impact |
|---------|----------|--------|--------|
| Modal/Dialog | 🔴 High | Medium | High |
| Dropdown Menu | 🔴 High | Medium | High |
| Next.js Middleware | 🔴 High | Low | High |
| Testing Setup | 🔴 High | High | High |
| Sidebar Navigation | 🟡 Medium | Medium | Medium |
| Table Component | 🟡 Medium | High | Medium |
| React Query | 🟡 Medium | Medium | High |
| User Settings Page | 🟡 Medium | Medium | Medium |
| Email Verification | 🟢 Low | Medium | Low |
| PWA | 🟢 Low | Medium | Low |

---

## 🎯 Quick Wins (Implement First)

1. **Modal Component** - Essential for confirmations and forms
2. **Dropdown Menu** - Needed for user menus and actions
3. **Next.js Middleware** - Better route protection
4. **Avatar Component** - Already needed in dashboard
5. **Badge Component** - Common UI pattern

---

## 📝 Implementation Order Recommendation

### Week 1: Essential UI
- Modal/Dialog
- Dropdown Menu
- Avatar
- Badge

### Week 2: Layouts & Navigation
- Sidebar
- Navbar with user menu
- Next.js Middleware

### Week 3: Data & Forms
- Table
- Form Builder
- Tabs

### Week 4: Testing
- Vitest setup
- Component tests
- E2E tests with Playwright

### Week 5: User Features
- Profile page
- Settings page
- Email verification

---

## 🚀 Getting Started

To implement any of these features, follow this process:

1. **Create the component/feature**
2. **Write tests**
3. **Add to Storybook (if UI component)**
4. **Update documentation**
5. **Add example usage**
6. **Commit with conventional commits**

---

## 📚 Resources

- [Next.js Documentation](https://nextjs.org/docs)
- [React Testing Library](https://testing-library.com/react)
- [Playwright](https://playwright.dev)
- [React Query](https://tanstack.com/query)
- [Radix UI](https://www.radix-ui.com) - Accessible component primitives
- [Headless UI](https://headlessui.com) - Unstyled accessible components

---

**Note:** This roadmap is flexible and should be adjusted based on your specific project needs and priorities.
