import { SignInPage } from '@pages/auth-sign-in';

export const metadata = {
  title: 'Sign in | Orbitto',
  description:
    'Sign in to your Orbitto account to access the dashboard and tools.',
};

export default function SignIn() {
  return <SignInPage />;
}
