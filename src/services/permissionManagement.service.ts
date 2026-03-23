import { z } from "zod";
import { apiService } from "../lib/api/service";
import {
  Permission,
  PermissionSchema,
  GrantPermissionDto,
  DenyPermissionDto,
  RevokePermissionDto,
  GrantPresetDto,
} from "../types/permission";

/**
 * Permission Management Service
 * Handles admin operations for managing user permissions
 * Requires ADMIN role
 */
class PermissionManagementService {
  private readonly baseUrl = "/permissions";

  /**
   * Response schema for single permission operations
   */
  private getSingleSchema() {
    return z.object({
      success: z.boolean(),
      data: PermissionSchema,
    });
  }

  /**
   * Response schema for list of permissions
   */
  private getListSchema() {
    return z.object({
      success: z.boolean().optional(),
      data: z.array(PermissionSchema),
    });
  }

  /**
   * Response schema for message responses
   */
  private getMessageSchema() {
    return z.object({
      success: z.boolean(),
      message: z.string(),
    });
  }

  /**
   * Grant a permission to a user
   */
  async grantPermission(data: GrantPermissionDto): Promise<Permission> {
    const response = await apiService.post(
      `${this.baseUrl}/grant`,
      this.getSingleSchema(),
      data
    );
    return response.data;
  }

  /**
   * Deny a permission to a user
   */
  async denyPermission(data: DenyPermissionDto): Promise<Permission> {
    const response = await apiService.post(
      `${this.baseUrl}/deny`,
      this.getSingleSchema(),
      data
    );
    return response.data;
  }

  /**
   * Revoke a permission from a user
   */
  async revokePermission(
    data: RevokePermissionDto
  ): Promise<{ success: boolean; message: string }> {
    return apiService.delete(
      `${this.baseUrl}/revoke`,
      this.getMessageSchema(),
      {
        data,
      }
    );
  }

  /**
   * Get all permissions for a specific user
   */
  async getUserPermissions(userId: string): Promise<Permission[]> {
    const response = await apiService.get(
      `${this.baseUrl}/user/${userId}`,
      this.getListSchema()
    );
    return response.data || [];
  }

  /**
   * Revoke all permissions from a user
   */
  async revokeAllUserPermissions(
    userId: string
  ): Promise<{ success: boolean; message: string }> {
    return apiService.delete(
      `${this.baseUrl}/user/${userId}/all`,
      this.getMessageSchema()
    );
  }

  /**
   * Grant a preset of permissions to a user
   */
  async grantPreset(
    data: GrantPresetDto
  ): Promise<{ success: boolean; message: string; data: Permission[] }> {
    return apiService.post(
      `${this.baseUrl}/preset`,
      z.object({
        success: z.boolean(),
        message: z.string(),
        data: z.array(PermissionSchema),
      }),
      data
    );
  }
}

export const permissionManagementService = new PermissionManagementService();
