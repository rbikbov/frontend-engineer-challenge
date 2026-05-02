import { AUTH_ERROR_MESSAGES, ROOT_FIELD } from '@workspace/constants';

import {
  ApiError,
  NetworkError,
  RateLimitError,
  ServiceUnavailableError,
} from '../../../contract/auth.errors';
import {
  isNetworkStatusError,
  isServiceUnavailableError,
} from '../../../utils/network-errors';

interface ErrorInfo {
  message: string | ((...args: (string | number)[]) => string);
  field?: string;
}

interface DynamicErrorInfo extends ErrorInfo {
  pattern: RegExp;
  isRateLimit?: boolean;
}

const dynamicErrorMatchers: DynamicErrorInfo[] = [
  {
    pattern: /password must be at least (\d+) characters/i,
    field: 'password',
    message: (min: string | number) =>
      AUTH_ERROR_MESSAGES.PASSWORD_MIN_LENGTH(min),
  },
  {
    // Ищем "too many attempts" и опционально число секунд (например, "...in 30 seconds")
    pattern: /too many (?:.+ )?attempts(?:.*in (\d+) seconds)?/i,
    field: ROOT_FIELD,
    message: AUTH_ERROR_MESSAGES.TOO_MANY_ATTEMPTS,
    isRateLimit: true,
  },
];

const errorMap = new Map<string, ErrorInfo>([
  [
    'email already registered',
    { message: AUTH_ERROR_MESSAGES.EMAIL_TAKEN, field: 'email' },
  ],
  [
    'invalid email: invalid email format',
    { message: AUTH_ERROR_MESSAGES.INVALID_EMAIL, field: 'email' },
  ],
  [
    'invalid password: password must contain at least one special character',
    {
      message: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_SPECIAL_CHAR,
      field: 'password',
    },
  ],
  [
    'invalid password: password must contain at least one lowercase letter',
    {
      message: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_LOWERCASE,
      field: 'password',
    },
  ],
  [
    'invalid password: password must contain at least one uppercase letter',
    {
      message: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_UPPERCASE,
      field: 'password',
    },
  ],
  [
    'invalid password: password must contain at least one digit',
    {
      message: AUTH_ERROR_MESSAGES.PASSWORD_SHOULD_CONTAIN_DIGIT,
      field: 'password',
    },
  ],
  [
    'invalid credentials',
    { message: AUTH_ERROR_MESSAGES.INVALID_CREDENTIALS, field: 'password' },
  ],
  [
    'password reset failed: reset token is expired or already used',
    { message: AUTH_ERROR_MESSAGES.TOKEN_EXPIRED, field: ROOT_FIELD },
  ],
  [
    'invalid reset request',
    { message: AUTH_ERROR_MESSAGES.INVALID_LINK, field: ROOT_FIELD },
  ],
]);

interface ParsedErrors {
  fields: Record<string, string>;
  isRateLimit: boolean;
  retryAfter?: number;
}

const parseGraphQLErrors = (error: {
  errors?: { message: string }[];
  message?: string;
  error?: string;
}): ParsedErrors => {
  const fields: Record<string, string> = {};
  let isRateLimit = false;
  let retryAfter: number | undefined;

  const messages: string[] = [];
  if (Array.isArray(error?.errors)) {
    error.errors.forEach((err) => {
      if (err.message) messages.push(err.message.toLowerCase());
    });
  } else if (error?.message) {
    messages.push(error.message.toLowerCase());
  } else if (error?.error) {
    messages.push(error.error.toLowerCase());
  }

  messages.forEach((msg) => {
    for (const matcher of dynamicErrorMatchers) {
      const match = msg.match(matcher.pattern);
      if (match) {
        const field = matcher.field || ROOT_FIELD;
        const message =
          typeof matcher.message === 'function'
            ? matcher.message(...match.slice(1))
            : matcher.message;
        fields[field] = message;

        if (matcher.isRateLimit) {
          isRateLimit = true;
          // Если в регулярке была захвачена группа с числом (секунды)
          if (match[1]) {
            retryAfter = parseInt(match[1], 10);
          }
        }
        return;
      }
    }
    for (const [key, info] of errorMap.entries()) {
      if (msg.includes(key)) {
        const field = info.field || ROOT_FIELD;
        const message =
          typeof info.message === 'function'
            ? (info.message as () => string)()
            : info.message;
        fields[field] = message as string;
      }
    }
  });

  if (Object.keys(fields).length === 0) {
    fields[ROOT_FIELD] = AUTH_ERROR_MESSAGES.GENERIC_ERROR;
  }

  return { fields, isRateLimit, retryAfter };
};

export const handleGraphQLError = (err: unknown) => {
  if (isServiceUnavailableError(err)) throw new ServiceUnavailableError(err);
  if (isNetworkStatusError(err)) throw new NetworkError(err);

  // Если ошибка содержит статус 429 (от Nginx или WAF), бросаем RateLimitError сразу
  if (err && typeof err === 'object' && 'status' in err) {
    if ((err as { status: number }).status === 429) {
      throw new RateLimitError(
        AUTH_ERROR_MESSAGES.TOO_MANY_ATTEMPTS,
        undefined,
        err,
      );
    }
  }

  const { fields, isRateLimit, retryAfter } = parseGraphQLErrors(
    err as { errors?: { message: string }[]; message?: string },
  );

  if (isRateLimit) {
    throw new RateLimitError(
      fields[ROOT_FIELD] || AUTH_ERROR_MESSAGES.TOO_MANY_ATTEMPTS,
      retryAfter,
      err,
    );
  }

  throw new ApiError(fields, err);
};
