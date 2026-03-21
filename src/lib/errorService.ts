"use client";

import { logger } from "@/lib/logger";
import {
  ErrorLogEntry,
  ErrorCode,
  ErrorContext,
  ErrorWithContext,
  ErrorSeverity,
} from "@/types/error";

class ErrorService {
  private errorLogs: ErrorLogEntry[] = [];
  private readonly maxLogEntries = 100;

  /**
   * Create a standardized error with context
   */
  createError(
    code: ErrorCode,
    message: string,
    context?: ErrorContext,
    originalError?: Error,
    retryable: boolean = false
  ): ErrorWithContext {
    const error = new Error(message) as ErrorWithContext;
    error.code = code;
    error.context = context;
    error.originalError = originalError;
    error.retryable = retryable;
    return error;
  }

  /**
   * Log an error for debugging and monitoring
   */
  logError(
    error: ErrorWithContext | Error,
    severity: ErrorSeverity = "medium"
  ): void {
    const errorEntry: ErrorLogEntry = {
      id: this.generateId(),
      timestamp: new Date().toISOString(),
      code: (error as ErrorWithContext).code || ErrorCode.UNKNOWN_ERROR,
      message: error.message,
      severity,
      context: (error as ErrorWithContext).context,
      stack: error.stack,
      userAgent:
        typeof window !== "undefined" ? window.navigator.userAgent : undefined,
      url: typeof window !== "undefined" ? window.location.href : undefined,
    };

    this.errorLogs.unshift(errorEntry);

    // Keep only the most recent entries
    if (this.errorLogs.length > this.maxLogEntries) {
      this.errorLogs = this.errorLogs.slice(0, this.maxLogEntries);
    }

    // Log to console in development
    if (process.env.NODE_ENV === "development") {
      console.group(`🚨 Error [${severity.toUpperCase()}]: ${errorEntry.code}`);
      logger.error("Message:", error.message);
      logger.error("Context:", errorEntry.context);
      logger.error("Stack:", error.stack);
      console.groupEnd();
    }

    // In production, you could send to an error tracking service
    if (process.env.NODE_ENV === "production" && severity === "critical") {
      this.reportCriticalError(errorEntry);
    }
  }

  /**
   * Get user-friendly error messages
   */
  getDisplayMessage(error: ErrorWithContext | Error): string {
    const errorCode = (error as ErrorWithContext).code;

    // Custom messages for specific error codes
    const messages: Partial<Record<ErrorCode, string>> = {
      [ErrorCode.NETWORK_ERROR]:
        "Unable to connect to the server. Please check your internet connection.",
      [ErrorCode.TIMEOUT_ERROR]: "The request timed out. Please try again.",
      [ErrorCode.INVALID_CREDENTIALS]:
        "Invalid email or password. Please try again.",
      [ErrorCode.UNAUTHORIZED]: "You need to log in to access this feature.",
      [ErrorCode.FORBIDDEN]:
        "You don't have permission to perform this action.",
      [ErrorCode.RESOURCE_NOT_FOUND]: "The requested item could not be found.",
      [ErrorCode.INSUFFICIENT_CREDITS]:
        "You don't have enough credits for this action.",
      [ErrorCode.FILE_TOO_LARGE]:
        "The file is too large. Please choose a smaller file.",
      [ErrorCode.INVALID_FILE_TYPE]:
        "Invalid file type. Please choose a supported image format.",
      [ErrorCode.UPLOAD_FAILED]: "File upload failed. Please try again.",
      [ErrorCode.VALIDATION_FAILED]: "Please check your input and try again.",
      [ErrorCode.SERVICE_UNAVAILABLE]:
        "The service is temporarily unavailable. Please try again later.",
      [ErrorCode.INTERNAL_SERVER_ERROR]:
        "Something went wrong on our end. Please try again.",
      [ErrorCode.PROCESSING_FAILED]:
        "Failed to process your request. Please try again.",
      [ErrorCode.EXTERNAL_SERVICE_ERROR]:
        "An external service is currently unavailable. Please try again later.",
      [ErrorCode.DATABASE_ERROR]:
        "A database error occurred. Please try again.",
      [ErrorCode.CONSTRAINT_VIOLATION]:
        "This action conflicts with existing data.",
      [ErrorCode.RESOURCE_ALREADY_EXISTS]: "This item already exists.",
      [ErrorCode.RESOURCE_CONFLICT]: "There was a conflict with your request.",
      [ErrorCode.INVALID_INPUT]: "Invalid input provided.",
      [ErrorCode.MISSING_REQUIRED_FIELD]: "Please fill in all required fields.",
      [ErrorCode.TOKEN_EXPIRED]:
        "Your session has expired. Please log in again.",
      [ErrorCode.TOKEN_INVALID]: "Invalid session. Please log in again.",
      [ErrorCode.QUOTA_EXCEEDED]: "You have exceeded your usage quota.",
      [ErrorCode.CREDIT_REQUEST_EXISTS]:
        "You already have a pending credit request.",
      [ErrorCode.INVALID_PROCESSING_STATE]:
        "The item is in an invalid state for this action.",
      [ErrorCode.FILE_NOT_FOUND]: "The file could not be found.",
      [ErrorCode.BAD_REQUEST]: "Invalid request. Please check your input.",
      [ErrorCode.UNKNOWN_ERROR]:
        "An unexpected error occurred. Please try again.",
    };

    return (
      (errorCode && messages[errorCode]) ||
      error.message ||
      "An unexpected error occurred."
    );
  }

  /**
   * Check if an error is retryable
   */
  isRetryable(error: ErrorWithContext | Error): boolean {
    if ((error as ErrorWithContext).retryable !== undefined) {
      return (error as ErrorWithContext).retryable!;
    }

    const retryableCodes: ErrorCode[] = [
      ErrorCode.NETWORK_ERROR,
      ErrorCode.TIMEOUT_ERROR,
      ErrorCode.SERVICE_UNAVAILABLE,
      ErrorCode.EXTERNAL_SERVICE_ERROR,
      ErrorCode.INTERNAL_SERVER_ERROR,
    ];

    const errorCode = (error as ErrorWithContext).code;
    return errorCode ? retryableCodes.includes(errorCode) : false;
  }

  /**
   * Get error logs for debugging
   */
  getErrorLogs(): ErrorLogEntry[] {
    return this.errorLogs;
  }

  /**
   * Clear error logs
   */
  clearErrorLogs(): void {
    this.errorLogs = [];
  }

  private generateId(): string {
    return `error_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  }

  private reportCriticalError(errorEntry: ErrorLogEntry): void {
    // In a real application, you would send this to your error tracking service
    // For now, we'll just log it
    logger.error("Critical error reported:", errorEntry);
  }
}

export const errorService = new ErrorService();
