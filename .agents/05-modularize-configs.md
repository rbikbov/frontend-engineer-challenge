# Stage 5: Modularizing configurations (TypeScript and ESLint)

This stage created shared, reusable TypeScript and ESLint configurations as internal monorepo packages. This avoids duplication and keeps quality standards consistent across the project.

## Actions taken:

1. **The `@workspace/typescript-config` package**:
   - Created a base config `base.json` for shared libraries.
   - A Next.js-specific config `nextjs.json` extends the base config.
   - The root `tsconfig.base.json` acts as a proxy file that extends the new base config.

2. **The `@workspace/eslint-config` package**:
   - Created a base config `base.mjs` with common rules (e.g. warnings on `console.log`).
   - Added Next.js-specific rules in `nextjs.mjs`.

3. **Migrating all apps and libraries**:
   - `apps/main` (Next.js) now uses the shared `nextjs` configs.
   - `apps/main-e2e` (Playwright) was adapted to use the shared `tsconfig` settings. The resulting Nx project graph parsing errors were fixed by downgrading TypeScript to the stable `5.9.3` branch and adding `ts-node`.
   - `libs/shared/ui` now extends `@workspace/typescript-config/base.json`.

4. **Verification**:
   - Build, lint and type checks pass in the app (`npm run lint`, `tsc --noEmit`).
   - The Playwright E2E tests and the Next.js server start successfully.

## Decisions made:

- **npm package architecture**: the configurations are full packages linked via pnpm workspaces (a `workspace:*` dependency).
- **Fixing Nx Playwright Plugin conflicts**: rolling TypeScript back to a stable 5.x.x version and declaring `ts-node` explicitly restored the Nx parser.
