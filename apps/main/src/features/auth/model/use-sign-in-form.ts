'use client';

import { useQueryClient } from '@tanstack/react-query';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useBffLoginMutation,
  SignInSchema,
  type SignInSchemaType,
  extractErrorFields,
} from '@workspace/api';
import { AUTH_ERROR_MESSAGES, QUERY_KEYS } from '@workspace/constants';

import { logger, setFormErrors } from '@shared/lib';

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
        const fields = extractErrorFields(
          error,
          AUTH_ERROR_MESSAGES.SIGN_IN_FAILED,
        );
        setFormErrors(form, fields);
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: loginMutation.isPending,
  };
}
