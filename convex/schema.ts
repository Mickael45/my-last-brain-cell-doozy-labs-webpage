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
        users: v.optional(v.string()),
        performance: v.optional(v.string()),
        impact: v.optional(v.string()),
      })
    ),
    techStack: v.array(v.string()),
    category: v.string(),
    isFeatured: v.boolean(),
    isIncoming: v.optional(v.boolean()),
    sortOrder: v.number(),
  })
    .index("by_sortOrder", ["sortOrder"])
    .index("by_isFeatured", ["isFeatured"])
    .index("by_isIncoming", ["isIncoming"])
    .index("by_category", ["category"]),
});
