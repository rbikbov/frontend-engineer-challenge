//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},

  transpilePackages: ['@workspace/ui'],

  basePath: '/dashboard',
  // https://nextjs.org/docs/pages/guides/multi-zones#how-to-define-a-zone
  assetPrefix: '/dashboard-static',
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
