import { apiClient } from "@/lib/api/client";
import {
  PermissionCheckResponseSchema,
  PermissionsResponseSchema,
} from "@/lib/validations/auth";
import type { z } from "zod";

/**
 * Permission Service
 * Handles permission checks against BetterAuth backend
 *
 * Uses axios client configured for cookie-based sessions
 */

export const permissionService = {
  /**
   * Get all user permissions
   * GET /permissions/my-permissions
   *
   * Returns an object with permission keys and boolean values
   * Example: { "create:post": true, "delete:post": false }
   */
  async getMyPermissions(): Promise<Record<string, boolean>> {
    const response = await apiClient.get("/permissions/my-permissions");
    return PermissionsResponseSchema.parse(response.data);
  },

  /**
   * Check a specific permission
   * GET /permissions/check?permission=delete:post
   *
   * Returns { hasPermission: boolean }
   */
  async checkPermission(
    permission: string
  ): Promise<z.infer<typeof PermissionCheckResponseSchema>> {
    const response = await apiClient.get("/permissions/check", {
      params: { permission },
    });
    return PermissionCheckResponseSchema.parse(response.data);
  },
};
