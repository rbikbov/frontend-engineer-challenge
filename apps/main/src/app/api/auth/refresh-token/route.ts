import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createAuthApi } from '@workspace/api';
import { COOKIE_KEYS } from '@workspace/constants';

import { envConfig } from '@shared/config/env';

export async function POST(request: Request) {
  try {
    const cookieStore = await cookies();
    const refreshToken = cookieStore.get(COOKIE_KEYS.REFRESH_TOKEN)?.value;

    if (!refreshToken) {
      throw new Error('No refresh token');
    }
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';

    const authApi = createAuthApi({
      type: envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
      endpoint: envConfig.NEXT_PUBLIC_AUTH_BACKEND_URL,
      options: {
        headers: {
          'X-Forwarded-For': clientIp,
        },
      },
    });

    const newTokens = await authApi.refreshToken(refreshToken);

    const response = NextResponse.json({ success: true });

    cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, newTokens.accessToken, {
      httpOnly: true,
      secure: envConfig.NEXT_PUBLIC_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    cookieStore.set(COOKIE_KEYS.REFRESH_TOKEN, newTokens.refreshToken, {
      httpOnly: true,
      secure: envConfig.NEXT_PUBLIC_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    // TODO: сделать лучше обработку ошибок
    return NextResponse.json(
      { error: (error as Error).message || 'Ошибка обновления токенов' },
      { status: 401 },
    );
  }
}
