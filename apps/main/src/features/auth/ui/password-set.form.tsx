import { UseFormReturn } from 'react-hook-form';

import { PasswordSetSchemaType } from '@workspace/api';
import { FIELD_NAMES } from '@workspace/constants';
import { Button, InputPassword } from '@workspace/ui/components';

interface PasswordSetFormProps {
  form: UseFormReturn<PasswordSetSchemaType>;
  onSubmit: (data: PasswordSetSchemaType) => void;
  loading: boolean;
}

export function PasswordSetForm({
  form,
  onSubmit,
  loading,
}: PasswordSetFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  return (
    <form className="space-y-6" onSubmit={handleSubmit(onSubmit)}>
      <InputPassword
        label="Введите пароль"
        placeholder="Введите пароль"
        autoComplete="new-password"
        {...register(FIELD_NAMES.PASSWORD)}
        error={errors.password?.message}
        disabled={loading}
      />

      <InputPassword
        label="Повторите пароль"
        placeholder="Повторите пароль"
        autoComplete="new-password"
        {...register(FIELD_NAMES.CONFIRM_PASSWORD)}
        error={errors.confirmPassword?.message}
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
          {loading ? 'Загрузка...' : 'Изменить пароль'}
        </Button>
      </div>
    </form>
  );
}
