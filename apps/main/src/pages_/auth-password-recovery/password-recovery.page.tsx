'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { AUTH_LINKS } from '@workspace/constants';
import { Button, AppLink } from '@workspace/ui/components';
import { ChevronLeftIcon } from '@workspace/ui/icons';
import { AuthContentLayout } from '@workspace/ui/layouts/auth';

import { PasswordRecoveryForm, usePasswordRecoveryForm } from '@features/auth';

// [DEV ONLY] Заглушка для демонстрации флоу восстановления пароля.
// Бэкенд не поддерживает отправку писем, поэтому токен возвращается напрямую в ответе.
// В production этот блок заменяется реальной отправкой письма через SMTP.
const devConfirmationBuilder = async (token: string) => {
  if (token) {
    const link = new URL(AUTH_LINKS.PASSWORD_SET, window.location.origin);
    link.searchParams.append('token', token);
    if (
      confirm(
        `[DEV] The email was not sent: the backend does not implement it.\n\nClick OK to copy the password reset link to the clipboard, then open it in your browser:\n\n${link}`,
      )
    ) {
      try {
        await navigator.clipboard.writeText(String(link));
        alert(
          'Link copied! Paste it into the browser address bar to set a new password.',
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Failed to copy to clipboard:', error);
      }
    }
  }
};

export function PasswordRecoveryPage() {
  const router = useRouter();

  const { form, onSubmit, isLoading } = usePasswordRecoveryForm({
    onSuccess: async ({ token }: { token: string }) => {
      await devConfirmationBuilder(token);
      router.push(AUTH_LINKS.PASSWORD_RECOVERY_SUCCESS);
    },
  });

  return (
    <>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title=""
        titleBlock={
          <Button
            variant="linkWrapper"
            size="text"
            className="text-h1! block max-w-full whitespace-normal"
            asChild
          >
            <AppLink
              href={AUTH_LINKS.SIGN_IN}
              className="inline-block max-w-full wrap-break-word"
            >
              <ChevronLeftIcon className="mr-2 -mb-[2px] inline" />
              <span className="align-middle">Password recovery</span>
            </AppLink>
          </Button>
        }
        description="Enter the email address your account was registered with"
      >
        <PasswordRecoveryForm
          form={form}
          onSubmit={onSubmit}
          loading={isLoading}
        />
      </AuthContentLayout>
    </>
  );
}
