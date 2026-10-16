import { isClient } from '@workspace/lib';

export const isServiceUnavailableError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status;
    if (status === 502 || status === 503 || status === 504) return true;
  }

  // Check for a connectivity error
  if (error && typeof error === 'object') {
    let errorMsg = '';
    if (error instanceof Error) {
      errorMsg = error.message.toLowerCase();
    } else if ('message' in error) {
      errorMsg = String((error as { message: unknown }).message).toLowerCase();
    } else if ('error' in error) {
      errorMsg = String((error as { error: unknown }).error).toLowerCase();
    }

    if (
      errorMsg.includes('failed to fetch') ||
      errorMsg.includes('network error') ||
      errorMsg.includes('fetch failed')
    ) {
      // On the server (BFF), failed to fetch always means the backend is down
      if (!isClient()) return true;
      // In the browser: if the user is online, the backend is down
      if (isClient() && window.navigator.onLine) return true;
    }
  }

  return false;
};

export const isNetworkStatusError = (_error: unknown): boolean => {
  // It is the user's network error ONLY if they are actually offline
  if (isClient() && !window.navigator.onLine) return true;

  // All other connectivity errors (failed to fetch while online)
  // are handled by isServiceUnavailableError
  return false;
};
