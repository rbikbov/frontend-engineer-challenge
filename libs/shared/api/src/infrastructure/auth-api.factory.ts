import type { AuthApi } from '../contract/auth-api.interface';
import { GraphQLAuthApi } from '../infrastructure/graphql/auth/auth-api.graphql';

export type ApiType = 'graphql' | 'msw';

export interface AuthApiConfig {
  type: ApiType;
  endpoint: string;
  options?: Record<string, unknown>;
}

/**
 * Factory to create the appropriate AuthApi implementation
 */
export function createAuthApi(config: AuthApiConfig): AuthApi {
  switch (config.type) {
    case 'graphql':
      return new GraphQLAuthApi(config.endpoint, config.options);
    case 'msw':
      throw new Error(
        'MSWAuthApi implementation is pending detailed transport setup',
      );
    default:
      return new GraphQLAuthApi(config.endpoint, config.options);
  }
}
