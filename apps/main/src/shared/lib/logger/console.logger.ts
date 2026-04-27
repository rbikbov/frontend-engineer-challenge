/* eslint-disable no-console */
import { Logger, LoggerConfig } from './contract';

export class ConsoleLogger implements Logger {
  private config: LoggerConfig;

  constructor(config: LoggerConfig) {
    this.config = config;
  }

  info(...args: unknown[]): void {
    if (this.config.env !== 'production') {
      console.info('[INFO]', ...args);
    }
  }

  error(...args: unknown[]): void {
    if (this.config.env !== 'production') {
      console.error('[ERROR]', ...args);
    }
  }

  warn(...args: unknown[]): void {
    if (this.config.env !== 'production') {
      console.warn('[WARN]', ...args);
    }
  }

  debug(...args: unknown[]): void {
    if (this.config.env !== 'production') {
      console.debug('[DEBUG]', ...args);
    }
  }
}
