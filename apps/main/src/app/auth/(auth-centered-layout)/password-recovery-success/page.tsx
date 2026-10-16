import { PasswordRecoverySuccessPage } from '@pages/auth-password-recovery-success';

export const metadata = {
  title: 'Check your email | Orbitto',
  description:
    'Password recovery instructions have been sent to your email address.',
};

export default function PasswordRecoverySuccess() {
  return <PasswordRecoverySuccessPage />;
}
