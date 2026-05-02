'use client';

import React from 'react';
import { Suspense } from 'react';

import { useRouter, useSearchParams } from 'next/navigation';

import { AUTH_LINKS } from '@workspace/constants';
import { AuthContentLayout } from '@workspace/ui/layouts/auth';

import { PasswordSetForm, usePasswordSetForm } from '@features/auth';

import { PasswordSetErrorPage } from './password-set-error.page';
import { PasswordSetSuccessPage } from './password-set-success.page';

function PasswordSetContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [resetData] = React.useState<{ token: string } | null>(() => {
    const token = searchParams?.get('token');
    return token ? { token } : null;
  });

  const [showFatalView, setShowFatalView] = React.useState(false);
  const [isSubmitSuccessful, setIsSubmitSuccessful] = React.useState(false);

  const { form, onSubmit, isLoading } = usePasswordSetForm({
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
    <>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title="Задайте пароль"
        description="Напишите новый пароль, который будете использовать для входа"
      >
        <PasswordSetForm form={form} onSubmit={onSubmit} loading={isLoading} />
      </AuthContentLayout>
    </>
  );
}

export function PasswordSetPage() {
  return (
    <Suspense
      fallback={
        <div className="text-foreground-secondary flex h-[200px] animate-pulse items-center justify-center text-sm">
          Загрузка...
        </div>
      }
    >
      <PasswordSetContent />
    </Suspense>
  );
}
