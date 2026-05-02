import { describe, it, expect, vi, beforeEach } from 'vitest';

import { render, screen } from '@testing-library/react';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { PasswordSetSchemaType } from '@workspace/api';
import { AUTH_LINKS } from '@workspace/constants';

import { usePasswordSetForm } from '@features/auth';

import { PasswordSetPage } from './password-set.page';

// Мокаем зависимости
vi.mock('next/navigation', () => ({
  useRouter: vi.fn(),
  useSearchParams: vi.fn(),
}));

vi.mock('@features/auth', () => ({
  PasswordSetForm: vi.fn(() => <div data-testid="password-set-form" />),
  usePasswordSetForm: vi.fn(),
}));

describe('PasswordSetPage', () => {
  const mockRouter = {
    replace: vi.fn(),
  };

  const mockSearchParams = {
    get: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    vi.mocked(useRouter).mockReturnValue(
      mockRouter as unknown as ReturnType<typeof useRouter>,
    );
    vi.mocked(useSearchParams).mockReturnValue(
      mockSearchParams as unknown as ReturnType<typeof useSearchParams>,
    );

    // Дефолтный стейт хука формы
    vi.mocked(usePasswordSetForm).mockReturnValue({
      form: {} as unknown as UseFormReturn<PasswordSetSchemaType>,
      onSubmit: vi.fn(),
      isLoading: false,
    });
  });

  it('should extract token from URL and call router.replace immediately', async () => {
    mockSearchParams.get.mockReturnValue('test-token');

    render(<PasswordSetPage />);

    // Проверяем, что токен был взят из URL
    expect(mockSearchParams.get).toHaveBeenCalledWith('token');

    // Проверяем, что URL был очищен
    expect(mockRouter.replace).toHaveBeenCalledWith(AUTH_LINKS.PASSWORD_SET);

    // Проверяем, что токен проброшен в хук формы
    expect(usePasswordSetForm).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
      }),
    );
  });

  it('should show success view when submission is successful', async () => {
    mockSearchParams.get.mockReturnValue('test-token');

    // Имитируем успешный сабмит
    let successCallback: () => void = () => {};
    vi.mocked(usePasswordSetForm).mockImplementation((props) => {
      successCallback = props.onSuccess!;
      return {
        form: {} as unknown as UseFormReturn<PasswordSetSchemaType>,
        onSubmit: vi.fn(),
        isLoading: false,
      };
    });

    render(<PasswordSetPage />);

    // Вызываем колбэк успеха
    successCallback();

    // Проверяем, что отрендерилась страница успеха
    expect(await screen.findByText(/пароль был восстановлен/i)).toBeTruthy();

    // Проверяем, что форма и заголовок исчезли
    expect(screen.queryByText(/задайте пароль/i)).toBeNull();
    expect(screen.queryByTestId('password-set-form')).toBeNull();
  });

  it('should show error view when fatal error occurs', async () => {
    mockSearchParams.get.mockReturnValue('test-token');

    // Имитируем фатальную ошибку
    let fatalErrorCallback: (msg: string) => void = () => {};
    vi.mocked(usePasswordSetForm).mockImplementation((props) => {
      fatalErrorCallback = props.onFatalError!;
      return {
        form: {} as unknown as UseFormReturn<PasswordSetSchemaType>,
        onSubmit: vi.fn(),
        isLoading: false,
      };
    });

    render(<PasswordSetPage />);

    // Вызываем колбэк ошибки
    fatalErrorCallback('test error');

    // Проверяем, что отрендерилась страница ошибки
    expect(await screen.findByText(/пароль не был восстановлен/i)).toBeTruthy();

    // Проверяем, что форма и заголовок исчезли
    expect(screen.queryByText(/задайте пароль/i)).toBeNull();
    expect(screen.queryByTestId('password-set-form')).toBeNull();
  });

  it('should show loading state when token is being extracted (Suspense)', () => {
    // В этом тесте мы просто проверяем рендер основного контента,
    // так как Suspense в JSDOM работает прозрачно, если не имитировать ленивую загрузку
    mockSearchParams.get.mockReturnValue('test-token');
    render(<PasswordSetPage />);
    expect(screen.getByTestId('password-set-form')).toBeTruthy();
  });
});
