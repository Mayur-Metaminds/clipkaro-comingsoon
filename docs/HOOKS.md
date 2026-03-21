# Custom Hooks Guide

Comprehensive guide to all custom hooks in the starter pack.

## Table of Contents

- [useAsync](#useasync) - Handle async operations
- [useSafeState](#usesafestate) - Prevent state updates on unmounted components
- [useAuth](#useauth) - Access authentication state
- [useFormInput](#useforminput) - Form input management
- [useLocalStorage](#uselocalstorage) - Persist state to localStorage
- [useMediaQuery](#usemediaquery) - Responsive design queries
- [useErrorHandler](#useerrorhandler) - Error handling

---

## useAsync

**The most powerful hook for handling async operations.** Simplifies async state management with built-in loading, error, and data states, plus optional toast notifications.

### Features

- ✅ Automatic loading/error/data state management
- ✅ Built-in toast notification support
- ✅ Success/error/settled callbacks
- ✅ Immediate execution on mount
- ✅ Safe state updates (no memory leaks)
- ✅ TypeScript generics for type safety
- ✅ Integrates with existing toast system

### Basic Usage

```tsx
import { useAsync } from "@/hooks";
import { userService } from "@/services/user.service";

function UserProfile({ userId }: { userId: string }) {
  const { execute, data, isLoading, error } = useAsync(
    userService.getById
  );

  useEffect(() => {
    execute(userId);
  }, [userId]);

  if (isLoading) return <Spinner />;
  if (error) return <Error message={error.message} />;
  if (!data) return null;

  return <UserCard user={data} />;
}
```

### With Toast Notifications

```tsx
function UpdateUserForm({ user }: { user: User }) {
  const { execute, isLoading } = useAsync(userService.update, {
    toast: {
      enabled: true,
      successMessage: "Profile updated successfully!",
      errorMessage: "Failed to update profile",
    },
    onSuccess: (updatedUser) => {
      console.log("User updated:", updatedUser);
    },
  });

  const handleSubmit = async (data: Partial<User>) => {
    try {
      await execute(user.id, data);
      // Success! Toast shown automatically
    } catch (error) {
      // Error! Toast shown automatically
    }
  };

  return <form onSubmit={handleSubmit}>...</form>;
}
```

### Immediate Execution

```tsx
function UserList() {
  const { data, isLoading, error } = useAsync(
    userService.getAll,
    {
      immediate: true, // Executes on mount
      immediateParams: [{ page: 1, limit: 10 }],
      toast: {
        enabled: true,
        errorMessage: "Failed to load users",
      },
    }
  );

  if (isLoading) return <Spinner />;
  if (error) return <Error />;

  return <Table data={data} />;
}
```

### With Dependencies (Re-execute on Change)

```tsx
function UserList() {
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const { data, isLoading } = useAsync(
    userService.getAll,
    {
      immediate: true,
      immediateParams: [{ page, search }],
      deps: [page, search], // Re-execute when these change
    }
  );

  return (
    <div>
      <SearchInput value={search} onChange={setSearch} />
      <Table data={data} loading={isLoading} />
      <Pagination page={page} onChange={setPage} />
    </div>
  );
}
```

### Delete with Confirmation

```tsx
function DeleteUserButton({ userId }: { userId: string }) {
  const { execute, isLoading } = useAsync(userService.delete, {
    toast: {
      enabled: true,
      successMessage: "User deleted successfully",
      errorMessage: "Failed to delete user",
    },
    onSuccess: () => {
      router.push("/users");
    },
  });

  const handleDelete = async () => {
    if (confirm("Are you sure?")) {
      await execute(userId);
    }
  };

  return (
    <Button
      variant="error"
      onClick={handleDelete}
      isLoading={isLoading}
    >
      Delete User
    </Button>
  );
}
```

### Error Handling

```tsx
function UserForm() {
  const { execute, error, clearError } = useAsync(userService.create, {
    onError: (error) => {
      // Custom error handling
      if (error.code === "DUPLICATE_EMAIL") {
        // Handle specific error
      }
    },
  });

  const handleSubmit = async (data: CreateUserInput) => {
    clearError(); // Clear previous errors
    try {
      await execute(data);
    } catch (err) {
      // Error already handled by hook
      console.log("Submission failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      {/* Form fields */}
      {error && <FormError message={error.message} />}
    </form>
  );
}
```

### Reset State

```tsx
function DataFetcher() {
  const { execute, data, isLoading, reset } = useAsync(
    apiService.getData
  );

  const handleRefresh = () => {
    reset(); // Clear data, error, and loading states
    execute();
  };

  return (
    <div>
      {data && <DataDisplay data={data} />}
      <Button onClick={handleRefresh} isLoading={isLoading}>
        Refresh
      </Button>
    </div>
  );
}
```

### Multiple Async Operations

```tsx
function UserManagement() {
  const fetchUsers = useAsync(userService.getAll, {
    immediate: true,
  });

  const createUser = useAsync(userService.create, {
    toast: {
      enabled: true,
      successMessage: "User created!",
    },
    onSuccess: () => {
      fetchUsers.execute(); // Refresh list
    },
  });

  const deleteUser = useAsync(userService.delete, {
    toast: {
      enabled: true,
      successMessage: "User deleted!",
    },
    onSuccess: () => {
      fetchUsers.execute(); // Refresh list
    },
  });

  return (
    <div>
      <CreateUserForm onSubmit={createUser.execute} />
      <UserTable
        users={fetchUsers.data}
        loading={fetchUsers.isLoading}
        onDelete={deleteUser.execute}
      />
    </div>
  );
}
```

### API Reference

```typescript
function useAsync<T, P extends any[] = any[]>(
  asyncFunction: (...params: P) => Promise<T>,
  options?: {
    onSuccess?: (data: T) => void;
    onError?: (error: any) => void;
    onSettled?: (data: T | null, error: any | null) => void;
    toast?: {
      enabled?: boolean;
      successMessage?: string;
      errorMessage?: string;
    };
    immediate?: boolean;
    immediateParams?: any[];
    deps?: any[];
  }
): {
  execute: (...params: P) => Promise<T>;
  data: T | null;
  isLoading: boolean;
  error: any;
  clearError: () => void;
  clearData: () => void;
  reset: () => void;
}
```

### Best Practices

1. **Use with services**: Pair with service methods for clean separation
```tsx
const { execute } = useAsync(userService.update); // ✅ Good
const { execute } = useAsync((id, data) => fetch(...)); // ❌ Avoid
```

2. **Clear errors before retry**:
```tsx
const { execute, clearError } = useAsync(apiService.getData);
const handleRetry = () => {
  clearError();
  execute();
};
```

3. **Reset state when needed**:
```tsx
const { reset } = useAsync(apiService.getData);
useEffect(() => {
  return () => reset(); // Cleanup on unmount
}, []);
```

4. **Handle optimistic updates**:
```tsx
const { execute, data, setData } = useAsync(userService.update);
const handleUpdate = async (updates) => {
  const previous = data;
  setData({ ...data, ...updates }); // Optimistic update
  try {
    await execute(updates);
  } catch (error) {
    setData(previous); // Rollback on error
  }
};
```

---

## useSafeState

Prevents state updates on unmounted components, avoiding memory leaks and React warnings.

### Usage

```tsx
import { useSafeState } from "@/hooks";

function MyComponent() {
  const [data, setData] = useSafeState<User | null>(null);

  useEffect(() => {
    fetchUser().then(user => {
      setData(user); // Safe even if component unmounts during fetch
    });
  }, []);

  return <div>{data?.name}</div>;
}
```

### When to Use

- ✅ In components with async operations
- ✅ When data fetching might outlive the component
- ✅ To avoid "Can't perform a React state update on an unmounted component" warnings

### API Reference

```typescript
function useSafeState<T>(
  initialState: T | (() => T)
): [T, (value: T | ((prev: T) => T)) => void]
```

---

## useAuth

Access authentication state and methods. See [Authentication Guide](./AUTH_SYSTEM.md) for complete documentation.

### Quick Reference

```tsx
import { useAuth } from "@/contexts/AuthContext";

const {
  user,              // Current user | null
  isLoading,         // Loading state
  isAuthenticated,   // Is user logged in?
  login,             // Login function
  signup,            // Signup function
  logout,            // Logout function
  refreshUser,       // Refresh user data
  config,            // Auth configuration
} = useAuth();
```

---

## useFormInput

Simplifies form input management with two-way binding.

### Usage

```tsx
import { useFormInput } from "@/hooks";

function LoginForm() {
  const [email, setEmail, emailBind] = useFormInput("");
  const [password, setPassword, passwordBind] = useFormInput("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    console.log({ email, password });
  };

  return (
    <form onSubmit={handleSubmit}>
      <Input {...emailBind} type="email" />
      <Input {...passwordBind} type="password" />
      <Button type="submit">Login</Button>
    </form>
  );
}
```

### With Object State

```tsx
const { formData, errors, setErrors, handleChange } = useFormInput({
  name: "",
  email: "",
  password: "",
});

// Usage
<Input
  name="email"
  value={formData.email}
  onChange={handleChange}
  error={errors.email}
/>
```

---

## useLocalStorage

Persist state to localStorage with automatic JSON serialization.

### Usage

```tsx
import { useLocalStorage } from "@/hooks";

function ThemeToggle() {
  const [theme, setTheme] = useLocalStorage("theme", "light");

  return (
    <button onClick={() => setTheme(theme === "light" ? "dark" : "light")}>
      Toggle Theme: {theme}
    </button>
  );
}
```

### With Objects

```tsx
interface Preferences {
  notifications: boolean;
  language: string;
}

function Settings() {
  const [prefs, setPrefs] = useLocalStorage<Preferences>("preferences", {
    notifications: true,
    language: "en",
  });

  return (
    <div>
      <Checkbox
        checked={prefs.notifications}
        onChange={(checked) =>
          setPrefs({ ...prefs, notifications: checked })
        }
      />
    </div>
  );
}
```

---

## useMediaQuery

Responsive design with CSS media queries.

### Usage

```tsx
import { useMediaQuery } from "@/hooks";

function ResponsiveLayout() {
  const isMobile = useMediaQuery("(max-width: 768px)");
  const isTablet = useMediaQuery("(max-width: 1024px)");
  const isDesktop = useMediaQuery("(min-width: 1024px)");

  if (isMobile) return <MobileLayout />;
  if (isTablet) return <TabletLayout />;
  return <DesktopLayout />;
}
```

### Common Breakpoints

```tsx
function useBreakpoints() {
  return {
    isMobile: useMediaQuery("(max-width: 640px)"),
    isTablet: useMediaQuery("(min-width: 641px) and (max-width: 1024px)"),
    isDesktop: useMediaQuery("(min-width: 1025px)"),
    isLarge: useMediaQuery("(min-width: 1280px)"),
  };
}
```

---

## useErrorHandler

Standardized error handling with context and logging. See [Error Handling Guide](./ERROR_HANDLING.md) for complete documentation.

### Usage

```tsx
import { useErrorHandler } from "@/hooks";

function MyComponent() {
  const { handleError, handleAsyncOperation } = useErrorHandler({
    showToast: true,
    logError: true,
    component: "MyComponent",
  });

  const handleAction = async () => {
    const result = await handleAsyncOperation(() =>
      apiService.performAction()
    );

    if (result) {
      console.log("Success:", result);
    }
  };

  return <button onClick={handleAction}>Action</button>;
}
```

---

## Comparison: useAsync vs React Query

### useAsync

**Best for:**
- Simple async operations
- Direct control over execution
- Lightweight solution
- No additional dependencies

**Example:**
```tsx
const { execute, data, isLoading } = useAsync(userService.getById);
```

### React Query

**Best for:**
- Complex data fetching requirements
- Automatic caching and revalidation
- Background refetching
- Optimistic updates
- Pagination and infinite scroll

**Example:**
```tsx
const { data, isLoading } = useQuery({
  queryKey: ['user', userId],
  queryFn: () => userService.getById(userId),
});
```

### When to Use Each

| Feature | useAsync | React Query |
|---------|----------|-------------|
| Simple CRUD | ✅ Perfect | ⚠️ Overkill |
| Caching | ❌ Manual | ✅ Automatic |
| Refetching | ❌ Manual | ✅ Automatic |
| Mutations | ✅ Good | ✅ Great |
| Bundle Size | ✅ ~2KB | ⚠️ ~40KB |
| Learning Curve | ✅ Easy | ⚠️ Moderate |

---

## Creating Custom Hooks

### Template

```tsx
import { useState, useEffect } from "react";

/**
 * useCustomHook
 * Brief description of what this hook does
 *
 * @example
 * ```tsx
 * const result = useCustomHook(options);
 * ```
 */
export function useCustomHook(options: Options) {
  const [state, setState] = useState(initialValue);

  useEffect(() => {
    // Effect logic
  }, []);

  return {
    // Return API
  };
}
```

### Best Practices

1. **Start with "use"** - All hooks must start with "use"
2. **Document well** - Include JSDoc comments with examples
3. **Type everything** - Use TypeScript for all parameters and returns
4. **Export from index** - Add to `/src/hooks/index.ts`
5. **Write tests** - Test custom hooks thoroughly
6. **Keep focused** - One hook should do one thing well

---

## Related Documentation

- [Authentication System](./AUTH_SYSTEM.md)
- [Error Handling](./ERROR_HANDLING.md)
- [API Architecture](../src/lib/api/README.md)
- [Component Library](./COMPONENTS.md)
