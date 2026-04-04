import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  // Check if the path is an admin route (except login)
  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isApiRoute = request.nextUrl.pathname.startsWith("/api");

  // Skip middleware for API routes and login page
  if (isApiRoute || isLoginPage) {
    return NextResponse.next();
  }

  // For admin routes, check for session cookie
  if (isAdminRoute) {
    const sessionCookie = request.cookies.get("admin_session");

    if (!sessionCookie) {
      // Redirect to login if no session
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*"],
};
