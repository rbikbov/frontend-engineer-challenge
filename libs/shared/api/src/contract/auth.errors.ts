import { AUTH_ERROR_MESSAGES } from '@workspace/constants';

export class NetworkError extends Error {
  constructor(public originalError: unknown = null) {
    super(AUTH_ERROR_MESSAGES.NETWORK);
    this.name = 'NetworkError';
  }
}

export class ServiceUnavailableError extends Error {
  constructor(public originalError: unknown = null) {
    super(AUTH_ERROR_MESSAGES.SERVICE_UNAVAILABLE);
    this.name = 'ServiceUnavailableError';
  }
}

export class ApiError extends Error {
  constructor(
    public fields: Record<string, string>,
    public originalError: unknown = null,
  ) {
    const firstMessage =
      Object.values(fields)[0] || AUTH_ERROR_MESSAGES.DEFAULT;
    super(firstMessage);
    this.name = 'ApiError';
  }
}
