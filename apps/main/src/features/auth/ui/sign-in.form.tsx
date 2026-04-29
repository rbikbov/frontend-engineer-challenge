import { UseFormReturn } from 'react-hook-form';

import { SignInSchemaType } from '@workspace/api';
import { AUTH_LINKS, FIELD_NAMES } from '@workspace/constants';
import { AppLink, InputPassword, Button, Input } from '@workspace/ui';

interface SignInFormProps {
  form: UseFormReturn<SignInSchemaType>;
  onSubmit: (data: SignInSchemaType) => void;
  loading: boolean;
}

export const SignInForm = ({ form, onSubmit, loading }: SignInFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  return (
    <form
      aria-label="sign-in-form"
      className="space-y-6"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Введите e-mail"
        placeholder="Введите e-mail"
        type="email"
        autoComplete="email"
        {...register(FIELD_NAMES.EMAIL)}
        error={errors.email?.message}
        disabled={loading}
        hasError={!!errors.password?.message}
      />

      <InputPassword
        label="Введите пароль"
        placeholder="Введите пароль"
        autoComplete="current-password"
        {...register(FIELD_NAMES.PASSWORD)}
        error={errors.password?.message}
        disabled={loading}
      />

      {errors.root && (
        <p className="text-invalid text-caption">{errors.root.message}</p>
      )}

      <div className="pt-2">
        <Button
          variant="primary"
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Вход...' : 'Войти'}
        </Button>
      </div>

      <div className="pt-2">
        <Button
          variant="tertiaryPrimary"
          size="text"
          className="w-full"
          asChild
        >
          <AppLink href={AUTH_LINKS.PASSWORD_RECOVERY}>Забыли пароль?</AppLink>
        </Button>
      </div>
    </form>
  );
};
