import { BFF_LINKS } from '@workspace/constants';
import { isClient } from '@workspace/lib';
import type { 
  AuthApi, 
  User, 
  AuthPayload, 
  TokenPair, 
  ResetRequestPayload 
} from '../contract';

export class MockAuthApi implements AuthApi {
  readonly endpoint: string;

  constructor(endpoint?: string) {
    // Используем эндпоинт из конфига или дефолтный для моков
    this.endpoint = endpoint || process.env.NEXT_PUBLIC_AUTH_BACKEND_URL || 'http://localhost:8080';
  }

  async register(email: string, password: string): Promise<User> {
    const res = await fetch(`${this.endpoint}/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const res = await fetch(`${this.endpoint}/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async refreshToken(token: string): Promise<TokenPair> {
    const res = await fetch(`${this.endpoint}/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  // Эти методы пока не в OpenAPI, оставляем как есть или можно дописать в схему
  async logout(token?: string): Promise<boolean> {
    const res = await fetch(`${this.endpoint}/logout`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token }),
    });
    return res.ok;
  }

  async requestPasswordReset(email: string): Promise<ResetRequestPayload> {
    const res = await fetch(`${this.endpoint}/request-password-reset`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });
    if (!res.ok) throw new Error(await res.text());
    return res.json();
  }

  async resetPassword(email: string, token: string, newPassword: string): Promise<boolean> {
    const res = await fetch(`${this.endpoint}/reset-password`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, token, newPassword }),
    });
    return res.ok;
  }

  async me(): Promise<User> {
    const res = await fetch(`${this.endpoint}/me`);
    if (!res.ok) throw new Error('Unauthorized');
    return res.json();
  }
}
