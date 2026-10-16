import React from 'react';

import { PasswordSetPage } from '@pages/auth-password-set';

export const metadata = {
  title: 'Set a new password | Orbitto',
  description: 'Choose a strong new password for your Orbitto account.',
};

export default function PasswordSet() {
  return <PasswordSetPage />;
}
