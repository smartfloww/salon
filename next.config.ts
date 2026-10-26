import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  typescript: {
    // Real type checking — the project passes `tsc --noEmit` cleanly.
    ignoreBuildErrors: false,
  },
  reactStrictMode: true,
};

export default nextConfig;
