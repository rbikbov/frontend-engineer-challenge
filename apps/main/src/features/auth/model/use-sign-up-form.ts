'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useRegisterMutation,
  SignUpSchema,
  type SignUpSchemaType,
  extractErrorFields,
} from '@workspace/api';
import { AUTH_ERROR_MESSAGES } from '@workspace/constants';

import { logger, setFormErrors } from '@shared/lib';

interface UseSignUpFormProps {
  onSuccess: () => void;
}

export function useSignUpForm({ onSuccess }: UseSignUpFormProps) {
  const registerMutation = useRegisterMutation();

  const form = useForm<SignUpSchemaType>({
    resolver: zodResolver(SignUpSchema),
    mode: 'onSubmit',
    reValidateMode: 'onSubmit',
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
        const fields = extractErrorFields(
          error,
          AUTH_ERROR_MESSAGES.SIGN_UP_FAILED,
        );
        setFormErrors(form, fields);
      },
    });
  };

  return {
    form,
    onSubmit,
    isLoading: registerMutation.isPending,
  };
}
