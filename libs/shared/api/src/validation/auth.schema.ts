import { z } from 'zod';

import { AUTH_ERROR_MESSAGES } from '@workspace/constants';

// Base schemas
export const EmailSchema = z
  .string()
  .min(1, AUTH_ERROR_MESSAGES.FIELD_REQUIRED)
  .email(AUTH_ERROR_MESSAGES.INVALID_EMAIL);

export const PasswordSchema = z
  .string()
  .min(1, AUTH_ERROR_MESSAGES.FIELD_REQUIRED);

export const ConfirmPasswordSchema = z
  .string()
  .min(1, AUTH_ERROR_MESSAGES.FIELD_REQUIRED);

// Composed schemas
export const SignInSchema = z.object({
  email: EmailSchema,
  password: z.string().min(1, AUTH_ERROR_MESSAGES.FIELD_REQUIRED), // Тут используем min(1), т.к. при входе нам не важно, < 8 он или нет, главное чтобы не пустой
});

export type SignInSchemaType = z.infer<typeof SignInSchema>;

export const SignUpSchema = z
  .object({
    email: EmailSchema,
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_ERROR_MESSAGES.PASSWORDS_NOT_MATCH,
    path: ['confirmPassword'],
  });

export type SignUpSchemaType = z.infer<typeof SignUpSchema>;

export const PasswordRecoverySchema = z.object({
  email: EmailSchema,
});

export type PasswordRecoverySchemaType = z.infer<typeof PasswordRecoverySchema>;

export const PasswordSetSchema = z
  .object({
    password: PasswordSchema,
    confirmPassword: ConfirmPasswordSchema,
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: AUTH_ERROR_MESSAGES.PASSWORDS_NOT_MATCH,
    path: ['confirmPassword'],
  });

export type PasswordSetSchemaType = z.infer<typeof PasswordSetSchema>;
