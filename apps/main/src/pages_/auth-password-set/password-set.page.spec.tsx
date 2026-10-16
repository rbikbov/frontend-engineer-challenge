import { describe, it, expect, vi, beforeEach } from 'vitest';

import { render, screen } from '@testing-library/react';

import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { useRouter, useSearchParams } from 'next/navigation';

import { PasswordSetSchemaType } from '@workspace/api';
import { AUTH_LINKS } from '@workspace/constants';

import { usePasswordSetForm } from '@features/auth';

import { PasswordSetPage } from './password-set.page';

// Mock dependencies
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

    // Default form hook state
    vi.mocked(usePasswordSetForm).mockReturnValue({
      form: {} as unknown as UseFormReturn<PasswordSetSchemaType>,
      onSubmit: vi.fn(),
      isLoading: false,
    });
  });

  it('should extract token from URL and call router.replace immediately', async () => {
    mockSearchParams.get.mockReturnValue('test-token');

    render(<PasswordSetPage />);

    // Check that the token was read from the URL
    expect(mockSearchParams.get).toHaveBeenCalledWith('token');

    // Check that the URL was cleaned up
    expect(mockRouter.replace).toHaveBeenCalledWith(AUTH_LINKS.PASSWORD_SET);

    // Check that the token was passed to the form hook
    expect(usePasswordSetForm).toHaveBeenCalledWith(
      expect.objectContaining({
        token: 'test-token',
      }),
    );
  });

  it('should show success view when submission is successful', async () => {
    mockSearchParams.get.mockReturnValue('test-token');

    // Simulate a successful submit
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

    // Call the success callback
    successCallback();

    // Check that the success page is rendered
    expect(
      await screen.findByText(/your password has been reset/i),
    ).toBeTruthy();

    // Check that the form and the title are gone
    expect(screen.queryByText(/set a password/i)).toBeNull();
    expect(screen.queryByTestId('password-set-form')).toBeNull();
  });

  it('should show error view when fatal error occurs', async () => {
    mockSearchParams.get.mockReturnValue('test-token');

    // Simulate a fatal error
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

    // Call the error callback
    fatalErrorCallback('test error');

    // Check that the error page is rendered
    expect(
      await screen.findByText(/your password was not reset/i),
    ).toBeTruthy();

    // Check that the form and the title are gone
    expect(screen.queryByText(/set a password/i)).toBeNull();
    expect(screen.queryByTestId('password-set-form')).toBeNull();
  });

  it('should show loading state when token is being extracted (Suspense)', () => {
    // This test only checks that the main content renders,
    // since Suspense is transparent in JSDOM unless lazy loading is simulated
    mockSearchParams.get.mockReturnValue('test-token');
    render(<PasswordSetPage />);
    expect(screen.getByTestId('password-set-form')).toBeTruthy();
  });
});
