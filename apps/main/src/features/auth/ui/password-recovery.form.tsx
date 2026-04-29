import { UseFormReturn } from 'react-hook-form';

import { PasswordRecoverySchemaType } from '@workspace/api';
import { FIELD_NAMES } from '@workspace/constants';
import { Button, Input } from '@workspace/ui';

interface PasswordRecoveryFormProps {
  form: UseFormReturn<PasswordRecoverySchemaType>;
  onSubmit: (data: PasswordRecoverySchemaType) => void;
  loading: boolean;
}

export function PasswordRecoveryForm({
  form,
  onSubmit,
  loading,
}: PasswordRecoveryFormProps) {
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = form;

  return (
    <form
      aria-label="password-recovery-form"
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
        error={errors.email?.message || errors.root?.message}
        disabled={loading}
      />

      <div className="pt-2">
        <Button
          variant="secondaryMain"
          className="w-full"
          type="submit"
          disabled={loading}
        >
          {loading ? 'Загрузка...' : 'Восстановить пароль'}
        </Button>
      </div>
    </form>
  );
}
