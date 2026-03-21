import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

/**
 * Next.js Middleware for Authentication
 * Provides server-side route protection for the application
 *
 * This middleware runs on the Edge runtime and checks authentication
 * before pages are rendered, providing true server-side protection.
 */

// Routes that require authentication
const protectedRoutes = ["/dashboard"];

// Routes that should redirect to dashboard if already authenticated
const authRoutes = ["/login", "/signup"];

/**
 * Check if user has a valid session cookie
 * BetterAuth uses httpOnly cookies for session management
 */
function isAuthenticated(request: NextRequest): boolean {
  // BetterAuth typically uses a cookie named "better-auth.session_token" or similar
  // Check for common session cookie names
  const sessionCookie =
    request.cookies.get("better-auth.session_token") ||
    request.cookies.get("session") ||
    request.cookies.get("auth_session");

  return !!sessionCookie;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const isAuth = isAuthenticated(request);

  // Check if the current path is a protected route
  const isProtectedRoute = protectedRoutes.some((route) =>
    pathname.startsWith(route)
  );

  // Check if the current path is an auth route (login, signup)
  const isAuthRoute = authRoutes.some((route) => pathname.startsWith(route));

  // Redirect to login if accessing protected route without authentication
  if (isProtectedRoute && !isAuth) {
    const url = new URL("/login", request.url);
    url.searchParams.set("returnUrl", pathname);
    return NextResponse.redirect(url);
  }

  // Redirect to dashboard if accessing auth routes while already authenticated
  if (isAuthRoute && isAuth) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

/**
 * Configure which routes this middleware runs on
 * See: https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
 */
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public folder
     */
    "/((?!api|_next/static|_next/image|favicon.ico|.*\\..*|_next).*)",
  ],
};
