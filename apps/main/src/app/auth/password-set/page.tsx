import React from 'react';

import { PasswordSetPage } from '@pages/auth-password-set';

export const metadata = {
  title: 'Установка нового пароля | Orbitto',
  description:
    'Придумайте и установите надежный пароль для вашей учетной записи Orbitto.',
};

export default function PasswordSet() {
  return <PasswordSetPage />;
}
