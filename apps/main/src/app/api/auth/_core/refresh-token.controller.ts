import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import 'server-only';

import { ApiError } from '@workspace/api';
import { COOKIE_KEYS } from '@workspace/constants';

import { logger } from '@shared/lib';

import { createBffAuthClient } from './create-auth-client';
import { createAuthErrorResponse } from './error-response';
import { setSessionCookies, clearSessionCookies } from './session.service';

export const refreshTokenController = async (request: Request) => {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;

    if (!refreshToken) {
      logger.warn('[BFF] Refresh token missing in cookies');
      throw new Error('No refresh token');
    }
    logger.info('[BFF] Token refresh attempt');

    const authApi = createBffAuthClient(request);
    const newTokens = await authApi.refreshToken(refreshToken);

    await setSessionCookies(newTokens.accessToken, newTokens.refreshToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('[BFF] Token refresh error', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });

    // If the backend itself rejected the refresh (token expired/invalid), clear the dead cookies.
    // If it is a NetworkError/ServiceUnavailableError (backend is temporarily down), do NOT touch the cookies!
    if (error instanceof ApiError) {
      await clearSessionCookies();
    }

    return createAuthErrorResponse(error);
  }
};
