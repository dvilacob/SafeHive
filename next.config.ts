import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: 'export', // Genera archivos HTML/CSS/JS estáticos en lugar de requerir un servidor Node
  basePath: '/SafeHive', // IMPORTANTE: Ajusta las rutas al nombre exacto de tu repositorio en GitHub
  images: {
    unoptimized: true, // Evita que Next intente optimizar imágenes (GitHub Pages no lo soporta)
  },
  /* Si ya tenías las reglas de typescript o eslint, puedes mantenerlas aquí abajo: */
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
