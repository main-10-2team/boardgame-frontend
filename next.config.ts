import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  webpack: (config) => {
    config.module.rules.push({
      test: /\.svg$/i,
      issuer: /\.[jt]sx?$/,
      use: ['@svgr/webpack'],
    });
    return config;
  },
  images: {
    domains: ['images.unsplash.com', 'boardlife.co.kr', 'boardq.o-r.kr'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/photo-**',
      },
      {
        protocol: 'https',
        hostname: 'boardlife.co.kr',
        port: '',
        pathname: '/data/photo/**',
      },
      {
        protocol: 'https',
        hostname: 'cf.geekdo-images.com',
        port: '',
      },
      {
        protocol: 'https',
        hostname: 'kr.object.ncloudstorage.com',
        port: '',
        pathname: '/boardq/**',
      },
    ],
  },
};

export default nextConfig;
