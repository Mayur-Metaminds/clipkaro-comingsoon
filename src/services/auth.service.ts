import { apiClient } from "../lib/api/client";
import { env } from "../lib/env";
import {
  LoginSchema,
  SignupSchema,
  AuthResponseSchema,
  GetSessionResponseSchema,
  SuccessResponseSchema,
  ForgotPasswordSchema,
  ResetPasswordSchema,
  ChangePasswordSchema,
  ChangeEmailSchema,
  UpdateUserSchema,
  VerifyEmailSchema,
  SendVerificationEmailSchema,
  type LoginInput,
  type SignupInput,
  type ForgotPasswordInput,
  type ResetPasswordInput,
  type ChangePasswordInput,
  type ChangeEmailInput,
  type UpdateUserInput,
  type VerifyEmailInput,
  type SendVerificationEmailInput,
} from "../lib/validations/auth";
import { LoginTypes, SignupTypes } from "../types/auth/auth";
import type { z } from "zod";

/**
 * Authentication Service
 * Handles all authentication-related API calls to BetterAuth backend
 *
 * Uses axios client configured for cookie-based sessions
 * All requests automatically include credentials for session management
 */

const AUTH_PREFIX = `${env.NEXT_PUBLIC_API_URL}/auth`;

export const authService = {
  /**
   * Sign in with email and password
   * POST /api/v1/auth/sign-in/email
   */
  async signIn(
    credentials: LoginInput
  ): Promise<z.infer<typeof AuthResponseSchema>> {
    const validatedData = LoginSchema.parse(credentials);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/sign-in/email`,
      validatedData
    );
    return AuthResponseSchema.parse(response.data);
  },

  /**
   * Sign up with email and password
   * POST /api/v1/auth/sign-up/email
   */
  async signUp(data: SignupInput): Promise<z.infer<typeof AuthResponseSchema>> {
    const validatedData = SignupSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/sign-up/email`,
      validatedData
    );
    return AuthResponseSchema.parse(response.data);
  },

  /**
   * Sign out
   * POST /api/v1/auth/sign-out
   */
  async signOut(): Promise<z.infer<typeof SuccessResponseSchema>> {
    const response = await apiClient.post(`${AUTH_PREFIX}/sign-out`);
    return SuccessResponseSchema.parse(response.data);
  },

  /**
   * Get current session
   * GET /api/v1/auth/get-session
   * Returns null if not authenticated
   */
  async getSession(): Promise<z.infer<typeof GetSessionResponseSchema>> {
    const response = await apiClient.get(`${AUTH_PREFIX}/get-session`);
    return GetSessionResponseSchema.parse(response.data);
  },

  /**
   * Verify email with token
   * POST /api/v1/auth/verify-email
   */
  async verifyEmail(
    data: VerifyEmailInput
  ): Promise<z.infer<typeof SuccessResponseSchema>> {
    const validatedData = VerifyEmailSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/verify-email`,
      validatedData
    );
    return SuccessResponseSchema.parse(response.data);
  },

  /**
   * Send verification email
   * POST /api/v1/auth/send-verification-email
   */
  async sendVerificationEmail(
    data: SendVerificationEmailInput
  ): Promise<z.infer<typeof SuccessResponseSchema>> {
    const validatedData = SendVerificationEmailSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/send-verification-email`,
      validatedData
    );
    return SuccessResponseSchema.parse(response.data);
  },

  /**
   * Request password reset
   * POST /api/v1/auth/forget-password
   */
  async forgotPassword(
    data: ForgotPasswordInput
  ): Promise<z.infer<typeof SuccessResponseSchema>> {
    const validatedData = ForgotPasswordSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/forget-password`,
      validatedData
    );
    return SuccessResponseSchema.parse(response.data);
  },

  /**
   * Reset password with token
   * POST /api/v1/auth/reset-password
   */
  async resetPassword(
    data: ResetPasswordInput
  ): Promise<z.infer<typeof SuccessResponseSchema>> {
    const validatedData = ResetPasswordSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/reset-password`,
      validatedData
    );
    return SuccessResponseSchema.parse(response.data);
  },

  /**
   * Change password (requires authentication)
   * POST /api/v1/auth/change-password
   */
  async changePassword(
    data: ChangePasswordInput
  ): Promise<z.infer<typeof SuccessResponseSchema>> {
    const validatedData = ChangePasswordSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/change-password`,
      validatedData
    );
    return SuccessResponseSchema.parse(response.data);
  },

  /**
   * Change email (requires authentication)
   * POST /api/v1/auth/change-email
   */
  async changeEmail(
    data: ChangeEmailInput
  ): Promise<z.infer<typeof SuccessResponseSchema>> {
    const validatedData = ChangeEmailSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/change-email`,
      validatedData
    );
    return SuccessResponseSchema.parse(response.data);
  },

  /**
   * Update user profile (requires authentication)
   * POST /api/v1/auth/update-user
   */
  async updateUser(data: UpdateUserInput) {
    const validatedData = UpdateUserSchema.parse(data);
    const response = await apiClient.post(
      `${AUTH_PREFIX}/update-user`,
      validatedData
    );
    return response.data;
  },

  /**
   * Get OAuth sign-in URL
   * Redirect user to this URL to initiate OAuth flow
   */
  getOAuthSignInUrl(
    provider:
      | "google"
      | "github"
      | "discord"
      | "twitter"
      | "facebook"
      | "microsoft",
    redirectTo?: string
  ): string {
    const API_BASE_URL =
      env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";
    const baseUrl = `${API_BASE_URL}${AUTH_PREFIX}/sign-in/${provider}`;
    if (redirectTo) {
      return `${baseUrl}?redirect_to=${encodeURIComponent(redirectTo)}`;
    }
    return baseUrl;
  },

  /**
   * Initiate OAuth sign-in
   * Redirects browser to OAuth provider
   */
  initiateOAuthSignIn(
    provider:
      | "google"
      | "github"
      | "discord"
      | "twitter"
      | "facebook"
      | "microsoft",
    redirectTo?: string
  ) {
    const url = this.getOAuthSignInUrl(provider, redirectTo);
    window.location.href = url;
  },
};

export const loginService = async (data: LoginTypes) => {
  const response = await apiClient.post("/auth/sign-in", data);

  return response.data ?? null;
};

export const signupService = async (data: SignupTypes) => {
  const response = await apiClient.post("/auth/sign-up", data);

  return response.data ?? null;
};
