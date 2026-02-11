import { unstable_cache } from "next/cache";
import type { Category, Project } from "../../types";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { mapProject } from "../../lib/projects";
import { mockProjects } from "../../data/projects";

/** Status display order: furthest from release → already released. */
const STATUS_ORDER: Record<Project["status"], number> = {
  "Later...Maybe": 0,
  "Compiling...": 1,
  "Next In Line": 2,
  "Released": 3,
};

/**
 * Fetch all projects sorted by release closeness (ascending), then by
 * sortOrder within the same status group.
 *
 * Convex's `fetchQuery` internally sets `cache: "no-store"`, which would force
 * the page into dynamic rendering. Wrapping in `unstable_cache` adds a
 * **data-cache layer above** the fetch so Next.js can SSG the page and
 * revalidate every hour (ISR).
 */
export const getProjects = unstable_cache(
  async (): Promise<Project[]> => {
    try {
      const docs = await fetchQuery(api.projects.list, {});
      const projects = docs.map((doc) =>
        mapProject({
          ...doc,
          categories: (doc.categories || []).map((c) => {
            switch (c) {
              case "Chrome Extension":
              case "AI":
              case "Productivity":
              case "Web":
                return c;
              default:
                return "Web";
            }
          }) as Category[],
        }),
      );
      return projects.sort(
        (a, b) =>
          STATUS_ORDER[a.status] - STATUS_ORDER[b.status] ||
          a.sortOrder - b.sortOrder,
      );
    } catch {
      return mockProjects;
    }
  },
  ["projects-list"],
  { revalidate: 3600, tags: ["projects"] },
);

/**
 * Fetch a single project by Convex ID.
 * The `id` argument is automatically included in the cache key, so each
 * project is cached independently.
 */
export const getProjectById = unstable_cache(
  async (id: string): Promise<Project | null> => {
    try {
      const doc = await fetchQuery(api.projects.get, {
        id: id as Id<"projects">,
      });
      return doc
        ? mapProject({
          ...doc,
          categories: (doc.categories || []).map((c) => {
            switch (c) {
              case "Chrome Extension":
              case "AI":
              case "Productivity":
              case "Web":
                return c;
              default:
                return "Web";
            }
          }) as Category[],
        })
        : null;
    } catch {
      return null;
    }
  },
  ["project-by-id"],
  { revalidate: 3600, tags: ["projects"] },
);
