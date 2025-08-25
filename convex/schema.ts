import { v } from "convex/values";
import { defineSchema, defineTable } from "convex/server";

export default defineSchema({
  projects: defineTable({
    title: v.string(),
    tagline: v.string(),
    description: v.string(),
    projectUrl: v.string(),
    imageUrl: v.string(),
    screenshots: v.array(v.string()),
    challenges: v.array(v.string()),
    solutions: v.array(v.string()),
    metrics: v.optional(
      v.object({
        users: v.optional(v.number()),
        performance: v.optional(v.string()),
        impact: v.optional(v.string()),
        mrr: v.optional(v.number()),
      })
    ),
    techStack: v.array(v.string()),
    isFeatured: v.boolean(),
    status: v.union(v.literal("Later...Maybe"), v.literal("Next In Line"), v.literal("Compiling..."), v.literal("Released")),
    type: v.union(
      v.literal("Forking Around"), 
      v.literal("Sass-y Solution")
    ),
    categories: v.array(
      v.union(v.literal("ai"), v.literal("web"), v.literal("meh"))
    ),
    sortOrder: v.number(),
    githubRepo: v.optional(v.string()),
  })
    .index("by_sortOrder", ["sortOrder"])
    .index("by_isFeatured", ["isFeatured"])
    .index("by_status", ["status"])
    .index("by_type", ["type"])
});