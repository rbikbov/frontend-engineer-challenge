'use client';

import { useEffect } from 'react';

import { logger } from '@shared/lib/logger';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to our central logger
    logger.error('[App] Unhandled client error', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-2xl font-bold">Что-то пошло не так!</h2>
      <p className="text-muted-foreground">
        Произошла непредвиденная ошибка на стороне клиента.
      </p>
      <button
        onClick={() => reset()}
        className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-md px-4 py-2 text-sm font-medium transition-colors"
      >
        Попробовать снова
      </button>
    </div>
  );
}
