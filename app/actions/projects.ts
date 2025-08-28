"use server";
import type { Category, Project } from "../../types";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { mapProject } from "../../lib/projects";
import { cache } from "react";

/** Fetch all projects sorted by sortOrder */
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
        }) as Category[]
      }),
    );
  } catch {
    return [];
  }
});

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
            }) as Category[]
          })
        : null;
    } catch {
      return null;
    }
  },
);
