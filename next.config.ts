import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**", // Allow all HTTPS domains (more permissive)
      },
      {
        protocol: "http",
        hostname: "localhost", // Allow localhost for development
      },
    ],
  },
};

export default nextConfig;
