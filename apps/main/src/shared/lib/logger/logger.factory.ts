import { envConfig } from '@workspace/config/env';

import { ConsoleLogger } from './console.logger';
import type { Logger, LoggerConfig } from './contract';

export type LoggerType = 'console' | 'sentry';

export interface LoggerFactoryConfig {
  type: LoggerType;
  loggerConfig: LoggerConfig;
}

/**
 * Factory to create the appropriate Logger implementation
 */
export function createLogger(factoryConfig: LoggerFactoryConfig): Logger {
  switch (factoryConfig.type) {
    case 'console':
      return new ConsoleLogger(factoryConfig.loggerConfig);
    // TODO: implement sentry logger
    // case 'sentry':
    //   return new SentryLogger(factoryConfig.loggerConfig);
    default:
      return new ConsoleLogger(factoryConfig.loggerConfig);
  }
}

export const logger = createLogger({
  type: 'console',
  loggerConfig: { env: envConfig.NEXT_PUBLIC_ENV },
});
