/**
 * Single source of truth for site identity (SEO-HANDOFF §0/§6).
 * Used by both Astro components (BaseHead) and React islands (Footer).
 */
export const SITE = {
  name: "My Last Brain Cell Doozy Labs",
  org: "Doozy Labs",
  authorName: "Mickael Gomes",
  email: "mickaelgomesconsulting@gmail.com",
  // ⚠️ GitHub casing is the one open input (SEO-HANDOFF §6) — defaulting to
  // lowercase `mickael45` as used by the old issues-fetch path. Used everywhere.
  github: "https://github.com/mickael45",
  linkedin: "https://www.linkedin.com/in/mickael-gomes-consulting/",
  website: "https://www.mickael-gomes.com",
  // Google Search Console ownership verification (HTML-tag method). Rendered in
  // <head> by BaseHead so it survives every rebuild.
  googleSiteVerification: "TWDG3ZZ0MviUxRigvx9OnaeriEFqoyKslbZsFcdXeU8",
} as const;
