// @ts-check
import { defineConfig } from "astro/config";
import react from "@astrojs/react";
import tailwind from "@astrojs/tailwind";
import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  // Production domain — drives canonical / sitemap / OG / JSON-LD URLs via Astro.site.
  site: "https://www.ml-bcd-labs.com",
  output: "static",
  integrations: [
    react(),
    // We ship our own base layer + custom @layer utilities in src/styles/global.css.
    tailwind({ applyBaseStyles: false }),
    sitemap(),
  ],
});
