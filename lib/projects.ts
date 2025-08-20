import type { Project } from "../types";

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
  category: string;
  isFeatured?: boolean;
  isIncoming?: boolean;
  sortOrder?: number;
}

/** Guard to ensure Convex URL is present early with clearer messaging. */
export function assertConvexEnv() {
  if (!process.env.NEXT_PUBLIC_CONVEX_URL) {
    throw new Error(
      "NEXT_PUBLIC_CONVEX_URL is missing. Set it in .env.local or Vercel project settings."
    );
  }
}

/** Map a Convex project document to the local `Project` shape. */
export function mapProject(doc: ConvexProjectDoc): Project {
  const narrowedCategory: Project["category"] =
    doc.category === "Public Utility" || doc.category === "Volatile Prototype"
      ? doc.category
      : "Volatile Prototype";
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
    category: narrowedCategory,
    isFeatured: doc.isFeatured ?? false,
    isIncoming: doc.isIncoming ?? false,
    sortOrder: doc.sortOrder ?? 0,
  };
}
