import { describe, it, expect, vi, afterEach } from 'vitest';

import { isSafeUrl } from './url';

describe('isSafeUrl', () => {
  const allowedOrigin = 'http://localhost:3000';

  it('should return true for relative paths', () => {
    expect(isSafeUrl('/dashboard')).toBe(true);
    expect(isSafeUrl('/auth/signin?callbackUrl=/foo')).toBe(true);
  });

  it('should return false for protocol-relative paths', () => {
    expect(isSafeUrl('//attacker.com')).toBe(false);
  });

  it('should return true for absolute URLs matching allowedOrigin', () => {
    expect(isSafeUrl('http://localhost:3000/dashboard', allowedOrigin)).toBe(
      true,
    );
    expect(isSafeUrl('http://localhost:3000', allowedOrigin)).toBe(true);
  });

  it('should return false for absolute URLs not matching allowedOrigin', () => {
    expect(isSafeUrl('http://attacker.com/dashboard', allowedOrigin)).toBe(
      false,
    );
    expect(isSafeUrl('https://localhost:3000/dashboard', allowedOrigin)).toBe(
      false,
    ); // different protocol
  });

  afterEach(() => {
    vi.unstubAllGlobals();
  });

  it('should return true for absolute URLs matching window.location.origin when no allowedOrigin provided', () => {
    vi.stubGlobal('window', { location: { origin: 'http://localhost:3000' } });

    expect(isSafeUrl('http://localhost:3000/dashboard')).toBe(true);
    expect(isSafeUrl('http://attacker.com/dashboard')).toBe(false);
  });

  it('should return false for invalid URLs', () => {
    expect(isSafeUrl('')).toBe(false);
    expect(isSafeUrl('not-a-url')).toBe(false);
  });
});
