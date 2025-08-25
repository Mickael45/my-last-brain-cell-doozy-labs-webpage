/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is enabled via CLI flag (--turbo) or TURBOPACK=1 env var for dev.
  // Removed unsupported experimental.reactCompiler key to silence warnings.
  experimental: {},
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "picsum.photos",
      },
      {
        protocol: "https",
        hostname: "via.placeholder.com",
      },
    ],
  },
};

export default nextConfig;
