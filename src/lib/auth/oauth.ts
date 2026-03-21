import { authService } from "@/services/auth.service";
import { env } from "@/lib/env";

/**
 * OAuth Configuration and Handlers for BetterAuth Backend
 *
 * NOTE: With BetterAuth, OAuth is handled entirely on the backend.
 * The frontend simply redirects to the backend OAuth endpoints.
 * OAuth providers are configured on the backend.
 *
 * Supported providers (configured on backend):
 * - google, github, discord, twitter, facebook, microsoft
 */

export type OAuthProvider =
  | "google"
  | "github"
  | "discord"
  | "twitter"
  | "facebook"
  | "microsoft";

/**
 * Initiate OAuth login flow
 * Redirects to BetterAuth backend OAuth endpoint
 *
 * @param provider - OAuth provider to use
 * @param redirectTo - Optional URL to redirect to after successful OAuth
 *
 * @example
 * ```tsx
 * // Basic usage
 * initiateOAuthLogin("google");
 *
 * // With custom redirect
 * initiateOAuthLogin("google", "/dashboard");
 * ```
 */
export function initiateOAuthLogin(
  provider: OAuthProvider,
  redirectTo?: string
): void {
  const redirect = redirectTo || window.location.origin;
  authService.initiateOAuthSignIn(provider, redirect);
}

/**
 * Get all enabled OAuth providers based on environment configuration
 * Only returns providers that have been explicitly enabled via environment variables
 */
export function getEnabledOAuthProviders(): OAuthProvider[] {
  const providers: OAuthProvider[] = [];

  if (env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH) {
    providers.push("google");
  }

  if (env.NEXT_PUBLIC_ENABLE_GITHUB_AUTH) {
    providers.push("github");
  }

  // Add more providers here as needed:
  // if (env.NEXT_PUBLIC_ENABLE_DISCORD_AUTH) providers.push("discord");
  // if (env.NEXT_PUBLIC_ENABLE_TWITTER_AUTH) providers.push("twitter");

  return providers;
}

/**
 * Check if an OAuth provider is available
 * Note: This is a client-side check. The backend ultimately controls availability.
 */
export function isOAuthProviderEnabled(provider: OAuthProvider): boolean {
  const enabledProviders = getEnabledOAuthProviders();
  return enabledProviders.includes(provider);
}
