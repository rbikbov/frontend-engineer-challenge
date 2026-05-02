import { defineConfig } from 'vitest/config';

import react from '@vitejs/plugin-react';

import path from 'path';

export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: [path.resolve(__dirname, './src/test-setup.ts')],
    include: ['src/**/*.spec.{ts,tsx}'],
  },
  resolve: {
    alias: {
      '@workspace/ui': path.resolve(__dirname, '../../libs/shared/ui/src'),
      '@workspace/api': path.resolve(__dirname, '../../libs/shared/api/src'),
      '@workspace/lib': path.resolve(__dirname, '../../libs/shared/lib/src'),
      '@workspace/constants': path.resolve(
        __dirname,
        '../../libs/shared/constants/src',
      ),
      '@shared': path.resolve(__dirname, './src/shared'),
      '@features': path.resolve(__dirname, './src/features'),
      '@widgets': path.resolve(__dirname, './src/widgets'),
    },
  },
});
