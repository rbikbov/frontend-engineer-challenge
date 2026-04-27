'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  UseQueryOptions,
} from '@tanstack/react-query';

import {
  BFF_LINKS,
  AUTH_ERROR_MESSAGES,
  ROOT_FIELD,
  QUERY_KEYS,
} from '@workspace/constants';
import { isClient } from '@workspace/lib';

import { User } from '../contract/auth.dto';
import { useAuthApi } from '../providers/auth-api.provider';

interface ErrorInfo {
  message: string | ((...args: (string | number)[]) => string);
  field?: string;
}

interface DynamicErrorInfo extends ErrorInfo {
  pattern: RegExp;
}

const dynamicErrorMatchers: DynamicErrorInfo[] = [
  {
    pattern: /password must be at least (\d+) characters/i,
    field: 'password',
    message: (min: string) => AUTH_ERROR_MESSAGES.PASSWORD_MIN_LENGTH(min),
  },
];

const errorMap = new Map<string, ErrorInfo>([
  // sign-up
  [
    'email already registered',
    { message: AUTH_ERROR_MESSAGES.EMAIL_TAKEN, field: 'email' },
  ],
  [
    'invalid email: invalid email format',
    { message: AUTH_ERROR_MESSAGES.INVALID_EMAIL, field: 'email' },
  ],
  // sign-in
  [
    'invalid credentials',
    { message: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS, field: 'password' },
  ],
  // в текущей реализации бекенда не используется
  // // reset-password
  // [
  //   'user not found',
  //   { message: AUTH_ERROR_MESSAGES.EMAIL_NOT_FOUND, field: 'email' },
  // ],
  // set-password
  [
    'password reset failed: reset token is expired or already used',
    { message: AUTH_ERROR_MESSAGES.TOKEN_EXPIRED, field: ROOT_FIELD },
  ],
  // other
  [
    'too many reset attempts, please try again later',
    { message: AUTH_ERROR_MESSAGES.TOO_MANY_ATTEMPTS },
  ],
]);

export const isNetworkStatusError = (error: unknown): boolean => {
  if (isClient() && !window.navigator.onLine) return true;
  if (error && typeof error === 'object' && 'message' in error) {
    const message = String(
      (error as { message: unknown }).message,
    ).toLowerCase();
    return (
      message.includes('failed to fetch') || message.includes('network error')
    );
  }
  return false;
};

const getAllErrors = (error: {
  errors?: { message: string }[];
  message?: string;
  error?: string;
}): Record<string, string> => {
  const fields: Record<string, string> = {};
  const messages: string[] = [];
  if (Array.isArray(error?.errors)) {
    error.errors.forEach((err) => {
      if (err.message) messages.push(err.message.toLowerCase());
    });
  } else if (error?.message) {
    messages.push(error.message.toLowerCase());
  } else if (error?.error) {
    messages.push(error.error.toLowerCase());
  }
  messages.forEach((msg) => {
    // 1. Сначала проверяем динамические паттерны (регулярки)
    for (const matcher of dynamicErrorMatchers) {
      const match = msg.match(matcher.pattern);
      if (match) {
        const field = matcher.field || ROOT_FIELD;
        const message =
          typeof matcher.message === 'function'
            ? matcher.message(...match.slice(1))
            : matcher.message;
        fields[field] = message;
        return; // Переходим к следующему сообщению
      }
    }

    // 2. Затем проверяем статический маппинг
    for (const [key, info] of errorMap.entries()) {
      if (msg.includes(key)) {
        const field = info.field || ROOT_FIELD;
        const message =
          typeof info.message === 'function'
            ? (info.message as () => string)()
            : info.message;
        fields[field] = message as string;
      }
    }
  });
  return fields;
};

export class NetworkError extends Error {
  constructor(public originalError: unknown) {
    super(AUTH_ERROR_MESSAGES.NETWORK);
    this.name = 'NetworkError';
  }
}

export class ApiError extends Error {
  public fields: Record<string, string> = {};
  constructor(public originalError: unknown) {
    const fields = getAllErrors(
      originalError as { errors?: { message: string }[]; message?: string },
    );
    const firstMessage =
      Object.values(fields)[0] || AUTH_ERROR_MESSAGES.DEFAULT;
    super(firstMessage);
    this.name = 'ApiError';
    this.fields = fields;
  }
}

const handleMutationError = (err: unknown) => {
  if (isNetworkStatusError(err)) throw new NetworkError(err);
  throw new ApiError(err);
};

export const useLoginMutation = () => {
  const api = useAuthApi();
  return useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      try {
        return await api.login(params.email, params.password);
      } catch (err) {
        return handleMutationError(err);
      }
    },
  });
};

export const useBffLoginMutation = () => {
  return useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      const response = await fetch(BFF_LINKS.LOGIN, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(params),
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        throw new ApiError(errorData);
      }

      return response.json();
    },
  });
};

export const useRegisterMutation = () => {
  const api = useAuthApi();
  return useMutation({
    mutationFn: async (params: { email: string; password: string }) => {
      try {
        return await api.register(params.email, params.password);
      } catch (err) {
        return handleMutationError(err);
      }
    },
  });
};

export const useMeQuery = (
  options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>,
) => {
  const api = useAuthApi();
  return useQuery({
    queryKey: [QUERY_KEYS.USER_ME],
    queryFn: () => api.me(),
    ...options,
  });
};

export const useLogoutMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const api = useAuthApi();
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (token?: string) => {
      try {
        return await api.logout(token || '');
      } catch (err) {
        return handleMutationError(err);
      }
    },
    onSuccess: () => {
      queryClient.setQueryData([QUERY_KEYS.USER_ME], null);
      queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ME] });
      onSuccess?.();
    },
  });
};

export const useRequestPasswordResetMutation = () => {
  const api = useAuthApi();
  return useMutation({
    mutationFn: async (email: string) => {
      try {
        return await api.requestPasswordReset(email);
      } catch (err) {
        return handleMutationError(err);
      }
    },
  });
};

export const useResetPasswordMutation = () => {
  const api = useAuthApi();
  return useMutation({
    mutationFn: async ({
      email,
      token,
      newPassword,
    }: {
      email: string;
      token: string;
      newPassword: string;
    }) => {
      try {
        return await api.resetPassword(email, token, newPassword);
      } catch (err) {
        return handleMutationError(err);
      }
    },
  });
};
