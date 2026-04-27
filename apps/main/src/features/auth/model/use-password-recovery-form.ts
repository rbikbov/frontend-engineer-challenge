'use client';

import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  useRequestPasswordResetMutation,
  ApiError,
  NetworkError,
  PasswordRecoverySchema,
  type PasswordRecoverySchemaType,
} from '@workspace/api';
import { AUTH_ERROR_MESSAGES, ROOT_FIELD } from '@workspace/constants';

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
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
    },
  });

  const onSubmit = (data: PasswordRecoverySchemaType) => {
    mutation.mutate(data.email, {
      onSuccess: (
        response: { success: boolean; token?: string; email?: string },
        variables: string,
      ) => {
        const email = variables;
        /*
        В текущей реализации всегда успех
        if (response.success && response.token && email) {
          onSuccess({ token: response.token, email });
        }
        */
        onSuccess({ token: response.token || '', email });
      },
      onError: (error) => {
        if (error instanceof ApiError) {
          Object.entries(error.fields).forEach(([field, message]) => {
            form.setError(
              field === ROOT_FIELD
                ? 'root'
                : (field as keyof PasswordRecoverySchemaType),
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
    });
  };

  return {
    form,
    onSubmit,
    isLoading: mutation.isPending,
  };
}
