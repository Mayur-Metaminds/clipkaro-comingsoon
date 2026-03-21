/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useCallback } from "react";
import { useToastContext } from "@/components/providers/ToastProvider";

import { AxiosError } from "axios";
import { errorService } from "@/lib/errorService";
import {
  ErrorCode,
  ErrorContext,
  ErrorSeverity,
  ErrorWithContext,
} from "@/types/error";

export interface UseErrorHandlerOptions {
  showToast?: boolean;
  logError?: boolean;
  severity?: ErrorSeverity;
  component?: string;
}

export function useErrorHandler(options: UseErrorHandlerOptions = {}) {
  const toast = useToastContext();
  const {
    showToast = true,
    logError = true,
    severity = "medium",
    component,
  } = options;

  const handleError = useCallback(
    (error: Error | AxiosError | ErrorWithContext, context?: ErrorContext) => {
      let processedError: ErrorWithContext;

      // Convert different error types to our standardized format
      if (error instanceof Error && "response" in error) {
        // Axios error
        const axiosError = error as AxiosError;
        processedError = convertAxiosError(axiosError, context);
      } else if ((error as ErrorWithContext).code) {
        // Already our custom error format
        processedError = error as ErrorWithContext;
        if (context) {
          processedError.context = { ...processedError.context, ...context };
        }
      } else {
        // Generic Error
        processedError = errorService.createError(
          ErrorCode.UNKNOWN_ERROR,
          error.message || "An unexpected error occurred",
          context,
          error
        );
      }

      // Add component context if provided
      if (component) {
        processedError.context = {
          ...processedError.context,
          component,
        };
      }

      // Log the error
      if (logError) {
        errorService.logError(processedError, severity);
      }

      // Show toast notification
      if (showToast) {
        const displayMessage = errorService.getDisplayMessage(processedError);
        const title = getErrorTitle(processedError.code);
        toast.error(title, displayMessage);
      }

      return processedError;
    },
    [toast, showToast, logError, severity, component]
  );

  const handleApiError = useCallback(
    (error: AxiosError, context?: ErrorContext) => {
      return handleError(error, context);
    },
    [handleError]
  );

  const handleAsyncOperation = useCallback(
    async <T>(
      operation: () => Promise<T>,
      context?: ErrorContext
    ): Promise<T | null> => {
      try {
        return await operation();
      } catch (error) {
        handleError(error as Error, context);
        return null;
      }
    },
    [handleError]
  );

  const withErrorHandling = useCallback(
    <T extends any[], R>(
      fn: (...args: T) => Promise<R>,
      context?: ErrorContext
    ) => {
      return async (...args: T): Promise<R | null> => {
        return handleAsyncOperation(() => fn(...args), context);
      };
    },
    [handleAsyncOperation]
  );

  return {
    handleError,
    handleApiError,
    handleAsyncOperation,
    withErrorHandling,
  };
}

function convertAxiosError(
  error: AxiosError,
  context?: ErrorContext
): ErrorWithContext {
  const response = error.response;
  const request = error.request;

  // No response received (network error, timeout, etc.)
  if (!response && request) {
    if (error.code === "ECONNABORTED" || error.message.includes("timeout")) {
      return errorService.createError(
        ErrorCode.TIMEOUT_ERROR,
        "Request timed out",
        context,
        error,
        true // retryable
      );
    }

    return errorService.createError(
      ErrorCode.NETWORK_ERROR,
      "Network connection failed",
      context,
      error,
      true // retryable
    );
  }

  // Response received with error status
  if (response) {
    const responseData = response.data;

    // Check if response follows our API error format
    if (
      responseData &&
      typeof responseData === "object" &&
      "error" in responseData
    ) {
      const apiError = responseData.error as any;
      return errorService.createError(
        apiError?.code || ErrorCode.UNKNOWN_ERROR,
        apiError?.message || "An error occurred",
        {
          ...context,
          additionalData: {
            status: response.status,
            statusText: response.statusText,
            requestId: apiError?.requestId,
            validationErrors: apiError?.validationErrors,
          },
        },
        error,
        isRetryableStatus(response.status)
      );
    }

    // Handle standard HTTP errors
    const errorCode = mapStatusToErrorCode(response.status);
    const message = getStatusMessage(response.status, responseData);

    return errorService.createError(
      errorCode,
      message,
      {
        ...context,
        additionalData: {
          status: response.status,
          statusText: response.statusText,
          data: responseData,
        },
      },
      error,
      isRetryableStatus(response.status)
    );
  }

  // Request was made but no response was received
  return errorService.createError(
    ErrorCode.NETWORK_ERROR,
    "No response received from server",
    context,
    error,
    true
  );
}

function mapStatusToErrorCode(status: number): ErrorCode {
  switch (status) {
    case 400:
      return ErrorCode.BAD_REQUEST;
    case 401:
      return ErrorCode.UNAUTHORIZED;
    case 403:
      return ErrorCode.FORBIDDEN;
    case 404:
      return ErrorCode.RESOURCE_NOT_FOUND;
    case 409:
      return ErrorCode.RESOURCE_CONFLICT;
    case 422:
      return ErrorCode.VALIDATION_FAILED;
    case 402:
      return ErrorCode.INSUFFICIENT_CREDITS;
    case 500:
      return ErrorCode.INTERNAL_SERVER_ERROR;
    case 502:
    case 503:
      return ErrorCode.SERVICE_UNAVAILABLE;
    case 504:
      return ErrorCode.TIMEOUT_ERROR;
    default:
      return ErrorCode.UNKNOWN_ERROR;
  }
}

function getStatusMessage(status: number, responseData?: any): string {
  const defaultMessages: Record<number, string> = {
    400: "Bad request",
    401: "Authentication required",
    403: "Access forbidden",
    404: "Resource not found",
    409: "Conflict with existing data",
    422: "Validation failed",
    402: "Insufficient credits",
    500: "Internal server error",
    502: "Bad gateway",
    503: "Service unavailable",
    504: "Gateway timeout",
  };

  // Try to extract message from response
  if (responseData && typeof responseData === "object") {
    if (responseData.message) return responseData.message;
    if (responseData.error && responseData.error.message)
      return responseData.error.message;
  }

  return defaultMessages[status] || `HTTP ${status} error`;
}

function isRetryableStatus(status: number): boolean {
  // 5xx errors and specific 4xx errors that might be temporary
  return status >= 500 || status === 408 || status === 429;
}

function getErrorTitle(code?: ErrorCode): string {
  const titles: Partial<Record<ErrorCode, string>> = {
    [ErrorCode.NETWORK_ERROR]: "Connection Error",
    [ErrorCode.TIMEOUT_ERROR]: "Request Timeout",
    [ErrorCode.INVALID_CREDENTIALS]: "Login Failed",
    [ErrorCode.UNAUTHORIZED]: "Authentication Required",
    [ErrorCode.FORBIDDEN]: "Access Denied",
    [ErrorCode.RESOURCE_NOT_FOUND]: "Not Found",
    [ErrorCode.INSUFFICIENT_CREDITS]: "Insufficient Credits",
    [ErrorCode.FILE_TOO_LARGE]: "File Too Large",
    [ErrorCode.INVALID_FILE_TYPE]: "Invalid File Type",
    [ErrorCode.UPLOAD_FAILED]: "Upload Failed",
    [ErrorCode.VALIDATION_FAILED]: "Validation Error",
    [ErrorCode.SERVICE_UNAVAILABLE]: "Service Unavailable",
    [ErrorCode.INTERNAL_SERVER_ERROR]: "Server Error",
    [ErrorCode.PROCESSING_FAILED]: "Processing Failed",
    [ErrorCode.CREDIT_REQUEST_EXISTS]: "Request Already Exists",
    [ErrorCode.RESOURCE_CONFLICT]: "Conflict",
    [ErrorCode.BAD_REQUEST]: "Invalid Request",
  };

  return (code && titles[code]) || "Error";
}
