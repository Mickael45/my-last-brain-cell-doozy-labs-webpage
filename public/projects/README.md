# Project images

Put each project’s images in its own folder:

```
public/projects/
  <project-slug>/     e.g. my-chrome-extension, joblens-ai
    hero.png          → use as imageUrl (main card/detail image)
    screenshot-1.png
    screenshot-2.png  → use as screenshots[] in project data
```

**URLs in your project data:** use paths from the site root (they work in dev and production):

- `imageUrl`: `/projects/<project-slug>/hero.png`
- `screenshots`: `["/projects/<project-slug>/screenshot-1.png", "/projects/<project-slug>/screenshot-2.png"]`

Example for a project with slug `joblens-ai`:

```json
"imageUrl": "/projects/joblens-ai/hero.png",
"screenshots": [
  "/projects/joblens-ai/screenshot-1.png",
  "/projects/joblens-ai/screenshot-2.png"
]
```

Use a short, URL-friendly slug (lowercase, hyphens) that matches the folder name.
