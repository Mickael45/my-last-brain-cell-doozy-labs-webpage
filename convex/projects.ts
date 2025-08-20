import { query, mutation } from "./_generated/server";
import { v } from "convex/values";

export const list = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_sortOrder")
      .order("asc")
      .collect();
  },
});

export const get = query({
  args: { id: v.id("projects") },
  handler: async (ctx, args) => {
    return await ctx.db.get(args.id);
  },
});

export const getByLegacyId = query({
  args: { legacyId: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_legacyId", (q) => q.eq("legacyId", args.legacyId))
      .first();
  },
});

export const byCategory = query({
  args: { category: v.string() },
  handler: async (ctx, args) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_category", (q) => q.eq("category", args.category))
      .order("asc")
      .collect();
  },
});

export const featured = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_isFeatured", (q) => q.eq("isFeatured", true))
      .order("asc")
      .collect();
  },
});

export const incoming = query({
  args: {},
  handler: async (ctx) => {
    return await ctx.db
      .query("projects")
      .withIndex("by_isIncoming", (q) => q.eq("isIncoming", true))
      .order("asc")
      .collect();
  },
});

export const insert = mutation({
  args: {
    legacyId: v.string(),
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
  },
  handler: async (ctx, args) => {
    const id = await ctx.db.insert("projects", args);
    return await ctx.db.get(id);
  },
});

export const update = mutation({
  args: {
    id: v.id("projects"),
    patch: v.object({
      legacyId: v.optional(v.string()),
      title: v.optional(v.string()),
      tagline: v.optional(v.string()),
      description: v.optional(v.string()),
      projectUrl: v.optional(v.string()),
      imageUrl: v.optional(v.string()),
      screenshots: v.optional(v.array(v.string())),
      challenges: v.optional(v.array(v.string())),
      solutions: v.optional(v.array(v.string())),
      metrics: v.optional(
        v.object({
          users: v.optional(v.string()),
          performance: v.optional(v.string()),
          impact: v.optional(v.string()),
        })
      ),
      techStack: v.optional(v.array(v.string())),
      category: v.optional(v.string()),
      isFeatured: v.optional(v.boolean()),
      isIncoming: v.optional(v.boolean()),
      sortOrder: v.optional(v.number()),
    }),
  },
  handler: async (ctx, { id, patch }) => {
    await ctx.db.patch(id, patch);
    return await ctx.db.get(id);
  },
});

export const remove = mutation({
  args: { id: v.id("projects") },
  handler: async (ctx, { id }) => {
    await ctx.db.delete(id);
    return id;
  },
});
