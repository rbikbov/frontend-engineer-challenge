# 16: Code Review Fixes & Improvements

**Status:** In Progress  
**Date:** 2026-05-02  
**Author:** Antigravity

**Context:** this report collects all fixes made after the code review, in the chronological order they were implemented.

---

## 🛠 Code review fixes

### 1. Stabilizing the E2E run (Nx + Playwright)

**Problem:** `pnpm e2e` hung: Nx waited for the dev server process to exit, which blocked the tests.  
**Solution:**

- Added a new `dev-e2e` target based on the `@nx/next:server` executor, which can report when the server is ready.
- Reconfigured Playwright to use this target.

### 2. Open Redirect protection

**Problem:** the `callbackUrl` parameter was not validated, which allowed phishing attacks via external redirects.  
**Solution:**

- Created an `isSafeUrl` utility in `@workspace/lib` that allows only internal paths or the trusted domain.
- The URL is now always sanitized before redirecting in `signin.page.tsx`.

### 3. Forwarding the client IP (X-Forwarded-For)

**Problem:** the advertised IP forwarding did not work: the headers were lost while merging in the GraphQL client, so the backend did not see the real IP for rate limiting.  
**Solution:**

- Fixed a bug in the `executeRequest` method of `GraphQLAuthApi`: the `X-Forwarded-For` and `Cookie` headers now reach the backend correctly.
- Set up IP extraction from the proxy chain in the BFF controllers.

### 4. A real logout mechanism

**Problem:** the `logout` mutation was a stub, and the session stayed alive in the database.  
**Solution:**

- The backend now actually revokes the session in Postgres.
- **Explicit contracts**: the arguments (tokens) of the `logout` and `refresh` mutations are now required. This is a deliberate decision: the BFF (as the owner of the HttpOnly cookies) is responsible for extracting the secret and passing it explicitly to the GraphQL layer. This makes the interaction easy to debug and removes the dependency on the backend reading cookies "implicitly".

---

## 🚀 Architectural improvements (Beyond Requirements)

Additional improvements that make the transport layer more reliable:

### 1. Extended error translation (ADR-004)

- **Rate Limit Detection**: added a `RateLimitError` class that can parse the block duration (`Retry-After`).
- **Semantic statuses**: all business errors were moved from 401 to the correct **400 Bad Request**.
- **Security**: `User-Agent` is forwarded for session auditing.

### 2. Formalizing decisions

- Created **ADR-004**, which establishes the error handling strategy as a project standard.

---

## 📦 Code changes

- `apps/main/src/features/auth/ui/signin.page.tsx` (Open Redirect fix)
- `libs/shared/lib/src/utils/url.ts` (isSafeUrl)
- `apps/main/src/app/api/auth/_core/create-auth-client.ts` (Headers propagation)
- `libs/shared/api/src/contract/auth-api.interface.ts` (Logout & Refresh params made required)
- `libs/shared/api/src/infrastructure/graphql/auth/auth-api.graphql.ts` (Logout & Refresh params made required)
- `docs/adr/004-unified-error-handling-and-bff-translation.md` (ADR)
- `libs/shared/api/src/contract/auth.errors.ts` (Add RateLimitError class)
- `libs/shared/api/src/infrastructure/graphql/auth/auth-error-mapper.ts` (RateLimitError mapping)
- `apps/main/src/app/api/auth/_core/error-response.ts` (BFF rate-limit handling)
- `libs/shared/api/src/contract/auth-api.interface.ts` (Add RateLimitError to throws)
- `libs/shared/api/src/hooks/use-auth-queries.ts` (Add RateLimitError to queries and mutations error types)
- `libs/shared/api/src/utils/error.ts` (Add RateLimitError extraction as ROOT_FIELD)
