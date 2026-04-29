import { isClient } from '@workspace/lib';

export const isServiceUnavailableError = (error: unknown): boolean => {
  if (error && typeof error === 'object' && 'status' in error) {
    const status = (error as { status: number }).status;
    if (status === 502 || status === 503 || status === 504) return true;
  }

  // Проверяем ошибку отсутствия связи
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
      // На сервере (BFF) failed to fetch всегда означает, что бекенд лежит
      if (!isClient()) return true;
      // В браузере: если интернет есть, значит лежит бекенд
      if (isClient() && window.navigator.onLine) return true;
    }
  }

  return false;
};

export const isNetworkStatusError = (_error: unknown): boolean => {
  // Это ошибка сети пользователя ТОЛЬКО если у него физически нет интернета
  if (isClient() && !window.navigator.onLine) return true;

  // Все остальные ошибки связи (failed to fetch при наличии интернета)
  // перехватываются в isServiceUnavailableError
  return false;
};
