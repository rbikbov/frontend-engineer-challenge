import fsdConfig from '@workspace/eslint-config/fsd.mjs';
import nextConfig from '@workspace/eslint-config/nextjs.mjs';

export default [...nextConfig, ...fsdConfig];
