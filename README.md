# My Last Brain Cell Doozy Labs 🧪

A public viewing window into my micro‑SaaS experiments, product stubs, and proudly over‑engineered prototypes.  
Think: portfolio + narrative case studies + lab archive.  
Yes, it’s public. No, it’s not a community project. Look, touch (read), but don’t try to refactor my chaos.

---

## What This Is

- A curated showcase of projects (some shipped, some cooking, some probably alive out of spite).
- A place to tell the “why” behind builds—not just a wall of logos.
- A unified detail view with metrics, tech stack categorization, story panels, and live GitHub issue fetch (when a repo is linked).
- A design playground for motion, gradients, and mildly dramatic UI flourishes.

## What This Is _Not_

| Thing                          | Status       |
| ------------------------------ | ------------ |
| Template / starter kit         | Nope         |
| Open for PRs / issues          | Please don’t |
| Roadmap-driven product         | Also no      |
| “Production SaaS” infra sample | Not the goal |

If you found a typo—congratulations on your attention to detail. I’ll fix it when it annoys me enough.

---

## Tech Stack

- Next.js App Router (ISR, route segment features)
- Convex (data layer + mutations / queries)
- Tailwind CSS (utility-driven styling + custom animations)
- Lucide + react-icons (iconography)
- View Transition–style animations for detail navigation
- GitHub API (optional live task/issues section)

See the data mapper in [lib/projects.ts](lib/projects.ts) (`mapProject`) and server actions in [app/actions/projects.ts](app/actions/projects.ts).

---

## Data & Projects

Projects live in Convex (`convex/projects.ts`) and are mapped to a stable UI shape.  
Local/dev seeding: trigger the mutation via the dev-only seed button (`DevOnlySeed` + `SeedButton`) which calls the `projects.seed` mutation.

Categories & types are normalized defensively on read.  
If `NEXT_PUBLIC_CONVEX_URL` is missing, a warning is logged (see `assertConvexEnv` in [lib/projects.ts](lib/projects.ts)) and you’re expected to fall back to mock data.

---

## Environment Variables

Create a `.env.local`:

```
CONVEX_DEPLOYMENT=dev:YOUR-DEPLOYMENT
NEXT_PUBLIC_CONVEX_URL=https://your-instance.convex.cloud
GITHUB_PAT=ghp_... (optional, enables live issues)
```

`NEXT_PUBLIC_CONVEX_URL` is required for static param generation.  
`GITHUB_PAT` only needed if you want issue lists on project detail pages.

---

## Running Locally

```bash
npm install
npm run dev      # Turbopack
# or
npm run dev:webpack
```

Open http://localhost:3000

---

## Build & Deploy

```bash
npm run build
npm start
```

Deployed (e.g. Vercel) with ISR `revalidate = 3600` for projects.  
Add `NEXT_PUBLIC_CONVEX_URL` + `CONVEX_DEPLOYMENT` (all environments).  
GitHub tasks silently fail gracefully if misconfigured.

---

## Project Anatomy

- `app/` – Pages, layouts, server actions, dynamic project route
- `components/` – UI sections (Hero, Gallery, Detail, About, Contact, etc.)
- `convex/` – Convex functions (queries, mutations, seed & category migration helper)
- `lib/` – Mapping & environment guards
- `types/` – Shared TypeScript types
- `data/` – Fallback/mock data

Animations & reveal effects use lightweight intersection observer hooks (`useReveal`) and utility classes defined in `app/globals.css`.

---

## Why Public?

Accountability, portfolio transparency, and a lightweight reference for how I structure small product surfaces. Not an invitation to bikeshed folder names.

---

## Contributing

No pull requests. No feature requests.  
If you _really_ need to say something: email (see Contact section on the site).

---

## License

Personal showcase. All rights reserved.  
Do not reuse project descriptions, case study copy, or proprietary visuals without permission.

---

Enjoy the tour. May your side projects escape the idea graveyard too.
