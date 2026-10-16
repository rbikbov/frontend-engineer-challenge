'use client';

import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { useMemo } from 'react';

import { AuthApiProvider } from '@workspace/api';

import { authApi } from '@shared/api/auth-api';

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const queryClient = useMemo(
    () =>
      new QueryClient({
        defaultOptions: {
          queries: {
            staleTime: Infinity,
            refetchOnWindowFocus: false,
            refetchOnMount: false,
            retry: 0, // Auth requests should not be retried automatically
            networkMode: 'always',
          },
          mutations: {
            retry: 0, // Auth requests should not be retried automatically
            networkMode: 'always',
          },
        },
      }),
    [],
  );

  return (
    <QueryClientProvider client={queryClient}>
      <AuthApiProvider api={authApi}>{children}</AuthApiProvider>
    </QueryClientProvider>
  );
}
