'use client';

import React from 'react';

import { AUTH_LINKS } from '@workspace/constants';
import { Button, AppLink } from '@workspace/ui/components';
import {
  AuthContentLayout,
  AuthCenteredLayout,
} from '@workspace/ui/layouts/auth';

export function PasswordSetSuccessPage() {
  return (
    <AuthCenteredLayout>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title="Пароль был восстановлен"
        description="Перейдите на страницу авторизации, чтобы войти в систему с новым паролем"
      >
        <div className="pt-2">
          <Button variant="secondaryMain" className="w-full" asChild>
            <AppLink href={AUTH_LINKS.SIGN_IN}>Назад в авторизацию</AppLink>
          </Button>
        </div>
      </AuthContentLayout>
    </AuthCenteredLayout>
  );
}
