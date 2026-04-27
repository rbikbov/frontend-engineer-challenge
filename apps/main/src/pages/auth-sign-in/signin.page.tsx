'use client';

import React, { useState } from 'react';

import { useSearchParams } from 'next/navigation';

import { AUTH_LINKS, DASHBOARD_LINKS } from '@workspace/constants';
import { AppLink } from '@workspace/ui/components';
import { AuthContentLayout } from '@workspace/ui/layouts/auth';
import { AuthSplittedLayout } from '@workspace/ui/layouts/auth/splitted.layout';

import { SignInForm, useSignInForm } from '@features/auth';

export function SignInPage() {
  const searchParams = useSearchParams();
  const callbackUrl = searchParams?.get('callbackUrl') || DASHBOARD_LINKS.ROOT;
  const [isRedirecting, setIsRedirecting] = useState(false);

  const { form, onSubmit, isLoading } = useSignInForm({
    onSuccess: () => {
      setIsRedirecting(true);
      window.location.href = callbackUrl;
    },
  });

  return (
    <AuthSplittedLayout>
      <AuthContentLayout
        title="Войти в систему"
        contentClassName="max-w-[400px]"
        footer={
          <p className="text-button text-foreground-secondary">
            Еще не зарегистрированы?{' '}
            <AppLink
              href={AUTH_LINKS.SIGN_UP}
              className="text-brand font-medium hover:underline"
            >
              Зарегистрироваться
            </AppLink>
          </p>
        }
      >
        <SignInForm
          form={form}
          onSubmit={onSubmit}
          loading={isLoading || isRedirecting}
        />
      </AuthContentLayout>
    </AuthSplittedLayout>
  );
}
