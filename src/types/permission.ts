import { z } from "zod";

// Enums from backend
export enum Action {
  Create = "create",
  Read = "read",
  Update = "update",
  Delete = "delete",
  Manage = "manage",
  Execute = "execute",
}

export enum Subject {
  User = "User",
  File = "File",
  Session = "Session",
  All = "All",
}

export enum PermissionPreset {
  ContentModerator = "content-moderator",
  UserSupport = "user-support",
  FileManager = "file-manager",
}

// Permission entity schema
export const PermissionSchema = z.object({
  id: z.string(),
  userId: z.string(),
  action: z.nativeEnum(Action),
  subject: z.nativeEnum(Subject),
  fields: z.array(z.string()).optional().nullable(),
  conditions: z.record(z.unknown()).optional().nullable(),
  inverted: z.boolean().optional().nullable(),
  reason: z.string().optional().nullable(),
  grantedBy: z.string().optional().nullable(),
  createdAt: z.string(),
  updatedAt: z.string(),
});

export type Permission = z.infer<typeof PermissionSchema>;

// Grant permission DTO
export const GrantPermissionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  action: z.nativeEnum(Action),
  subject: z.nativeEnum(Subject),
  fields: z.array(z.string()).optional(),
  conditions: z.record(z.unknown()).optional(),
  reason: z.string().optional(),
});

export type GrantPermissionDto = z.infer<typeof GrantPermissionSchema>;

// Deny permission DTO
export const DenyPermissionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  action: z.nativeEnum(Action),
  subject: z.nativeEnum(Subject),
  fields: z.array(z.string()).optional(),
  conditions: z.record(z.unknown()).optional(),
  reason: z.string().optional(),
});

export type DenyPermissionDto = z.infer<typeof DenyPermissionSchema>;

// Revoke permission DTO
export const RevokePermissionSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  action: z.nativeEnum(Action),
  subject: z.nativeEnum(Subject),
});

export type RevokePermissionDto = z.infer<typeof RevokePermissionSchema>;

// Grant preset DTO
export const GrantPresetSchema = z.object({
  userId: z.string().min(1, "User ID is required"),
  preset: z.nativeEnum(PermissionPreset),
  reason: z.string().optional(),
});

export type GrantPresetDto = z.infer<typeof GrantPresetSchema>;

// Preset descriptions for UI
export const PRESET_DESCRIPTIONS: Record<
  PermissionPreset,
  { label: string; description: string; permissions: string[] }
> = {
  [PermissionPreset.ContentModerator]: {
    label: "Content Moderator",
    description: "Can delete files and verify emails",
    permissions: ["Delete files", "Verify emails"],
  },
  [PermissionPreset.UserSupport]: {
    label: "User Support",
    description: "Can update user email/name and read sessions",
    permissions: ["Update user email/name", "Read sessions"],
  },
  [PermissionPreset.FileManager]: {
    label: "File Manager",
    description: "Can manage all files",
    permissions: ["Manage all files"],
  },
};
