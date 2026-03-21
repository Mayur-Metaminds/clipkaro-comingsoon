export { apiClient } from "./client";
export { apiService, ApiError } from "./service";
export { BaseService, type QueryParams } from "./BaseService";
export {
  getErrorMessage,
  getFieldErrors,
  isValidationError,
  isAuthError,
  isPermissionError,
  isNetworkError,
  formatErrorForLogging,
  type ApiErrorResponse,
} from "./errors";
