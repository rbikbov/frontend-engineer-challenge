# 10: Secure Auth & Architecture Refinement

In this phase we focused on turning the project from "just working" into "secure and scalable".

## Key changes

### 1. Security (BFF Pattern)

- Tokens are stored securely in HttpOnly cookies. They are not accessible to client-side JavaScript, which protects them from XSS attacks.
- Introduced the BFF (Backend-for-Frontend) pattern via Next.js API Routes. The BFF is used as a proxy **only for critical operations** (Login, Refresh, Logout). All other requests go directly to the backend, which now supports cookies.
  - _Trade-off_: the BFF carries much less load, but the frontend and backend have to live on the same domain (or subdomains) for `SameSite: Strict` cookies to work.
- The client IP is forwarded through the BFF (`X-Forwarded-For`) so rate limiting on the backend keeps working.

### 2. Security and stability improvements

- Implemented automatic token refresh (Silent Refresh) in `GraphQLAuthApi`.
- The client blocks concurrent requests during a refresh (Refresh Promise Locking) to prevent race conditions and redundant API calls.

### 3. Dependency Inversion (DI)

- Introduced dependency inversion for UI components.
- The `UserCard` component (Entity) is fully isolated from the API: the control buttons (Logout, Refetch) are passed in as render props through an `actions` object at the widget level.

### 4. Documenting decisions (ADR)

- Introduced the practice of keeping Architecture Decision Records.
- Created the first three ADRs describing the project's fundamental choices.

## Result

The project is ready for production use. The architecture is protected against XSS, scales easily through Multi-Zones and has clearly documented boundaries of responsibility.
