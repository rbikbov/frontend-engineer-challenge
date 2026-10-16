import { UseFormReturn } from 'react-hook-form';

import { SignInSchemaType } from '@workspace/api';
import { AUTH_LINKS, FIELD_NAMES } from '@workspace/constants';
import {
  AppLink,
  InputPassword,
  Button,
  Input,
} from '@workspace/ui/components';

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
        label="Email"
        placeholder="Enter your email"
        type="email"
        autoComplete="email"
        {...register(FIELD_NAMES.EMAIL)}
        error={errors.email?.message}
        errorTestId="email-error"
        disabled={loading}
        // Deliberately check the errors of both fields (email is handled inside the input itself),
        // so both fields are highlighted on invalid credentials
        hasError={!!errors.password?.message}
      />

      <InputPassword
        label="Password"
        placeholder="Enter your password"
        autoComplete="current-password"
        {...register(FIELD_NAMES.PASSWORD)}
        error={errors.password?.message}
        errorTestId="password-error"
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
          {loading ? 'Signing in...' : 'Sign in'}
        </Button>
      </div>

      <div className="pt-2">
        <Button
          variant="tertiaryPrimary"
          size="text"
          className="w-full"
          asChild
        >
          <AppLink href={AUTH_LINKS.PASSWORD_RECOVERY}>
            Forgot password?
          </AppLink>
        </Button>
      </div>
    </form>
  );
};
