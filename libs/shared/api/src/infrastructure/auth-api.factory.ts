import type { AuthApi } from '../contract/auth-api.interface';
import { GraphQLAuthApi } from '../infrastructure/graphql/auth/auth-api.graphql';
import { MockAuthApi } from '../mock';

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
  const type = config.type;

  switch (type) {
    case 'graphql':
      return new GraphQLAuthApi(config.endpoint, config.options);
    case 'msw':
      return new MockAuthApi(config.endpoint, config.options);
    default:
      return new GraphQLAuthApi(config.endpoint, config.options);
  }
}
