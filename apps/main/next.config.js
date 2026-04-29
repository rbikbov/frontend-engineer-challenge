//@ts-check

const { composePlugins, withNx } = require('@nx/next');

/**
 * @type {import('@nx/next/plugins/with-nx').WithNxOptions}
 **/
const nextConfig = {
  // Use this to set Nx-specific options
  // See: https://nx.dev/recipes/next/next-config-setup
  nx: {},
  output: 'standalone',

  transpilePackages: [
    '@workspace/ui',
    '@workspace/api',
    '@workspace/lib',
    '@workspace/constants',
    '@workspace/config',
  ],

  // https://nextjs.org/docs/pages/guides/multi-zones#how-to-route-requests-to-the-right-zone
  async rewrites() {
    const dashboardUrl = (
      process.env.INTERNAL_DASHBOARD_URL || 'http://localhost:3001'
    ).replace(/\/$/, '');

    return [
      {
        source: '/dashboard',
        destination: `${dashboardUrl}/dashboard`,
      },
      {
        source: '/dashboard/:path+',
        destination: `${dashboardUrl}/dashboard/:path+`,
      },
      {
        source: '/dashboard-static/:path+',
        destination: `${dashboardUrl}/dashboard-static/:path+`,
      },
    ];
  },
};

const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});

const plugins = [
  // Add more Next.js plugins to this list if needed.
  withNx,
];

module.exports = withBundleAnalyzer(composePlugins(...plugins)(nextConfig));
