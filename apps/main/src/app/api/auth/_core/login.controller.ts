import { NextResponse } from 'next/server';
import 'server-only';

import { logger } from '@shared/lib';

import { createBffAuthClient } from './create-auth-client';
import { createAuthErrorResponse } from './error-response';
import { setSessionCookies } from './session.service';

export const loginController = async (request: Request) => {
  try {
    const { email, password } = await request.json();
    logger.info('[BFF] Login attempt', { email });

    const authApi = createBffAuthClient(request);
    const { accessToken, refreshToken } = await authApi.login(email, password);

    await setSessionCookies(accessToken, refreshToken);

    return NextResponse.json({ success: true });
  } catch (error) {
    logger.error('[BFF] Login error', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });

    return createAuthErrorResponse(error);
  }
};
