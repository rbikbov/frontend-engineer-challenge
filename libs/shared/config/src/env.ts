import { z } from 'zod';

import { isServer } from '@workspace/lib';

/**
 * Схема для переменных, доступных ТОЛЬКО на сервере.
 * Эти переменные не должны иметь префикса NEXT_PUBLIC_.
 */
const serverSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  INTERNAL_DASHBOARD_URL: z.string().url(),
});

/**
 * Схема для переменных, доступных и на сервере, и на клиенте.
 * Должны иметь префикс NEXT_PUBLIC_.
 */
const clientSchema = z.object({
  NEXT_PUBLIC_AUTH_BACKEND_TYPE: z.enum(['graphql', 'msw']),
  NEXT_PUBLIC_AUTH_BACKEND_URL: z.string().url(),
  NEXT_PUBLIC_ENV: z.enum(['development', 'production']),
  NEXT_PUBLIC_APP_URL: z.string().url().optional(),
});

/**
 * Прокси-объект для валидации.
 * Мы используем Record<string, string | undefined> для типизации process.env.
 */
const processEnv = {
  NODE_ENV: process.env.NODE_ENV,
  INTERNAL_DASHBOARD_URL: process.env.INTERNAL_DASHBOARD_URL,
  NEXT_PUBLIC_AUTH_BACKEND_TYPE: process.env.NEXT_PUBLIC_AUTH_BACKEND_TYPE,
  NEXT_PUBLIC_AUTH_BACKEND_URL: process.env.NEXT_PUBLIC_AUTH_BACKEND_URL,
  NEXT_PUBLIC_ENV: process.env.NEXT_PUBLIC_ENV || process.env.NODE_ENV,
  NEXT_PUBLIC_APP_URL: process.env.NEXT_PUBLIC_APP_URL,
};

// Валидируем всё вместе
const mergedSchema = serverSchema.merge(clientSchema);

// Функция для безопасного парсинга с понятными ошибками
const parseEnv = () => {
  // На клиенте мы валидируем только клиентскую схему
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

// Типизация для использования в коде
export type EnvConfig = z.infer<typeof mergedSchema>;
