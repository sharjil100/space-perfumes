import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "wlfahwtgcoymrwsistaa.supabase.co",
      },
    ],
  },
};

export default nextConfig;
