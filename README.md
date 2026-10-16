# 🌌 Orbitto Service: Advanced Frontend Challenge

This repository is more than a layout of the mockups. It shows an end-to-end engineering approach to building a scalable and secure frontend architecture.

**Original challenge description**: [README_challenge.md](README_challenge.md)

---

## 🌐 Live demo (Deployment)

_The link below opens a working version of the frontend deployed on Vercel. To keep deployment simple, keep security strict and work around browser policies (CORS, SameSite and HTTPS → HTTP mixed content), requests to the GraphQL backend are transparently proxied through the built-in Next.js BFF layer (rewrites in next.config.ts). The access_token lifetime is 1 minute for quick testing, the refresh_token lifetime is 7 days:_

> [!IMPORTANT]
> **[Open the project demo](https://rbikbov-orbitto-main-chi.vercel.app/auth/sign-up)**
>
> _Note: to keep search engines from indexing this temporary demo, `apps/main/public/robots.txt` disallows everything (`Disallow: /`)._

---

## 🚀 Getting started

**Backend repository**: [rbikbov/engineer-challenge](https://github.com/rbikbov/engineer-challenge)

1. **Install dependencies**:
   ```bash
   pnpm install
   ```
2. **Configure the environment**:
   Copy `.env.example` to the root of the app:
   ```bash
   cp .env.example .env
   ```
3. **Run in development mode**:
   ```bash
   pnpm dev
   ```
   _The app is available at `localhost:3000` (Main) and `localhost:3001` (Dashboard, via the proxy)._

### Tests

The project has three levels of testing to keep the critical flows reliable.

#### Unit tests (logic and schemas)

Data validation and business logic in `libs/shared/api`.

**Coverage:**

- `auth.schema.spec.ts`: strict email validation and the password match check on sign-up.
- `auth-error-mapper.spec.ts`: correct parsing of dynamic GraphQL errors (Network, Validation, 5xx).
- `url.spec.ts`: redirect URL validation to protect against Open Redirect attacks.

```bash
npx nx test api
# or run vitest directly
npx vitest run -c libs/shared/api/vitest.config.ts
```

#### Integration tests (UI components and pages)

How React components interact with forms, validation and page state (JSDOM).

**Coverage:**

- `sign-in.form.spec.tsx`: rendering the sign-in form, handling `loading` states.
- `sign-up.form.spec.tsx`: data submission and display of client-side errors.
- `password-recovery.form.spec.tsx`: account recovery by email.
- `password-set.page.spec.tsx`: **security logic**: reading the token, cleaning up the URL immediately (protecting the browser history) and switching between the Success/Error states.

```bash
npx nx test main
# or run specific tests
npx vitest run -c apps/main/vitest.config.ts
```

#### E2E tests (browser scenarios)

Full user journeys with Playwright.

**Coverage:**

- `auth.spec.ts`: end-to-end sign-in and sign-up flows and validation messages in Chromium, WebKit and Firefox.

> **Note**: the E2E tests intentionally run against the real backend through the BFF. This verifies the integration for real: setting HttpOnly cookies, handling the actual API contracts and the network. In production CI/CD, a test database or an ephemeral environment is expected to avoid mutating data.

```bash
# Run all E2E tests (starts the server on :3000 automatically)
npx nx e2e main-e2e
```

> [!TIP]
> After the tests, the logs may show a wrong relative path to the report (`../../dist/...`). To open the latest report from the project root, use:
>
> ```bash
> pnpm exec playwright show-report dist/.playwright/apps/main-e2e/playwright-report
> ```

---

## 🏗 Frontend architecture

### Tech stack

- **Framework**: Next.js 15 (App Router + Pages Router in different zones)
- **Monorepo**: Nx + PNPM
- **Styling**: Tailwind CSS v4 (native CSS-first approach)
- **State Management**: TanStack Query v5 (React Query)
- **Contract**: GraphQL (via a typed SDK)
- **Architecture**: Feature-Sliced Design (FSD)

### Project structure

```text
├── apps/
│   ├── main/           # Zone 1: Auth flow, Landing (BFF Gatekeeper)
│   ├── dashboard/      # Zone 2: Internal dashboard (user protected area)
│   └── main-e2e/       # End-to-end tests (Playwright)
├── libs/
│   ├── shared/         # Reusable layers (FSD style)
│   │   ├── ui/         # UI kit and design system (Tailwind v4)
│   │   ├── api/        # API clients, SDK and auth logic
│   │   ├── config/     # Environment configuration (Env)
│   │   ├── constants/  # Shared constants
│   │   └── lib/        # Shared helpers and utilities
│   ├── eslint-config/  # Shared lint rules
│   └── typescript-config/ # Base TS settings
├── docs/adr/           # Architecture Decision Records (ADR)
└── .agents/            # Development logs (engineering journey)
```

### Architectural pillars

The project rests on three fundamental decisions, described in detail in the **Architecture Decision Records (ADR)**:

1. **[BFF & Secure Auth (ADR-002)](docs/adr/002-secure-auth-strategy.md)**: tokens are never stored anywhere client-side code can reach. The Backend-for-Frontend pattern is used with `HttpOnly` cookies and forwarding of the client IP (`X-Forwarded-For`) so rate limiting keeps working. Only token-related requests are proxied, not all requests.
2. **[Multi-Zones Scalability (ADR-001)](docs/adr/001-multi-zones-architecture.md)**: Next.js Multi-Zones split the auth flow and the dashboard into independent apps. Teams can work autonomously while keeping a single domain and a shared design system.
3. **[FSD & Dependency Inversion (ADR-003)](docs/adr/003-fsd-and-dependency-inversion.md)**: strict Feature-Sliced Design with the `deps` pattern for dependency inversion. This rules out circular imports and makes components easy to test.

### Key engineering decisions

#### BFF (Backend-for-Frontend) & Security

The central decision of the project is not storing JWTs in `localStorage`.

- **Mechanism**: the BFF proxies only three critical routes: `login`, `refresh` and `logout`. All other requests (e.g. `me` and future business requests) go straight from the client to the backend. This is a deliberate choice so the BFF does not have to proxy every future request. To support it, the backend was changed to read the access token directly from cookies, so direct requests are authenticated without the BFF.
- **Security**: tokens are stored in `HttpOnly, Secure, SameSite: Strict` cookies. Browser JS has no access to secrets.
- **Open Redirect Protection**: the `callbackUrl` parameter is strictly validated. Redirects are allowed only to internal app paths or to the trusted domain from `NEXT_PUBLIC_APP_URL`, which rules out phishing via URL manipulation.
- **Infrastructure**: `X-Forwarded-For` is forwarded so rate limiting on the backend keeps working.

#### API Client & IoC (Inversion of Control)

The API client is built by the `createAuthApi` factory, which injects dependencies (logger, config, refresh handler) at runtime instead of relying on global state. This prevents leaks between requests during SSR and makes it easy to swap the implementation in tests.

- **Concurrency**: a lock via `#refreshPromise`: when one request triggers a token refresh, all other concurrent requests wait for it to finish. This prevents both session invalidation and a storm of simultaneous refresh requests.

#### Choosing a framework: why Next.js and not an SPA (React/Vue)?

Classic React/Vue SPAs were considered for their development speed and simple deployment. **Next.js** was chosen for these reasons:

- **Architectural separation**: the mockups naturally split into a public part (promo/BFF) and a protected dashboard.
- **Multi-Zones**: this "native" solution combines two independent apps (`main` and `dashboard`) under one domain without complex Nginx setup. It simplifies deployment and keeps the configuration visible in the repository. In production, the ports of the dependent apps (`dashboard`) should be closed to the outside, and all external traffic goes only through the host app (`main`).
- **BFF (Backend-for-Frontend)**: securely proxying auth (HttpOnly cookies) is a natural fit for Next.js API routes.

#### Monorepo: Nx vs Turborepo

**Nx** was chosen as the more mature and flexible solution with room to grow. Its strict dependency graph management and code generation outweighed Turborepo's lightness for a structure with several zones and shared libraries.

#### Backend integration and contracts

- **Choice of backend**: a specific backend fork with GraphQL support was chosen (for its schema, and because it is easy to change and run). This enables a **schema-first workflow**: any schema change is immediately reflected in the frontend types through SDK generation.
- **Backend changes**: the backend now accepts tokens directly from cookies. This keeps the BFF as "dumb" as possible: it proxies only 3 critical routes (login/refresh/logout) and the client context (IP, User-Agent, and Cookie as groundwork for the future). All other requests (e.g. `/me`) go directly from the frontend to the backend. This removes the BFF as a bottleneck and lets the system grow into a full `apiClient` as the user base grows (otherwise GraphQL would be overkill). A proper logout in Postgres and centralized session checks on the backend were also implemented.
- **GraphQL Client**: instead of heavyweight Apollo, a lightweight typed client generated from the schema is used. Together with **TanStack Query** this gives full control over request state and caching with a minimal bundle size. The SDK is intentionally committed to the repository (despite `.gitignore`) for stable CI builds without depending on the backend, and to make API changes visible in code review.
- **Unified Error Mapping**: the error translation system was improved and extended (ADR-004). GraphQL errors are mapped to semantically correct HTTP statuses (400, 429, 502), so the frontend can use standard error handling.

#### Architecture and code quality

- **FSD & SOLID**: strict Feature-Sliced Design. SOLID shows up as dependency inversion (DI) through interfaces: the API client and the logger are fully abstracted from their implementations, so GraphQL can be replaced with REST/gRPC without touching the UI layer.
- **Module boundaries**: linters enforce the public APIs of modules (`index.ts`) and forbid deep imports.
- **Investment in tooling**: a lot of time went into setting up linters (FSD, import sorting, Tailwind classes) and automating routine tasks (code generation, auto-formatting). This took time now, but it will save much more later by preventing merge conflicts and keeping the code consistent.

### 📊 Bundle optimization and analysis

`@next/bundle-analyzer` is set up to keep an eye on build size and quality.

```bash
pnpm run analyze
```

Interactive reports for client and server code are generated in `.next/analyze/`.

### 🧠 Engineering journey (Agent Logs)

The whole development process is documented in the `.agents/` folder:

- **[01: Setup Monorepo](.agents/01-setup-monorepo.md)**
- **[02: Main App & UI Lib](.agents/02-add-main-app-and-ui-lib.md)**
- **[03: Relocate UI & Consolidate Deps](.agents/03-relocate-ui-and-consolidate-deps.md)**
- **[04: Setup Git Hooks](.agents/04-setup-git-hooks.md)**
- **[05: Modularize Configs](.agents/05-modularize-configs.md)**
- **[06: Setup Storybook](.agents/06-setup-storybook.md)**
- **[07: Modernize UI Components](.agents/07-modernize-ui-components.md)**
- **[08: FSD Architecture Enforcement](.agents/08-fsd-architecture-enforcement.md)**
- **[09: Monorepo Optimization and Multi-Zones](.agents/09-monorepo-optimization-and-multi-zones.md)**
- **[10: Secure Auth & Architecture Refinement](.agents/10-secure-auth-and-architecture-refinement.md)**: secure auth, the BFF and dependency inversion.
- **[11: Testing Strategy & QA](.agents/11-testing-strategy-and-quality-assurance.md)**: testing levels (Unit, Integration, E2E) and tools.
- **[12: Observability & Logging](.agents/12-observability-and-logging.md)**: logging and monitoring architecture.
- **[13: Final Refactoring](.agents/13-final-refactoring.md)**: final refactoring.
- **[14: Readme Recovery](.agents/14-readme-recovery-after-rebase-and-rewrite.md)**: recovering the README after a rebase, and refactoring it.
- **[15: E2E Stabilization](.agents/15-e2e-stabilization.md)**: stabilizing the E2E tests.
- **[16: Code Review Fixes](.agents/16-code-review-fixes.md)**: addressing review comments.
- **[17: Final Polishing & Stabilization](.agents/17-final-polishing-and-stabilization.md)**: final security work, import refactoring and final testing.

---

## ⚖️ Trade-offs

- **Domain coupling**: HttpOnly (`sameSite: "strict"`) cookies require the frontend and backend to live on the same domain (or subdomains) for browser security to work correctly. Cookie handling is encapsulated in the BFF layer. Browser JS has no access to secrets.
- **Proxying**: only security-critical requests (login/logout/refresh) are proxied, the rest go to the backend directly. This lowers the load on the BFF but requires CORS support on the backend.
- **Backend error format**: the backend returns errors as plain text strings (e.g. `"invalid password:..."`). This forced a fragile regex-based mapping. A production solution **needs machine-readable error codes**.
- **Retry & Recovery**: there is basic handling for `503 Service Unavailable` errors, but a full retry strategy (Exponential Backoff) is still needed.
- **Password recovery email**: this is currently a huge security hole: the backend returns the token directly in the response. The backend has to be extended to send the email to the user. The frontend uses a `window.confirm` that lets you copy the password reset link, purely to show that the frontend part is ready. When the `/auth/password-set?token=...` page loads, the token is **immediately** saved to component state through a `useState` initializer, and then a `useEffect` calls `router.replace` to clean up the URL, still on the same page while the user fills in the form. This is deliberate: sensitive data is removed from the address bar and browser history right after it is read, without waiting for the submit.
- **Rate-limit retry_after**: the backend does not return how long the limit lasts, so the user only sees "Please try again later" and does not know how long to wait. The backend needs to provide this, and a countdown timer should be added for a better user experience.
- **Home page and Dashboard**: the landing page (`main`) and the `dashboard` app are intentionally minimal; most of the time went into the auth flow, architecture and security. These pages exist to demonstrate Multi-Zones and a protected route, not to be a full UI.
- **Static asset caching across zones**: using `assetPrefix` (e.g. `/dashboard-static`) for correct routing in Multi-Zones means shared dependencies (React, Shared UI) have different URLs in different zones. The browser therefore cannot reuse them from cache when moving between zones, even if the file hashes are identical.

---

## 🚀 What's next? (Production Roadmap)

_Sorted by how critical each item is for going to production._

### 1. Backend security (critical)

These items follow directly from the limitations of the current backend listed under [Trade-offs](#%EF%B8%8F-trade-offs):

- **Actually sending the recovery email**: the backend currently returns the reset token right in the response body, which is a critical vulnerability. The backend has to send the link to the user's email via SMTP.
- **Rate limiting with retry_after**: it would be good if the backend returned a `retry_after` field (for `too many attempts` in GraphQL responses and `429` from the BFF) with the exact wait time, so the frontend can show a countdown timer.
- **Structured Error Codes**: move from parsing strings to machine-readable error codes. The backend should return codes like `ERR_AUTH_PASSWORD_TOO_WEAK` tied to specific fields (`field path`), which would remove the fragile regex mapping in `auth-error-mapper.ts`.

### 2. Session Management

- **Token Rotation**: add proactive access token refresh when the TTL expires, **in addition to** the reactive handling of `401 Unauthorized`, based on metadata in separate JS-readable cookies that contain only the token lifetime (no secrets).

### 3. API Client & Backend Contract

- **Global Interceptor**: move the `refresh` logic and `401` handling into a single transport interceptor.
- **Retry Strategy**: add Exponential Backoff for retries on errors such as 503.

### 4. CI/CD & DevOps

- **Deployment**: set up a CI/CD pipeline to build, lint, run the tests and deploy to dev/stage/production automatically.
- **Docker**: containerize the services and add Docker Compose for local development (DX) and deployment.
- **Affected Builds**: configure the CI pipeline to build and test only the Nx graph modules affected by a change.
- **Shared Static Assets (CDN)**: serve the static assets of all zones from a single CDN domain (e.g. `assets.example.com`). The browser can then cache shared chunks (React, UI lib) once for all zones, which removes the current `assetPrefix` trade-off.

### 5. Observability & Monitoring

- **Telemetry**: connect Sentry for real-time tracking of BFF and client errors.
- **Performance Vitals**: collect Web Vitals on the client (`useReportWebVitals`) and measure latency in the BFF API routes.

### 6. Testing & Quality

- **Visual Regression**: add screenshot testing (Playwright Visual Regression) for the design system libraries.

### 7. DX & Type-Safety

- **Strict Env Validation**: extend the existing environment variable validation to cover the dependent apps (`dashboard`) to reduce the risk of mismatches between zones.

### 8. SEO & Public Release

- **Lift the indexing restrictions**: before release, update `apps/main/public/robots.txt` (it is currently `Disallow: /`) so search engines can index the project.

---

## 🛠 Quality Assurance

Before running `git push`, it is a good idea to run these commands to make sure the project is stable and to avoid hot fixes after a CI failure.

### 📋 Main check cycle

1. **Type checking**: check all apps and libraries for type errors. The linter often misses deep type mismatches between modules.
   ```bash
   pnpm typecheck
   ```
2. **Tests**: check the logic in `libs/shared/api` and the components in the apps.
   ```bash
   pnpm test
   ```
3. **Build**: make sure Next.js builds all zones successfully (checks tree-shaking and env variables).
   ```bash
   pnpm build
   ```
4. **End-to-end tests (E2E)**: check the main flow (Auth/Registration) in real browsers.
   ```bash
   pnpm e2e
   ```

### 💡 Nx tips

- **Check only what changed**: as the project grows, use the `--affected` flag:
  ```bash
  npx nx affected -t test build
  ```
- **Reset the cache**: if Nx behaves oddly (does not see files or targets):
  ```bash
  npx nx reset
  ```
- **Bundle analysis**: check how a feature affects the bundle size:
  ```bash
  pnpm analyze
  ```
