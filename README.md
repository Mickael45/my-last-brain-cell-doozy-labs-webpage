## My Last Brain Cell Doozy Labs – Portfolio

Next.js (App Router) + Convex backend + Tailwind.

### Tech Stack

- Next.js 14 (App Router, ISR) – Turbopack for dev
- Convex (data layer)
- Tailwind CSS
- Lucide Icons

### Environment Variables

Create `.env.local` with:

```
CONVEX_DEPLOYMENT=dev:determined-sandpiper-238
NEXT_PUBLIC_CONVEX_URL=https://determined-sandpiper-238.convex.cloud
```

`NEXT_PUBLIC_CONVEX_URL` is required at build (for `generateStaticParams`) and runtime. A guard throws a clear error if it's missing.

### Development

```bash
npm install
npm run dev        # Turbopack
# or
npm run dev:webpack
```

### Production Build

```bash
npm run build
npm start
```

### Deployment (Vercel)

1. Add environment vars (Production + Preview + Development):
   - `NEXT_PUBLIC_CONVEX_URL`
   - `CONVEX_DEPLOYMENT`
2. Deploy (default build command `next build`).
3. ISR: `revalidate = 3600` refreshes content hourly.

### Server Actions

`app/actions/projects.ts`:

- `getProjects()` – list all projects
- `getProjectById(id)` – single project

Mapping & env guard: `lib/projects.ts`.

### Adding Data

Use Convex dashboard or write a seed using `convex/seed.ts` (ensure `sortOrder`).

### Future Improvements

- Cache wrappers around actions
- Tests for mapping
- Streaming detail page enhancements

---

Happy hacking.
