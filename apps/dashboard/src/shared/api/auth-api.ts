import { createAuthApi } from '@workspace/api';
import { envConfig } from '@workspace/config/env';
import { BFF_LINKS } from '@workspace/constants';
import { isClient } from '@workspace/lib';

export const authApi = createAuthApi({
  type: envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
  endpoint: envConfig.NEXT_PUBLIC_AUTH_BACKEND_URL,
  options: {
    onRefreshSession: async () => {
      if (!isClient()) return false;
      const res = await fetch(`${window.location.origin}${BFF_LINKS.REFRESH}`, {
        method: 'POST',
        credentials: 'include',
      });
      return res.ok;
    },
  },
});
