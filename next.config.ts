import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NEXT_PUBLIC_BASE_PATH || "",
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
