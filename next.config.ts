import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Pin the workspace root so Turbopack doesn't infer it from a stray parent
  // lockfile (e.g. ~/Projects/package-lock.json). This repo is the root.
  turbopack: { root: __dirname },
};

export default nextConfig;
