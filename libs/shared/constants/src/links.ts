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

const REPOSITORY_URL = 'https://github.com/rbikbov/frontend-engineer-challenge';

export const REPOSITORY_LINKS = {
  ROOT: REPOSITORY_URL,
  ADR_MULTI_ZONES: `${REPOSITORY_URL}/blob/main/docs/adr/001-multi-zones-architecture.md`,
  ADR_SECURE_AUTH: `${REPOSITORY_URL}/blob/main/docs/adr/002-secure-auth-strategy.md`,
  ADR_FSD: `${REPOSITORY_URL}/blob/main/docs/adr/003-fsd-and-dependency-inversion.md`,
} as const;

export const DASHBOARD_LINKS = {
  prefix: '/dashboard',
  ROOT: '/dashboard',
} as const;
