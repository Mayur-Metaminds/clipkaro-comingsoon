"use client";

import { usePermissions } from "@/contexts/PermissionsContext";
import type { PermissionString } from "@/types/permissions";

/**
 * Hook to check user permissions (cached)
 *
 * Uses PermissionsContext for cached permission checks.
 * No API calls - reads from cache fetched once at app initialization.
 *
 * @param permission - Permission to check (use Permission enum for type safety)
 * @returns Object with hasPermission boolean and loading state
 *
 * @example
 * ```tsx
 * import { Permission } from "@/types/permissions";
 *
 * function DeleteButton({ postId }: { postId: string }) {
 *   const { hasPermission, isLoading } = usePermission(Permission.DELETE_POST);
 *
 *   if (isLoading) return <Spinner />;
 *   if (!hasPermission) return null;
 *
 *   return <button onClick={() => deletePost(postId)}>Delete</button>;
 * }
 * ```
 */
export function usePermission(permission: PermissionString) {
  const { hasPermission: checkPermission, isLoading } = usePermissions();

  return {
    hasPermission: checkPermission(permission),
    isLoading,
  };
}

/**
 * Legacy hook - use usePermissions from PermissionsContext instead
 * @deprecated Use `import { usePermissions } from "@/contexts/PermissionsContext"` instead
 */
export { usePermissions } from "@/contexts/PermissionsContext";
