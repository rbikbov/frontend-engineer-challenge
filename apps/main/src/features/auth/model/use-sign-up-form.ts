'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useRegisterMutation,
  ApiError,
  NetworkError,
  SignUpSchema,
  type SignUpSchemaType,
} from '@workspace/api';
import { AUTH_ERROR_MESSAGES, ROOT_FIELD } from '@workspace/constants';

import { logger } from '@shared/lib/logger';

interface UseSignUpFormProps {
  onSuccess: () => void;
}

export function useSignUpForm({ onSuccess }: UseSignUpFormProps) {
  const registerMutation = useRegisterMutation();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
      confirmPassword: '',
    },
  });

  const onSubmit = (data: SignUpSchemaType) => {
    logger.info('[Auth] Registration submission started', {
      email: data.email,
    });
    // TODO: eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { confirmPassword: _, ...registerData } = data;

    registerMutation.mutate(registerData, {
      onSuccess: () => {
        logger.info('[Auth] Registration successful', { email: data.email });
        onSuccess();
      },
      onError: (error) => {
        logger.error('[Auth] Registration failed', {
          error: error.message,
          type: error.constructor.name,
        });
        if (error instanceof ApiError) {
          Object.entries(error.fields).forEach(([field, message]) => {
            form.setError(
              field === ROOT_FIELD ? 'root' : (field as keyof SignUpSchemaType),
              { message },
            );
          });
        } else {
          form.setError('root', {
            message:
              error instanceof NetworkError
                ? error.message
                : AUTH_ERROR_MESSAGES.SIGN_UP_FAILED,
          });
        }
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: registerMutation.isPending,
  };
}
