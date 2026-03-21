import { AxiosError } from "axios";
import { ZodSchema, z } from "zod";
import { apiClient } from "./client";

/**
 * API Error class for better error handling
 */
export class ApiError extends Error {
  constructor(
    message: string,
    public statusCode?: number,
    public data?: unknown
  ) {
    super(message);
    this.name = "ApiError";
  }
}

/**
 * Generic API request handler with Zod validation
 * @param method - HTTP method
 * @param url - API endpoint
 * @param schema - Zod schema for response validation
 * @param data - Request payload (for POST, PUT, PATCH)
 * @param config - Additional axios config
 */
async function request<T>(
  method: "get" | "post" | "put" | "patch" | "delete",
  url: string,
  schema: ZodSchema<T>,
  data?: unknown,
  config?: Record<string, unknown>
): Promise<T> {
  try {
    const response = await apiClient.request({
      method,
      url,
      data,
      ...config,
    });

    // Validate response with Zod schema
    const validatedData = schema.parse(response.data);
    return validatedData;
  } catch (error) {
    if (error instanceof z.ZodError) {
      // Validation error
      throw new ApiError(
        `Response validation failed: ${error.errors.map((e) => e.message).join(", ")}`,
        undefined,
        error.errors
      );
    }

    if (error instanceof AxiosError) {
      // Axios error
      const message = error.response?.data?.message || error.message;
      const statusCode = error.response?.status;
      throw new ApiError(message, statusCode, error.response?.data);
    }

    // Unknown error
    throw error;
  }
}

/**
 * API Service object with CRUD methods
 */
export const apiService = {
  /**
   * GET request
   */
  get: <T>(
    url: string,
    schema: ZodSchema<T>,
    config?: Record<string, unknown>
  ) => request("get", url, schema, undefined, config),

  /**
   * POST request
   */
  post: <T>(
    url: string,
    schema: ZodSchema<T>,
    data?: unknown,
    config?: Record<string, unknown>
  ) => request("post", url, schema, data, config),

  /**
   * PUT request
   */
  put: <T>(
    url: string,
    schema: ZodSchema<T>,
    data?: unknown,
    config?: Record<string, unknown>
  ) => request("put", url, schema, data, config),

  /**
   * PATCH request
   */
  patch: <T>(
    url: string,
    schema: ZodSchema<T>,
    data?: unknown,
    config?: Record<string, unknown>
  ) => request("patch", url, schema, data, config),

  /**
   * DELETE request
   */
  delete: <T>(
    url: string,
    schema: ZodSchema<T>,
    config?: Record<string, unknown>
  ) => request("delete", url, schema, undefined, config),
};
