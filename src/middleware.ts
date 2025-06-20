
import { NextResponse, type NextRequest } from 'next/server';

const ADMIN_COOKIE_NAME = 'admin-auth';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const adminCookie = request.cookies.get(ADMIN_COOKIE_NAME);
  const isLoggedIn = adminCookie?.value === 'true';

  // Handle /admin/login page
  if (pathname === '/admin/login') {
    if (isLoggedIn) {
      // If already logged in and trying to access login page, redirect to dashboard
      return NextResponse.redirect(new URL('/admin/dashboard', request.url));
    }
    // If not logged in, allow access to login page
    return NextResponse.next();
  }

  // For any other page under /admin/ (e.g., /admin/dashboard, /admin/dashboard?editVideoId=...)
  // The matcher (in config below) ensures this middleware only runs for /admin/* paths.
  // So, if we reach here, and it's not /admin/login, it's a protected admin path.
  if (!isLoggedIn) {
    // If not logged in, redirect to login page
    return NextResponse.redirect(new URL('/admin/login', request.url));
  }

  // If logged in and accessing a protected admin page, allow access
  return NextResponse.next();
}

export const config = {
  matcher: ['/admin/:path*'],
};
