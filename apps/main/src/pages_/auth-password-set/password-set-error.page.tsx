'use client';

import React from 'react';

import { AUTH_LINKS } from '@workspace/constants';
import { Button, AppLink } from '@workspace/ui/components';
import {
  AuthContentLayout,
  AuthCenteredLayout,
} from '@workspace/ui/layouts/auth';

interface PasswordSetErrorPageProps {
  onRetryClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function PasswordSetErrorPage({
  onRetryClick,
}: PasswordSetErrorPageProps) {
  return (
    <AuthCenteredLayout>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title="Пароль не был восстановлен"
        description="По каким-то причинам мы не смогли изменить ваш пароль. Попробуйте ещё раз через некоторое время."
      >
        <div className="pt-2">
          <Button variant="secondaryMain" className="w-full" asChild>
            <AppLink href={AUTH_LINKS.SIGN_IN}>Назад в авторизацию</AppLink>
          </Button>
        </div>
        <div className="pt-2">
          <Button
            variant="tertiaryPrimary"
            className="w-full"
            onClick={onRetryClick}
          >
            Попробовать заново
          </Button>
        </div>
      </AuthContentLayout>
    </AuthCenteredLayout>
  );
}
