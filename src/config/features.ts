/**
 * Feature flags configuration
 * Control which features are enabled/disabled in your application
 */

export const featureFlags = {
  auth: {
    // Enable/disable authentication features
    enabled: true,
    // OAuth providers
    google: {
      enabled: process.env.NEXT_PUBLIC_ENABLE_GOOGLE_AUTH === "true",
      clientId: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID || "",
    },
  },

  // Add other feature flags here
  analytics: {
    enabled: !!process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID,
  },
} as const;
