import axios, { AxiosError, AxiosResponse } from "axios";
import { env } from "@/lib/env";

/**
 * Base API client configuration with Axios
 *
 * IMPORTANT: This client is configured for cookie-based sessions with BetterAuth
 * - No Authorization headers needed (sessions handled via httpOnly cookies)
 * - All requests include credentials: 'include' for cookie support
 * - No token refresh logic (BetterAuth handles this server-side)
 */
const baseURL = env.NEXT_PUBLIC_API_URL || "http://localhost:3001/api/v1";

// Debug log to verify correct URL is loaded
if (env.isDevelopment) {
  console.log("[API Client] Configured baseURL:", baseURL);
}

export const apiClient = axios.create({
  baseURL,
  timeout: 10000,
  withCredentials: true, // CRITICAL for cookie-based sessions
  headers: {
    "Content-Type": "application/json",
  },
});

/**
 * Request interceptor
 * Log requests in development, add custom headers if needed
 */
apiClient.interceptors.request.use(
  (config) => {
    // Log requests in development
    if (env.isDevelopment) {
      console.log(
        `[API Request] ${config.method?.toUpperCase()} ${config.url}`
      );
    }

    return config;
  },
  (error) => {
    if (env.isDevelopment) {
      console.error("[API Request Error]", error);
    }
    return Promise.reject(error);
  }
);

/**
 * Response interceptor
 * Handle global errors
 */
apiClient.interceptors.response.use(
  (response: AxiosResponse) => {
    // Log responses in development
    if (env.isDevelopment) {
      console.log(`[API Response] ${response.config.url}`, response.data);
    }
    return response;
  },
  async (error: AxiosError<{ message?: string; error?: string }>) => {
    // Handle 401 Unauthorized - redirect to login
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        // Don't redirect if already on login page
        if (!window.location.pathname.includes("/login")) {
          window.location.href = "/login";
        }
      }
    }

    // Handle other error cases
    if (error.response) {
      const status = error.response.status;
      const errorData = error.response.data;

      // Extract error message from backend response
      const backendMessage =
        errorData?.message || errorData?.error || error.message;

      switch (status) {
        case 400:
          if (env.isDevelopment) {
            console.error("[API Error] Bad Request", backendMessage);
          }
          // Attach user-friendly message to error
          error.message = backendMessage || "Invalid request";
          break;

        case 403:
          if (env.isDevelopment) {
            console.error("[API Error] Forbidden - Check permissions");
          }
          error.message = backendMessage || "Access forbidden";
          break;

        case 404:
          if (env.isDevelopment) {
            console.error("[API Error] Not found");
          }
          error.message = backendMessage || "Resource not found";
          break;

        case 422:
          // Validation error - extract backend message
          if (env.isDevelopment) {
            console.error("[API Error] Validation failed", backendMessage);
          }
          error.message = backendMessage || "Validation failed";
          break;

        case 500:
          if (env.isDevelopment) {
            console.error("[API Error] Server error");
          }
          error.message =
            backendMessage || "Server error. Please try again later.";
          break;

        default:
          if (env.isDevelopment) {
            console.error(`[API Error] ${status}`, errorData);
          }
          error.message =
            backendMessage || `Request failed with status ${status}`;
      }
    } else if (error.request) {
      if (env.isDevelopment) {
        console.error("[API Error] No response received", error?.request);
      }
      error.message = "No response from server. Please check your connection.";
    } else {
      if (env.isDevelopment) {
        console.error("[API Error]", error.message);
      }
    }

    return Promise.reject(error);
  }
);
