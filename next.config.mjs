/** @type {import('next').NextConfig} */
const nextConfig = {
  // Turbopack is enabled via CLI flag (--turbo) or TURBOPACK=1 env var for dev.
  // Removed unsupported experimental.reactCompiler key to silence warnings.
  experimental: {},
};

export default nextConfig;
