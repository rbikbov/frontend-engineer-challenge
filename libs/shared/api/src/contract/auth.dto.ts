import { z } from 'zod';

/**
 * Common User Schema
 */
export const UserSchema = z.object({
  id: z.string(),
  email: z.string().email(),
});

export type User = z.infer<typeof UserSchema>;

/**
 * Token Pair Schema
 */
export const TokenPairSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type TokenPair = z.infer<typeof TokenPairSchema>;

/**
 * Authentication Payload Schema
 */
export const AuthPayloadSchema = z.object({
  accessToken: z.string(),
  refreshToken: z.string(),
});

export type AuthPayload = z.infer<typeof AuthPayloadSchema>;

/**
 * Password Reset Request Response Schema
 */
export const ResetRequestPayloadSchema = z.object({
  success: z.boolean(),
  token: z.string().optional(),
});

export type ResetRequestPayload = z.infer<typeof ResetRequestPayloadSchema>;
