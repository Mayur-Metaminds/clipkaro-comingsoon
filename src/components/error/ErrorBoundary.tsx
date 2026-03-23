"use client";

import React, { Component, ErrorInfo, ReactNode } from "react";
import {
  ExclamationTriangleIcon,
  ArrowPathIcon,
} from "@heroicons/react/24/outline";
import { logger } from "../../lib/logger";
import { errorService } from "../../lib/errorService";
import { ErrorCode } from "../../types/error";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
  errorId?: string;
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error,
      errorId: `boundary_${Date.now()}`,
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    // Log the error
    const contextualError = errorService.createError(
      ErrorCode.UNKNOWN_ERROR,
      error.message,
      {
        component: "ErrorBoundary",
        additionalData: {
          componentStack: errorInfo.componentStack,
          errorBoundary: true,
        },
      },
      error
    );

    errorService.logError(contextualError, "critical");

    // Call custom error handler if provided
    this.props.onError?.(error, errorInfo);
  }

  private handleRetry = () => {
    this.setState({ hasError: false, error: undefined, errorId: undefined });
  };

  private handleReportError = () => {
    if (this.state.error) {
      // In a real app, you might open a feedback form or send to support
      const errorDetails = {
        message: this.state.error.message,
        stack: this.state.error.stack,
        errorId: this.state.errorId,
        timestamp: new Date().toISOString(),
        url: window.location.href,
        userAgent: window.navigator.userAgent,
      };

      // For now, copy to clipboard
      navigator.clipboard
        .writeText(JSON.stringify(errorDetails, null, 2))
        .then(() => {
          alert(
            "Error details copied to clipboard. Please share this with our support team."
          );
        })
        .catch(() => {
          logger.error("Failed to copy error details");
        });
    }
  };

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default error UI
      return (
        <div className="flex min-h-[400px] items-center justify-center p-8">
          <div className="w-full max-w-md rounded-lg border border-red-200 bg-white p-6 text-center shadow-lg">
            <div className="mb-4 flex justify-center">
              <ExclamationTriangleIcon className="h-12 w-12 text-red-500" />
            </div>

            <h2 className="mb-2 text-xl font-semibold text-gray-900">
              Something went wrong
            </h2>

            <p className="mb-6 text-gray-600">
              We encountered an unexpected error. Our team has been notified.
            </p>

            {this.state.errorId && (
              <p className="mb-6 font-mono text-xs text-gray-400">
                Error ID: {this.state.errorId}
              </p>
            )}

            <div className="flex flex-col justify-center gap-3 sm:flex-row">
              <button
                onClick={this.handleRetry}
                className="bg-primary-600 hover:bg-primary-700 flex items-center justify-center gap-2 rounded-md px-4 py-2 text-white transition-colors"
              >
                <ArrowPathIcon className="h-4 w-4" />
                Try Again
              </button>

              <button
                onClick={this.handleReportError}
                className="rounded-md bg-gray-100 px-4 py-2 text-gray-700 transition-colors hover:bg-gray-200"
              >
                Report Error
              </button>
            </div>

            {process.env.NODE_ENV === "development" && this.state.error && (
              <details className="mt-6 text-left">
                <summary className="cursor-pointer text-sm text-gray-500 hover:text-gray-700">
                  Development Details
                </summary>
                <pre className="mt-2 max-h-40 overflow-auto rounded bg-gray-100 p-3 text-xs">
                  {this.state.error.stack}
                </pre>
              </details>
            )}
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

// HOC for wrapping components with error boundary
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  return WrappedComponent;
}
