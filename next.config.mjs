/** @type {import('next').NextConfig} */
const nextConfig = {
  // Next.js 16: Turbopack is the default bundler — no CLI flag needed.

  modularizeImports: {
    "lucide-react": {
      transform: "lucide-react/dist/esm/icons/{{kebabCase member}}",
    },
  },

  // Image optimization is disabled on purpose: Vercel's hosted image
  // optimizer is a paid feature on the Hobby plan (returns 402 once you blow
  // the free quota), and we don't need it for this portfolio. Assets are
  // served as plain <img> tags pointing directly at /public.
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
