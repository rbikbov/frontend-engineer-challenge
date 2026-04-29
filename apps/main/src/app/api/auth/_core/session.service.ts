import { cookies } from 'next/headers';
import 'server-only';

import { getJwtExpiration } from '@workspace/api';
import { envConfig } from '@workspace/config/env';
import { COOKIE_KEYS } from '@workspace/constants';

export const setSessionCookies = async (
  accessToken: string,
  refreshToken: string,
) => {
  const cookieStore = await cookies();
  const secure = envConfig.NEXT_PUBLIC_ENV === 'production';
  const sameSite = 'strict';
  const path = '/';

  const accessExpires = getJwtExpiration(accessToken);
  const refreshExpires = getJwtExpiration(refreshToken);

  // HttpOnly Cookies
  cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
    httpOnly: true,
    secure,
    sameSite,
    path,
    expires: accessExpires,
  });

  cookieStore.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
    httpOnly: true,
    secure,
    sameSite,
    path,
    expires: refreshExpires,
  });

  // UI Cookies (accessible to JS)
  cookieStore.set(COOKIE_KEYS.IS_AUTHENTICATED, 'true', {
    httpOnly: false, // <- для UI
    secure,
    sameSite,
    path,
    expires: refreshExpires,
  });
};

export const clearSessionCookies = async () => {
  const cookieStore = await cookies();
  cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
  cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);
  cookieStore.delete(COOKIE_KEYS.IS_AUTHENTICATED);
};
