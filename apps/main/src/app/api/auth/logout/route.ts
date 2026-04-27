import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { COOKIE_KEYS } from '@workspace/constants';

export async function POST() {
  try {
    const cookieStore = await cookies();

    cookieStore.delete(COOKIE_KEYS.ACCESS_TOKEN);
    cookieStore.delete(COOKIE_KEYS.REFRESH_TOKEN);

    return NextResponse.json({ success: true }, { status: 200 });
  } catch (error) {
    // TODO: сделать лучше обработку ошибок
    return NextResponse.json(
      { message: (error as Error).message || 'Internal Server Error' },
      { status: 500 },
    );
  }
}
