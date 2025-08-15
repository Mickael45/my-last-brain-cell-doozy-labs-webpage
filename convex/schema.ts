import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";
import { authTables } from "@convex-dev/auth/server";

const applicationTables = {
  projects: defineTable({
    title: v.string(),
    slug: v.string(),
    shortDescription: v.string(),
    fullDescription: v.string(),
    techStack: v.array(v.string()),
    category: v.string(),
    status: v.string(), // "live", "development", "archived"
    imageUrl: v.optional(v.string()),
    galleryImages: v.optional(v.array(v.string())),
    liveUrl: v.optional(v.string()),
    githubUrl: v.optional(v.string()),
    featured: v.boolean(),
    metrics: v.optional(v.object({
      users: v.optional(v.number()),
      revenue: v.optional(v.string()),
      stars: v.optional(v.number()) // 1-5 star rating for user satisfaction
    })),
    createdAt: v.number(),
  }).index("by_slug", ["slug"])
    .index("by_featured", ["featured"])
    .index("by_category", ["category"]),

  contacts: defineTable({
    name: v.string(),
    email: v.string(),
    company: v.optional(v.string()),
    message: v.string(),
    type: v.string(), // "saas-inquiry", "freelance", "project-purchase", "general"
    status: v.string(), // "new", "contacted", "closed"
    createdAt: v.number(),
  }).index("by_status", ["status"])
    .index("by_type", ["type"]),
};

export default defineSchema({
  ...authTables,
  ...applicationTables,
});
