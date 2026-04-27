import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import {
  PasswordRecoverySchema,
  PasswordRecoverySchemaType,
} from '@workspace/api';

import { PasswordRecoveryForm } from './password-recovery.form';

const FormWrapper = ({
  onSubmit,
}: {
  onSubmit: (data: PasswordRecoverySchemaType) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(PasswordRecoverySchema),
    defaultValues: { email: '' },
  });
  return (
    <PasswordRecoveryForm form={form} onSubmit={onSubmit} loading={false} />
  );
};

describe('PasswordRecoveryForm Integration', () => {
  it('should show validation error on empty submit', async () => {
    const onSubmit = vi.fn();
    render(<FormWrapper onSubmit={onSubmit} />);

    fireEvent.submit(
      screen.getByRole('form', { name: /password-recovery-form/i }),
    );

    expect(await screen.findByText(/поле обязательно/i)).toBeTruthy();
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with valid email', async () => {
    const onSubmit = vi.fn();
    render(<FormWrapper onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'recover@example.com' },
    });

    fireEvent.submit(
      screen.getByRole('form', { name: /password-recovery-form/i }),
    );

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({ email: 'recover@example.com' }),
        expect.anything(),
      );
    });
  });
});
