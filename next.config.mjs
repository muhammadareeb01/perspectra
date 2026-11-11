/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === '1';

const basePath = staticExport ? '/perspectra' : '';

const nextConfig = {
  ...(staticExport
    ? {
        output: 'export',
        basePath,
        assetPrefix: `${basePath}/`,
        trailingSlash: true
      }
    : {}),
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath
  },
  images: {
    unoptimized: staticExport,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' }
    ]
  }
};

export default nextConfig;
