'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useRequestPasswordResetMutation,
  PasswordRecoverySchema,
  type PasswordRecoverySchemaType,
  extractErrorFields,
} from '@workspace/api';
import { AUTH_ERROR_MESSAGES } from '@workspace/constants';

import { logger, setFormErrors } from '@shared/lib';

interface UsePasswordRecoveryFormProps {
  onSuccess: ({ token, email }: { token: string; email: string }) => void;
}

export function usePasswordRecoveryForm({
  onSuccess,
}: UsePasswordRecoveryFormProps) {
  const mutation = useRequestPasswordResetMutation();

  const form = useForm<PasswordRecoverySchemaType>({
    resolver: zodResolver(PasswordRecoverySchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: PasswordRecoverySchemaType) => {
    logger.info('[Auth] Password recovery requested', { email: data.email });
    mutation.mutate(data.email, {
      onSuccess: (
        response: { success: boolean; token?: string; email?: string },
        variables: string,
      ) => {
        const email = variables;
        logger.info('[Auth] Password recovery request successful', { email });
        onSuccess({ token: response.token || '', email });
      },
      onError: (error) => {
        logger.error('[Auth] Password recovery request failed', {
          error: error.message,
          type: error.constructor.name,
        });
        const fields = extractErrorFields(
          error,
          AUTH_ERROR_MESSAGES.GENERIC_ERROR,
        );
        setFormErrors(form, fields);
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
}
