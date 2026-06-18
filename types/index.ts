import { CATEGORIES } from "@/lib/constants";

export type Category = (typeof CATEGORIES)[number];

export interface Project {
  id: string;
  /** Human-readable URL slug, e.g. "dish-database" → /project/dish-database. */
  slug: string;
  title: string;
  tagline: string;
  description: string;
  projectUrl: string;
  imageUrl: string;
  screenshots: string[];
  challenges: string[];
  solutions: string[];
  mrr?: number;
  metrics?: {
    users?: number | string;
    performance?: string;
    impact?: string;
    mrr?: number | string;
  };
  techStack: string[];
  genesisSpark?: string;
  coreProblem?: string;
  categories: Category[];
  type: "Forking Around" | "Sass-y Solution";
  status: "Later...Maybe" | "Next In Line" | "Compiling..." | "Released";
  isFeatured: boolean;
  sortOrder: number;
  githubRepo?: string;
}
