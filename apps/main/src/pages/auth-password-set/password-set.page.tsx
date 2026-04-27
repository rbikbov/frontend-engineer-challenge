'use client';

import React from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { AUTH_LINKS } from '@workspace/constants';
import {
  AuthContentLayout,
  AuthCenteredLayout,
} from '@workspace/ui/layouts/auth';

import { PasswordSetForm, usePasswordSetForm } from '@features/auth';

import { PasswordSetErrorPage } from './password-set-error.page';
import { PasswordSetSuccessPage } from './password-set-success.page';

export function PasswordSetPage() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [resetData] = React.useState<{ email: string; token: string } | null>(
    () => {
      const email = searchParams?.get('email');
      const token = searchParams?.get('token');
      return email && token ? { email, token } : null;
    },
  );

  const [showFatalView, setShowFatalView] = React.useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = React.useState(false);

  const { form, onSubmit, isLoading } = usePasswordSetForm({
    email: resetData?.email || null,
    token: resetData?.token || null,
    onSuccess: () => {
      setIsSubmitSuccessful(true);
    },
    onFatalError: () => {
      setShowFatalView(true);
    },
  });

  React.useEffect(() => {
    if (resetData) {
      // Очищаем URL от токенов после их сохранения в стейт,
      // чтобы токен не остался в истории браузера
      router.replace(AUTH_LINKS.PASSWORD_SET);
    }
  }, [resetData, router]);

  if (isSubmitSuccessful && !showFatalView) {
    return <PasswordSetSuccessPage />;
  }

  if (showFatalView) {
    return (
      <PasswordSetErrorPage onRetryClick={() => setShowFatalView(false)} />
    );
  }

  return (
    <AuthCenteredLayout>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title="Задайте пароль"
        description="Напишите новый пароль, который будете использовать для входа"
      >
        <PasswordSetForm form={form} onSubmit={onSubmit} loading={isLoading} />
      </AuthContentLayout>
    </AuthCenteredLayout>
  );
}
