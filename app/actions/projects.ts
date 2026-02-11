import type { Category, Project } from "../../types";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { mapProject } from "../../lib/projects";
import { mockProjects } from "../../data/projects";
import { cache } from "react";

/** Fetch all projects sorted by sortOrder.
 *  Wrapped in React `cache()` for per-request deduplication (multiple
 *  call-sites in the same render share one Convex round-trip).
 *  Actual ISR caching is handled by `revalidate` on the consuming pages. */
export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const docs = await fetchQuery(api.projects.list, {});
    return docs.map((doc) =>
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
  } catch {
    return mockProjects;
  }
});

/** Fetch a single project by Convex ID — deduplicated per request via `cache()`. */
export const getProjectById = cache(
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
);
