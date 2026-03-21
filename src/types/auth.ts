/**
 * Authentication Types
 * Core types for the authentication system
 * Matches BetterAuth backend schema
 */

export type UserRole = "ADMIN" | "MODERATOR" | "EDITOR" | "USER";

export interface User {
  id: string;
  email: string;
  name: string;
  emailVerified: boolean;
  image?: string | null; // Can be null or undefined
  createdAt: string;
  updatedAt: string;
  role: UserRole; // Defaults to "USER" if not provided
}

export interface Session {
  token: string;
  expiresAt: string;
}

export interface Account {
  id: string;
  userId: string;
  accountId: string;
  providerId: string;
  accessToken?: string;
  refreshToken?: string;
  expiresAt?: string;
}

export interface UserPermission {
  id: string;
  userId: string;
  action: string;
  subject: string;
  fields?: string[];
  conditions?: Record<string, unknown>;
  inverted: boolean;
  reason?: string;
}

export interface AuthConfig {
  /**
   * Redirect path after successful login
   * @default "/"
   */
  redirectAfterLogin?: string;

  /**
   * Redirect path after logout
   * @default "/login"
   */
  redirectAfterLogout?: string;

  /**
   * Login page path (for protected route redirects)
   * @default "/login"
   */
  loginPath?: string;
}

export interface AuthContextType {
  // State
  user: User | null;
  session: Session | null;
  isLoading: boolean;
  isAuthenticated: boolean;

  // Methods
  login: (email: string, password: string) => Promise<void>;
  signup: (email: string, password: string, name: string) => Promise<void>;
  logout: () => Promise<void>;
  refreshSession: () => Promise<void>;

  // Configuration
  config: AuthConfig;
}

export interface AuthProviderProps {
  children: React.ReactNode;
  config?: Partial<AuthConfig>;
}
