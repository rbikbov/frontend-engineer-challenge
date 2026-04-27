import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignUpSchema } from '@workspace/api';
import { SignUpSchemaType } from '@workspace/api';

import { SignUpForm } from './sign-up.form';

const FormWrapper = ({
  onSubmit,
}: {
  onSubmit: (data: SignUpSchemaType) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(SignUpSchema),
    defaultValues: { email: '', password: '', confirmPassword: '' },
  });
  return <SignUpForm form={form} onSubmit={onSubmit} loading={false} />;
};

describe('SignUpForm Integration', () => {
  it('should show validation errors on empty submit', async () => {
    const onSubmit = vi.fn();
    render(<FormWrapper onSubmit={onSubmit} />);

    fireEvent.submit(screen.getByRole('form', { name: /sign-up-form/i }));

    expect(await screen.findAllByText(/поле обязательно/i)).toHaveLength(3);
    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with valid data', async () => {
    const onSubmit = vi.fn();
    render(<FormWrapper onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'new@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/^Введите пароль$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/повторите пароль/i), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByRole('form', { name: /sign-up-form/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'new@example.com',
          password: 'password123',
          confirmPassword: 'password123',
        }),
        expect.anything(),
      );
    });
  });

  it('should show error if passwords do not match', async () => {
    const onSubmit = vi.fn();
    render(<FormWrapper onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/^Введите пароль$/i), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText(/повторите пароль/i), {
      target: { value: 'mismatch' },
    });

    fireEvent.submit(screen.getByRole('form', { name: /sign-up-form/i }));

    expect(await screen.findByText(/пароли не совпадают/i)).toBeTruthy();
  });
});
