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

  // Если юзер авторизован и заходит на auth-страницы, перенаправляем в dashboard
  if (isAuthPage && hasToken) {
    return NextResponse.redirect(new URL(DASHBOARD_LINKS.ROOT, request.url));
  }

  // Если не авторизован и ломится на закрытую зону
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
   * Матчит все пути, кроме:
   * 1. api (роуты бэкенда/BFF)
   * 2. _next/static (скрипты и стили)
   * 3. _next/image (картинки Next.js)
   * 4. favicon.ico
   */
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
