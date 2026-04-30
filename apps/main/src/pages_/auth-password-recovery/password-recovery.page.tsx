'use client';

import React from 'react';

import { useRouter } from 'next/navigation';

import { AUTH_LINKS } from '@workspace/constants';
import { Button, AppLink } from '@workspace/ui/components';
import { ChevronLeftIcon } from '@workspace/ui/icons';
import {
  AuthContentLayout,
  AuthCenteredLayout,
} from '@workspace/ui/layouts/auth';

import { PasswordRecoveryForm, usePasswordRecoveryForm } from '@features/auth';

// [DEV ONLY] Заглушка для демонстрации флоу восстановления пароля.
// Бэкенд не поддерживает отправку писем, поэтому токен возвращается напрямую в ответе.
// В production этот блок заменяется реальной отправкой письма через SMTP.
const devConfirmationBuilder = async (token: string, email: string) => {
  if (token && email) {
    const link = new URL(AUTH_LINKS.PASSWORD_SET, window.location.origin);
    link.searchParams.append('email', email);
    link.searchParams.append('token', token);
    if (
      confirm(
        `[DEV] Письмо не отправлено — бэкенд не реализован.\n\nНажмите ОК, чтобы скопировать ссылку на сброс пароля в буфер обмена, затем откройте её в браузере:\n\n${link}`,
      )
    ) {
      try {
        await navigator.clipboard.writeText(String(link));
        alert(
          'Ссылка скопирована! Вставьте её в адресную строку браузера, чтобы задать новый пароль.',
        );
      } catch (error) {
        // eslint-disable-next-line no-console
        console.error('Ошибка при копировании в буфер обмена:', error);
      }
    }
  }
};

export function PasswordRecoveryPage() {
  const router = useRouter();

  const { form, onSubmit, isLoading } = usePasswordRecoveryForm({
    onSuccess: async ({ token, email }: { token: string; email: string }) => {
      await devConfirmationBuilder(token, email);
      router.push(AUTH_LINKS.PASSWORD_RECOVERY_SUCCESS);
    },
  });

  return (
    <AuthCenteredLayout>
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
              <span className="align-middle">Восстановление пароля</span>
            </AppLink>
          </Button>
        }
        description="Укажите адрес почты на который был зарегистрирован аккаунт"
      >
        <PasswordRecoveryForm
          form={form}
          onSubmit={onSubmit}
          loading={isLoading}
        />
      </AuthContentLayout>
    </AuthCenteredLayout>
  );
}
