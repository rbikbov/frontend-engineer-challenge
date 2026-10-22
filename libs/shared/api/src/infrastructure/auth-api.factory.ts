import type { AuthApi } from '../contract/auth-api.interface';
import { GraphQLAuthApi } from '../infrastructure/graphql/auth/auth-api.graphql';

// New transports (REST, mocks) implement AuthApi and get a case here
export type ApiType = 'graphql';

export interface AuthApiConfig {
  type: ApiType;
  endpoint: string;
  options?: {
    headers?: Record<string, string>;
    onRefreshSession?: () => Promise<boolean>;
  };
}

/**
 * Factory to create the appropriate AuthApi implementation
 */
export function createAuthApi(config: AuthApiConfig): AuthApi {
  switch (config.type) {
    case 'graphql':
      return new GraphQLAuthApi(config.endpoint, config.options);
    default:
      return new GraphQLAuthApi(config.endpoint, config.options);
  }
}
