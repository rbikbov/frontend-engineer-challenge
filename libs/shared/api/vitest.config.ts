import { defineConfig } from 'vitest/config';

import path from 'path';

export default defineConfig({
  test: {
    globals: true,
    environment: 'node',
  },
  resolve: {
    alias: {
      '@workspace/constants': path.resolve(
        __dirname,
        '../constants/src/index.ts',
      ),
      '@workspace/lib': path.resolve(__dirname, '../lib/src/index.ts'),
    },
  },
});
