import { PasswordRecoveryPage } from '@pages/auth-password-recovery';

export const metadata = {
  title: 'Password recovery | Orbitto',
  description:
    'Forgot your password? Enter your email and we will help you regain access to your Orbitto account.',
};

export default function PasswordRecovery() {
  return <PasswordRecoveryPage />;
}
