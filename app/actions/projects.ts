import { cacheLife, cacheTag } from "next/cache";
import type { Category, Project } from "../../types";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { mapProject } from "../../lib/projects";

/** Fetch all projects sorted by sortOrder — cached via "use cache" (ISR). */
export async function getProjects(): Promise<Project[]> {
  "use cache";
  cacheLife("static");
  cacheTag("projects");

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
    return [];
  }
}

/** Fetch a single project by Convex ID — cached per id via "use cache". */
export async function getProjectById(
  id: string,
): Promise<Project | null> {
  "use cache";
  cacheLife("static");
  cacheTag("projects", `project-${id}`);

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
}
