import { BFF_LINKS } from '@workspace/constants';
import { isClient } from '@workspace/lib';

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
import { createClient, type Client } from '../generated';
import { ClientOptions } from '../generated/runtime';

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
  // eslint-disable-next-line no-unused-private-class-members
  readonly #options: ClientOptions | undefined;
  readonly #client!: Client;
  #refreshPromise: Promise<Response | void> | null = null;

  static #instance: GraphQLAuthApi;

  static getInstance(
    endpoint: string,
    options?: ClientOptions,
  ): GraphQLAuthApi {
    if (!this.#instance) {
      this.#instance = new GraphQLAuthApi(endpoint, options);
    }
    return this.#instance;
  }

  constructor(endpoint: string, options?: ClientOptions) {
    if (GraphQLAuthApi.#instance) {
      return GraphQLAuthApi.#instance;
    }

    GraphQLAuthApi.#instance = this;

    this.endpoint = endpoint;
    this.#options = options;
    this.#client = createClient({
      url: endpoint,
      fetch: async (url: FetchURL, options: FetchOptions) => {
        const executeRequest = (opts?: FetchOptionsWithRetry) => {
          const { __isRetry, ...nativeOptions } = opts || {};
          return fetch(url, {
            ...nativeOptions,
            credentials: 'include',
          });
        };

        const result = await executeRequest(options);

        // Клонируем для проверки ошибок в теле GraphQL ответа
        const clonedResult = result.clone();
        let isUnauthorized = false;

        try {
          const body = await clonedResult.json();
          isUnauthorized =
            (body as GraphQLResponse)?.errors?.[0]?.message === 'unauthorized';
        } catch {
          // Если это не JSON, ориентируемся на статус код
          isUnauthorized = result.status === 401;
        }

        const isRetry = (options as FetchOptionsWithRetry)?.__isRetry;

        if (isUnauthorized && !isRetry) {
          // Если мы уже в процессе рефреша — ждем его
          if (this.#refreshPromise) {
            await this.#refreshPromise;
          } else {
            // Иначе — запускаем рефреш
            this.#refreshPromise = this.#bffRefreshToken();
            try {
              const refreshResult = await this.#refreshPromise;
              if (!refreshResult || !refreshResult.ok) {
                // Если рефреш не удался — выходим
                await this.logout();
                throw new Error('Session expired');
              }
            } finally {
              this.#refreshPromise = null;
            }
          }

          // Повторяем запрос только ОДИН раз
          return executeRequest({
            ...options,
            __isRetry: true,
          });
        }

        return result;
      },
    });
  }

  async #bffRefreshToken() {
    if (!isClient())
      throw new Error('The method must be called from the client side'); // TODO: AppError

    return fetch(`${window.location.origin}${BFF_LINKS.REFRESH}`, {
      method: 'POST',
      credentials: 'include',
    });
  }

  async #bffLogout() {
    if (!isClient())
      throw new Error('The method must be called from the client side'); // TODO: AppError

    return fetch(`${window.location.origin}${BFF_LINKS.LOGOUT}`, {
      method: 'POST',
      credentials: 'include',
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
      user: this.mapUser(raw.user as Record<string, unknown>),
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

  async register(email: string, password: string): Promise<User> {
    const response = await this.#client.mutation({
      register: {
        __args: { email, password },
        id: true,
        email: true,
        status: true,
      },
    });
    return this.mapUser(response.register);
  }

  async login(email: string, password: string): Promise<AuthPayload> {
    const response = await this.#client.mutation({
      login: {
        __args: { email, password },
        accessToken: true,
        refreshToken: true,
        user: {
          id: true,
          email: true,
          status: true,
        },
      },
    });
    return this.mapAuthPayload(response.login);
  }

  async refreshToken(token: string): Promise<TokenPair> {
    const response = await this.#client.mutation({
      refreshToken: {
        __args: { refreshToken: token },
        accessToken: true,
        refreshToken: true,
      },
    });
    return this.mapTokenPair(response.refreshToken);
  }

  async requestPasswordReset(email: string): Promise<ResetRequestPayload> {
    const response = await this.#client.mutation({
      requestPasswordReset: {
        __args: { email },
        success: true,
        token: true,
      },
    });
    return this.mapResetRequest(response.requestPasswordReset);
  }

  async resetPassword(
    email: string,
    token: string,
    newPassword: string,
  ): Promise<boolean> {
    const response = await this.#client.mutation({
      resetPassword: {
        __args: { email, token, newPassword },
      },
    });
    return response.resetPassword;
  }

  async logout(token?: string): Promise<boolean> {
    try {
      // 1. Уведомляем бекенд (если есть токен или куки позволят)
      await this.#client.mutation({
        logout: {
          __args: {
            refreshToken: token || '',
          },
        },
      });
    } catch (e) {
      console.error('Backend logout failed, continuing with local cleanup', e);
    } finally {
      // 2. Очищаем куки в BFF в любом случае
      await this.#bffLogout();
    }

    return true;
  }

  async me(): Promise<User> {
    const response = await this.#client.query({
      me: {
        id: true,
        email: true,
      },
    });
    return this.mapUser(response.me);
  }
}
