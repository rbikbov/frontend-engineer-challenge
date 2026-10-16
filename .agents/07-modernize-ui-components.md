# Stage 7: Modernizing the UI infrastructure and creating the base components

This stage fully restructured the styling system and created the core design system components, ready for dark mode and further extension.

## Actions taken:

1. **Theme and token architecture**:
   - Moved the styling system to **Tailwind CSS v4** with semantic CSS variables in `theme.css`.
   - Added full **Dark Mode** support through the `.dark` class, so the whole app's theme can be switched with a single setting.
   - Defined primitive and semantic tokens for colors, border radii and typography.

2. **Base components (`@workspace/ui`)**:
   - **Button**: refactored with `cva` (Class Variance Authority). Visual variants (colors) and geometric sizes are separated.
   - **Input**: an advanced component with support for:
     - **Radix UI Label**: for maximum accessibility (A11y).
     - **Polymorphism (`asChild`)**: lets the input styles be reused, e.g. for a `textarea`.
     - **Smart Label**: an animated label that appears only on focus or when text is entered.
     - **Icon Slots**: `leftElement` and `rightElement` slots for icons or interactive buttons (e.g. showing/hiding the password).
   - **Logo**: the official logo component, using SVG filters and protected against ID collisions in the DOM.

3. **Icon library**:
   - Created a structured `icons/` folder with custom SVG components.
   - All icons use `currentColor`, so their style can be controlled with Tailwind classes.

4. **Branding optimization**:
   - Set up modern favicons (`icon.svg`, `apple-icon.png`) following the Next.js App Router conventions for automatic metadata generation.

## Decisions made:

- **Composition over props**: input icons use slots (`leftElement`/`rightElement`), which gives more flexibility for complex fields (e.g. a password toggle).
- **Dynamic label**: the label container height transitions (`h-0` -> `h-3`) to keep the text vertically centered when the label is hidden.
- **SVG filters**: the logo uses `React.useId()` to generate unique gradient and filter IDs, which prevents bugs when several logo instances are rendered.
