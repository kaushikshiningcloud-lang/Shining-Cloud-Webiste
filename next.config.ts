import type { NextConfig } from "next";

const nextConfig: any = {
  output: 'standalone',
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
