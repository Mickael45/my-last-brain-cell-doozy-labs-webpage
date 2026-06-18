# SEO Hand-off Spec — for the Astro migration

**Purpose:** This site is being migrated from Next.js (App Router, ISR + Convex) to a **pure-static Astro** build. After confirming nothing is dynamic (no realtime Convex usage, the GitHub-issues feature was dormant + `ssr:false`), the data source becomes the in-repo `data/projects.ts` and the whole site is SSG.

This document is the SEO requirements the migration should build **with in mind**, so the Astro output is SEO-ready instead of needing a retrofit. Where a requirement is cheap to satisfy natively in Astro, do it during the migration; the rest will be applied as a follow-up SEO pass on the Astro codebase.

Framing note: pure SSG gives **no SEO ranking advantage over the old ISR** — crawlers got pre-rendered HTML either way. The wins from this migration are architectural (no backend, zero-JS-by-default via islands) plus the concrete SEO items below.

---

## ▶ Migration status (updated)

**Done (Phase 1 + 2):**
- ✅ Convex + dead dynamic plumbing removed (see section below).
- ✅ Next.js → **Astro 5** (`output: "static"`), `site` set, React islands hydrating only the interactive bits (mesh, gallery filter, detail view, reveal observer); everything else is zero-JS static HTML.
- ✅ Readable **slugs** + `getStaticPaths` (§1). Custom **404** (§8). Legacy Vite `index.html` deleted (§8).
- ✅ `@astrojs/sitemap` → `sitemap-index.xml` (§3, sitemap half). **GA moved site-wide** into `BaseHead` (§9). **theme-color / color-scheme** added (§8). Per-page canonical + OG/Twitter (§2) via `BaseHead`; per-project `og:image` points at each project's `imageUrl` (interim form of §5).

**Done (Phase 3 — SEO pass):**
- ✅ `robots.txt` (§3, with sitemap reference).
- ✅ JSON-LD (§4): site-wide **Person + Organization + WebSite** (with `sameAs`); per-project **BreadcrumbList + CreativeWork**, plus a matching on-page breadcrumb UI.
- ✅ Identity fixes (§6): real LinkedIn profile, canonical GitHub casing (`mickael45`), `rel="me"` on the footer's GitHub / portfolio / LinkedIn links. Shared in `lib/site.ts`.
- ✅ Web app **manifest** (§8).
- ◑ Alt text (§7): all project images carry descriptive `alt`; detail-hero `alt` is now `"{title} — {tagline}"`.

**Done (Phase 4 — OG cards):**
- ✅ Build-time **per-project OG image generation** (§5): `scripts/gen-og.ts` (satori + sharp) emits branded 1200×630 **PNG** cards (title + tagline + status + screenshot, with a text-only fallback for projects lacking a screenshot) to `public/og/<slug>.png`. Wired into `[slug].astro` for `og:image` / `twitter:image` / CreativeWork image. Run via `bun run gen:og`. **Fixes a real bug** — the interim pointed `og:image` at raw `.webp` screenshots, which LinkedIn/Facebook don't render and which weren't 1200×630.

**Done (Phase 5 — content/keywords):**
- ✅ §10: home `<title>` is now keyword-forward — `Indie Dev Lab & Micro-SaaS Experiments | Doozy Labs` (brand-only title had zero search volume). Added a keyword-bearing hero eyebrow ("Indie dev lab · Solo-built micro-SaaS & prototypes") above the unchanged playful gradient H1, so discoverability and brand voice coexist.
- ✅ Split SEO title from social title: `BaseHead`/`Layout` gained an optional `ogTitle` prop (defaults to `title`). Home sets `ogTitle="My Last Brain Cell Doozy Labs"` so shares keep the brand voice while the `<title>` stays keyword-forward. Project pages still mirror their own title.

**Still open:**
- **`astro:assets`** optimization (§7) — images are already pre-optimized WebP with explicit dimensions (no CLS); a full `astro:assets` pipeline would require moving image rendering out of the React islands into `.astro`.
- **Keyword / title** work (§10) — judgment calls, needs owner sign-off.
- **Category pages** (§11, optional); **post-launch checklist** (§12, external — GSC/Bing, Rich Results test, Lighthouse, backlinks).
- ⚠️ Confirm the **GitHub username casing** against the live profile (defaulted to `mickael45`; change in `lib/site.ts` if wrong).

---

## 0. Site constants

- **Production domain:** `https://www.ml-bcd-labs.com`
  Set once as `site` in `astro.config.mjs`; derive all canonical / sitemap / OG / JSON-LD URLs from `Astro.site`.
- **LinkedIn profile:** `https://www.linkedin.com/in/mickael-gomes-consulting/`
- **Contact email:** `mickaelgomesconsulting@gmail.com`
- **GitHub:** `https://github.com/mickael45` — ⚠️ confirm the canonical casing against the live profile and use it everywhere (see §6).

---

## ⚑ Drop Convex and the dead dynamic plumbing (decided — do first) — ✅ DONE

Confirmed: **no realtime usage anywhere** (no `convex/react`, `useQuery`, or provider — only server-side one-shot `fetchQuery`), so Convex is just a remote JSON store with zero value once the site is static. The GitHub-issues feature was already dormant (no project sets `githubRepo`) and `ssr:false`. **Removed all of it during the migration:**

- [x] `convex/` directory (`schema.ts`, `projects.ts`, `_generated/`, etc.)
- [x] `convex` + `convex/nextjs` usage; the `convex` dependency in `package.json`
- [x] `app/actions/projects.ts` (`getProjects`/`getProjectById` via `fetchQuery`) → replaced with a plain import from `data/projects.ts`
- [x] `app/actions/seed.ts`, `app/actions/tasks.ts`, `app/actions/revalidate.ts`
- [x] `app/api/revalidate/projects/route.ts` (the ISR webhook)
- [x] Components `DevOnlySeed`, `SeedButton`, `ProjectTasks` (GitHub issues)
- [x] `getGitHubIssues` / the `GITHUB_PAT` dependency
- [x] Env vars no longer needed: `NEXT_PUBLIC_CONVEX_URL`, `GITHUB_PAT`, `REVALIDATE_TOKEN`
- [x] The `mapProject` / `assertConvexEnv` shim in `lib/projects.ts` (whole file removed — `normalizeProjectAssetUrl` was unused; data uses real paths)

**New data flow:** `data/projects.ts` is the single source of truth, imported directly at build time, with the `Project` type kept and the status/sortOrder sort preserved in the data layer (`getProjects()`).

> ⚠️ **Important — real data came from a Convex snapshot, not the repo.** The in-repo `data/projects.ts` was only a stale **5-project mock fallback**; the live site's real **6 projects** lived in Convex. `data/projects.ts` is now regenerated from a Convex export via `scripts/gen-projects.py` (re-runnable). The export lives at `data/snapshot_*/` (gitignored, kept locally as the generator's source). `data/mockProjects.json` was deleted (superseded).

---

## 1. URL scheme — switch to readable slugs (decided) — ✅ DONE

Moved from opaque IDs (`/project/1`, or the old Convex `_id`) to **human-readable slugs**.
Table below reflects the **real 6 projects** from the DB snapshot (the original mock-based
table — Brain Linker / Chaos Parrot / Prompt Forge — never matched production):

| title | slug → URL | featured |
|-------|------------|----------|
| Dish Database | `/project/dish-database` | — |
| SDS Sentinel | `/project/sds-sentinel` | ✓ |
| FITS Sentinel | `/project/fits-sentinel` | ✓ |
| Etsy Automation | `/project/etsy-automation` | — |
| Financials | `/project/financials` | — |
| LinkedIn JobLens AI | `/project/joblens-ai` | ✓ |

Implementation:
- [x] Explicit **`slug` field** on each entry in `data/projects.ts` (stable, reviewable; `id === slug`). Slugs match the existing `public/projects/*` screenshot folders.
- [x] Routes generated via Astro's `getStaticPaths()` keyed on `slug` (`src/pages/project/[slug].astro`).
- [ ] **301 redirects** old→new: site was never public under the old `_id` scheme, so **skipped** (revisit if any old URL was shared).

---

## 2. Per-page metadata

Astro has no `Metadata` API — use a shared `<BaseHead>` component rendered in each page's `<head>`, taking `title`, `description`, `canonical`, `ogImage` props. Set `site` in `astro.config.mjs` so `Astro.site` / `new URL(Astro.url.pathname, Astro.site)` yields absolute canonical + OG URLs (this replaces Next's `metadataBase`).

**Every page must have:**
- `<title>` (template: `"{Page} | Doozy Labs"`; home = `"My Last Brain Cell Doozy Labs"`)
- `<meta name="description">` — unique per page
- `<link rel="canonical">` — absolute
- Open Graph: `og:type`, `og:title`, `og:description`, `og:image` (absolute), `og:url`, `og:site_name`, `og:locale`
- Twitter: `summary_large_image`, title, description, image

**Home page** (carry over from old `app/layout.tsx`, which was correct):
- description: *"One brain cell. Infinite bad ideas. A solo dev lab where shower thoughts become shipped products and over-engineered prototypes achieve sentience at 3 AM."*

**Project pages** (the old Next version only set a bare `title` — this is the biggest metadata gap to fix):
- `title`: `project.title` (let the template add `| Doozy Labs` — keep the separator consistent; the old code mixed `–` and `|`)
- `description`: `project.description` (or `tagline` as fallback)
- `og:image`: per-project (see §5)
- canonical: the slug URL

---

## 3. Sitemap & robots (neither existed before)

- **Sitemap:** use **`@astrojs/sitemap`** (auto-generates `sitemap-index.xml` from `getStaticPaths`). Include home + all project pages. Set `lastmod` if/when project data gains an `updatedAt`.
- **robots.txt:** add `public/robots.txt`:
  ```
  User-agent: *
  Allow: /
  Sitemap: https://www.ml-bcd-labs.com/sitemap-index.xml
  ```

---

## 4. Structured data (JSON-LD) — none existed before

Inject as `<script type="application/ld+json">`. This is high-value for entity recognition / E-E-A-T and AI-search citations.

**a) `Person` + `Organization` with `sameAs`** (site-wide, in `<head>`). This ties the identity together — fixes the disconnected-profiles problem:
```jsonc
{
  "@context": "https://schema.org",
  "@type": "Person",
  "name": "Mickael Gomes",
  "url": "https://www.mickael-gomes.com",
  "email": "mickaelgomesconsulting@gmail.com",
  "sameAs": [
    "https://github.com/mickael45",                          // ← confirm canonical casing, see §6
    "https://www.linkedin.com/in/mickael-gomes-consulting/",
    "https://www.mickael-gomes.com"
  ]
}
```
Add `Organization` for "Doozy Labs" (name, url, logo = `/icon.png` absolute).

**b) `WebSite`** (site-wide): name, url, publisher → the Organization.

**c) `BreadcrumbList`** (project pages): Home › Projects › {title}. Render a matching breadcrumb UI too.

**d) `CreativeWork`** (per project page), built from `data/projects.ts`:
- `name` = title, `description`, `author` → Person, `image` = OG/screenshot (absolute),
- optionally `keywords` from `techStack`, `applicationCategory` from `categories`.

---

## 5. Open Graph images — ✅ DONE (`scripts/gen-og.ts`, `bun run gen:og`)

- Keep the existing static `public/og.png` (1200×630) as the **home / default** OG image. ✅ correct size already.
- **Per-project OG images** (the old build shared one image across every page — low social CTR). Two ways in Astro:
  1. **Build-time generation** with `satori` / `@vercel/og`-style `ImageResponse` in an endpoint that emits PNG per slug at build (stays static). Title + tagline + screenshot.
  2. Simpler interim: point `og:image` at the project's first real screenshot (absolute URL) where one exists.
- Note: many projects have **empty `screenshots`** and some use `picsum.photos` placeholders — see §7.

---

## 6. Identity / author-link fixes (actual bugs found)

These are wrong in the current code and must be corrected during/after migration:

1. **LinkedIn placeholder** — `components/Footer.tsx` links to `https://linkedin.com` (generic, not a profile). Replace with the real profile: `https://www.linkedin.com/in/mickael-gomes-consulting/`.
2. **GitHub username casing is inconsistent** — Footer uses `github.com/Mickael45`, the detail page links `github.com/Mickael45/...`, but the old issues fetch used `mickael45/...` (lowercase). Pick **one canonical casing** and use it everywhere (GitHub itself is case-insensitive, but consistency matters for `sameAs`/crawlers).
3. Add **`rel="me"`** to the footer's GitHub / LinkedIn / personal-site links (identity verification, helps the entity graph).
4. Keep existing `rel="noopener noreferrer"` + `target="_blank"` on external links (already correct ✅).

---

## 7. Images — alt text & performance

- **Alt text:** only 3 components set `alt` today. Every project image needs descriptive alt, e.g. `"{project.title} — {project.tagline}"`. Write alt into the data or the component.
- **Placeholders:** replace `picsum.photos` seed images and fill empty `screenshots[]` with real screenshots. Placeholder images dilute relevance and look unfinished in OG cards.
- **Performance (Core Web Vitals are ranking inputs):** the old build used `images.unoptimized` + plain `<img>`. In Astro, use the built-in **`<Image />` / `astro:assets`** for local images (responsive `srcset`, lazy-loading, WebP/AVIF, explicit `width`/`height` to kill CLS). The hero/LCP image should be `loading="eager"` + `fetchpriority="high"`; everything below the fold `loading="lazy"`.

---

## 8. Special files

- **404 page** — `src/pages/404.astro`. The old build had no custom `not-found`; unknown slugs hit the bare default. Custom 404 should link back to the gallery (no dead-ends for crawlers).
- **Web app manifest** — add a manifest (icons already exist: `icon.png` 512², `apple-icon.png` 180²). ~10 lines; adds installability + `theme_color`.
- **`theme-color` / dark color-scheme** — site is dark (`bg-gray-900`) but never declared. Add `<meta name="theme-color" content="#111827">` and `<meta name="color-scheme" content="dark">` to kill the white flash and color mobile browser chrome.
- **Delete legacy `index.html`** — leftover Vite file (`/vite.svg`, stale title "ML-BCD Labs - Innovation Laboratory"). Dead cruft; remove during migration.

---

## 9. Analytics

- GA tag `G-JQWX179K9Q` was mounted only in `app/page.tsx` → **project pages were never tracked.** In Astro, put it in the shared layout/`<BaseHead>` so every page reports.
- Consider a lightweight/consent-aware setup given the site's privacy theme (one project is privacy-focused). Optional.

---

## 10. Content / keyword guidance (judgment calls — confirm with owner)

The brand voice is great but **invisible to search**: the `<title>` and hero `<h1>` ("My Last Brain Cell Doozy") contain zero descriptive keywords, and copy is joke-forward. Keep the personality, but work in terms people actually search — *solo/indie dev portfolio, micro-SaaS experiments, side projects, prototypes*. Even appending a descriptive clause to the title template helps. The per-project `genesisSpark`/`coreProblem` text is already strong, unique, server-rendered content — preserve it verbatim in the Astro pages.

---

## 11. Astro implementation notes

- Set `site` + `output: 'static'` in `astro.config.mjs`. Add `@astrojs/sitemap`.
- Reuse the existing React components as **islands** (`@astrojs/react`), hydrating only the interactive ones (`client:visible` / `client:idle`): gallery filter, lightbox, card navigation, animated mesh, reveal observer. Everything else renders to static HTML with **zero JS** — this is the proper fix for the old build's heavy hydration (12 of 17 components were `'use client'`).
- The category/type filters in the old gallery were client-state only (no crawlable category URLs). **Optional SEO upside:** add real `/category/[type]` static pages to capture long-tail "{type} side projects" searches. Nice-to-have, not required.

---

## 12. Post-launch checklist

- [ ] Verify domain in **Google Search Console** + **Bing Webmaster Tools**; submit the sitemap.
- [ ] Validate structured data (Google Rich Results Test).
- [ ] Check OG rendering (X/LinkedIn/Slack/Discord post inspectors).
- [ ] Run Lighthouse — confirm CWV (LCP/CLS/INP) are green post-island-conversion.
- [ ] Seed a few inbound links (GitHub profile, dev.to, Show HN, indie-hacker communities) — for a new portfolio, backlinks move the needle more than any on-page tweak.

---

## 13. Verified already fine — do NOT regress these

- **Crawlable links** — project cards use real `<a href>` (Next `<Link>`), not JS-only navigation. Keep anchors real in Astro.
- **Fonts** — no `next/font`/Google Fonts; system font stack. Ideal for perf (no render-blocking, no swap CLS). Don't add a web font without reason.
- **Icons** — favicon, 512² icon, 180² apple-icon all present and correctly sized.
- **`og.png`** — already 1200×630.
- **Content depth** — `genesisSpark` / `coreProblem` give each project substantial unique text. Preserve it.

---

### Open inputs
- ✅ Production domain — `https://www.ml-bcd-labs.com`
- ✅ LinkedIn profile — `https://www.linkedin.com/in/mickael-gomes-consulting/`
- ⚠️ **Canonical GitHub username casing** — only remaining unknown. Defaulting to `mickael45` (lowercase, as used in the old issues-fetch path); confirm against the live profile and apply consistently.
