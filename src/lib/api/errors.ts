/**
 * API Error Handling Utilities
 * Extracts user-friendly error messages from API responses
 */

import { AxiosError } from "axios";

/**
 * Backend error response format
 */
export interface ApiErrorResponse {
  message?: string;
  error?: string;
  statusCode?: number;
  errors?: Record<string, string[]>; // Field-specific validation errors
}

/**
 * Extract error message from API error
 * Handles different backend error formats
 */
export function getErrorMessage(error: unknown): string {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorResponse | undefined;

    // Priority 1: Field-specific validation errors
    if (errorData?.errors) {
      const fieldErrors = Object.entries(errorData.errors)
        .map(([field, messages]) => `${field}: ${messages.join(", ")}`)
        .join("; ");
      if (fieldErrors) return fieldErrors;
    }

    // Priority 2: Backend message
    if (errorData?.message) return errorData.message;

    // Priority 3: Error field
    if (errorData?.error) return errorData.error;

    // Priority 4: HTTP status message
    if (error.response?.status) {
      switch (error.response.status) {
        case 400:
          return "Invalid request. Please check your input.";
        case 401:
          return "Authentication required. Please log in.";
        case 403:
          return "You don't have permission to perform this action.";
        case 404:
          return "Resource not found.";
        case 422:
          return "Validation failed. Please check your input.";
        case 429:
          return "Too many requests. Please try again later.";
        case 500:
          return "Server error. Please try again later.";
        default:
          return `Request failed with status ${error.response.status}`;
      }
    }

    // Priority 5: Network error
    if (error.code === "ERR_NETWORK") {
      return "Network error. Please check your internet connection.";
    }

    // Priority 6: Timeout
    if (error.code === "ECONNABORTED") {
      return "Request timeout. Please try again.";
    }

    // Priority 7: Axios error message
    return error.message;
  }

  // Fallback for non-Axios errors
  if (error instanceof Error) {
    return error.message;
  }

  return "An unknown error occurred";
}

/**
 * Extract field-specific validation errors
 * Returns a map of field names to error messages
 */
export function getFieldErrors(error: unknown): Record<string, string> | null {
  if (error instanceof AxiosError) {
    const errorData = error.response?.data as ApiErrorResponse | undefined;

    if (errorData?.errors) {
      // Convert array of errors to single string per field
      return Object.entries(errorData.errors).reduce(
        (acc, [field, messages]) => {
          acc[field] = messages.join(", ");
          return acc;
        },
        {} as Record<string, string>
      );
    }
  }

  return null;
}

/**
 * Check if error is a validation error (422)
 */
export function isValidationError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 422;
}

/**
 * Check if error is an authentication error (401)
 */
export function isAuthError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 401;
}

/**
 * Check if error is a permission error (403)
 */
export function isPermissionError(error: unknown): boolean {
  return error instanceof AxiosError && error.response?.status === 403;
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: unknown): boolean {
  return (
    error instanceof AxiosError &&
    (error.code === "ERR_NETWORK" || !error.response)
  );
}

/**
 * Format error for logging
 * Includes request details for debugging
 */
export function formatErrorForLogging(error: unknown): string {
  if (error instanceof AxiosError) {
    const parts = [
      `[API Error]`,
      error.config?.method?.toUpperCase(),
      error.config?.url,
      error.response?.status,
      getErrorMessage(error),
    ];

    return parts.filter(Boolean).join(" ");
  }

  return getErrorMessage(error);
}
