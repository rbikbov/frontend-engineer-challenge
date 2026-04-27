import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

import { AUTH_LINKS, COOKIE_KEYS, DASHBOARD_LINKS } from '@workspace/constants';

export default function middleware(request: NextRequest) {
  const accessToken = request.cookies.get(COOKIE_KEYS.ACCESS_TOKEN);
  const { pathname } = request.nextUrl;

  const isAuthPage = Object.values(AUTH_LINKS).some((path) =>
    pathname.startsWith(path),
  );
  const isDashboardPage = Object.values(DASHBOARD_LINKS).some((path) =>
    pathname.startsWith(path),
  );

  // Если юзер авторизован и заходит на auth-страницы, перенаправляем в dashboard
  if (isAuthPage && accessToken) {
    return NextResponse.redirect(new URL(DASHBOARD_LINKS.ROOT, request.url));
  }

  // Если не авторизован и ломится на закрытую зону
  if (isDashboardPage && !accessToken) {
    const callbackUrl = encodeURIComponent(pathname);
    return NextResponse.redirect(
      new URL(`${AUTH_LINKS.SIGN_IN}?callbackUrl=${callbackUrl}`, request.url),
    );
  }

  return NextResponse.next();
}

export const config = {
  matcher: [`${DASHBOARD_LINKS.prefix}/:path*`, `${AUTH_LINKS.prefix}/:path*`],
};
