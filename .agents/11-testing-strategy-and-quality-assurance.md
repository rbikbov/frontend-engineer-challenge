# 11: Testing Strategy & Quality Assurance

A multi-level testing strategy was introduced to keep the critical parts of the app reliable and prevent regressions.

## 1. The testing pyramid

We follow a balanced approach and split responsibilities between different tools:

### Unit tests (libraries and logic)

- **Tooling**: [Vitest](https://vitest.dev/).
- **Subject**: Zod validation schemas in `libs/shared/api`.
- **Why**: quickly check all edge cases (valid email, matching passwords, required fields) without rendering any UI.
- **Path**: `libs/shared/api/src/validation/*.spec.ts`.

### Integration tests (UI and state)

- **Tooling**: Vitest + [JSDOM](https://github.com/jsdom/jsdom) + [React Testing Library](https://testing-library.com/docs/react-testing-library/intro/).
- **Subject**: the auth forms (`SignInForm`, `SignUpForm`, `PasswordRecoveryForm`).
- **Why**: make sure the UI components interact correctly with `react-hook-form`, show validation errors and call the submit handlers correctly.
- **Path**: `apps/main/src/features/auth/ui/*.spec.tsx`.

### E2E tests (end-to-end scenarios)

- **Tooling**: [Playwright](https://playwright.dev/).
- **Subject**: complete auth flows in a real browser.
- **Why**: guarantee that all parts of the system (Frontend, BFF, Backend) work together. Check navigation and the real user experience.
- **Path**: `apps/main-e2e/src/*.spec.ts`.

## 2. Key decisions

### Vitest in the monorepo

We chose Vitest for its speed and native ESM/TypeScript support. Each library and app has its own `vitest.config.ts`, so tests can be run in isolation through Nx.

### JSDOM for integration tests

To test React components in `apps/main`, we set up the `jsdom` environment. It emulates browser behavior in Node.js, which is much faster than launching a full browser but still gives enough confidence that the UI logic works.

### Semantic selectors

In tests we prefer querying by role (`getByRole`, `findByText`) and accessible name (`aria-label`). This checks accessibility (A11y) at the same time and makes the tests less brittle when the markup changes.

## 3. How to run

| Level                | Command                       |
| :------------------- | :---------------------------- |
| **All tests**        | `npx nx run-many -t test,e2e` |
| **API Unit**         | `npx nx test api`             |
| **Main Integration** | `npx nx test main`            |
| **E2E**              | `npx nx e2e main-e2e`         |
