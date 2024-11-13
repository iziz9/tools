import path from 'path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  webpack(config) {
    config.resolve.alias['@'] = path.join(path.resolve(), 'src')
    return config;
  }
};

export default nextConfig;