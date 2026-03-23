"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import type {
  AuthContextType,
  AuthProviderProps,
  User,
  Session,
  AuthConfig,
} from "../types/auth";
import { authService } from "../services/auth.service";
import { PermissionsProvider } from "./PermissionsContext";
import { useToastContext } from "../components/providers/ToastProvider";
import { useRouter } from "next/navigation";

/**
 * AuthContext
 * Provides authentication state and methods throughout the app
 *
 * Features:
 * - Cookie-based session management (BetterAuth)
 * - Automatic session refresh on mount
 * - Permission checking
 * - Protected route support
 * - User state management
 *
 * @example
 * ```tsx
 * // Wrap your app
 * <AuthProvider config={{ redirectAfterLogin: "/dashboard" }}>
 *   <App />
 * </AuthProvider>
 *
 * // Use in components
 * const { user, session, login, logout, isAuthenticated } = useAuth();
 * ```
 */

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const DEFAULT_CONFIG: AuthConfig = {
  redirectAfterLogin: "/",
  redirectAfterLogout: "/login",
  loginPath: "/login",
};

export function AuthProvider({ children, config }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const toast = useToastContext();
  const router = useRouter();

  // Merge config with defaults
  const authConfig: AuthConfig = { ...DEFAULT_CONFIG, ...config };

  // Initialize auth state on mount
  useEffect(() => {
    const initializeAuth = async () => {
      try {
        console.log("[AuthContext] Initializing auth...");
        // Fetch current session from backend
        // Backend returns: { session: { token, expiresAt, ... }, user: User } or null
        const sessionData = await authService.getSession();

        console.log(
          "[AuthContext] Session data received:",
          sessionData ? "User found" : "No session"
        );

        if (sessionData && sessionData.user && sessionData.session) {
          setUser(sessionData.user);
          // Extract session from the nested structure
          setSession({
            token: sessionData.session.token,
            expiresAt: sessionData.session.expiresAt,
          });
          console.log(
            "[AuthContext] Auth initialized successfully for user:",
            sessionData.user.email
          );
        } else {
          setUser(null);
          setSession(null);
          console.log("[AuthContext] No active session found");
        }
      } catch (error) {
        // Session is invalid or expired
        console.error("[AuthContext] Failed to initialize auth:", error);
        if (error instanceof Error) {
          console.error("[AuthContext] Error message:", error.message);
        }
        setUser(null);
        setSession(null);
      } finally {
        setIsLoading(false);
      }
    };

    initializeAuth();
  }, []);

  /**
   * Login with email and password
   */
  const login = async (email: string, password: string) => {
    try {
      setIsLoading(true);

      const response = await authService.signIn({ email, password });

      // Backend returns: { token: string | null, user: User }
      // Session is managed by httpOnly cookies, so token might be null
      setUser(response.user);

      // Create session object for state management
      // Token is managed by cookies, but we track session state
      setSession({
        token: response.token || "",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      });

      // Show success message
      toast.success("Welcome back!", `Logged in as ${response.user.email}`);

      // Redirect to home or specified path
      router.push(authConfig.redirectAfterLogin || "/");
    } catch (error: unknown) {
      console.error("Login failed:", error);

      // Extract user-friendly error message from backend
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      toast.error("Login failed", errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Sign up with email, password, and name
   */
  const signup = async (email: string, password: string, name: string) => {
    try {
      setIsLoading(true);

      // Register user - BetterAuth returns user immediately
      const response = await authService.signUp({
        email,
        password,
        name,
      });

      // Backend returns: { token: string | null, user: User }
      // Session is managed by httpOnly cookies
      setUser(response.user);

      // Create session object for state management
      setSession({
        token: response.token || "",
        expiresAt: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000).toISOString(), // 7 days
      });

      toast.success("Account created!", "Kindly verify your email");

      // Redirect to home or specified path
      router.push(authConfig.redirectAfterLogin || "/");
    } catch (error: unknown) {
      console.error("Signup failed:", error);

      // Extract user-friendly error message from backend
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      toast.error("Signup failed", errorMessage);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Logout and clear session
   */
  const logout = async () => {
    try {
      // Call backend sign-out endpoint (clears cookies)
      await authService.signOut();

      // Clear local state
      setUser(null);
      setSession(null);

      // Show message
      toast.success("Logged out", "See you soon!");

      // Redirect to login
      router.push(authConfig.redirectAfterLogout || "/login");
    } catch (error: unknown) {
      console.error("Logout failed:", error);

      // Extract user-friendly error message from backend
      const errorMessage =
        error instanceof Error ? error.message : "Unknown error occurred";

      toast.error("Logout failed", errorMessage);
    }
  };

  /**
   * Refresh session data from API
   */
  const refreshSession = async () => {
    try {
      // Backend returns: { session: { token, expiresAt, ... }, user: User } or null
      const sessionData = await authService.getSession();

      if (sessionData && sessionData.user && sessionData.session) {
        setUser(sessionData.user);
        // Extract session from the nested structure
        setSession({
          token: sessionData.session.token,
          expiresAt: sessionData.session.expiresAt,
        });
      } else {
        setUser(null);
        setSession(null);
      }
    } catch (error) {
      console.error("Failed to refresh session:", error);
      // If refresh fails, user might be logged out
      setUser(null);
      setSession(null);
    }
  };

  const value: AuthContextType = {
    user,
    session,
    isLoading,
    isAuthenticated: !!user && !!session,
    login,
    signup,
    logout,
    refreshSession,
    config: authConfig,
  };

  return (
    <AuthContext.Provider value={value}>
      <PermissionsProvider userId={user?.id}>{children}</PermissionsProvider>
    </AuthContext.Provider>
  );
}

/**
 * Hook to access authentication context
 * Must be used within AuthProvider
 *
 * @throws Error if used outside AuthProvider
 *
 * @example
 * ```tsx
 * function MyComponent() {
 *   const { user, session, login, logout, isAuthenticated } = useAuth();
 *
 *   if (!isAuthenticated) {
 *     return <LoginForm onSubmit={(e, p) => login(e, p)} />;
 *   }
 *
 *   return <div>Welcome {user?.name}</div>;
 * }
 * ```
 */
export function useAuth() {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
}
