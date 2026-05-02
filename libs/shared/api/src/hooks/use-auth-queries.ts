'use client';

import {
  useMutation,
  useQuery,
  useQueryClient,
  type UseQueryOptions,
} from '@tanstack/react-query';

import {
  AUTH_ERROR_MESSAGES,
  BFF_LINKS,
  QUERY_KEYS,
  ROOT_FIELD,
} from '@workspace/constants';

import { type User, type ResetRequestPayload } from '../contract/auth.dto';
import {
  ApiError,
  NetworkError,
  RateLimitError,
  ServiceUnavailableError,
} from '../contract/auth.errors';
import { useAuthApi } from '../providers/auth-api.provider';
import {
  isNetworkStatusError,
  isServiceUnavailableError,
} from '../utils/network-errors';

const handleBffError = (err: unknown) => {
  if (isServiceUnavailableError(err)) throw new ServiceUnavailableError(err);
  if (isNetworkStatusError(err)) throw new NetworkError(err);

  const bffError = err as {
    status?: number;
    fields?: Record<string, string>;
    message?: string;
    error?: string;
    retryAfter?: number;
  };

  if (bffError?.status === 429) {
    throw new RateLimitError(
      bffError.message ||
        bffError.error ||
        AUTH_ERROR_MESSAGES.TOO_MANY_ATTEMPTS,
      bffError.retryAfter,
      err,
    );
  }

  if (bffError?.fields && Object.keys(bffError.fields).length > 0) {
    throw new ApiError(bffError.fields, err);
  }

  const message = bffError?.message || bffError?.error || 'Unknown error';
  throw new ApiError({ [ROOT_FIELD]: message }, err);
};

export type AuthMutationError =
  | ApiError
  | RateLimitError
  | NetworkError
  | ServiceUnavailableError;

export const useBffLoginMutation = () => {
  return useMutation<
    unknown,
    AuthMutationError,
    { email: string; password: string }
  >({
    mutationFn: async (params: { email: string; password: string }) => {
      try {
        const response = await fetch(BFF_LINKS.LOGIN, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(params),
        });

        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          // Пробрасываем объект со статусом для надежной детекции в isNetworkStatusError
          throw { ...errorData, status: response.status };
        }

        return await response.json();
      } catch (err) {
        throw handleBffError(err);
      }
    },
  });
};

export const useRegisterMutation = () => {
  const api = useAuthApi();
  return useMutation<
    User,
    AuthMutationError,
    { email: string; password: string }
  >({
    mutationFn: async (params: { email: string; password: string }) => {
      return await api.register(params.email, params.password);
    },
  });
};

export const useMeQuery = (
  options?: Omit<UseQueryOptions<User>, 'queryKey' | 'queryFn'>,
) => {
  const api = useAuthApi();
  return useQuery<User, AuthMutationError | Error>({
    queryKey: [QUERY_KEYS.USER_ME],
    queryFn: () => api.me(),
    ...options,
  });
};

export const useBffLogoutMutation = ({
  onSuccess,
}: {
  onSuccess?: () => void;
}) => {
  const queryClient = useQueryClient();
  return useMutation<unknown, AuthMutationError, void>({
    mutationFn: async () => {
      try {
        const response = await fetch(BFF_LINKS.LOGOUT, { method: 'POST' });
        if (!response.ok) {
          const errorData = await response.json().catch(() => ({}));
          throw { ...errorData, status: response.status };
        }
        return await response.json();
      } catch (err) {
        throw handleBffError(err);
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
  return useMutation<ResetRequestPayload, AuthMutationError, string>({
    mutationFn: async (email: string) => {
      return await api.requestPasswordReset(email);
    },
  });
};

export const useResetPasswordMutation = () => {
  const api = useAuthApi();
  return useMutation<
    boolean,
    AuthMutationError,
    {
      email: string;
      token: string;
      newPassword: string;
    }
  >({
    mutationFn: async (params) => {
      return await api.resetPassword(
        params.email,
        params.token,
        params.newPassword,
      );
    },
  });
};
