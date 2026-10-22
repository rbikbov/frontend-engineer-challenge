'use client';

import { useEffect } from 'react';

import { Button } from '@workspace/ui/components';

import { logger } from '@shared/lib/logger';

export default function ErrorBoundary({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    logger.error('[App] Unhandled client error', {
      message: error.message,
      stack: error.stack,
      digest: error.digest,
    });
  }, [error]);

  return (
    <div className="flex min-h-[400px] w-full flex-col items-center justify-center gap-4 p-8 text-center">
      <h2 className="text-h2 font-bold">Something went wrong</h2>
      <p className="text-foreground-secondary text-large">
        An unexpected client-side error occurred.
      </p>
      <Button type="button" onClick={() => reset()}>
        Try again
      </Button>
    </div>
  );
}
