'use client';

import React from 'react';

import { AUTH_LINKS } from '@workspace/constants';
import { Button, AppLink } from '@workspace/ui/components';
import { AuthContentLayout } from '@workspace/ui/layouts/auth';

export function PasswordRecoverySuccessPage() {
  return (
    <>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title="Проверьте свою почту"
        description="Мы отправили на почту письмо с ссылкой для восстановления пароля"
      >
        <div className="pt-2">
          <Button variant="secondaryMain" className="w-full" asChild>
            <AppLink href={AUTH_LINKS.SIGN_IN}>Назад в авторизацию</AppLink>
          </Button>
        </div>
      </AuthContentLayout>
    </>
  );
}
