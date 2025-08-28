"use server";
import type { Project } from "../../types";
import { fetchQuery } from "convex/nextjs";
import { api } from "../../convex/_generated/api";
import type { Id } from "../../convex/_generated/dataModel";
import { mapProject } from "../../lib/projects";
import { cache } from "react";

/** Fetch all projects sorted by sortOrder */
export const getProjects = cache(async (): Promise<Project[]> => {
  try {
    const docs = await fetchQuery(api.projects.list, {});
    return docs.map(mapProject);
  } catch {
    return []; // graceful fallback on runtime errors
  }
});

/** Fetch single project by its Convex _id */
export const getProjectById = cache(
  async (id: string): Promise<Project | null> => {
    try {
      const doc = await fetchQuery(api.projects.get, {
        id: id as Id<"projects">,
      });
      return doc ? mapProject(doc) : null;
    } catch {
      return null; // treat invalid id format or fetch errors as not found
    }
  },
);
