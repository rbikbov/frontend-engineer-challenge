# 13: Final refactoring and fixing architectural conflicts

During the final stabilization of the project, a refactoring pass removed hidden bugs and enforced strict boundaries between the client and the server.

## 🛠 Diff breakdown by file:

### 1. Metadata and UI presentation layer updates

- **Layout metadata (`apps/main` and `apps/dashboard`)**: replaced the auto-generated Nx placeholders (`Welcome to...`) with proper Orbitto titles.
- **Inputs and theming (`libs/shared/ui`)**: tuned the font CSS variables and finalized the base components.
- **Auth forms (`apps/main/src/features/auth`)**: removed `TODO`s from the hooks and stabilized the UI bindings.

### 2. Infrastructure and documentation

- **`.husky/pre-push`**: runs `typecheck` automatically before a push.
- **`package.json`**: added a root `"typecheck": "nx run-many -t typecheck"` script.
- **`tsconfig.json` / `libs/shared/*/tsconfig.json`**: configured `paths` and Project References for strict end-to-end type checking across the monorepo.
- **`nx.json`**: defined the `typecheck` task and its caching in the Nx graph.

### 3. Bundle optimization and analysis

- **`apps/main/next.config.js` & `apps/dashboard/next.config.js`**: added `@next/bundle-analyzer` to keep an eye on chunks at build time.
- **`package.json`**: added a combined `"analyze"` script.

### 4. BFF isolation and API client refactoring

- **`apps/main/src/pages/` -> `apps/main/src/pages_/`**: resolved FSD routing conflicts in the Next.js environment.
- **`middleware.ts`**: configured the `matcher` to ignore static files and the API.
- **`apps/main/src/shared/config` -> `lib/shared/config`**: moved the config into a shared library.
- **`libs/shared/api/*`**: removed the Singleton pattern. Moved to Inversion of Control (IoC) and flexible API client factories.
- **`libs/shared/api/src/contract/auth.errors.ts`**: extracted the domain auth errors into a strict contract for unified error mapping on the client.
- **`libs/shared/api/.../auth-error-mapper.spec.ts`**: covered with tests the logic that maps GraphQL backend errors to unified client codes.
- **`apps/main/src/app/api/auth/_core`**: refactored and extracted the reusable parts of the BFF.
- **`apps/dashboard` & `apps/main`**: adapted the sign-out hooks (`use-sign-out`) and form handling (`use-*-form.ts`) to the updated API contracts and the IoC logic.
