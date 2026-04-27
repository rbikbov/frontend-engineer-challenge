import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { createAuthApi } from '@workspace/api';
import { COOKIE_KEYS } from '@workspace/constants';

import { envConfig } from '@shared/config/env';
import { logger } from '@shared/lib';

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();
    logger.info('[BFF] Login attempt', { email });

    // Получаем IP клиента для проброса
    const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';

    // Создаем API клиент с пробросом IP
    const authApi = createAuthApi({
      type: envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
      endpoint: envConfig.NEXT_PUBLIC_AUTH_BACKEND_URL,
      options: {
        headers: {
          'X-Forwarded-For': clientIp,
        },
      },
    });

    // Логинимся на реальном бекенде
    const { accessToken, refreshToken } = await authApi.login(email, password);

    const response = NextResponse.json({ success: true });
    const cookieStore = await cookies();

    // Сохраняем токены в HttpOnly куки
    cookieStore.set(COOKIE_KEYS.ACCESS_TOKEN, accessToken, {
      httpOnly: true,
      secure: envConfig.NEXT_PUBLIC_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    cookieStore.set(COOKIE_KEYS.REFRESH_TOKEN, refreshToken, {
      httpOnly: true,
      secure: envConfig.NEXT_PUBLIC_ENV === 'production',
      sameSite: 'strict',
      path: '/',
    });

    return response;
  } catch (error) {
    logger.error('[BFF] Login error', {
      message: (error as Error).message,
      stack: (error as Error).stack,
    });
    return NextResponse.json(
      { error: (error as Error).message || 'Ошибка авторизации' },
      { status: 401 },
    );
  }
}
