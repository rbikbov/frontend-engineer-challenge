export const AUTH_ERROR_MESSAGES = {
  // Common / System
  NETWORK: 'Could not reach the server. Check your internet connection',
  SERVICE_UNAVAILABLE:
    'The service is temporarily unavailable. Please try again later',
  DEFAULT: 'Something went wrong. Please try again later',
  GENERIC_ERROR: 'Something went wrong',
  TOO_MANY_ATTEMPTS: 'Too many attempts, please try again later',

  // Validation
  FIELD_REQUIRED: 'This field is required',
  INVALID_EMAIL: 'Invalid email address',
  PASSWORD_MIN_LENGTH: (min: number | string): string =>
    `Password must be at least ${min} characters long`,
  PASSWORDS_NOT_MATCH: 'Passwords do not match',
  PASSWORD_SHOULD_CONTAIN_LOWERCASE:
    'Password must contain at least one lowercase letter',
  PASSWORD_SHOULD_CONTAIN_UPPERCASE:
    'Password must contain at least one uppercase letter',
  PASSWORD_SHOULD_CONTAIN_DIGIT: 'Password must contain at least one digit',
  PASSWORD_SHOULD_CONTAIN_SPECIAL_CHAR:
    'Password must contain at least one special character',

  // Auth Responses
  INVALID_CREDENTIALS: 'Invalid email or password',
  EMAIL_TAKEN: 'This email is already taken',
  EMAIL_NOT_FOUND: 'No account found with this email',

  // Password Recovery & Links
  TOKEN_EXPIRED: 'This link is invalid or has expired',
  INVALID_LINK: 'This link is invalid',

  // Operation Failures
  SIGN_IN_FAILED: 'Sign in failed',
  SIGN_UP_FAILED: 'Sign up failed',
} as const;
