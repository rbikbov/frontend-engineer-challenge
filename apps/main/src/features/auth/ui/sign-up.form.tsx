import { UseFormReturn } from 'react-hook-form';

import { SignUpSchemaType } from '@workspace/api';
import { FIELD_NAMES, LEGAL_LINKS } from '@workspace/constants';
import { InputPassword, Button, Input } from '@workspace/ui';

interface SignUpFormProps {
  form: UseFormReturn<SignUpSchemaType>;
  onSubmit: (data: SignUpSchemaType) => void;
  loading: boolean;
}

export const SignUpForm = ({ form, onSubmit, loading }: SignUpFormProps) => {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <Input
        label="Введите e-mail"
        placeholder="Введите e-mail"
        type="email"
        autoComplete="email"
        {...register(FIELD_NAMES.EMAIL)}
        error={errors.email?.message}
      />

      <InputPassword
        label="Введите пароль"
        placeholder="Введите пароль"
        autoComplete="new-password"
        {...register(FIELD_NAMES.PASSWORD)}
        error={errors.password?.message}
      />

      <InputPassword
        label="Повторите пароль"
        placeholder="Повторите пароль"
        autoComplete="new-password"
        {...register(FIELD_NAMES.CONFIRM_PASSWORD)}
        error={errors.confirmPassword?.message}
      />

      {errors.root && (
        <p className="text-invalid text-caption transition-all">
          {errors.root.message}
        </p>
      )}

      <div className="pt-2">
        <Button
          variant="primary"
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Регистрация...' : 'Зарегистрироваться'}
        </Button>
      </div>

      <p className="text-small text-disabled pt-2 pb-4 text-center">
        Зарегистрировавшись пользователь принимает условия{' '}
        <a
          href={LEGAL_LINKS.AGREEMENT}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary underline"
        >
          договора оферты
        </a>{' '}
        и{' '}
        <a
          href={LEGAL_LINKS.PRIVACY}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary underline"
        >
          политики конфиденциальности
        </a>
      </p>
    </form>
  );
};
