/**
 * Common types used across the application
 */

export type Nullable<T> = T | null;
export type Optional<T> = T | undefined;
export type Maybe<T> = T | null | undefined;

// Re-export types - avoiding conflicts
export * from "../lib/validations/auth";
export * from "./auth";
export * from "./error";
export * from "./permissions";

// Selective exports from API types to avoid conflicts
export type { PaginatedResponseSchema, ApiResponseSchema } from "./api";
