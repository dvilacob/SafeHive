/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export', // Tells Next.js to generate static HTML/CSS/JS
  basePath: '/SafeHive', // Matches your repository name exactly
  images: {
    unoptimized: true, // Needed because GitHub Pages doesn't support Next.js default image optimization
  },
};

module.exports = netConfig;
