import type {
  User,
  AuthPayload,
  TokenPair,
  ResetRequestPayload,
} from './auth.dto';

/**
 * Auth interface.
 * Every implementation (GraphQL, gRPC, REST) must map its own specific errors
 * to the shared domain error classes:
 * - `ApiError` - business and validation errors (e.g. wrong password). Contains a field mapping.
 * - `RateLimitError` - attempt limit exceeded (429).
 * - `NetworkError` - client-side errors (no internet connection).
 * - `ServiceUnavailableError` - infrastructure errors (server unavailable, 502/503).
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

  /**
   * Sets the sign-out-in-progress state.
   */
  setLoggingOut(isLoggingOut: boolean): void;
}
