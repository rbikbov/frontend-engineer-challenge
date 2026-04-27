import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@workspace/constants';

import { logger } from '@shared/lib';

export async function POST() {
  try {
    logger.info('[BFF] Logout attempt');
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
    cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);

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
}
