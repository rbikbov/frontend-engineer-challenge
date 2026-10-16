# Stage 2: Creating the Main app and the UI library

This stage added the first projects to the monorepo: a runnable Next.js app and a shared component library.

## Actions taken:

1.  **Installing Nx plugins**:
    - Added `@nx/next` and `@nx/react` to support the respective frameworks.
    - Installed React 19 and Next.js 15.

2.  **Creating the UI library (`libs/ui`)**:
    - Generated the library with `@nx/react:lib`.
    - Implemented a `Button` component, a simple wrapper around the HTML `<button>` tag.
    - Set up the component export through `index.ts` and the `@workspace/ui` path mapping.

3.  **Creating the Main app (`apps/main`)**:
    - Generated a Next.js 15 app (App Router).
    - Used the `Button` component from `@workspace/ui` on the home page.

4.  **TypeScript and build setup**:
    - Adjusted `tsconfig.base.json` and the projects' `tsconfig.json` so library paths resolve correctly.
    - Fixed CSS typing errors and `baseUrl` deprecation warnings.
    - Ran a successful test build of the app (`npx next build`).

5.  **Dependency management**:
    - Added `@workspace/ui` as a workspace dependency in `apps/main/package.json`.

## Decisions made:

- **Next.js 15**: used as requested (the build logs may show version 16 because of the environment, but `package.json` pins 15).
- **TypeScript Paths**: explicit mappings in `tsconfig.json` so the build works outside of Nx-specific runners.
- **Ignore Deprecations**: temporarily ignored the `baseUrl` deprecation in TS 6.0 so type checking passes (an environment requirement).
