import { describe, it, expect } from 'vitest';

import { AUTH_ERROR_MESSAGES } from '@workspace/constants';

import {
  SignInSchema,
  SignUpSchema,
  PasswordRecoverySchema,
} from './auth.schema';

describe('Auth Validation Schemas', () => {
  describe('SignInSchema', () => {
    it('should validate correct credentials', () => {
      const data = { email: 'test@example.com', password: 'password123' };
      expect(SignInSchema.safeParse(data).success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const data = { email: 'invalid-email', password: 'password123' };
      const result = SignInSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const hasEmailError = result.error.issues.some(
          (issue) => issue.message === AUTH_ERROR_MESSAGES.INVALID_EMAIL,
        );
        expect(hasEmailError).toBe(true);
      }
    });

    it('should fail on empty password', () => {
      const data = { email: 'test@example.com', password: '' };
      const result = SignInSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const hasRequiredError = result.error.issues.some(
          (issue) => issue.message === AUTH_ERROR_MESSAGES.FIELD_REQUIRED,
        );
        expect(hasRequiredError).toBe(true);
      }
    });
  });

  describe('SignUpSchema', () => {
    it('should validate identical passwords', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'password123',
      };
      expect(SignUpSchema.safeParse(data).success).toBe(true);
    });

    it('should fail if passwords do not match', () => {
      const data = {
        email: 'test@example.com',
        password: 'password123',
        confirmPassword: 'mismatch',
      };
      const result = SignUpSchema.safeParse(data);
      expect(result.success).toBe(false);
      if (!result.success) {
        const hasMismatchError = result.error.issues.some(
          (issue) => issue.message === AUTH_ERROR_MESSAGES.PASSWORDS_NOT_MATCH,
        );
        expect(hasMismatchError).toBe(true);
      }
    });
  });

  describe('PasswordRecoverySchema', () => {
    it('should validate correct email', () => {
      const data = { email: 'recover@example.com' };
      expect(PasswordRecoverySchema.safeParse(data).success).toBe(true);
    });

    it('should fail on invalid email', () => {
      const data = { email: 'invalid' };
      expect(PasswordRecoverySchema.safeParse(data).success).toBe(false);
    });
  });
});
