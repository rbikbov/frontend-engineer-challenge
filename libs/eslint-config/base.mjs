import reactHooks from 'eslint-plugin-react-hooks';

import js from '@eslint/js';
import jsxA11y from 'eslint-plugin-jsx-a11y';
import ts from 'typescript-eslint';

/**
 * @type {import('eslint').Linter.Config[]}
 */
export const baseConfig = ts.config(
  {
    ignores: [
      '**/node_modules/**',
      '**/.next/**',
      '**/dist/**',
      '**/out-tsc/**',
      '**/test-output/**',
    ],
  },
  js.configs.recommended,
  ...ts.configs.recommended,
  jsxA11y.flatConfigs.recommended,
  {
    files: ['**/*.ts', '**/*.tsx', '**/*.js', '**/*.jsx'],
    plugins: {
      'react-hooks': reactHooks,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      'no-unused-vars': 'off',
      '@typescript-eslint/no-unused-vars': [
        'warn',
        {
          argsIgnorePattern: '^_',
          varsIgnorePattern: '^_',
          caughtErrorsIgnorePattern: '^_',
        },
      ],
      '@typescript-eslint/triple-slash-reference': 'off',
      'no-console': 'warn',
    },
  },
  {
    files: ['**/*.js', '**/*.mjs', '**/*.cjs'],
    languageOptions: {
      globals: {
        module: 'readonly',
        require: 'readonly',
        process: 'readonly',
        __dirname: 'readonly',
        exports: 'readonly',
      },
    },
    rules: {
      '@typescript-eslint/no-require-imports': 'off',
    },
  },
);

export default baseConfig;
