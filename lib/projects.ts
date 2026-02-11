import type { Category, Project } from "../types";

// Relaxed shape reflecting potential schema evolution; only required _id + minimal fields.
interface ConvexProjectDoc {
  _id: string;
  title: string;
  tagline: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  screenshots?: string[];
  challenges?: string[];
  solutions?: string[];
  metrics?: Project["metrics"];
  techStack?: string[];
  genesisSpark?: string;
  coreProblem?: string;
  categories?: Category[];
  type?: "Forking Around" | "Sass-y Solution";
  status?: "Later...Maybe" | "Next In Line" | "Compiling..." | "Released";
  isFeatured?: boolean;
  sortOrder?: number;
  githubRepo?: string;
}

/** Returns true if Convex env is configured; logs a warning once if not. */
let warned = false;
export function assertConvexEnv(): boolean {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    if (!warned) {
      console.warn(
        "Convex disabled: NEXT_PUBLIC_CONVEX_URL missing. Falling back to mock data.",
      );
      warned = true;
    }
    return false;
  }
  return true;
}

/** Map a Convex project document to the local `Project` shape. */
export function mapProject(doc: ConvexProjectDoc): Project {
  const narrowedType =
    doc.type === "Sass-y Solution" || doc.type === "Forking Around"
      ? doc.type
      : "Forking Around";
  return {
    id: doc._id,
    title: doc.title,
    tagline: doc.tagline,
    description: doc.description,
    projectUrl: doc.projectUrl,
    imageUrl: doc.imageUrl,
    screenshots: doc.screenshots || [],
    challenges: doc.challenges || [],
    solutions: doc.solutions || [],
    metrics: doc.metrics,
    techStack: doc.techStack || [],
    genesisSpark: doc.genesisSpark,
    coreProblem: doc.coreProblem,
    categories: doc.categories || [],
    type: narrowedType,
    status: doc.status || "Later...Maybe",
    isFeatured: doc.isFeatured ?? false,
    sortOrder: doc.sortOrder ?? 0,
    githubRepo: doc.githubRepo,
  };
}
