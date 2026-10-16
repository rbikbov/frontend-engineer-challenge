import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AUTH_LINKS, COOKIE_KEYS, DASHBOARD_LINKS } from '@workspace/constants';

export default function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
  const refreshToken = request.cookies.get(COOKIE_KEYS.REFRESH_TOKEN);
  const hasToken = Boolean(accessToken?.value || refreshToken?.value);

  const { pathname } = request.nextUrl;

  const isAuthPage = Object.values(AUTH_LINKS).some((path) =>
    pathname.startsWith(path),
  );
  const isDashboardPage = Object.values(DASHBOARD_LINKS).some((path) =>
    pathname.startsWith(path),
  );

  // If the user is signed in and opens an auth page, redirect to the dashboard
  if (isAuthPage && hasToken) {
    return NextResponse.redirect(new URL(DASHBOARD_LINKS.ROOT, request.url));
  }

  // If the user is not signed in and tries to open a protected zone
  if (isDashboardPage && !hasToken) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`${AUTH_LINKS.SIGN_IN}?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  /*
   * Matches all paths except:
   * 1. api (backend/BFF routes)
   * 2. _next/static (scripts and styles)
   * 3. _next/image (Next.js images)
   * 4. favicon.ico
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
