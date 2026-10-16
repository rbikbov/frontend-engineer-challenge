# 17: Unified Error Handling & Final UI Architecture

This stage formalized error handling, simplified the business flows and gave the monorepo architecture its final polish.

## 🛠 Key changes

### 1. Unified error handling (ADR-004)

- **Semantic Mapping**: GraphQL errors are formally mapped to semantically correct responses (400 Bad Request, 429 Too Many Requests). This lets the frontend react to validation and rate-limit problems in a uniform way.
- **Retry-After Support**: added the `RateLimitError` class. The system can now extract the `Retry-After` header and pass it on to the user, so blocks are transparent.
- **ADR Formalization**: created `docs/adr/004-unified-error-handling-and-bff-translation.md`, which establishes the error handling strategy for future modules.

### 2. Password Reset Flow refactoring

- **Simpler contract**: the `email` parameter was removed from the password change flow. The user is now identified strictly by the secure `token`, which simplified both the UI and the API contract.

### 3. UI library architecture (Deep Imports)

- **Barrel Files Removal**: all re-exports were removed from the root of `@workspace/ui`. This is a strategic decision for more explicit imports, cleaner tree-shaking and preventing circular dependencies in the monorepo.
- **Strict Deep Imports**: the whole project now imports from specific subfolders (e.g. `@workspace/ui/components`).
- **Build Stabilization**: restored an empty `index.ts` as the entry point Vite requires, which keeps the build working under the new rules.

### 4. Final QA and stabilization

- **Security Integration Tests**: created `password-set.page.spec.tsx`. The tests verify:
  - Safe extraction of the token and its cleanup.
  - Switching between the Success/Error screens.
  - No leftover DOM nodes (the form is unmounted).
- **Type Safety**: all new test code is strictly typed (no `any`), using `vi.mocked()` and `Partial` for mocks.
- **Verified Logout Strategy**: a guaranteed sign-out strategy for systems with HttpOnly cookies. The `setLoggingOut` method blocks the refresh interceptor in `onMutate` (protection against race conditions), and the page reload (`window.location.reload()`) happens only in `onSuccess`. This ensures the session is considered finished only after the server confirms it, while local state is cleared naturally by the page reload.
