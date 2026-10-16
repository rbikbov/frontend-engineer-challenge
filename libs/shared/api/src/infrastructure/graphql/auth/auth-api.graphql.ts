import type { AuthApi } from '../../../contract/auth-api.interface';
import {
  UserSchema,
  AuthPayloadSchema,
  TokenPairSchema,
  ResetRequestPayloadSchema,
  type User,
  type AuthPayload,
  type TokenPair,
  type ResetRequestPayload,
} from '../../../contract/auth.dto';
import type { AuthApiConfig } from '../../auth-api.factory';
import { createClient, type Client } from '../generated';
import { handleGraphQLError } from './auth-error-mapper';

type FetchURL = Parameters<typeof fetch>[0];
type FetchOptions = Parameters<typeof fetch>[1];
type FetchOptionsWithRetry = FetchOptions & {
  __isRetry?: boolean;
};
type GraphQLError = {
  message: string;
  locations?: { line: number; column: number }[];
  path?: string[];
};
type GraphQLResponse = {
  errors?: GraphQLError[];
  data?: unknown;
};
export class GraphQLAuthApi implements AuthApi {
  readonly endpoint!: string;
  readonly #options?: AuthApiConfig['options'];
  readonly #client!: Client;
  #refreshPromise: Promise<boolean> | null = null;
  #isLoggingOut = false;

  constructor(endpoint: string, options?: AuthApiConfig['options']) {
    this.endpoint = endpoint;
    this.#options = options;
    this.#client = createClient({
      url: endpoint,
      fetch: async (url: FetchURL, options: FetchOptions) => {
        const executeRequest = (opts?: FetchOptionsWithRetry) => {
          const { __isRetry, ...nativeOptions } = opts || {};
          return fetch(url, {
            ...nativeOptions,
            headers: {
              ...this.#options?.headers,
              ...nativeOptions.headers,
            },
            credentials: 'include',
          });
        };

        const result = await executeRequest(options);

        // Clone to check for errors in the GraphQL response body
        const clonedResult = result.clone();
        let isUnauthorized = false;

        try {
          const body = await clonedResult.json();
          isUnauthorized =
            (body as GraphQLResponse)?.errors?.[0]?.message === 'unauthorized';
        } catch {
          // If it is not JSON, rely on the status code
          isUnauthorized = result.status === 401;
        }

        const isRetry = (options as FetchOptionsWithRetry)?.__isRetry;

        if (isUnauthorized && !isRetry) {
          // If a refresh is already in progress, wait for it
          if (this.#refreshPromise) {
            await this.#refreshPromise;
          } else if (this.#options?.onRefreshSession && !this.#isLoggingOut) {
            // Otherwise start a refresh via the injected callback,
            // unless we are in the middle of signing out.
            this.#refreshPromise = this.#options.onRefreshSession();
            try {
              const isRefreshed = await this.#refreshPromise;
              if (!isRefreshed) {
                // If the refresh failed, bail out (the BFF has already cleared the cookies)
                throw new Error('Session expired');
              }
            } finally {
              this.#refreshPromise = null;
            }
          } else {
            throw new Error('Session expired');
          }

          // Retry the request only ONCE
          return executeRequest({
            ...options,
            __isRetry: true,
          });
        }

        return result;
      },
    });
  }

  /**
   * Private Mappers to ensure data consistency
   */
  private mapUser(raw: Record<string, unknown>): User {
    return UserSchema.parse({
      id: raw.id,
      email: raw.email,
    });
  }

  private mapAuthPayload(raw: Record<string, unknown>): AuthPayload {
    return AuthPayloadSchema.parse({
      accessToken: raw.accessToken,
      refreshToken: raw.refreshToken,
    });
  }

  private mapTokenPair(raw: Record<string, unknown>): TokenPair {
    return TokenPairSchema.parse({
      accessToken: raw.accessToken,
      refreshToken: raw.refreshToken,
    });
  }

  private mapResetRequest(raw: Record<string, unknown>): ResetRequestPayload {
    return ResetRequestPayloadSchema.parse({
      success: raw.success,
      token: raw.token,
    });
  }

  private async execute<T>(operation: () => Promise<T>): Promise<T> {
    try {
      return await operation();
    } catch (err) {
      throw handleGraphQLError(err);
    }
  }

  async register(email: string, password: string): Promise<User> {
    return this.execute(async () => {
      const response = await this.#client.mutation({
        register: {
          __args: { email, password },
          id: true,
          email: true,
          status: true,
        },
      });
      return this.mapUser(response.register);
    });
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    return this.execute(async () => {
      const response = await this.#client.mutation({
        login: {
          __args: { email, password },
          accessToken: true,
          refreshToken: true,
        },
      });
      return this.mapAuthPayload(response.login);
    });
  }

  async refreshToken(token: string): Promise<TokenPair> {
    return this.execute(async () => {
      const response = await this.#client.mutation({
        refreshToken: {
          __args: { refreshToken: token },
          accessToken: true,
          refreshToken: true,
        },
      });
      return this.mapTokenPair(response.refreshToken);
    });
  }

  async requestPasswordReset(email: string): Promise<ResetRequestPayload> {
    return this.execute(async () => {
      const response = await this.#client.mutation({
        requestPasswordReset: {
          __args: { email },
          success: true,
          token: true,
        },
      });
      return this.mapResetRequest(response.requestPasswordReset);
    });
  }

  async resetPassword(token: string, newPassword: string): Promise<boolean> {
    return this.execute(async () => {
      const response = await this.#client.mutation({
        resetPassword: {
          __args: { token, newPassword },
        },
      });
      return response.resetPassword;
    });
  }

  async logout(token: string): Promise<boolean> {
    return this.execute(async () => {
      await this.#client.mutation({
        logout: {
          __args: {
            refreshToken: token,
          },
        },
      });
      return true;
    });
  }

  async me(): Promise<User> {
    return this.execute(async () => {
      const response = await this.#client.query({
        me: {
          id: true,
          email: true,
        },
      });
      return this.mapUser(response.me);
    });
  }

  setLoggingOut(isLoggingOut: boolean): void {
    this.#isLoggingOut = isLoggingOut;
  }
}
