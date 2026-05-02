import 'server-only';

import { createAuthApi } from '@workspace/api';
import { envConfig } from '@workspace/config/env';

/**
 * Creates an instance of the backend AuthApi client for the BFF,
 * securely forwarding the client's original IP address.
 */
export const createBffAuthClient = (request: Request) => {
  const forwarded = request.headers.get('x-forwarded-for');
  const cookie = request.headers.get('cookie');
  const userAgent = request.headers.get('user-agent');

  // X-Forwarded-For can be a comma-separated list of IPs.
  // The first one is the original client IP.
  const clientIp = forwarded ? forwarded.split(',')[0].trim() : '127.0.0.1';

  return createAuthApi({
    type: envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
    endpoint: envConfig.NEXT_PUBLIC_AUTH_BACKEND_URL,
    options: {
      headers: {
        'X-Forwarded-For': clientIp,
        ...(cookie ? { Cookie: cookie } : {}),
        ...(userAgent ? { 'User-Agent': userAgent } : {}),
      },
    },
  });
};
