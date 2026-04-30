'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { AUTH_LINKS } from '@workspace/constants';
import { AppLink } from '@workspace/ui/components';
import { AuthContentLayout } from '@workspace/ui/layouts/auth';

import { SignUpForm, useSignUpForm } from '@features/auth';

export function SignUpPage() {
  const router = useRouter();

  const { form, onSubmit, isLoading } = useSignUpForm({
    onSuccess: () => {
      router.push(AUTH_LINKS.SIGN_IN);
    },
  });

  return (
    <>
      <AuthContentLayout
        title="Регистрация в системе"
        contentClassName="max-w-[400px]"
        footer={
          <p className="text-button text-foreground-secondary">
            Уже есть аккаунт?{' '}
            <AppLink
              href={AUTH_LINKS.SIGN_IN}
              className="text-brand font-medium hover:underline"
            >
              Войти
            </AppLink>
          </p>
        }
      >
        <SignUpForm form={form} onSubmit={onSubmit} loading={isLoading} />
      </AuthContentLayout>
    </>
  );
}
