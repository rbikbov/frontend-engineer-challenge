import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import 'server-only';

import { COOKIE_KEYS } from '@workspace/constants';

import { logger } from '@shared/lib';

import { createBffAuthClient } from './create-auth-client';
import { clearSessionCookies } from './session.service';

export const logoutController = async (request: Request) => {
  try {
    logger.info('[BFF] Logout attempt');
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;

    if (refreshToken) {
      try {
        const authApi = createBffAuthClient(request);
        await authApi.logout(refreshToken);
      } catch (e) {
        logger.error('[BFF] Backend logout failed, clearing cookies anyway', {
          error: (e as Error).message,
        });
      }
    }

    await clearSessionCookies();

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    logger.error('[BFF] Logout error', {
      message: (error as Error).message,
    });
    return NextResponse.json(
      { message: (error as Error).message || 'Internal Server Error' },
      { status: 500 },
    );
  }
};
