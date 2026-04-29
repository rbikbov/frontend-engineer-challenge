import { SignInPage } from '@pages/auth-sign-in';

export const metadata = {
  title: 'Вход | Orbitto',
  description:
    'Войдите в свою учетную запись Orbitto, чтобы получить доступ к панели управления и инструментам.',
};

export default function SignIn() {
  return <SignInPage />;
}
