/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16: Turbopack is the default bundler — no CLI flag needed.

  images: {
    unoptimized: true,
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
