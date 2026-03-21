/**
 * Cookie Utility
 * Universal cookie management for client and server (Next.js)
 * Works with both localStorage (fallback) and cookies
 */

export interface CookieOptions {
  maxAge?: number; // in seconds
  expires?: Date;
  path?: string;
  domain?: string;
  secure?: boolean;
  httpOnly?: boolean;
  sameSite?: "strict" | "lax" | "none";
}

const DEFAULT_OPTIONS: CookieOptions = {
  path: "/",
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
};

/**
 * Set a cookie (client-side only)
 */
export function setCookie(
  name: string,
  value: string,
  options: CookieOptions = {}
): void {
  if (typeof document === "undefined") return;

  const opts = { ...DEFAULT_OPTIONS, ...options };
  let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

  if (opts.maxAge) {
    cookieString += `; max-age=${opts.maxAge}`;
  }

  if (opts.expires) {
    cookieString += `; expires=${opts.expires.toUTCString()}`;
  }

  if (opts.path) {
    cookieString += `; path=${opts.path}`;
  }

  if (opts.domain) {
    cookieString += `; domain=${opts.domain}`;
  }

  if (opts.secure) {
    cookieString += "; secure";
  }

  if (opts.sameSite) {
    cookieString += `; samesite=${opts.sameSite}`;
  }

  document.cookie = cookieString;
}

/**
 * Get a cookie value (client-side)
 */
export function getCookie(name: string): string | null {
  if (typeof document === "undefined") return null;

  const nameEQ = encodeURIComponent(name) + "=";
  const cookies = document.cookie.split(";");

  for (let i = 0; i < cookies.length; i++) {
    let cookie = cookies[i];
    while (cookie.charAt(0) === " ") {
      cookie = cookie.substring(1);
    }
    if (cookie.indexOf(nameEQ) === 0) {
      return decodeURIComponent(cookie.substring(nameEQ.length));
    }
  }

  return null;
}

/**
 * Delete a cookie (client-side)
 */
export function deleteCookie(name: string, options: CookieOptions = {}): void {
  setCookie(name, "", {
    ...options,
    maxAge: -1,
    expires: new Date(0),
  });
}

/**
 * Check if a cookie exists
 */
export function hasCookie(name: string): boolean {
  return getCookie(name) !== null;
}

/**
 * Get all cookies as an object
 */
export function getAllCookies(): Record<string, string> {
  if (typeof document === "undefined") return {};

  const cookies: Record<string, string> = {};
  const cookieStrings = document.cookie.split(";");

  for (const cookie of cookieStrings) {
    const [name, value] = cookie.split("=").map((c) => c.trim());
    if (name) {
      cookies[decodeURIComponent(name)] = decodeURIComponent(value || "");
    }
  }

  return cookies;
}

/**
 * Server-side cookie utilities (for use in Server Components/Actions)
 */
export const serverCookies = {
  /**
   * Get cookie from request headers (server-side)
   */
  getCookie(cookieHeader: string | null, name: string): string | null {
    if (!cookieHeader) return null;

    const nameEQ = encodeURIComponent(name) + "=";
    const cookies = cookieHeader.split(";");

    for (let i = 0; i < cookies.length; i++) {
      let cookie = cookies[i];
      while (cookie.charAt(0) === " ") {
        cookie = cookie.substring(1);
      }
      if (cookie.indexOf(nameEQ) === 0) {
        return decodeURIComponent(cookie.substring(nameEQ.length));
      }
    }

    return null;
  },

  /**
   * Create Set-Cookie header string (server-side)
   */
  createSetCookieHeader(
    name: string,
    value: string,
    options: CookieOptions = {}
  ): string {
    const opts = { ...DEFAULT_OPTIONS, ...options };
    let cookieString = `${encodeURIComponent(name)}=${encodeURIComponent(value)}`;

    if (opts.maxAge) {
      cookieString += `; Max-Age=${opts.maxAge}`;
    }

    if (opts.expires) {
      cookieString += `; Expires=${opts.expires.toUTCString()}`;
    }

    if (opts.path) {
      cookieString += `; Path=${opts.path}`;
    }

    if (opts.domain) {
      cookieString += `; Domain=${opts.domain}`;
    }

    if (opts.secure) {
      cookieString += "; Secure";
    }

    if (opts.httpOnly) {
      cookieString += "; HttpOnly";
    }

    if (opts.sameSite) {
      cookieString += `; SameSite=${opts.sameSite.charAt(0).toUpperCase() + opts.sameSite.slice(1)}`;
    }

    return cookieString;
  },
};
