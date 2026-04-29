import { SignUpPage } from '@pages/auth-sign-up';

export const metadata = {
  title: 'Регистрация | Orbitto',
  description:
    'Создайте учетную запись в Orbitto и начните использовать нашу платформу прямо сейчас.',
};

export default function SignUp() {
  return <SignUpPage />;
}
