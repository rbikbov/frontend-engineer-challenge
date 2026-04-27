'use client';

import React, { ReactNode } from 'react';

import { createStrictContext, useStrictContext } from '@workspace/lib';

import type { AuthApi } from '../contract/auth-api.interface';

const AuthApiContext = createStrictContext<AuthApi>();

interface AuthApiProviderProps {
  children: ReactNode;
  api: AuthApi;
}

export const AuthApiProvider: React.FC<AuthApiProviderProps> = ({
  children,
  api,
}) => {
  return (
    <AuthApiContext.Provider value={api}>{children}</AuthApiContext.Provider>
  );
};

export const useAuthApi = () => {
  const context = useStrictContext(AuthApiContext);
  return context;
};
