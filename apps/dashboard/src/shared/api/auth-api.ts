import { ApiType, createAuthApi } from '@workspace/api';

export const authApi = createAuthApi({
  type: process.env.NEXT_PUBLIC_AUTH_BACKEND_TYPE as ApiType,
  endpoint: process.env.NEXT_PUBLIC_AUTH_BACKEND_URL as string,
});
