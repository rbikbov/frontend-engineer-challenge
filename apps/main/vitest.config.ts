import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve('./apps/main/src/test-setup.ts')],
    include: ['src/**/*.spec.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@workspace/ui': path.resolve('./libs/shared/ui/src/index.ts'),
      '@workspace/api': path.resolve('./libs/shared/api/src/index.ts'),
      '@workspace/lib': path.resolve('./libs/shared/lib/src/index.ts'),
      '@workspace/constants': path.resolve(
        './libs/shared/constants/src/index.ts',
      ),
      '@app': path.resolve('./apps/main/src/app'),
      '@pages': path.resolve('./apps/main/src/pages_'),
      '@widgets': path.resolve('./apps/main/src/widgets'),
      '@features': path.resolve('./apps/main/src/features'),
      '@entities': path.resolve('./apps/main/src/entities'),
      '@shared': path.resolve('./apps/main/src/shared'),
    },
  },
});
