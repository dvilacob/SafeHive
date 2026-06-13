import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export',
  basePath: '/SafeHive',     // Esto ayuda a las rutas de navegación
  assetPrefix: '/SafeHive/', // ¡ESTO CORRIGE LOS ESTILOS Y EL CSS EN GITHUB PAGES!
  images: {
    unoptimized: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;