//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},

  transpilePackages: [
    '@workspace/ui',
    '@workspace/api',
    '@workspace/lib',
    '@workspace/constants',
  ],

  // https://nextjs.org/docs/pages/guides/multi-zones#how-to-route-requests-to-the-right-zone
  async rewrites() {
    return [
      {
        source: '/dashboard',
        destination: `${process.env.DASHBOARD_DOMAIN}/dashboard`,
      },
      {
        source: '/dashboard/:path+',
        destination: `${process.env.DASHBOARD_DOMAIN}/dashboard/:path+`,
      },
      {
        source: '/dashboard-static/:path+',
        destination: `${process.env.DASHBOARD_DOMAIN}/dashboard-static/:path+`,
      },
    ];
  },
};

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = composePlugins(...plugins)(nextConfig);
