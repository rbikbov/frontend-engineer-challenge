import 'server-only';

import { createAuthApi } from '@workspace/api';
import { envConfig } from '@workspace/config/env';

/**
 * Creates an instance of the backend AuthApi client for the BFF,
 * securely forwarding the client's original IP address.
 */
export const createBffAuthClient = (request: Request) => {
  const clientIp = request.headers.get('x-forwarded-for') || '127.0.0.1';

  return createAuthApi({
    type: envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
    endpoint: envConfig.NEXT_PUBLIC_AUTH_BACKEND_URL,
    options: {
      headers: {
        'X-Forwarded-For': clientIp,
      },
    },
  });
};
