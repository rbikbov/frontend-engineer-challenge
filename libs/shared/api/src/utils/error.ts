import { ROOT_FIELD } from '@workspace/constants';

import {
  ApiError,
  NetworkError,
  ServiceUnavailableError,
} from '../contract/auth.errors';

export const extractErrorFields = (
  error: unknown,
  fallbackMessage: string,
): Record<string, string> => {
  if (error instanceof ApiError) {
    return error.fields;
  }

  if (
    error instanceof NetworkError ||
    error instanceof ServiceUnavailableError
  ) {
    return { [ROOT_FIELD]: error.message };
  }

  return { [ROOT_FIELD]: fallbackMessage };
};
