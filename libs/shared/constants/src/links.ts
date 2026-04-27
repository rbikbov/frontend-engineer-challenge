export const ROOT_LINK = '/';

export const BFF_LINKS = {
  LOGIN: '/api/auth/login',
  LOGOUT: '/api/auth/logout',
  REFRESH: '/api/auth/refresh-token',
} as const;

export const AUTH_LINKS = {
  prefix: '/auth',
  SIGN_IN: '/auth/sign-in',
  SIGN_UP: '/auth/sign-up',
  PASSWORD_RECOVERY: '/auth/password-recovery',
  PASSWORD_RECOVERY_SUCCESS: '/auth/password-recovery-success',
  PASSWORD_SET: '/auth/password-set',
} as const;

export const LEGAL_LINKS = {
  AGREEMENT: '/legal/agreement',
  PRIVACY: '/legal/privacy',
} as const;

export const DASHBOARD_LINKS = {
  prefix: '/dashboard',
  ROOT: '/dashboard',
} as const;
