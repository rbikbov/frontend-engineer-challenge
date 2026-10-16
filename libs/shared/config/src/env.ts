import { z } from 'zod';

import { isServer } from '@workspace/lib';

/**
 * Schema for variables available ONLY on the server.
 * These variables must not have the NEXT_PUBLIC_ prefix.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  INTERNAL_DASHBOARD_URL: z.string().url(),
});

/**
 * Schema for variables available on both the server and the client.
 * They must have the NEXT_PUBLIC_ prefix.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_AUTH_BACKEND_TYPE: z.enum(['graphql', 'msw']),
  NEXT_PUBLIC_AUTH_BACKEND_URL: z.string().url(),
  NEXT_PUBLIC_ENV: z.enum(['development', 'production']),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

/**
 * Proxy object for validation.
 * Record<string, string | undefined> is used to type process.env.
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  INTERNAL_DASHBOARD_URL: process.env.INTERNAL_DASHBOARD_URL,
  NEXT_PUBLIC_AUTH_BACKEND_TYPE: process.env.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
  NEXT_PUBLIC_AUTH_BACKEND_URL: process.env.NEXT_PUBLIC_AUTH_BACKEND_URL,
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

// Validate everything together
const mergedSchema = serverSchema.merge(clientSchema);

// Safe parsing with readable errors
const parseEnv = () => {
  // On the client, only the client schema is validated
  const schema = isServer() ? mergedSchema : clientSchema;

  const parsed = schema.safeParse(processEnv);

  if (!parsed.success) {
    // eslint-disable-next-line no-console
    console.error(
      '❌ Invalid environment variables:',
      parsed.error.flatten().fieldErrors,
    );
    throw new Error('Invalid environment variables');
  }

  return parsed.data;
};

export const envConfig = parseEnv() as EnvConfig;

// Types for use in code
export type EnvConfig = z.infer<typeof mergedSchema>;
