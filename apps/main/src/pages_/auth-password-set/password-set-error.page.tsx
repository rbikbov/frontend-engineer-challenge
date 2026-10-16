'use client';

import React from 'react';

import { AUTH_LINKS } from '@workspace/constants';
import { Button, AppLink } from '@workspace/ui/components';
import { AuthContentLayout } from '@workspace/ui/layouts/auth';

interface PasswordSetErrorPageProps {
  onRetryClick: React.MouseEventHandler<HTMLButtonElement>;
}

export function PasswordSetErrorPage({
  onRetryClick,
}: PasswordSetErrorPageProps) {
  return (
    <>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title="Your password was not reset"
        description="For some reason we could not change your password. Please try again later."
      >
        <div className="pt-2">
          <Button variant="secondaryMain" className="w-full" asChild>
            <AppLink href={AUTH_LINKS.SIGN_IN}>Back to sign in</AppLink>
          </Button>
        </div>
        <div className="pt-2">
          <Button
            variant="tertiaryPrimary"
            className="w-full"
            onClick={onRetryClick}
          >
            Try again
          </Button>
        </div>
      </AuthContentLayout>
    </>
  );
}
