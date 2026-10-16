'use client';

import React from 'react';

import { AUTH_LINKS } from '@workspace/constants';
import { Button, AppLink } from '@workspace/ui/components';
import { AuthContentLayout } from '@workspace/ui/layouts/auth';

export function PasswordSetSuccessPage() {
  return (
    <>
      <AuthContentLayout
        contentClassName="max-w-[480px]"
        title="Your password has been reset"
        description="Go to the sign-in page to sign in with your new password"
      >
        <div className="pt-2">
          <Button variant="secondaryMain" className="w-full" asChild>
            <AppLink href={AUTH_LINKS.SIGN_IN}>Back to sign in</AppLink>
          </Button>
        </div>
      </AuthContentLayout>
    </>
  );
}
