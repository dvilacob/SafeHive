import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Obligatorio para generar archivos que GitHub entienda
  basePath: '/SafeHive', // Obligatorio para que sume la subcarpeta a los estilos
  images: {
    unoptimized: true, // GitHub no procesa imágenes dinámicas de Next
  },
  typescript: { ignoreBuildErrors: true },
  eslint: { ignoreDuringBuilds: true },
};

export default nextConfig;