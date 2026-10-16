# Stage 4: Setting up Git hooks (Husky, commitlint, lint-staged)

This stage introduced tools for automating code quality and validating commit messages.

## Actions taken:

1.  **Installing dependencies**:
    - `husky`: a tool for managing Git hooks.
    - `@commitlint/cli` & `@commitlint/config-conventional`: validate commit messages against the Conventional Commits standard.
    - `lint-staged`: runs scripts (including linting and formatting) only on staged files.
    - `prettier`: automatic code formatting.

2.  **Husky setup**:
    - Initialized the hooks with `npx husky init`.
    - Added a `prepare: husky` script to `package.json` so the hooks are activated automatically after installing dependencies.

3.  **Commit validation setup**:
    - Created `commitlint.config.js` with the standard preset.
    - Added a `commit-msg` hook that runs `commitlint` on the message text.

4.  **Automatic code checks (Lint-Staged)**:
    - Added a `lint-staged` configuration to the root `package.json`.
    - `.ts`, `.tsx`, `.js` and `.jsx` files run `eslint --fix` and `prettier --write` automatically.
    - `.json`, `.css`, `.md` and `.html` files run `prettier --write`.
    - Added a `pre-commit` hook that runs `lint-staged`.

5.  **Verification**:
    - Checked that commits with invalid messages (e.g. `bad message`) are rejected.
    - Checked that valid commits (e.g. `chore: test hooks`) go through after formatting the files.

## Decisions made:

- **Centralized at the root**: all quality tools are configured at the monorepo root to enforce a single standard across all apps and libraries.
- **Using Prettier**: added as a mandatory formatting step in all projects.
