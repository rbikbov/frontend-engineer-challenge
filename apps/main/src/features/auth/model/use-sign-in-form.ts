'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useBffLoginMutation,
  ApiError,
  NetworkError,
  SignInSchema,
  type SignInSchemaType,
} from '@workspace/api';
import {
  AUTH_ERROR_MESSAGES,
  ROOT_FIELD,
  QUERY_KEYS,
} from '@workspace/constants';

import { logger } from '@shared/lib';

interface UseSignInFormProps {
  onSuccess: () => void;
}

export function useSignInForm({ onSuccess }: UseSignInFormProps) {
  const queryClient = useQueryClient();
  const loginMutation = useBffLoginMutation();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInSchemaType) => {
    logger.info('[Auth] Login submission started', { email: data.email });
    loginMutation.mutate(data, {
      onSuccess: async () => {
        logger.info('[Auth] Login successful', { email: data.email });
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ME] });
        onSuccess();
      },
      onError: (error) => {
        logger.error('[Auth] Login failed', {
          error: error.message,
          type: error.constructor.name,
        });
        if (error instanceof ApiError) {
          Object.entries(error.fields).forEach(([field, message]) => {
            form.setError(
              field === ROOT_FIELD ? 'root' : (field as keyof SignInSchemaType),
              { message },
            );
          });
        } else {
          form.setError('root', {
            message:
              error instanceof NetworkError
                ? error.message
                : AUTH_ERROR_MESSAGES.SIGN_IN_FAILED,
          });
        }
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
