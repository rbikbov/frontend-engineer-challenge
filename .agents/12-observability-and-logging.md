# 12: Observability & Logging Strategy

A centralized logging system was introduced to make the app's behavior transparent and to simplify debugging in production.

## 1. Logger architecture

The logger lives in `apps/main/src/shared/lib/logger` and follows the **Dependency Inversion** principle:

- **`contract.ts`**: defines the `Logger` interface. All app code depends only on this interface.
- **`console.logger.ts`**: a concrete implementation that writes to the console.
- **`logger.factory.ts`**: a factory that creates the right logger depending on the environment and type.

## 2. Where logging is applied

We added logging at three critical levels:

### A. BFF (Server Side)

The Next.js API routes log:

- All sign-in, token refresh and logout attempts.
- Errors when talking to the main GraphQL backend (with an error stack dump).
- _Files_: `apps/main/src/app/api/auth/*/route.ts`.

### B. Model Layer (Client Side Hooks)

The React hooks that manage the forms log:

- The start of a submit.
- Successful sign-ins (important for analytics).
- Errors (API Error, Network Error).
- _Files_: `apps/main/src/features/auth/model/use-sign-in-form.ts`.

### C. GraphQL Client

Network errors and Silent Refresh problems are logged.

## 3. Scalability

Thanks to the Factory pattern, new logger types can be added easily:

- **SentryLogger**: sends errors to Sentry automatically.
- **AnalyticsLogger**: sends business events to systems such as Google Analytics or Amplitude.

## 4. What we observe in Next.js

1. **Client Errors**: unhandled exceptions in the browser (via the `ErrorBoundary` in `app/error.tsx`).
2. **User Flow**: the sign-in funnel (how many users started signing in and how many finished successfully).

---

## Result

The logger lays the foundation for a full picture of what happens "under the hood", both on the server and in the user's browser, which is critical for production use.
