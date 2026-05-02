import { NextResponse } from 'next/server';
import 'server-only';

import {
  NetworkError,
  ServiceUnavailableError,
  ApiError,
  RateLimitError,
} from '@workspace/api';

/**
 * Maps domain errors to appropriate HTTP responses for BFF auth routes.
 */
export const createAuthErrorResponse = (error: unknown): NextResponse => {
  if (error instanceof RateLimitError) {
    const headers: Record<string, string> = {};
    if (error.retryAfter) {
      headers['Retry-After'] = error.retryAfter.toString();
    }

    return NextResponse.json(
      {
        message: error.message,
        retryAfter: error.retryAfter,
      },
      {
        status: 429,
        headers,
      },
    );
  }

  if (
    error instanceof NetworkError ||
    error instanceof ServiceUnavailableError
  ) {
    return NextResponse.json(
      { error: (error as Error).message },
      { status: 502 },
    );
  }

  if (error instanceof ApiError) {
    return NextResponse.json(
      { message: error.message, fields: error.fields },
      { status: 400 },
    );
  }

  return NextResponse.json(
    { message: (error as Error).message || 'Ошибка сервера' },
    { status: 500 },
  );
};
