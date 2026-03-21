import { useState, useCallback } from "react";
import { ToastMessage, ToastType, ToastAction } from "@/components/ui/Toast";

export function useToast() {
  const [toasts, setToasts] = useState<ToastMessage[]>([]);

  const addToast = useCallback(
    (
      type: ToastType,
      title: string,
      message?: string,
      duration: number = 5000,
      action?: ToastAction,
      persistent: boolean = false
    ) => {
      const id = Math.random().toString(36).substr(2, 9);
      const newToast: ToastMessage = {
        id,
        type,
        title,
        message,
        duration,
        action,
        persistent,
      };

      setToasts((prev) => [...prev, newToast]);
      return id;
    },
    []
  );

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((toast) => toast.id !== id));
  }, []);

  const clearAllToasts = useCallback(() => {
    setToasts([]);
  }, []);

  // Convenience methods
  const success = useCallback(
    (
      title: string,
      message?: string,
      duration?: number,
      action?: ToastAction
    ) => {
      return addToast("success", title, message, duration, action);
    },
    [addToast]
  );

  const error = useCallback(
    (
      title: string,
      message?: string,
      duration?: number,
      action?: ToastAction,
      persistent?: boolean
    ) => {
      return addToast(
        "error",
        title,
        message,
        duration || 7000,
        action,
        persistent
      );
    },
    [addToast]
  );

  const warning = useCallback(
    (
      title: string,
      message?: string,
      duration?: number,
      action?: ToastAction
    ) => {
      return addToast("warning", title, message, duration, action);
    },
    [addToast]
  );

  const info = useCallback(
    (
      title: string,
      message?: string,
      duration?: number,
      action?: ToastAction
    ) => {
      return addToast("info", title, message, duration, action);
    },
    [addToast]
  );

  return {
    toasts,
    addToast,
    removeToast,
    clearAllToasts,
    success,
    error,
    warning,
    info,
  };
}
