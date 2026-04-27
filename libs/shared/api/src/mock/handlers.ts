import { createMsw } from 'openapi-msw';
import { HttpResponse } from 'msw';
import { MockAuthService } from './mock-auth.service';
import type { paths } from './auth-schema';

const authService = new MockAuthService();
const msw = createMsw<paths>();

// Базовый URL для бэкенда (тот, что BFF вызывает под капотом)
const BACKEND_URL = process.env.NEXT_PUBLIC_AUTH_BACKEND_URL || 'http://localhost:8080';

export const handlers = [
  // Регистрация
  msw.http.post(`${BACKEND_URL}/register`, async ({ request }) => {
    try {
      const { email, password } = await request.json();
      const user = await authService.register(email, password);
      return HttpResponse.json(user);
    } catch (error) {
      return HttpResponse.json({ error: (error as Error).message }, { status: 400 });
    }
  }),

  // Логин
  msw.http.post(`${BACKEND_URL}/login`, async ({ request }) => {
    try {
      const { email, password } = await request.json();
      const data = await authService.login(email, password);
      // Возвращаем AuthPayload (accessToken, refreshToken, user)
      return HttpResponse.json(data);
    } catch (error) {
      return HttpResponse.json({ error: (error as Error).message }, { status: 401 });
    }
  }),

  // Обновление токена
  msw.http.post(`${BACKEND_URL}/refresh-token`, async ({ request }) => {
    try {
      const { token } = await request.json();
      const tokens = await authService.refreshToken(token);
      return HttpResponse.json(tokens);
    } catch (error) {
      return HttpResponse.json({ error: 'Invalid refresh token' }, { status: 401 });
    }
  }),
];
