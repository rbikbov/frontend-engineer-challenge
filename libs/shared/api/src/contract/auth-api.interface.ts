import type {
  User,
  AuthPayload,
  TokenPair,
  ResetRequestPayload,
} from './auth.dto';

/**
 * Интерфейс авторизации.
 * Любая реализация (GraphQL, gRPC, REST) обязана приводить свои специфичные ошибки
 * к единым доменным классам ошибок:
 * - `ApiError` - бизнес-ошибки и ошибки валидации (например, неверный пароль). Содержит маппинг полей.
 * - `RateLimitError` - превышение лимита попыток (429).
 * - `NetworkError` - ошибки на стороне клиента (нет интернета).
 * - `ServiceUnavailableError` - ошибки инфраструктуры (сервер недоступен, 502/503).
 */
export interface AuthApi {
  /** @throws {ApiError | RateLimitError | NetworkError | ServiceUnavailableError} */
  register(email: string, password: string): Promise<User>;

  /** @throws {ApiError | RateLimitError | NetworkError | ServiceUnavailableError} */
  login(email: string, password: string): Promise<AuthPayload>;

  /** @throws {RateLimitError | NetworkError | ServiceUnavailableError} */
  logout(token: string): Promise<boolean>;

  /** @throws {ApiError | RateLimitError | NetworkError | ServiceUnavailableError} */
  refreshToken(token: string): Promise<TokenPair>;

  /** @throws {ApiError | RateLimitError | NetworkError | ServiceUnavailableError} */
  requestPasswordReset(email: string): Promise<ResetRequestPayload>;

  /** @throws {ApiError | RateLimitError | NetworkError | ServiceUnavailableError} */
  resetPassword(token: string, newPassword: string): Promise<boolean>;

  /** @throws {ApiError | RateLimitError | NetworkError | ServiceUnavailableError} */
  me(): Promise<User>;
}
