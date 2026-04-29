import { PasswordRecoveryPage } from '@pages/auth-password-recovery';

export const metadata = {
  title: 'Восстановление пароля | Orbitto',
  description:
    'Забыли пароль? Укажите свою почту, и мы поможем вам восстановить доступ к аккаунту Orbitto.',
};

export default function PasswordRecovery() {
  return <PasswordRecoveryPage />;
}
