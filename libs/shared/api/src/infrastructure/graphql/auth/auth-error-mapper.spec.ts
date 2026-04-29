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

  it('should map password complexity requirement errors', () => {
    const testCases = [
      {
        msg: 'invalid password: password must contain at least one special character',
        field: 'password',
        expectedMsg: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_SPECIAL_CHAR,
      },
      {
        msg: 'invalid password: password must contain at least one lowercase letter',
        field: 'password',
        expectedMsg: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_LOWERCASE,
      },
      {
        msg: 'invalid password: password must contain at least one uppercase letter',
        field: 'password',
        expectedMsg: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_UPPERCASE,
      },
      {
        msg: 'invalid password: password must contain at least one digit',
        field: 'password',
        expectedMsg: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_DIGIT,
      },
    ];

    testCases.forEach(({ msg, field, expectedMsg }) => {
      try {
        handleGraphQLError({ message: msg });
      } catch (err) {
        expect((err as ApiError).fields).toEqual({
          [field]: expectedMsg,
        });
      }
    });
  });

  it('should fallback to GENERIC_ERROR for unknown errors on ROOT_FIELD', () => {
    const error = {
      message: 'some completely unknown backend exception occurred here',
    };

    try {
      handleGraphQLError(error);
    } catch (err) {
      expect((err as ApiError).fields).toEqual({
        [ROOT_FIELD]: AUTH_ERROR_MESSAGES.GENERIC_ERROR,
      });
    }
  });
});
