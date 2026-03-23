"use client";

import { createContext, useContext, ReactNode } from "react";
import { ToastContainer } from "../ui/Toast";
import { useToast } from "../../hooks/useToast";

interface ToastContextType {
  toasts: ReturnType<typeof useToast>["toasts"];
  addToast: ReturnType<typeof useToast>["addToast"];
  removeToast: ReturnType<typeof useToast>["removeToast"];
  clearAllToasts: ReturnType<typeof useToast>["clearAllToasts"];
  success: ReturnType<typeof useToast>["success"];
  error: ReturnType<typeof useToast>["error"];
  warning: ReturnType<typeof useToast>["warning"];
  info: ReturnType<typeof useToast>["info"];
}

const ToastContext = createContext<ToastContextType | undefined>(undefined);

export function useToastContext(): ToastContextType {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error("useToastContext must be used within a ToastProvider");
  }
  return context;
}

interface ToastProviderProps {
  children: ReactNode;
}

export function ToastProvider({ children }: ToastProviderProps) {
  const toast = useToast();

  return (
    <ToastContext.Provider value={toast}>
      {children}
      <ToastContainer toasts={toast.toasts} onClose={toast.removeToast} />
    </ToastContext.Provider>
  );
}
