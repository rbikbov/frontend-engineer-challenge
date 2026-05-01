export function isSafeUrl(url: string, allowedOrigin?: string): boolean {
  if (!url) return false;

  // Relative URLs are safe (starting with / but not //)
  if (url.startsWith('/') && !url.startsWith('//')) {
    return true;
  }

  try {
    const targetUrl = new URL(url);

    // If we have an allowed origin, check it
    if (allowedOrigin) {
      const allowed = new URL(allowedOrigin);
      return targetUrl.origin === allowed.origin;
    }

    // If no allowed origin provided, but it's an absolute URL,
    // we only allow it if it matches the current origin (in browser)
    if (typeof window !== 'undefined') {
      return targetUrl.origin === window.location.origin;
    }
  } catch {
    // If URL parsing fails, it's not a valid absolute URL.
    // We already checked for relative URLs above.
    return false;
  }

  return false;
}
