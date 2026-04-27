import type {
  User,
  AuthPayload,
  TokenPair,
  ResetRequestPayload,
} from './auth.dto';

export interface AuthApi {
  register(email: string, password: string): Promise<User>;
  login(email: string, password: string): Promise<AuthPayload>;
  logout(token?: string): Promise<boolean>;
  refreshToken(token: string): Promise<TokenPair>;
  requestPasswordReset(email: string): Promise<ResetRequestPayload>;
  resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<boolean>; // TODO: email может быть и необязательным
  me(): Promise<User>;
}
