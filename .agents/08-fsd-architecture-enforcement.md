# Enforcing the FSD architecture

The project checks Feature-Sliced Design architectural boundaries automatically. This keeps the codebase manageable and modular as it grows.

## Technical implementation

- **Tool**: `eslint-plugin-boundaries@5.4.0`
- **Configuration**: `libs/shared/eslint-config/fsd.mjs`
- **Integration**: the plugin runs in ESLint 9 mode (Flat Config), which keeps analysis of the import graph fast.

## Architecture rules

### 1. Layer hierarchy

Each layer may import only the layers **below** it in the hierarchy:
`App > Pages > Widgets > Features > Entities > Shared`

**Forbidden**:

- `Shared` cannot import anything "from above".
- `Entities` cannot import `Features` or `Pages`.
- "Sideways" imports within a layer (e.g. `Feature A` -> `Feature B`) are forbidden to keep strict isolation.

### 2. Entry points (Public API)

Modules may be imported **only through their Public API** (`index.ts`).

**Forbidden**:

- Direct imports of internal files (e.g. `import { Button } from '@/shared/ui/button/button'`).
- **Exception**: the `shared/ui` and `shared/api` layers allow direct imports for flexibility, while `shared/constants` and `shared/lib` must be imported through the index.

## Working with the linter

When a boundary is violated, you will see an error in the IDE or the console:

- `Architectural violation: features is not allowed to import app` (hierarchy violation)
- `This module can only be imported via index.ts` (Public API violation)

## Adding a new module

When creating a new entity (e.g. `entities/user`), make sure the folder root has an `index.ts` that exports only the required components and types. The linter picks up the new module automatically thanks to the patterns in `fsd.mjs`.
