'use client';

import { useEffect, useState } from 'react';
import { initMocks } from '@workspace/api';
import { envConfig } from '@shared/config/env';

export function MSWProvider({ children }: { children: React.ReactNode }) {
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const shouldEnableMocks =
      envConfig.NEXT_PUBLIC_AUTH_BACKEND_TYPE === 'graphql' &&
      process.env.NODE_ENV === 'development';

    if (shouldEnableMocks) {
      initMocks().then(() => setIsReady(true));
    } else {
      setIsReady(true);
    }
  }, []);

  if (!isReady) return null;

  return <>{children}</>;
}
