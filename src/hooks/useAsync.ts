import { useCallback, useEffect, useRef } from "react";
import { useSafeState } from "./useSafeState";
import { useToastContext } from "@/components/providers/ToastProvider";
import { ApiError } from "@/lib/api";

/**
 * Async Hook Configuration Options
 */
export interface UseAsyncOptions<T, E = unknown> {
  /** Callback executed on successful completion */
  onSuccess?: (data: T) => void;

  /** Callback executed on error */
  onError?: (error: E) => void;

  /** Callback executed regardless of success or failure */
  onSettled?: (data: T | null, error: E | null) => void;

  /** Toast notification options */
  toast?: {
    /** Show toast notifications (default: false) */
    enabled?: boolean;
    /** Success message (if not provided, no success toast) */
    successMessage?: string;
    /** Error message (if not provided, uses error.message) */
    errorMessage?: string;
  };

  /** Execute immediately on mount */
  immediate?: boolean;

  /** Parameters to pass when executing immediately */
  immediateParams?: unknown[];

  /** Dependencies array for immediate execution */
  deps?: unknown[];
}

/**
 * Async Hook Return Type
 */
export interface UseAsyncReturn<T, P extends unknown[] = unknown[]> {
  /** Execute the async function */
  execute: (...params: P) => Promise<T>;

  /** Current data (null if not loaded) */
  data: T | null;

  /** Loading state */
  isLoading: boolean;

  /** Error state */
  error: unknown;

  /** Clear error state */
  clearError: () => void;

  /** Clear data state */
  clearData: () => void;

  /** Reset all states to initial values */
  reset: () => void;
}

/**
 * useAsync Hook
 *
 * Simplifies async operation handling with built-in state management,
 * error handling, and toast notifications.
 *
 * @example Basic usage
 * ```tsx
 * const { execute, data, isLoading, error } = useAsync(
 *   userService.getById
 * );
 *
 * const handleLoad = () => execute(userId);
 * ```
 *
 * @example With toast notifications
 * ```tsx
 * const { execute, isLoading } = useAsync(userService.update, {
 *   toast: {
 *     enabled: true,
 *     successMessage: "User updated successfully!",
 *   },
 *   onSuccess: (user) => {
 *     console.log("Updated user:", user);
 *   },
 * });
 * ```
 *
 * @example Immediate execution
 * ```tsx
 * const { data, isLoading } = useAsync(userService.getAll, {
 *   immediate: true,
 *   deps: [page, filters],
 * });
 * ```
 *
 * @example With error handling
 * ```tsx
 * const { execute, error } = useAsync(userService.delete, {
 *   toast: {
 *     enabled: true,
 *     errorMessage: "Failed to delete user",
 *   },
 *   onError: (error) => {
 *     console.error("Delete failed:", error);
 *   },
 * });
 * ```
 */
export function useAsync<T, P extends unknown[] = unknown[]>(
  asyncFunction: (...params: P) => Promise<T>,
  options: UseAsyncOptions<T> = {}
): UseAsyncReturn<T, P> {
  const {
    onSuccess,
    onError,
    onSettled,
    toast: toastOptions,
    immediate = false,
    immediateParams = [],
    deps = [],
  } = options;

  const toast = useToastContext();
  const [data, setData] = useSafeState<T | null>(null);
  const [isLoading, setIsLoading] = useSafeState<boolean>(false);
  const [error, setError] = useSafeState<unknown>(null);

  // Track if this is the first render for immediate execution
  const isFirstRender = useRef(true);

  const clearError = useCallback(() => {
    setError(null);
  }, [setError]);

  const clearData = useCallback(() => {
    setData(null);
  }, [setData]);

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, [setData, setError, setIsLoading]);

  const execute = useCallback(
    async (...params: P): Promise<T> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...params);
        setData(result);

        // Success callback
        if (onSuccess) {
          onSuccess(result);
        }

        // Success toast
        if (toastOptions?.enabled && toastOptions?.successMessage) {
          toast.success("Success", toastOptions.successMessage);
        }

        // Settled callback
        if (onSettled) {
          onSettled(result, null);
        }

        return result;
      } catch (err: unknown) {
        // Extract error message
        let errorMessage = "An error occurred";
        let errorDetails = err;

        if (err instanceof ApiError) {
          errorMessage = err.message;
          errorDetails = err.data || err;
        } else if (err instanceof Error) {
          errorMessage = err.message;
        }

        setError(errorDetails);

        // Error callback
        if (onError) {
          onError(errorDetails);
        }

        // Error toast
        if (toastOptions?.enabled) {
          toast.error("Error", toastOptions?.errorMessage || errorMessage);
        }

        // Settled callback
        if (onSettled) {
          onSettled(null, errorDetails);
        }

        throw errorDetails;
      } finally {
        setIsLoading(false);
      }
    },
    [
      asyncFunction,
      setData,
      setError,
      setIsLoading,
      onSuccess,
      onError,
      onSettled,
      toastOptions,
      toast,
    ]
  );

  // Handle immediate execution
  useEffect(() => {
    if (immediate && isFirstRender.current) {
      isFirstRender.current = false;
      execute(...(immediateParams as P)).catch(() => {
        // Error already handled in execute
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [immediate, ...deps]);

  return {
    execute,
    data,
    isLoading,
    error,
    clearError,
    clearData,
    reset,
  };
}

export default useAsync;
