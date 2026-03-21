/**
 * Permission Types
 * Centralized permission definitions for type safety
 *
 * IMPORTANT: Update this file to match your actual backend permissions.
 * The permissions below are examples to demonstrate the permission system.
 * Replace them with your application's actual permission requirements.
 */

/**
 * Available permissions in the system
 *
 * Format: action:resource or action:resource:scope
 * Examples:
 * - "create:post" - Can create posts
 * - "delete:post" - Can delete posts
 * - "delete:own:post" - Can delete own posts only
 * - "manage:all" - Full system access
 */
export const Permission = {
  // Post permissions
  CREATE_POST: "create:post",
  READ_POST: "read:post",
  UPDATE_POST: "update:post",
  UPDATE_OWN_POST: "update:own:post",
  DELETE_POST: "delete:post",
  DELETE_OWN_POST: "delete:own:post",
  PUBLISH_POST: "publish:post",

  // User permissions
  CREATE_USER: "create:user",
  READ_USER: "read:user",
  UPDATE_USER: "update:user",
  DELETE_USER: "delete:user",
  MANAGE_USERS: "manage:users",

  // Comment permissions
  CREATE_COMMENT: "create:comment",
  READ_COMMENT: "read:comment",
  UPDATE_COMMENT: "update:comment",
  UPDATE_OWN_COMMENT: "update:own:comment",
  DELETE_COMMENT: "delete:comment",
  DELETE_OWN_COMMENT: "delete:own:comment",
  MODERATE_COMMENTS: "moderate:comments",

  // Admin permissions
  ACCESS_ADMIN_PANEL: "access:admin:panel",
  VIEW_ANALYTICS: "view:analytics",
  MANAGE_SETTINGS: "manage:settings",
  MANAGE_PERMISSIONS: "manage:permissions",

  // System permissions
  MANAGE_ALL: "manage:all",
} as const;

/**
 * Type for permission values
 * Provides autocomplete and type checking
 */
export type PermissionValue = (typeof Permission)[keyof typeof Permission];

/**
 * Type for permission strings (more flexible, allows custom permissions)
 * Use this when you need to support dynamic permissions from backend
 */
export type PermissionString = PermissionValue | (string & {});

/**
 * Permission groups for easier management
 */
export const PermissionGroups = {
  POST: [
    Permission.CREATE_POST,
    Permission.READ_POST,
    Permission.UPDATE_POST,
    Permission.UPDATE_OWN_POST,
    Permission.DELETE_POST,
    Permission.DELETE_OWN_POST,
    Permission.PUBLISH_POST,
  ] as const,
  USER: [
    Permission.CREATE_USER,
    Permission.READ_USER,
    Permission.UPDATE_USER,
    Permission.DELETE_USER,
    Permission.MANAGE_USERS,
  ] as const,
  COMMENT: [
    Permission.CREATE_COMMENT,
    Permission.READ_COMMENT,
    Permission.UPDATE_COMMENT,
    Permission.UPDATE_OWN_COMMENT,
    Permission.DELETE_COMMENT,
    Permission.DELETE_OWN_COMMENT,
    Permission.MODERATE_COMMENTS,
  ] as const,
  ADMIN: [
    Permission.ACCESS_ADMIN_PANEL,
    Permission.VIEW_ANALYTICS,
    Permission.MANAGE_SETTINGS,
    Permission.MANAGE_PERMISSIONS,
  ] as const,
};

/**
 * Helper to check if a permission belongs to a group
 */
export function isPermissionInGroup(
  permission: string,
  group: keyof typeof PermissionGroups
): boolean {
  return (PermissionGroups[group] as readonly string[]).includes(permission);
}

/**
 * Get all permissions as an array
 */
export function getAllPermissions(): PermissionValue[] {
  return Object.values(Permission);
}

/**
 * Permission descriptions for UI display
 */
export const PermissionDescriptions: Record<PermissionValue, string> = {
  [Permission.CREATE_POST]: "Create new posts",
  [Permission.READ_POST]: "View posts",
  [Permission.UPDATE_POST]: "Edit any post",
  [Permission.UPDATE_OWN_POST]: "Edit own posts",
  [Permission.DELETE_POST]: "Delete any post",
  [Permission.DELETE_OWN_POST]: "Delete own posts",
  [Permission.PUBLISH_POST]: "Publish posts",

  [Permission.CREATE_USER]: "Create new users",
  [Permission.READ_USER]: "View user profiles",
  [Permission.UPDATE_USER]: "Edit user profiles",
  [Permission.DELETE_USER]: "Delete users",
  [Permission.MANAGE_USERS]: "Full user management",

  [Permission.CREATE_COMMENT]: "Create comments",
  [Permission.READ_COMMENT]: "View comments",
  [Permission.UPDATE_COMMENT]: "Edit any comment",
  [Permission.UPDATE_OWN_COMMENT]: "Edit own comments",
  [Permission.DELETE_COMMENT]: "Delete any comment",
  [Permission.DELETE_OWN_COMMENT]: "Delete own comments",
  [Permission.MODERATE_COMMENTS]: "Moderate all comments",

  [Permission.ACCESS_ADMIN_PANEL]: "Access admin panel",
  [Permission.VIEW_ANALYTICS]: "View analytics",
  [Permission.MANAGE_SETTINGS]: "Manage system settings",
  [Permission.MANAGE_PERMISSIONS]: "Manage user permissions",

  [Permission.MANAGE_ALL]: "Full system access",
};
