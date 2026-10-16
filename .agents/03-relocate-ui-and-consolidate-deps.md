# Stage 3: Restructuring the libraries and optimizing dependencies

In this stage the UI library was moved into a more structured directory, and dependency management was centralized at the monorepo root.

## Actions taken:

1.  **Relocating the library**:
    - Moved the `ui` library from `libs/ui` to `libs/shared/ui`.
    - Created the `libs/shared` folder to group shared resources.

2.  **Updating configurations**:
    - `pnpm-workspace.yaml`: set up recursive scanning of the `libs` folder (`libs/**`).
    - `tsconfig.base.json`: updated the `@workspace/ui` path mapping and added project references.
    - `apps/main/tsconfig.json`: updated paths and project references. Removed `rootDir: "src"` so external libraries resolve correctly during the build.
    - `libs/shared/ui/tsconfig.json`: updated the `extends` paths because of the new nesting.

3.  **Consolidating dependencies**:
    - Removed `next`, `react` and `react-dom` from `apps/main/package.json`.
    - These dependencies are now managed centrally in the root `package.json`, following the **Single Version Policy**.

4.  **Verification**:
    - Ran `pnpm install` and confirmed that the workspace symlinks were created.
    - Built the `main` app in strict mode (with type checking) via `npx next build`.

## Decisions made:

- **The libs/shared split**: a `shared` subfolder was chosen for future scalability (room to add `libs/features`, `libs/api`, etc.).
- **Removing rootDir in the app**: a standard move for Next.js in Nx monorepos that lets TypeScript "see" the source code of libraries outside the main app.
- **A single Next/React version**: simplifies maintenance and prepares for the Multi-Zones integration.
