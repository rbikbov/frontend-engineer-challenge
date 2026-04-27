import { describe, it, expect, vi } from 'vitest';

import { render, screen, fireEvent, waitFor } from '@testing-library/react';

import React from 'react';
import { useForm } from 'react-hook-form';

import { zodResolver } from '@hookform/resolvers/zod';

import { SignInSchema } from '@workspace/api';
// Обертка для предоставления контекста формы
import { SignInSchemaType } from '@workspace/api';

import { SignInForm } from './sign-in.form';

const FormWrapper = ({
  onSubmit,
}: {
  onSubmit: (data: SignInSchemaType) => void;
}) => {
  const form = useForm({
    resolver: zodResolver(SignInSchema),
    defaultValues: { email: '', password: '' },
  });
  return <SignInForm form={form} onSubmit={onSubmit} loading={false} />;
};

describe('SignInForm Integration', () => {
  it('should show validation errors on empty submit', async () => {
    const onSubmit = vi.fn();
    render(<FormWrapper onSubmit={onSubmit} />);

    const formElement = screen.getByRole('form', { name: /sign-in-form/i });
    fireEvent.submit(formElement);

    // Ожидаем появления ошибок валидации
    try {
      expect(await screen.findAllByText(/поле обязательно/i)).toHaveLength(2);
    } catch (e) {
      screen.debug();
      throw e;
    }

    expect(onSubmit).not.toHaveBeenCalled();
  });

  it('should call onSubmit with valid data', async () => {
    const onSubmit = vi.fn();
    render(<FormWrapper onSubmit={onSubmit} />);

    fireEvent.change(screen.getByLabelText(/e-mail/i), {
      target: { value: 'test@example.com' },
    });
    fireEvent.change(screen.getByLabelText(/пароль/i), {
      target: { value: 'password123' },
    });

    fireEvent.click(screen.getByRole('button', { name: /войти/i }));

    await waitFor(() => {
      expect(onSubmit).toHaveBeenCalledWith(
        expect.objectContaining({
          email: 'test@example.com',
          password: 'password123',
        }),
        expect.anything(),
      );
    });
  });
});
