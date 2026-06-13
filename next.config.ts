import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Removed output: 'export' and basePath to ensure the app runs correctly in the dev preview.
  // These can be re-added specifically for GitHub Pages deployment later.
  images: {
    unoptimized: true,
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;
