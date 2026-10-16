# Step 09: Optimizing the monorepo and setting up Multi-zones

In this stage we deeply optimized the workspace structure and made several apps work seamlessly within a single design system.

## What was done

### 1. Setting up Next.js Multi-zones

To let the `main` (auth) and `dashboard` (control panel) apps evolve independently, we introduced the **Next.js Multi-zones** strategy:

- Added `rewrites` rules to `apps/main/next.config.js` that proxy requests on the `/dashboard` path to a separate app instance.
- This lets the user move between the apps without reloading the whole page while keeping the bundles isolated.

### 2. Optimizing the `libs/` structure

To simplify import paths and improve architectural cleanliness, we partially "flattened" the library structure:

- Moved the global configurations (`eslint-config`, `typescript-config`) from `libs/shared/` directly to the root of `libs/`.
- The UI library stayed in `libs/shared/ui` to keep the visual components logically separate.
- This reduced import nesting and made the workspace structure flatter and easier to understand.

### 3. Resolving Tailwind CSS v4 styles

We fixed missing styles when components were imported from libraries into the apps:

- Added the `@source "../../**/*.{ts,tsx}";` directive to `libs/shared/ui/src/styles/theme.css`, which makes Tailwind scan the library source code from the app's context.
- Used the native Tailwind CSS v4 support together with `transpilePackages` in Next.js and optimized `exports` in `package.json`. This allowed clean aliases such as `@workspace/ui/theme.css` instead of long relative paths in CSS.

### 4. Home page design

Updated the design of `apps/main/src/app/page.tsx`. It is now a modern hero section with:

- Glassmorphism effects (backdrop-blur).
- Semantic brand tokens.
- A modular structure ready to be filled with content.

## Result

The monorepo is now more stable and scalable. The architectural boundaries are respected, and the style build is optimized for a distributed setup.

---

**Next step:** implement the auth flow (Login/Register) against the real backend API.
