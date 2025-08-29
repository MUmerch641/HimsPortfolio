import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
   images: {
    domains: ['pakhims.com'], // ✅ Add your domain here
  },
  output: 'export',
};

export default nextConfig;
