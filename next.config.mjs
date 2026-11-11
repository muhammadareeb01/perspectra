/** @type {import('next').NextConfig} */
const staticExport = process.env.STATIC_EXPORT === '1';

const nextConfig = {
  ...(staticExport
    ? {
        output: 'export',
        basePath: '/perspectra',
        assetPrefix: '/perspectra/',
        trailingSlash: true
      }
    : {}),
  images: {
    unoptimized: staticExport,
    remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'images.pexels.com' }
    ]
  }
};

export default nextConfig;
