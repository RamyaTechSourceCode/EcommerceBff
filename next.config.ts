import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  async rewrites() {
    return [
      {
        // Redirect all BFF and API calls to your YARP Gateway
        source: "/auth/:path*",
        destination: "http://localhost:5291/auth/:path*",
      },
      {
        source: "/api/:path*",
        destination: "http://localhost:5291/api/:path*",
      },
    ];
  },
};

export default nextConfig;
