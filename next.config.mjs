/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16: Turbopack is now the default bundler — no CLI flag needed.

  // Enable Cache Components ("use cache" directive) for fine-grained SSG / ISR.
  cacheComponents: true,

  // Custom cache profiles consumed via cacheLife('static') in data-fetching fns.
  cacheLife: {
    // Portfolio project data — essentially static, revalidate every hour.
    static: {
      stale: 3600,      // serve stale for up to 1 h while revalidating
      revalidate: 3600, // background revalidation interval (≈ old ISR 3600)
      expire: 604800,   // hard-expire after 1 week
    },
    // GitHub issues — refresh a bit more frequently.
    issues: {
      stale: 1800,      // 30 min stale window
      revalidate: 1800, // revalidate every 30 min
      expire: 86400,    // expire after 1 day
    },
  },

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
