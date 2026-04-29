'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useResetPasswordMutation,
  ApiError,
  NetworkError,
  PasswordSetSchema,
  type PasswordSetSchemaType,
} from '@workspace/api';
import { AUTH_ERROR_MESSAGES, ROOT_FIELD } from '@workspace/constants';

import { logger } from '@shared/lib';

interface UsePasswordSetFormProps {
  email: string | null;
  token: string | null;
  onSuccess: () => void;
  onFatalError: (message: string) => void;
}

export function usePasswordSetForm({
  email,
  token,
  onSuccess,
  onFatalError,
}: UsePasswordSetFormProps) {
  const mutation = useResetPasswordMutation();

  const form = useForm<PasswordSetSchemaType>({
    resolver: zodResolver(PasswordSetSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: PasswordSetSchemaType) => {
    logger.info('[Auth] Password reset attempt', { email });
    if (!email || !token) {
      logger.warn(
        '[Auth] Password reset attempted with missing email or token',
      );
      form.setError('root', { message: AUTH_ERROR_MESSAGES.INVALID_LINK });
      return;
    }

    mutation.mutate(
      {
        email,
        token,
        newPassword: data.password,
      },
      {
        onSuccess: () => {
          logger.info('[Auth] Password reset successful', { email });
          onSuccess();
        },
        onError: (error) => {
          logger.error('[Auth] Password reset failed', {
            email,
            error: error.message,
            type: error.constructor.name,
          });
          if (error instanceof ApiError) {
            if (error.message.includes('истек')) {
              onFatalError(error.message);
              return;
            }

            Object.entries(error.fields).forEach(([field, message]) => {
              form.setError(
                field === ROOT_FIELD
                  ? 'root'
                  : (field as keyof PasswordSetSchemaType),
                { message },
              );
            });
          } else {
            form.setError('root', {
              message:
                error instanceof NetworkError
                  ? error.message
                  : AUTH_ERROR_MESSAGES.GENERIC_ERROR,
            });
          }
        },
      },
    );
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
}
