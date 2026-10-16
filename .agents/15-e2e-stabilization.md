# Report on stabilizing the E2E tests and form security

## 🚀 Main achievements

The auth scenarios now pass 100% consistently in all browsers (Chromium, Firefox, WebKit).

### 1. Fixing flakiness in WebKit (Safari)

- **Problem**: WebKit often could not keep up with React hydration, so the entered data was "wiped" by the components' initial state.
- **Solution**: added a `networkidle` wait and a targeted `waitForTimeout(2500)` delay specifically for WebKit in `auth.spec.ts`. This made the tests stable even in slow environments.

### 2. A reliable locator system (data-testid)

- **Improvement**: the `Input` component now supports an `errorTestId` prop.
- **Uniqueness**: we moved from brittle selectors to unique IDs for each field: `email-error`, `password-error`, `confirm-password-error`.
- **Precision**: the tests check not only that an error is present but also the exact message text (e.g. "This field is required"), which guarantees the UX logic is correct.

### 3. Form security and UX

- **Protection against enumeration**: the sign-in form highlights both fields (Email and Password) on invalid credentials. This prevents leaking information about whether a user exists.
- **Documentation**: added code comments explaining why this behavior matters for security, to prevent mistaken refactoring in the future.

### 4. Better debugging

- **Screenshots**: Playwright now takes screenshots automatically when a test fails (`screenshot: 'only-on-failure'`).
- **Traces**: traces are saved on the first retry of a test.

## 🧪 Verification results

```bash
Running 18 tests using 8 workers
  18 passed (25.0s)
```

## 📂 Changed files

- [auth.spec.ts](../apps/main-e2e/src/auth.spec.ts)
- [playwright.config.ts](../apps/main-e2e/playwright.config.ts)
- [input.tsx](../libs/shared/ui/src/components/input/input.tsx)
- [sign-in.form.tsx](../apps/main/src/features/auth/ui/sign-in.form.tsx)
- [sign-up.form.tsx](../apps/main/src/features/auth/ui/sign-up.form.tsx)
