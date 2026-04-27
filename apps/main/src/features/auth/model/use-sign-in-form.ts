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

interface UseSignInFormProps {
  onSuccess: () => void;
}

export function useSignInForm({ onSuccess }: UseSignInFormProps) {
  const queryClient = useQueryClient();
  const loginMutation = useBffLoginMutation();

  const form = useForm<SignInSchemaType>({
    resolver: zodResolver(SignInSchema),
    mode: 'onSubmit',
    reValidateMode: 'onChange',
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const onSubmit = (data: SignInSchemaType) => {
    loginMutation.mutate(data, {
      onSuccess: async () => {
        // 1. Инвалидируем сессию, чтобы React Query обновил данные пользователя
        // В нашем случае BFF при логине уже мог вернуть пользователя,
        // но мы следуем флоу "принудительного обновления" для надежности.
        await queryClient.invalidateQueries({ queryKey: [QUERY_KEYS.USER_ME] });

        // 2. Вызываем колбек (редирект)
        onSuccess();
      },
      onError: (error) => {
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
