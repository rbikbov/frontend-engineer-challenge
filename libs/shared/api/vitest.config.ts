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
        './libs/shared/constants/src/index.ts',
      ),
      '@workspace/lib': path.resolve('./libs/shared/lib/src/index.ts'),
    },
  },
});
