'use client';

import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useMemo } from 'react';

import { AuthApiProvider } from '@workspace/api';

import { Confirmation } from '@widgets/confirmation';

import { authApi } from '@shared/api/auth-api';

export function Providers({ children }: { children: React.ReactNode }) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            networkMode: 'always',
            refetchOnWindowFocus: false,
            retry: false,
          },
          mutations: {
            networkMode: 'always',
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthApiProvider api={authApi}>
        <Confirmation>{children}</Confirmation>
      </AuthApiProvider>
    </QueryClientProvider>
  );
}
