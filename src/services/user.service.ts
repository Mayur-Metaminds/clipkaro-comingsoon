import { z } from "zod";
import { BaseService, QueryParams } from "@/lib/api/BaseService";
import { UserSchema, type User } from "@/types/api";
import { apiService } from "@/lib/api";

/**
 * User Service
 * Extends BaseService to provide user-specific operations
 * with automatic CRUD, pagination, and filtering
 */

/**
 * Extended query parameters for user filtering
 */
export interface UserQueryParams extends QueryParams {
  role?: string;
  status?: "active" | "inactive" | "suspended";
  createdAfter?: string;
  createdBefore?: string;
}

class UserService extends BaseService<User> {
  protected baseUrl = "/users";
  protected schema = UserSchema;

  /**
   * Get current user profile
   */
  async getProfile() {
    return apiService.get("/users/profile", this.getSingleSchema());
  }

  /**
   * Admin: Get all users from admin endpoint
   */
  async getUsers(params?: UserQueryParams) {
    const queryString = this.buildQueryString(params);
    const url = `/admin/users${queryString}`;

    // Admin endpoint has different response structure
    const AdminUsersResponseSchema = z.object({
      data: z.object({
        users: z.array(this.schema),
        count: z.number(),
        message: z.string().optional(),
      }),
      statusCode: z.number(),
    });

    const response = await apiService.get(url, AdminUsersResponseSchema);

    // Transform to match standard list response format
    return {
      data: response.data.users,
      meta: {
        page: 1,
        pageSize: params?.limit || response.data.count,
        total: response.data.count,
        totalPages: 1,
      },
    };
  }

  /**
   * Update current user profile
   */
  async updateProfile(data: Partial<User>) {
    return apiService.patch("/users/profile", this.getSingleSchema(), data);
  }

  /**
   * Upload user avatar
   */
  async uploadAvatar(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);

    const AvatarResponseSchema = z.object({
      success: z.boolean(),
      data: z.object({
        avatarUrl: z.string().url(),
      }),
    });

    return apiService.post("/users/avatar", AvatarResponseSchema, formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  }
}

// Export singleton instance
export const userService = new UserService();
