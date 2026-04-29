import { createAuthApi } from '@workspace/api';
import { envConfig } from '@workspace/config/env';

export const authApi = createAuthApi({
  type: envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
  endpoint: envConfig.NEXT_PUBLIC_AUTH_BACKEND_URL,
});
