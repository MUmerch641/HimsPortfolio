import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    domains: ['pakhims.com'], // ✅ Add your domain here
    // Disable Next.js Image Optimization when exporting a static site
    // See: https://nextjs.org/docs/messages/export-image-api
    unoptimized: true,
  },
  output: 'export',
};

export default nextConfig;
