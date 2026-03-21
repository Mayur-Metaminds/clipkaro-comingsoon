/* eslint-disable @typescript-eslint/no-explicit-any */
export enum ErrorCode {
  // Authentication Errors
  INVALID_CREDENTIALS = "INVALID_CREDENTIALS",
  TOKEN_EXPIRED = "TOKEN_EXPIRED",
  TOKEN_INVALID = "TOKEN_INVALID",
  UNAUTHORIZED = "UNAUTHORIZED",
  FORBIDDEN = "FORBIDDEN",

  // Validation Errors
  VALIDATION_FAILED = "VALIDATION_FAILED",
  INVALID_INPUT = "INVALID_INPUT",
  MISSING_REQUIRED_FIELD = "MISSING_REQUIRED_FIELD",

  // Resource Errors
  RESOURCE_NOT_FOUND = "RESOURCE_NOT_FOUND",
  RESOURCE_ALREADY_EXISTS = "RESOURCE_ALREADY_EXISTS",
  RESOURCE_CONFLICT = "RESOURCE_CONFLICT",

  // File/Upload Errors
  FILE_TOO_LARGE = "FILE_TOO_LARGE",
  INVALID_FILE_TYPE = "INVALID_FILE_TYPE",
  UPLOAD_FAILED = "UPLOAD_FAILED",
  FILE_NOT_FOUND = "FILE_NOT_FOUND",

  // Quota/Credit Errors
  INSUFFICIENT_CREDITS = "INSUFFICIENT_CREDITS",
  QUOTA_EXCEEDED = "QUOTA_EXCEEDED",
  CREDIT_REQUEST_EXISTS = "CREDIT_REQUEST_EXISTS",

  // Processing Errors
  PROCESSING_FAILED = "PROCESSING_FAILED",
  INVALID_PROCESSING_STATE = "INVALID_PROCESSING_STATE",
  EXTERNAL_SERVICE_ERROR = "EXTERNAL_SERVICE_ERROR",

  // Database Errors
  DATABASE_ERROR = "DATABASE_ERROR",
  CONSTRAINT_VIOLATION = "CONSTRAINT_VIOLATION",

  // Generic Errors
  INTERNAL_SERVER_ERROR = "INTERNAL_SERVER_ERROR",
  SERVICE_UNAVAILABLE = "SERVICE_UNAVAILABLE",
  BAD_REQUEST = "BAD_REQUEST",

  // Client-side Errors
  NETWORK_ERROR = "NETWORK_ERROR",
  TIMEOUT_ERROR = "TIMEOUT_ERROR",
  UNKNOWN_ERROR = "UNKNOWN_ERROR",
}

export interface ApiError {
  code: ErrorCode;
  message: string;
  details?: any;
  timestamp: string;
  path: string;
  requestId?: string;
  validationErrors?: Array<{
    field: string;
    message: string;
    value?: any;
  }>;
}

export interface ErrorResponse {
  success: false;
  error: ApiError;
}

export interface SuccessResponse<T = any> {
  success: true;
  data: T;
  message?: string;
}

export type ApiResponse<T = any> = SuccessResponse<T> | ErrorResponse;

export interface ErrorContext {
  component?: string;
  action?: string;
  userId?: string;
  sessionId?: string;
  additionalData?: Record<string, any>;
}

export interface ErrorWithContext extends Error {
  code?: ErrorCode;
  context?: ErrorContext;
  originalError?: Error;
  retryable?: boolean;
}

export type ErrorSeverity = "low" | "medium" | "high" | "critical";

export interface ErrorLogEntry {
  id: string;
  timestamp: string;
  code: ErrorCode;
  message: string;
  severity: ErrorSeverity;
  context?: ErrorContext;
  stack?: string;
  userAgent?: string;
  url?: string;
}
