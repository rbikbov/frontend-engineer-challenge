# Stage 1: Initializing the monorepo

This stage set up the basic project skeleton for scalability and a convenient development workflow.

## Actions taken:

1.  **pnpm workspace setup**:
    - Created `pnpm-workspace.yaml`.
    - Defined directories for apps (`apps/`) and libraries (`libs/`).

2.  **Nx integration**:
    - Initialized Nx with `npx nx@latest init`.
    - Configured `nx.json` for task management and caching.

3.  **Folder structure**:
    - Created the `apps/` and `libs/` directories.
    - Added `.gitkeep` files so Git tracks the empty folders.

4.  **Dependency management**:
    - Removed `package-lock.json` and ran `pnpm install` to generate `pnpm-lock.yaml`.

5.  **Git configuration**:
    - Created `.gitignore` with rules for Node.js, pnpm and Nx.

6.  **Documentation**:
    - Updated the root `README.md` with a description of the monorepo structure and basic commands.

## Decisions made:

- **pnpm**: chosen as the package manager for its speed and disk efficiency.
- **Nx**: used as the task orchestrator for caching and managing dependencies between projects in the monorepo.
- **apps/libs structure**: the standard Nx approach, which clearly separates runnable code from reusable logic and components.
