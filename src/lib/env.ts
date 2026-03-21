/**
 * Environment variable configuration with runtime validation
 * This ensures type safety and validates required environment variables
 */

function getEnvVar(key: string, required: boolean = false): string {
  const value = process.env[key];

  if (required && !value) {
    throw new Error(`Missing required environment variable: ${key}`);
  }

  return value || "";
}

export const env = {
  // Google Analytics
  NEXT_PUBLIC_GA_MEASUREMENT_ID: getEnvVar("NEXT_PUBLIC_GA_MEASUREMENT_ID"),

  // API Configuration
  NEXT_PUBLIC_API_URL: getEnvVar("NEXT_PUBLIC_API_URL"),

  // OAuth Configuration
  NEXT_PUBLIC_ENABLE_GOOGLE_AUTH:
    getEnvVar("NEXT_PUBLIC_ENABLE_GOOGLE_AUTH") === "true",
  NEXT_PUBLIC_ENABLE_GITHUB_AUTH:
    getEnvVar("NEXT_PUBLIC_ENABLE_GITHUB_AUTH") === "true",

  // Node environment
  NODE_ENV: process.env.NODE_ENV || "development",

  // Helper flags
  isDevelopment: process.env.NODE_ENV === "development",
  isProduction: process.env.NODE_ENV === "production",
  isTest: process.env.NODE_ENV === "test",
} as const;
