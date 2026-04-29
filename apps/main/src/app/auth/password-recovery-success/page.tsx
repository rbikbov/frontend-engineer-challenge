import { PasswordRecoverySuccessPage } from '@pages/auth-password-recovery-success';

export const metadata = {
  title: 'Проверьте почту | Orbitto',
  description:
    'Инструкции по восстановлению пароля отправлены на ваш адрес электронной почты.',
};

export default function PasswordRecoverySuccess() {
  return <PasswordRecoverySuccessPage />;
}
