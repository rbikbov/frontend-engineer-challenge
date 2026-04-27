import { pluralize } from '@workspace/lib';

export const AUTH_ERROR_MESSAGES = {
  // Common / System
  NETWORK: 'Не удалось связаться с сервером. Проверьте интернет.',
  DEFAULT: 'Произошла ошибка. Попробуйте позже.',
  GENERIC_ERROR: 'Произошла ошибка',
  TOO_MANY_ATTEMPTS: 'Слишком много попыток, попробуйте позже',

  // Validation
  FIELD_REQUIRED: 'Поле обязательно',
  INVALID_EMAIL: 'Недопустимый адрес почты',
  PASSWORD_MIN_LENGTH: (min: number | string): string =>
    `Введённый пароль менее ${min} ${pluralize(Number(min), 'символа', 'символов', 'символов')} в длину`,
  PASSWORDS_NOT_MATCH: 'Пароли не совпадают',

  // Auth Responses
  INVALID_CREDENTIALS: 'Введены неверные данные',
  EMAIL_TAKEN: 'Данный адрес уже занят',
  EMAIL_NOT_FOUND: 'Нет аккаунтов с таким e-mail',

  // Password Recovery & Links
  TOKEN_EXPIRED: 'Неверный или истекший токен',
  INVALID_LINK: 'Вы перешли по неверной ссылке.',

  // Operation Failures
  SIGN_IN_FAILED: 'Произошла ошибка при входе',
  SIGN_UP_FAILED: 'Произошла ошибка при регистрации',
} as const;
