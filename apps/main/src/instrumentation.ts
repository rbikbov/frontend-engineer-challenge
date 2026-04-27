import { envConfig } from '@shared/config/env';

export async function register() {
  if (process.env.NEXT_RUNTIME === 'nodejs') {
    const shouldEnableMocks =
      envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE === 'msw' &&
      process.env.NODE_ENV === 'development';

    if (shouldEnableMocks) {
      const { initMocks } = await import('@workspace/api');
      await initMocks();
    }
  }
}
