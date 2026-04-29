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
 * - `NetworkError` - ошибки на стороне клиента (нет интернета).
 * - `ServiceUnavailableError` - ошибки инфраструктуры (сервер недоступен, 502/503).
 */
export interface AuthApi {
  /** @throws {ApiError | NetworkError | ServiceUnavailableError} */
  register(email: string, password: string): Promise<User>;

  /** @throws {ApiError | NetworkError | ServiceUnavailableError} */
  login(email: string, password: string): Promise<AuthPayload>;

  /** @throws {NetworkError | ServiceUnavailableError} */
  logout(token?: string): Promise<boolean>;

  /** @throws {ApiError | NetworkError | ServiceUnavailableError} */
  refreshToken(token: string): Promise<TokenPair>;

  /** @throws {ApiError | NetworkError | ServiceUnavailableError} */
  requestPasswordReset(email: string): Promise<ResetRequestPayload>;

  /** @throws {ApiError | NetworkError | ServiceUnavailableError} */
  resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<boolean>; // TODO: email может быть и необязательным

  /** @throws {ApiError | NetworkError | ServiceUnavailableError} */
  me(): Promise<User>;
}
