import { UseFormReturn } from 'react-hook-form';

import { SignUpSchemaType } from '@workspace/api';
import { FIELD_NAMES, LEGAL_LINKS } from '@workspace/constants';
import { InputPassword, Button, Input } from '@workspace/ui/components';

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
    <form
      aria-label="sign-up-form"
      className="space-y-6"
      noValidate
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        label="Email"
        placeholder="Enter your email"
        type="email"
        autoComplete="email"
        {...register(FIELD_NAMES.EMAIL)}
        error={errors.email?.message}
        errorTestId="email-error"
        hasError={!!errors.email?.message}
        disabled={loading}
      />

      <InputPassword
        label="Password"
        placeholder="Enter your password"
        autoComplete="new-password"
        {...register(FIELD_NAMES.PASSWORD)}
        error={errors.password?.message}
        errorTestId="password-error"
        hasError={!!errors.password?.message}
        disabled={loading}
      />

      <InputPassword
        label="Confirm password"
        placeholder="Repeat your password"
        autoComplete="new-password"
        {...register(FIELD_NAMES.CONFIRM_PASSWORD)}
        error={errors.confirmPassword?.message}
        errorTestId="confirm-password-error"
        hasError={!!errors.confirmPassword?.message}
        disabled={loading}
      />

      {errors.root && (
        <p
          className="text-invalid text-caption"
          data-testid="error-message-root"
        >
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
          {loading ? 'Signing up...' : 'Sign up'}
        </Button>
      </div>

      <p className="text-small text-disabled pt-2 pb-4 text-center">
        By signing up, you accept the terms of the{' '}
        <a
          href={LEGAL_LINKS.AGREEMENT}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary underline"
        >
          public offer agreement
        </a>{' '}
        and the{' '}
        <a
          href={LEGAL_LINKS.PRIVACY}
          target="_blank"
          rel="noopener noreferrer"
          className="hover:text-primary underline"
        >
          privacy policy
        </a>
      </p>
    </form>
  );
};
