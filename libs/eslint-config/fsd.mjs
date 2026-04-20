import boundaries from 'eslint-plugin-boundaries';

/**
 * FSD Architectural Boundaries Configuration (Plugin Version 5)
 *
 * This config enforces strict layer hierarchy and public API usage:
 * - Layers can only import lower layers (Shared > Entities > Features > Widgets > Pages > App).
 * - Modules must be imported via their public API (index.ts).
 */
export const fsdConfig = [
  {
    files: ['**/*.{ts,tsx}'],
    plugins: {
      boundaries,
    },
    settings: {
      'import/resolver': {
        typescript: {
          alwaysTryTypes: true,
        },
      },
      // Restrict analysis to the src directory to avoid node_modules overhead
      'boundaries/include': ['src/**/*'],
      'boundaries/elements': [
        { type: 'app', pattern: 'app' },
        { type: 'pages', pattern: 'pages/*', capture: ['page'] },
        { type: 'widgets', pattern: 'widgets/*', capture: ['widget'] },
        { type: 'features', pattern: 'features/*', capture: ['feature'] },
        { type: 'entities', pattern: 'entities/*', capture: ['entity'] },
        { type: 'shared', pattern: 'shared/*', capture: ['segment'] },
      ],
    },
    rules: {
      // Feature-Sliced Design: Entry Points (Public API)
      'boundaries/entry-point': [
        2,
        {
          default: 'disallow',
          rules: [
            // Shared ui/api: direct imports allowed
            {
              target: [['shared', { segment: '(ui|api)' }]],
              allow: '**',
            },
            // Shared constants/lib: strictly via index
            {
              target: [['shared', { segment: '(constants|lib)' }]],
              allow: 'index.ts',
            },
            // Other layers: strictly via root index or pub/ directory if used
            {
              target: ['app', 'pages', 'widgets', 'features', 'entities'],
              allow: ['index.(ts|tsx)', 'pub/*.(ts|tsx)'],
            },
          ],
        },
      ],

      // Feature-Sliced Design: Layer Hierarchy
      'boundaries/element-types': [
        2,
        {
          default: 'allow',
          message:
            'Architectural violation: ${file.type} is not allowed to import ${dependency.type}',
          rules: [
            {
              from: ['shared'],
              disallow: ['app', 'pages', 'widgets', 'features', 'entities'],
              message:
                'Shared layer must be pure and never import upper layers (${dependency.type})',
            },
            {
              from: ['entities'],
              disallow: ['app', 'pages', 'widgets', 'features'],
              message:
                'Entities must only import Shared; found import of ${dependency.type}',
            },
            {
              from: ['entities'],
              disallow: [['entities', { entity: '!${entity}' }]],
              message:
                'Strict isolation: Entity must not import other entities',
            },
            {
              from: ['features'],
              disallow: ['app', 'pages', 'widgets'],
              message:
                'Features must only import Entities/Shared; found import of ${dependency.type}',
            },
            {
              from: ['features'],
              disallow: [['features', { feature: '!${feature}' }]],
              message:
                'Strict isolation: Feature must not import other features',
            },
            {
              from: ['widgets'],
              disallow: ['app', 'pages'],
              message:
                'Widgets must not import Pages or App; found import of ${dependency.type}',
            },
            {
              from: ['widgets'],
              disallow: [['widgets', { widget: '!${widget}' }]],
              message: 'Strict isolation: Widget must not import other widgets',
            },
            {
              from: ['pages'],
              disallow: ['app'],
              message:
                'Pages must not import App layer; found import of ${dependency.type}',
            },
            {
              from: ['pages'],
              disallow: [['pages', { page: '!${page}' }]],
              message: 'Strict isolation: Page must not import other pages',
            },
          ],
        },
      ],
    },
  },
];

export default fsdConfig;
