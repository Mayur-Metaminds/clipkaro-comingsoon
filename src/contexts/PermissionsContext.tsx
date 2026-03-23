"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  useCallback,
} from "react";
import { permissionService } from "../services/permission.service";
import type { PermissionString } from "../types/permissions";

/**
 * PermissionsContext
 * Caches user permissions to avoid repeated API calls
 *
 * Features:
 * - Fetches permissions once on mount
 * - Provides cached permission checks
 * - Manual refresh capability
 * - Automatic refresh when user logs in/out
 *
 * NOTE: Frontend permission checks are for UX only.
 * Backend ALWAYS validates permissions on API calls.
 */

interface PermissionsContextType {
  permissions: Record<string, boolean>;
  isLoading: boolean;
  hasPermission: (permission: PermissionString) => boolean;
  refreshPermissions: () => Promise<void>;
}

const PermissionsContext = createContext<PermissionsContextType | undefined>(
  undefined
);

interface PermissionsProviderProps {
  children: React.ReactNode;
  /**
   * User ID - used to trigger permission refresh when user changes
   */
  userId?: string | null;
}

export function PermissionsProvider({
  children,
  userId,
}: PermissionsProviderProps) {
  const [permissions, setPermissions] = useState<Record<string, boolean>>({});
  const [isLoading, setIsLoading] = useState(true);

  // Fetch permissions
  const fetchPermissions = useCallback(async () => {
    // Don't fetch if no user is logged in
    if (!userId) {
      setPermissions({});
      setIsLoading(false);
      return;
    }

    try {
      setIsLoading(true);
      const result = await permissionService.getMyPermissions();
      setPermissions(result);
    } catch (error) {
      console.error("Failed to fetch permissions:", error);
      setPermissions({});
    } finally {
      setIsLoading(false);
    }
  }, [userId]);

  // Fetch on mount and when userId changes
  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  // Check if user has a specific permission
  const hasPermission = (permission: string): boolean => {
    return permissions[permission] || false;
  };

  const value: PermissionsContextType = {
    permissions,
    isLoading,
    hasPermission,
    refreshPermissions: fetchPermissions,
  };

  return (
    <PermissionsContext.Provider value={value}>
      {children}
    </PermissionsContext.Provider>
  );
}

/**
 * Hook to access permissions context
 * Must be used within PermissionsProvider
 *
 * @throws Error if used outside PermissionsProvider
 *
 * @example
 * ```tsx
 * function DeleteButton() {
 *   const { hasPermission, isLoading } = usePermissions();
 *
 *   if (isLoading) return <Spinner />;
 *   if (!hasPermission("delete:post")) return null;
 *
 *   return <button>Delete</button>;
 * }
 * ```
 */
export function usePermissions() {
  const context = useContext(PermissionsContext);

  if (context === undefined) {
    throw new Error("usePermissions must be used within a PermissionsProvider");
  }

  return context;
}
