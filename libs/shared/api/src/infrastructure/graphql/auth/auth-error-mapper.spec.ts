import { describe, it, expect } from 'vitest';

import { AUTH_ERROR_MESSAGES, ROOT_FIELD } from '@workspace/constants';

import {
  ApiError,
  ServiceUnavailableError,
} from '../../../contract/auth.errors';
import { handleGraphQLError } from './auth-error-mapper';

describe('auth-error-mapper', () => {
  it('should map standard errors to ApiError with correct fields', () => {
    const error = {
      errors: [{ message: 'email already registered' }],
    };

    expect(() => handleGraphQLError(error)).toThrowError(ApiError);

    try {
      handleGraphQLError(error);
    } catch (err) {
      expect((err as ApiError).fields).toEqual({
        email: AUTH_ERROR_MESSAGES.EMAIL_TAKEN,
      });
    }
  });

  it('should map dynamic errors like password length', () => {
    const error = {
      message: 'password must be at least 8 characters',
    };

    try {
      handleGraphQLError(error);
    } catch (err) {
      expect((err as ApiError).fields).toEqual({
        password: AUTH_ERROR_MESSAGES.PASSWORD_MIN_LENGTH(8),
      });
    }
  });

  it('should map credentials error to password field', () => {
    const error = {
      message: 'invalid credentials',
    };

    try {
      handleGraphQLError(error);
    } catch (err) {
      expect((err as ApiError).fields).toEqual({
        password: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS,
      });
    }
  });

  it('should throw ServiceUnavailableError when backend responds with 502/503/504', () => {
    const error = { status: 503 };

    expect(() => handleGraphQLError(error)).toThrowError(
      ServiceUnavailableError,
    );
  });

  it('should map token expired error to ROOT_FIELD', () => {
    const error = {
      message: 'password reset failed: reset token is expired or already used',
    };

    try {
      handleGraphQLError(error);
    } catch (err) {
      expect((err as ApiError).fields).toEqual({
        [ROOT_FIELD]: AUTH_ERROR_MESSAGES.TOKEN_EXPIRED,
      });
    }
  });
});
