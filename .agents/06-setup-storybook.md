# Stage 6: Integrating Storybook as a separate UI environment

Storybook was set up to develop standalone components in the `@workspace/ui` library. It allows the visual building blocks (UI kit) to be developed and tested in isolation before they are integrated into the Next.js project.

## Actions taken:

1. **Added Storybook support**:
   - Installed the `@nx/storybook` plugin in the root `dev` dependencies.
   - Ran the Nx configuration generator for the Vite bundler (`@storybook/react-vite`) to build the library with modern, fast tooling.
2. **Configuring the `@workspace/ui` project**:
   - Generated the TypeScript config `tsconfig.storybook.json`, which references our strict base module settings.
   - Created the `.storybook` setup directory with `main.js` and `preview.js`.

3. **Scripts and examples**:
   - Added a `"storybook": "nx storybook @workspace/ui"` script to the root `package.json` to launch the showcase easily.
   - Created a minimal story `button.stories.tsx` for the existing Button component (with `Default` and `Disabled` states) to show that the environment works.

## Decisions made:

- **Vite** is used as the Storybook bundler because it is much faster than Webpack and is the default bundler for React libraries in Nx.
- Avoiding type duplication: the configuration is set up to work with the reusable `tsconfig` and `eslint` packages.
