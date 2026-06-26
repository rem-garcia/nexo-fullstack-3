import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  turbopack: {
    resolveAlias: {
      "../generated/prisma": path.join(__dirname, "generated/prisma"),
    },
  },
};

export default nextConfig;