import { z } from "zod";

/**
 * Authentication schemas and types
 * Matches BetterAuth backend API
 */

// User role enum
export const UserRoleSchema = z.enum(["ADMIN", "MODERATOR", "EDITOR", "USER"]);

// User schema matching BetterAuth backend
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
  name: z.string(),
  emailVerified: z.boolean(),
  image: z.string().nullable().optional(), // Can be null or undefined
  createdAt: z.string(),
  updatedAt: z.string(),
  role: UserRoleSchema.optional().default("USER"), // Optional with default
});

// Session schema
export const SessionSchema = z.object({
  token: z.string(),
  expiresAt: z.string(),
});

// Login input schema
export const LoginSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export type LoginInput = z.infer<typeof LoginSchema>;

// Signup input schema
export const SignupSchema = z.object({
  email: z.string().email("Invalid email address"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  name: z.string().min(2, "Name must be at least 2 characters"),
});

export type SignupInput = z.infer<typeof SignupSchema>;

// Auth response schema (for sign-in/sign-up)
// Backend returns: { token: string | null, user: User }
export const AuthResponseSchema = z.object({
  token: z.string().nullable(),
  user: UserSchema,
});

export type AuthResponse = z.infer<typeof AuthResponseSchema>;

// Get session response schema
// Backend returns: { session: { token, expiresAt, ... }, user: User } or null
export const GetSessionResponseSchema = z
  .object({
    session: z.object({
      token: z.string(),
      expiresAt: z.string(),
      userId: z.string(),
      ipAddress: z.string().optional(),
      userAgent: z.string().optional(),
    }),
    user: UserSchema,
  })
  .nullable();

export type GetSessionResponse = z.infer<typeof GetSessionResponseSchema>;

// Forgot password input schema
export const ForgotPasswordSchema = z.object({
  email: z.string().email("Invalid email address"),
  redirectTo: z.string().url().optional(),
});

export type ForgotPasswordInput = z.infer<typeof ForgotPasswordSchema>;

// Reset password input schema
export const ResetPasswordSchema = z.object({
  token: z.string(),
  password: z.string().min(8, "Password must be at least 8 characters"),
});

export type ResetPasswordInput = z.infer<typeof ResetPasswordSchema>;

// Change password input schema
export const ChangePasswordSchema = z.object({
  currentPassword: z.string(),
  newPassword: z.string().min(8, "Password must be at least 8 characters"),
  revokeOtherSessions: z.boolean().optional(),
});

export type ChangePasswordInput = z.infer<typeof ChangePasswordSchema>;

// Change email input schema
export const ChangeEmailSchema = z.object({
  newEmail: z.string().email("Invalid email address"),
});

export type ChangeEmailInput = z.infer<typeof ChangeEmailSchema>;

// Update user input schema
export const UpdateUserSchema = z.object({
  name: z.string().min(2).optional(),
  image: z.string().url().optional(),
});

export type UpdateUserInput = z.infer<typeof UpdateUserSchema>;

// Verify email input schema
export const VerifyEmailSchema = z.object({
  token: z.string(),
});

export type VerifyEmailInput = z.infer<typeof VerifyEmailSchema>;

// Send verification email input schema
export const SendVerificationEmailSchema = z.object({
  email: z.string().email("Invalid email address"),
});

export type SendVerificationEmailInput = z.infer<
  typeof SendVerificationEmailSchema
>;

// Generic success response schema
export const SuccessResponseSchema = z.object({
  success: z.boolean(),
});

// Permission check response schema
export const PermissionCheckResponseSchema = z.object({
  hasPermission: z.boolean(),
});

// Permissions response schema
export const PermissionsResponseSchema = z.record(z.string(), z.boolean());
